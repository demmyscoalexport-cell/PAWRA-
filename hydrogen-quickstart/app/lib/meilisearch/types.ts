/**
 * Shared Meilisearch document and search result types for PAWRA.
 */

export type MeilisearchIndexKey =
  | 'products'
  | 'collections'
  | 'brands'
  | 'categories'
  | 'articles'
  | 'pages'
  | 'suggestions';

export interface MeilisearchProductDocument {
  id: string;
  handle: string;
  title: string;
  description?: string;
  vendor?: string;
  productType?: string;
  tags: string[];
  species?: 'dogs' | 'cats';
  price?: number;
  currencyCode?: string;
  imageUrl?: string;
  imageAlt?: string;
  available: boolean;
  updatedAt?: string;
}

export interface MeilisearchCollectionDocument {
  id: string;
  handle: string;
  title: string;
  description?: string;
  imageUrl?: string;
  species?: 'dogs' | 'cats';
  updatedAt?: string;
}

export interface MeilisearchBrandDocument {
  id: string;
  handle: string;
  title: string;
  updatedAt?: string;
}

export interface MeilisearchCategoryDocument {
  id: string;
  handle: string;
  title: string;
  parentHandle?: string;
  species?: 'dogs' | 'cats';
  updatedAt?: string;
}

export interface MeilisearchArticleDocument {
  id: string;
  handle: string;
  title: string;
  blogHandle: string;
  excerpt?: string;
  imageUrl?: string;
  publishedAt?: string;
  updatedAt?: string;
}

export interface MeilisearchPageDocument {
  id: string;
  handle: string;
  title: string;
  updatedAt?: string;
}

export interface MeilisearchSuggestionDocument {
  id: string;
  query: string;
  popularity?: number;
  updatedAt?: string;
}

export interface MeilisearchSearchHit<T = Record<string, unknown>> {
  id: string;
  document: T;
}

export interface MeilisearchFacetSearchParams {
  q: string;
  limit?: number;
  offset?: number;
  filter?: string | string[];
  facets?: string[];
  sort?: string[];
}

export interface MeilisearchMultiSearchResult<T = Record<string, unknown>> {
  hits: T[];
  totalHits: number;
  processingTimeMs: number;
  facetDistribution?: Record<string, Record<string, number>>;
}

export interface MeilisearchPredictiveItems {
  products: Array<{
    id: string;
    title: string;
    handle: string;
    selectedOrFirstAvailableVariant?: {
      image?: {url: string; altText?: string | null; width?: number; height?: number};
      price?: {amount: string; currencyCode: string};
    };
  }>;
  collections: Array<{id: string; title: string; handle: string; image?: {url: string; altText?: string | null}}>;
  pages: Array<{id: string; title: string; handle: string}>;
  articles: Array<{id: string; title: string; handle: string; blog?: {handle: string}}>;
  queries: Array<{text: string; styledText: string}>;
}
