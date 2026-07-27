/**
 * @file breeds._index.jsx
 * @description Breed guides index.
 */

import {Link, useLoaderData} from 'react-router';
import {BREEDS} from '~/data/breeds';
import {buildSeoMeta, breadcrumbJsonLd} from '~/lib/seo';

export const meta = () =>
  buildSeoMeta({
    title: 'Breed Guides',
    description: 'Breed profiles with product recommendations from PAWRA.',
    url: '/breeds',
    jsonLd: breadcrumbJsonLd([
      {label: 'Home', to: '/'},
      {label: 'Breed Guides', to: '/breeds'},
    ]),
  });

export async function loader() {
  return {breeds: BREEDS};
}

export default function BreedsIndex() {
  const {breeds} = useLoaderData();
  return (
    <div className="bg-page-bg px-4 py-12 md:px-10 md:py-16">
      <div className="mx-auto max-w-1440">
        <h1 className="font-sans text-display-s text-text-primary">Breed guides</h1>
        <p className="mt-3 max-w-2xl font-sans text-body-l text-text-secondary">
          Practical profiles with shopping links matched to size, coat, and lifestyle.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {breeds.map((breed) => (
            <Link
              key={breed.slug}
              to={`/breeds/${breed.slug}`}
              className="group overflow-hidden rounded-lg border border-border-subtle bg-surface no-underline transition-shadow hover:shadow-sm"
            >
              <img src={breed.image} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-[1.02]" />
              <div className="p-4">
                <p className="font-mono text-mono-s uppercase tracking-wide text-text-secondary">{breed.species}</p>
                <h2 className="mt-1 font-sans text-heading-s text-text-primary">{breed.name}</h2>
                <p className="mt-2 font-sans text-body-s text-text-secondary line-clamp-2">{breed.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
