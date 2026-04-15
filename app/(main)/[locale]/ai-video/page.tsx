import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clapperboard } from "lucide-react";
import { CollectionPageSchema } from "@/components/breadcrumb-schema";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { SeoConversionPanel } from "@/components/seo/seo-conversion-panel";
import { SeoRichContent } from "@/components/seo/seo-rich-content";
import { imaveoModels } from "@/config/imaveo";
import { site } from "@/config/site";
import { buildAbsoluteUrl, buildLocaleAlternates } from "@/utils/seo/metadata";
import { buildStudioHref } from "@/utils/studio";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const isZh = locale === "zh";
  const pathname = `/${locale}/ai-video`;
  const title = isZh ? "AI 视频模型中心 | Imaveo" : "AI Video Models Hub | Imaveo";
  const description = isZh
    ? "浏览 Imaveo 上的 AI 视频模型，包括 Veo、Kling 等主流模型，并按场景选择最合适的视频工作流。"
    : "Explore AI video models on Imaveo including Veo and Kling, and choose the right workflow for each production need.";
  const ogDescription = isZh ? "一个承接 AI 视频模型搜索和场景需求的中心页。" : "A central page that captures AI video model intent and workflow demand.";
  const ogImage = new URL(site.ogImagePath, site.siteUrl).toString();

  return {
    title,
    description,
    alternates: buildLocaleAlternates(pathname),
    openGraph: {
      title,
      description: ogDescription,
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

export default async function AiVideoHubPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const isZh = locale === "zh";
  const localeKey = locale as "en" | "zh";
  const models = imaveoModels.filter((model) => model.category === "video");

  return (
    <div className="py-16 md:py-20">
      <CollectionPageSchema
        name={isZh ? "Imaveo AI 视频中心" : "Imaveo AI Video Hub"}
        description={isZh ? "浏览 Imaveo 上的 AI 视频模型、工作流和相关入口。" : "Explore AI video models, workflows, and related entry points on Imaveo."}
        url={`/${locale}/ai-video`}
        locale={locale}
        items={[
          { name: isZh ? "文生视频" : "Text to Video", url: `/${locale}/text-to-video` },
          { name: isZh ? "图生视频" : "Image to Video", url: `/${locale}/image-to-video` },
          ...models.map((model) => ({
            name: model.labels[localeKey],
            url: `/${locale}${model.href}`,
          })),
        ]}
      />
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-6xl space-y-10">
          <Breadcrumbs
            items={[
              { name: isZh ? "首页" : "Home", href: `/${locale}` },
              { name: isZh ? "AI 视频" : "AI Video", href: `/${locale}/ai-video` },
            ]}
            className="mb-2"
          />

          <section className="rounded-[36px] border border-white/10 bg-white/[0.03] p-8 md:p-10">
            <div className="section-label">AI Video Hub</div>
            <h1 className={`mt-3 text-5xl font-medium text-white ${isZh ? "tracking-normal" : "tracking-[-0.05em]"}`}>
              {isZh ? "AI 视频模型与工作流中心" : "The hub for AI video models and workflows"}
            </h1>
            <p className="mt-4 max-w-4xl text-base leading-7 text-zinc-300">
              {isZh
                ? "这个 pillar 页负责承接品牌词下的 AI 视频大类搜索，再把权重分发给 Veo、Kling 以及文生视频、图生视频等 cluster 页面。"
                : "This pillar page captures broad AI video demand, then distributes authority into Veo, Kling, text-to-video, and image-to-video cluster pages."}
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Link href={`/${locale}/text-to-video`} className="rounded-[28px] border border-white/10 bg-black/25 p-6 transition-colors hover:border-primary/35 hover:bg-white/[0.04]">
                <div className="section-label">{isZh ? "Workflow" : "Workflow"}</div>
                <div className="mt-3 text-2xl font-medium text-white">{isZh ? "文生视频" : "Text to Video"}</div>
                <div className="mt-2 text-sm leading-7 text-zinc-400">{isZh ? "从一句提示词直接生成视频。" : "Generate videos directly from prompts."}</div>
              </Link>
              <Link href={`/${locale}/image-to-video`} className="rounded-[28px] border border-white/10 bg-black/25 p-6 transition-colors hover:border-primary/35 hover:bg-white/[0.04]">
                <div className="section-label">{isZh ? "Workflow" : "Workflow"}</div>
                <div className="mt-3 text-2xl font-medium text-white">{isZh ? "图生视频" : "Image to Video"}</div>
                <div className="mt-2 text-sm leading-7 text-zinc-400">{isZh ? "把静态图像动画化为短视频。" : "Animate still images into short videos."}</div>
              </Link>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {models.map((model) => (
                <Link key={model.slug} href={`/${locale}${model.href}`} className="rounded-[28px] border border-white/10 bg-black/25 p-6 transition-colors hover:border-primary/35 hover:bg-white/[0.04]">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-primary">
                        <Clapperboard className="h-3.5 w-3.5" />
                        {model.badge}
                      </div>
                      <div className="mt-4 text-2xl font-medium text-white">{model.labels[localeKey]}</div>
                      <div className="mt-2 text-sm leading-7 text-zinc-400">{model.descriptions[localeKey]}</div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-zinc-500" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <SeoConversionPanel
            eyebrow={isZh ? "Launch Console" : "Launch Console"}
            title={isZh ? "把搜索流量直接引到视频工作台" : "Push video-intent visitors directly into the video console"}
            description={
              isZh
                ? "这类访客通常已经知道自己要做视频，不需要再读太多解释。最短路径是直接进入首页的视频控制台，再按 Veo、Kling、文生视频或图生视频继续分流。"
                : "Visitors landing here usually already know they want to make a video. The shortest path is to enter the home video console first, then branch into Veo, Kling, text-to-video, or image-to-video based on intent."
            }
            primaryHref={buildStudioHref(locale, { mode: "text-to-video", model: "veo-3", source: "seo-ai-video" })}
            primaryLabel={isZh ? "打开视频控制台" : "Open video console"}
            secondaryHref={`/${locale}/pricing`}
            secondaryLabel={isZh ? "先看套餐与 Credits" : "Compare plans and credits"}
            highlights={[
              isZh ? "把高意图用户直接带到品牌首页里的实际控制台" : "Brings high-intent users into the actual console on the brand home page",
              isZh ? "同时保留模型页和 workflow 页继续承接细分需求" : "Keeps model pages and workflow pages available for deeper segmentation",
              isZh ? "更适合后续接入真实视频生成表单和参数面板" : "Creates a clean upgrade path for a future real video generation form",
            ]}
          />

          <SeoRichContent
            locale={localeKey}
            keyword={isZh ? "AI 视频模型中心" : "AI video models hub"}
            introTitle={isZh ? "什么是 Imaveo 的 AI 视频中心？" : "What is the Imaveo AI video hub?"}
            introBody={[
              isZh
                ? "Imaveo 的 AI 视频中心是一个典型的 pillar page。它的作用不是只做一个工具入口，而是把 AI 视频这个大类需求拆成模型页、场景页和价格页，形成清晰的权重分发结构。"
                : "The Imaveo AI video hub is a classic pillar page. Its job is not just to host one tool, but to break AI video demand into model pages, workflow pages, and monetization pages.",
              isZh
                ? "在搜索层面，这种结构比只做单页工具站更容易覆盖广义词和长尾词，因为用户既可能搜模型名，也可能搜场景词。"
                : "From an SEO perspective, this structure is stronger than a single-page tool because users search both model names and workflow-specific intent.",
            ]}
            stepsTitle={isZh ? "如何使用 Imaveo 选择合适的视频模型" : "How to choose the right video model on Imaveo"}
            steps={[
              isZh ? "先判断你的需求属于文生视频还是图生视频。" : "Decide whether your need is text-to-video or image-to-video.",
              isZh ? "再进入具体模型页，对比 Veo、Kling 等模型的优势。" : "Visit model pages to compare Veo, Kling, and other options.",
              isZh ? "最后根据预算和频率，决定使用订阅还是 Credits 包。" : "Choose between subscriptions and credits packs based on usage frequency.",
            ]}
            useCasesTitle={isZh ? "哪些场景适合这个中心页承接？" : "What use cases does this hub capture?"}
            useCases={[
              isZh ? "搜索『AI 视频生成器』的泛意图用户" : "Broad users searching for 'AI video generator'",
              isZh ? "搜索 Veo、Kling 等模型关键词的高意图用户" : "High-intent users searching Veo, Kling, and model-specific terms",
              isZh ? "搜索文生视频、图生视频等工作流词的需求型用户" : "Workflow-intent users searching text-to-video or image-to-video",
              isZh ? "需要价格、模型和工作流一起比较的创作者" : "Creators who want to compare pricing, models, and workflows together",
            ]}
            faqTitle={isZh ? "AI 视频中心常见问题" : "AI video hub FAQ"}
            faqs={[
              {
                question: isZh ? "为什么 AI 视频需要单独做一个 pillar page？" : "Why does AI video need a dedicated pillar page?",
                answer: isZh
                  ? "因为模型词、场景词和品牌词本身就是不同层级的搜索意图。用一个中心页把它们串起来，更容易形成稳定的站内权重传递。"
                  : "Because model terms, workflow terms, and brand terms represent different search intents. A pillar page connects them into a stronger internal authority system.",
              },
              {
                question: isZh ? "Veo 和 Kling 应该放在同一站里吗？" : "Should Veo and Kling live on the same site?",
                answer: isZh
                  ? "是的。对于聚合站策略来说，把多个模型放在一个品牌站下，可以更容易积累站点整体权重并共享支付和用户系统。"
                  : "Yes. In a hub-and-spoke strategy, keeping multiple models under one brand site helps consolidate authority and share the same monetization and user system.",
              },
            ]}
            relatedTitle={isZh ? "继续浏览相关页面" : "Continue with related pages"}
            relatedLinks={[
              { label: isZh ? "文生视频" : "Text to Video", href: `/${locale}/text-to-video` },
              { label: isZh ? "图生视频" : "Image to Video", href: `/${locale}/image-to-video` },
              ...models.map((model) => ({ label: model.labels[localeKey], href: `/${locale}${model.href}`, description: model.descriptions[localeKey] })),
            ]}
          />
        </div>
      </div>
    </div>
  );
}
