import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ImageIcon, Sparkles } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { SeoConversionPanel } from "@/components/seo/seo-conversion-panel";
import { SeoRichContent } from "@/components/seo/seo-rich-content";
import { imaveoModels } from "@/config/imaveo";
import { site } from "@/config/site";
import { buildAbsoluteUrl, buildLocaleAlternates, getToolMetadata } from "@/utils/seo/metadata";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const localeKey = locale as "en" | "zh";
  const seo = getToolMetadata(localeKey, "image-to-video");
  const pathname = `/${locale}/image-to-video`;
  const ogImage = new URL(site.ogImagePath, site.siteUrl).toString();

  return {
    title: seo?.title,
    description: seo?.description,
    keywords: seo?.keywords,
    alternates: buildLocaleAlternates(pathname),
    openGraph: {
      title: seo?.title,
      description: seo?.description,
      type: "website",
      siteName: site.siteName,
      url: buildAbsoluteUrl(pathname),
      images: [{ url: ogImage, width: 512, height: 512, alt: site.siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.title,
      description: seo?.description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}

export default async function ImageToVideoPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const isZh = locale === "zh";
  const localeKey = locale as "en" | "zh";
  const videoModels = imaveoModels.filter((model) => model.mode === "image-to-video" || model.category === "video");

  return (
    <section className="py-16 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-6xl space-y-10">
          <Breadcrumbs
            items={[
              { name: isZh ? "首页" : "Home", href: `/${locale}` },
              { name: isZh ? "AI 视频" : "AI Video", href: `/${locale}/ai-video` },
              { name: isZh ? "图生视频" : "Image to Video", href: `/${locale}/image-to-video` },
            ]}
          />

          <div className="rounded-[36px] border border-white/10 bg-white/[0.03] p-8 md:p-10">
            <div className="section-label">Image to Video</div>
            <h1 className={`mt-3 text-5xl font-medium text-white ${isZh ? "tracking-normal" : "tracking-[-0.05em]"}`}>
              {isZh ? "把静态图片变成动态视频" : "Animate still images into dynamic video clips"}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-300">
              {isZh
                ? "这个页面用于承接图生视频需求，并把用户引导到最适合的模型页、价格页和 AI 视频中心。"
                : "This page captures image-to-video demand and routes users into the most relevant model pages, pricing, and the broader AI video hub."}
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <Link
                href={`/${locale}/ai-video`}
                className="rounded-[24px] border border-white/10 bg-black/30 p-5 transition-colors hover:border-primary/35 hover:bg-white/[0.04]"
              >
                <div className="section-label">{isZh ? "Pillar" : "Pillar"}</div>
                <div className="mt-3 text-xl font-medium text-white">{isZh ? "AI 视频中心" : "AI Video Hub"}</div>
                <div className="mt-2 text-sm leading-7 text-zinc-400">
                  {isZh ? "查看全部视频模型和工作流。" : "Open the full AI video pillar page."}
                </div>
              </Link>
              <Link
                href={`/${locale}/pricing`}
                className="rounded-[24px] border border-white/10 bg-black/30 p-5 transition-colors hover:border-primary/35 hover:bg-white/[0.04]"
              >
                <div className="section-label">{isZh ? "Pricing" : "Pricing"}</div>
                <div className="mt-3 text-xl font-medium text-white">{isZh ? "套餐与 Credits" : "Plans and credits"}</div>
                <div className="mt-2 text-sm leading-7 text-zinc-400">
                  {isZh ? "比较适合高频和低频用户的付费方式。" : "Compare payment options for both casual and heavy users."}
                </div>
              </Link>
              <Link
                href={`/${locale}`}
                className="rounded-[24px] border border-white/10 bg-black/30 p-5 transition-colors hover:border-primary/35 hover:bg-white/[0.04]"
              >
                <div className="section-label">{isZh ? "Brand" : "Brand"}</div>
                <div className="mt-3 text-xl font-medium text-white">{isZh ? "返回首页中枢" : "Back to the hub"}</div>
                <div className="mt-2 text-sm leading-7 text-zinc-400">
                  {isZh ? "回到品牌首页切换其他工作流和模型。" : "Return to the brand hub to switch between workflows and models."}
                </div>
              </Link>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {videoModels.map((model) => (
                <Link
                  key={model.slug}
                  href={`/${locale}${model.href}`}
                  className="rounded-[26px] border border-white/10 bg-black/30 p-6 transition-colors hover:border-primary/35 hover:bg-white/[0.04]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-primary">
                        <Sparkles className="h-3.5 w-3.5" />
                        {model.badge}
                      </div>
                      <h2 className="mt-4 text-2xl font-medium text-white">{model.labels[localeKey]}</h2>
                      <p className="mt-3 text-sm leading-7 text-zinc-400">{model.descriptions[localeKey]}</p>
                    </div>
                    <ImageIcon className="h-5 w-5 text-white/35" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href={`/${locale}`}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-black"
              >
                {isZh ? "回到首页工作台" : "Back to the home console"} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <SeoConversionPanel
            eyebrow={isZh ? "Workflow Entry" : "Workflow Entry"}
            title={isZh ? "从图生视频页直接进入视频控制台" : "Move image-to-video traffic directly into the video console"}
            description={
              isZh
                ? "图生视频用户通常需要先确认模型和路径，再进入真实工作台。这里把入口压缩到最短：先开视频控制台，再根据模型卡片切到最适合的路径。"
                : "Image-to-video visitors usually need a quick model and workflow decision before they start. This panel shortens the path: open the video console first, then switch to the best-fit model from the model cards."
            }
            primaryHref={`/${locale}/?mode=video#hero-console`}
            primaryLabel={isZh ? "打开图生视频入口" : "Open image-to-video entry"}
            secondaryHref={`/${locale}/pricing`}
            secondaryLabel={isZh ? "比较 Credits 与订阅" : "Compare credits and subscriptions"}
            highlights={[
              isZh ? "把 SEO 页面和站内真实工作台连成闭环" : "Creates a closed loop between SEO pages and the real in-site console",
              isZh ? "适合继续加上传首帧、镜头控制等参数" : "Leaves space for first-frame upload and motion controls later",
              isZh ? "避免把高意图用户困在纯内容页面里" : "Prevents high-intent users from getting stuck on a copy-only page",
            ]}
          />

          <SeoRichContent
            locale={localeKey}
            keyword={isZh ? "图生视频" : "image to video"}
            introTitle={isZh ? "什么是图生视频页面？" : "What is the image-to-video page?"}
            introBody={[
              isZh
                ? "图生视频页负责承接『image to video』『animate image』这类需求型搜索。相比模型页，它更强调工作流，而不是单一模型名。"
                : "The image-to-video page is designed to capture workflow intent like 'image to video' and 'animate image'. Compared with a model page, it is more about the workflow than about one specific model name.",
              isZh
                ? "在品牌站结构中，这类页面要承担一个中间层角色：既把用户引向合适模型，也把权重传回 AI 视频中心。"
                : "Inside a brand-led site architecture, this kind of page acts as a middle layer: it sends users into the right model pages while also feeding authority back into the AI video pillar.",
            ]}
            stepsTitle={isZh ? "如何在 Imaveo 上完成图生视频" : "How to create image-to-video on Imaveo"}
            steps={[
              isZh ? "先准备一张静态图，并判断你需要更稳定的动画还是更快的迭代。" : "Start with a still image and decide whether you prioritize stable motion or rapid iteration.",
              isZh ? "根据目标风格选择更适合的模型页，再进入图生视频工作流。" : "Choose the most relevant model page for the target look, then continue with the image-to-video workflow.",
              isZh ? "生成后检查镜头感和一致性，再决定是否继续购买 Credits 或升级套餐。" : "Review motion quality and consistency, then decide whether to continue with credits or move to a paid plan.",
            ]}
            useCasesTitle={isZh ? "哪些搜索意图会进入图生视频页？" : "What search intent does the image-to-video page capture?"}
            useCases={[
              isZh ? "希望把角色设定图、海报或产品图动画化的用户" : "Users who want to animate character art, posters, or product visuals",
              isZh ? "先搜工作流词，再挑模型的生产型用户" : "Production users who search the workflow first and choose the model second",
              isZh ? "从品牌首页进入后，需要快速找到图生视频入口的用户" : "Users coming from the brand home page who need a clear image-to-video path",
              isZh ? "需要比较模型能力、成本和速度的高意图转化流量" : "High-intent visitors comparing model quality, cost, and speed",
            ]}
            faqTitle={isZh ? "图生视频常见问题" : "Image-to-video FAQ"}
            faqs={[
              {
                question: isZh ? "图生视频页和模型页的区别是什么？" : "What is the difference between the image-to-video page and model pages?",
                answer: isZh
                  ? "图生视频页承接的是工作流需求词，模型页承接的是模型品牌词。两者分层之后，站点更容易覆盖更广的搜索意图。"
                  : "The image-to-video page captures workflow keywords, while model pages capture model-brand keywords. Keeping both layers separate helps the site cover a wider range of search intent.",
              },
              {
                question: isZh ? "这类页面为什么要有 FAQ 和步骤说明？" : "Why should this page include FAQs and step-by-step guidance?",
                answer: isZh
                  ? "因为这类内容会让页面更具解释性，降低薄内容风险，同时也能帮助搜索引擎和用户更快理解页面主题。"
                  : "Because these sections make the page more explanatory, reduce thin-content risk, and help both users and search engines understand the topic faster.",
              },
            ]}
            relatedTitle={isZh ? "继续浏览相关页面" : "Continue with related pages"}
            relatedLinks={[
              {
                label: isZh ? "AI 视频中心" : "AI Video Hub",
                href: `/${locale}/ai-video`,
                description: isZh ? "返回视频类 pillar page。" : "Return to the main AI video pillar page.",
              },
              {
                label: isZh ? "价格方案" : "Pricing",
                href: `/${locale}/pricing`,
                description: isZh ? "比较订阅和 Credits 方案。" : "Compare subscription and credits options.",
              },
              ...videoModels.map((model) => ({
                label: model.labels[localeKey],
                href: `/${locale}${model.href}`,
                description: model.descriptions[localeKey],
              })),
            ]}
          />
        </div>
      </div>
    </section>
  );
}
