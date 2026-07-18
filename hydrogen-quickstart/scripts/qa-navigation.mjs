#!/usr/bin/env node
/**
 * Smoke-test navigation URLs on a running or deployed PAWRA storefront.
 *   npm run qa:nav
 *   npm run qa:nav -- https://pawrapercares.com
 */

const base = (process.argv[2] || process.env.PAWRA_QA_BASE_URL || 'http://localhost:3000').replace(/\/$/, '');

const PATHS = [
  '/',
  '/collections/all',
  '/collections/dogs',
  '/collections/cats',
  '/collections/food-treats',
  '/collections/beds-comfort',
  '/collections/grooming-wellness',
  '/collections/frontpage',
  '/pages/about',
  '/pages/how-it-works',
  '/pages/contact',
  '/pages/subscribe-and-save',
  '/pages/size-guide',
  '/blog',
  '/search',
  '/cart',
  '/account/login',
  '/policies',
  '/policies/shipping-policy',
  '/policies/refund-policy',
];

async function check(path) {
  const url = `${base}${path}`;
  try {
    const res = await fetch(url, {redirect: 'follow'});
    const ok = res.status >= 200 && res.status < 400;
    return {path, status: res.status, ok};
  } catch (err) {
    return {path, status: 0, ok: false, error: err.message};
  }
}

console.log(`PAWRA navigation QA — ${base}\n`);

const results = await Promise.all(PATHS.map(check));
let failed = 0;

for (const r of results) {
  const icon = r.ok ? '✓' : '✗';
  if (!r.ok) failed++;
  console.log(`${icon} ${r.status || 'ERR'} ${r.path}${r.error ? ` (${r.error})` : ''}`);
}

console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
