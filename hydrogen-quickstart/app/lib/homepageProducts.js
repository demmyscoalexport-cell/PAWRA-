/**
 * Homepage product sections — shared Storefront API query.
 */

export const HOMEPAGE_PRODUCT_FRAGMENT = `#graphql
  fragment MoneyHomepageProduct on MoneyV2 {
    amount
    currencyCode
  }
  fragment HomepageProduct on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyHomepageProduct
      }
    }
  }
`;

export const HOMEPAGE_PRODUCTS_QUERY = `#graphql
  ${HOMEPAGE_PRODUCT_FRAGMENT}
  query HomepageProducts($country: CountryCode, $language: LanguageCode, $first: Int!) @inContext(country: $country, language: $language) {
    products(first: $first, sortKey: BEST_SELLING) {
      nodes {
        ...HomepageProduct
      }
    }
  }
`;

export const HOMEPAGE_COLLECTION_QUERY = `#graphql
  ${HOMEPAGE_PRODUCT_FRAGMENT}
  query HomepageCollection($handle: String!, $country: CountryCode, $language: LanguageCode, $first: Int!) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      title
      products(first: $first) {
        nodes {
          ...HomepageProduct
        }
      }
    }
  }
`;

/** @typedef {import('storefrontapi.generated').HomepageProductFragment} HomepageProduct */
