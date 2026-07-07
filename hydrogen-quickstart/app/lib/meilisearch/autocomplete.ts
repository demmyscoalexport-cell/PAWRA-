/**
 * Predictive search / autocomplete powered by Meilisearch.
 */

import type {MeilisearchEnv} from './env';
import {getIndexUid} from './indexes';
import {createServerSearchClient} from './client.server';
import type {
  MeilisearchPredictiveItems,
  MeilisearchProductDocument,
  MeilisearchCollectionDocument,
  MeilisearchPageDocument,
  MeilisearchArticleDocument,
  MeilisearchSuggestionDocument,
} from './types';

function mapProductHit(doc: MeilisearchProductDocument) {
  return {
    id: doc.id,
    title: doc.title,
    handle: doc.handle,
    selectedOrFirstAvailableVariant: {
      image: doc.imageUrl
        ? {url: doc.imageUrl, altText: doc.imageAlt ?? null}
        : undefined,
      price:
        doc.price != null && doc.currencyCode
          ? {amount: String(doc.price), currencyCode: doc.currencyCode}
          : undefined,
    },
  };
}

function mapCollectionHit(doc: MeilisearchCollectionDocument) {
  return {
    id: doc.id,
    title: doc.title,
    handle: doc.handle,
    image: doc.imageUrl ? {url: doc.imageUrl, altText: null} : undefined,
  };
}

function mapPageHit(doc: MeilisearchPageDocument) {
  return {id: doc.id, title: doc.title, handle: doc.handle};
}

function mapArticleHit(doc: MeilisearchArticleDocument) {
  return {
    id: doc.id,
    title: doc.title,
    handle: doc.handle,
    blog: {handle: doc.blogHandle},
  };
}

/**
 * Chewy-style instant search across products, collections, content, and suggestions.
 */
export async function predictiveAutocomplete(
  config: MeilisearchEnv,
  term: string,
  limit = 5,
): Promise<{items: MeilisearchPredictiveItems; total: number}> {
  const client = createServerSearchClient(config);
  const perType = Math.max(2, Math.ceil(limit / 2));

  const {results} = await client.multiSearch({
    queries: [
      {
        indexUid: getIndexUid(config.indexes, 'products'),
        q: term,
        limit: perType,
        attributesToRetrieve: [
          'id',
          'handle',
          'title',
          'imageUrl',
          'imageAlt',
          'price',
          'currencyCode',
        ],
      },
      {
        indexUid: getIndexUid(config.indexes, 'collections'),
        q: term,
        limit: perType,
        attributesToRetrieve: ['id', 'handle', 'title', 'imageUrl'],
      },
      {
        indexUid: getIndexUid(config.indexes, 'pages'),
        q: term,
        limit: 3,
        attributesToRetrieve: ['id', 'handle', 'title'],
      },
      {
        indexUid: getIndexUid(config.indexes, 'articles'),
        q: term,
        limit: 3,
        attributesToRetrieve: ['id', 'handle', 'title', 'blogHandle'],
      },
      {
        indexUid: getIndexUid(config.indexes, 'suggestions'),
        q: term,
        limit: 5,
        attributesToRetrieve: ['id', 'query'],
      },
    ],
  });

  const products = (results[0]?.hits ?? []) as MeilisearchProductDocument[];
  const collections = (results[1]?.hits ?? []) as MeilisearchCollectionDocument[];
  const pages = (results[2]?.hits ?? []) as MeilisearchPageDocument[];
  const articles = (results[3]?.hits ?? []) as MeilisearchArticleDocument[];
  const suggestions = (results[4]?.hits ?? []) as MeilisearchSuggestionDocument[];

  const queries = suggestions.map((s) => ({
    text: s.query,
    styledText: s.query,
  }));

  const items: MeilisearchPredictiveItems = {
    products: products.map(mapProductHit),
    collections: collections.map(mapCollectionHit),
    pages: pages.map(mapPageHit),
    articles: articles.map(mapArticleHit),
    queries,
  };

  const total =
    items.products.length +
    items.collections.length +
    items.pages.length +
    items.articles.length +
    items.queries.length;

  return {items, total};
}
