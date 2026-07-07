/**
 * Multi-index Meilisearch search for PAWRA storefront loaders.
 */

import type {MeilisearchEnv} from './env';
import {getIndexUid} from './indexes';
import {createServerSearchClient} from './client.server';
import type {
  MeilisearchArticleDocument,
  MeilisearchCollectionDocument,
  MeilisearchFacetSearchParams,
  MeilisearchMultiSearchResult,
  MeilisearchPageDocument,
  MeilisearchProductDocument,
} from './types';

export interface ProductSearchOptions extends MeilisearchFacetSearchParams {
  species?: 'dogs' | 'cats';
}

function buildSpeciesFilter(species?: string): string | undefined {
  if (!species) return undefined;
  return `species = "${species}"`;
}

function mergeFilters(
  filter: string | string[] | undefined,
  extra?: string,
): string | string[] | undefined {
  if (!extra) return filter;
  if (!filter) return extra;
  if (Array.isArray(filter)) return [...filter, extra];
  return [filter, extra];
}

/**
 * Search products with typo tolerance and optional faceted filters.
 */
export async function searchProducts(
  config: MeilisearchEnv,
  options: ProductSearchOptions,
): Promise<MeilisearchMultiSearchResult<MeilisearchProductDocument>> {
  const client = createServerSearchClient(config);
  const index = client.index(getIndexUid(config.indexes, 'products'));
  const {q, limit = 24, offset = 0, filter, facets, sort, species} = options;

  const result = await index.search<MeilisearchProductDocument>(q, {
    limit,
    offset,
    filter: mergeFilters(filter, buildSpeciesFilter(species)),
    facets: facets ?? ['species', 'productType', 'tags', 'vendor'],
    sort,
  });

  return {
    hits: result.hits,
    totalHits: result.estimatedTotalHits ?? result.hits.length,
    processingTimeMs: result.processingTimeMs,
    facetDistribution: result.facetDistribution,
  };
}

/**
 * Search collections index.
 */
export async function searchCollections(
  config: MeilisearchEnv,
  options: MeilisearchFacetSearchParams,
): Promise<MeilisearchMultiSearchResult<MeilisearchCollectionDocument>> {
  const client = createServerSearchClient(config);
  const index = client.index(getIndexUid(config.indexes, 'collections'));
  const {q, limit = 12, offset = 0, filter, facets} = options;

  const result = await index.search<MeilisearchCollectionDocument>(q, {
    limit,
    offset,
    filter,
    facets: facets ?? ['species'],
  });

  return {
    hits: result.hits,
    totalHits: result.estimatedTotalHits ?? result.hits.length,
    processingTimeMs: result.processingTimeMs,
    facetDistribution: result.facetDistribution,
  };
}

/**
 * Search pages and articles in parallel for the regular search page.
 */
export async function searchContent(
  config: MeilisearchEnv,
  q: string,
  limit = 8,
): Promise<{
  pages: MeilisearchPageDocument[];
  articles: MeilisearchArticleDocument[];
  totalHits: number;
}> {
  const client = createServerSearchClient(config);
  const queries = [
    {
      indexUid: getIndexUid(config.indexes, 'pages'),
      q,
      limit,
    },
    {
      indexUid: getIndexUid(config.indexes, 'articles'),
      q,
      limit,
    },
  ];

  const {results} = await client.multiSearch({queries});
  const pages = (results[0]?.hits ?? []) as MeilisearchPageDocument[];
  const articles = (results[1]?.hits ?? []) as MeilisearchArticleDocument[];

  return {
    pages,
    articles,
    totalHits: pages.length + articles.length,
  };
}

/**
 * Full storefront search across products, collections, pages, and articles.
 */
export async function multiIndexSearch(
  config: MeilisearchEnv,
  q: string,
  options: {limit?: number; species?: 'dogs' | 'cats'} = {},
) {
  const limit = options.limit ?? 12;
  const [products, collections, content] = await Promise.all([
    searchProducts(config, {q, limit, species: options.species}),
    searchCollections(config, {q, limit: Math.min(limit, 6)}),
    searchContent(config, q, Math.min(limit, 6)),
  ]);

  return {
    products,
    collections,
    pages: content.pages,
    articles: content.articles,
    total:
      products.totalHits +
      collections.totalHits +
      content.pages.length +
      content.articles.length,
  };
}
