import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BreadcrumbSchema, CollectionPageSchema } from "@/components/breadcrumb-schema";
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
  const [featuredArticle, ...otherArticles] = imaveoArticles;

  return (
    <section className="aurora-stage py-16 md:py-20">
      <BreadcrumbSchema
        items={[
          { name: isZh ? "首页" : "Home", url: `/${locale}` },
          { name: isZh ? "博客" : "Blog", url: `/${locale}/blog` },
        ]}
      />
      <CollectionPageSchema
        name={isZh ? "Imaveo 博客" : "Imaveo Blog"}
        description={
          isZh ? "收录模型评测、提示词指南与 AI 视觉工作流内容。" : "Model reviews, prompt guides, and practical AI visual creation workflows."
        }
        url={`/${locale}/blog`}
        locale={locale}
        items={imaveoArticles.map((article) => ({
          name: article.title[localeKey],
          url: `/${locale}${article.href}`,
        }))}
      />
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-4xl">
            <div className="section-label">{isZh ? "内容中心" : "Editorial Hub"}</div>
            <h1 className="display-serif mt-3 text-5xl font-medium text-white md:text-6xl">
              {isZh ? "模型评测、提示词与工作流内容中心" : "Model reviews, prompts, and creator workflow guides"}
            </h1>
            <p className="mt-4 text-base leading-7 text-zinc-300">
              {isZh
                ? "在这里找到模型评测、提示词写法、工作流建议和更适合业务场景的实操内容。"
                : "Find model reviews, prompt guidance, workflow suggestions, and practical content built around real creative jobs."}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="rounded-full border border-white/10 bg-black/25 px-4 py-2 text-sm text-zinc-200">
                {isZh ? `${imaveoArticles.length} 篇解释型内容` : `${imaveoArticles.length} explanatory articles`}
              </div>
              <div className="rounded-full border border-white/10 bg-black/25 px-4 py-2 text-sm text-zinc-200">
                {isZh ? "模型评测 + Prompt + Workflow" : "Model reviews + prompts + workflows"}
              </div>
            </div>
          </div>

          <article className="panel-lift mb-8 overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(18,19,22,0.96),rgba(32,21,16,0.96))] p-7 md:p-8">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-primary">{isZh ? "Featured" : "Featured"}</div>
                <h2 className="display-serif mt-4 max-w-3xl text-3xl font-medium text-white md:text-5xl">{featuredArticle.title[localeKey]}</h2>
                <p className="mt-4 max-w-3xl text-base leading-8 text-zinc-300">{featuredArticle.excerpt[localeKey]}</p>
                <Link href={`/${locale}${featuredArticle.href}`} className="mt-6 inline-flex items-center gap-2 text-sm text-primary">
                  {isZh ? "阅读精选文章" : "Read the featured article"} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-[24px] border border-white/10 bg-black/25 p-5">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-zinc-500">{isZh ? "内容类型" : "Editorial type"}</div>
                  <div className="mt-3 text-xl font-medium text-white">{featuredArticle.category}</div>
                  <div className="mt-2 text-sm leading-7 text-zinc-300">{isZh ? "围绕模型、流程和创作决策写的解释型内容。" : "Explanatory content around models, workflows, and creator decision-making."}</div>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-black/25 p-5">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-zinc-500">{isZh ? "推荐阅读方式" : "Recommended read"}</div>
                  <div className="mt-3 text-xl font-medium text-white">{isZh ? "先看方法，再开始创作" : "Read the method, then start creating"}</div>
                  <div className="mt-2 text-sm leading-7 text-zinc-300">{isZh ? "先理解模型或 workflow 的差异，再切到 create / pricing，会更容易做出正确选择。" : "Understand the model or workflow first, then continue into create or pricing with a clearer decision in mind."}</div>
                </div>
              </div>
            </div>
          </article>

          <div className="grid gap-5 lg:grid-cols-3">
            {otherArticles.map((article) => (
              <article key={article.slug} className="panel-lift rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
                <div className="text-[11px] uppercase tracking-[0.22em] text-primary">{article.category}</div>
                <h2 className="mt-4 text-2xl font-medium text-white">{article.title[localeKey]}</h2>
                <p className="mt-3 text-sm leading-7 text-zinc-300">{article.excerpt[localeKey]}</p>
                <Link
                  href={`/${locale}${article.href}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm text-primary"
                >
                  {isZh ? "阅读全文" : "Read article"} <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
