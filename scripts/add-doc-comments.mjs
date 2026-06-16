/**
 * @file add-doc-comments.mjs
 * @description One-time helper to prepend Pawra Pet Shop file headers (run locally, not at build time).
 * @author Pawra LLC
 * @website pawrapetshop.com
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'hydrogen-quickstart');

const BANNER = `/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET SHOP               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetshop.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */`;

const SKIP = new Set([
  'storefrontapi.generated.d.ts',
  'customer-accountapi.generated.d.ts',
  'env.d.ts',
]);

function describe(rel) {
  const base = path.basename(rel);
  const dir = path.dirname(rel).replace(/\\/g, '/');

  if (base === 'server.js') return 'Oxygen worker entry — routes requests through Hydrogen and React Router 7.';
  if (base === 'vite.config.js') return 'Vite configuration for Hydrogen, mini-oxygen, and React Router plugins.';
  if (base === 'react-router.config.js') return 'React Router 7 config with Shopify Hydrogen preset for Oxygen.';
  if (base === 'tailwind.config.ts') return 'Tailwind CSS design tokens and theme for Pawra Pet Shop.';
  if (base === 'postcss.config.js') return 'PostCSS pipeline for Tailwind and Autoprefixer.';
  if (base === '.graphqlrc.js') return 'GraphQL codegen configuration for Storefront and Customer Account APIs.';
  if (base === 'routes.js') return 'Route manifest — combines Hydrogen routes with file-based flat routes.';
  if (dir === 'app' && base === 'root.jsx') return 'Root layout, global loaders, analytics, and document shell.';
  if (base === 'entry.client.jsx') return 'Client-side hydration entry for the Hydrogen storefront.';
  if (base === 'entry.server.jsx') return 'Server-side render entry with CSP and streaming HTML.';
  if (dir.startsWith('app/routes')) return `Route module: ${base.replace(/\.jsx$/, '')} — Pawra Pet Shop page or API handler.`;
  if (dir.startsWith('app/components/sections')) return `Homepage/marketing section: ${base.replace(/\.jsx$/, '')}.`;
  if (dir.startsWith('app/components/ui')) return `Design system UI primitive: ${base.replace(/\.(tsx|ts)$/, '')}.`;
  if (dir.startsWith('app/components/product')) return `Product detail UI: ${base.replace(/\.jsx$/, '')}.`;
  if (dir.startsWith('app/components')) return `Shared component: ${base.replace(/\.jsx$/, '')}.`;
  if (dir.startsWith('app/lib')) return `Storefront utility module: ${base.replace(/\.js$/, '')}.`;
  if (dir.startsWith('app/graphql')) return `Customer Account GraphQL operation: ${base.replace(/\.js$/, '')}.`;
  return `Pawra Pet Shop source file: ${rel}.`;
}

function headerFor(rel) {
  const file = path.basename(rel);
  return `${BANNER}

/**
 * @file ${file}
 * @description ${describe(rel)}
 * @author Pawra LLC
 * @website pawrapetshop.com
 */

`;
}

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (name === 'node_modules' || name === 'dist' || name === '.git') continue;
      walk(full, acc);
      continue;
    }
    if (!/\.(js|jsx|ts|tsx|mjs)$/.test(name)) continue;
    if (SKIP.has(name)) continue;
    acc.push(full);
  }
  return acc;
}

const files = walk(ROOT);
let updated = 0;

for (const full of files) {
  const rel = path.relative(ROOT, full).replace(/\\/g, '/');
  let content = fs.readFileSync(full, 'utf8');

  if (content.includes('PAWRA PET SHOP') && content.includes('@file')) continue;

  // Preserve shebang or 'use client' if present
  const shebang = content.startsWith('#!') ? content.split('\n')[0] + '\n' : '';
  const body = shebang ? content.slice(shebang.length) : content;

  fs.writeFileSync(full, shebang + headerFor(rel) + body.replace(/^\s+/, ''));
  updated++;
}

console.log(`Updated ${updated} of ${files.length} files.`);
