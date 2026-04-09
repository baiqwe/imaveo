import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getImaveoModel } from "@/config/imaveo";
import { buildAbsoluteUrl, buildLocaleAlternates, getModelMetadata } from "@/utils/seo/metadata";

export async function generateMetadata(props: { params: Promise<{ locale: string; model: string }> }): Promise<Metadata> {
  const { locale, model } = await props.params;
  const item = getImaveoModel(model, "image");
  if (!item) return {};
  const localeKey = locale as "en" | "zh";
  const seo = getModelMetadata(localeKey, model, "image");
  const pathname = `/${locale}/ai-image/${model}`;

  return {
    title: seo?.title ?? `${item.labels[localeKey]} | Imaveo`,
    description: seo?.description ?? item.descriptions[localeKey],
    keywords: seo?.keywords,
    alternates: buildLocaleAlternates(pathname),
    openGraph: {
      title: seo?.title ?? `${item.labels[localeKey]} | Imaveo`,
      description: seo?.description ?? item.descriptions[localeKey],
      url: buildAbsoluteUrl(pathname),
    },
  };
}

export default async function ImageModelPage(props: { params: Promise<{ locale: string; model: string }> }) {
  const { locale, model } = await props.params;
  const item = getImaveoModel(model, "image");
  const localeKey = locale as "en" | "zh";
  const isZh = locale === "zh";

  if (!item) notFound();

  return (
    <section className="py-16 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-5xl rounded-[36px] border border-white/10 bg-white/[0.03] p-8 md:p-10">
          <div className="section-label">AI Image Model</div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-black">
              {item.badge}
            </span>
            <span className="text-sm uppercase tracking-[0.18em] text-white/40">{item.provider}</span>
          </div>
          <h1 className="mt-5 text-5xl font-medium tracking-[-0.05em] text-white">{item.labels[localeKey]}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-white/58">{item.descriptions[localeKey]}</p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {item.strengths[localeKey].map((strength) => (
              <div key={strength} className="rounded-[24px] border border-white/10 bg-black/35 p-5 text-sm text-white/68">
                {strength}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-black"
            >
              {isZh ? "返回首页中枢" : "Back to the hub"} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={`/${locale}/my-creations`}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm text-white/70"
            >
              {isZh ? "查看创作资产" : "Open my creations"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
