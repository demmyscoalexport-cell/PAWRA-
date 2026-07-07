/**
 * Meilisearch index names — configurable via environment variables.
 */

import type {MeilisearchIndexKey} from './types';

export interface MeilisearchIndexNames {
  products: string;
  collections: string;
  brands: string;
  categories: string;
  articles: string;
  pages: string;
  suggestions: string;
}

const DEFAULT_INDEX_NAMES: MeilisearchIndexNames = {
  products: 'products',
  collections: 'collections',
  brands: 'brands',
  categories: 'categories',
  articles: 'articles',
  pages: 'pages',
  suggestions: 'suggestions',
};

type IndexEnv = Partial<Record<`MEILISEARCH_${Uppercase<MeilisearchIndexKey>}_INDEX`, string>>;

/**
 * Resolves index UIDs from environment variables with sensible defaults.
 */
export function getMeilisearchIndexNames(env: IndexEnv): MeilisearchIndexNames {
  return {
    products: env.MEILISEARCH_PRODUCTS_INDEX ?? DEFAULT_INDEX_NAMES.products,
    collections: env.MEILISEARCH_COLLECTIONS_INDEX ?? DEFAULT_INDEX_NAMES.collections,
    brands: env.MEILISEARCH_BRANDS_INDEX ?? DEFAULT_INDEX_NAMES.brands,
    categories: env.MEILISEARCH_CATEGORIES_INDEX ?? DEFAULT_INDEX_NAMES.categories,
    articles: env.MEILISEARCH_ARTICLES_INDEX ?? DEFAULT_INDEX_NAMES.articles,
    pages: env.MEILISEARCH_PAGES_INDEX ?? DEFAULT_INDEX_NAMES.pages,
    suggestions: env.MEILISEARCH_SUGGESTIONS_INDEX ?? DEFAULT_INDEX_NAMES.suggestions,
  };
}

export function getIndexUid(
  indexes: MeilisearchIndexNames,
  key: MeilisearchIndexKey,
): string {
  return indexes[key];
}
