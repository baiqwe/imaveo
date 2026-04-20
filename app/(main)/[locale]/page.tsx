import HomeClientWrapper from '@/components/home/HomeClientWrapper';
import HomeStaticContent from '@/components/home/HomeStaticContent';
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { site } from "@/config/site";
import { buildLocaleAlternates, getHubMetadata } from "@/utils/seo/metadata";

// ✅ This is now a Server Component (no 'use client')
// Hero/Interactive content is client-side, static content is server-rendered for SEO
export const dynamic = "force-static";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const params = await props.params;
    const { locale } = params;
    const localeKey = locale as "en" | "zh";
    const metadata = getHubMetadata(localeKey);
    const canonical = `/${locale}`;
    const ogImage = new URL(site.ogImagePath, site.siteUrl).toString();

    return {
        title: metadata.title,
        description: metadata.description,
        keywords: metadata.keywords,
        alternates: buildLocaleAlternates(canonical),
        openGraph: {
            title: metadata.title,
            description: metadata.description,
            url: new URL(canonical, site.siteUrl).toString(),
            images: [{ url: ogImage, width: 512, height: 512, alt: site.siteName }],
        },
        twitter: {
            card: "summary_large_image",
            title: metadata.title,
            description: metadata.description,
            images: [ogImage],
        },
    };
}

export default async function HomePage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const { locale } = params;
    setRequestLocale(locale);

    // Server-rendered static content for better LCP and SEO
    const staticContent = await HomeStaticContent({ locale });

    return (
        <HomeClientWrapper staticContent={staticContent} />
    );
}
