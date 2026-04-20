import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { SoftwareApplicationSchema, WebPageSchema } from "@/components/breadcrumb-schema";
import { ImaveoStudio } from "@/components/studio/imaveo-studio";
import { StudioBreadcrumbTrail, StudioContextContent } from "@/components/studio/studio-context-content";
import { site } from "@/config/site";
import { buildAbsoluteUrl, buildLocaleAlternates } from "@/utils/seo/metadata";

export const dynamic = "force-static";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const isZh = locale === "zh";
  const pathname = `/${locale}/create`;
  const title = isZh ? "Imaveo 创作中心 | AI 视频与图片工作台" : "Imaveo Studio | AI video and image workspace";
  const description = isZh
    ? "在 Imaveo 创作中心完成文生图、图生图、文生视频和图生视频，并在同一工作台内切换模型与参数。"
    : "Use Imaveo Studio for text-to-image, image-to-image, text-to-video, and image-to-video workflows with model and parameter switching in one workspace.";

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

export default async function CreatePage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const isZh = locale === "zh";
  setRequestLocale(locale);
  const title = isZh ? "Imaveo 创作中心" : "Imaveo Studio";
  const description = isZh
    ? "在一个工作台里完成文生图、图生图、文生视频和图生视频，并切换模型与参数。"
    : "Use one workspace for text-to-image, image-to-image, text-to-video, and image-to-video generation.";

  return (
    <>
      <WebPageSchema name={title} description={description} url={`/${locale}/create`} locale={locale} />
      <SoftwareApplicationSchema
        name={title}
        description={description}
        url={`/${locale}/create`}
        locale={locale}
        featureList={
          isZh
            ? ["文生图", "图生图", "文生视频", "图生视频", "模型切换"]
            : ["Text to image", "Image to image", "Text to video", "Image to video", "Model switching"]
        }
      />

      <section className="aurora-stage pb-3 pt-5 md:pb-4 md:pt-6">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-[1440px]">
            <StudioBreadcrumbTrail locale={locale} />
          </div>
        </div>
      </section>

      <ImaveoStudio locale={locale} />

      <section className="aurora-stage pb-16 md:pb-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-6xl">
            <StudioContextContent locale={locale} />
          </div>
        </div>
      </section>
    </>
  );
}
