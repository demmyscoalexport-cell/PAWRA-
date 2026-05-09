import axios from 'axios';

const SHOPIFY_STOREFRONT_ENDPOINT = `https://${import.meta.env.VITE_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;

export const shopifyGraphQL = async (query, variables = {}) => {
  try {
    const response = await axios.post(
      SHOPIFY_STOREFRONT_ENDPOINT,
      {
        query,
        variables,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
        },
      }
    );

    if (response.data.errors) {
      console.error('GraphQL Errors:', response.data.errors);
      throw new Error(response.data.errors[0].message);
    }

    return response.data.data;
  } catch (error) {
    console.error('Shopify GraphQL Error:', error);
    throw error;
  }
};
