/**
 * @file collections.$handle.jsx
 * @description Collection PLP with filters, sort, and cursor pagination.
 */

import {redirect, useLoaderData, useSearchParams} from 'react-router';
import {getPaginationVariables, Analytics} from '@shopify/hydrogen';
import {useMemo} from 'react';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import {PAWRA_COLLECTION_FALLBACK, filterProductsByKeywords} from '~/lib/pawraCollections';
import {CollectionFilters, applyCollectionFilters} from '~/components/CollectionFilters';
import {PawraCollectionGrid} from '~/components/PawraCollectionGrid';

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
      variables: paginationVariables,
    }),
  ]);

  if (collection) {
    redirectIfHandleIsLocalized(request, {handle, data: collection});
    return {collection, isFallback: false};
  }

  const fallback = PAWRA_COLLECTION_FALLBACK[handle];
  if (fallback && allProducts) {
    const nodes = fallback.fallbackKeywords
      ? filterProductsByKeywords(allProducts.nodes ?? [], fallback.fallbackKeywords)
      : (allProducts.nodes ?? []);

    return {
      collection: {
        id: `fallback-${handle}`,
        handle,
        title: fallback.title,
        description: fallback.description,
        products: {
          ...allProducts,
          nodes,
        },
      },
      isFallback: true,
    };
  }

  throw new Response(`Collection ${handle} not found`, {status: 404});
}

export default function CollectionPage() {
  const {collection} = useLoaderData();
  const [searchParams] = useSearchParams();

  const filteredProducts = useMemo(
    () => applyCollectionFilters(collection.products?.nodes ?? [], searchParams),
    [collection.products?.nodes, searchParams],
  );

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
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <p className="font-mono text-mono-s text-ink/60">
            {filteredProducts.length} products
          </p>
          <CollectionFilters />
        </div>

        <PawraCollectionGrid
          connection={collection.products}
          products={filteredProducts}
          emptyMessage="No products in this collection yet."
        />
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
    tags
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
