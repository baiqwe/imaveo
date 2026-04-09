import { site } from "@/config/site";
import { getImaveoModel, getImaveoTool } from "@/config/imaveo";

export function buildLocaleAlternates(pathname: string) {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const normalizedWithLocale = /^\/(en|zh)(?=\/|$)/.test(normalizedPath) ? normalizedPath : `/en${normalizedPath}`;
  const localizedPath = (locale: "en" | "zh") =>
    normalizedWithLocale.replace(/^\/(en|zh)(?=\/|$)/, `/${locale}`);

  return {
    canonical: buildAbsoluteUrl(normalizedWithLocale),
    languages: {
      en: buildAbsoluteUrl(localizedPath("en")),
      zh: buildAbsoluteUrl(localizedPath("zh")),
      "x-default": buildAbsoluteUrl(localizedPath("en")),
    },
  };
}

export function buildAbsoluteUrl(pathname: string) {
  return new URL(pathname, site.siteUrl).toString();
}

export function getHubMetadata(locale: "en" | "zh") {
  if (locale === "zh") {
    return {
      title: "Imaveo - 聚合 Veo、Flux、Animeify 的 AI 创作平台",
      description: "Imaveo 把 AI 视频、AI 图片与 Animeify 聚合进同一个高质感创作中枢，面向内容创作者与工作流玩家。",
      keywords: ["Imaveo", "AI创作平台", "Veo", "Flux", "Animeify", "AI视频生成", "AI图片生成"],
    };
  }

  return {
    title: "Imaveo - The AI hub for Veo, Flux, and Animeify",
    description: "Imaveo is a premium AI creation hub for video, image, and anime-specialized workflows built around creators and conversion-ready tools.",
    keywords: ["Imaveo", "AI creation hub", "Veo", "Flux", "Animeify", "AI video generator", "AI image generator"],
  };
}

export function getModelMetadata(locale: "en" | "zh", modelSlug: string, category: "video" | "image") {
  const model = getImaveoModel(modelSlug, category);
  return model?.seo[locale];
}

export function getToolMetadata(locale: "en" | "zh", toolSlug: string) {
  const tool = getImaveoTool(toolSlug);
  return tool?.seo[locale];
}
