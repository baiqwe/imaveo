"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { signOutAction } from "@/app/actions";
import { usePathname } from "next/navigation";
import { Link, stripLocalePrefix } from "@/i18n/routing";

interface MobileNavProps {
  items: { label: string; href: string }[];
  user: any;
  loading?: boolean;
  isDashboard: boolean;
  currentLocale?: string;
}

export function MobileNav({ items, user, loading = false, isDashboard, currentLocale = 'en' }: MobileNavProps) {
  const pathname = usePathname();
  const pathWithoutLocale = stripLocalePrefix(pathname);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/5 hover:text-white">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col border-zinc-800 bg-[#050505] text-white">
        <SheetHeader>
          <SheetTitle className="text-white">{currentLocale === 'zh' ? '导航' : 'Navigation'}</SheetTitle>
        </SheetHeader>

        <div className="mt-4 flex items-center gap-2 border-b border-zinc-800 pb-4">
          <span className="text-sm text-zinc-500">
            {currentLocale === 'zh' ? '语言:' : 'Language:'}
          </span>
          <Link
            href={pathWithoutLocale}
            locale="en"
            className={`rounded-full px-3 py-1.5 text-sm transition-colors ${currentLocale === 'en'
              ? 'bg-primary text-primary-foreground'
              : 'bg-white/5 text-zinc-300 hover:text-white'
              }`}
          >
            EN
          </Link>
          <Link
            href={pathWithoutLocale}
            locale="zh"
            className={`rounded-full px-3 py-1.5 text-sm transition-colors ${currentLocale === 'zh'
              ? 'bg-primary text-primary-foreground'
              : 'bg-white/5 text-zinc-300 hover:text-white'
              }`}
          >
            中文
          </Link>
        </div>

        <nav className="mt-4 flex flex-col gap-4">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-lg font-semibold text-zinc-300 transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto border-t border-zinc-800 pt-4">
          {loading ? (
            <div className="flex flex-col gap-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : user ? (
            <div className="flex flex-col gap-2">
              <Button asChild variant="default" className="w-full">
                <Link href="/dashboard">
                  {currentLocale === 'zh' ? '控制台' : 'Dashboard'}
                </Link>
              </Button>
              <form action={signOutAction} className="w-full">
                <Button type="submit" variant="outline" className="w-full border-white/15 bg-white/5 text-white hover:bg-white/10">
                  {currentLocale === 'zh' ? '退出登录' : 'Sign out'}
                </Button>
              </form>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Button asChild variant="outline" className="w-full border-white/15 bg-white/5 text-white hover:bg-white/10">
                <Link href="/sign-in">
                  {currentLocale === 'zh' ? '登录' : 'Sign in'}
                </Link>
              </Button>
              <Button asChild variant="default" className="w-full">
                <Link href="/sign-up">
                  {currentLocale === 'zh' ? '注册' : 'Sign up'}
                </Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
