/**
 * Reusable JSON-LD structured data component.
 * Usage: <JsonLd data={{ "@type": "BreadcrumbList", ... }} />
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const SITE_URL = "https://hoopervault.com";

interface BreadcrumbItem {
  name: string;
  href: string;
}

/**
 * Generate BreadcrumbList JSON-LD schema.
 * @param items - Array of { name, href } from root to current page
 */
export function buildBreadcrumbList(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}

/**
 * Generate WebSite JSON-LD (for homepage only).
 */
export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "HooperVault",
    url: SITE_URL,
    description:
      "A basketball build simulator where you draft legendary skills, create your dream Hooper, and simulate a shareable legacy.",
    inLanguage: ["en", "zh-CN"],
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/en/hooper?slug={{search_term_string}}`,
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generate FAQPage JSON-LD schema.
 */
export function buildFAQSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate HowTo JSON-LD schema.
 */
export function buildHowToSchema(
  name: string,
  description: string,
  steps: { name: string; text: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

/**
 * Generate ItemList JSON-LD schema for list/hub pages.
 */
export function buildItemListSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * Generate Article JSON-LD schema for detail/content pages.
 */
export function buildArticleSchema({
  title,
  description,
  url,
  image,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${SITE_URL}${url}`,
    image: image || `${SITE_URL}/images/og-default.jpg`,
    author: { "@type": "Organization", name: "HooperVault" },
    publisher: {
      "@type": "Organization",
      name: "HooperVault",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo-40.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${url}` },
  };
}
