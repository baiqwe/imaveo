"use client";

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
    { label: t("pricing"), href: "/pricing" },
    { label: t("blog"), href: "/blog" },
    { label: t("creations"), href: "/my-creations" },
  ];

  const videoTools = imaveoTools.filter((tool) => tool.category === "video");
  const imageTools = imaveoTools.filter((tool) => tool.category === "image");
  const videoModels = imaveoModels.filter((model) => model.category === "video");
  const imageModels = imaveoModels.filter((model) => model.category === "image");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#06080d]/78 backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-8">
          <Logo />

          {!isDashboard ? (
            <nav className="hidden items-center gap-6 lg:flex">
              <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/78 transition-colors hover:text-white">
                <Home className="h-4 w-4" />
                {t("home")}
              </Link>
              <MegaMenu
                icon={<PlaySquare className="h-4 w-4" />}
                label={t("ai_video")}
                tools={videoTools.map((tool) => ({
                  label: tool.labels[localeKey],
                  desc: tool.descriptions[localeKey],
                  href: tool.href,
                }))}
                models={videoModels.map((model) => ({
                  label: model.labels[localeKey],
                  href: model.href,
                  badge: model.badge,
                }))}
              />
              <MegaMenu
                icon={<ImageIcon className="h-4 w-4" />}
                label={t("ai_image")}
                tools={imageTools.map((tool) => ({
                  label: tool.labels[localeKey],
                  desc: tool.descriptions[localeKey],
                  href: tool.href,
                }))}
                models={imageModels.map((model) => ({
                  label: model.labels[localeKey],
                  href: model.href,
                  badge: model.badge,
                }))}
              />
              {mainNavItems.slice(1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-white/72 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 mr-2">
            <Link
              href={pathWithoutLocale}
              locale="en"
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                currentLocale === "en"
                  ? "bg-primary text-primary-foreground"
                  : "text-white/60 hover:text-white hover:bg-white/5"
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
                  : "text-white/60 hover:text-white hover:bg-white/5"
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
              <Button asChild size="sm" variant="ghost" className="text-white/80 hover:bg-white/5 hover:text-white">
                <Link href="/dashboard">{t("dashboard")}</Link>
              </Button>
              <form action={signOutAction}>
                <Button type="submit" variant="outline" size="sm" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
                  {t("sign_out")}
                </Button>
              </form>
            </div>
          ) : (
            <div className="hidden md:flex gap-2">
              <Button asChild size="sm" variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
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
              { label: t("ai_video"), href: "/ai-video/veo-3" },
              { label: t("ai_image"), href: "/ai-image/animeify" },
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
  icon,
  label,
  tools,
  models,
}: {
  icon: React.ReactNode;
  label: string;
  tools: { label: string; desc: string; href: string }[];
  models: { label: string; href: string; badge?: string }[];
}) {
  return (
    <div className="group relative">
      <button className="inline-flex items-center gap-2 text-sm text-white/78 transition-colors hover:text-white">
        {icon}
        {label}
        <ChevronDown className="h-4 w-4 text-white/40 transition-transform group-hover:rotate-180" />
      </button>

      <div className="pointer-events-none absolute left-0 top-full pt-4 opacity-0 transition-all duration-150 group-hover:pointer-events-auto group-hover:opacity-100">
        <div className="w-[520px] rounded-[24px] border border-[#3b2910] bg-[#0b0b10]/96 p-5 shadow-[0_25px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <div className="grid grid-cols-[1.1fr_0.9fr] gap-6">
            <div className="border-r border-white/8 pr-6">
              <div className="mb-4 text-xs uppercase tracking-[0.22em] text-white/35">Tools</div>
              <div className="space-y-4">
                {tools.map((tool) => (
                  <Link key={tool.href} href={tool.href} className="block">
                    <div className="text-[1.05rem] font-medium text-white transition-colors hover:text-primary">
                      {tool.label}
                    </div>
                    <div className="mt-1 text-sm leading-6 text-white/36">{tool.desc}</div>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-4 text-xs uppercase tracking-[0.22em] text-white/35">Models</div>
              <div className="space-y-2">
                {models.map((model) => (
                  <Link key={model.href} href={model.href} className="flex items-center justify-between rounded-2xl px-3 py-2 text-white/72 transition-colors hover:bg-white/[0.03] hover:text-white">
                    <span>{model.label}</span>
                    {model.badge ? (
                      <span className="rounded-full bg-primary/12 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-primary">
                        {model.badge}
                      </span>
                    ) : null}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
