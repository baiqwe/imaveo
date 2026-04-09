import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Film, Sparkles } from "lucide-react";
import { imaveoModels } from "@/config/imaveo";
import { buildAbsoluteUrl, buildLocaleAlternates, getToolMetadata } from "@/utils/seo/metadata";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const localeKey = locale as "en" | "zh";
  const seo = getToolMetadata(localeKey, "text-to-video");
  const pathname = `/${locale}/text-to-video`;

  return {
    title: seo?.title,
    description: seo?.description,
    keywords: seo?.keywords,
    alternates: buildLocaleAlternates(pathname),
    openGraph: {
      title: seo?.title,
      description: seo?.description,
      url: buildAbsoluteUrl(pathname),
    },
  };
}

export default async function TextToVideoPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const isZh = locale === "zh";
  const videoModels = imaveoModels.filter((model) => model.category === "video");

  return (
    <section className="py-16 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[36px] border border-white/10 bg-white/[0.03] p-8 md:p-10">
            <div className="section-label">Text to Video</div>
            <h1 className="mt-3 text-5xl font-medium tracking-[-0.05em] text-white">
              {isZh ? "一句话生成 AI 视频" : "Generate AI videos from a single prompt"}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-white/58">
              {isZh
                ? "这个页面用于承接文生视频类搜索与转化，后续可以挂真实的 prompt console、时长、比例和模型调度。"
                : "This page is designed to capture text-to-video intent and can later host the full prompt console, duration controls, aspect ratios, and dispatch logic."}
            </p>

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
                      <h2 className="mt-4 text-2xl font-medium text-white">{model.labels[locale as "en" | "zh"]}</h2>
                      <p className="mt-3 text-sm leading-7 text-white/52">{model.descriptions[locale as "en" | "zh"]}</p>
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
        </div>
      </div>
    </section>
  );
}
