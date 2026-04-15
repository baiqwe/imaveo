import { site } from "@/config/site";

// 面包屑结构化数据组件 - 帮助 Google 展示层级结构
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const toAbsoluteUrl = (url: string) => {
    try {
      return new URL(url, site.siteUrl).toString();
    } catch {
      return site.siteUrl;
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": {
        "@id": toAbsoluteUrl(item.url),
        "name": item.name
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

function toAbsoluteUrl(url: string) {
  try {
    return new URL(url, site.siteUrl).toString();
  } catch {
    return site.siteUrl;
  }
}

// FAQ 结构化数据组件 - 帮助 Google 展示常见问题
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  items: FAQItem[];
}

export function FAQSchema({ items }: FAQSchemaProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

// HowTo 结构化数据 - 帮助 Google 展示教程步骤
interface HowToStep {
  name: string;
  text: string;
}

interface HowToSchemaProps {
  name: string;
  description: string;
  steps: HowToStep[];
}

export function HowToSchema({ name, description, steps }: HowToSchemaProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface ArticleSchemaProps {
  headline: string;
  description: string;
  url: string;
  locale: string;
  publishedAt?: string;
  updatedAt?: string;
}

export function ArticleSchema({ headline, description, url, locale, publishedAt, updatedAt }: ArticleSchemaProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": headline,
    "description": description,
    "inLanguage": locale,
    "mainEntityOfPage": new URL(url, site.siteUrl).toString(),
    "author": {
      "@type": "Organization",
      "name": site.siteName,
    },
    "publisher": {
      "@type": "Organization",
      "name": site.siteName,
      "logo": {
        "@type": "ImageObject",
        "url": new URL(site.ogImagePath, site.siteUrl).toString(),
      },
    },
    "image": [new URL(site.ogImagePath, site.siteUrl).toString()],
    ...(publishedAt ? { "datePublished": publishedAt } : {}),
    ...(updatedAt ? { "dateModified": updatedAt } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface CollectionItem {
  name: string;
  url: string;
}

interface CollectionPageSchemaProps {
  name: string;
  description: string;
  url: string;
  locale: string;
  items: CollectionItem[];
}

export function CollectionPageSchema({ name, description, url, locale, items }: CollectionPageSchemaProps) {
  const absoluteUrl = toAbsoluteUrl(url);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": name,
    "description": description,
    "url": absoluteUrl,
    "inLanguage": locale,
    "isPartOf": {
      "@type": "WebSite",
      "name": site.siteName,
      "url": site.siteUrl,
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "url": toAbsoluteUrl(item.url),
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface WebPageSchemaProps {
  name: string;
  description: string;
  url: string;
  locale: string;
}

export function WebPageSchema({ name, description, url, locale }: WebPageSchemaProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": name,
    "description": description,
    "url": toAbsoluteUrl(url),
    "inLanguage": locale,
    "isPartOf": {
      "@type": "WebSite",
      "name": site.siteName,
      "url": site.siteUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface SoftwareApplicationSchemaProps {
  name: string;
  description: string;
  url: string;
  locale: string;
  featureList?: string[];
}

export function SoftwareApplicationSchema({
  name,
  description,
  url,
  locale,
  featureList = [],
}: SoftwareApplicationSchemaProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "description": description,
    "url": toAbsoluteUrl(url),
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web",
    "inLanguage": locale,
    ...(featureList.length > 0 ? { "featureList": featureList } : {}),
    "publisher": {
      "@type": "Organization",
      "name": site.siteName,
      "url": site.siteUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
