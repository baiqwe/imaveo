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
      title: "AI 视频与图片生成聚合平台 | Imaveo Studio",
      description: "Imaveo 聚合 Veo、Sora、Seedance、HappyHorse、Nano Banana Pro、GPT Image、Flux Klein、Wan、Z Image 和 Qwen Image，支持文生视频、图生视频、文生图与图生图。",
      keywords: ["Imaveo", "AI视频生成器", "AI图片生成器", "AI创作平台", "文生视频", "图生视频", "文生图", "图生图", "Veo", "Sora", "Seedance", "HappyHorse", "Nano Banana Pro", "GPT Image", "Flux Klein"],
    };
  }

  return {
    title: "AI Video & Image Generator Hub | Imaveo Studio",
    description: "Imaveo is an all-in-one AI visual studio for text-to-video, image-to-video, text-to-image, and image-to-image workflows with models like Veo, Sora, Seedance, HappyHorse, Nano Banana Pro, GPT Image, Flux Klein, Wan, Z Image, and Qwen Image.",
    keywords: ["Imaveo", "AI video generator", "AI image generator", "AI studio", "text to video", "image to video", "text to image", "image to image", "Veo", "Sora", "Seedance", "HappyHorse", "Nano Banana Pro", "GPT Image", "Flux Klein"],
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
