import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WebPageSchema } from "@/components/breadcrumb-schema";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { SeoConversionPanel } from "@/components/seo/seo-conversion-panel";
import { SeoRichContent } from "@/components/seo/seo-rich-content";
import { site } from "@/config/site";
import { getImaveoModel, imaveoModels } from "@/config/imaveo";
import { locales } from "@/i18n/routing";
import { buildAbsoluteUrl, buildLocaleAlternates, getModelMetadata } from "@/utils/seo/metadata";
import { buildStudioHref } from "@/utils/studio";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    imaveoModels
      .filter((model) => model.category === "image")
      .map((model) => ({
        locale,
        model: model.slug,
      }))
  );
}

export async function generateMetadata(props: { params: Promise<{ locale: string; model: string }> }): Promise<Metadata> {
  const { locale, model } = await props.params;
  const item = getImaveoModel(model, "image");
  if (!item) return {};
  const localeKey = locale as "en" | "zh";
  const seo = getModelMetadata(localeKey, model, "image");
  const pathname = `/${locale}/ai-image/${model}`;
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

export default async function ImageModelPage(props: { params: Promise<{ locale: string; model: string }> }) {
  const { locale, model } = await props.params;
  const item = getImaveoModel(model, "image");
  const localeKey = locale as "en" | "zh";
  const isZh = locale === "zh";

  if (!item) notFound();

  const siblingModels = imaveoModels.filter((entry) => entry.category === "image" && entry.slug !== item.slug);
  const recommendedWorkflowHref = `/${locale}/create?mode=text-to-image&model=${item.slug}`;
  const recommendedWorkflowLabel = isZh ? "文生图 / Studio" : "Text to Image / Studio";
  const defaultAspectRatio = item.generationDefaults?.aspectRatio ?? "1:1";
  const defaultStyle = item.generationDefaults?.style ?? (isZh ? "营销视觉" : "Marketing visual");
  const pathRecommendations = [
    {
      label: isZh ? "最快起步路径" : "Fastest path",
      title: isZh ? `先进入 ${recommendedWorkflowLabel}` : `Start with ${recommendedWorkflowLabel}`,
      description: isZh
        ? `如果你要用 ${item.labels.zh} 做品牌视觉，先在 Studio 里用文生图模式起一个稳定版本。`
        : `If you are using ${item.labels.en} for branded visuals, begin with text-to-image in the Studio and create a stable first version.`,
      href: recommendedWorkflowHref,
    },
    {
      label: isZh ? "模型比较路径" : "Compare path",
      title: isZh ? "回到 AI 图片中心继续比较" : "Compare from the AI image hub",
      description: isZh
        ? "如果还在不同图片模型之间比较，回到图片中心再横向看模型和结果方向。"
        : "If you are still comparing image models, return to the AI image hub and compare model fit by outcome.",
      href: `/${locale}/ai-image`,
    },
    {
      label: isZh ? "后续承接路径" : "Follow-through path",
      title: isZh ? "生成后进入资产库管理结果" : "Manage outputs in the creations library",
      description: isZh
        ? "用创作资产页承接复看、下载和后续筛选，让图片链路更完整。"
        : "Use the creations library for review, download, and later filtering so the image workflow feels complete.",
      href: `/${locale}/my-creations`,
    },
  ];
  const parameterGuidance = [
    {
      label: isZh ? "推荐比例" : "Suggested ratio",
      value: defaultAspectRatio,
      description: isZh ? "先用这个比例起第一版，便于验证主体、文案和版式。" : "Use this ratio first to validate subject framing, copy placement, and overall composition.",
    },
    {
      label: isZh ? "推荐风格" : "Suggested style",
      value: defaultStyle,
      description: isZh ? "先用默认风格建立稳定结果，再决定是否做更激进的风格化。" : "Start with the default style for a stable result, then branch into stronger stylization if needed.",
    },
    {
      label: isZh ? "最适合的 workflow" : "Best-fit workflow",
      value: recommendedWorkflowLabel,
      description: isZh ? "优先沿这个 workflow 进入，减少用户在不匹配的生成方式上浪费时间。" : "Prefer this workflow so users do not waste time inside a mismatched generation mode.",
    },
  ];

  return (
    <section className="py-16 md:py-20">
      <WebPageSchema
        name={`${item.labels[localeKey]} | Imaveo`}
        description={item.descriptions[localeKey]}
        url={`/${locale}/ai-image/${item.slug}`}
        locale={locale}
      />
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-6xl space-y-10">
          <Breadcrumbs
            items={[
              { name: isZh ? "首页" : "Home", href: `/${locale}` },
              { name: isZh ? "AI 图片" : "AI Image", href: `/${locale}/ai-image` },
              { name: item.labels[localeKey], href: `/${locale}/ai-image/${item.slug}` },
            ]}
          />

          <div className="rounded-[36px] border border-white/10 bg-white/[0.03] p-8 md:p-10">
            <div className="section-label">AI Image Model</div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-black">
                {item.badge}
              </span>
              <span className="text-sm uppercase tracking-[0.18em] text-zinc-500">{item.provider}</span>
            </div>
            <h1 className={`mt-5 text-5xl font-medium text-white ${isZh ? "tracking-normal" : "tracking-[-0.05em]"}`}>{item.labels[localeKey]}</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-300">{item.descriptions[localeKey]}</p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {item.strengths[localeKey].map((strength) => (
                <div key={strength} className="rounded-[24px] border border-white/10 bg-black/35 p-5 text-sm text-white/68">
                  {strength}
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <Link
                href={`/${locale}/ai-image`}
                className="rounded-[24px] border border-white/10 bg-black/30 p-5 transition-colors hover:border-primary/35 hover:bg-white/[0.04]"
              >
                <div className="section-label">{isZh ? "Pillar" : "Pillar"}</div>
                <div className="mt-3 text-xl font-medium text-white">{isZh ? "回到 AI 图片中心" : "Back to AI image hub"}</div>
                <div className="mt-2 text-sm leading-7 text-zinc-400">
                  {isZh ? "查看所有图片模型和品牌视觉入口。" : "See all image models and brand visual workflows."}
                </div>
              </Link>
              <Link
                href={`/${locale}/my-creations`}
                className="rounded-[24px] border border-white/10 bg-black/30 p-5 transition-colors hover:border-primary/35 hover:bg-white/[0.04]"
              >
                <div className="section-label">{isZh ? "Library" : "Library"}</div>
                <div className="mt-3 text-xl font-medium text-white">{isZh ? "查看创作资产" : "Open my creations"}</div>
                <div className="mt-2 text-sm leading-7 text-zinc-400">
                  {isZh ? "统一查看已生成的图片和收藏作品。" : "Review finished images and saved creative outputs in one place."}
                </div>
              </Link>
              <Link
                href={`/${locale}/pricing`}
                className="rounded-[24px] border border-white/10 bg-black/30 p-5 transition-colors hover:border-primary/35 hover:bg-white/[0.04]"
              >
                <div className="section-label">{isZh ? "Pricing" : "Pricing"}</div>
                <div className="mt-3 text-xl font-medium text-white">{isZh ? "查看套餐与 Credits" : "View plans and credits"}</div>
                <div className="mt-2 text-sm leading-7 text-zinc-400">
                  {isZh ? "按频率选择订阅或按次付费方案。" : "Pick subscriptions or pay-as-you-go credits based on volume."}
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

          <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-7">
              <div className="section-label">{isZh ? "Recommended Path" : "Recommended Path"}</div>
              <h2 className={`mt-3 text-3xl font-medium text-white ${isZh ? "tracking-normal" : "tracking-[-0.04em]"}`}>
                {isZh ? `${item.labels.zh} 更适合怎么承接用户` : `How ${item.labels.en} should route users`}
              </h2>
              <div className="mt-5 grid gap-4">
                {pathRecommendations.map((path) => (
                  <Link
                    key={path.href + path.title}
                    href={path.href}
                    className="rounded-[24px] border border-white/10 bg-black/25 p-5 transition-colors hover:border-primary/35 hover:bg-white/[0.04]"
                  >
                    <div className="text-[11px] uppercase tracking-[0.22em] text-primary">{path.label}</div>
                    <div className="mt-3 text-xl font-medium text-white">{path.title}</div>
                    <div className="mt-2 text-sm leading-7 text-zinc-300">{path.description}</div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-7">
              <div className="section-label">{isZh ? "Parameter Guide" : "Parameter Guide"}</div>
              <h2 className={`mt-3 text-3xl font-medium text-white ${isZh ? "tracking-normal" : "tracking-[-0.04em]"}`}>
                {isZh ? `${item.labels.zh} 的默认参数建议` : `Suggested starting parameters for ${item.labels.en}`}
              </h2>
              <div className="mt-5 space-y-4">
                {parameterGuidance.map((entry) => (
                  <div key={entry.label} className="rounded-[24px] border border-white/10 bg-black/25 p-5">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">{entry.label}</div>
                    <div className="mt-3 text-2xl font-medium text-white">{entry.value}</div>
                    <div className="mt-2 text-sm leading-7 text-zinc-300">{entry.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <SeoConversionPanel
            eyebrow={isZh ? "Take Action" : "Take Action"}
            title={isZh ? `把 ${item.labels.zh} 的兴趣转成第一次生成` : `Turn ${item.labels.en} interest into a first generation`}
            description={
              isZh
                ? `如果你正在查看 ${item.labels.zh}，通常已经知道自己想要的结果方向。直接进入创作中心，写下提示词并从这个模型开始生成即可。`
                : `If you are exploring ${item.labels.en}, you likely already know the kind of result you want. Open the Studio, write your prompt, and start with this model directly.`
            }
            primaryHref={buildStudioHref(locale, {
              mode: "text-to-image",
              model: item.slug,
              source: "seo-image-model",
            })}
            primaryLabel={isZh ? "打开图片控制台" : "Open image console"}
            secondaryHref={`/${locale}/pricing`}
            secondaryLabel={isZh ? "查看套餐与 Credits" : "View plans and credits"}
            highlights={[
              isZh ? "把模型页流量直接压进可点击的转化入口" : "Compresses model-page traffic into a clickable conversion path",
              isZh ? "直接用当前模型开始生成，减少决策成本" : "Start directly with the current model to reduce decision friction",
              isZh ? "也可以返回图片中心继续比较不同模型" : "You can still return to the image hub and compare alternatives",
            ]}
          />

          <SeoRichContent
            locale={localeKey}
            keyword={item.labels[localeKey]}
            introTitle={isZh ? `${item.labels.zh} 是什么？` : `What is ${item.labels.en}?`}
            introBody={[
              isZh
                ? `${item.labels.zh} 是 Imaveo AI 图片体系中的独立模型页，主要承接模型词搜索、风格词搜索和结果导向型搜索。`
                : `${item.labels.en} is a dedicated model page inside the Imaveo AI image cluster, designed to capture model-specific, style-specific, and outcome-driven search demand.`,
              isZh
                ? `${item.labels.zh} 的优势包括 ${item.strengths.zh.join("、")}。这类页面最适合和 AI 图片中心、定价页以及创作资产页形成互链，既解释模型，也推动转化。`
                : `${item.labels.en} is strongest at ${item.strengths.en.join(", ")}. Pages like this work best when they interlink with the AI image hub, pricing, and the creations library to balance education and conversion.`,
            ]}
            stepsTitle={isZh ? `如何在 Imaveo 上使用 ${item.labels.zh}` : `How to use ${item.labels.en} on Imaveo`}
            steps={[
              isZh ? `先进入 ${item.labels.zh} 页面，确认它是否匹配你的图像风格目标。` : `Open the ${item.labels.en} page and confirm it matches your visual goals.`,
              isZh ? "根据任务写提示词，再在创作中心里调整比例、风格和质量。" : "Write a prompt, then adjust ratio, style, and quality inside the Studio.",
              isZh ? "生成后进入创作资产页统一管理结果，并根据频率切换套餐。" : "Manage outputs from the creations library and upgrade plans when the workflow becomes repeatable.",
            ]}
            useCasesTitle={isZh ? `${item.labels.zh} 适合哪些场景？` : `When should creators use ${item.labels.en}?`}
            useCases={[
              isZh ? `适合需要 ${item.strengths.zh[0]} 的品牌视觉和营销图需求。` : `Useful for creative work that needs ${item.strengths.en[0].toLowerCase()}.`,
              isZh ? "适合海报、缩略图、头像、品牌 KV 等结果导向页面承接。" : "Good for posters, thumbnails, portraits, and other outcome-specific landing pages.",
              isZh ? "适合在品牌站内部做模型对比和风格分流。" : "Helpful for model comparison and style segmentation inside a brand-led product site.",
              isZh ? "适合把流量引导到价格页和创作资产页做后续转化。" : "Strong for routing users into pricing and library pages after initial discovery.",
            ]}
            faqTitle={isZh ? `${item.labels.zh} 常见问题` : `${item.labels.en} FAQ`}
            faqs={[
              {
                question: isZh ? `${item.labels.zh} 页面为什么不能只放一个输入框？` : `Why should the ${item.labels.en} page include more than an input box?`,
                answer: isZh
                  ? "因为搜索引擎需要通过正文、FAQ 和内链理解页面主题。只有工具 UI 很容易被判断为薄内容，导致收录和排名都不稳定。"
                  : "Because search engines need body copy, FAQs, and internal links to understand the topic. A tool-only page is much more likely to be treated as thin content.",
              },
              {
                question: isZh ? `${item.labels.zh} 应该和哪些页面互相链接？` : `Which pages should ${item.labels.en} connect to?`,
                answer: isZh
                  ? "至少要链接回 AI 图片中心，并横向连接相关模型页，再补价格页或创作资产页，让用户和搜索引擎都能看到清晰层级。"
                  : "At minimum it should link back to the AI image hub, connect laterally to related model pages, and include pricing or creations pages so both users and search engines see a clear hierarchy.",
              },
            ]}
            relatedTitle={isZh ? "继续浏览相关页面" : "Continue with related pages"}
            relatedLinks={[
              {
                label: isZh ? "AI 图片中心" : "AI Image Hub",
                href: `/${locale}/ai-image`,
                description: isZh ? "回到图片类 pillar page。" : "Return to the pillar page for AI image.",
              },
              {
                label: isZh ? "创作资产库" : "My Creations",
                href: `/${locale}/my-creations`,
                description: isZh ? "查看和管理你生成的图片作品。" : "Review and manage generated images in one library.",
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
