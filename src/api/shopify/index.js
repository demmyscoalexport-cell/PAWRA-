import { shopifyGraphQL } from '@/lib/shopify';
import * as QUERIES from './queries';

// Product Services
export const getProducts = async (first = 20, after = null) => {
  try {
    const data = await shopifyGraphQL(QUERIES.GET_PRODUCTS, {
      first,
      after,
    });
    return data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductByHandle = async (handle) => {
  try {
    const data = await shopifyGraphQL(QUERIES.GET_PRODUCT_BY_HANDLE, {
      handle,
    });
    return data.productByHandle;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// Collection Services
export const getCollectionByHandle = async (handle, first = 20, after = null) => {
  try {
    const data = await shopifyGraphQL(QUERIES.GET_COLLECTION_BY_HANDLE, {
      handle,
      first,
      after,
    });
    return data.collectionByHandle;
  } catch (error) {
    console.error('Error fetching collection:', error);
    throw error;
  }
};

export const getCollections = async (first = 20, after = null) => {
  try {
    const data = await shopifyGraphQL(QUERIES.GET_COLLECTIONS, {
      first,
      after,
    });
    return data.collections;
  } catch (error) {
    console.error('Error fetching collections:', error);
    throw error;
  }
};

// Search Services
export const searchProducts = async (query, first = 10) => {
  try {
    const data = await shopifyGraphQL(QUERIES.GET_SEARCH_RESULTS, {
      query,
      first,
    });
    return data.search;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

// Cart Services
export const getCart = async (cartId) => {
  try {
    const data = await shopifyGraphQL(QUERIES.GET_CART, {
      cartId,
    });
    return data.cart;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

export const createCart = async (lines = []) => {
  try {
    const data = await shopifyGraphQL(QUERIES.CREATE_CART, {
      input: {
        lines,
      },
    });
    if (data.cartCreate?.userErrors?.length) {
      throw new Error(data.cartCreate.userErrors[0].message);
    }
    return data.cartCreate.cart;
  } catch (error) {
    console.error('Error creating cart:', error);
    throw error;
  }
};

export const addToCart = async (cartId, lines) => {
  try {
    const data = await shopifyGraphQL(QUERIES.ADD_TO_CART, {
      cartId,
      lines,
    });
    if (data.cartLinesAdd?.userErrors?.length) {
      throw new Error(data.cartLinesAdd.userErrors[0].message);
    }
    return data.cartLinesAdd.cart;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const removeFromCart = async (cartId, lineIds) => {
  try {
    const data = await shopifyGraphQL(QUERIES.REMOVE_FROM_CART, {
      cartId,
      lineIds,
    });
    if (data.cartLinesRemove?.userErrors?.length) {
      throw new Error(data.cartLinesRemove.userErrors[0].message);
    }
    return data.cartLinesRemove.cart;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

export const updateCartLines = async (cartId, lines) => {
  try {
    const data = await shopifyGraphQL(QUERIES.UPDATE_CART_LINES, {
      cartId,
      lines,
    });
    if (data.cartLinesUpdate?.userErrors?.length) {
      throw new Error(data.cartLinesUpdate.userErrors[0].message);
    }
    return data.cartLinesUpdate.cart;
  } catch (error) {
    console.error('Error updating cart lines:', error);
    throw error;
  }
};

// Customer Services
export const getCustomer = async (customerAccessToken) => {
  try {
    const data = await shopifyGraphQL(QUERIES.GET_CUSTOMER, {
      customerAccessToken,
    });
    return data.customer;
  } catch (error) {
    console.error('Error fetching customer:', error);
    throw error;
  }
};

export const createCustomer = async (input) => {
  try {
    const data = await shopifyGraphQL(QUERIES.CUSTOMER_CREATE, {
      input,
    });
    return data.customerCreate;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
};

export const createCustomerAccessToken = async (email, password) => {
  try {
    const data = await shopifyGraphQL(QUERIES.CUSTOMER_ACCESS_TOKEN_CREATE, {
      input: {
        email,
        password,
      },
    });
    return data.customerAccessTokenCreate;
  } catch (error) {
    console.error('Error creating access token:', error);
    throw error;
  }
};
