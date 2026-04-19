import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

type RateLimitOptions = {
  key: string;
  limit: number;
  windowMs: number;
};

type RateLimitResult = {
  ok: boolean;
  retryAfter: number;
  remaining: number;
};

const memoryRateLimitStore = new Map<string, { count: number; resetAt: number }>();

const hasUpstashEnv =
  Boolean(process.env.UPSTASH_REDIS_REST_URL) &&
  Boolean(process.env.UPSTASH_REDIS_REST_TOKEN);

const redis = hasUpstashEnv ? Redis.fromEnv() : null;
const ratelimitRegistry = new Map<string, Ratelimit>();

function getWindowIdentifier(limit: number, windowMs: number) {
  return `${limit}:${windowMs}`;
}

function getSlidingWindow(windowMs: number) {
  return `${Math.max(Math.ceil(windowMs / 1000), 1)} s` as const;
}

function getRedisRatelimit(limit: number, windowMs: number) {
  if (!redis) return null;

  const identifier = getWindowIdentifier(limit, windowMs);
  const existing = ratelimitRegistry.get(identifier);
  if (existing) return existing;

  const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(limit, getSlidingWindow(windowMs)),
    analytics: false,
    prefix: `imaveo:rl:${identifier}`,
  });

  ratelimitRegistry.set(identifier, ratelimit);
  return ratelimit;
}

function checkMemoryRateLimit({ key, limit, windowMs }: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  const existing = memoryRateLimitStore.get(key);

  if (!existing || existing.resetAt <= now) {
    memoryRateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0, remaining: Math.max(limit - 1, 0) };
  }

  if (existing.count >= limit) {
    return {
      ok: false,
      retryAfter: Math.max(Math.ceil((existing.resetAt - now) / 1000), 1),
      remaining: 0,
    };
  }

  existing.count += 1;
  memoryRateLimitStore.set(key, existing);

  return {
    ok: true,
    retryAfter: 0,
    remaining: Math.max(limit - existing.count, 0),
  };
}

export async function checkRateLimit(options: RateLimitOptions): Promise<RateLimitResult> {
  const redisRatelimit = getRedisRatelimit(options.limit, options.windowMs);

  if (!redisRatelimit) {
    return checkMemoryRateLimit(options);
  }

  try {
    const result = await redisRatelimit.limit(options.key);
    return {
      ok: result.success,
      retryAfter: result.success ? 0 : Math.max(Math.ceil((result.reset - Date.now()) / 1000), 1),
      remaining: Math.max(result.remaining, 0),
    };
  } catch {
    return checkMemoryRateLimit(options);
  }
}

export function getRateLimitKey(ip: string | null | undefined, scope: string) {
  return `${scope}:${ip?.split(",")[0]?.trim() || "anonymous"}`;
}
