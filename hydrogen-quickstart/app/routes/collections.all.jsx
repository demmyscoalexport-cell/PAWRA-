/**
 * @file collections.all.jsx
 * @description All-products leaf view from mock catalog.
 */

import {useLoaderData} from 'react-router';
import {TaxonomyCollectionView} from '~/components/collection/TaxonomyCollectionView';
import {MOCK_PRODUCTS} from '~/data/products';
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

export async function loader() {
  return {
    title: 'All Products',
    description: 'Browse the full PAWRA mock catalog across every category.',
    breadcrumbs: [
      {label: 'Home', to: '/'},
      {label: 'Shop', to: '/collections'},
      {label: 'All Products'},
    ],
    children: [],
    products: MOCK_PRODUCTS,
    curatedProducts: [],
    isLeaf: true,
  };
}

export default function AllProductsPage() {
  const data = useLoaderData();
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
