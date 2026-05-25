import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ModelExperiencePage } from "@/components/seo/model-experience-page";
import { site } from "@/config/site";
import { getImaveoModel, imaveoModels } from "@/config/imaveo";
import { locales } from "@/i18n/routing";
import {
  buildAbsoluteUrl,
  buildLocaleAlternates,
  getModelMetadata,
} from "@/utils/seo/metadata";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    imaveoModels
      .filter((model) => model.category === "video")
      .map((model) => ({
        locale,
        model: model.slug,
      })),
  );
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string; model: string }>;
}): Promise<Metadata> {
  const { locale, model } = await props.params;
  const item = getImaveoModel(model, "video");
  if (!item) return {};

  const localeKey = locale as "en" | "zh";
  const seo = getModelMetadata(localeKey, model, "video");
  const pathname = `/${locale}/ai-video/${model}`;
  const title = seo?.title ?? `${item.labels[localeKey]} | Imaveo`;
  const description = seo?.description ?? item.descriptions[localeKey];
  const ogImage = new URL(site.ogImagePath, site.siteUrl).toString();

  return {
    title,
    description,
    keywords: seo?.keywords,
    alternates: buildLocaleAlternates(pathname),
    openGraph: {
      title,
      description,
      type: "website",
      siteName: site.siteName,
      url: buildAbsoluteUrl(pathname),
      images: [{ url: ogImage, width: 512, height: 512, alt: site.siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}

export default async function VideoModelPage(props: {
  params: Promise<{ locale: string; model: string }>;
}) {
  const { locale, model } = await props.params;
  const item = getImaveoModel(model, "video");
  if (!item) notFound();

  const siblingModels = imaveoModels.filter(
    (entry) => entry.category === "video" && entry.slug !== item.slug,
  );
  return (
    <ModelExperiencePage
      locale={locale}
      category="video"
      item={item}
      siblingModels={siblingModels}
    />
  );
}
