/**
 * @file collections.$handle.jsx
 * @description Single-segment collection route — taxonomy mock catalog first.
 */

import {redirect, useLoaderData} from 'react-router';
import {TaxonomyCollectionView} from '~/components/collection/TaxonomyCollectionView';
import {loadTaxonomyCollection} from '~/lib/taxonomyCollection';
import {buildSeoMeta, breadcrumbJsonLd, DEFAULT_DESCRIPTION} from '~/lib/seo';

export const meta = ({data}) => {
  const title = data?.title || 'Collection';
  const description = data?.description || DEFAULT_DESCRIPTION;
  const path = data?.pathHandles?.length
    ? `/collections/${data.pathHandles.join('/')}`
    : '/collections';

  return buildSeoMeta({
    title,
    description,
    url: path,
    jsonLd: breadcrumbJsonLd(
      (data?.breadcrumbs || []).map((item) => ({
        label: item.label,
        to: item.to,
      })),
    ),
  });
};

export async function loader({params}) {
  const {handle} = params;
  if (!handle) throw redirect('/collections');

  // Prefer canonical deep path when a leaf is requested by handle alone
  const payload = loadTaxonomyCollection([handle]);
  if (!payload) {
    throw new Response(`Collection ${handle} not found`, {status: 404});
  }

  // If taxonomy resolved to a deeper path than the URL, redirect to canonical
  if (payload.pathHandles?.length > 1 && payload.pathHandles[payload.pathHandles.length - 1] === handle) {
    // Leaf looked up by handle — keep short URL working without redirect for UX
  }

  return payload;
}

export default function CollectionHandlePage() {
  const data = useLoaderData();

  return (
    <TaxonomyCollectionView
      title={data.title}
      description={data.description}
      breadcrumbs={data.breadcrumbs}
      childCategories={data.children}
      products={data.products}
      curatedProducts={data.curatedProducts}
      isLeaf={data.isLeaf}
    />
  );
}
