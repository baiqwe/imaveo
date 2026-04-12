import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ImageIcon } from "lucide-react";
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
    ? "浏览 Imaveo 上的 AI 图片模型，包括 Flux 与 Animeify，并按封面、海报、头像等不同场景选择工具。"
    : "Explore AI image models on Imaveo including Flux and Animeify, and choose the right tool for covers, posters, avatars, and branded visuals.";
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
                ? "这个 pillar 页负责承接 AI 图片生成的品牌词和大类词，再把权重分发到 Flux、Animeify 以及更细分的图片内页。"
                : "This pillar page captures broad AI image demand, then distributes authority into Flux, Animeify, and more specialized image pages."}
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
                ? "如果你已经知道自己想做封面、海报或品牌视觉，直接进入首页的图片控制台；如果你想先拿到一张稳定可用的结果，也可以直接切进 Animeify Studio 上传图片开始生成。"
                : "If you already know you need posters, covers, or branded visuals, jump straight into the home image console. If you want the fastest path to a first usable result, go directly into Animeify Studio and upload an image."
            }
            primaryHref={buildStudioHref(locale, { mode: "text-to-image", model: "flux-pro", source: "seo-ai-image" })}
            primaryLabel={isZh ? "打开图片控制台" : "Open image console"}
            secondaryHref={buildStudioHref(locale, { mode: "image-to-image", model: "animeify", style: "anime", source: "seo-ai-image" })}
            secondaryLabel={isZh ? "直接进入 Animeify Studio" : "Open Animeify Studio"}
            highlights={[
              isZh ? "保留现有站内真实入口，不额外分叉新的转化路径" : "Reuses the existing live entry instead of splitting traffic into a fake flow",
              isZh ? "更适合把模型页、工作流页和首页控制台串成一个 funnel" : "Connects model pages, workflow pages, and the home console into one funnel",
              isZh ? "让搜索流量在首屏就能做动作，而不是只读内容" : "Lets search traffic take action immediately instead of only reading copy",
            ]}
          />

          <SeoRichContent
            locale={localeKey}
            keyword={isZh ? "AI 图片模型中心" : "AI image models hub"}
            introTitle={isZh ? "什么是 Imaveo 的 AI 图片中心？" : "What is the Imaveo AI image hub?"}
            introBody={[
              isZh
                ? "AI 图片中心是品牌站中的另一个 pillar。它负责承接大类图片生成需求，再把用户引导到更具体的模型页和工作流页。"
                : "The AI image hub is another pillar inside the brand site. It captures broad image-generation demand and routes users into more specific model pages and workflows.",
              isZh
                ? "对 SEO 来说，这种中心页可以帮助模型页获得更稳定的上层内链，也能让站点在 Google 看起来更像一个完整产品，而不是零散工具集合。"
                : "For SEO, this structure helps model pages receive stronger top-down internal links and makes the whole site look like a complete product rather than a loose collection of tools.",
            ]}
            stepsTitle={isZh ? "如何使用 Imaveo 选择图片模型" : "How to choose the right image model on Imaveo"}
            steps={[
              isZh ? "先判断你要生成的是品牌视觉、海报还是人物头像。" : "Decide whether you need brand visuals, posters, or portraits.",
              isZh ? "再根据结果风格进入 Flux 或 Animeify 等模型页。" : "Visit Flux or Animeify model pages depending on your target style.",
              isZh ? "最后根据频率选择订阅或 Credits 包。" : "Choose subscriptions or credits packs based on how often you generate.",
            ]}
            useCasesTitle={isZh ? "哪些搜索意图适合 AI 图片中心？" : "Which search intents does the AI image hub capture?"}
            useCases={[
              isZh ? "搜索『AI 图片生成器』的泛意图用户" : "Broad users searching for 'AI image generator'",
              isZh ? "搜索 Flux、Animeify 等模型关键词的用户" : "Users searching model terms like Flux and Animeify",
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
                question: isZh ? "Animeify 应该单独做品牌还是挂在 Imaveo 下？" : "Should Animeify be its own brand or stay under Imaveo?",
                answer: isZh
                  ? "从 SEO 和商业化角度看，更建议保留它的子品牌属性，但继续挂在 Imaveo 主站下，复用权重、支付和账户系统。"
                  : "From both SEO and monetization perspectives, it works better as a specialized sub-brand inside Imaveo, sharing the same authority, billing, and account system.",
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
