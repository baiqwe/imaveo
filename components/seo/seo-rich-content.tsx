import Link from "next/link";
import { FAQSchema, HowToSchema } from "@/components/breadcrumb-schema";

export type SeoFaqItem = {
  question: string;
  answer: string;
};

export type SeoLinkItem = {
  label: string;
  href: string;
  description?: string;
};

type SeoRichContentProps = {
  locale: "en" | "zh";
  keyword: string;
  introTitle: string;
  introBody: string[];
  stepsTitle: string;
  steps: string[];
  useCasesTitle: string;
  useCases: string[];
  faqTitle: string;
  faqs: SeoFaqItem[];
  relatedTitle: string;
  relatedLinks: SeoLinkItem[];
};

export function SeoRichContent({
  locale,
  keyword,
  introTitle,
  introBody,
  stepsTitle,
  steps,
  useCasesTitle,
  useCases,
  faqTitle,
  faqs,
  relatedTitle,
  relatedLinks,
}: SeoRichContentProps) {
  const isZh = locale === "zh";
  const overviewParagraphs = introBody.length > 0 ? introBody : [keyword];

  if (process.env.NODE_ENV !== "production" && introBody.length === 0) {
    console.warn(`[SeoRichContent] introBody is empty for keyword "${keyword}"`);
  }

  const howToSteps = steps.map((step) => ({ name: step, text: step }));
  const overviewLabel = isZh ? "概览" : "Overview";
  const howToLabel = isZh ? "使用步骤" : "How To";
  const useCasesLabel = isZh ? "适用场景" : "Use Cases";
  const internalLinksLabel = isZh ? "相关页面" : "Internal Links";

  return (
    <div className="space-y-10">
      <FAQSchema items={faqs} />
      <HowToSchema name={keyword} description={overviewParagraphs[0]} steps={howToSteps} />

      <section className="rounded-[32px] border border-white/10 bg-white/[0.03] p-7">
        <div className="section-label">{overviewLabel}</div>
        <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em] text-white">{introTitle}</h2>
        <div className="mt-4 space-y-4 text-sm leading-7 text-white/58">
          {overviewParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="rounded-[32px] border border-white/10 bg-white/[0.03] p-7">
        <div className="section-label">{howToLabel}</div>
        <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em] text-white">{stepsTitle}</h2>
        <ol className="mt-5 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step} className="rounded-[24px] border border-white/10 bg-black/25 p-5">
              <div className="text-[11px] uppercase tracking-[0.22em] text-primary">{isZh ? `第 ${index + 1} 步` : `Step ${index + 1}`}</div>
              <div className="mt-3 text-sm leading-7 text-white/68">{step}</div>
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-[32px] border border-white/10 bg-white/[0.03] p-7">
        <div className="section-label">{useCasesLabel}</div>
        <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em] text-white">{useCasesTitle}</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {useCases.map((useCase) => (
            <div key={useCase} className="rounded-[22px] border border-white/10 bg-black/25 p-5 text-sm leading-7 text-white/62">
              {useCase}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[32px] border border-white/10 bg-white/[0.03] p-7">
        <div className="section-label">FAQ</div>
        <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em] text-white">{faqTitle}</h2>
        <div className="mt-5 grid gap-4">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-[24px] border border-white/10 bg-black/25 p-5">
              <div className="text-lg font-medium text-white">{faq.question}</div>
              <div className="mt-3 text-sm leading-7 text-white/58">{faq.answer}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[32px] border border-white/10 bg-white/[0.03] p-7">
        <div className="section-label">{internalLinksLabel}</div>
        <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em] text-white">{relatedTitle}</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {relatedLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-[24px] border border-white/10 bg-black/25 p-5 transition-colors hover:border-primary/35 hover:bg-white/[0.04]"
            >
              <div className="text-base font-medium text-white">{link.label}</div>
              {link.description ? <div className="mt-2 text-sm leading-6 text-white/48">{link.description}</div> : null}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
