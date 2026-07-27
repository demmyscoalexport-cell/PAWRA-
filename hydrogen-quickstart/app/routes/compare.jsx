/**
 * @file compare.jsx
 * @description Product comparison table from ?handles= query.
 */

import {Link, useLoaderData} from 'react-router';
import {Money} from '@shopify/hydrogen';
import {getMockProductByHandle} from '~/data/products';
import {getCompareAttributes} from '~/lib/productFlags';
import {buildSeoMeta} from '~/lib/seo';

export const meta = () =>
  buildSeoMeta({
    title: 'Compare Products',
    description: 'Compare PAWRA products side by side.',
    url: '/compare',
  });

export async function loader({request}) {
  const url = new URL(request.url);
  const handles = (url.searchParams.get('handles') || '')
    .split(',')
    .map((h) => h.trim())
    .filter(Boolean)
    .slice(0, 4);
  const products = handles
    .map((handle) => getMockProductByHandle(handle))
    .filter(Boolean)
    .map(getCompareAttributes);
  return {products};
}

export default function ComparePage() {
  const {products} = useLoaderData();

  if (!products.length) {
    return (
      <div className="bg-page-bg px-5 py-20 text-center md:px-10">
        <h1 className="font-sans text-display-s text-text-primary">Compare products</h1>
        <p className="mt-3 font-sans text-body-m text-text-secondary">
          Select 2–4 products from a collection using Compare.
        </p>
        <Link to="/collections" className="mt-6 inline-block font-semibold text-action-primary">
          Browse collections
        </Link>
      </div>
    );
  }

  const rows = [
    ['image', 'Product'],
    ['title', 'Name'],
    ['price', 'Price'],
    ['rating', 'Rating'],
    ['keyIngredients', 'Key ingredients'],
    ['lifeStage', 'Life stage'],
    ['breedSize', 'Breed size'],
    ['productType', 'Type'],
    ['prescriptionRequired', 'Rx required'],
  ];

  return (
    <div className="bg-page-bg px-5 py-12 md:px-10 md:py-16">
      <div className="mx-auto max-w-1440">
        <h1 className="font-sans text-display-s text-text-primary">Compare</h1>
        <p className="mt-2 font-sans text-body-m text-text-secondary">
          Side-by-side details for {products.length} products.
        </p>
        <div className="mt-10 overflow-x-auto rounded-lg border border-border-subtle bg-surface">
          <table className="min-w-full border-collapse text-left">
            <tbody>
              {rows.map(([key, label]) => (
                <tr key={key} className="border-b border-border-subtle last:border-0">
                  <th className="sticky left-0 bg-surface px-4 py-4 font-sans text-body-s font-semibold text-text-secondary">
                    {label}
                  </th>
                  {products.map((product) => (
                    <td key={`${product.handle}-${key}`} className="min-w-[12rem] px-4 py-4 align-top">
                      {key === 'image' ? (
                        product.image ? (
                          <img src={product.image} alt="" className="h-28 w-28 rounded-md object-cover" loading="lazy" />
                        ) : (
                          <div className="flex h-28 w-28 items-center justify-center rounded-md bg-page-bg font-sans text-text-secondary">
                            PAWRA
                          </div>
                        )
                      ) : key === 'title' ? (
                        <Link to={`/products/${product.handle}`} className="font-sans text-body-s font-medium text-text-primary no-underline hover:text-action-primary">
                          {product.title}
                        </Link>
                      ) : key === 'price' ? (
                        product.price ? (
                          <span className="font-mono text-mono-s text-text-primary">
                            <Money data={product.price} />
                          </span>
                        ) : (
                          '—'
                        )
                      ) : key === 'prescriptionRequired' ? (
                        <span className="font-sans text-body-s text-text-primary">
                          {product.prescriptionRequired ? 'Yes' : 'No'}
                        </span>
                      ) : (
                        <span className="font-sans text-body-s text-text-primary">{product[key]}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
