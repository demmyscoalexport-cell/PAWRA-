/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET SHOP               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetshop.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file products.$handle.jsx
 * @description Route module: products.$handle — Pawra Pet Shop page or API handler.
 * @author Pawra LLC
 * @website pawrapetshop.com
 */

import {useLoaderData} from 'react-router';
import {
  getSelectedProductOptions,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useOptimisticVariant,
  useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import {PawraProductPage} from '~/components/product/PawraProductPage';

// ─── SEO Meta ─────────────────────────────────────────────────────────────────

/**
 * Product page meta — dynamic title and canonical URL from loader data.
 * @param {{data: {product?: {title?: string; handle?: string}}}} args
 */
export const meta = ({data}) => {
  return [
    {title: `PAWRA | ${data?.product.title ?? 'Product'}`},
    {rel: 'canonical', href: `/products/${data?.product.handle}`},
  ];
};

// ─── Loader ───────────────────────────────────────────────────────────────────

/**
 * Fetches product by handle and a small set of related products for cross-sell.
 * Redirects localized handles and 404s when product is missing.
 * @param {Route.LoaderArgs} args
 */
export async function loader({context, params, request}) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const [{product}, {products: relatedProducts}] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: {handle, selectedOptions: getSelectedProductOptions(request)},
    }),
    storefront.query(RELATED_QUERY, {variables: {first: 4}}),
  ]);

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  redirectIfHandleIsLocalized(request, {handle, data: product});

  return {
    product,
    relatedProducts: relatedProducts?.nodes?.filter((p) => p.handle !== handle) ?? [],
  };
}

// ─── Product Route Component ──────────────────────────────────────────────────

/**
 * Product detail route — resolves selected variant from URL options and
 * delegates rendering to PawraProductPage.
 */
export default function Product() {
  const {product, relatedProducts} = useLoaderData();

  // ─── Variant Selection ───
  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  return (
    <PawraProductPage
      product={product}
      selectedVariant={selectedVariant}
      productOptions={productOptions}
      relatedProducts={relatedProducts}
    />
  );
}

// ─── GraphQL Fragments & Queries ──────────────────────────────────────────────

/** Variant fields shared across product, selected, and adjacent variants. */
const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
`;

/** Full product shape including images, options, swatches, and SEO. */
const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    productType
    tags
    descriptionHtml
    description
    encodedVariantExistence
    encodedVariantAvailability
    images(first: 8) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariant
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    adjacentVariants (selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

/** Primary product query — keyed by handle with selected option context. */
const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
`;

/** Related products — first N catalog items excluding current handle in loader. */
const RELATED_QUERY = `#graphql
  query RelatedProducts($country: CountryCode, $language: LanguageCode, $first: Int!) @inContext(country: $country, language: $language) {
    products(first: $first) {
      nodes {
        id
        handle
        title
        featuredImage {
          url
          altText
          width
          height
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

/** @typedef {import('./+types/products.$handle').Route} Route */
