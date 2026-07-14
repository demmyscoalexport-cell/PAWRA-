#!/usr/bin/env node
/**
 * Verify Shopify Admin API token from .env.
 *   npm run probe:admin
 */

import {loadEnvFile, normalizeStoreDomain} from './loadEnv.js';

loadEnvFile();

const token = process.env.SHOPIFY_ADMIN_API_TOKEN?.replace(/^"|"$/g, '');
const shop =
  normalizeStoreDomain(process.env.PUBLIC_CHECKOUT_DOMAIN) ||
  normalizeStoreDomain(process.env.PUBLIC_STORE_DOMAIN);

if (!token) {
  console.error('Missing SHOPIFY_ADMIN_API_TOKEN in .env');
  process.exit(1);
}
if (!shop) {
  console.error('Missing PUBLIC_CHECKOUT_DOMAIN or PUBLIC_STORE_DOMAIN in .env');
  process.exit(1);
}

const query = `{ shop { name myshopifyDomain } }`;

/** @param {string} apiVersion @param {Record<string, string>} headers */
async function tryAdmin(apiVersion, headers) {
  const url = `https://${shop}/admin/api/${apiVersion}/graphql.json`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json', ...headers},
    body: JSON.stringify({query}),
  });
  const json = await res.json();
  return {res, json};
}

const attempts = [
  ['2026-04', {'X-Shopify-Access-Token': token}],
  ['2026-01', {'X-Shopify-Access-Token': token}],
  ['2026-04', {Authorization: `Bearer ${token}`}],
];

for (const [version, headers] of attempts) {
  const {res, json} = await tryAdmin(version, headers);
  if (res.ok && !json.errors?.length) {
    const shopData = json.data?.shop;
    console.log('✓ Admin API connected');
    console.log(`  Version: ${version}`);
    console.log(`  Shop: ${shopData?.name}`);
    console.log(`  Domain: ${shopData?.myshopifyDomain}`);
    process.exit(0);
  }
}

console.error('✗ Admin API failed — regenerate SHOPIFY_ADMIN_API_TOKEN in Shopify Admin → Apps');
process.exit(1);
