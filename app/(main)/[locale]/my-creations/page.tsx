import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Download, Heart, RefreshCw, Share2 } from "lucide-react";

const creationSeeds = [
  { id: "01", type: "Video", status: "Completed", tone: "from-[#f5c518]/25 to-transparent", height: "h-[320px]" },
  { id: "02", type: "Image", status: "Rendering", tone: "from-cyan-400/20 to-transparent", height: "h-[420px]" },
  { id: "03", type: "Favorite", status: "Completed", tone: "from-pink-400/20 to-transparent", height: "h-[360px]" },
  { id: "04", type: "Video", status: "Queued", tone: "from-white/10 to-transparent", height: "h-[440px]" },
  { id: "05", type: "Image", status: "Completed", tone: "from-emerald-400/20 to-transparent", height: "h-[300px]" },
  { id: "06", type: "Video", status: "Completed", tone: "from-orange-400/20 to-transparent", height: "h-[390px]" },
];

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  return {
    title: locale === "zh" ? "我的创作" : "My Creations",
    description:
      locale === "zh"
        ? "统一查看视频、图片和收藏资产。"
        : "Manage generated videos, images, and saved favorites in one place.",
  };
}

export default async function MyCreationsPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const isZh = locale === "zh";

  return (
    <section className="py-16 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="section-label">Creation Library</div>
              <h1 className="mt-3 text-5xl font-medium tracking-[-0.05em] text-white">
                {isZh ? "瀑布流资产管理页骨架已就位" : "A masonry-style creation library, ready for realtime status updates"}
              </h1>
              <p className="mt-4 text-base leading-7 text-white/58">
                {isZh
                  ? "下一步接入 Supabase Realtime 后，这里就能从 pending 自动切到 completed，无需刷新页面。"
                  : "Once Supabase Realtime is connected, pending jobs can turn into completed assets here without a page refresh."}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                isZh ? "全部" : "All",
                isZh ? "视频" : "Video",
                isZh ? "图片" : "Image",
                isZh ? "收藏" : "Favorites",
              ].map((tab, index) => (
                <button
                  key={tab}
                  className={`rounded-full px-4 py-2 text-sm ${
                    index === 0 ? "bg-primary text-black" : "border border-white/10 bg-white/[0.03] text-white/65"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="columns-1 gap-5 md:columns-2 xl:columns-3">
            {creationSeeds.map((item) => (
              <div
                key={item.id}
                className="group mb-5 break-inside-avoid rounded-[28px] border border-white/10 bg-white/[0.03] p-4"
              >
                <div className={`relative overflow-hidden rounded-[24px] bg-black ${item.height}`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.tone}`} />
                  <div className="absolute inset-x-4 top-4 flex items-center justify-between">
                    <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/55">
                      {item.type}
                    </span>
                    <span className="rounded-full bg-white/8 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-primary">
                      {item.status}
                    </span>
                  </div>
                  <div className="absolute inset-x-4 bottom-4 rounded-[20px] border border-white/10 bg-black/45 p-4 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
                    <div className="mb-3 text-sm font-medium text-white">
                      {isZh ? `创作资产 ${item.id}` : `Creation Asset ${item.id}`}
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <Action icon={<Download className="h-4 w-4" />} />
                      <Action icon={<Share2 className="h-4 w-4" />} />
                      <Action icon={<RefreshCw className="h-4 w-4" />} />
                      <Action icon={<Heart className="h-4 w-4" />} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Action({ icon }: { icon: ReactNode }) {
  return (
    <button className="rounded-full border border-white/10 bg-white/[0.04] p-2 transition-colors hover:border-primary/40 hover:text-primary">
      {icon}
    </button>
  );
}
