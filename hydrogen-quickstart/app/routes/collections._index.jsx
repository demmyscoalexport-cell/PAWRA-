import {useLoaderData} from 'react-router';
import {getPaginationVariables} from '@shopify/hydrogen';
import {PAWRA_COLLECTIONS} from '~/lib/pawraCollections';
import {PawraCollectionCard} from '~/components/PawraCollectionCard';

export const meta = () => {
  return [{title: 'PAWRA | Collections'}];
};

export async function loader({context, request}) {
  const paginationVariables = getPaginationVariables(request, {pageBy: 20});
  const [{collections}] = await Promise.all([
    context.storefront.query(COLLECTIONS_QUERY, {variables: paginationVariables}),
  ]);

  const apiByHandle = Object.fromEntries(
    (collections?.nodes ?? []).map((c) => [c.handle, c]),
  );

  const displayCollections = PAWRA_COLLECTIONS.map((item) => {
    const api = item.handle !== 'all' ? apiByHandle[item.handle] : null;
    return {
      ...item,
      image: api?.image ?? null,
      productCount: api?.products?.nodes?.length ?? null,
    };
  });

  return {collections: displayCollections};
}

export default function CollectionsIndex() {
  const {collections} = useLoaderData();

  return (
    <div className="bg-warm-oat px-4 py-12 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-serif text-display-s text-forest-green md:text-[3.5rem]">
          Collections
        </h1>
        <p className="mt-4 max-w-2xl font-sans text-body-l text-ink/80">
          Smart pet technology organized the way you shop — tracking, feeding, safety, and more.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection) => (
            <PawraCollectionCard
              key={`${collection.title}-${collection.path}`}
              title={collection.title}
              description={collection.description}
              to={collection.path}
              productCount={collection.productCount}
              productCountLabel={collection.productCountLabel}
              image={collection.image}
            />
          ))}
        </div>
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
