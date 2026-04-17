import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clapperboard, ImageIcon, Sparkles } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { SeoConversionPanel } from "@/components/seo/seo-conversion-panel";
import { SeoRichContent } from "@/components/seo/seo-rich-content";
import { WebPageSchema } from "@/components/breadcrumb-schema";
import { getLocalizedLandingPage, landingPageSlugs } from "@/config/landing-pages";
import { getImaveoModel } from "@/config/imaveo";
import { site } from "@/config/site";
import { locales } from "@/i18n/routing";
import { buildAbsoluteUrl, buildLocaleAlternates } from "@/utils/seo/metadata";
import { buildStudioHref } from "@/utils/studio";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    landingPageSlugs.map((slug) => ({
      locale,
      slug,
    }))
  );
}

export async function generateMetadata(props: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const page = getLocalizedLandingPage(slug, locale);
  if (!page) return {};

  const pathname = `/${locale}/${slug}`;
  const ogImage = new URL(site.ogImagePath, site.siteUrl).toString();

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: buildLocaleAlternates(pathname),
    openGraph: {
      title: page.title,
      description: page.description,
      type: "website",
      siteName: site.siteName,
      url: buildAbsoluteUrl(pathname),
      images: [{ url: ogImage, width: 512, height: 512, alt: site.siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LandingPage(props: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await props.params;
  const isZh = locale === "zh";
  const localeKey = locale as "en" | "zh";
  const page = getLocalizedLandingPage(slug, locale);

  if (!page) notFound();

  const model = getImaveoModel(page.recommendedModel, page.category);
  const hubHref = `/${locale}/${page.category === "video" ? "ai-video" : "ai-image"}`;
  const workflowHref = `/${locale}/${page.recommendedMode}`;
  const primaryHref = buildStudioHref(locale, {
    mode: page.recommendedMode,
    model: page.recommendedModel,
    source: `landing-${page.slug}`,
  });
  const relatedPages = landingPageSlugs
    .filter((entry) => entry !== page.slug)
    .map((entry) => getLocalizedLandingPage(entry, locale))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry))
    .filter((entry) => entry.category === page.category)
    .slice(0, 2);

  return (
    <section className="py-16 md:py-20">
      <WebPageSchema name={page.title} description={page.description} url={`/${locale}/${page.slug}`} locale={locale} />
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-6xl space-y-10">
          <Breadcrumbs
            items={[
              { name: isZh ? "首页" : "Home", href: `/${locale}` },
              { name: page.category === "video" ? (isZh ? "AI 视频" : "AI Video") : isZh ? "AI 图片" : "AI Image", href: hubHref },
              { name: page.h1, href: `/${locale}/${page.slug}` },
            ]}
          />

          <div className="rounded-[36px] border border-white/10 bg-white/[0.03] p-8 md:p-10">
            <div className="section-label">{page.label}</div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-primary">
                {page.category === "video" ? (isZh ? "视频场景页" : "Video workflow page") : isZh ? "图片场景页" : "Image workflow page"}
              </span>
              {model ? (
                <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-zinc-400">
                  {isZh ? "推荐模型" : "Recommended model"} · {model.labels[localeKey]}
                </span>
              ) : null}
            </div>
            <h1 className={`mt-5 text-5xl font-medium text-white ${isZh ? "tracking-normal" : "tracking-[-0.05em]"}`}>{page.h1}</h1>
            <p className="mt-4 max-w-4xl text-base leading-7 text-zinc-300">{page.subtitle}</p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <Link href={workflowHref} className="rounded-[24px] border border-white/10 bg-black/30 p-5 transition-colors hover:border-primary/35 hover:bg-white/[0.04]">
                <div className="section-label">{isZh ? "工作流" : "Workflow"}</div>
                <div className="mt-3 flex items-center gap-2 text-xl font-medium text-white">
                  {page.category === "video" ? <Clapperboard className="h-5 w-5" /> : <ImageIcon className="h-5 w-5" />}
                  {page.recommendedMode === "text-to-video"
                    ? isZh
                      ? "文生视频"
                      : "Text to Video"
                    : page.recommendedMode === "image-to-video"
                      ? isZh
                        ? "图生视频"
                        : "Image to Video"
                      : page.recommendedMode === "image-to-image"
                        ? isZh
                          ? "图生图"
                          : "Image to Image"
                        : isZh
                          ? "文生图"
                          : "Text to Image"}
                </div>
                <div className="mt-2 text-sm leading-7 text-zinc-400">
                  {isZh ? "先查看更通用的工作流说明和参数建议。" : "Open the broader workflow page for orientation and parameter guidance."}
                </div>
              </Link>

              <Link href={hubHref} className="rounded-[24px] border border-white/10 bg-black/30 p-5 transition-colors hover:border-primary/35 hover:bg-white/[0.04]">
                <div className="section-label">{isZh ? "模型中心" : "Hub"}</div>
                <div className="mt-3 text-xl font-medium text-white">
                  {page.category === "video" ? (isZh ? "AI 视频中心" : "AI Video Hub") : isZh ? "AI 图片中心" : "AI Image Hub"}
                </div>
                <div className="mt-2 text-sm leading-7 text-zinc-400">
                  {isZh ? "回到中心页继续比较不同模型和任务入口。" : "Return to the hub and compare models and jobs side by side."}
                </div>
              </Link>

              <Link href={model ? `/${locale}${model.href}` : hubHref} className="rounded-[24px] border border-white/10 bg-black/30 p-5 transition-colors hover:border-primary/35 hover:bg-white/[0.04]">
                <div className="section-label">{isZh ? "推荐模型" : "Recommended model"}</div>
                <div className="mt-3 text-xl font-medium text-white">{model?.labels[localeKey] ?? site.siteName}</div>
                <div className="mt-2 text-sm leading-7 text-zinc-400">
                  {model?.descriptions[localeKey] ?? (isZh ? "查看更适合这个场景的模型。" : "Explore the model best aligned to this workflow.")}
                </div>
              </Link>
            </div>
          </div>

          <SeoConversionPanel
            eyebrow={isZh ? "开始创作" : "Start creating"}
            title={isZh ? `从这个场景直接进入创作中心` : `Move from this use case directly into the Studio`}
            description={
              isZh
                ? `如果你搜索的是“${page.targetKeyword}”这种明确场景词，通常已经知道自己要做什么。最短路径就是直接进入创作中心，用推荐工作流和模型先跑第一版。`
                : `When a creator searches for a specific use case like "${page.targetKeyword}", they already know the job. The shortest path is to open the Studio and start with the recommended workflow and model.`
            }
            primaryHref={primaryHref}
            primaryLabel={isZh ? "打开对应创作入口" : "Open the matching Studio flow"}
            secondaryHref={model ? `/${locale}${model.href}` : hubHref}
            secondaryLabel={isZh ? "先查看推荐模型" : "Review the recommended model"}
            highlights={[
              isZh ? "从场景词直接进入对应工作流，减少跳转损耗" : "Move from search intent directly into the matching workflow",
              isZh ? "优先使用最贴近该任务的推荐模型" : "Start with the model that fits the job most closely",
              isZh ? "从第一轮结果再决定是否切换模型或扩大输出" : "Use the first result to decide whether to switch models or scale output",
            ]}
          />

          <SeoRichContent
            locale={localeKey}
            keyword={page.targetKeyword}
            introTitle={page.introTitle}
            introBody={page.introBody}
            stepsTitle={page.stepsTitle}
            steps={page.steps}
            useCasesTitle={page.useCasesTitle}
            useCases={page.useCases}
            faqTitle={page.faqTitle}
            faqs={page.faqs}
            relatedTitle={isZh ? "继续浏览相关页面" : "Continue with related pages"}
            relatedLinks={[
              {
                label: page.category === "video" ? (isZh ? "AI 视频中心" : "AI Video Hub") : isZh ? "AI 图片中心" : "AI Image Hub",
                href: hubHref,
                description: isZh ? "回到中心页继续比较模型与任务入口。" : "Return to the hub and compare models and workflow entry points.",
              },
              {
                label:
                  page.recommendedMode === "text-to-video"
                    ? isZh
                      ? "文生视频"
                      : "Text to Video"
                    : page.recommendedMode === "image-to-video"
                      ? isZh
                        ? "图生视频"
                        : "Image to Video"
                      : page.recommendedMode === "image-to-image"
                        ? isZh
                          ? "图生图"
                          : "Image to Image"
                        : isZh
                          ? "文生图"
                          : "Text to Image",
                href: workflowHref,
                description: isZh ? "查看更通用的工作流说明和参数建议。" : "Open the broader workflow page for orientation and parameter guidance.",
              },
              ...(model
                ? [
                    {
                      label: model.labels[localeKey],
                      href: `/${locale}${model.href}`,
                      description: model.descriptions[localeKey],
                    },
                  ]
                : []),
              ...relatedPages.map((entry) => ({
                label: entry.h1,
                href: `/${locale}/${entry.slug}`,
                description: entry.subtitle,
              })),
            ]}
          />

          <div className="grid gap-4 md:grid-cols-2">
            {relatedPages.map((entry) => (
              <Link
                key={entry.slug}
                href={`/${locale}/${entry.slug}`}
                className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-primary/35 hover:bg-white/[0.04]"
              >
                <div className="section-label">{entry.label}</div>
                <div className="mt-3 text-2xl font-medium text-white">{entry.h1}</div>
                <div className="mt-3 text-sm leading-7 text-zinc-400">{entry.subtitle}</div>
                <div className="mt-4 inline-flex items-center gap-2 text-sm text-primary">
                  {isZh ? "继续查看" : "Read next"} <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
