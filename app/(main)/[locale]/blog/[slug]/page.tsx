import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import { ArticleSchema, BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { SeoConversionPanel } from "@/components/seo/seo-conversion-panel";
import { getImaveoArticle, imaveoArticles } from "@/config/imaveo";
import { site } from "@/config/site";
import { locales } from "@/i18n/routing";
import { buildAbsoluteUrl, buildLocaleAlternates } from "@/utils/seo/metadata";
import { buildStudioHrefFromPath } from "@/utils/studio";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    imaveoArticles.map((article) => ({
      locale,
      slug: article.slug,
    }))
  );
}

export async function generateMetadata(props: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const article = getImaveoArticle(slug);
  if (!article) return {};

  const localeKey = locale as "en" | "zh";
  const seo = article.seo[localeKey];
  const pathname = `/${locale}${article.href}`;
  const ogImage = new URL(site.ogImagePath, site.siteUrl).toString();

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: buildLocaleAlternates(pathname),
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: "article",
      siteName: site.siteName,
      url: buildAbsoluteUrl(pathname),
      images: [{ url: ogImage, width: 512, height: 512, alt: site.siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}

export default async function BlogArticlePage(props: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await props.params;
  const article = getImaveoArticle(slug);
  if (!article) notFound();

  const localeKey = locale as "en" | "zh";
  const isZh = locale === "zh";
  const relatedArticles = imaveoArticles.filter((entry) => entry.slug !== article.slug).slice(0, 2);

  return (
    <section className="py-16 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-5xl space-y-10">
          <BreadcrumbSchema
            items={[
              { name: isZh ? "首页" : "Home", url: `/${locale}` },
              { name: isZh ? "博客" : "Blog", url: `/${locale}/blog` },
              { name: article.title[localeKey], url: `/${locale}${article.href}` },
            ]}
          />
          <ArticleSchema
            headline={article.title[localeKey]}
            description={article.excerpt[localeKey]}
            url={`/${locale}${article.href}`}
            locale={locale}
            publishedAt={article.publishedAt}
            updatedAt={article.updatedAt}
          />
          <Breadcrumbs
            items={[
              { name: isZh ? "首页" : "Home", href: `/${locale}` },
              { name: isZh ? "博客" : "Blog", href: `/${locale}/blog` },
              { name: article.title[localeKey], href: `/${locale}${article.href}` },
            ]}
          />

          <article className="rounded-[36px] border border-white/10 bg-white/[0.03] p-8 md:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <div className="section-label">{article.category}</div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/48">
                <Clock3 className="h-3.5 w-3.5" />
                {article.readTime}
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/48">
                <CalendarDays className="h-3.5 w-3.5" />
                {article.publishedAt}
              </div>
            </div>
            <h1 className="mt-4 text-4xl font-medium tracking-[-0.05em] text-white md:text-5xl">{article.title[localeKey]}</h1>
            <p className="mt-5 max-w-4xl text-base leading-8 text-zinc-300">{article.excerpt[localeKey]}</p>

            <div className="mt-10 space-y-10">
              {article.sections.map((section) => (
                <section key={section.heading.en} className="space-y-4">
                  <h2 className="text-2xl font-medium tracking-[-0.03em] text-white">{section.heading[localeKey]}</h2>
                  <div className="space-y-4 text-sm leading-8 text-zinc-300">
                    {section.paragraphs[localeKey].map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </article>

          <section className="rounded-[32px] border border-white/10 bg-black/30 p-7">
            <div className="section-label">{isZh ? "Key Takeaways" : "Key Takeaways"}</div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {article.takeaways[localeKey].map((item) => (
                <div key={item} className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5 text-sm leading-7 text-zinc-300">
                  {item}
                </div>
              ))}
            </div>
          </section>

          <SeoConversionPanel
            eyebrow={isZh ? "Next Step" : "Next Step"}
            title={isZh ? "把阅读兴趣转成一次真实操作" : "Turn reading intent into a real next action"}
            description={article.cta.description[localeKey]}
            primaryHref={buildStudioHrefFromPath(locale, article.cta.href, "blog-cta")}
            primaryLabel={article.cta.label[localeKey]}
            secondaryHref={`/${locale}/pricing`}
            secondaryLabel={isZh ? "查看套餐与 Credits" : "Compare plans and credits"}
            highlights={[
              isZh ? "先读懂模型和流程，再进入产品路径" : "Move from understanding the workflow into the product path",
              isZh ? "把内容页和转化页连成连续体验" : "Connects editorial content with conversion pages",
              isZh ? "让博客成为真正有商业价值的流量入口" : "Turns the blog into a commercially useful acquisition layer",
            ]}
          />

          {relatedArticles.length ? (
            <section className="rounded-[32px] border border-white/10 bg-white/[0.03] p-7">
              <div className="section-label">{isZh ? "Continue Reading" : "Continue Reading"}</div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {relatedArticles.map((entry) => (
                  <Link
                    key={entry.slug}
                    href={`/${locale}${entry.href}`}
                    className="rounded-[24px] border border-white/10 bg-black/25 p-5 transition-colors hover:border-primary/35 hover:bg-white/[0.04]"
                  >
                    <div className="text-[11px] uppercase tracking-[0.22em] text-primary">{entry.category}</div>
                    <div className="mt-3 text-xl font-medium text-white">{entry.title[localeKey]}</div>
                    <div className="mt-2 text-sm leading-7 text-zinc-300">{entry.excerpt[localeKey]}</div>
                    <div className="mt-4 inline-flex items-center gap-2 text-sm text-primary">
                      {isZh ? "继续阅读" : "Read next"} <ArrowRight className="h-4 w-4" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </section>
  );
}
