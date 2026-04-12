import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { locales } from "@/i18n/routing";
import { indexableLandingPageSlugs } from "@/config/landing-pages";
import { imaveoArticles, imaveoModels } from "@/config/imaveo";

const staticPages = ["", "create", "pricing", "privacy", "terms", "about", "blog", "my-creations", "ai-video", "ai-image", "text-to-video", "image-to-video"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries = locales.flatMap((locale) =>
    staticPages.map((page) => {
      const path = page ? `/${locale}/${page}` : `/${locale}`;
      return {
        url: new URL(path, site.siteUrl).toString(),
        lastModified: now,
        changeFrequency: page ? (page === "privacy" || page === "terms" ? "monthly" : "weekly") : "daily",
        priority: page ? (page === "privacy" || page === "terms" ? 0.5 : 0.8) : 1,
        alternates: {
          languages: {
            en: new URL(page ? `/en/${page}` : "/en", site.siteUrl).toString(),
            zh: new URL(page ? `/zh/${page}` : "/zh", site.siteUrl).toString(),
            "x-default": new URL(page ? `/en/${page}` : "/en", site.siteUrl).toString(),
          },
        },
      } satisfies MetadataRoute.Sitemap[number];
    })
  );

  const landingEntries = locales.flatMap((locale) =>
    indexableLandingPageSlugs.map((slug) => ({
      url: new URL(`/${locale}/${slug}`, site.siteUrl).toString(),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      alternates: {
        languages: {
          en: new URL(`/en/${slug}`, site.siteUrl).toString(),
          zh: new URL(`/zh/${slug}`, site.siteUrl).toString(),
          "x-default": new URL(`/en/${slug}`, site.siteUrl).toString(),
        },
      },
    }))
  );

  const modelEntries = locales.flatMap((locale) =>
    imaveoModels.map((model) => ({
      url: new URL(`/${locale}${model.href}`, site.siteUrl).toString(),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85,
      alternates: {
        languages: {
          en: new URL(`/en${model.href}`, site.siteUrl).toString(),
          zh: new URL(`/zh${model.href}`, site.siteUrl).toString(),
          "x-default": new URL(`/en${model.href}`, site.siteUrl).toString(),
        },
      },
    }))
  );

  const articleEntries = locales.flatMap((locale) =>
    imaveoArticles.map((article) => ({
      url: new URL(`/${locale}${article.href}`, site.siteUrl).toString(),
      lastModified: new Date(article.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.75,
      alternates: {
        languages: {
          en: new URL(`/en${article.href}`, site.siteUrl).toString(),
          zh: new URL(`/zh${article.href}`, site.siteUrl).toString(),
          "x-default": new URL(`/en${article.href}`, site.siteUrl).toString(),
        },
      },
    }))
  );

  return [...staticEntries, ...landingEntries, ...modelEntries, ...articleEntries];
}
