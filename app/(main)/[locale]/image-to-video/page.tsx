import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ImageIcon, Sparkles } from "lucide-react";
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
  const decisionCards = [
    {
      label: isZh ? "适合谁" : "Best for",
      title: isZh ? "先有静图，再延展成动态镜头的人" : "Creators who already have a still image and need motion next",
      description: isZh
        ? "如果你的角色、产品图或海报已经定稿，图生视频通常比文生视频更稳。"
        : "If the character art, product still, or poster is already approved, image-to-video is usually the more stable path than text-to-video.",
    },
    {
      label: isZh ? "默认起手参数" : "Starter setup",
      title: isZh ? "9:16 + 6 秒 + Seedance" : "9:16 + 6s + Seedance",
      description: isZh
        ? "先用较短时长和竖屏比例验证运动方向，再根据结果决定是否切到更高质量模型。"
        : "Begin with a shorter duration and a vertical ratio to validate motion direction before moving into a heavier model.",
    },
    {
      label: isZh ? "下一步" : "Next step",
      title: isZh ? "把首帧和模型一起带进创作中心" : "Carry the first frame and model choice into the Studio",
      description: isZh
        ? "这类需求最怕路径中断，所以最好从 workflow 页直接进入 Studio。"
        : "This workflow is sensitive to path friction, so the best move is to go directly from the workflow page into the Studio.",
    },
  ];

  return (
    <section className="py-16 md:py-20">
      <CollectionPageSchema
        name={isZh ? "Imaveo 图生视频" : "Imaveo Image to Video"}
        description={isZh ? "查看图生视频工作流、相关视频模型和价格入口。" : "Explore the image-to-video workflow, relevant video models, and pricing entry points."}
        url={`/${locale}/image-to-video`}
        locale={locale}
        items={[
          { name: isZh ? "AI 视频中心" : "AI Video Hub", url: `/${locale}/ai-video` },
          { name: isZh ? "价格方案" : "Pricing", url: `/${locale}/pricing` },
          ...videoModels.map((model) => ({
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
                ? "上传一张图片，把角色、产品或海报延展成动态镜头。你可以在 Seedance 和 HappyHorse 之间切换，根据主体稳定性、运动方式和社媒节奏选择更适合的图生视频模型。"
                : "Upload a still image and turn a character, product shot, or poster into a moving clip. Switch between Seedance and HappyHorse based on subject stability, motion style, and social pacing."}
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <Link
                href={`/${locale}/ai-video`}
                className="rounded-[24px] border border-white/10 bg-black/30 p-5 transition-colors hover:border-primary/35 hover:bg-white/[0.04]"
              >
                <div className="section-label">{isZh ? "视频中心" : "Video Hub"}</div>
                <div className="mt-3 text-xl font-medium text-white">{isZh ? "AI 视频中心" : "AI Video Hub"}</div>
                <div className="mt-2 text-sm leading-7 text-zinc-400">
                  {isZh ? "查看全部视频模型和工作流。" : "Open the full AI video hub."}
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
                <div className="section-label">{isZh ? "首页" : "Home"}</div>
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
            title={isZh ? "进入图生视频工作台" : "Open the image-to-video workspace"}
            description={
              isZh
                ? "如果你已经有首帧、角色图或商品图，可以直接进入创作中心上传图片，选择 Seedance、HappyHorse 或其他视频模型开始生成。"
                : "If you already have a first frame, character image, or product visual, open the Studio, upload the image, and start with Seedance or another video model."
            }
            primaryHref={buildStudioHref(locale, { mode: "image-to-video", model: "seedance", source: "seo-image-to-video" })}
            primaryLabel={isZh ? "打开图生视频入口" : "Open image-to-video entry"}
            secondaryHref={`/${locale}/pricing`}
            secondaryLabel={isZh ? "比较 Credits 与订阅" : "Compare credits and subscriptions"}
            highlights={[
              isZh ? "适合让产品图、角色图和海报动起来" : "Best for animating product images, character art, and posters",
              isZh ? "支持围绕首帧继续控制镜头和比例" : "Keeps the first frame while tuning motion and ratio",
              isZh ? "适合社媒短片、广告素材和概念预览" : "Useful for social clips, ad assets, and concept previews",
            ]}
          />

          <SeoRichContent
            locale={localeKey}
            keyword={isZh ? "图生视频" : "image to video"}
            introTitle={isZh ? "什么是图生视频页面？" : "What is the image-to-video page?"}
            introBody={[
              isZh
                ? "图生视频适合从一张确定的视觉图开始生成动态短片。你可以上传产品图、角色设定图、海报或封面图，让画面产生镜头运动。"
                : "Image-to-video is useful when you already have a clear visual starting point. Upload a product image, character concept, poster, or cover image and turn it into motion.",
              isZh
                ? "它尤其适合需要保持主体一致性的场景，比如商品展示、角色动态、社媒封面动效和广告开场。"
                : "It is especially useful when you need to keep the subject consistent, such as product showcases, character motion, animated covers, and ad openers.",
            ]}
            stepsTitle={isZh ? "如何在 Imaveo 上完成图生视频" : "How to create image-to-video on Imaveo"}
            steps={[
              isZh ? "先准备一张静态图，并判断你需要更稳定的动画还是更快的迭代。" : "Start with a still image and decide whether you prioritize stable motion or rapid iteration.",
              isZh ? "根据目标风格选择更适合的模型页，再进入图生视频工作流，例如 Seedance 或 HappyHorse。" : "Choose the most relevant model page for the target look, then continue with the image-to-video workflow, such as Seedance or HappyHorse.",
              isZh ? "生成后检查镜头感和一致性，再决定是否继续购买 Credits 或升级套餐。" : "Review motion quality and consistency, then decide whether to continue with credits or move to a paid plan.",
            ]}
            useCasesTitle={isZh ? "图生视频适合哪些创作场景？" : "When should creators use image-to-video?"}
            useCases={[
              isZh ? "希望把角色设定图、海报或产品图动画化的用户" : "Users who want to animate character art, posters, or product visuals",
              isZh ? "已经有首帧素材，想快速测试动态效果的创作者" : "Creators who already have a first frame and want to test motion quickly",
              isZh ? "需要保持产品、角色或视觉主体一致的团队" : "Teams that need the product, character, or visual subject to stay consistent",
              isZh ? "正在比较模型效果、速度和成本的实际生产用户" : "Production users comparing model quality, speed, and cost",
            ]}
            faqTitle={isZh ? "图生视频常见问题" : "Image-to-video FAQ"}
            faqs={[
              {
                question: isZh ? "图生视频和文生视频应该怎么选？" : "When should I use image-to-video instead of text-to-video?",
                answer: isZh
                  ? "如果你已经有一张想保留主体的图片，用图生视频；如果只有创意或脚本，没有首帧素材，用文生视频更合适。"
                  : "Use image-to-video when you already have a source image you want to preserve. Use text-to-video when you only have an idea or script.",
              },
              {
                question: isZh ? "上传什么图片更容易得到稳定视频？" : "What kind of source image works best?",
                answer: isZh
                  ? "建议使用主体清晰、光线稳定、遮挡较少的图片。产品图、角色半身图和构图明确的海报通常更容易得到稳定结果。"
                  : "Use a clear image with stable lighting and minimal occlusion. Product shots, character portraits, and well-composed posters usually produce more stable motion.",
              },
            ]}
            relatedTitle={isZh ? "继续浏览相关页面" : "Continue with related pages"}
            relatedLinks={[
              {
                label: isZh ? "AI 视频中心" : "AI Video Hub",
                href: `/${locale}/ai-video`,
                description: isZh ? "回到 AI 视频中心继续比较模型。" : "Return to the AI video hub and compare models.",
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
