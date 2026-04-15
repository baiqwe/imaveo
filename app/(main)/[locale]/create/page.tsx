import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { SeoRichContent } from "@/components/seo/seo-rich-content";
import { BreadcrumbSchema, SoftwareApplicationSchema, WebPageSchema } from "@/components/breadcrumb-schema";
import { ImaveoStudio } from "@/components/studio/imaveo-studio";
import { site } from "@/config/site";
import { buildAbsoluteUrl, buildLocaleAlternates } from "@/utils/seo/metadata";

type CreatePageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ mode?: string; model?: string; style?: string }>;
};

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const isZh = locale === "zh";
  const pathname = `/${locale}/create`;
  const title = isZh ? "Imaveo 创作中心 | AI 视频与图片统一工作台" : "Imaveo Studio | One Workspace for AI Video and Image Creation";
  const description = isZh
    ? "进入 Imaveo 创作中心，在同一个工作台里切换文生图、图生图、文生视频、图生视频与热门模型。"
    : "Enter Imaveo Studio to switch between text-to-image, image-to-image, text-to-video, image-to-video, and hot models from one workspace.";
  const ogImage = new URL(site.ogImagePath, site.siteUrl).toString();

  return {
    title,
    description,
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

export default async function CreatePage({ params, searchParams }: CreatePageProps) {
  const { locale } = await params;
  const query = await searchParams;
  const isZh = locale === "zh";
  const localeKey = locale as "en" | "zh";
  const pathname = `/${locale}/create`;
  const title = isZh ? "Imaveo 创作中心" : "Imaveo Studio";
  const description = isZh
    ? "Imaveo 创作中心把文生图、图生图、文生视频、图生视频和模型切换统一到一个工作台里。"
    : "Imaveo Studio brings text-to-image, image-to-image, text-to-video, image-to-video, and model switching into one workspace.";

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: isZh ? "首页" : "Home", url: `/${locale}` },
          { name: isZh ? "创作中心" : "Create", url: pathname },
        ]}
      />
      <WebPageSchema name={title} description={description} url={pathname} locale={locale} />
      <SoftwareApplicationSchema
        name={title}
        description={description}
        url={pathname}
        locale={locale}
        featureList={
          isZh
            ? ["文生图", "图生图", "文生视频", "图生视频", "模型切换"]
            : ["Text to image", "Image to image", "Text to video", "Image to video", "Model switching"]
        }
      />

      <ImaveoStudio
        locale={locale}
        initialMode={query.mode}
        initialModel={query.model}
        initialStyle={query.style}
      />

      <section className="aurora-stage pb-16 md:pb-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-6xl space-y-10">
            <Breadcrumbs
              items={[
                { name: isZh ? "首页" : "Home", href: `/${locale}` },
                { name: isZh ? "创作中心" : "Create", href: pathname },
              ]}
            />

            <div className="grid gap-4 md:grid-cols-3">
              <div className="panel-lift rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
                <div className="text-[11px] uppercase tracking-[0.22em] text-primary">{isZh ? "快速开始" : "Quick Start"}</div>
                <h2 className="display-serif mt-3 text-3xl font-medium text-white">{isZh ? "先选模式，再写提示词" : "Choose a mode, then write the prompt"}</h2>
                <p className="mt-3 text-sm leading-7 text-zinc-300">
                  {isZh
                    ? "先确定是生图还是生视频，再切换模型和参数，整个操作会更直接。"
                    : "Start with the task you want to complete, then switch models and parameters without losing context."}
                </p>
              </div>
              <div className="panel-lift rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
                <div className="text-[11px] uppercase tracking-[0.22em] text-primary">{isZh ? "模式切换" : "Workflow Switching"}</div>
                <h2 className="display-serif mt-3 text-3xl font-medium text-white">{isZh ? "图像与视频在一个界面里切换" : "Switch between image and video in one place"}</h2>
                <p className="mt-3 text-sm leading-7 text-zinc-300">
                  {isZh
                    ? "不需要在多个页面里来回跳转，就能测试不同模式和模型组合。"
                    : "Move between different creation modes and models without bouncing between disconnected pages."}
                </p>
              </div>
              <div className="panel-lift rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
                <div className="text-[11px] uppercase tracking-[0.22em] text-primary">{isZh ? "模型选择" : "Model Selection"}</div>
                <h2 className="display-serif mt-3 text-3xl font-medium text-white">{isZh ? "按结果偏好选择模型" : "Choose models by the result you need"}</h2>
                <p className="mt-3 text-sm leading-7 text-zinc-300">
                  {isZh
                    ? "电影感视频、社媒短片、广告图和品牌视觉都可以在这里找到更合适的模型。"
                    : "Pick the model that best fits cinematic clips, social motion, product art, posters, or branded visuals."}
                </p>
              </div>
            </div>

            <SeoRichContent
              locale={localeKey}
              keyword={isZh ? "Imaveo 创作中心" : "Imaveo Studio"}
              introTitle={isZh ? "什么是 Imaveo 创作中心？" : "What is Imaveo Studio?"}
              introBody={[
                isZh
                  ? "Imaveo 创作中心把文生图、图生图、文生视频和图生视频放在同一个工作台里，方便你按任务切换模式，再选择更合适的模型。"
                  : "Imaveo Studio brings text-to-image, image-to-image, text-to-video, and image-to-video into one workspace so you can switch tasks first and fine-tune the model second.",
                isZh
                  ? "无论你是从首页、模型页还是工作流页进入，最后都可以在这里继续完成提示词输入、参数调整和模型切换。"
                  : "Whether you arrive from the homepage, a workflow page, or a model page, the Studio is where prompting, parameter tuning, and model switching come together.",
              ]}
              stepsTitle={isZh ? "如何使用创作中心开始第一条工作流" : "How to start your first workflow in the Studio"}
              steps={[
                isZh ? "先选择你的起点是文生图、图生图、文生视频还是图生视频。" : "Choose whether you are starting from text-to-image, image-to-image, text-to-video, or image-to-video.",
                isZh ? "再填写 prompt，并根据当前模式调整比例、质量、时长或数量等参数。" : "Write the prompt, then adjust ratio, quality, duration, or quantity for the current mode.",
                isZh ? "最后选择最适合的模型，确认参数后开始生成或继续下一步创作。" : "Choose the model that fits the result you want, then start generation or continue into the next creation step.",
              ]}
              useCasesTitle={isZh ? "创作中心适合哪些使用场景？" : "When should creators use the Studio?"}
              useCases={[
                isZh ? "已经准备输入提示词或上传图片，想直接开始生成的用户" : "Users who are ready to enter a prompt or upload an image and start creating",
                isZh ? "已经比较过模型和工作流，准备开始第一次试用的用户" : "Visitors who have compared models and workflows and are ready to try the product",
                isZh ? "需要统一切换模型与模式，而不是在多个页面来回跳转的创作者" : "Creators who need one place to switch both models and workflows without bouncing between pages",
                isZh ? "希望在同一工作台里比较模型与参数的高意图创作者" : "High-intent creators who want to compare models and parameters in one surface",
              ]}
              faqTitle={isZh ? "创作中心常见问题" : "Studio FAQ"}
              faqs={[
                {
                  question: isZh ? "创作中心和 AI 视频 / AI 图片页面有什么区别？" : "How is the Studio different from AI video and AI image pages?",
                  answer: isZh
                    ? "AI 视频和 AI 图片页面更适合了解模型和场景，创作中心则是实际操作区：选择模式、填写提示词、上传图片并开始生成。"
                    : "AI video and AI image pages are better for learning models and use cases. The Studio is the working area where you choose a mode, write prompts, upload images, and generate.",
                },
                {
                  question: isZh ? "为什么还要保留 AI 视频中心、AI 图片中心和模型页？" : "Why keep the AI video hub, AI image hub, and model pages if the Studio exists?",
                  answer: isZh
                    ? "因为很多用户在开始生成前需要先了解模型差异、适用场景和价格。了解清楚后，再进入创作中心会更容易得到稳定结果。"
                    : "Because many users want to understand model differences, use cases, and pricing before generating. Once that is clear, the Studio is easier to use effectively.",
                },
              ]}
              relatedTitle={isZh ? "继续浏览相关页面" : "Continue with related pages"}
              relatedLinks={[
                {
                  label: isZh ? "AI 视频中心" : "AI Video Hub",
                  href: `/${locale}/ai-video`,
                  description: isZh ? "查看 AI 视频模型与工作流入口。" : "Explore AI video models and workflow entry points.",
                },
                {
                  label: isZh ? "AI 图片中心" : "AI Image Hub",
                  href: `/${locale}/ai-image`,
                  description: isZh ? "浏览主流图片模型与使用场景。" : "Browse image models and the jobs they are best suited for.",
                },
                {
                  label: isZh ? "价格方案" : "Pricing",
                  href: `/${locale}/pricing`,
                  description: isZh ? "比较订阅和 Credits 方案。" : "Compare subscription and credits plans.",
                },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
