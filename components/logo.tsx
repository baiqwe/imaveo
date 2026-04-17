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
        className="rounded-xl border border-zinc-800 bg-zinc-950 p-1.5"
      />
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold tracking-[-0.04em] text-white">{site.siteName}</span>
          <span className="rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-primary">
            Beta
          </span>
        </div>
        <span className="text-[10px] uppercase tracking-[0.28em] text-zinc-400">Image + Video</span>
      </div>
    </Link>
  );
}
