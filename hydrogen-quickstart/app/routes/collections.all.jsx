/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET SHOP               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetshop.com              ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file collections.all.jsx
 * @description All products catalog with species filters and sorting.
 */

import {useLoaderData, useSearchParams} from 'react-router';
import {getPaginationVariables, Analytics} from '@shopify/hydrogen';
import {useMemo} from 'react';
import {CollectionPageShell} from '~/components/CollectionPageShell';
import {
  applyCollectionFilters,
  getCollectionFacets,
  sortCollectionProducts,
} from '~/lib/collectionPage';
import {getCollectionBreadcrumbs} from '~/lib/pawraCollections';

export const meta = () => {
  return [{title: 'PAWRA | All Products'}];
};

export async function loader({context, request}) {
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {pageBy: 48});

  const {products} = await storefront.query(CATALOG_QUERY, {
    variables: {...paginationVariables},
  });

  return {
    collection: {
      id: 'all-products',
      handle: 'all',
      title: 'All Products',
      description: 'Every premium PAWRA product for cats and dogs — curated and delivered to your door.',
      products,
    },
  };
}

export default function AllProductsPage() {
  const {collection} = useLoaderData();
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

  return (
    <>
      <CollectionPageShell
        title={collection.title}
        description={collection.description}
        breadcrumbs={getCollectionBreadcrumbs('all')}
        products={filteredProducts}
        facets={facets}
        showSpeciesFilter
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
  fragment MoneyCollectionItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment CollectionItem on Product {
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
        ...MoneyCollectionItem
      }
      maxVariantPrice {
        ...MoneyCollectionItem
      }
    }
  }
`;

const CATALOG_QUERY = `#graphql
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
        ...CollectionItem
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
  ${PRODUCT_ITEM_FRAGMENT}
`;

/** @typedef {import('./+types/collections.all').Route} Route */
