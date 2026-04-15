import { site } from '@/config/site';

export async function SoftwareApplicationSchema({ locale }: { locale: string }) {
    const isZh = locale === "zh";

    const schema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": site.siteName,
        "description": isZh
            ? "Imaveo 是聚合 AI 视频与 AI 图片工作流的创作平台。"
            : "Imaveo is a creation platform that unifies AI video and AI image workflows.",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Web Browser",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "featureList": [
            "AI video generation hub",
            "AI image generation hub",
            "Text-to-image and image-to-image modes",
            "Text-to-video and image-to-video modes",
            "Credits packs and subscriptions",
            "Localized English and Chinese pages"
        ],
        "screenshot": new URL(site.ogImagePath, site.siteUrl).toString(),
        "url": site.siteUrl,
        "offersCatalog": {
            "@type": "OfferCatalog",
            "name": isZh ? "Imaveo 套餐" : "Imaveo Plans",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "name": "Free",
                    "price": "0",
                    "priceCurrency": "USD"
                },
                {
                    "@type": "Offer",
                    "name": "Credits Pack",
                    "priceCurrency": "USD"
                },
                {
                    "@type": "Offer",
                    "name": "Pro Subscription",
                    "priceCurrency": "USD"
                }
            ]
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
