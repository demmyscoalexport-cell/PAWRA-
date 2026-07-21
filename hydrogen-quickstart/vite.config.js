/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET SHOP               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetshop.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file vite.config.js
 * @description Vite configuration for Hydrogen, mini-oxygen, and React Router plugins.
 * @author Pawra LLC
 * @website pawrapetshop.com
 */

/**
 * Vite configuration for PAWRA Pet Shop Hydrogen storefront.
 * Integrates Hydrogen, Mini Oxygen (local dev), and React Router 7.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { hydrogen } from '@shopify/hydrogen/vite';
import { oxygen } from '@shopify/mini-oxygen/vite';
import { reactRouter } from '@react-router/dev/vite';

// ─── Path Aliases ─────────────────────────────────────────────────────────────

const appDirectory = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  'app',
);

// ─── Vite Config ──────────────────────────────────────────────────────────────

/** @see https://vitejs.dev/config/ */
export default defineConfig({
  plugins: [hydrogen(), oxygen(), reactRouter()],
  resolve: {
    tsconfigPaths: true,
    alias: {
      /** Maps `~/` imports to the `app/` directory. */
      '~': appDirectory,
    },
  },
  build: {
    // Allow a strict Content-Security-Policy
    // without inlining assets as base64:
    assetsInlineLimit: 0,
  },
  ssr: {
    optimizeDeps: {
      /**
       * Include dependencies here if they throw CJS<>ESM errors.
       * For example, for the following error:
       *
       * > ReferenceError: module is not defined
       * >   at /Users/.../node_modules/example-dep/index.js:1:1
       *
       * Include 'example-dep' in the array below.
       * @see https://vitejs.dev/config/dep-optimization-options
       */
      include: [
        'react-router > set-cookie-parser',
        'react-router > cookie',
        'react-router',
        '@judgeme/shopify-hydrogen',
      ],
    },
  },
  server: {
    /** Allow Hydrogen preview tunnel hosts during local development. */
    allowedHosts: ['.tryhydrogen.dev'],
  },
});
