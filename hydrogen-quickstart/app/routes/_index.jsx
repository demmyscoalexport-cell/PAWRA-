/**
 * @file _index.jsx
 * @description PAWRA homepage — minimal Wild One–inspired composition.
 */

import {Link, useLoaderData} from 'react-router';
import {
  HeroSection,
  StarterOffer,
  ShopByPet,
  TrustBar,
  GuaranteeBand,
  FAQ,
} from '~/components/sections';
import {ShoppableGallery} from '~/components/ugc/ShoppableGallery';
import {AsSeenIn} from '~/components/ugc/AsSeenIn';
import {ProductCarousel} from '~/components/ProductCarousel';
import {BRAND} from '~/lib/branding';
import {ARTICLES} from '~/data/articles';
import {HOMEPAGE_COLLECTION_QUERY, HOMEPAGE_PRODUCTS_QUERY} from '~/lib/homepageProducts';
import {getIntegrations} from '~/lib/integrations';
import {fetchJudgeMeFeaturedReviews} from '~/lib/judgeme';
import {
  buildSeoMeta,
  DEFAULT_DESCRIPTION,
  faqJsonLd,
  HOME_FAQS,
} from '~/lib/seo';

export const meta = () => {
  return buildSeoMeta({
    title: `${BRAND.name}`,
    titleTemplate: '%s',
    description: DEFAULT_DESCRIPTION,
    url: '/',
    jsonLd: faqJsonLd(HOME_FAQS),
  });
};

export async function loader({context}) {
  const {storefront, env} = context;
  const integrations = getIntegrations(env);

  const [{products}, {collection}, featuredReviews] = await Promise.all([
    storefront.query(HOMEPAGE_PRODUCTS_QUERY, {
      variables: {first: 24},
      cache: storefront.CacheShort(),
    }),
    storefront.query(HOMEPAGE_COLLECTION_QUERY, {
      variables: {handle: 'frontpage', first: 24},
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
    greetingProducts: pool.slice(0, 8),
    featuredReviews,
    articles: ARTICLES.slice(0, 3),
  };
}

export default function Homepage() {
  const {greetingProducts, articles} = useLoaderData();

  return (
    <div className="home">
      <HeroSection />
      <StarterOffer />
      <ProductCarousel
        products={greetingProducts}
        title="Bestsellers"
        subtitle=""
      />
      <ShopByPet />
      <TrustBar />
      <GuaranteeBand />

      <section className="bg-page-bg px-4 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-1440">
          <div className="mb-10 flex items-end justify-between gap-4">
            <h2 className="font-serif text-heading-l text-action-primary">The PAWRA Journal</h2>
            <Link
              to="/blog"
              className="font-sans text-body-s text-text-secondary no-underline hover:text-text-primary"
            >
              View all
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {articles.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group no-underline"
              >
                <img
                  src={post.image}
                  alt=""
                  loading="lazy"
                  className="aspect-[16/10] w-full rounded-md object-cover"
                />
                <p className="mt-4 font-sans text-body-xs uppercase tracking-wide text-text-secondary">
                  {post.category}
                </p>
                <h3 className="mt-2 font-sans text-heading-s text-text-primary group-hover:underline">
                  {post.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ShoppableGallery />
      <AsSeenIn />
      <div id="faq">
        <FAQ />
      </div>
    </div>
  );
}

/** @typedef {import('./+types/_index').Route} Route */
