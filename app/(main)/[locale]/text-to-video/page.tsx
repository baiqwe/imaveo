import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Film, Sparkles } from "lucide-react";
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
  const decisionCards = [
    {
      label: isZh ? "适合谁" : "Best for",
      title: isZh ? "先有想法，再找最合适模型的人" : "Creators who know the idea first and choose the model second",
      description: isZh
        ? "如果你已经知道要生成什么场景，但还没决定 Veo 还是 Kling，文生视频页就是最好的中间层。"
        : "If you already know the scene you want but have not committed to Veo or Kling yet, this page works as the best middle layer.",
    },
    {
      label: isZh ? "默认起手参数" : "Starter setup",
      title: isZh ? "16:9 + 8 秒 + Veo 3.1" : "16:9 + 8s + Veo 3.1",
      description: isZh
        ? "先用横屏和较短时长验证镜头感，确认方向后再扩展到其他比例和模型。"
        : "Use a horizontal ratio and a shorter duration first to validate motion quality, then expand into other ratios and models.",
    },
    {
      label: isZh ? "下一步" : "Next step",
      title: isZh ? "直接进入创作中心试第一条片子" : "Move straight into the Studio and test the first clip",
      description: isZh
        ? "如果你已经有提示词，不需要继续停在说明页，直接进入 Studio 会更短。"
        : "If you already have the prompt, do not stay on the explanatory page any longer than necessary. The Studio is the shortest path.",
    },
  ];

  return (
    <section className="py-16 md:py-20">
      <CollectionPageSchema
        name={isZh ? "Imaveo 文生视频" : "Imaveo Text to Video"}
        description={isZh ? "查看文生视频工作流、相关视频模型和价格入口。" : "Explore the text-to-video workflow, relevant video models, and pricing entry points."}
        url={`/${locale}/text-to-video`}
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
              { name: isZh ? "文生视频" : "Text to Video", href: `/${locale}/text-to-video` },
            ]}
          />

          <div className="rounded-[36px] border border-white/10 bg-white/[0.03] p-8 md:p-10">
            <div className="section-label">Text to Video</div>
            <h1 className={`mt-3 text-5xl font-medium text-white ${isZh ? "tracking-normal" : "tracking-[-0.05em]"}`}>
              {isZh ? "一句话生成 AI 视频" : "Generate AI videos from a single prompt"}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-300">
              {isZh
                ? "输入一句提示词，就可以开始制作短视频。你可以先选择适合的模型，再根据成片频率查看套餐与积分。"
                : "Start an AI video from a single prompt. Choose a model for the result you want, then review plans and credits when you are ready to create more."}
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <Link
                href={`/${locale}/ai-video`}
                className="rounded-[24px] border border-white/10 bg-black/30 p-5 transition-colors hover:border-primary/35 hover:bg-white/[0.04]"
              >
                <div className="section-label">{isZh ? "视频中心" : "Video Hub"}</div>
                <div className="mt-3 text-xl font-medium text-white">{isZh ? "AI 视频中心" : "AI Video Hub"}</div>
                <div className="mt-2 text-sm leading-7 text-zinc-400">
                  {isZh ? "浏览所有视频模型与工作流。" : "Explore all video models and workflows."}
                </div>
              </Link>
              <Link
                href={`/${locale}/pricing`}
                className="rounded-[24px] border border-white/10 bg-black/30 p-5 transition-colors hover:border-primary/35 hover:bg-white/[0.04]"
              >
                <div className="section-label">{isZh ? "Pricing" : "Pricing"}</div>
                <div className="mt-3 text-xl font-medium text-white">{isZh ? "套餐与 Credits" : "Plans and credits"}</div>
                <div className="mt-2 text-sm leading-7 text-zinc-400">
                  {isZh ? "比较订阅与按次购买方案。" : "Compare subscriptions and pay-as-you-go credits."}
                </div>
              </Link>
              <Link
                href={`/${locale}`}
                className="rounded-[24px] border border-white/10 bg-black/30 p-5 transition-colors hover:border-primary/35 hover:bg-white/[0.04]"
              >
                <div className="section-label">{isZh ? "首页" : "Home"}</div>
                <div className="mt-3 text-xl font-medium text-white">{isZh ? "返回首页中枢" : "Back to the hub"}</div>
                <div className="mt-2 text-sm leading-7 text-zinc-400">
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
                      <p className="mt-3 text-sm leading-7 text-zinc-400">{model.descriptions[localeKey]}</p>
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
            title={isZh ? "进入文生视频工作台" : "Open the text-to-video workspace"}
            description={
              isZh
                ? "如果你已经有画面想法，可以直接进入创作中心，选择 Veo 或 Kling，填写提示词并调整比例、时长和风格。"
                : "If you already have a scene in mind, open the Studio, choose Veo or Kling, write the prompt, and tune ratio, duration, and style."
            }
            primaryHref={buildStudioHref(locale, { mode: "text-to-video", model: "veo-3", source: "seo-text-to-video" })}
            primaryLabel={isZh ? "立即进入文生视频入口" : "Open text-to-video entry"}
            secondaryHref={`/${locale}/pricing`}
            secondaryLabel={isZh ? "先看价格方案" : "Review pricing first"}
            highlights={[
              isZh ? "适合先用文字描述画面和镜头动作" : "Ideal when you want to describe the shot in words first",
              isZh ? "支持继续切换视频模型和输出比例" : "Supports model switching and aspect-ratio selection",
              isZh ? "适合广告短片、社媒视频和概念片段" : "Useful for ad clips, social videos, and concept shots",
            ]}
          />

          <SeoRichContent
            locale={localeKey}
            keyword={isZh ? "文生视频" : "text to video"}
            introTitle={isZh ? "什么是文生视频页面？" : "What is the text-to-video page?"}
            introBody={[
              isZh
                ? "文生视频适合从一句创意、脚本或镜头描述开始生成短片。你可以用文字描述人物、场景、镜头运动和氛围，再选择适合的视频模型生成结果。"
                : "Text-to-video is useful when you want to start from an idea, script, or camera description. Describe the subject, scene, motion, and mood, then choose the video model that fits the output.",
              isZh
                ? "它适合做广告短片、产品镜头、社媒开场、故事分镜和概念验证。先把画面说清楚，再通过比例、时长和模型选择控制最终效果。"
                : "It works well for ad clips, product shots, social openers, storyboards, and concept tests. Start by describing the scene clearly, then control the result with ratio, duration, and model choice.",
            ]}
            stepsTitle={isZh ? "如何在 Imaveo 上完成文生视频" : "How to create text-to-video on Imaveo"}
            steps={[
              isZh ? "先选择 Veo 或 Kling 等最适合当前项目的视频模型。" : "Choose the video model that best matches your project, such as Veo or Kling.",
              isZh ? "输入提示词，并逐步确认时长、比例和镜头氛围等关键参数。" : "Enter your prompt, then refine duration, aspect ratio, and overall camera mood.",
              isZh ? "根据生成频率进入价格页，决定使用订阅还是 Credits。" : "Visit pricing and decide whether subscriptions or credits are the better fit for your generation volume.",
            ]}
            useCasesTitle={isZh ? "文生视频适合哪些创作场景？" : "When should creators use text-to-video?"}
            useCases={[
              isZh ? "还没有首帧图片，但已经有镜头想法的创作者" : "Creators who do not have a source image yet but already know the scene",
              isZh ? "需要快速测试广告脚本、短视频开场或产品镜头的人" : "Teams testing ad scripts, short-video hooks, or product shots",
              isZh ? "想先用文字试方向，再决定是否继续精修的用户" : "Users who want to test direction with text before refining further",
              isZh ? "需要比较效果、速度和价格的实际生产用户" : "Production-minded users comparing output quality, speed, and price",
            ]}
            faqTitle={isZh ? "文生视频常见问题" : "Text-to-video FAQ"}
            faqs={[
              {
                question: isZh ? "文生视频应该先选模型还是先写提示词？" : "Should I choose a model first or write the prompt first?",
                answer: isZh
                  ? "如果你已经知道想要电影感或社媒短片风格，可以先选模型；如果还在探索，先写提示词也可以，再根据结果切换 Veo 或 Kling。"
                  : "If you already know the target look, pick a model first. If you are exploring, write the prompt first and switch between Veo or Kling after reviewing the result.",
              },
              {
                question: isZh ? "什么样的提示词更容易生成稳定视频？" : "What kind of prompt creates more stable videos?",
                answer: isZh
                  ? "建议写清主体、动作、镜头、环境和风格，例如人物在做什么、镜头如何移动、画面是写实还是电影感。"
                  : "Describe the subject, action, camera movement, environment, and style. The clearer the scene and motion, the more stable the output tends to be.",
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
