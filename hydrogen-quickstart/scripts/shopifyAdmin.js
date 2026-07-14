import {loadEnvFile, normalizeStoreDomain} from './loadEnv.js';

loadEnvFile();

const API_VERSION = '2026-01';

/** @returns {{ shop: string; token: string }} */
export function getAdminCredentials() {
  const token = process.env.SHOPIFY_ADMIN_API_TOKEN?.replace(/^"|"$/g, '');
  const shop =
    normalizeStoreDomain(process.env.PUBLIC_CHECKOUT_DOMAIN) ||
    normalizeStoreDomain(process.env.PUBLIC_STORE_DOMAIN);

  if (!token) throw new Error('Missing SHOPIFY_ADMIN_API_TOKEN in .env');
  if (!shop) throw new Error('Missing PUBLIC_CHECKOUT_DOMAIN or PUBLIC_STORE_DOMAIN in .env');

  return {shop, token};
}

/**
 * @param {string} query
 * @param {Record<string, unknown>} [variables]
 */
export async function adminGraphql(query, variables = {}) {
  const {shop, token} = getAdminCredentials();
  const url = `https://${shop}/admin/api/${API_VERSION}/graphql.json`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': token,
    },
    body: JSON.stringify({query, variables}),
  });

  const json = await res.json();

  if (!res.ok) {
    const message =
      (Array.isArray(json.errors)
        ? json.errors.map((/** @type {{ message: string }} */ e) => e.message).join('; ')
        : null) || json.message || `HTTP ${res.status}`;
    throw new Error(`Admin API error: ${message}`);
  }

  if (json.errors?.length) {
    const message = json.errors.map((/** @type {{ message: string }} */ e) => e.message).join('; ');
    throw new Error(`Admin API error: ${message}`);
  }

  return json.data;
}
