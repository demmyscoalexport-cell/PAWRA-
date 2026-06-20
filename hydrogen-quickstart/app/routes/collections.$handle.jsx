/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET SHOP               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetshop.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file collections.$handle.jsx
 * @description Collection page with Chewy-style filters, breadcrumbs, and fallbacks.
 */

import {redirect, useLoaderData, useSearchParams} from 'react-router';
import {getPaginationVariables, Analytics} from '@shopify/hydrogen';
import {useMemo} from 'react';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import {
  PAWRA_COLLECTION_FALLBACK,
  filterProductsByRule,
  getCollectionBreadcrumbs,
} from '~/lib/pawraCollections';
import {
  applyCollectionFilters,
  getCollectionFacets,
  sortCollectionProducts,
} from '~/lib/collectionPage';
import {CollectionPageShell} from '~/components/CollectionPageShell';

export const meta = ({data}) => {
  return [{title: `PAWRA | ${data?.collection.title ?? 'Collection'}`}];
};

export async function loader({context, params, request}) {
  const {handle} = params;
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {pageBy: 48});

  if (!handle) {
    throw redirect('/collections');
  }

  const [{collection}, {products: allProducts}] = await Promise.all([
    storefront.query(COLLECTION_QUERY, {
      variables: {handle, ...paginationVariables},
    }),
    storefront.query(FALLBACK_PRODUCTS_QUERY, {
      variables: getPaginationVariables(request, {pageBy: 48}),
    }),
  ]);

  if (collection) {
    redirectIfHandleIsLocalized(request, {handle, data: collection});
    return {collection, isFallback: false, handle};
  }

  const fallback = PAWRA_COLLECTION_FALLBACK[handle];
  if (fallback && allProducts) {
    const filteredNodes = filterProductsByRule(allProducts.nodes ?? [], fallback);
    return {
      collection: {
        id: `fallback-${handle}`,
        handle,
        title: fallback.title,
        description: fallback.description,
        products: {
          nodes: filteredNodes.length ? filteredNodes : allProducts.nodes,
          pageInfo: allProducts.pageInfo,
        },
      },
      isFallback: true,
      handle,
    };
  }

  throw new Response(`Collection ${handle} not found`, {status: 404});
}

export default function CollectionPage() {
  const {collection, handle} = useLoaderData();
  const [searchParams] = useSearchParams();

  const filterParams = {
    sort: searchParams.get('sort') || 'featured',
    price: searchParams.get('price') || '',
    type: searchParams.get('type') || '',
    tag: searchParams.get('tag') || '',
    species: searchParams.get('species') || '',
  };

  const allNodes = useMemo(
    () => collection.products?.nodes ?? [],
    [collection.products?.nodes],
  );

  const filteredProducts = useMemo(() => {
    let nodes = applyCollectionFilters(allNodes, filterParams);

    if (filterParams.species) {
      const species = filterParams.species.toLowerCase();
      nodes = nodes.filter((p) =>
        (p.tags ?? []).some((t) => t.toLowerCase() === species),
      );
    }

    return sortCollectionProducts(nodes, filterParams.sort);
  }, [allNodes, filterParams]);

  const facets = useMemo(() => getCollectionFacets(allNodes), [allNodes]);
  const breadcrumbs = getCollectionBreadcrumbs(handle);

  return (
    <>
      <CollectionPageShell
        title={collection.title}
        description={collection.description}
        breadcrumbs={breadcrumbs}
        products={filteredProducts}
        facets={facets}
        showSpeciesFilter={handle === 'all'}
      />
      <Analytics.CollectionView
        data={{
          collection: {id: collection.id, handle: collection.handle},
        }}
      />
    </>
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
    productType
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
