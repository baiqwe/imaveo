"use client";

import { Logo } from "./logo";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { imaveoArticles, imaveoModels, imaveoTools } from "@/config/imaveo";

export function Footer() {
  const pathname = usePathname();
  const t = useTranslations("footer");
  const isDashboard = /^\/(?:en|zh)?\/?dashboard(?:\/|$)/.test(pathname || "");

  const pathParts = pathname?.split("/") || [];
  const currentLocale = pathParts[1] === "en" || pathParts[1] === "zh" ? pathParts[1] : "en";
  const localePrefix = `/${currentLocale}`;
  const isZh = currentLocale === "zh";

  const toolLinks = imaveoTools.slice(0, 4).map((tool) => ({
    label: tool.labels[currentLocale as "en" | "zh"],
    href: `${localePrefix}${tool.href}`,
  }));

  const modelLinks = imaveoModels.slice(0, 4).map((model) => ({
    label: model.labels[currentLocale as "en" | "zh"],
    href: `${localePrefix}${model.href}`,
  }));

  const legalLinks = [
    { label: t("link_privacy"), href: `${localePrefix}/privacy` },
    { label: t("link_terms"), href: `${localePrefix}/terms` },
    { label: t("link_blog"), href: `${localePrefix}/blog` },
  ];

  if (isDashboard) {
    return (
      <footer className="border-t border-zinc-800 py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-zinc-400 md:text-left">
              Built by <span className="font-medium text-zinc-100">Bai</span>
            </p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-zinc-800 bg-[#070707]/92">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-full lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-300">{t("tagline")}</p>
            <p className="mt-2 text-xs text-zinc-400">
              {isZh
                ? "Imaveo 聚合 AI 视频、图片和 Animeify 专属入口，统一管理生成资产与额度。"
                : "Imaveo brings AI video, AI image, and Animeify into one premium creation hub."}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-300">
              {isZh ? "创作入口" : "Tools"}
            </h3>
            <nav className="flex flex-col gap-2">
              {toolLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-zinc-400 transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-300">
              {isZh ? "热门模型" : "Models"}
            </h3>
            <nav className="flex flex-col gap-2">
              {modelLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-zinc-400 transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-300">{t("legal")}</h3>
            <nav className="flex flex-col gap-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-zinc-400 transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-10 rounded-[28px] border border-zinc-800 bg-zinc-950/70 p-5">
          <div className="section-label mb-3">{isZh ? "内容引擎" : "Editorial Engine"}</div>
          <div className="grid gap-3 md:grid-cols-3">
            {imaveoArticles.map((article) => (
              <Link
                key={article.slug}
                href={article.href}
                className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 transition-colors hover:border-primary/40 hover:bg-zinc-900"
              >
                <div className="text-[11px] uppercase tracking-[0.2em] text-primary/90">{article.category}</div>
                <div className="mt-2 text-sm font-medium text-white">
                  {article.title[currentLocale as "en" | "zh"]}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-8 md:flex-row">
          <p className="text-center text-sm text-zinc-400 md:text-left">
            © {new Date().getFullYear()} {t("brand")}. {t("rights")}
          </p>
          <p className="text-center text-sm text-zinc-400 md:text-right">{t("built_by")}</p>
        </div>
      </div>
    </footer>
  );
}
