/**
 * Meilisearch index provisioning and Shopify → Meilisearch sync helpers.
 */

import type {MeilisearchEnv} from './env';
import {getIndexUid} from './indexes';
import {createAdminClient, createReadonlyAdminClient} from './client.server';
import type {
  MeilisearchArticleDocument,
  MeilisearchCollectionDocument,
  MeilisearchIndexKey,
  MeilisearchPageDocument,
  MeilisearchProductDocument,
} from './types';

const INDEX_SETTINGS: Partial<
  Record<MeilisearchIndexKey, {searchableAttributes?: string[]; filterableAttributes?: string[]}>
> = {
  products: {
    searchableAttributes: ['title', 'description', 'tags', 'vendor', 'productType', 'handle'],
    filterableAttributes: ['species', 'tags', 'productType', 'vendor', 'available'],
  },
  collections: {
    searchableAttributes: ['title', 'description', 'handle'],
    filterableAttributes: ['species'],
  },
  brands: {
    searchableAttributes: ['title', 'handle'],
  },
  categories: {
    searchableAttributes: ['title', 'handle'],
    filterableAttributes: ['species', 'parentHandle'],
  },
  articles: {
    searchableAttributes: ['title', 'excerpt', 'handle', 'blogHandle'],
  },
  pages: {
    searchableAttributes: ['title', 'handle'],
  },
  suggestions: {
    searchableAttributes: ['query'],
    filterableAttributes: ['popularity'],
  },
};

/**
 * Ensures all PAWRA indexes exist with search settings applied.
 */
export async function ensureIndexes(config: MeilisearchEnv) {
  const client = createAdminClient(config);
  const keys = Object.keys(config.indexes) as MeilisearchIndexKey[];

  for (const key of keys) {
    const uid = getIndexUid(config.indexes, key);
    const task = await client.createIndex(uid, {primaryKey: 'id'});
    await client.waitForTask(task.taskUid);

    const settings = INDEX_SETTINGS[key];
    if (settings) {
      const index = client.index(uid);
      const settingsTask = await index.updateSettings(settings);
      await client.waitForTask(settingsTask.taskUid);
    }
  }
}

export async function indexProduct(config: MeilisearchEnv, document: MeilisearchProductDocument) {
  const client = createAdminClient(config);
  const index = client.index(getIndexUid(config.indexes, 'products'));
  const task = await index.addDocuments([document]);
  await client.waitForTask(task.taskUid);
}

export async function indexProducts(
  config: MeilisearchEnv,
  documents: MeilisearchProductDocument[],
) {
  if (!documents.length) return;
  const client = createAdminClient(config);
  const index = client.index(getIndexUid(config.indexes, 'products'));
  const task = await index.addDocuments(documents);
  await client.waitForTask(task.taskUid);
}

export async function deleteProduct(config: MeilisearchEnv, id: string) {
  const client = createAdminClient(config);
  const index = client.index(getIndexUid(config.indexes, 'products'));
  const task = await index.deleteDocument(id);
  await client.waitForTask(task.taskUid);
}

export async function indexCollection(
  config: MeilisearchEnv,
  document: MeilisearchCollectionDocument,
) {
  const client = createAdminClient(config);
  const index = client.index(getIndexUid(config.indexes, 'collections'));
  const task = await index.addDocuments([document]);
  await client.waitForTask(task.taskUid);
}

export async function indexPage(config: MeilisearchEnv, document: MeilisearchPageDocument) {
  const client = createAdminClient(config);
  const index = client.index(getIndexUid(config.indexes, 'pages'));
  const task = await index.addDocuments([document]);
  await client.waitForTask(task.taskUid);
}

export async function indexArticle(config: MeilisearchEnv, document: MeilisearchArticleDocument) {
  const client = createAdminClient(config);
  const index = client.index(getIndexUid(config.indexes, 'articles'));
  const task = await index.addDocuments([document]);
  await client.waitForTask(task.taskUid);
}

/**
 * Read-only index health check for ops dashboards.
 */
export async function getIndexStats(config: MeilisearchEnv) {
  const client = createReadonlyAdminClient(config);
  const stats: Record<string, unknown> = {};

  for (const key of Object.keys(config.indexes) as MeilisearchIndexKey[]) {
    const uid = getIndexUid(config.indexes, key);
    stats[uid] = await client.index(uid).getStats();
  }

  return stats;
}

/**
 * Maps a Shopify Storefront API product node to a Meilisearch document.
 */
export function shopifyProductToDocument(product: ShopifyProductNode): MeilisearchProductDocument {
  const variant = product.selectedOrFirstAvailableVariant ?? product.variants?.nodes?.[0];
  const tags = product.tags ?? [];
  const species = tags.includes('dogs') ? 'dogs' : tags.includes('cats') ? 'cats' : undefined;
  const price = variant?.price?.amount ? Number(variant.price.amount) : undefined;

  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    description: product.description ?? undefined,
    vendor: product.vendor ?? undefined,
    productType: product.productType ?? undefined,
    tags,
    species,
    price,
    currencyCode: variant?.price?.currencyCode,
    imageUrl: variant?.image?.url,
    imageAlt: variant?.image?.altText ?? undefined,
    available: variant?.availableForSale ?? true,
    updatedAt: product.updatedAt ?? undefined,
  };
}

export interface ShopifyProductNode {
  id: string;
  handle: string;
  title: string;
  description?: string | null;
  vendor?: string | null;
  productType?: string | null;
  tags?: string[];
  updatedAt?: string | null;
  selectedOrFirstAvailableVariant?: {
    availableForSale?: boolean;
    price?: {amount: string; currencyCode: string};
    image?: {url: string; altText?: string | null};
  };
  variants?: {
    nodes?: Array<{
      availableForSale?: boolean;
      price?: {amount: string; currencyCode: string};
      image?: {url: string; altText?: string | null};
    }>;
  };
}
