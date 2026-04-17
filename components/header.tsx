"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { signOutAction } from "@/app/actions";
import { Button } from "./ui/button";
import { Logo } from "./logo";
import { usePathname } from "next/navigation";
import { MobileNav } from "./mobile-nav";
import { useTranslations } from "next-intl";
import { useUser } from "@/hooks/use-user";
import { getLocaleFromPathname, Link, stripLocalePrefix } from "@/i18n/routing";
import { Skeleton } from "./ui/skeleton";
import { imaveoModels, imaveoTools } from "@/config/imaveo";
import { ChevronDown, Home, ImageIcon, PlaySquare } from "lucide-react";
import { buildStudioHref, buildStudioHrefFromPath, buildStudioPath, buildStudioPathFromPath } from "@/utils/studio";

interface NavItem {
  label: string;
  href: string;
}

export default function Header() {
  const pathname = usePathname();
  const t = useTranslations("nav");
  const isDashboard = /^\/(?:en|zh)?\/?dashboard(?:\/|$)/.test(pathname || "");
  const { user, loading } = useUser();
  const currentLocale = getLocaleFromPathname(pathname);
  const localeKey = currentLocale as "en" | "zh";
  const pathWithoutLocale = stripLocalePrefix(pathname);

  const mainNavItems: NavItem[] = [
    { label: t("home"), href: "/" },
    { label: t("create"), href: "/create" },
    { label: t("pricing"), href: "/pricing" },
    { label: t("blog"), href: "/blog" },
    { label: t("creations"), href: "/my-creations" },
  ];

  const videoTools = imaveoTools.filter((tool) => tool.category === "video");
  const imageTools = imaveoTools.filter((tool) => tool.category === "image");
  const videoModels = imaveoModels.filter((model) => model.category === "video");
  const imageModels = imaveoModels.filter((model) => model.category === "image");

  return (
    <header className="sticky top-0 z-[100] w-full border-b border-zinc-800/90 bg-[#050608]/88 backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-8">
          <Logo />

          {!isDashboard ? (
            <nav className="hidden items-center gap-6 lg:flex">
              <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-200 transition-colors hover:text-white">
                <Home className="h-4 w-4" />
                {t("home")}
              </Link>
              <MegaMenu
                locale={currentLocale}
                icon={<PlaySquare className="h-4 w-4" />}
                label={t("ai_video")}
                tools={videoTools.map((tool) => ({
                  label: tool.labels[localeKey],
                  desc: tool.descriptions[localeKey],
                  href: buildStudioPathFromPath(tool.href, "header-menu"),
                }))}
                models={videoModels.map((model) => ({
                  label: model.labels[localeKey],
                  href: buildStudioPathFromPath(model.href, "header-menu"),
                  badge: model.badge,
                }))}
              />
              <MegaMenu
                locale={currentLocale}
                icon={<ImageIcon className="h-4 w-4" />}
                label={t("ai_image")}
                tools={imageTools.map((tool) => ({
                  label: tool.labels[localeKey],
                  desc: tool.descriptions[localeKey],
                  href: buildStudioPathFromPath(tool.href, "header-menu"),
                }))}
                models={imageModels.map((model) => ({
                  label: model.labels[localeKey],
                  href: buildStudioPathFromPath(model.href, "header-menu"),
                  badge: model.badge,
                }))}
              />
              {mainNavItems.slice(1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-zinc-300 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          <div className="mr-2 hidden items-center gap-1 rounded-full border border-zinc-800 bg-zinc-950/90 p-1 md:flex">
            <Link
              href={pathWithoutLocale}
              locale="en"
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                currentLocale === "en"
                  ? "bg-primary text-primary-foreground"
                  : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
              }`}
            >
              EN
            </Link>
            <Link
              href={pathWithoutLocale}
              locale="zh"
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                currentLocale === "zh"
                  ? "bg-primary text-primary-foreground"
                  : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
              }`}
            >
              中文
            </Link>
          </div>

          {loading ? (
            <div className="hidden md:flex gap-2">
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-24" />
            </div>
          ) : user ? (
            <div className="hidden md:flex items-center gap-2">
              <Button asChild size="sm" variant="ghost" className="text-zinc-200 hover:bg-zinc-900 hover:text-white">
                <Link href="/dashboard">{t("dashboard")}</Link>
              </Button>
              <form action={signOutAction}>
                <Button type="submit" variant="outline" size="sm" className="border-zinc-700 bg-zinc-950 text-zinc-100 hover:bg-zinc-900">
                  {t("sign_out")}
                </Button>
              </form>
            </div>
          ) : (
            <div className="hidden md:flex gap-2">
              <Button asChild size="sm" variant="outline" className="border-zinc-700 bg-zinc-950 text-zinc-100 hover:bg-zinc-900">
                <Link href="/sign-in">{t("sign_in")}</Link>
              </Button>
              <Button asChild size="sm" className="rounded-2xl px-5 shadow-[0_0_32px_rgba(245,197,24,0.18)]">
                <Link href="/sign-up">{t("sign_up")}</Link>
              </Button>
            </div>
          )}

          <MobileNav
            items={[
              { label: t("home"), href: "/" },
              { label: t("create"), href: buildStudioPath({ source: "mobile-nav" }) },
              { label: t("ai_video"), href: buildStudioPath({ mode: "text-to-video", model: "veo-3", source: "mobile-nav" }) },
              { label: t("ai_image"), href: buildStudioPath({ mode: "text-to-image", model: "nano-banana-pro", source: "mobile-nav" }) },
              { label: t("pricing"), href: "/pricing" },
              { label: t("blog"), href: "/blog" },
              { label: t("creations"), href: "/my-creations" },
            ]}
            user={user}
            loading={loading}
            isDashboard={isDashboard}
            currentLocale={currentLocale}
          />
        </div>
      </div>
    </header>
  );
}

function MegaMenu({
  locale,
  icon,
  label,
  tools,
  models,
}: {
  locale: string;
  icon: React.ReactNode;
  label: string;
  tools: { label: string; desc: string; href: string }[];
  models: { label: string; href: string; badge?: string }[];
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 88, left: 24 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const updatePosition = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const panelWidth = panelRef.current?.offsetWidth ?? 520;
      const left = Math.min(
        Math.max(16, rect.left),
        window.innerWidth - panelWidth - 16
      );
      setPosition({ top: rect.bottom + 16, left });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);

  const openMenu = () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    setOpen(true);
  };

  const closeMenu = () => {
    closeTimerRef.current = window.setTimeout(() => setOpen(false), 80);
  };

  return (
    <div ref={containerRef} className="relative" onMouseEnter={openMenu} onMouseLeave={closeMenu}>
      <button className="inline-flex items-center gap-2 text-sm text-zinc-200 transition-colors hover:text-white">
        {icon}
        {label}
        <ChevronDown className={`h-4 w-4 text-zinc-500 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {mounted && open
        ? createPortal(
            <div
              ref={panelRef}
              className="fixed z-[180] w-[520px] rounded-[24px] border border-zinc-700 bg-[linear-gradient(180deg,rgba(17,18,21,0.98),rgba(10,10,12,0.98))] p-5 shadow-[0_32px_80px_rgba(0,0,0,0.58)] backdrop-blur-xl"
              style={{ top: position.top, left: position.left }}
              onMouseEnter={openMenu}
              onMouseLeave={closeMenu}
            >
              <div className="grid grid-cols-[1.1fr_0.9fr] gap-6">
                <div className="border-r border-zinc-800 pr-6">
                  <div className="mb-4 text-xs uppercase tracking-[0.22em] text-zinc-400">Studio Tools</div>
                  <div className="space-y-4">
                    {tools.map((tool) => (
                      <Link key={tool.href} href={tool.href} className="block">
                        <div className="text-[1.05rem] font-medium text-white transition-colors hover:text-primary">
                          {tool.label}
                        </div>
                        <div className="mt-1 text-sm leading-6 text-zinc-400">{tool.desc}</div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-4 text-xs uppercase tracking-[0.22em] text-zinc-400">Models</div>
                  <div className="space-y-2">
                    {models.map((model) => (
                      <Link key={model.href} href={model.href} className="flex items-center justify-between rounded-2xl border border-transparent px-3 py-2 text-zinc-200 transition-colors hover:border-primary/25 hover:bg-zinc-900/80 hover:text-white">
                        <span>{model.label}</span>
                        {model.badge ? (
                          <span className="rounded-full bg-primary/12 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-primary">
                            {model.badge}
                          </span>
                        ) : null}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-5 rounded-[18px] border border-primary/20 bg-[linear-gradient(180deg,rgba(245,197,24,0.14),rgba(245,197,24,0.06))] p-4">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-primary">{locale === "zh" ? "统一入口" : "Unified Entry"}</div>
                    <div className="mt-2 text-sm leading-6 text-zinc-200">
                      {locale === "zh" ? "模型和工具现在都直接跳到创作中心，避免路径分散。" : "Models and tools now land in Studio directly, keeping the creation path focused."}
                    </div>
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  );
}
