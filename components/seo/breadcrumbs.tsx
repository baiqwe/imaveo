import Link from "next/link";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

export type BreadcrumbItem = {
  name: string;
  href: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <>
      <BreadcrumbSchema items={items.map((item) => ({ name: item.name, url: item.href }))} />
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="inline-flex min-h-11 flex-wrap items-center gap-2 rounded-full border border-zinc-800/80 bg-[linear-gradient(180deg,rgba(16,16,18,0.9),rgba(10,10,12,0.82))] px-4 py-2.5 text-sm text-zinc-400 shadow-[0_18px_48px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-2">
                {isLast ? (
                  <span aria-current="page" className="font-medium tracking-[-0.01em] text-white">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.href} className="transition-colors hover:text-white">
                    {item.name}
                  </Link>
                )}
                {!isLast ? <span className="text-zinc-600">/</span> : null}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
