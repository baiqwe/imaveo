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

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit({ key, limit, windowMs }: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  const existing = rateLimitStore.get(key);

  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
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
  rateLimitStore.set(key, existing);

  return {
    ok: true,
    retryAfter: 0,
    remaining: Math.max(limit - existing.count, 0),
  };
}

export function getRateLimitKey(ip: string | null | undefined, scope: string) {
  return `${scope}:${ip?.split(",")[0]?.trim() || "anonymous"}`;
}
