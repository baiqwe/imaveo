import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Film, Sparkles } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { SeoConversionPanel } from "@/components/seo/seo-conversion-panel";
import { SeoRichContent } from "@/components/seo/seo-rich-content";
import { imaveoModels } from "@/config/imaveo";
import { site } from "@/config/site";
import { buildAbsoluteUrl, buildLocaleAlternates, getToolMetadata } from "@/utils/seo/metadata";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const localeKey = locale as "en" | "zh";
  const seo = getToolMetadata(localeKey, "text-to-video");
  const pathname = `/${locale}/text-to-video`;
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

export default async function TextToVideoPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const isZh = locale === "zh";
  const localeKey = locale as "en" | "zh";
  const videoModels = imaveoModels.filter((model) => model.category === "video");

  return (
    <section className="py-16 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-6xl space-y-10">
          <Breadcrumbs
            items={[
              { name: isZh ? "首页" : "Home", href: `/${locale}` },
              { name: isZh ? "AI 视频" : "AI Video", href: `/${locale}/ai-video` },
              { name: isZh ? "文生视频" : "Text to Video", href: `/${locale}/text-to-video` },
            ]}
          />

          <div className="rounded-[36px] border border-white/10 bg-white/[0.03] p-8 md:p-10">
            <div className="section-label">Text to Video</div>
            <h1 className="mt-3 text-5xl font-medium tracking-[-0.05em] text-white">
              {isZh ? "一句话生成 AI 视频" : "Generate AI videos from a single prompt"}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-white/58">
              {isZh
                ? "这个页面用于承接文生视频类搜索与转化，并把用户导向最合适的视频模型、定价页和品牌首页。"
                : "This page captures text-to-video intent and routes users into the right video model pages, pricing, and the brand hub."}
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <Link
                href={`/${locale}/ai-video`}
                className="rounded-[24px] border border-white/10 bg-black/30 p-5 transition-colors hover:border-primary/35 hover:bg-white/[0.04]"
              >
                <div className="section-label">{isZh ? "Pillar" : "Pillar"}</div>
                <div className="mt-3 text-xl font-medium text-white">{isZh ? "AI 视频中心" : "AI Video Hub"}</div>
                <div className="mt-2 text-sm leading-7 text-white/52">
                  {isZh ? "浏览所有视频模型与工作流。" : "Explore all video models and workflows."}
                </div>
              </Link>
              <Link
                href={`/${locale}/pricing`}
                className="rounded-[24px] border border-white/10 bg-black/30 p-5 transition-colors hover:border-primary/35 hover:bg-white/[0.04]"
              >
                <div className="section-label">{isZh ? "Pricing" : "Pricing"}</div>
                <div className="mt-3 text-xl font-medium text-white">{isZh ? "套餐与 Credits" : "Plans and credits"}</div>
                <div className="mt-2 text-sm leading-7 text-white/52">
                  {isZh ? "比较订阅与按次购买方案。" : "Compare subscriptions and pay-as-you-go credits."}
                </div>
              </Link>
              <Link
                href={`/${locale}`}
                className="rounded-[24px] border border-white/10 bg-black/30 p-5 transition-colors hover:border-primary/35 hover:bg-white/[0.04]"
              >
                <div className="section-label">{isZh ? "Brand" : "Brand"}</div>
                <div className="mt-3 text-xl font-medium text-white">{isZh ? "返回首页中枢" : "Back to the hub"}</div>
                <div className="mt-2 text-sm leading-7 text-white/52">
                  {isZh ? "回到品牌首页，继续切换其他工作流。" : "Return to the brand console and switch into other workflows."}
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
                      <p className="mt-3 text-sm leading-7 text-white/52">{model.descriptions[localeKey]}</p>
                    </div>
                    <Film className="h-5 w-5 text-white/35" />
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
            eyebrow={isZh ? "Conversion Entry" : "Conversion Entry"}
            title={isZh ? "把文生视频需求直接送到视频工作台" : "Route text-to-video demand straight into the video console"}
            description={
              isZh
                ? "文生视频访客通常已经具备明确动作意图。这里不再让他跳来跳去，而是直接把他送到首页视频控制台，再顺着模型卡片去 Veo 或 Kling。"
                : "Text-to-video visitors usually arrive with a concrete action in mind. Rather than making them browse more layers, send them into the home video console first and then let them choose Veo or Kling from there."
            }
            primaryHref={`/${locale}/?mode=video#hero-console`}
            primaryLabel={isZh ? "立即进入文生视频入口" : "Open text-to-video entry"}
            secondaryHref={`/${locale}/pricing`}
            secondaryLabel={isZh ? "先看价格方案" : "Review pricing first"}
            highlights={[
              isZh ? "CTA 和页面主题完全一致，减少跳转犹豫" : "The CTA matches the page intent closely, reducing hesitation",
              isZh ? "继续复用首页已有视频模式切换逻辑" : "Reuses the existing home-page video mode switching logic",
              isZh ? "保留后续接真实 prompt 表单的升级空间" : "Leaves a clean path for a future real prompt form",
            ]}
          />

          <SeoRichContent
            locale={localeKey}
            keyword={isZh ? "文生视频" : "text to video"}
            introTitle={isZh ? "什么是文生视频页面？" : "What is the text-to-video page?"}
            introBody={[
              isZh
                ? "文生视频页是 Imaveo 的核心 cluster page 之一。它主要承接『text to video』『AI 视频生成器』这类场景词，再把用户分发到最适合的模型页和价格页。"
                : "The text-to-video page is one of Imaveo's core cluster pages. It captures scenario-driven search intent like 'text to video' or 'AI video generator' and routes users into the best model pages and pricing paths.",
              isZh
                ? "如果只有一个输入框，这类页面很容易变成薄内容。加入步骤说明、适用场景和 FAQ 后，搜索引擎更容易理解这个页面解决的是哪类需求。"
                : "If it only contains a prompt box, this kind of page risks becoming thin content. Adding how-to guidance, use cases, and FAQs makes the page much easier for search engines to classify and rank.",
            ]}
            stepsTitle={isZh ? "如何在 Imaveo 上完成文生视频" : "How to create text-to-video on Imaveo"}
            steps={[
              isZh ? "先选择 Veo 或 Kling 等最适合当前项目的视频模型。" : "Choose the video model that best matches your project, such as Veo or Kling.",
              isZh ? "输入提示词，并逐步确认时长、比例和镜头氛围等关键参数。" : "Enter your prompt, then refine duration, aspect ratio, and overall camera mood.",
              isZh ? "根据生成频率进入价格页，决定使用订阅还是 Credits。" : "Visit pricing and decide whether subscriptions or credits are the better fit for your generation volume.",
            ]}
            useCasesTitle={isZh ? "哪些搜索意图会进入文生视频页？" : "What search intent does the text-to-video page capture?"}
            useCases={[
              isZh ? "搜索『文生视频』『AI 视频生成』这类泛场景词的用户" : "Users searching broad workflow terms like 'text to video' or 'AI video generator'",
              isZh ? "想先明确工作流，再决定选哪个模型的创作者" : "Creators who want the workflow first, then the model decision",
              isZh ? "准备从品牌首页继续深入具体模型页的高意图用户" : "High-intent users moving from the home hub into specific model pages",
              isZh ? "需要比较效果、速度和价格的实际生产用户" : "Production-minded users comparing output quality, speed, and price",
            ]}
            faqTitle={isZh ? "文生视频常见问题" : "Text-to-video FAQ"}
            faqs={[
              {
                question: isZh ? "文生视频页为什么要链接到模型页？" : "Why should the text-to-video page link to model pages?",
                answer: isZh
                  ? "因为场景页负责承接需求词，而模型页负责承接模型词。两者互相链接后，搜索引擎更容易理解站点的主题结构。"
                  : "Because workflow pages capture scenario intent while model pages capture model intent. Linking them together helps search engines understand the site's topic hierarchy.",
              },
              {
                question: isZh ? "文生视频页面适合做长文 SEO 吗？" : "Should the text-to-video page include long-form SEO content?",
                answer: isZh
                  ? "适合，而且非常有必要。对这类工具页来说，正文内容、FAQ 和内链往往决定了能否稳定收录。"
                  : "Yes, and it is often necessary. For workflow pages like this, body copy, FAQs, and internal links are what make indexing and ranking stable over time.",
              },
            ]}
            relatedTitle={isZh ? "继续浏览相关页面" : "Continue with related pages"}
            relatedLinks={[
              {
                label: isZh ? "AI 视频中心" : "AI Video Hub",
                href: `/${locale}/ai-video`,
                description: isZh ? "回到视频类 pillar page。" : "Return to the main AI video pillar page.",
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
