import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Clock3, ImageIcon, PlaySquare } from "lucide-react";
import { imaveoArticles, imaveoModels, imaveoTools } from "@/config/imaveo";
import { buildStudioHrefFromPath } from "@/utils/studio";

type Props = { locale: string };

export default async function HomeStaticContent({ locale }: Props) {
  const isZh = locale === "zh";
  const localeKey = locale as "en" | "zh";
  const localePrefix = `/${locale}`;

  const featureBlocks = [
    {
      icon: <PlaySquare className="h-5 w-5 text-primary" />,
      title: isZh ? "聚合式 AI 视频入口" : "Unified AI video workflows",
      desc: isZh
        ? "把文生视频和图生视频放在同一个操作层，减少模型切换成本。"
        : "Keep text-to-video and image-to-video inside one dispatch-ready workspace.",
    },
    {
      icon: <ImageIcon className="h-5 w-5 text-primary" />,
      title: isZh ? "图片模型矩阵" : "Image model matrix",
      desc: isZh
        ? "统一展示主流图片模型，便于按任务快速切换。"
        : "Browse image models in one place and switch according to the job you need to finish.",
    },
    {
      icon: <Clock3 className="h-5 w-5 text-primary" />,
      title: isZh ? "资产与状态统一管理" : "One place for assets and statuses",
      desc: isZh
        ? "创作记录、模型选择和后续结果回看都可以在同一条链路里完成。"
        : "Creation history, model choices, and output review can stay in one continuous flow.",
    },
  ];

  return (
    <>
      <section className="border-b border-zinc-800 py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="section-label">Core System</div>
                <h2 className={`mt-3 text-4xl font-medium text-white ${isZh ? "tracking-normal" : "tracking-[-0.05em]"}`}>
                  {isZh ? "一个站点，承接视频与图片创作" : "One hub for AI video and image creation"}
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-zinc-300">
                {isZh
                  ? "在这里快速选择创作任务、切换模型、查看价格，并进入统一的创作中心开始生成。"
                  : "Use the homepage to choose a workflow, compare models, review pricing, and enter the Studio from one clear starting point."}
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {featureBlocks.map((item) => (
                <div
                  key={item.title}
                  className="group rounded-[30px] border border-zinc-800 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 transition-colors hover:border-primary/30 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))]"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-medium text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-300">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20" id="models">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <div className="section-label">Model Board</div>
                <h2 className={`mt-3 text-4xl font-medium text-white ${isZh ? "tracking-normal" : "tracking-[-0.05em]"}`}>
                  {isZh ? "按模型能力选择合适的创作入口" : "Choose the right model for the job"}
                </h2>
              </div>
              <p className="text-sm leading-7 text-zinc-300">
                {isZh
                  ? "不同模型擅长的结果不同。先了解它们的强项，再进入创作中心会更容易得到稳定结果。"
                  : "Each model is better at different kinds of output. Reviewing their strengths first makes the Studio faster and easier to use."}
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {imaveoModels.map((model) => (
                <Link
                  key={model.slug}
                  href={buildStudioHrefFromPath(locale, model.href, "home-model-board")}
                  className="group rounded-[28px] border border-zinc-800 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] p-6 transition-colors hover:border-primary/45 hover:bg-white/[0.05]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-black">
                          {model.badge}
                        </span>
                        <span className="text-sm uppercase tracking-[0.22em] text-zinc-500">{model.provider}</span>
                      </div>
                      <h3 className="mt-4 text-2xl font-medium text-white">{model.labels[localeKey]}</h3>
                      <p className="mt-3 text-sm leading-7 text-zinc-300">{model.descriptions[localeKey]}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-zinc-500 transition-colors group-hover:text-primary" />
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {model.strengths[localeKey].map((strength) => (
                      <span
                        key={strength}
                        className="rounded-full border border-zinc-800 px-3 py-1 text-[11px] text-zinc-400"
                      >
                        {strength}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-800 bg-white/[0.02] py-20" id="tools">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="section-label">Workflow Grid</div>
                <h2 className={`mt-3 text-4xl font-medium text-white ${isZh ? "tracking-normal" : "tracking-[-0.05em]"}`}>
                  {isZh ? "按创作任务快速进入" : "Enter by the task you want to create"}
                </h2>
              </div>
              <Link href={`${localePrefix}/my-creations`} className="text-sm text-primary">
                {isZh ? "查看创作库" : "Open my creations"}
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {imaveoTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={buildStudioHrefFromPath(locale, tool.href, "home-tool-grid")}
                  className="rounded-[24px] border border-zinc-800 bg-black/35 p-5 transition-colors hover:border-primary/45 hover:bg-white/[0.05]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-lg font-medium text-white">{tool.labels[localeKey]}</div>
                    {tool.hot ? (
                      <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-primary">
                        Hot
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-3 text-sm leading-7 text-zinc-300">{tool.descriptions[localeKey]}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[32px] border border-zinc-800 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] p-7">
              <div className="section-label">Pricing Logic</div>
              <h2 className={`mt-3 text-4xl font-medium text-white ${isZh ? "tracking-normal" : "tracking-[-0.05em]"}`}>
                {isZh ? "订阅与积分包都清楚可选" : "Subscriptions and credits packs, clearly separated"}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-300">
                {isZh
                  ? "按使用频率决定更适合订阅还是按次购买，让团队和个人创作者都能找到合适方案。"
                  : "Choose between subscriptions and pay-as-you-go packs based on how often you create and how much flexibility you need."}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`${localePrefix}/pricing`}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-black"
                >
                  {isZh ? "进入定价页" : "Open pricing"} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={`${localePrefix}/blog`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm text-white/70 transition-colors hover:border-primary/40 hover:text-white"
                >
                  {isZh ? "阅读使用指南" : "Read the guides"}
                </Link>
              </div>
            </div>

            <div className="rounded-[32px] border border-zinc-800 bg-black/40 p-7">
              <div className="section-label">{isZh ? "内容中心" : "Editorial Hub"}</div>
              <h2 className={`mt-3 text-3xl font-medium text-white ${isZh ? "tracking-normal" : "tracking-[-0.05em]"}`}>
                {isZh ? "在指南与评测里找到更具体的创作思路" : "Find practical guidance, prompt ideas, and model reviews"}
              </h2>
              <div className="mt-6 space-y-3">
                {imaveoArticles.map((article) => (
                  <div key={article.slug} className="rounded-[24px] border border-zinc-800 bg-white/[0.03] p-4">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-primary">{article.category}</div>
                    <div className="mt-2 text-base font-medium text-white">{article.title[localeKey]}</div>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">{article.excerpt[localeKey]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function MiniPanel({ icon, title, desc }: { icon: ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-[22px] border border-zinc-800 bg-black/30 p-4">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
        {icon}
      </div>
      <div className="text-sm font-medium text-white">{title}</div>
      <div className="mt-2 text-sm leading-6 text-zinc-400">{desc}</div>
    </div>
  );
}
