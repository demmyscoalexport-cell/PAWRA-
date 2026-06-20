/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET SHOP               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetshop.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file search.jsx
 * @description Route module: search — Pawra Pet Shop page or API handler.
 * @author Pawra LLC
 * @website pawrapetshop.com
 */

import {useLoaderData} from 'react-router';
import {getPaginationVariables, Analytics} from '@shopify/hydrogen';
import {SearchForm} from '~/components/SearchForm';
import {SearchResults} from '~/components/SearchResults';
import {getEmptyPredictiveSearchResult} from '~/lib/search';
import {PawraProductCard} from '~/components/PawraProductCard';
import {PAWRA_SPECIES, CURATED_COLLECTIONS} from '~/lib/pawraCollections';
import {Link} from 'react-router';

export const meta = () => {
  return [{title: 'PAWRA | Search'}];
};

export async function loader({request, context}) {
  const url = new URL(request.url);
  const isPredictive = url.searchParams.has('predictive');
  const searchPromise = isPredictive
    ? predictiveSearch({request, context})
    : regularSearch({request, context});

  searchPromise.catch((error) => {
    console.error(error);
    return {term: '', result: null, error: error.message};
  });

  return await searchPromise;
}

export default function SearchPage() {
  const {type, term, result, error} = useLoaderData();
  if (type === 'predictive') return null;

  return (
    <div className="bg-warm-oat px-4 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-serif text-display-s text-forest-green">Search</h1>
        <SearchForm className="mt-8">
          {({inputRef}) => (
            <div className="flex max-w-xl gap-2">
              <input
                defaultValue={term}
                name="q"
                placeholder="Search products, pages, articles…"
                ref={inputRef}
                type="search"
                className="flex-1 rounded-md border border-forest-green/20 bg-cloud px-4 py-3 font-sans text-body-m"
              />
              <button
                type="submit"
                className="rounded-md bg-forest-green px-6 py-3 font-sans text-body-m font-medium text-cloud"
              >
                Search
              </button>
            </div>
          )}
        </SearchForm>
        {error && <p className="mt-4 font-sans text-body-s text-coral">{error}</p>}
        {!term || !result?.total ? (
          <div className="mt-12">
            <SearchResults.Empty />
            <div className="mt-12">
              <h2 className="font-serif text-heading-m text-forest-green">Popular categories</h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {PAWRA_SPECIES.map((s) => (
                  <Link
                    key={s.id}
                    to={s.path}
                    className="rounded-pill border border-forest-green/30 px-4 py-2 font-sans text-body-s text-forest-green no-underline hover:bg-forest-green hover:text-cloud"
                  >
                    {s.title}
                  </Link>
                ))}
                {CURATED_COLLECTIONS.filter((c) => c.handle !== 'all').slice(0, 4).map((c) => (
                  <Link
                    key={c.handle}
                    to={c.path}
                    className="rounded-pill border border-forest-green/30 px-4 py-2 font-sans text-body-s text-forest-green no-underline hover:bg-forest-green hover:text-cloud"
                  >
                    {c.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <SearchResults result={result} term={term}>
            {({products, term: searchTerm}) => (
              <div className="mt-12">
                <p className="font-mono text-mono-s text-ink/60">
                  {result.total} results for &ldquo;{searchTerm}&rdquo;
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
                  {products?.nodes?.map((product, index) => (
                    <PawraProductCard
                      key={product.id}
                      product={{
                        id: product.id,
                        handle: product.handle,
                        title: product.title,
                        featuredImage: product.selectedOrFirstAvailableVariant?.image,
                        priceRange: {
                          minVariantPrice: product.selectedOrFirstAvailableVariant?.price,
                        },
                      }}
                      loading={index < 8 ? 'eager' : undefined}
                    />
                  ))}
                </div>
              </div>
            )}
          </SearchResults>
        )}
        <Analytics.SearchView data={{searchTerm: term, searchResults: result}} />
      </div>
    </div>
  );
}

async function regularSearch({request, context}) {
  const {storefront} = context;
  const url = new URL(request.url);
  const variables = getPaginationVariables(request, {pageBy: 12});
  const term = String(url.searchParams.get('q') || '');

  const {errors, ...items} = await storefront.query(SEARCH_QUERY, {
    variables: {...variables, term},
  });

  if (!items) {
    throw new Error('No search data returned from Shopify API');
  }

  const total = Object.values(items).reduce((acc, {nodes}) => acc + nodes.length, 0);
  const error = errors ? errors.map(({message}) => message).join(', ') : undefined;

  return {type: 'regular', term, error, result: {total, items}};
}

async function predictiveSearch({request, context}) {
  const {storefront} = context;
  const url = new URL(request.url);
  const term = String(url.searchParams.get('q') || '').trim();
  const limit = Number(url.searchParams.get('limit') || 10);
  const type = 'predictive';

  if (!term) return {type, term, result: getEmptyPredictiveSearchResult()};

  const {predictiveSearch: items, errors} = await storefront.query(PREDICTIVE_SEARCH_QUERY, {
    variables: {limit, limitScope: 'EACH', term},
  });

  if (errors) {
    throw new Error(`Shopify API errors: ${errors.map(({message}) => message).join(', ')}`);
  }

  if (!items) {
    throw new Error('No predictive search data returned from Shopify API');
  }

  const total = Object.values(items).reduce((acc, item) => acc + item.length, 0);
  return {type, term, result: {items, total}};
}

const SEARCH_PRODUCT_FRAGMENT = `#graphql
  fragment SearchProduct on Product {
    __typename
    handle
    id
    title
    selectedOrFirstAvailableVariant(selectedOptions: [], ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      id
      image { url altText width height }
      price { amount currencyCode }
    }
  }
`;

const SEARCH_QUERY = `#graphql
  query RegularSearch(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $term: String!
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    products: search(
      after: $endCursor,
      before: $startCursor,
      first: $first,
      last: $last,
      query: $term,
      sortKey: RELEVANCE,
      types: [PRODUCT],
      unavailableProducts: HIDE,
    ) {
      nodes { ...on Product { ...SearchProduct } }
      pageInfo { hasNextPage hasPreviousPage startCursor endCursor }
    }
    pages: search(query: $term, types: [PAGE], first: $first) {
      nodes { ...on Page { id title handle } }
    }
    articles: search(query: $term, types: [ARTICLE], first: $first) {
      nodes { ...on Article { id title handle } }
    }
  }
  ${SEARCH_PRODUCT_FRAGMENT}
`;

const PREDICTIVE_SEARCH_QUERY = `#graphql
  query PredictiveSearch(
    $country: CountryCode
    $language: LanguageCode
    $limit: Int!
    $limitScope: PredictiveSearchLimitScope!
    $term: String!
  ) @inContext(country: $country, language: $language) {
    predictiveSearch(limit: $limit, limitScope: $limitScope, query: $term) {
      products { id title handle }
      collections { id title handle }
      pages { id title handle }
      articles { id title handle }
      queries { text styledText }
    }
  }
`;

/** @typedef {import('./+types/search').Route} Route */
