import {readFileSync, existsSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const projectRoot = join(__dirname, '..');

/** @param {string} envPath */
function parseEnvFile(envPath) {
  if (!existsSync(envPath)) return false;
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
  return true;
}

/** Load hydrogen-quickstart/.env, then repo root .env as fallback (does not overwrite). */
export function loadEnvFile() {
  const loadedLocal = parseEnvFile(join(projectRoot, '.env'));
  const loadedRoot = parseEnvFile(join(projectRoot, '..', '.env'));
  return loadedLocal || loadedRoot;
}

/** @param {string | undefined} domain */
export function normalizeStoreDomain(domain) {
  return (domain || '').replace(/^https?:\/\//, '').replace(/\/$/, '').trim();
}

/** Admin/Oxygen tokens must never be sent to the Storefront API. */
function isStorefrontAccessToken(token) {
  if (!token) return false;
  if (token.startsWith('shpat_') || token.startsWith('shpca_')) return false;
  if (token.startsWith('atkn_')) return false;
  return true;
}

/** @returns {{ domain: string; token: string } | null} */
export function getStorefrontCredentials() {
  const domain =
    normalizeStoreDomain(process.env.PUBLIC_STORE_DOMAIN) ||
    normalizeStoreDomain(process.env.PUBLIC_CHECKOUT_DOMAIN);
  const publicToken = process.env.PUBLIC_STOREFRONT_API_TOKEN;
  const privateToken = process.env.PRIVATE_STOREFRONT_API_TOKEN;
  const token =
    (isStorefrontAccessToken(privateToken) ? privateToken : null) ||
    (isStorefrontAccessToken(publicToken) ? publicToken : null);

  if (!domain || !token) return null;
  return {domain, token};
}

/**
 * @param {string} domain
 */
export async function assertStoreDomainExists(domain) {
  const res = await fetch(`https://${domain}/`, {redirect: 'manual'});
  if (res.status === 404) {
    throw new Error(
      `Shop "${domain}" returned HTTP 404 — verify PUBLIC_STORE_DOMAIN or PUBLIC_CHECKOUT_DOMAIN in .env.`,
    );
  }
}
