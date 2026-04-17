import { getImaveoModel, getImaveoTool, type GenerationMode } from "@/config/imaveo";

export type StudioMode = "text-to-image" | "image-to-image" | "text-to-video" | "image-to-video";

type StudioHrefOptions = {
  mode?: StudioMode;
  model?: string;
  style?: string;
  source?: string;
};

function buildStudioQuery(options: StudioHrefOptions = {}) {
  const params = new URLSearchParams();

  if (options.mode) params.set("mode", options.mode);
  if (options.model) params.set("model", options.model);
  if (options.style) params.set("style", options.style);
  if (options.source) params.set("source", options.source);

  const query = params.toString();
  return query ? `?${query}` : "";
}

function toStudioMode(mode?: GenerationMode | string | null): StudioMode {
  switch (mode) {
    case "text-to-video":
    case "image-to-video":
    case "text-to-image":
      return mode;
    case "anime":
      return "image-to-image";
    default:
      return "text-to-image";
  }
}

export function normalizeStudioMode(mode?: string | null): StudioMode {
  return toStudioMode(mode);
}

export function buildStudioHref(locale: string, options: StudioHrefOptions = {}) {
  return `/${locale}/create${buildStudioQuery(options)}`;
}

export function buildStudioPath(options: StudioHrefOptions = {}) {
  return `/create${buildStudioQuery(options)}`;
}

export function buildStudioHrefFromPath(locale: string, href?: string, source?: string) {
  if (!href) return buildStudioHref(locale, { source });
  const path = buildStudioPathFromPath(href, source);
  return `/${locale}${path}`;
}

export function buildStudioPathFromPath(href?: string, source?: string) {
  if (!href) return buildStudioPath({ source });

  const normalizedHref = href.startsWith("/") ? href : `/${href}`;
  const segments = normalizedHref.split("/").filter(Boolean);

  if (segments[0] === "ai-video" && segments[1]) {
    const model = getImaveoModel(segments[1], "video");
    return buildStudioPath({
      mode: toStudioMode(model?.mode),
      model: model?.slug ?? segments[1],
      source,
    });
  }

  if (segments[0] === "ai-image" && segments[1]) {
    const model = getImaveoModel(segments[1], "image");
    return buildStudioPath({
      mode: toStudioMode(model?.mode),
      model: model?.slug ?? segments[1],
      style: model?.generationDefaults?.style,
      source,
    });
  }

  if (segments[0] === "text-to-video" || segments[0] === "image-to-video" || segments[0] === "text-to-image" || segments[0] === "image-to-image") {
    const tool = getImaveoTool(segments[0]);
    return buildStudioPath({
      mode: toStudioMode(tool?.mode ?? segments[0]),
      source,
    });
  }

  return buildStudioPath({ source });
}
