/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET SHOP               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetshop.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file _index.jsx
 * @description PAWRA homepage with Chewy-inspired discovery flow.
 */

import {useLoaderData} from 'react-router';
import {
  HeroSection,
  TrustBar,
  SpeciesEntry,
  NewPetEssentials,
  HeroProductSpotlight,
  BestSellers,
  SubscribeBanner,
  CompleteYourSetup,
  WhyPawra,
  Ecosystem,
  FrequentlyBoughtTogether,
  Testimonials,
  FAQ,
} from '~/components/sections';
import {BRAND} from '~/lib/branding';

export const meta = () => {
  return [
    {title: `PAWRA — ${BRAND.tagline} | ${BRAND.domain}`},
    {
      name: 'description',
      content:
        'Premium pet food, beds, toys, grooming supplies, collars, and wellness products for cats and dogs — delivered to your door.',
    },
  ];
};

export async function loader({context}) {
  const {storefront} = context;

  try {
    const {products} = await storefront.query(HOMEPAGE_PRODUCTS_QUERY, {
      variables: {first: 12},
    });
    const nodes = products?.nodes ?? [];
    return {
      featuredProducts: nodes.slice(0, 4),
      bestSellers: nodes.slice(0, 4),
      newPetProducts: nodes.slice(4, 8),
    };
  } catch {
    return {featuredProducts: [], bestSellers: [], newPetProducts: []};
  }
}

export default function Homepage() {
  const {bestSellers, newPetProducts} = useLoaderData();

  return (
    <div className="home">
      <HeroSection />
      <TrustBar />
      <SpeciesEntry />
      <NewPetEssentials products={newPetProducts} />
      <HeroProductSpotlight />
      <BestSellers products={bestSellers} />
      <SubscribeBanner />
      <CompleteYourSetup />
      <WhyPawra />
      <Ecosystem />
      <FrequentlyBoughtTogether />
      <Testimonials />
      <div id="faq">
        <FAQ />
      </div>
    </div>
  );
}

const PRODUCT_CARD_FRAGMENT = `#graphql
  fragment HomepageProduct on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
  }
`;

const HOMEPAGE_PRODUCTS_QUERY = `#graphql
  ${PRODUCT_CARD_FRAGMENT}
  query HomepageProducts($first: Int!, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    products(first: $first, sortKey: BEST_SELLING) {
      nodes {
        ...HomepageProduct
      }
    }
  }
`;

/** @typedef {import('./+types/_index').Route} Route */
