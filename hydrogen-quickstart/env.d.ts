/// <reference types="vite/client" />
/// <reference types="react-router" />
/// <reference types="@shopify/oxygen-workers-types" />
/// <reference types="@shopify/hydrogen/react-router-types" />

// Enhance TypeScript's built-in typings.
import '@total-typescript/ts-reset';

interface Env {
  SESSION_SECRET: string;
  PUBLIC_STOREFRONT_API_TOKEN: string;
  PUBLIC_STORE_DOMAIN: string;
  PUBLIC_STOREFRONT_ID: string;
  PRIVATE_STOREFRONT_API_TOKEN: string;
  PUBLIC_CHECKOUT_DOMAIN: string;
  PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID?: string;
  PUBLIC_CUSTOMER_ACCOUNT_API_URL?: string;
  SHOPIFY_WEBHOOK_SECRET?: string;
  MEILISEARCH_HOST?: string;
  MEILISEARCH_MASTER_KEY?: string;
  MEILISEARCH_ADMIN_KEY?: string;
  MEILISEARCH_READONLY_ADMIN_KEY?: string;
  PUBLIC_MEILISEARCH_SEARCH_KEY?: string;
  MEILISEARCH_CHAT_API_KEY?: string;
  MEILISEARCH_PRODUCTS_INDEX?: string;
  MEILISEARCH_COLLECTIONS_INDEX?: string;
  MEILISEARCH_BRANDS_INDEX?: string;
  MEILISEARCH_CATEGORIES_INDEX?: string;
  MEILISEARCH_ARTICLES_INDEX?: string;
  MEILISEARCH_PAGES_INDEX?: string;
  MEILISEARCH_SUGGESTIONS_INDEX?: string;
}
