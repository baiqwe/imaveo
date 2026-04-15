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
      title: "Imaveo - AI 视频与 AI 图片创作平台",
      description: "Imaveo 提供文生图、图生图、文生视频、图生视频和模型切换能力，帮助创作者更快从想法走到成片。",
      keywords: ["Imaveo", "AI创作平台", "AI视频生成", "AI图片生成", "文生视频", "图生视频", "文生图", "图生图"],
    };
  }

  return {
    title: "Imaveo - AI video and image creation platform",
    description: "Imaveo helps creators generate images and videos with text-to-image, image-to-image, text-to-video, image-to-video, and flexible model switching.",
    keywords: ["Imaveo", "AI creation platform", "AI video generator", "AI image generator", "text to video", "image to video", "text to image", "image to image"],
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
