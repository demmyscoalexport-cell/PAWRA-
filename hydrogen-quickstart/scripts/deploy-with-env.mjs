#!/usr/bin/env node
/**
 * Deploy to Oxygen using SHOPIFY_HYDROGEN_DEPLOYMENT_TOKEN from .env
 *   npm run deploy:env
 */
import {execSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';
import {loadEnvFile} from './loadEnv.js';

loadEnvFile();

const token = process.env.SHOPIFY_HYDROGEN_DEPLOYMENT_TOKEN;
if (!token) {
  console.error('Missing SHOPIFY_HYDROGEN_DEPLOYMENT_TOKEN in .env');
  process.exit(1);
}

console.log(`Using Oxygen token (${token.length} chars) from .env`);

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

try {
  execSync(
    [
      'npm exec -- shopify hydrogen deploy',
      `--token "${token}"`,
      '--no-lockfile-check',
      '--build-command "node scripts/noop-build.mjs"',
      '--metadata-user env-deploy',
      '--metadata-description Deploy-via-env-token',
      '--force',
    ].join(' '),
    {
      stdio: 'inherit',
      cwd: root,
      env: {...process.env, CI: 'true', SHOPIFY_HYDROGEN_DEPLOYMENT_TOKEN: token},
      shell: true,
    },
  );
} catch {
  process.exit(1);
}
