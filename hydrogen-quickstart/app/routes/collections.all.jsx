/**
 * @file collections.all.jsx
 * @description All-products catalog with PAWRA collection page styling.
 */

import {useLoaderData, useSearchParams} from 'react-router';
import {getPaginationVariables, Analytics} from '@shopify/hydrogen';
import {useMemo} from 'react';
import {CollectionFilters, applyCollectionFilters} from '~/components/CollectionFilters';
import {PawraCollectionGrid} from '~/components/PawraCollectionGrid';

export const meta = () => [{title: 'PAWRA | All Products'}];

export async function loader({context, request}) {
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {pageBy: 24});

  const {products} = await storefront.query(CATALOG_QUERY, {
    variables: paginationVariables,
  });

  return {products};
}

export default function AllProductsPage() {
  const {products} = useLoaderData();
  const [searchParams] = useSearchParams();

  const filteredProducts = useMemo(
    () => applyCollectionFilters(products?.nodes ?? [], searchParams),
    [products?.nodes, searchParams],
  );

  return (
    <div className="bg-warm-oat">
      <section className="border-b border-forest-green/10 bg-cloud px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-serif text-[3.5rem] leading-[1.1] text-forest-green">
            All Products
          </h1>
          <p className="mt-4 max-w-2xl font-sans text-body-l text-ink/80">
            Browse the full PAWRA catalog — food, beds, toys, grooming, and wellness for cats and dogs.
          </p>
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
          connection={products}
          products={filteredProducts}
          emptyMessage="No products published to your Headless storefront yet."
        />
      </div>

      <Analytics.CollectionView
        data={{
          collection: {id: 'all-products', handle: 'all'},
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

const CATALOG_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Catalog(
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

/** @typedef {import('./+types/collections.all').Route} Route */
