/**
 * @file _index.jsx
 * @description PAWRA homepage — greet with products, then brand sections.
 */

import {useLoaderData} from 'react-router';
import {
  HeroSection,
  ShopByPet,
  TrustBar,
  HeroProductSpotlight,
  WhyPawra,
  Ecosystem,
  FrequentlyBoughtTogether,
  WalkerProgramSection,
  Testimonials,
  FAQ,
} from '~/components/sections';
import {ProductCarousel} from '~/components/ProductCarousel';
import {JudgemeCarousel} from '@judgeme/shopify-hydrogen';
import {BRAND} from '~/lib/branding';
import {HOMEPAGE_COLLECTION_QUERY, HOMEPAGE_PRODUCTS_QUERY} from '~/lib/homepageProducts';
import {getIntegrations} from '~/lib/integrations';
import {fetchJudgeMeFeaturedReviews} from '~/lib/judgeme';

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
  const {storefront, env} = context;
  const integrations = getIntegrations(env);

  const [{products}, {collection}, featuredReviews] = await Promise.all([
    storefront.query(HOMEPAGE_PRODUCTS_QUERY, {
      variables: {first: 16},
      cache: storefront.CacheShort(),
    }),
    storefront.query(HOMEPAGE_COLLECTION_QUERY, {
      variables: {handle: 'frontpage', first: 12},
      cache: storefront.CacheShort(),
    }),
    integrations.judgeMe.apiEnabled
      ? fetchJudgeMeFeaturedReviews(integrations.judgeMe)
      : Promise.resolve([]),
  ]);

  const catalog = products?.nodes ?? [];
  const featured = collection?.products?.nodes ?? [];
  const pool = featured.length > 0 ? featured : catalog;

  return {
    featuredProduct: pool[0] ?? null,
    greetingProducts: pool.slice(0, 12),
    bundleProducts: pickBundleProducts(pool.length > 0 ? pool : catalog),
    featuredReviews,
    judgeMeWidgets: integrations.judgeMe.widgetsEnabled,
  };
}

function pickBundleProducts(products) {
  if (products.length <= 3) return products;
  return [products[0], products[Math.floor(products.length / 2)], products[products.length - 1]];
}

export default function Homepage() {
  const {featuredProduct, greetingProducts, bundleProducts, featuredReviews, judgeMeWidgets} =
    useLoaderData();

  return (
    <div className="home">
      <HeroSection />
      <ProductCarousel
        products={greetingProducts}
        title="Welcome — shop bestsellers"
        subtitle="Products pets love right now. Use Next to browse more, or open any card to buy."
      />
      <ShopByPet />
      <TrustBar />
      <HeroProductSpotlight product={featuredProduct} />
      <WhyPawra />
      <Ecosystem />
      <FrequentlyBoughtTogether products={bundleProducts} />
      <WalkerProgramSection />
      {judgeMeWidgets ? (
        <section className="bg-cloud px-4 py-16 md:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-center font-serif text-display-s text-forest-green">
              Loved by pet parents
            </h2>
            <JudgemeCarousel />
          </div>
        </section>
      ) : (
        <Testimonials reviews={featuredReviews} />
      )}
      <div id="faq">
        <FAQ />
      </div>
    </div>
  );
}

/** @typedef {import('./+types/_index').Route} Route */
