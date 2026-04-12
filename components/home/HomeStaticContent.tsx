import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Clock3, ImageIcon, Layers3, PlaySquare, Sparkles, WandSparkles } from "lucide-react";
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
        ? "Flux、Animeify 等图片模型集中展示，便于按任务快速切换。"
        : "Switch between Flux, Animeify, and more according to the job you need to finish.",
    },
    {
      icon: <Clock3 className="h-5 w-5 text-primary" />,
      title: isZh ? "资产与状态统一管理" : "One place for assets and statuses",
      desc: isZh
        ? "后续接入 Supabase Realtime 后，生成状态和成片会实时回流到创作库。"
        : "Ready for a realtime creation library once the Supabase generation status flow is wired in.",
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
                  {isZh ? "一个站点，承接视频、图片和二次元专用工作流" : "One hub for video, image, and anime-specialized creation"}
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-zinc-300">
                {isZh
                  ? "首页现在不再只是一张落地页，而是产品中枢。你的 SEO 流量、模型详情、价格页和创作资产都会围绕这个核心框架展开。"
                  : "The homepage now acts as a product hub, not just a landing page. SEO, pricing, model pages, and creation assets all radiate from this same frame."}
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
                  {isZh ? "用详情页承接高意图搜索" : "Turn high-intent searches into model landing pages"}
                </h2>
              </div>
              <p className="text-sm leading-7 text-zinc-300">
                {isZh
                  ? "每个模型页都可以继续扩展为 SEO 入口、价格锚点和示例库。当前已补上视频与图片模型详情页骨架，后续可直接接接口与案例。"
                  : "Each model page can become an SEO entry, a pricing anchor, and a showcase page. The route skeleton is now in place for both video and image models."}
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
                  {isZh ? "导航不再按页面组织，而是按工作流组织" : "Organize navigation around workflows, not generic pages"}
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
                {isZh ? "订阅 + 加油包双轨并行" : "Subscription and top-up packs on the same surface"}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-300">
                {isZh
                  ? "定价页继续复用现有 Creem 集成，但视觉上改成更克制的双卡逻辑：左边订阅，右边积分包，用单次成本和权益差距推动升级。"
                  : "Keep the current Creem integration, but frame pricing as a cleaner dual-track story: subscriptions on the left, refill packs on the right."}
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
                  {isZh ? "阅读 SEO Hub" : "Read the SEO hub"}
                </Link>
              </div>
            </div>

            <div className="rounded-[32px] border border-zinc-800 bg-black/40 p-7">
              <div className="section-label">SEO Engine</div>
              <h2 className={`mt-3 text-3xl font-medium text-white ${isZh ? "tracking-normal" : "tracking-[-0.05em]"}`}>
                {isZh ? "博客页负责吃下模型评测和提示词长尾词" : "The blog becomes your long-tail acquisition engine"}
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

      <section className="pb-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-6xl rounded-[36px] border border-primary/20 bg-[radial-gradient(circle_at_top,rgba(245,197,24,0.18),rgba(0,0,0,0.88)_55%)] p-8 md:p-10">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <div className="section-label">Animeify Layer</div>
                <h2 className={`mt-3 text-4xl font-medium text-white ${isZh ? "tracking-normal" : "tracking-[-0.05em]"}`}>
                  {isZh ? "Animeify 作为 Imaveo 的专属子品牌继续存在" : "Animeify stays alive as a specialized layer inside Imaveo"}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-300">
                  {isZh
                    ? "你后续只需要在 `/ai-image/animeify` 或自定义域名入口注入樱花粉 / 青色变量，就能保留二次元子品牌，同时共享主站的支付、账号和资产系统。"
                    : "A route-level accent swap on `/ai-image/animeify` can preserve the anime-specific sub-brand while sharing the same billing, auth, and asset systems."}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <MiniPanel
                  icon={<Sparkles className="h-4 w-4 text-primary" />}
                  title={isZh ? "独立皮肤" : "Independent skin"}
                  desc={isZh ? "按路由切换 CSS 变量即可。" : "Switch CSS variables by route or domain."}
                />
                <MiniPanel
                  icon={<WandSparkles className="h-4 w-4 text-primary" />}
                  title={isZh ? "模型特化" : "Model specialization"}
                  desc={isZh ? "默认指向动漫专用权重与参数。" : "Default to your anime-tuned weights and presets."}
                />
                <MiniPanel
                  icon={<Layers3 className="h-4 w-4 text-primary" />}
                  title={isZh ? "共享底座" : "Shared foundation"}
                  desc={isZh ? "账号、支付、资产和 SEO 都复用。" : "Reuse auth, billing, assets, and SEO."}
                />
                <MiniPanel
                  icon={<ArrowRight className="h-4 w-4 text-primary" />}
                  title={isZh ? "专属入口" : "Featured entry"}
                  desc={isZh ? "在导航和首页模型标签里持续曝光。" : "Keep it visible in nav and featured tags."}
                />
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
