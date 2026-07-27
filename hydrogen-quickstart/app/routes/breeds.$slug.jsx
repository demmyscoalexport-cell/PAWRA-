/**
 * @file breeds.$slug.jsx
 * @description Breed detail + product recommendations.
 */

import {useLoaderData} from 'react-router';
import {PawraProductCard} from '~/components/PawraProductCard';
import {getBreedBySlug} from '~/data/breeds';
import {getProductsByTag} from '~/data/products';
import {buildSeoMeta, breadcrumbJsonLd} from '~/lib/seo';

export const meta = ({data}) => {
  const breed = data?.breed;
  return buildSeoMeta({
    title: breed ? `${breed.name} Guide` : 'Breed Guide',
    description: breed?.summary,
    url: breed ? `/breeds/${breed.slug}` : '/breeds',
    jsonLd: breadcrumbJsonLd([
      {label: 'Home', to: '/'},
      {label: 'Breed Guides', to: '/breeds'},
      ...(breed ? [{label: breed.name, to: `/breeds/${breed.slug}`}] : []),
    ]),
  });
};

export async function loader({params}) {
  const breed = getBreedBySlug(params.slug);
  if (!breed) throw new Response('Not found', {status: 404});
  const products = (breed.productTags || [])
    .flatMap((tag) => getProductsByTag(tag))
    .filter((p, i, arr) => arr.findIndex((x) => x.handle === p.handle) === i)
    .slice(0, 6);
  return {breed, products};
}

export default function BreedDetailPage() {
  const {breed, products} = useLoaderData();
  return (
    <div className="bg-page-bg px-4 py-12 md:px-10 md:py-16">
      <div className="mx-auto max-w-1440">
        <div className="grid gap-10 lg:grid-cols-2">
          <img src={breed.image} alt={breed.name} className="aspect-[4/3] w-full rounded-lg object-cover" />
          <div>
            <p className="font-mono text-mono-s uppercase tracking-wide text-action-primary">{breed.species}</p>
            <h1 className="mt-2 font-sans text-display-s text-text-primary">{breed.name}</h1>
            <p className="mt-4 font-sans text-body-l text-text-secondary">{breed.summary}</p>
            <dl className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ['Size', breed.size],
                ['Energy', breed.energy],
                ['Coat', breed.coat],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-border-subtle bg-surface p-4">
                  <dt className="font-sans text-body-xs uppercase tracking-wide text-text-secondary">{label}</dt>
                  <dd className="mt-1 font-sans text-body-s font-medium text-text-primary">{value}</dd>
                </div>
              ))}
            </dl>
            <h2 className="mt-10 font-sans text-heading-s text-text-primary">Care tips</h2>
            <ul className="mt-3 list-disc space-y-2 pl-4 font-sans text-body-m text-text-secondary">
              {breed.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>

        <section className="mt-16">
          <h2 className="font-sans text-heading-m text-text-primary">Shop for {breed.name}s</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <PawraProductCard key={product.id} product={product} loading={i < 2 ? 'eager' : 'lazy'} showCompare />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
