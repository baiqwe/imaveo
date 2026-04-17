import type { Metadata } from "next";
import { SoftwareApplicationSchema, WebPageSchema } from "@/components/breadcrumb-schema";
import { ImaveoStudio } from "@/components/studio/imaveo-studio";
import { StudioBreadcrumbTrail, StudioContextContent } from "@/components/studio/studio-context-content";
import { getImaveoModel } from "@/config/imaveo";
import { site } from "@/config/site";
import { buildAbsoluteUrl, buildLocaleAlternates } from "@/utils/seo/metadata";
import { normalizeStudioMode } from "@/utils/studio";

type CreatePageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ mode?: string; model?: string; style?: string }>;
};

function getWorkflowLabel(mode: ReturnType<typeof normalizeStudioMode>, isZh: boolean) {
  switch (mode) {
    case "text-to-video":
      return isZh ? "文生视频" : "Text to Video";
    case "image-to-video":
      return isZh ? "图生视频" : "Image to Video";
    case "image-to-image":
      return isZh ? "图生图" : "Image to Image";
    case "text-to-image":
    default:
      return isZh ? "文生图" : "Text to Image";
  }
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ mode?: string; model?: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const query = await props.searchParams;
  const isZh = locale === "zh";
  const mode = normalizeStudioMode(query.mode);
  const model = query.model ? getImaveoModel(query.model, "video") ?? getImaveoModel(query.model, "image") : undefined;
  const pathname = `/${locale}/create`;
  const workflowLabel = getWorkflowLabel(mode, isZh);

  const title = model
    ? isZh
      ? `${model.labels.zh} ${workflowLabel} | Imaveo 创作中心`
      : `${model.labels.en} ${workflowLabel} | Imaveo Studio`
    : isZh
      ? `${workflowLabel} | Imaveo 创作中心`
      : `${workflowLabel} | Imaveo Studio`;

  const description = model
    ? isZh
      ? `进入 Imaveo 创作中心，直接使用 ${model.labels.zh} 完成 ${workflowLabel}，并围绕该模型的核心关键词继续调 prompt 和参数。`
      : `Open Imaveo Studio and use ${model.labels.en} for ${workflowLabel}, then refine prompts and settings around that model's strengths.`
    : isZh
      ? `进入 Imaveo 创作中心，直接开始 ${workflowLabel}，再根据结果决定是否切换模型。`
      : `Open Imaveo Studio and start ${workflowLabel}, then decide whether you need to switch models after the first result.`;

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
  const isZh = locale === "zh";
  const mode = normalizeStudioMode(query.mode);
  const model = query.model ? getImaveoModel(query.model, "video") ?? getImaveoModel(query.model, "image") : undefined;
  const workflowLabel = getWorkflowLabel(mode, isZh);
  const title = model
    ? isZh
      ? `${model.labels.zh} ${workflowLabel}`
      : `${model.labels.en} ${workflowLabel}`
    : workflowLabel;
  const description = model
    ? isZh
      ? `在创作中心中直接使用 ${model.labels.zh} 完成 ${workflowLabel}，并围绕该模型能力继续调 prompt 与参数。`
      : `Use ${model.labels.en} inside the Studio for ${workflowLabel}, then refine prompts and parameters around that model's strengths.`
    : isZh
      ? `在创作中心中直接开始 ${workflowLabel}，并根据第一版结果继续切换模型和参数。`
      : `Start ${workflowLabel} inside the Studio, then continue adjusting models and parameters from the first result.`;

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

      <ImaveoStudio locale={locale} initialMode={query.mode} initialModel={query.model} initialStyle={query.style} />

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
