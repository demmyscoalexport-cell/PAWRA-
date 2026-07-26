/**
 * Lightweight Customer Account query for Gorgias identify (email + name).
 */
export const GORGIAS_CUSTOMER_QUERY = `#graphql
  query GorgiasCustomer($language: LanguageCode) @inContext(language: $language) {
    customer {
      id
      firstName
      lastName
      emailAddress {
        emailAddress
      }
    }
  }
`;
