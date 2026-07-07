/**
 * Server-only Meilisearch clients.
 * Never import this module from browser/client code.
 */

import {MeiliSearch} from 'meilisearch';
import type {MeilisearchEnv} from './env';

function createClient(host: string, apiKey: string) {
  return new MeiliSearch({host, apiKey});
}

/**
 * Full administrative client — master key only.
 */
export function createMasterClient(config: MeilisearchEnv) {
  if (!config.masterKey) {
    throw new Error('MEILISEARCH_MASTER_KEY is required for master client operations.');
  }
  return createClient(config.host, config.masterKey);
}

/**
 * Indexing client — prefers admin key, falls back to master key.
 */
export function createAdminClient(config: MeilisearchEnv) {
  const apiKey = config.adminKey ?? config.masterKey;
  if (!apiKey) {
    throw new Error(
      'MEILISEARCH_ADMIN_KEY or MEILISEARCH_MASTER_KEY is required for indexing.',
    );
  }
  return createClient(config.host, apiKey);
}

/**
 * Read-only admin client for server-side stats and non-mutating admin reads.
 */
export function createReadonlyAdminClient(config: MeilisearchEnv) {
  const apiKey = config.readonlyAdminKey ?? config.searchKey;
  return createClient(config.host, apiKey);
}

/**
 * Server-side search client — uses the public search key (search-only scope).
 */
export function createServerSearchClient(config: MeilisearchEnv) {
  return createClient(config.host, config.searchKey);
}
