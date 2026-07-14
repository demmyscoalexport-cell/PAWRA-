/**
 * Shared Storefront API client for PAWRA audit/verify scripts.
 */

/** @type {readonly string[]} */
export const STOREFRONT_API_VERSIONS = [
  '2026-04',
  '2026-01',
  '2025-10',
  '2025-07',
  '2025-01',
  '2024-10',
];

export const DEFAULT_STOREFRONT_API_VERSION = STOREFRONT_API_VERSIONS[0];

/**
 * @param {string} domain
 * @param {string} token
 * @param {string} apiVersion
 */
export function storefrontEndpoint(domain, token, apiVersion) {
  return {
    url: `https://${domain}/api/${apiVersion}/graphql.json`,
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
  };
}

/**
 * @param {string} domain
 * @param {string} token
 * @param {readonly string[]} [versions]
 */
export async function resolveStorefrontApiVersion(domain, token, versions = STOREFRONT_API_VERSIONS) {
  const probeQuery = '{ shop { name } }';

  for (const version of versions) {
    const {url, headers} = storefrontEndpoint(domain, token, version);
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({query: probeQuery}),
    });

    if (res.status === 404) continue;

    const body = await res.text();
    let json;
    try {
      json = JSON.parse(body);
    } catch {
      throw new Error(
        `Storefront API ${version} returned HTTP ${res.status} with non-JSON body.`,
      );
    }

    if (res.status === 401 || res.status === 403) {
      throw new Error(
        `Storefront API ${version} rejected the access token (HTTP ${res.status}).`,
      );
    }

    if (!res.ok) {
      throw new Error(`Storefront API ${version} HTTP ${res.status}: ${body.slice(0, 200)}`);
    }

    if (json.errors?.length) {
      throw new Error(json.errors.map((e) => e.message).join('; '));
    }

    return version;
  }

  throw new Error(`Storefront API unreachable for ${domain}.`);
}

/**
 * @param {{ domain: string; token: string; apiVersion?: string; query: string; variables?: Record<string, unknown> }} opts
 */
export async function storefrontQuery({domain, token, apiVersion, query, variables = {}}) {
  const version =
    apiVersion ?? (await resolveStorefrontApiVersion(domain, token));
  const {url, headers} = storefrontEndpoint(domain, token, version);
  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({query, variables}),
  });

  const body = await res.text();
  let json;
  try {
    json = JSON.parse(body);
  } catch {
    throw new Error(`Storefront API HTTP ${res.status}: ${body.slice(0, 200)}`);
  }

  if (res.status === 401 || res.status === 403) {
    throw new Error(`Storefront API auth failed (HTTP ${res.status}).`);
  }

  if (!res.ok) {
    throw new Error(`Storefront API HTTP ${res.status}: ${body.slice(0, 200)}`);
  }

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join('; '));
  }

  return {data: json.data, apiVersion: version};
}
