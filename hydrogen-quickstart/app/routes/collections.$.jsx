/**
 * @file collections.$.jsx
 * @description Deep taxonomy paths: /collections/dogs/dog-food/dry-dog-food/...
 */

import {useLoaderData} from 'react-router';
import {TaxonomyCollectionView} from '~/components/collection/TaxonomyCollectionView';
import {loadTaxonomyCollection, parseCollectionHandles} from '~/lib/taxonomyCollection';
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
  const splat = params['*'] || '';
  const handles = parseCollectionHandles(splat);
  const payload = loadTaxonomyCollection(handles);

  if (!payload) {
    throw new Response(`Collection not found: ${splat}`, {status: 404});
  }

  return payload;
}

export default function DeepCollectionPage() {
  const data = useLoaderData();

  return (
    <TaxonomyCollectionView
      title={data.title}
      description={data.description}
      breadcrumbs={data.breadcrumbs}
      children={data.children}
      products={data.products}
      curatedProducts={data.curatedProducts}
      isLeaf={data.isLeaf}
    />
  );
}
