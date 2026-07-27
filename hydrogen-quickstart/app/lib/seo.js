/**
 * PAWRA SEO helpers — meta via Hydrogen getSeoMeta + Schema.org JSON-LD.
 */

import {getSeoMeta} from '@shopify/hydrogen';
import {BRAND, SOCIAL_LINKS} from '~/lib/branding';

export const DEFAULT_DESCRIPTION =
  'PAWRA PET CARES — Premium Pets Products Store. Starter kits, thoughtful gear, and a 30-day Pet Guarantee so your first order feels safe.';

/**
 * @param {string} path
 * @returns {string}
 */
export function absoluteUrl(path = '/') {
  if (!path) return BRAND.url;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${BRAND.url}${normalized}`;
}

/**
 * @param {string} title
 * @returns {string}
 */
export function pageTitle(title) {
  if (!title) return BRAND.name;
  if (title.includes(BRAND.name) || title.includes(BRAND.shortName)) return title;
  return `${title} | ${BRAND.name}`;
}

/**
 * Build route meta descriptors from a SeoConfig-like object.
 * @param {Parameters<typeof getSeoMeta>[0]} config
 */
export function buildSeoMeta(config) {
  return getSeoMeta({
    titleTemplate: `%s | ${BRAND.name}`,
    ...config,
    title: config?.title || BRAND.name,
    description: config?.description || DEFAULT_DESCRIPTION,
    url: config?.url ? absoluteUrl(config.url) : undefined,
  });
}

/** Sitewide Organization schema */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND.name,
    legalName: 'Pawra LLC',
    url: BRAND.url,
    email: BRAND.supportEmail,
    description: BRAND.tagline,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BRAND.address.line1,
      addressLocality: BRAND.address.city,
      addressRegion: BRAND.address.state,
      postalCode: BRAND.address.zip,
      addressCountry: 'US',
    },
    sameAs: SOCIAL_LINKS.map((link) => link.href),
  };
}

/** WebSite + SearchAction for sitelinks search box */
export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BRAND.name,
    url: BRAND.url,
    description: DEFAULT_DESCRIPTION,
    publisher: {
      '@type': 'Organization',
      name: BRAND.name,
      url: BRAND.url,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BRAND.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * @param {Array<{ label: string; to?: string }>} items
 */
export function breadcrumbJsonLd(items = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.to ? {item: absoluteUrl(item.to)} : {}),
    })),
  };
}

/**
 * @param {Array<{ q: string; a: string }>} faqs
 */
export function faqJsonLd(faqs = []) {
  if (!faqs.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}

/**
 * @param {{
 *   product: any;
 *   selectedVariant?: any;
 *   reviews?: { rating?: number; count?: number } | null;
 * }} args
 */
export function productJsonLd({product, selectedVariant, reviews}) {
  if (!product) return null;

  const variant = selectedVariant || product.selectedOrFirstAvailableVariant || {};
  const image =
    variant.image?.url ||
    product.featuredImage?.url ||
    product.images?.nodes?.[0]?.url ||
    undefined;
  const price = variant.price?.amount;
  const currency = variant.price?.currencyCode || 'USD';
  const availability = variant.availableForSale
    ? 'https://schema.org/InStock'
    : 'https://schema.org/OutOfStock';

  /** @type {Record<string, unknown>} */
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.seo?.description || product.description || DEFAULT_DESCRIPTION,
    image: image ? [image] : undefined,
    sku: variant.sku || undefined,
    brand: {
      '@type': 'Brand',
      name: product.vendor || BRAND.name,
    },
    url: absoluteUrl(`/products/${product.handle}`),
    offers: {
      '@type': 'Offer',
      url: absoluteUrl(`/products/${product.handle}`),
      priceCurrency: currency,
      price: price || undefined,
      availability,
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: BRAND.name,
      },
    },
  };

  if (reviews?.count && reviews?.rating) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: String(reviews.rating),
      reviewCount: String(reviews.count),
    };
  }

  return schema;
}

/**
 * Homepage FAQ copy — keep in sync with `components/sections/FAQ.jsx`.
 */
export const HOME_FAQS = [
  {
    q: 'What products does PAWRA sell?',
    a: 'We curate pet food, beds, toys, grooming, walk gear, and wellness for cats and dogs — plus starter kits for new pet parents.',
  },
  {
    q: 'What is the 30-day Pet Guarantee?',
    a: 'If your pet won’t eat it, wear it, or use it, start a return within 30 days of delivery. Unused items in original packaging are eligible — so first orders feel safe.',
  },
  {
    q: 'Do you ship across the US?',
    a: 'Yes. We ship to all 50 states. Free shipping on orders over $75. Most orders arrive within 3–5 business days.',
  },
  {
    q: 'How do starter kits work?',
    a: 'Take the 60-second Care Quiz or shop a New Dog / New Cat starter kit. Kits bundle curated essentials at a savings vs buying separately.',
  },
  {
    q: 'What is your return policy?',
    a: `We offer 30-day returns on unused products in original packaging. Start a return at /returns, use live chat, or email ${BRAND.supportEmail}.`,
  },
  {
    q: 'How do I track my order?',
    a: 'After your order ships, you will receive a tracking link by email. You can also view order status in your account, or ask in live chat.',
  },
  {
    q: 'How can I contact support?',
    a: `Use the chat bubble for the fastest answer, or email ${BRAND.supportEmail}. We typically reply to email within one business day.`,
  },
];
