import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clapperboard,
  ImageIcon,
  Layers3,
  Library,
  ShieldCheck,
  Sparkles,
  Wand2,
} from "lucide-react";
import { WebPageSchema } from "@/components/breadcrumb-schema";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { SeoConversionPanel } from "@/components/seo/seo-conversion-panel";
import { SeoRichContent } from "@/components/seo/seo-rich-content";
import { getModelPageProfile } from "@/config/model-page-content";
import type { ImaveoModel } from "@/config/imaveo";
import { buildStudioHref } from "@/utils/studio";

type ModelExperiencePageProps = {
  locale: string;
  category: "image" | "video";
  item: ImaveoModel;
  siblingModels: ImaveoModel[];
};

function getStudioMode(item: ImaveoModel) {
  if (item.mode === "image-to-video") return "image-to-video";
  if (item.mode === "text-to-video") return "text-to-video";
  if (item.mode === "image-to-image") return "image-to-image";
  return "text-to-image";
}

function getModeLabel(mode: string, isZh: boolean) {
  switch (mode) {
    case "image-to-video":
      return isZh ? "图生视频" : "Image to Video";
    case "text-to-video":
      return isZh ? "文生视频" : "Text to Video";
    case "image-to-image":
      return isZh ? "图生图" : "Image to Image";
    default:
      return isZh ? "文生图" : "Text to Image";
  }
}

export function ModelExperiencePage({
  locale,
  category,
  item,
  siblingModels,
}: ModelExperiencePageProps) {
  const localeKey = locale as "en" | "zh";
  const isZh = locale === "zh";
  const profile = getModelPageProfile(item.slug);
  const mode = getStudioMode(item);
  const modeLabel = getModeLabel(mode, isZh);
  const hubHref = `/${locale}/${category === "video" ? "ai-video" : "ai-image"}`;
  const studioHref = buildStudioHref(locale, {
    mode,
    model: item.slug,
    style: item.generationDefaults?.style,
    source: category === "video" ? "seo-video-model" : "seo-image-model",
  });
  const aspectRatio =
    item.generationDefaults?.aspectRatio ??
    (category === "video" ? "16:9" : "1:1");
  const durationOrStyle =
    category === "video"
      ? `${item.generationDefaults?.duration ?? 6}s`
      : (item.generationDefaults?.style ?? "Creative");
  const modelNoun =
    category === "video"
      ? isZh
        ? "视频模型"
        : "video model"
      : isZh
        ? "图片模型"
        : "image model";
  const icon =
    category === "video" ? (
      <Clapperboard className="h-5 w-5" />
    ) : (
      <ImageIcon className="h-5 w-5" />
    );

  return (
    <section className="aurora-stage py-12 md:py-16">
      <WebPageSchema
        name={`${item.labels[localeKey]} | Imaveo`}
        description={item.descriptions[localeKey]}
        url={`/${locale}/${category === "video" ? "ai-video" : "ai-image"}/${item.slug}`}
        locale={locale}
      />
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-7xl space-y-14">
          <Breadcrumbs
            items={[
              { name: isZh ? "首页" : "Home", href: `/${locale}` },
              {
                name:
                  category === "video"
                    ? isZh
                      ? "AI 视频"
                      : "AI Video"
                    : isZh
                      ? "AI 图片"
                      : "AI Image",
                href: hubHref,
              },
              { name: item.labels[localeKey], href: `/${locale}${item.href}` },
            ]}
          />

          <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-start">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {icon}
                {item.badge} · {item.provider}
              </div>
              <h1
                className={`mt-6 max-w-4xl text-5xl font-medium leading-[0.95] text-white md:text-7xl ${isZh ? "tracking-normal" : "tracking-[-0.06em]"}`}
              >
                {item.labels[localeKey]} {modelNoun}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
                {item.descriptions[localeKey]}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {item.strengths[localeKey].map((strength) => (
                  <div
                    key={strength}
                    className="panel-lift rounded-[22px] border border-white/10 bg-black/30 p-4 text-sm leading-6 text-zinc-200"
                  >
                    <CheckCircle2 className="mb-3 h-4 w-4 text-primary" />
                    {strength}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={studioHref}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-black shadow-[0_0_36px_rgba(245,197,24,0.22)]"
                >
                  {isZh
                    ? `打开 ${item.labels.zh} 创作中心`
                    : `Open ${item.labels.en} Studio`}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={hubHref}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-medium text-zinc-100 transition-colors hover:border-primary/30"
                >
                  {isZh ? "返回模型中心比较" : "Compare model hub"}
                </Link>
              </div>
            </div>

            <form
              action={`/${locale}/create`}
              method="get"
              className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.025))] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.3)]"
            >
              <input type="hidden" name="mode" value={mode} />
              <input type="hidden" name="model" value={item.slug} />
              <input
                type="hidden"
                name="source"
                value={`${category}-model-page`}
              />
              {item.generationDefaults?.style ? (
                <input
                  type="hidden"
                  name="style"
                  value={item.generationDefaults.style}
                />
              ) : null}
              <div className="section-label">
                {isZh ? "简易生成器" : "Quick Generator"}
              </div>
              <h2
                className={`mt-3 text-3xl font-medium text-white ${isZh ? "tracking-normal" : "tracking-[-0.04em]"}`}
              >
                {profile.generatorTitle[localeKey]}
              </h2>
              <p className="mt-3 text-sm leading-7 text-zinc-300">
                {profile.generatorHint[localeKey]}
              </p>

              <label
                htmlFor="model-prompt"
                className="mt-5 block text-[11px] uppercase tracking-[0.22em] text-zinc-500"
              >
                Prompt
              </label>
              <textarea
                id="model-prompt"
                name="prompt"
                defaultValue={profile.starterPrompt[localeKey]}
                placeholder={profile.promptPlaceholder[localeKey]}
                className="mt-3 min-h-40 w-full resize-y rounded-[24px] border border-zinc-700 bg-black/45 px-4 py-4 text-base leading-7 text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-primary/45"
              />

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-[18px] border border-white/10 bg-black/30 p-3">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                    <Layers3 className="h-3.5 w-3.5" />
                    {isZh ? "比例" : "Ratio"}
                  </div>
                  <div className="mt-2 text-lg font-medium text-white">
                    {aspectRatio}
                  </div>
                </div>
                <div className="rounded-[18px] border border-white/10 bg-black/30 p-3">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                    <Sparkles className="h-3.5 w-3.5" />
                    {category === "video"
                      ? isZh
                        ? "时长"
                        : "Duration"
                      : isZh
                        ? "风格"
                        : "Style"}
                  </div>
                  <div className="mt-2 text-lg font-medium text-white">
                    {durationOrStyle}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="mt-5 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
              >
                {isZh ? "带着这个 Prompt 去生成" : "Generate from this prompt"}
                <ArrowRight className="h-4 w-4" />
              </button>
              <p className="mt-3 text-xs leading-5 text-zinc-500">
                {isZh
                  ? `会跳转到创作中心，并自动锁定 ${modeLabel} 与 ${item.labels.zh}。`
                  : `Opens Studio with ${modeLabel} and ${item.labels.en} preselected.`}
              </p>
            </form>
          </section>

          <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <div className="section-label">
                {isZh ? "语义定位" : "Semantic Fit"}
              </div>
              <h2
                className={`mt-3 text-4xl font-medium text-white ${isZh ? "tracking-normal" : "tracking-[-0.05em]"}`}
              >
                {isZh
                  ? `${item.labels.zh} 不只是一个入口，而是一类创作任务`
                  : `${item.labels.en} is a job-specific creative surface`}
              </h2>
              <p className="mt-4 text-base leading-8 text-zinc-300">
                {isZh
                  ? `这个页面围绕 ${profile.visualDirection.zh} 设计：先给可输入的生成器，再给案例、参数、比较和可信说明，让用户知道为什么应该从这个模型开始。`
                  : `This page is designed around ${profile.visualDirection.en}: a quick generator first, followed by examples, settings, comparison guidance, and trust notes that explain why this model is the right starting point.`}
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="panel-lift rounded-[24px] border border-white/10 bg-black/30 p-5">
                <div className="text-[11px] uppercase tracking-[0.22em] text-primary">
                  {isZh ? "最佳用途" : "Best For"}
                </div>
                <p className="mt-3 text-sm leading-7 text-zinc-200">
                  {profile.compare.bestFor[localeKey]}
                </p>
              </div>
              <div className="panel-lift rounded-[24px] border border-white/10 bg-black/30 p-5">
                <div className="text-[11px] uppercase tracking-[0.22em] text-primary">
                  {isZh ? "注意点" : "Watch Out"}
                </div>
                <p className="mt-3 text-sm leading-7 text-zinc-200">
                  {profile.compare.watchOut[localeKey]}
                </p>
              </div>
              <div className="panel-lift rounded-[24px] border border-white/10 bg-black/30 p-5">
                <div className="text-[11px] uppercase tracking-[0.22em] text-primary">
                  {isZh ? "替代模型" : "Alternative"}
                </div>
                <p className="mt-3 text-sm leading-7 text-zinc-200">
                  {profile.compare.alternative[localeKey]}
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="section-label">
                  {isZh ? "实际案例画廊" : "Example Gallery"}
                </div>
                <h2
                  className={`mt-3 text-4xl font-medium text-white ${isZh ? "tracking-normal" : "tracking-[-0.05em]"}`}
                >
                  {isZh
                    ? `${item.labels.zh} 可以生成什么`
                    : `What ${item.labels.en} is built to create`}
                </h2>
              </div>
              <Link
                href={`/${locale}/my-creations`}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-200 transition-colors hover:border-primary/30"
              >
                <Library className="h-4 w-4" />
                {isZh ? "查看创作资产库" : "Open creation library"}
              </Link>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {profile.gallery.map((example) => (
                <div
                  key={example.title.en}
                  className="panel-lift overflow-hidden rounded-[26px] border border-white/10 bg-black/35"
                >
                  <div
                    className={`h-52 bg-gradient-to-br ${example.accent} p-4`}
                  >
                    <div className="flex h-full flex-col justify-between rounded-[20px] border border-white/10 bg-black/20 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                      <span className="w-fit rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/80">
                        {profile.visualDirection[localeKey]}
                      </span>
                      <div>
                        <div className="h-1.5 w-16 rounded-full bg-primary/80" />
                        <div className="mt-3 h-1.5 w-28 rounded-full bg-white/45" />
                        <div className="mt-2 h-1.5 w-20 rounded-full bg-white/25" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-medium text-white">
                      {example.title[localeKey]}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-zinc-300">
                      {example.result[localeKey]}
                    </p>
                    <div className="mt-4 rounded-[18px] border border-white/10 bg-zinc-950/70 p-3 text-xs leading-6 text-zinc-400">
                      {example.prompt[localeKey]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-6">
              <div className="section-label">
                {isZh ? "推荐工作流" : "Recommended Workflow"}
              </div>
              <h2
                className={`mt-3 text-3xl font-medium text-white ${isZh ? "tracking-normal" : "tracking-[-0.04em]"}`}
              >
                {isZh
                  ? `如何用 ${item.labels.zh} 起步`
                  : `How to start with ${item.labels.en}`}
              </h2>
              <div className="mt-5 space-y-4">
                {profile.workflow.map((step, index) => (
                  <div
                    key={step.en}
                    className="flex gap-4 rounded-[22px] border border-white/10 bg-black/25 p-4"
                  >
                    <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-primary text-sm font-semibold text-black">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-7 text-zinc-200">
                      {step[localeKey]}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {profile.guidance.map((entry) => (
                <div
                  key={entry.title.en}
                  className="panel-lift rounded-[26px] border border-white/10 bg-black/30 p-5"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Wand2 className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-medium text-white">
                    {entry.title[localeKey]}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-300">
                    {entry.body[localeKey]}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(135deg,rgba(245,197,24,0.09),rgba(255,255,255,0.025)_42%,rgba(80,130,255,0.06))] p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div>
                <div className="section-label">
                  {isZh ? "E-E-A-T 与使用说明" : "E-E-A-T Notes"}
                </div>
                <h2
                  className={`mt-3 text-3xl font-medium text-white ${isZh ? "tracking-normal" : "tracking-[-0.04em]"}`}
                >
                  {isZh
                    ? "把模型说明写清楚，用户才敢开始生成"
                    : "Trust details that help users create with context"}
                </h2>
              </div>
              <ShieldCheck className="h-9 w-9 text-primary" />
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {profile.eeat.map((entry) => (
                <div
                  key={entry.label.en}
                  className="rounded-[22px] border border-white/10 bg-black/30 p-5"
                >
                  <div className="text-sm font-semibold text-white">
                    {entry.label[localeKey]}
                  </div>
                  <p className="mt-3 text-sm leading-7 text-zinc-300">
                    {entry.detail[localeKey]}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <SeoConversionPanel
            eyebrow={isZh ? "开始生成" : "Start Creating"}
            title={
              isZh
                ? `用 ${item.labels.zh} 跑第一版，而不是只浏览模型说明`
                : `Run a first ${item.labels.en} pass instead of only reading docs`
            }
            description={
              isZh
                ? `模型页的目标是帮你判断是否适合当前任务。确认以后，直接带着 prompt 进入创作中心继续生成。`
                : `This model page helps you decide fit. Once the job is clear, carry the prompt into Studio and generate the first pass.`
            }
            primaryHref={studioHref}
            primaryLabel={isZh ? "打开创作中心" : "Open Studio"}
            secondaryHref={hubHref}
            secondaryLabel={isZh ? "继续比较模型" : "Compare models"}
            highlights={[
              isZh ? `默认锁定 ${modeLabel}` : `Preselects ${modeLabel}`,
              isZh
                ? `默认选择 ${item.labels.zh}`
                : `Starts with ${item.labels.en}`,
              isZh
                ? "生成后进入创作资产库复看和管理"
                : "Review outputs later in the creations library",
            ]}
          />

          <SeoRichContent
            locale={localeKey}
            keyword={item.labels[localeKey]}
            introTitle={
              isZh ? `${item.labels.zh} 是什么？` : `What is ${item.labels.en}?`
            }
            introBody={[
              isZh
                ? `${item.labels.zh} 是 Imaveo 的 ${modelNoun}，更适合 ${profile.compare.bestFor.zh}`
                : `${item.labels.en} is an Imaveo ${modelNoun} designed for ${profile.compare.bestFor.en.toLowerCase()}`,
              isZh
                ? `这个页面按 ${profile.visualDirection.zh} 来组织内容，包含可直接跳转创作中心的生成器、案例画廊、模型比较和使用可信说明。`
                : `The page is organized around ${profile.visualDirection.en}, with a quick Studio handoff, example gallery, comparison notes, and trust guidance.`,
            ]}
            stepsTitle={
              isZh
                ? `如何在 Imaveo 上使用 ${item.labels.zh}`
                : `How to use ${item.labels.en} on Imaveo`
            }
            steps={profile.workflow.map((step) => step[localeKey])}
            useCasesTitle={
              isZh
                ? `${item.labels.zh} 适合哪些场景？`
                : `When should creators use ${item.labels.en}?`
            }
            useCases={[
              profile.compare.bestFor[localeKey],
              ...profile.guidance.map((entry) => entry.title[localeKey]),
            ]}
            faqTitle={
              isZh ? `${item.labels.zh} 常见问题` : `${item.labels.en} FAQ`
            }
            faqs={[
              {
                question: isZh
                  ? `${item.labels.zh} 应该从哪个工作流开始？`
                  : `Which workflow should ${item.labels.en} start from?`,
                answer: isZh
                  ? `建议从 ${modeLabel} 开始，页面中的生成器会自动带上模型和推荐参数。`
                  : `Start from ${modeLabel}; the quick generator passes the model and suggested settings into Studio.`,
              },
              {
                question: isZh
                  ? `什么时候不应该优先用 ${item.labels.zh}？`
                  : `When should I choose a different model instead of ${item.labels.en}?`,
                answer: profile.compare.watchOut[localeKey],
              },
            ]}
            relatedTitle={
              isZh ? "继续浏览相关页面" : "Continue with related pages"
            }
            relatedLinks={[
              {
                label:
                  category === "video"
                    ? isZh
                      ? "AI 视频中心"
                      : "AI Video Hub"
                    : isZh
                      ? "AI 图片中心"
                      : "AI Image Hub",
                href: hubHref,
                description: isZh
                  ? "回到中心页继续横向比较模型。"
                  : "Return to the hub and compare models side by side.",
              },
              {
                label: isZh ? "创作中心" : "Studio",
                href: studioHref,
                description: isZh
                  ? "带着当前模型进入创作中心开始生成。"
                  : "Open Studio with this model selected.",
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
