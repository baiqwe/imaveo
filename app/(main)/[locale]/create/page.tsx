import type { Metadata } from "next";
import { ImaveoStudio } from "@/components/studio/imaveo-studio";
import { site } from "@/config/site";
import { buildAbsoluteUrl, buildLocaleAlternates } from "@/utils/seo/metadata";

type CreatePageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ mode?: string; model?: string; style?: string }>;
};

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const isZh = locale === "zh";
  const pathname = `/${locale}/create`;
  const title = isZh ? "Imaveo 创作中心 | AI 视频与图片统一工作台" : "Imaveo Studio | One Workspace for AI Video and Image Creation";
  const description = isZh
    ? "进入 Imaveo 创作中心，在同一个工作台里切换文生图、图生图、文生视频、图生视频与热门模型。"
    : "Enter Imaveo Studio to switch between text-to-image, image-to-image, text-to-video, image-to-video, and hot models from one workspace.";
  const ogImage = new URL(site.ogImagePath, site.siteUrl).toString();

  return {
    title,
    description,
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

export default async function CreatePage({ params, searchParams }: CreatePageProps) {
  const { locale } = await params;
  const query = await searchParams;

  return (
    <ImaveoStudio
      locale={locale}
      initialMode={query.mode}
      initialModel={query.model}
      initialStyle={query.style}
    />
  );
}
