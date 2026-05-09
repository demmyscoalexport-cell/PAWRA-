const parseNumericPrice = (value) => {
  if (value == null) return 0;
  if (typeof value === 'number') return value;
  return Number.parseFloat(String(value).replace(/[^0-9.]/g, '')) || 0;
};

export const isShopifyConfigured = () => {
  return Boolean(
    import.meta.env.VITE_SHOPIFY_STORE_DOMAIN && import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN
  );
};

const inferSpecies = (node) => {
  const candidates = [
    ...(node.tags || []),
    node.productType || '',
    ...(node.collections?.edges?.map((edge) => edge.node?.handle || '') || []),
  ]
    .join(' ')
    .toLowerCase();

  if (candidates.includes('dog')) return 'dogs';
  if (candidates.includes('cat')) return 'cats';
  return 'all';
};

export const normalizeShopifyProduct = (node) => {
  if (!node) return null;

  const minVariantPrice = node.priceRange?.minVariantPrice;
  const firstVariant = node.variants?.edges?.[0]?.node;
  const firstImage = node.images?.edges?.[0]?.node;

  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description || '',
    shortDescription: node.description || '',
    price: String(minVariantPrice?.amount || firstVariant?.price?.amount || '0'),
    compareAtPrice: firstVariant?.compareAtPrice?.amount || null,
    species: inferSpecies(node),
    category: node.productType || 'General',
    vendor: node.vendor || 'PAWRA',
    productType: node.productType || 'General',
    tags: node.tags || [],
    images:
      node.images?.edges?.map((edge) => ({
        id: edge.node?.id || edge.node?.src,
        src: edge.node?.src,
        altText: edge.node?.altText || node.title,
      })) || [],
    variants:
      node.variants?.edges?.map((edge) => ({
        id: edge.node?.id,
        title: edge.node?.title,
        price: edge.node?.price,
        compareAtPrice: edge.node?.compareAtPrice,
        availableForSale: edge.node?.availableForSale,
        selectedOptions: edge.node?.selectedOptions || [],
      })) || [],
    options:
      node.options?.map((option) => ({
        id: option.id,
        name: option.name,
        values: option.values || [],
      })) || [],
    defaultVariantId: firstVariant?.id || null,
    rating: null,
    reviews: 0,
  };
};

export const normalizeShopifyProductsConnection = (connection) => {
  if (!connection?.edges) return [];
  return connection.edges
    .map((edge) => normalizeShopifyProduct(edge.node))
    .filter(Boolean);
};

export const normalizeShopifyCart = (cart) => {
  if (!cart) return null;

  const lines =
    cart.lines?.edges?.map((edge) => {
      const line = edge.node;
      const merchandise = line?.merchandise;
      const image = merchandise?.product?.images?.edges?.[0]?.node;
      const priceAmount =
        merchandise?.price?.amount || merchandise?.priceV2?.amount || line?.cost?.amountPerQuantity?.amount || '0';

      return {
        id: line.id,
        quantity: line.quantity,
        merchandise: {
          id: merchandise?.id,
          title: merchandise?.title || 'Default',
          selectedOptions: merchandise?.selectedOptions || [],
          price: {
            amount: String(priceAmount),
            currencyCode:
              merchandise?.price?.currencyCode ||
              merchandise?.priceV2?.currencyCode ||
              cart.cost?.subtotalAmount?.currencyCode ||
              'USD',
          },
          product: {
            id: merchandise?.product?.id,
            handle: merchandise?.product?.handle,
            title: merchandise?.product?.title,
            images: image
              ? [
                  {
                    id: image.id || image.src,
                    src: image.src,
                    altText: image.altText || merchandise?.product?.title,
                  },
                ]
              : [],
          },
        },
      };
    }) || [];

  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    lines,
    cost: {
      subtotal: {
        amount: String(cart.cost?.subtotalAmount?.amount || '0'),
        currencyCode: cart.cost?.subtotalAmount?.currencyCode || 'USD',
      },
      total: {
        amount: String(cart.cost?.totalAmount?.amount || '0'),
        currencyCode: cart.cost?.totalAmount?.currencyCode || 'USD',
      },
    },
  };
};

export const toDisplayPrice = (value) => parseNumericPrice(value);
