/**
 * @file taxonomyCollection.js
 * @description Loader helpers for taxonomy collection pages (mock-first).
 */

import {
  buildTaxonomyBreadcrumbs,
  getTaxonomyChildLinks,
  resolveTaxonomyPath,
  TAXONOMY_BY_HANDLE,
  TAXONOMY_ROOTS,
  taxonomyCollectionPath,
} from '~/data/collections';
import {getDealProducts, getMockProductByHandle, getProductsByTag, MOCK_PRODUCTS} from '~/data/products';

/**
 * @param {string} splatOrHandle
 */
export function parseCollectionHandles(splatOrHandle) {
  return String(splatOrHandle || '')
    .split('/')
    .map((part) => part.trim())
    .filter(Boolean);
}

/**
 * @param {string[]} handles
 */
export function loadTaxonomyCollection(handles) {
  if (!handles.length) {
    return {
      kind: 'shop-all',
      title: 'Shop All',
      description: 'Browse every PAWRA category — dogs, cats, pharmacy, and more.',
      breadcrumbs: [
        {label: 'Home', to: '/'},
        {label: 'Shop'},
      ],
      children: TAXONOMY_ROOTS.filter((r) => r.handle !== 'shop-all').map((root) => ({
        handle: root.handle,
        title: root.title,
        description: root.description,
        href: taxonomyCollectionPath([root.handle]),
      })),
      products: [],
      curatedProducts: MOCK_PRODUCTS.slice(0, 8),
      isLeaf: false,
      pathHandles: ['shop-all'],
      node: {handle: 'shop-all', title: 'Shop All', children: []},
    };
  }

  // Alias legacy Shopify handles → taxonomy
  const aliases = {
    all: ['shop-all'],
    frontpage: ['todays-deals'],
    'food-treats': ['dogs', 'dog-food'],
    'beds-comfort': ['dogs', 'dog-beds'],
    'grooming-wellness': ['dogs', 'dog-grooming'],
  };
  const normalized =
    handles.length === 1 && aliases[handles[0]] ? aliases[handles[0]] : handles;

  if (normalized.length === 1 && normalized[0] === 'shop-all') {
    return loadTaxonomyCollection([]);
  }

  if (normalized.length === 1 && normalized[0] === 'todays-deals') {
    const resolved = resolveTaxonomyPath(['todays-deals']);
    const products = getDealProducts();
    return {
      kind: 'deals',
      title: resolved.node.title,
      description: resolved.node.description,
      breadcrumbs: buildTaxonomyBreadcrumbs(resolved.ancestors, resolved.node, resolved.pathHandles),
      children: [],
      products,
      curatedProducts: [],
      isLeaf: true,
      pathHandles: resolved.pathHandles,
      node: resolved.node,
    };
  }

  const resolved = resolveTaxonomyPath(normalized);
  if (!resolved) {
    // Try single-handle deep lookup (leaf handle without full path)
    if (normalized.length === 1) {
      const hit = TAXONOMY_BY_HANDLE.get(normalized[0]);
      if (hit) {
        return loadTaxonomyCollection(hit.pathHandles);
      }
    }
    return null;
  }

  const {node, ancestors, pathHandles} = resolved;
  const isLeaf = !node.children?.length;
  const children = getTaxonomyChildLinks(node, pathHandles);
  const products = isLeaf ? getProductsByTag(node.handle) : [];
  const curatedProducts = !isLeaf ? getProductsByTag(node.handle).slice(0, 8) : [];

  return {
    kind: 'taxonomy',
    title: node.title,
    description: node.description || `Shop ${node.title} at PAWRA.`,
    breadcrumbs: buildTaxonomyBreadcrumbs(ancestors, node, pathHandles),
    children,
    products,
    curatedProducts,
    isLeaf,
    pathHandles,
    node,
  };
}

export {getMockProductByHandle, MOCK_PRODUCTS};
