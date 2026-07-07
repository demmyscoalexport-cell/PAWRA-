/**
 * Browser-safe Meilisearch client.
 * Uses only PUBLIC_MEILISEARCH_SEARCH_KEY — never admin or master keys.
 */

import {MeiliSearch} from 'meilisearch';
import type {MeilisearchPublicConfig} from './env';

/**
 * Creates a Meilisearch client for in-browser instant search.
 */
export function createBrowserSearchClient(config: MeilisearchPublicConfig) {
  return new MeiliSearch({
    host: config.host,
    apiKey: config.searchKey,
  });
}
