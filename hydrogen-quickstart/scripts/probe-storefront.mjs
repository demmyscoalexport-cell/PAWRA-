#!/usr/bin/env node
/**
 * Diagnose Storefront API connectivity.
 *   npm run probe:storefront
 */

import {loadEnvFile, getStorefrontCredentials, assertStoreDomainExists} from './loadEnv.js';
import {
  STOREFRONT_API_VERSIONS,
  resolveStorefrontApiVersion,
  storefrontQuery,
} from './storefrontClient.js';

loadEnvFile();

const creds = getStorefrontCredentials();
if (!creds) {
  console.error('Missing PUBLIC_STORE_DOMAIN / PUBLIC_CHECKOUT_DOMAIN or storefront token in .env');
  process.exit(1);
}

console.log('PAWRA Storefront API probe');
console.log(`Domain: ${creds.domain}`);
console.log(`Token: set`);
console.log(`Versions: ${STOREFRONT_API_VERSIONS.join(', ')}\n`);

try {
  await assertStoreDomainExists(creds.domain);
  console.log('✓ Store hostname responds\n');
} catch (err) {
  console.error(`✗ ${err.message}`);
  process.exit(1);
}

try {
  const version = await resolveStorefrontApiVersion(creds.domain, creds.token);
  console.log(`✓ Working API version: ${version}`);

  const {data} = await storefrontQuery({
    domain: creds.domain,
    token: creds.token,
    apiVersion: version,
    query: `{ shop { name } products(first: 3) { nodes { title handle } } }`,
  });

  console.log(`Shop: ${data?.shop?.name ?? 'unknown'}`);
  for (const p of data?.products?.nodes ?? []) {
    console.log(`  • ${p.title} (${p.handle})`);
  }
} catch (err) {
  console.error(`✗ Probe failed: ${err.message}`);
  process.exit(1);
}
