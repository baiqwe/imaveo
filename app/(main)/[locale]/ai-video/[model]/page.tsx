import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Clapperboard } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { SeoConversionPanel } from "@/components/seo/seo-conversion-panel";
import { SeoRichContent } from "@/components/seo/seo-rich-content";
import { site } from "@/config/site";
import { getImaveoModel, imaveoModels } from "@/config/imaveo";
import { locales } from "@/i18n/routing";
import { buildAbsoluteUrl, buildLocaleAlternates, getModelMetadata } from "@/utils/seo/metadata";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    imaveoModels
      .filter((model) => model.category === "video")
      .map((model) => ({
        locale,
        model: model.slug,
      }))
  );
}

export async function generateMetadata(props: { params: Promise<{ locale: string; model: string }> }): Promise<Metadata> {
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

export default async function VideoModelPage(props: { params: Promise<{ locale: string; model: string }> }) {
  const { locale, model } = await props.params;
  const item = getImaveoModel(model, "video");
  const localeKey = locale as "en" | "zh";
  const isZh = locale === "zh";

  if (!item) notFound();

  const siblingModels = imaveoModels.filter((entry) => entry.category === "video" && entry.slug !== item.slug);

  return (
    <section className="py-16 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-6xl space-y-10">
          <Breadcrumbs
            items={[
              { name: isZh ? "首页" : "Home", href: `/${locale}` },
              { name: isZh ? "AI 视频" : "AI Video", href: `/${locale}/ai-video` },
              { name: item.labels[localeKey], href: `/${locale}/ai-video/${item.slug}` },
            ]}
          />

          <div className="rounded-[36px] border border-white/10 bg-white/[0.03] p-8 md:p-10">
            <div className="section-label">AI Video Model</div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-black">
                {item.badge}
              </span>
              <span className="text-sm uppercase tracking-[0.18em] text-white/40">{item.provider}</span>
            </div>
            <h1 className="mt-5 text-5xl font-medium tracking-[-0.05em] text-white">{item.labels[localeKey]}</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-white/58">{item.descriptions[localeKey]}</p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {item.strengths[localeKey].map((strength) => (
                <div key={strength} className="rounded-[24px] border border-white/10 bg-black/35 p-5 text-sm text-white/68">
                  {strength}
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <Link
                href={`/${locale}/ai-video`}
                className="rounded-[24px] border border-white/10 bg-black/30 p-5 transition-colors hover:border-primary/35 hover:bg-white/[0.04]"
              >
                <div className="section-label">{isZh ? "Pillar" : "Pillar"}</div>
                <div className="mt-3 text-xl font-medium text-white">{isZh ? "回到 AI 视频中心" : "Back to AI video hub"}</div>
                <div className="mt-2 text-sm leading-7 text-white/52">
                  {isZh ? "查看所有 AI 视频模型和工作流入口。" : "See all AI video models and workflow entry points."}
                </div>
              </Link>
              <Link
                href={`/${locale}/${item.mode}`}
                className="rounded-[24px] border border-white/10 bg-black/30 p-5 transition-colors hover:border-primary/35 hover:bg-white/[0.04]"
              >
                <div className="section-label">{isZh ? "Workflow" : "Workflow"}</div>
                <div className="mt-3 text-xl font-medium text-white">{isZh ? "查看对应工作流" : "Open matching workflow"}</div>
                <div className="mt-2 text-sm leading-7 text-white/52">
                  {isZh ? "进入与该模型最相关的工具页和场景页。" : "Open the workflow page most aligned to this model."}
                </div>
              </Link>
              <Link
                href={`/${locale}/pricing`}
                className="rounded-[24px] border border-white/10 bg-black/30 p-5 transition-colors hover:border-primary/35 hover:bg-white/[0.04]"
              >
                <div className="section-label">{isZh ? "Pricing" : "Pricing"}</div>
                <div className="mt-3 text-xl font-medium text-white">{isZh ? "查看套餐与 Credits" : "View plans and credits"}</div>
                <div className="mt-2 text-sm leading-7 text-white/52">
                  {isZh ? "对比订阅方案和按次购买的 Credits。" : "Compare subscriptions and pay-as-you-go credits."}
                </div>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/${locale}`}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-black"
              >
                {isZh ? "返回首页中枢" : "Back to the hub"} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <SeoConversionPanel
            eyebrow={isZh ? "Take Action" : "Take Action"}
            title={isZh ? `把 ${item.labels.zh} 的兴趣直接转成一次试用` : `Turn ${item.labels.en} interest into an actual trial`}
            description={
              isZh
                ? `如果用户已经在看 ${item.labels.zh} 这种模型页，说明他已经进入比较阶段。最有效的动作不是再读一屏内容，而是直接进入视频控制台或对应工作流，继续往生成动作推进。`
                : `If a visitor is already on a model page like ${item.labels.en}, they are in comparison mode. The most effective next step is not another paragraph, but a direct route into the video console or matching workflow.`
            }
            primaryHref={`/${locale}/?mode=video#hero-console`}
            primaryLabel={isZh ? `试用 ${item.labels.zh} 路径` : `Launch ${item.labels.en} flow`}
            secondaryHref={`/${locale}/${item.mode}`}
            secondaryLabel={isZh ? "先看对应工作流" : "Open matching workflow"}
            highlights={[
              isZh ? "让模型词流量直接进入可行动的路径" : "Turns model-keyword traffic into an actionable path",
              isZh ? "保留继续横向比较 Veo、Kling 等模型的空间" : "Keeps room for lateral comparison across Veo, Kling, and others",
              isZh ? "不会打断当前页已经建立的 SEO 结构和内链" : "Does not break the SEO structure and internal linking already added to the page",
            ]}
          />

          <SeoRichContent
            locale={localeKey}
            keyword={item.labels[localeKey]}
            introTitle={isZh ? `${item.labels.zh} 是什么？` : `What is ${item.labels.en}?`}
            introBody={[
              isZh
                ? `${item.labels.zh} 是 Imaveo AI 视频矩阵中的一条独立模型页。这个页面不只是一个生成入口，更承担模型词搜索流量、产品解释和站内权重分发的作用。`
                : `${item.labels.en} is a dedicated model page inside the Imaveo AI video cluster. It is not just a generation entry point, but also a place to explain the model and capture model-specific search demand.`,
              isZh
                ? `${item.labels.zh} 当前的优势包括 ${item.strengths.zh.join("、")}。在品牌站策略里，这类页面应该同时链接回 AI 视频中心、对应工作流页面和邻近模型页，形成完整的 hub-and-spoke 结构。`
                : `${item.labels.en} stands out for ${item.strengths.en.join(", ")}. In a brand-led hub-and-spoke SEO structure, this page should link back to the AI video hub, the relevant workflow page, and nearby model alternatives.`,
            ]}
            stepsTitle={isZh ? `如何在 Imaveo 上使用 ${item.labels.zh}` : `How to use ${item.labels.en} on Imaveo`}
            steps={[
              isZh ? `先进入 ${item.labels.zh} 模型页，确认它更适合你的镜头语言和输出质量。` : `Start on the ${item.labels.en} page and confirm that its output style fits your production goals.`,
              isZh ? "根据需求选择文生视频或图生视频工作流，并填写提示词或上传首帧。" : "Choose the matching workflow, then enter a prompt or upload a source image depending on the mode.",
              isZh ? "生成后再根据预算决定是否继续使用订阅或 Credits 扩大量产。" : "After testing outputs, decide whether to scale with a subscription or credits pack.",
            ]}
            useCasesTitle={isZh ? `${item.labels.zh} 适合哪些场景？` : `When should creators use ${item.labels.en}?`}
            useCases={[
              isZh ? `适合需要 ${item.strengths.zh[0]} 的创作者项目。` : `Best for creator workflows that need ${item.strengths.en[0].toLowerCase()}.`,
              isZh ? `适合把 ${item.labels.zh} 作为主力模型来测试镜头感和成片一致性。` : `Useful when ${item.labels.en} is your primary model for testing motion quality and output consistency.`,
              isZh ? "适合先做模型页承接搜索，再把用户引导到价格页和工作流页。 " : "Works well as a ranking page that routes users into workflows and pricing once intent is established.",
              isZh ? "适合品牌站中做模型对比和高意图流量转化。" : "Ideal for model comparison and high-intent conversion inside a branded tool hub.",
            ]}
            faqTitle={isZh ? `${item.labels.zh} 常见问题` : `${item.labels.en} FAQ`}
            faqs={[
              {
                question: isZh ? `${item.labels.zh} 适合直接做 SEO 落地页吗？` : `Is ${item.labels.en} suitable as an SEO landing page?`,
                answer: isZh
                  ? "适合，但前提是页面不能只有生成器。你需要配上解释性内容、FAQ、工作流说明和站内内链，Google 才更容易理解它的主题价值。"
                  : "Yes, but only if the page includes more than a generator UI. Explanatory copy, FAQs, workflow guidance, and internal links make it much more understandable to search engines.",
              },
              {
                question: isZh ? `${item.labels.zh} 应该怎么和其他模型页互相链接？` : `How should ${item.labels.en} link to other model pages?`,
                answer: isZh
                  ? "最佳做法是链接回 AI 视频中心，并横向链接到 1 到 3 个相邻模型页，再补一个对应场景页。这样能形成稳定的权重分发路径。"
                  : "The best pattern is to link back to the AI video hub, cross-link to one to three neighboring model pages, and include one matching workflow page. That creates a stable internal authority flow.",
              },
            ]}
            relatedTitle={isZh ? "继续浏览相关页面" : "Continue with related pages"}
            relatedLinks={[
              {
                label: isZh ? "AI 视频中心" : "AI Video Hub",
                href: `/${locale}/ai-video`,
                description: isZh ? "回到视频类 pillar page。" : "Return to the pillar page for AI video.",
              },
              {
                label: isZh ? "查看对应工作流" : "Matching workflow",
                href: `/${locale}/${item.mode}`,
                description: isZh ? "根据该模型的主要模式进入工作流页。" : "Open the workflow page aligned to this model.",
              },
              ...siblingModels.map((entry) => ({
                label: entry.labels[localeKey],
                href: `/${locale}${entry.href}`,
                description: entry.descriptions[localeKey],
              })),
            ]}
          />
        </div>
      </div>
    </section>
  );
}
