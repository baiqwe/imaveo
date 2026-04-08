import type { Metadata } from "next";
import Link from "next/link";
import { imaveoArticles } from "@/config/imaveo";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  return {
    title: locale === "zh" ? "Imaveo 博客" : "Imaveo Blog",
    description:
      locale === "zh"
        ? "收录模型评测、提示词指南与 AI 视觉工作流内容。"
        : "Model reviews, prompt guides, and practical AI visual creation workflows.",
  };
}

export default async function BlogPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const localeKey = locale as "en" | "zh";
  const isZh = locale === "zh";

  return (
    <section className="py-16 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <div className="section-label">SEO Hub</div>
            <h1 className="mt-3 text-5xl font-medium tracking-[-0.05em] text-white">
              {isZh ? "模型评测、提示词与工作流内容中心" : "Model reviews, prompts, and creator workflow guides"}
            </h1>
            <p className="mt-4 text-base leading-7 text-white/60">
              {isZh
                ? "这里会承接 Veo、Flux、Animeify 等模型相关长尾搜索，也会逐步切到 MDX 文章体系。"
                : "This hub is ready to absorb long-tail search traffic around Veo, Flux, Animeify, and future MDX-based editorial content."}
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {imaveoArticles.map((article) => (
              <article key={article.slug} className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
                <div className="text-[11px] uppercase tracking-[0.22em] text-primary">{article.category}</div>
                <h2 className="mt-4 text-2xl font-medium text-white">{article.title[localeKey]}</h2>
                <p className="mt-3 text-sm leading-7 text-white/58">{article.excerpt[localeKey]}</p>
                <Link
                  href={`/${locale}/pricing`}
                  className="mt-6 inline-flex items-center text-sm text-primary"
                >
                  {isZh ? "查看定价与模型" : "Explore models and pricing"}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
