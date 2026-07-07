/**
 * Meilisearch environment configuration and validation.
 */

import {getMeilisearchIndexNames, type MeilisearchIndexNames} from './indexes';

export interface MeilisearchEnv {
  host: string;
  masterKey?: string;
  adminKey?: string;
  searchKey: string;
  readonlyAdminKey?: string;
  chatApiKey?: string;
  indexes: MeilisearchIndexNames;
}

export interface MeilisearchPublicConfig {
  host: string;
  searchKey: string;
}

type RawEnv = Record<string, string | undefined>;

function requireVar(env: RawEnv, key: string): string {
  const value = env[key]?.trim();
  if (!value) {
    throw new Error(
      `Meilisearch is enabled but required environment variable "${key}" is missing.`,
    );
  }
  return value;
}

/**
 * Returns true when Meilisearch host is configured (opt-in integration).
 */
export function isMeilisearchConfigured(env: RawEnv): boolean {
  return Boolean(env.MEILISEARCH_HOST?.trim());
}

/**
 * Parses Meilisearch configuration from worker environment bindings.
 */
export function getMeilisearchConfig(env: RawEnv): MeilisearchEnv {
  return {
    host: requireVar(env, 'MEILISEARCH_HOST').replace(/\/$/, ''),
    masterKey: env.MEILISEARCH_MASTER_KEY?.trim(),
    adminKey: env.MEILISEARCH_ADMIN_KEY?.trim(),
    searchKey: requireVar(env, 'PUBLIC_MEILISEARCH_SEARCH_KEY'),
    readonlyAdminKey: env.MEILISEARCH_READONLY_ADMIN_KEY?.trim(),
    chatApiKey: env.MEILISEARCH_CHAT_API_KEY?.trim(),
    indexes: getMeilisearchIndexNames(env),
  };
}

/**
 * Validates required Meilisearch variables when search is enabled.
 * Call during Hydrogen context boot.
 */
export function validateMeilisearchEnv(env: RawEnv): void {
  if (!isMeilisearchConfigured(env)) return;

  getMeilisearchConfig(env);
}

/**
 * Validates admin credentials for indexing / webhook sync routes.
 */
export function validateMeilisearchAdminEnv(env: RawEnv): MeilisearchEnv {
  const config = getMeilisearchConfig(env);

  if (!config.adminKey && !config.masterKey) {
    throw new Error(
      'Meilisearch indexing requires MEILISEARCH_ADMIN_KEY or MEILISEARCH_MASTER_KEY.',
    );
  }

  return config;
}

/**
 * Public (browser-safe) Meilisearch config exposed via the root loader.
 */
export function getMeilisearchPublicConfig(env: RawEnv): MeilisearchPublicConfig | null {
  if (!isMeilisearchConfigured(env)) return null;

  const host = env.MEILISEARCH_HOST?.trim();
  const searchKey = env.PUBLIC_MEILISEARCH_SEARCH_KEY?.trim();

  if (!host || !searchKey) return null;

  return {host: host.replace(/\/$/, ''), searchKey};
}
