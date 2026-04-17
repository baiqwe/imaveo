import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ImagePlus, Sparkles } from "lucide-react";
import { CollectionPageSchema } from "@/components/breadcrumb-schema";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { SeoConversionPanel } from "@/components/seo/seo-conversion-panel";
import { SeoRichContent } from "@/components/seo/seo-rich-content";
import { imaveoModels } from "@/config/imaveo";
import { site } from "@/config/site";
import { buildAbsoluteUrl, buildLocaleAlternates, getToolMetadata } from "@/utils/seo/metadata";
import { buildStudioHref } from "@/utils/studio";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const localeKey = locale as "en" | "zh";
  const seo = getToolMetadata(localeKey, "text-to-image");
  const pathname = `/${locale}/text-to-image`;
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

export default async function TextToImagePage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const isZh = locale === "zh";
  const localeKey = locale as "en" | "zh";
  const imageModels = imaveoModels.filter((model) => model.category === "image");
  const decisionCards = [
    {
      label: isZh ? "适合谁" : "Best for",
      title: isZh ? "从想法、文案或视觉 brief 直接起图的人" : "Creators starting from a concept, copy line, or visual brief",
      description: isZh
        ? "如果你还没有原图，只是知道要做海报、广告图、封面或商品视觉，文生图会是最直接的起点。"
        : "If you do not have a source image yet and only know the visual job, text-to-image is the fastest starting point.",
    },
    {
      label: isZh ? "默认起手参数" : "Starter setup",
      title: isZh ? "1:1 + Nano Banana Pro + Clean" : "1:1 + Nano Banana Pro + Clean",
      description: isZh
        ? "先用标准比例和较稳的画质模式确认主体与构图，再扩展成海报、横版广告图或多变体。"
        : "Start with a square ratio and a stable quality preset, then branch into posters, wide hero images, or more variants.",
    },
    {
      label: isZh ? "下一步" : "Next step",
      title: isZh ? "直接进入创作中心完成第一轮出图" : "Move straight into the Studio for the first generation pass",
      description: isZh
        ? "当你已经有 prompt 或参考方向时，最短路径是直接进入 Studio，而不是停留在说明页。"
        : "If you already know the prompt direction, the Studio is the shortest path from idea to usable output.",
    },
  ];

  return (
    <section className="py-16 md:py-20">
      <CollectionPageSchema
        name={isZh ? "Imaveo 文生图" : "Imaveo Text to Image"}
        description={isZh ? "查看文生图工作流、相关图片模型和价格入口。" : "Explore the text-to-image workflow, relevant image models, and pricing entry points."}
        url={`/${locale}/text-to-image`}
        locale={locale}
        items={[
          { name: isZh ? "AI 图片中心" : "AI Image Hub", url: `/${locale}/ai-image` },
          { name: isZh ? "图生图" : "Image to Image", url: `/${locale}/image-to-image` },
          { name: isZh ? "价格方案" : "Pricing", url: `/${locale}/pricing` },
          ...imageModels.map((model) => ({
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
              { name: isZh ? "AI 图片" : "AI Image", href: `/${locale}/ai-image` },
              { name: isZh ? "文生图" : "Text to Image", href: `/${locale}/text-to-image` },
            ]}
          />

          <div className="rounded-[36px] border border-white/10 bg-white/[0.03] p-8 md:p-10">
            <div className="section-label">Text to Image</div>
            <h1 className={`mt-3 text-5xl font-medium text-white ${isZh ? "tracking-normal" : "tracking-[-0.05em]"}`}>
              {isZh ? "从提示词直接生成 AI 图片" : "Generate AI images directly from prompts"}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-300">
              {isZh
                ? "用一句 prompt 直接生成海报、缩略图、广告图、品牌 KV 和商品视觉。你可以在 Nano Banana Pro、GPT Image、Flux Klein、Z Image 等模型之间切换，按任务选择最合适的文生图路线。"
                : "Turn a prompt into posters, thumbnails, ad visuals, branded hero images, and product assets. Switch between Nano Banana Pro, GPT Image, Flux Klein, and Z Image based on the job."}
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <Link href={`/${locale}/ai-image`} className="rounded-[24px] border border-white/10 bg-black/30 p-5 transition-colors hover:border-primary/35 hover:bg-white/[0.04]">
                <div className="section-label">{isZh ? "图片中心" : "Image Hub"}</div>
                <div className="mt-3 text-xl font-medium text-white">{isZh ? "AI 图片中心" : "AI Image Hub"}</div>
                <div className="mt-2 text-sm leading-7 text-zinc-400">
                  {isZh ? "查看全部图片模型和相关工作流。" : "Explore all image models and related workflows."}
                </div>
              </Link>
              <Link href={`/${locale}/image-to-image`} className="rounded-[24px] border border-white/10 bg-black/30 p-5 transition-colors hover:border-primary/35 hover:bg-white/[0.04]">
                <div className="section-label">{isZh ? "图生图" : "Image to Image"}</div>
                <div className="mt-3 text-xl font-medium text-white">{isZh ? "继续做精修与变体" : "Refine an existing image next"}</div>
                <div className="mt-2 text-sm leading-7 text-zinc-400">
                  {isZh ? "如果你已经有原图，可以转到图生图继续精修。" : "If you already have a source image, move into image-to-image for refinement."}
                </div>
              </Link>
              <Link href={`/${locale}/pricing`} className="rounded-[24px] border border-white/10 bg-black/30 p-5 transition-colors hover:border-primary/35 hover:bg-white/[0.04]">
                <div className="section-label">Pricing</div>
                <div className="mt-3 text-xl font-medium text-white">{isZh ? "查看套餐与 Credits" : "View plans and credits"}</div>
                <div className="mt-2 text-sm leading-7 text-zinc-400">
                  {isZh ? "比较订阅和按次购买方案。" : "Compare subscriptions and pay-as-you-go credits."}
                </div>
              </Link>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {imageModels.map((model) => (
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
                    <ImagePlus className="h-5 w-5 text-white/35" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <section className="grid gap-4 md:grid-cols-3">
            {decisionCards.map((card) => (
              <div key={card.title} className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
                <div className="text-[11px] uppercase tracking-[0.22em] text-primary">{card.label}</div>
                <h2 className="mt-3 text-2xl font-medium text-white">{card.title}</h2>
                <p className="mt-3 text-sm leading-7 text-zinc-300">{card.description}</p>
              </div>
            ))}
          </section>

          <SeoConversionPanel
            eyebrow={isZh ? "开始生成" : "Start Creating"}
            title={isZh ? "进入文生图工作台" : "Open the text-to-image workspace"}
            description={
              isZh
                ? "如果你已经有广告 brief、封面标题或商品图方向，直接进入创作中心写 prompt，再根据结果切换模型和参数。"
                : "If you already have a campaign brief, cover title, or product concept, enter the Studio, write the prompt, then switch models and settings from the result."
            }
            primaryHref={buildStudioHref(locale, { mode: "text-to-image", model: "nano-banana-pro", source: "seo-text-to-image" })}
            primaryLabel={isZh ? "打开文生图入口" : "Open text-to-image entry"}
            secondaryHref={`/${locale}/ai-image`}
            secondaryLabel={isZh ? "先比较图片模型" : "Compare image models first"}
            highlights={[
              isZh ? "适合从文案、创意 brief 和视觉方向直接起图" : "Best when you are starting from copy, a concept brief, or a visual direction",
              isZh ? "适合封面、海报、广告图、商品图和品牌 KV" : "Useful for covers, posters, ad visuals, product images, and branded hero art",
              isZh ? "先起第一版，再根据结果切换模型和比例更高效" : "Generate a first pass, then switch models and ratios more efficiently",
            ]}
          />

          <SeoRichContent
            locale={localeKey}
            keyword={isZh ? "文生图" : "text to image"}
            introTitle={isZh ? "什么是文生图页面？" : "What is the text-to-image page?"}
            introBody={[
              isZh
                ? "文生图适合从一句文字描述开始生成视觉结果。你可以写下产品卖点、构图、风格、色调和文案方向，再让模型生成海报、广告图、封面和商品图。"
                : "Text-to-image is the right workflow when you want to start from a written idea. Describe the composition, product angle, style, lighting, and copy direction, then let the model create the visual.",
              isZh
                ? "它最适合还没有原图，但已经清楚知道要做什么视觉任务的用户，比如封面设计、广告 KV、活动海报、商品主图和缩略图。"
                : "It is especially useful when you do not have a source image yet but already know the visual job, such as a cover, campaign key visual, poster, product image, or thumbnail.",
            ]}
            stepsTitle={isZh ? "如何在 Imaveo 上完成文生图" : "How to create text-to-image on Imaveo"}
            steps={[
              isZh ? "先明确你要做的是封面、海报、广告图还是商品视觉。" : "Clarify whether you are creating a cover, poster, ad visual, or product asset first.",
              isZh ? "写下主体、风格、镜头感、背景和文字需求，再选择图片模型。" : "Describe the subject, style, composition, background, and copy needs, then choose the image model.",
              isZh ? "先生成第一版，再根据画面结果继续调整比例、模型和输出数量。" : "Generate a first pass, then refine ratio, model choice, and output count based on the result.",
            ]}
            useCasesTitle={isZh ? "文生图适合哪些创作场景？" : "When should creators use text-to-image?"}
            useCases={[
              isZh ? "需要从营销 brief 直接起广告图和品牌 KV 的团队" : "Teams generating ads and branded hero visuals directly from a campaign brief",
              isZh ? "做商品图、海报、封面和缩略图的创作者" : "Creators making product images, posters, covers, and thumbnails",
              isZh ? "还没有源图，但已经清楚知道视觉目标的用户" : "Users who do not have a source image yet but know the visual target clearly",
              isZh ? "需要先快速验证风格方向，再决定是否继续精修的项目" : "Projects that need to validate visual direction before moving into deeper refinement",
            ]}
            faqTitle={isZh ? "文生图常见问题" : "Text-to-image FAQ"}
            faqs={[
              {
                question: isZh ? "文生图和图生图应该先用哪个？" : "Should I start with text-to-image or image-to-image?",
                answer: isZh
                  ? "如果你还没有原图，就先用文生图；如果已经有一张基础图，想继续优化、换风格或做更多变体，就用图生图。"
                  : "Start with text-to-image when you do not have a source image. Use image-to-image when you already have a base visual and want to refine or restyle it.",
              },
              {
                question: isZh ? "什么样的 prompt 更容易生成稳定图片？" : "What makes a better text-to-image prompt?",
                answer: isZh
                  ? "建议把主体、场景、构图、风格、光线和文案需求写清楚。越明确，模型越容易生成接近需求的结果。"
                  : "Describe the subject, environment, composition, style, lighting, and any copy needs. The clearer the prompt, the more aligned the result tends to be.",
              },
            ]}
            relatedTitle={isZh ? "继续浏览相关页面" : "Continue with related pages"}
            relatedLinks={[
              {
                label: isZh ? "AI 图片中心" : "AI Image Hub",
                href: `/${locale}/ai-image`,
                description: isZh ? "回到图片中心继续比较模型。" : "Return to the image hub and compare models.",
              },
              {
                label: isZh ? "图生图" : "Image to Image",
                href: `/${locale}/image-to-image`,
                description: isZh ? "如果已经有原图，转到图生图继续精修。" : "If you already have a source image, continue into image-to-image refinement.",
              },
              ...imageModels.map((model) => ({
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
