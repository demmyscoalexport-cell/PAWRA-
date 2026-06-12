import {Await, useLoaderData, Link} from 'react-router';
import {Suspense} from 'react';
import {Image} from '@shopify/hydrogen';
import {ProductItem} from '~/components/ProductItem';
import {MockShopNotice} from '~/components/MockShopNotice';
import {Button} from '~/components/ui/Button';
import {Badge} from '~/components/ui/Badge';
import {PulseRing} from '~/components/ui/PulseRing';
import {Icon} from '~/components/ui/Icon';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [
    {title: 'PAWRA — Premium Pet Lifestyle | shoppawra.com'},
    {
      name: 'description',
      content:
        'Every moment. Every pet. Every life. Premium pet lifestyle for urban dog and cat owners in New York.',
    },
  ];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * @param {Route.LoaderArgs}
 */
async function loadCriticalData({context}) {
  const [{collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
  ]);

  return {
    isShopLinked: Boolean(context.env.PUBLIC_STORE_DOMAIN),
    featuredCollection: collections.nodes[0],
  };
}

/**
 * @param {Route.LoaderArgs}
 */
function loadDeferredData({context}) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();
  return (
    <div className="home">
      <HeroSection />
      {data.isShopLinked ? null : <MockShopNotice />}
      <FeaturedCollection collection={data.featuredCollection} />
      <WalkerProgramTeaser />
      <RecommendedProducts products={data.recommendedProducts} />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="pawra-hero relative overflow-hidden bg-forest-green px-6 py-16 text-cloud md:py-24">
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="mb-6 flex items-center justify-center gap-3">
          <PulseRing size="md" />
          <span className="font-mono text-mono-s uppercase tracking-widest text-electric-jade">
            Live GPS Walker Program
          </span>
        </div>
        <h1 className="font-serif text-display-m text-cloud md:text-display-l">
          Every moment. Every pet. Every life.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl font-sans text-body-l text-cloud/80">
          Premium pet lifestyle for urban dog and cat owners in New York. Curated
          essentials, vetted walkers, and care plans built for city living.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button variant="accent" size="lg" href="/collections/all">
            Shop Now
          </Button>
          <Button
            variant="secondary"
            size="lg"
            href="/pages/walker-program"
            className="!border-cloud !text-cloud hover:!bg-cloud/10"
          >
            Walker Program
          </Button>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Badge type="walker-approved" />
          <Badge type="care-plan" />
          <Badge type="new" />
        </div>
      </div>
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-electric-jade/10 blur-3xl" />
    </section>
  );
}

function WalkerProgramTeaser() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-col items-start gap-6 rounded-xl border border-forest-green/10 bg-cloud p-8 shadow-card md:flex-row md:items-center">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-forest-green text-electric-jade">
          <Icon name="walker" size="lg" color="text-electric-jade" />
        </div>
        <div className="flex-1">
          <h2 className="font-serif text-heading-m text-forest-green">PAWRA Walker Program</h2>
          <p className="mt-2 font-sans text-body-m text-ink/70">
            Vetted NYC dog walkers with real-time GPS tracking. Trusted by urban pet parents
            across Manhattan and Brooklyn.
          </p>
        </div>
        <Link
          to="/design-system"
          className="font-sans text-body-s font-medium text-forest-green no-underline hover:text-electric-jade"
        >
          View Design System →
        </Link>
      </div>
    </section>
  );
}

/**
 * @param {{
 *   collection: FeaturedCollectionFragment;
 * }}
 */
function FeaturedCollection({collection}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <section className="mx-auto max-w-6xl px-6 py-8">
      <h2 className="mb-6 font-serif text-heading-l text-forest-green">Featured Collection</h2>
      <Link
        className="featured-collection block overflow-hidden rounded-xl shadow-card no-underline"
        to={`/collections/${collection.handle}`}
      >
        {image && (
          <div className="featured-collection-image">
            <Image
              data={image}
              sizes="100vw"
              alt={image.altText || collection.title}
            />
          </div>
        )}
        <div className="bg-cloud px-6 py-4">
          <h3 className="font-serif text-heading-m text-forest-green">{collection.title}</h3>
        </div>
      </Link>
    </section>
  );
}

/**
 * @param {{
 *   products: Promise<RecommendedProductsQuery | null>;
 * }}
 */
function RecommendedProducts({products}) {
  return (
    <section
      className="recommended-products mx-auto max-w-6xl px-6 pb-16"
      aria-labelledby="recommended-products"
    >
      <h2 id="recommended-products" className="mb-6 font-serif text-heading-l text-forest-green">
        Recommended for Your Pet
      </h2>
      <Suspense fallback={<div className="font-sans text-body-m text-ink/60">Loading products...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="recommended-products-grid">
              {response
                ? response.products.nodes.map((product) => (
                    <ProductItem key={product.id} product={product} />
                  ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
    </section>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;

/** @typedef {import('./+types/_index').Route} Route */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
