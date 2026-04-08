"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { site } from "@/config/site";

export function Logo() {
  const pathname = usePathname();
  const currentLocale = pathname?.split('/')[1] || 'en';
  const localePrefix = `/${currentLocale}`;

  return (
    <Link
      href={localePrefix}
      className="flex items-center gap-3 hover:opacity-90 transition-opacity"
    >
      <Image
        src="/favicon.svg"
        alt={`${site.siteName} Logo`}
        width={34}
        height={34}
        className="rounded-xl border border-white/10 bg-white/5 p-1.5"
      />
      <div className="flex flex-col leading-none">
        <span className="text-lg font-semibold tracking-[-0.04em] text-white">{site.siteName}</span>
        <span className="text-[10px] uppercase tracking-[0.28em] text-white/45">Image + Veo</span>
      </div>
    </Link>
  );
}
