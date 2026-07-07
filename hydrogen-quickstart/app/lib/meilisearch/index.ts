/**
 * Meilisearch service layer — server-side exports only.
 * Browser code must import from ./client.browser.ts directly.
 */

export {
  getMeilisearchConfig,
  getMeilisearchPublicConfig,
  isMeilisearchConfigured,
  validateMeilisearchAdminEnv,
  validateMeilisearchEnv,
} from './env';
export type {MeilisearchEnv, MeilisearchPublicConfig} from './env';

export {getMeilisearchIndexNames, getIndexUid} from './indexes';
export type {MeilisearchIndexNames} from './indexes';

export {
  createAdminClient,
  createMasterClient,
  createReadonlyAdminClient,
  createServerSearchClient,
} from './client.server';

export {multiIndexSearch, searchCollections, searchContent, searchProducts} from './search';
export {predictiveAutocomplete} from './autocomplete';
export {
  deleteProduct,
  ensureIndexes,
  getIndexStats,
  indexArticle,
  indexCollection,
  indexPage,
  indexProduct,
  indexProducts,
  shopifyProductToDocument,
} from './sync';

export type * from './types';
