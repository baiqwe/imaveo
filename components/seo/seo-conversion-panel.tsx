import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

type SeoConversionPanelProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  highlights: string[];
};

export function SeoConversionPanel({
  eyebrow,
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  highlights,
}: SeoConversionPanelProps) {
  return (
    <section className="rounded-[32px] border border-primary/20 bg-[linear-gradient(135deg,rgba(245,197,24,0.12),rgba(255,255,255,0.03)_45%,rgba(0,0,0,0.35))] p-7 shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <div className="section-label">{eyebrow}</div>
          <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em] text-white">{title}</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/65">{description}</p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={primaryHref}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-black transition-transform hover:translate-y-[-1px]"
            >
              {primaryLabel} <ArrowRight className="h-4 w-4" />
            </Link>
            {secondaryHref && secondaryLabel ? (
              <Link
                href={secondaryHref}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-6 py-3 text-sm text-white/74 transition-colors hover:border-primary/35 hover:text-white"
              >
                {secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-black/30 p-5">
          <div className="text-[11px] uppercase tracking-[0.2em] text-white/35">Why This Converts</div>
          <div className="mt-4 space-y-3">
            {highlights.map((highlight) => (
              <div key={highlight} className="flex items-start gap-3 text-sm leading-6 text-white/68">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-primary" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
