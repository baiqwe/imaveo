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
    ? "浏览 Imaveo 上的 AI 视频模型，包括 Veo、Sora、Seedance 和 HappyHorse，并按场景选择最合适的视频工作流。"
    : "Explore AI video models on Imaveo including Veo, Sora, Seedance, and HappyHorse, then choose the right workflow for each production need.";
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
                ? "在这里查看文生视频、图生视频，以及 Veo、Sora、Seedance 和 HappyHorse 这些主流视频模型，先了解各自适合的场景，再进入创作中心开始生成。"
                : "Explore text-to-video, image-to-video, and leading video models like Veo, Sora, Seedance, and HappyHorse in one place, then open the Studio when you are ready to generate."}
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
            eyebrow={isZh ? "开始生成" : "Start Creating"}
            title={isZh ? "进入视频工作台" : "Open the video workspace"}
            description={
              isZh
                ? "选择文生视频或图生视频，再根据画面目标切换 Veo、Sora、Seedance 和 HappyHorse。你可以先生成一条测试片，再决定是否继续放大使用。"
                : "Choose text-to-video or image-to-video, then switch between Veo, Sora, Seedance, and HappyHorse based on the scene you need. Generate one test clip first, then decide how far to scale."
            }
            primaryHref={buildStudioHref(locale, { mode: "text-to-video", model: "veo-3", source: "seo-ai-video" })}
            primaryLabel={isZh ? "打开视频控制台" : "Open video console"}
            secondaryHref={`/${locale}/pricing`}
            secondaryLabel={isZh ? "先看套餐与 Credits" : "Compare plans and credits"}
            highlights={[
              isZh ? "适合先测试一条短片再继续迭代" : "Useful for testing one clip before iterating",
              isZh ? "支持文生视频和图生视频两种起点" : "Supports both text-to-video and image-to-video starts",
              isZh ? "适合广告短片、社媒视频和产品镜头" : "Works for ad clips, social videos, and product shots",
            ]}
          />

          <SeoRichContent
            locale={localeKey}
            keyword={isZh ? "AI 视频模型中心" : "AI video models hub"}
            introTitle={isZh ? "什么是 Imaveo 的 AI 视频中心？" : "What is the Imaveo AI video hub?"}
            introBody={[
              isZh
                ? "Imaveo 的 AI 视频中心帮助你先了解视频生成方式，再选择适合的模型。你可以从文字提示词开始，也可以上传图片作为首帧。"
                : "The Imaveo AI video hub helps you understand video generation options before choosing a model. Start from a text prompt or upload an image as the first frame.",
              isZh
                ? "如果你还不确定该用哪个模型，可以先比较 Veo、Sora、Seedance 和 HappyHorse 的优势，再进入创作中心生成第一条短片。"
                : "If you are not sure which model to use, compare Veo, Sora, Seedance, and HappyHorse first, then open the Studio and generate your first clip.",
            ]}
            stepsTitle={isZh ? "如何使用 Imaveo 选择合适的视频模型" : "How to choose the right video model on Imaveo"}
            steps={[
              isZh ? "先判断你的需求属于文生视频还是图生视频。" : "Decide whether your need is text-to-video or image-to-video.",
              isZh ? "再进入具体模型页，对比 Veo、Sora、Seedance 和 HappyHorse 的优势。" : "Visit model pages to compare Veo, Sora, Seedance, and HappyHorse.",
              isZh ? "最后根据预算和频率，决定使用订阅还是 Credits 包。" : "Choose between subscriptions and credits packs based on usage frequency.",
            ]}
            useCasesTitle={isZh ? "哪些场景适合这个中心页承接？" : "What use cases does this hub capture?"}
            useCases={[
              isZh ? "搜索『AI 视频生成器』的泛意图用户" : "Broad users searching for 'AI video generator'",
              isZh ? "搜索 Veo、Sora、Seedance、HappyHorse 等模型关键词的高意图用户" : "High-intent users searching Veo, Sora, Seedance, HappyHorse, and model-specific terms",
              isZh ? "搜索文生视频、图生视频等工作流词的需求型用户" : "Workflow-intent users searching text-to-video or image-to-video",
              isZh ? "需要价格、模型和工作流一起比较的创作者" : "Creators who want to compare pricing, models, and workflows together",
            ]}
            faqTitle={isZh ? "AI 视频中心常见问题" : "AI video hub FAQ"}
            faqs={[
              {
                question: isZh ? "为什么要先看 AI 视频中心？" : "Why start from the AI video hub?",
                answer: isZh
                  ? "因为不同视频模型适合的场景不同。先看中心页能快速了解文生视频、图生视频，以及 Veo、Sora、Seedance 和 HappyHorse 的差异。"
                  : "Because different video models fit different jobs. The hub gives you a quick view of text-to-video, image-to-video, and the differences between Veo, Sora, Seedance, and HappyHorse before you start.",
              },
              {
                question: isZh ? "为什么 Veo、Sora、Seedance 和 HappyHorse 适合放在同一站里？" : "Why should Veo, Sora, Seedance, and HappyHorse live on the same site?",
                answer: isZh
                  ? "因为创作者会根据镜头一致性、叙事能力、图生视频稳定性和社媒节奏在不同模型间切换，把它们放进同一个工作台会更高效。"
                  : "Because creators switch models based on cinematic quality, narrative range, image-to-video stability, and social pacing. Keeping them in one workspace makes that process much easier.",
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
