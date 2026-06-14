import {redirect, useLoaderData, useSearchParams} from 'react-router';
import {getPaginationVariables, Analytics} from '@shopify/hydrogen';
import {useMemo} from 'react';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import {PAWRA_COLLECTION_FALLBACK} from '~/lib/pawraCollections';
import {PawraProductCard} from '~/components/PawraProductCard';

export const meta = ({data}) => {
  return [{title: `PAWRA | ${data?.collection.title ?? 'Collection'}`}];
};

export async function loader({context, params, request}) {
  const {handle} = params;
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {pageBy: 24});

  if (!handle) {
    throw redirect('/collections');
  }

  const [{collection}, {products: allProducts}] = await Promise.all([
    storefront.query(COLLECTION_QUERY, {
      variables: {handle, ...paginationVariables},
    }),
    storefront.query(FALLBACK_PRODUCTS_QUERY, {
      variables: getPaginationVariables(request, {pageBy: 24}),
    }),
  ]);

  if (collection) {
    redirectIfHandleIsLocalized(request, {handle, data: collection});
    return {collection, isFallback: false};
  }

  const fallback = PAWRA_COLLECTION_FALLBACK[handle];
  if (fallback && allProducts) {
    return {
      collection: {
        id: `fallback-${handle}`,
        handle,
        title: fallback.title,
        description: fallback.description,
        products: allProducts,
      },
      isFallback: true,
    };
  }

  throw new Response(`Collection ${handle} not found`, {status: 404});
}

const SORT_OPTIONS = [
  {value: 'featured', label: 'Featured'},
  {value: 'price-asc', label: 'Price: low to high'},
  {value: 'price-desc', label: 'Price: high to low'},
  {value: 'newest', label: 'Newest'},
];

export default function CollectionPage() {
  const {collection} = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || 'featured';

  const sortedNodes = useMemo(() => {
    const nodes = [...(collection.products?.nodes ?? [])];
    if (sort === 'price-asc') {
      nodes.sort(
        (a, b) =>
          Number(a.priceRange.minVariantPrice.amount) -
          Number(b.priceRange.minVariantPrice.amount),
      );
    } else if (sort === 'price-desc') {
      nodes.sort(
        (a, b) =>
          Number(b.priceRange.minVariantPrice.amount) -
          Number(a.priceRange.minVariantPrice.amount),
      );
    } else if (sort === 'newest') {
      nodes.reverse();
    }
    return nodes;
  }, [collection.products?.nodes, sort]);

  return (
    <div className="bg-warm-oat">
      <section className="border-b border-forest-green/10 bg-cloud px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-serif text-[3.5rem] leading-[1.1] text-forest-green">
            {collection.title}
          </h1>
          {collection.description && (
            <p className="mt-4 max-w-2xl font-sans text-body-l text-ink/80">
              {collection.description}
            </p>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-mono-s text-ink/60">
            {sortedNodes.length} products
          </p>
          <label className="flex items-center gap-2 font-sans text-body-s">
            <span className="text-ink/60">Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSearchParams({sort: e.target.value})}
              className="rounded-md border border-forest-green/20 bg-cloud px-3 py-2 font-sans text-body-s text-ink"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {sortedNodes.map((product, index) => (
            <PawraProductCard
              key={product.id}
              product={product}
              loading={index < 8 ? 'eager' : undefined}
            />
          ))}
        </div>

        {!sortedNodes.length && (
          <p className="py-16 text-center font-sans text-body-m text-ink/60">
            No products in this collection yet.
          </p>
        )}

        {collection.products?.pageInfo?.hasNextPage && (
          <p className="mt-8 text-center font-sans text-body-s text-ink/60">
            <a href="?cursor=next" className="text-forest-green underline">
              Load more products
            </a>
          </p>
        )}
      </div>

      <Analytics.CollectionView
        data={{
          collection: {id: collection.id, handle: collection.handle},
        }}
      />
    </div>
  );
}

const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
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
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
  }
`;

const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
`;

const FALLBACK_PRODUCTS_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query FallbackProducts(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes {
        ...ProductItem
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        endCursor
        startCursor
      }
    }
  }
`;

/** @typedef {import('./+types/collections.$handle').Route} Route */
