import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Images, Sparkles } from "lucide-react";
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
  const seo = getToolMetadata(localeKey, "image-to-image");
  const pathname = `/${locale}/image-to-image`;
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

export default async function ImageToImagePage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const isZh = locale === "zh";
  const localeKey = locale as "en" | "zh";
  const imageModels = imaveoModels.filter((model) => model.category === "image");
  const decisionCards = [
    {
      label: isZh ? "适合谁" : "Best for",
      title: isZh ? "已经有原图，但需要精修、重绘和扩展版本的人" : "Creators who already have a source image and need refinement or variants",
      description: isZh
        ? "如果你手里已经有草图、商品图、封面初稿或品牌图片，图生图会比重新从零起图更稳。"
        : "When you already have a draft, product image, cover concept, or brand visual, image-to-image is usually more efficient than starting from zero again.",
    },
    {
      label: isZh ? "默认起手参数" : "Starter setup",
      title: isZh ? "4:5 + Wan + Balanced" : "4:5 + Wan + Balanced",
      description: isZh
        ? "先保留原图结构做一轮温和优化，确认方向后再提升改动幅度或切换模型。"
        : "Start with a moderate edit pass that preserves the structure, then push style changes further once the direction looks right.",
    },
    {
      label: isZh ? "下一步" : "Next step",
      title: isZh ? "把原图带进创作中心继续打磨" : "Carry the source image into the Studio and refine it there",
      description: isZh
        ? "图生图最怕路径中断，所以最好从 workflow 页直接进入带参考图的工作台。"
        : "Image-to-image is sensitive to friction, so the best move is to go from the workflow page directly into a source-image workflow.",
    },
  ];

  return (
    <section className="py-16 md:py-20">
      <CollectionPageSchema
        name={isZh ? "Imaveo 图生图" : "Imaveo Image to Image"}
        description={isZh ? "查看图生图工作流、相关图片模型和价格入口。" : "Explore the image-to-image workflow, relevant image models, and pricing entry points."}
        url={`/${locale}/image-to-image`}
        locale={locale}
        items={[
          { name: isZh ? "AI 图片中心" : "AI Image Hub", url: `/${locale}/ai-image` },
          { name: isZh ? "文生图" : "Text to Image", url: `/${locale}/text-to-image` },
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
              { name: isZh ? "图生图" : "Image to Image", href: `/${locale}/image-to-image` },
            ]}
          />

          <div className="rounded-[36px] border border-white/10 bg-white/[0.03] p-8 md:p-10">
            <div className="section-label">Image to Image</div>
            <h1 className={`mt-3 text-5xl font-medium text-white ${isZh ? "tracking-normal" : "tracking-[-0.05em]"}`}>
              {isZh ? "把现有图片继续精修成新版本" : "Refine existing images into stronger new versions"}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-300">
              {isZh
                ? "上传原图后继续调风格、做精修、换版式、扩海报或优化商品视觉。你可以在 Wan、Qwen Image、GPT Image 等模型之间切换，让图生图更适合已有素材的稳定升级。"
                : "Upload a source image and continue with restyling, refinement, layout upgrades, poster expansion, or stronger product visuals. Switch between Wan, Qwen Image, and GPT Image to refine an existing visual more precisely."}
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <Link href={`/${locale}/ai-image`} className="rounded-[24px] border border-white/10 bg-black/30 p-5 transition-colors hover:border-primary/35 hover:bg-white/[0.04]">
                <div className="section-label">{isZh ? "图片中心" : "Image Hub"}</div>
                <div className="mt-3 text-xl font-medium text-white">{isZh ? "回到 AI 图片中心" : "Back to the AI image hub"}</div>
                <div className="mt-2 text-sm leading-7 text-zinc-400">
                  {isZh ? "继续比较模型和图片工作流。" : "Continue comparing models and image workflows."}
                </div>
              </Link>
              <Link href={`/${locale}/text-to-image`} className="rounded-[24px] border border-white/10 bg-black/30 p-5 transition-colors hover:border-primary/35 hover:bg-white/[0.04]">
                <div className="section-label">{isZh ? "文生图" : "Text to Image"}</div>
                <div className="mt-3 text-xl font-medium text-white">{isZh ? "先从 prompt 起新图" : "Start a fresh visual from prompt"}</div>
                <div className="mt-2 text-sm leading-7 text-zinc-400">
                  {isZh ? "如果你还没有原图，可以先回到文生图。" : "If you do not have a source image yet, start from text-to-image first."}
                </div>
              </Link>
              <Link href={`/${locale}/pricing`} className="rounded-[24px] border border-white/10 bg-black/30 p-5 transition-colors hover:border-primary/35 hover:bg-white/[0.04]">
                <div className="section-label">Pricing</div>
                <div className="mt-3 text-xl font-medium text-white">{isZh ? "查看套餐与 Credits" : "View plans and credits"}</div>
                <div className="mt-2 text-sm leading-7 text-zinc-400">
                  {isZh ? "比较高频与低频使用的付费方式。" : "Compare payment options for both casual and heavy usage."}
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
                    <Images className="h-5 w-5 text-white/35" />
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
            eyebrow={isZh ? "开始精修" : "Start Refining"}
            title={isZh ? "进入图生图工作台" : "Open the image-to-image workspace"}
            description={
              isZh
                ? "如果你已经有草图、商品图、海报初稿或品牌视觉，可以直接进入创作中心上传原图，再继续做精修、变体和风格强化。"
                : "If you already have a draft, product image, poster concept, or brand visual, open the Studio, upload the source, and continue with refinement, variants, and stronger styling."
            }
            primaryHref={buildStudioHref(locale, { mode: "image-to-image", model: "wan", source: "seo-image-to-image" })}
            primaryLabel={isZh ? "打开图生图入口" : "Open image-to-image entry"}
            secondaryHref={`/${locale}/text-to-image`}
            secondaryLabel={isZh ? "先回到文生图" : "Go back to text-to-image"}
            highlights={[
              isZh ? "适合精修海报、广告图、商品图和人像视觉" : "Best for refining posters, ad visuals, product images, and portraits",
              isZh ? "保留原图主体，再继续做风格、光线和构图升级" : "Preserve the core image while upgrading style, lighting, and composition",
              isZh ? "先带图进入，再决定是否进一步切换模型或输出更多版本" : "Bring the source image in first, then decide whether to switch models or generate more variants",
            ]}
          />

          <SeoRichContent
            locale={localeKey}
            keyword={isZh ? "图生图" : "image to image"}
            introTitle={isZh ? "什么是图生图页面？" : "What is the image-to-image page?"}
            introBody={[
              isZh
                ? "图生图适合从一张已有图片继续做精修、风格迭代或版本扩展。你可以上传海报初稿、商品图、角色图或品牌素材，让模型在保留主体的前提下继续加工。"
                : "Image-to-image is ideal when you already have a visual and want to refine, restyle, or expand it. Upload a draft poster, product image, character visual, or brand asset and let the model push it further.",
              isZh
                ? "它很适合追求稳定性和一致性的场景，因为相比从零生成，图生图更容易保持主体、构图和品牌方向。"
                : "It works especially well when consistency matters, because image-to-image is often better at preserving the subject, framing, and brand direction than starting from zero.",
            ]}
            stepsTitle={isZh ? "如何在 Imaveo 上完成图生图" : "How to create image-to-image on Imaveo"}
            steps={[
              isZh ? "先准备一张清晰的源图，判断你是要做轻微精修还是明显重绘。" : "Prepare a clear source image and decide whether you want a subtle refinement or a stronger restyle.",
              isZh ? "进入图生图工作台上传原图，并补充风格、构图、光线和细节要求。" : "Upload the source image in the image-to-image workspace, then add style, composition, lighting, and finishing notes.",
              isZh ? "先生成第一轮结果，再根据效果调整模型、强度和输出数量。" : "Generate a first pass, then adjust model choice, edit strength, and output count based on the result.",
            ]}
            useCasesTitle={isZh ? "图生图适合哪些创作场景？" : "When should creators use image-to-image?"}
            useCases={[
              isZh ? "已经有商品图、海报初稿或品牌视觉，想继续升级的人" : "Creators who already have a product image, poster draft, or branded visual and want to upgrade it",
              isZh ? "需要保留主体一致性，同时增强风格和精致度的项目" : "Projects that need to preserve the subject while improving style and polish",
              isZh ? "要做广告图扩版、封面迭代或商品图优化的团队" : "Teams building campaign variants, cover iterations, or stronger product visuals",
              isZh ? "想把文生图结果继续推进到更完整版本的创作者" : "Creators who want to take a text-to-image result and push it into a more finished output",
            ]}
            faqTitle={isZh ? "图生图常见问题" : "Image-to-image FAQ"}
            faqs={[
              {
                question: isZh ? "什么样的源图更适合图生图？" : "What kind of source image works best for image-to-image?",
                answer: isZh
                  ? "主体清晰、构图明确、光线稳定的图片最容易得到稳定结果。海报初稿、商品图和构图完整的人像通常都很适合。"
                  : "Images with a clear subject, strong composition, and stable lighting tend to work best. Poster drafts, product visuals, and well-framed portraits are usually good starting points.",
              },
              {
                question: isZh ? "图生图和文生图应该怎么搭配使用？" : "How should I combine text-to-image and image-to-image?",
                answer: isZh
                  ? "通常先用文生图起第一版，再把结果带进图生图继续优化。这样既能快速找方向，也能保留后续精修空间。"
                  : "A common path is to start with text-to-image for the first draft, then bring the result into image-to-image for refinement. That gives you speed first and control second.",
              },
            ]}
            relatedTitle={isZh ? "继续浏览相关页面" : "Continue with related pages"}
            relatedLinks={[
              {
                label: isZh ? "AI 图片中心" : "AI Image Hub",
                href: `/${locale}/ai-image`,
                description: isZh ? "回到 AI 图片中心继续比较模型。" : "Return to the AI image hub and compare models.",
              },
              {
                label: isZh ? "文生图" : "Text to Image",
                href: `/${locale}/text-to-image`,
                description: isZh ? "如果还没有原图，可以先用文生图起第一版。" : "If you do not have a source image yet, start with text-to-image first.",
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
