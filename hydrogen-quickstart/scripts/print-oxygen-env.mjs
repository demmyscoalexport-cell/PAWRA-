#!/usr/bin/env node
/**
 * Print env vars to mirror in Shopify Admin → Hydrogen → Environment variables.
 *   npm run oxygen:env-checklist
 */

import {loadEnvFile} from './loadEnv.js';

loadEnvFile();

const KEYS = [
  'SESSION_SECRET',
  'PUBLIC_STOREFRONT_API_TOKEN',
  'PUBLIC_STORE_DOMAIN',
  'PUBLIC_STOREFRONT_ID',
  'PRIVATE_STOREFRONT_API_TOKEN',
  'PUBLIC_CHECKOUT_DOMAIN',
  'PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID',
  'PUBLIC_CUSTOMER_ACCOUNT_API_URL',
  'SHOPIFY_WEBHOOK_SECRET',
  'SHOPIFY_ADMIN_API_TOKEN',
  'PUBLIC_CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_URL',
  'WAVESPEED_API_KEY',
  'PUBLIC_JUDGEME_SHOP_DOMAIN',
  'JUDGEME_API_TOKEN',
  'PUBLIC_KLAVIYO_COMPANY_ID',
  'PUBLIC_GA4_MEASUREMENT_ID',
  'PUBLIC_SWYM_STORE_ID',
  'PUBLIC_SWYM_WISHLIST_URL',
  'PUBLIC_SMILE_PUBLISHABLE_KEY',
  'PUBLIC_SMILE_REWARDS_URL',
  'PUBLIC_GORGIAS_WIDGET_ID',
  'PUBLIC_LOOP_RETURNS_URL',
  'PUBLIC_RECHARGE_STORE_IDENTIFIER',
];

console.log('PAWRA Oxygen environment checklist\n');
console.log('Copy each value from .env into Shopify Admin → Hydrogen → Environment variables.\n');

for (const key of KEYS) {
  const value = process.env[key];
  const status = value ? '✓ set' : '○ empty';
  console.log(`${status.padEnd(8)} ${key}`);
}

console.log('\nRegenerate SHOPIFY_ADMIN_API_TOKEN if npm run probe:admin fails.');
console.log('Set PRIVATE_STOREFRONT_API_TOKEN from Headless channel → Storefront API tokens.');
