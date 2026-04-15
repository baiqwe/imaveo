import { PricingSection } from "@/components/marketing/pricing-section";
import { setRequestLocale } from 'next-intl/server';
import { Metadata } from "next";
import { site } from "@/config/site";
import { buildLocaleAlternates } from "@/utils/seo/metadata";

export async function generateMetadata(props: Props): Promise<Metadata> {
    const { locale } = await props.params;
    const isZh = locale === "zh";

    return {
        title: isZh ? "定价方案 | Imaveo" : "Pricing Plans | Imaveo",
        description: isZh
            ? "查看 Imaveo 的订阅方案和 Credits 包，适合 AI 视频与 AI 图片创作需求。"
            : "Explore Imaveo subscription plans and credits packs for AI video and AI image workflows.",
        alternates: buildLocaleAlternates(`/${locale}/pricing`),
        openGraph: {
            title: isZh ? "定价方案 | Imaveo" : "Pricing Plans | Imaveo",
            description: isZh
                ? "按月订阅或按次购买 Credits，适配不同频率的 AI 创作需求。"
                : "Choose between subscriptions and credits packs for different AI creation cadences.",
            url: new URL(`/${locale}/pricing`, site.siteUrl).toString(),
        },
    };
}

type Props = {
    params: Promise<{ locale: string }>;
}

export default async function PricingPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <div className="bg-background min-h-screen pt-20">
            <PricingSection locale={locale} />
        </div>
    );
}
