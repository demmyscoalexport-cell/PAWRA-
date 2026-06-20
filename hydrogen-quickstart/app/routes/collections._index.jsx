/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET SHOP               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetshop.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file collections._index.jsx
 * @description Visual collection directory — species-first shop hub.
 */

import {useLoaderData} from 'react-router';
import {getPaginationVariables} from '@shopify/hydrogen';
import {Link} from 'react-router';
import {
  PAWRA_SPECIES,
  CURATED_COLLECTIONS,
  PAWRA_COLLECTIONS,
} from '~/lib/pawraCollections';
import {PawraCollectionCard} from '~/components/PawraCollectionCard';
import {Breadcrumbs} from '~/components/Breadcrumbs';

export const meta = () => {
  return [{title: 'PAWRA | Shop Collections'}];
};

export async function loader({context, request}) {
  const paginationVariables = getPaginationVariables(request, {pageBy: 50});
  const [{collections}] = await Promise.all([
    context.storefront.query(COLLECTIONS_QUERY, {variables: paginationVariables}),
  ]);

  const apiByHandle = Object.fromEntries(
    (collections?.nodes ?? []).map((c) => [c.handle, c]),
  );

  const displayCollections = PAWRA_COLLECTIONS.map((item) => {
    const api = apiByHandle[item.handle];
    return {
      ...item,
      image: api?.image ?? null,
      productCount: api?.products?.nodes?.length ?? null,
    };
  });

  return {collections: displayCollections, species: PAWRA_SPECIES};
}

export default function CollectionsIndex() {
  const {collections, species} = useLoaderData();

  const curated = CURATED_COLLECTIONS.filter((c) =>
    ['best-sellers', 'new-pet-essentials', 'food-and-treats', 'grooming-wellness'].includes(c.handle),
  );

  return (
    <div className="bg-warm-oat px-4 py-12 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs
          crumbs={[
            {label: 'Home', path: '/'},
            {label: 'Shop', path: '/collections'},
          ]}
        />
        <h1 className="mt-4 font-serif text-display-s text-forest-green md:text-[3.5rem]">
          Shop Collections
        </h1>
        <p className="mt-4 max-w-2xl font-sans text-body-l text-ink/80">
          Premium pet products organized the way you shop — by pet first, then category.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {species.map((s) => (
            <Link
              key={s.id}
              to={s.path}
              className="rounded-xl border border-forest-green/20 bg-forest-green p-8 text-cloud no-underline transition-shadow hover:shadow-lg"
            >
              <h2 className="font-serif text-heading-l">Shop {s.title}</h2>
              <p className="mt-2 font-sans text-body-s text-cloud/80">{s.description}</p>
              <p className="mt-4 font-sans text-body-s font-medium text-electric-jade">
                {s.categories.length} categories →
              </p>
            </Link>
          ))}
        </div>

        <h2 className="mt-16 font-serif text-heading-l text-forest-green">Curated for you</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {curated.map((col) => {
            const card = collections.find((c) => c.handle === col.handle) ?? col;
            return (
              <PawraCollectionCard
                key={col.handle}
                title={card.title}
                description={card.description}
                to={card.path ?? `/collections/${col.handle}`}
                productCount={card.productCount}
              />
            );
          })}
        </div>

        {species.map((s) => (
          <div key={s.id} className="mt-16">
            <h2 className="font-serif text-heading-l text-forest-green">{s.title} Categories</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {collections
                .filter((c) => c.handle?.startsWith(s.id) && c.handle !== s.id)
                .map((collection) => (
                  <PawraCollectionCard
                    key={collection.handle}
                    title={collection.title}
                    description={collection.description}
                    to={collection.path}
                    productCount={collection.productCount}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const COLLECTIONS_QUERY = `#graphql
  query StoreCollections(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    collections(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes {
        id
        title
        handle
        image {
          url
          altText
        }
        products(first: 1) {
          nodes {
            id
          }
        }
      }
    }
  }
`;

/** @typedef {import('./+types/collections._index').Route} Route */
