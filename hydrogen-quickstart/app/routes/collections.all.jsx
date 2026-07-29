/**
 * @file collections.all.jsx
 * @description All-products catalog from Shopify Storefront API (Hydrogen channel).
 * Falls back to the local mock catalog only when no published products are returned.
 */

import {useLoaderData} from 'react-router';
import {getPaginationVariables} from '@shopify/hydrogen';
import {TaxonomyCollectionView} from '~/components/collection/TaxonomyCollectionView';
import {PawraCollectionGrid} from '~/components/PawraCollectionGrid';
import {Breadcrumbs} from '~/components/Breadcrumbs';
import {MOCK_PRODUCTS} from '~/data/products';
import {ALL_PRODUCTS_QUERY} from '~/lib/allProducts';
import {buildSeoMeta, breadcrumbJsonLd} from '~/lib/seo';

export const meta = () => {
  return buildSeoMeta({
    title: 'All Products',
    description: 'Shop the full PAWRA catalog for dogs, cats, pharmacy, and small pets.',
    url: '/collections/all',
    jsonLd: breadcrumbJsonLd([
      {label: 'Home', to: '/'},
      {label: 'Shop', to: '/collections'},
      {label: 'All Products', to: '/collections/all'},
    ]),
  });
};

export async function loader({context, request}) {
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {pageBy: 24});

  let productsConnection = null;
  try {
    const {products} = await storefront.query(ALL_PRODUCTS_QUERY, {
      variables: {
        ...paginationVariables,
      },
      cache: storefront.CacheShort(),
    });
    productsConnection = products;
  } catch {
    productsConnection = null;
  }

  const shopifyNodes = productsConnection?.nodes ?? [];
  const useShopify = shopifyNodes.length > 0;

  return {
    title: 'All Products',
    description: useShopify
      ? 'Browse every product published to the PAWRA Hydrogen storefront.'
      : 'Browse the full PAWRA mock catalog across every category.',
    breadcrumbs: [
      {label: 'Home', to: '/'},
      {label: 'Shop', to: '/collections'},
      {label: 'All Products'},
    ],
    children: [],
    products: useShopify ? shopifyNodes : MOCK_PRODUCTS,
    curatedProducts: [],
    isLeaf: true,
    useShopify,
    productsConnection: useShopify ? productsConnection : null,
  };
}

export default function AllProductsPage() {
  const data = useLoaderData();

  if (data.useShopify && data.productsConnection) {
    return (
      <div className="bg-page-bg">
        <section className="border-b border-border-subtle bg-page-bg px-4 py-12 md:px-10 md:py-16">
          <div className="mx-auto max-w-1440">
            <Breadcrumbs className="mb-4" items={data.breadcrumbs} />
            <h1 className="font-serif text-display-m text-action-primary md:text-display-l">
              {data.title}
            </h1>
            {data.description ? (
              <p className="mt-4 max-w-2xl font-sans text-body-l text-text-secondary">
                {data.description}
              </p>
            ) : null}
          </div>
        </section>
        <div className="mx-auto max-w-1440 px-4 py-10 md:px-10 md:py-12">
          <PawraCollectionGrid
            connection={data.productsConnection}
            products={data.products}
            emptyMessage="No products are published to this Hydrogen storefront yet."
          />
        </div>
      </div>
    );
  }

  return (
    <TaxonomyCollectionView
      title={data.title}
      description={data.description}
      breadcrumbs={data.breadcrumbs}
      childCategories={data.children}
      products={data.products}
      curatedProducts={data.curatedProducts}
      isLeaf
    />
  );
}
