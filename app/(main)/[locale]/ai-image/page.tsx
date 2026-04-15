import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ImageIcon } from "lucide-react";
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
  const pathname = `/${locale}/ai-image`;
  const title = isZh ? "AI 图片模型中心 | Imaveo" : "AI Image Models Hub | Imaveo";
  const description = isZh
    ? "浏览 Imaveo 上的 AI 图片模型，并按封面、海报、商品图和品牌视觉等场景选择工具。"
    : "Explore AI image models on Imaveo and choose the right tool for covers, posters, product visuals, and branded image work.";
  const ogDescription = isZh ? "一个承接 AI 图片模型和图片工作流搜索的中心页。" : "A central page that captures AI image model and workflow demand.";
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

export default async function AiImageHubPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const isZh = locale === "zh";
  const localeKey = locale as "en" | "zh";
  const models = imaveoModels.filter((model) => model.category === "image");

  return (
    <div className="py-16 md:py-20">
      <CollectionPageSchema
        name={isZh ? "Imaveo AI 图片中心" : "Imaveo AI Image Hub"}
        description={isZh ? "浏览 Imaveo 上的 AI 图片模型、工作流和相关入口。" : "Explore AI image models, workflows, and related entry points on Imaveo."}
        url={`/${locale}/ai-image`}
        locale={locale}
        items={models.map((model) => ({
          name: model.labels[localeKey],
          url: `/${locale}${model.href}`,
        }))}
      />
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-6xl space-y-10">
          <Breadcrumbs
            items={[
              { name: isZh ? "首页" : "Home", href: `/${locale}` },
              { name: isZh ? "AI 图片" : "AI Image", href: `/${locale}/ai-image` },
            ]}
            className="mb-2"
          />

          <section className="rounded-[36px] border border-white/10 bg-white/[0.03] p-8 md:p-10">
            <div className="section-label">AI Image Hub</div>
            <h1 className={`mt-3 text-5xl font-medium text-white ${isZh ? "tracking-normal" : "tracking-[-0.05em]"}`}>
              {isZh ? "AI 图片模型与工作流中心" : "The hub for AI image models and workflows"}
            </h1>
            <p className="mt-4 max-w-4xl text-base leading-7 text-zinc-300">
              {isZh
                ? "在这里比较主流图片模型，快速判断哪一种更适合海报、缩略图、商品图或品牌主视觉。"
                : "Compare leading image models here and decide which one best fits posters, thumbnails, product shots, or branded visuals."}
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {models.map((model) => (
                <Link key={model.slug} href={`/${locale}${model.href}`} className="rounded-[28px] border border-white/10 bg-black/25 p-6 transition-colors hover:border-primary/35 hover:bg-white/[0.04]">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-primary">
                        <ImageIcon className="h-3.5 w-3.5" />
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
            eyebrow={isZh ? "Live Entry" : "Live Entry"}
            title={isZh ? "从这里进入真实的图片生成入口" : "Jump from SEO traffic into a real image generation entry"}
            description={
              isZh
                ? "如果你已经知道自己想做封面、海报、广告图或品牌视觉，直接进入创作中心开始生成，再根据结果切换模型。"
                : "If you already know you need covers, posters, ad visuals, or brand assets, open the Studio and start generating right away, then switch models as needed."
            }
            primaryHref={buildStudioHref(locale, { mode: "text-to-image", model: "flux-pro", source: "seo-ai-image" })}
            primaryLabel={isZh ? "打开图片控制台" : "Open image console"}
            secondaryHref={`/${locale}/pricing`}
            secondaryLabel={isZh ? "查看套餐与 Credits" : "View plans and credits"}
            highlights={[
              isZh ? "一个入口承接不同图片任务，不需要额外跳转" : "One image entry point handles multiple image-generation jobs",
              isZh ? "适合把模型页、工作流页和创作中心串成一条完整路径" : "Connects model pages, workflow pages, and the Studio into one path",
              isZh ? "先开始生成，再根据结果切换模型更高效" : "Start generating first, then change models based on the result you need",
            ]}
          />

          <SeoRichContent
            locale={localeKey}
            keyword={isZh ? "AI 图片模型中心" : "AI image models hub"}
            introTitle={isZh ? "什么是 Imaveo 的 AI 图片中心？" : "What is the Imaveo AI image hub?"}
            introBody={[
              isZh
                ? "AI 图片中心是品牌站中的另一个 pillar。它负责承接大类图片生成需求，再把用户引导到更具体的模型页和工作流页。"
                : "The AI image hub is the place to compare image-generation options before moving into a specific model page or straight into the Studio.",
              isZh
                ? "对创作者来说，这种中心页能先把场景分清楚，再决定用哪个模型、更适合走文生图还是图生图。"
                : "For creators, this kind of hub clarifies the job first, then helps decide which model and workflow make the most sense.",
            ]}
            stepsTitle={isZh ? "如何使用 Imaveo 选择图片模型" : "How to choose the right image model on Imaveo"}
            steps={[
              isZh ? "先判断你要生成的是品牌视觉、海报还是人物头像。" : "Decide whether you need brand visuals, posters, or portraits.",
              isZh ? "再根据结果类型进入对应模型页，或直接打开创作中心开始生成。" : "Then move into the matching model page or go straight to the Studio to start generating.",
              isZh ? "最后根据频率选择订阅或 Credits 包。" : "Choose subscriptions or credits packs based on how often you generate.",
            ]}
            useCasesTitle={isZh ? "哪些搜索意图适合 AI 图片中心？" : "Which search intents does the AI image hub capture?"}
            useCases={[
              isZh ? "搜索『AI 图片生成器』的泛意图用户" : "Broad users searching for 'AI image generator'",
              isZh ? "搜索 Flux 等模型关键词的用户" : "Users searching for model terms such as Flux",
              isZh ? "搜索海报、封面、品牌图等结果导向词的用户" : "Users searching outcome-driven terms like posters, hero art, and brand visuals",
              isZh ? "需要统一比较模型、价格和工作流的创作者" : "Creators who want to compare models, pricing, and workflows in one place",
            ]}
            faqTitle={isZh ? "AI 图片中心常见问题" : "AI image hub FAQ"}
            faqs={[
              {
                question: isZh ? "为什么图片模型也需要做 pillar page？" : "Why does AI image also need a pillar page?",
                answer: isZh
                  ? "因为图片模型、风格词和结果词本身会形成一整个搜索簇。Pillar page 的作用就是把这些意图组织起来并持续分发权重。"
                  : "Because image models, style terms, and outcome-driven keywords form a whole search cluster. A pillar page organizes those intents and distributes authority over time.",
              },
              {
                question: isZh ? "AI 图片中心和创作中心有什么区别？" : "What is the difference between the AI image hub and the Studio?",
                answer: isZh
                  ? "AI 图片中心负责比较模型与场景，创作中心负责真正开始生成。前者适合了解选项，后者适合直接动手。"
                  : "The AI image hub helps you compare models and use cases, while the Studio is where you actually start generating. One is for orientation, the other is for action.",
              },
            ]}
            relatedTitle={isZh ? "继续浏览相关页面" : "Continue with related pages"}
            relatedLinks={models.map((model) => ({
              label: model.labels[localeKey],
              href: `/${locale}${model.href}`,
              description: model.descriptions[localeKey],
            }))}
          />
        </div>
      </div>
    </div>
  );
}
