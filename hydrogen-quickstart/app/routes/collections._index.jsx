/**
 * @file collections._index.jsx
 * @description Shop All — top-level taxonomy category cards (mock taxonomy).
 */

import {useLoaderData} from 'react-router';
import {TaxonomyCollectionView} from '~/components/collection/TaxonomyCollectionView';
import {loadTaxonomyCollection} from '~/lib/taxonomyCollection';
import {buildSeoMeta} from '~/lib/seo';

export const meta = () => {
  return buildSeoMeta({
    title: 'Shop All',
    description:
      'Browse PAWRA by category — dogs, cats, pharmacy, small pets, and today’s deals.',
    url: '/collections',
  });
};

export async function loader() {
  return loadTaxonomyCollection([]);
}

export default function CollectionsIndex() {
  const data = useLoaderData();

  return (
    <TaxonomyCollectionView
      title={data.title}
      description={data.description}
      breadcrumbs={data.breadcrumbs}
      children={data.children}
      products={data.products}
      curatedProducts={data.curatedProducts}
      isLeaf={false}
    />
  );
}
