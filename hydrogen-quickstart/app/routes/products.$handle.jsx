/**
 * @file products.$handle.jsx
 * @description Product detail route with related products and reviews.
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
import {MockProductDetail} from '~/components/product/MockProductDetail';
import {GorgiasPageContext} from '~/components/gorgias/GorgiasPageContext';
import {getIntegrations} from '~/lib/integrations';
import {fetchJudgeMeProductReviews} from '~/lib/judgeme';
import {getMockProductByHandle, getProductsByTag} from '~/data/products';
import {
  breadcrumbJsonLd,
  buildSeoMeta,
  DEFAULT_DESCRIPTION,
  productJsonLd,
} from '~/lib/seo';

export const meta = ({data}) => {
  const product = data?.product;
  const variant = product?.selectedOrFirstAvailableVariant;
  const title = product?.seo?.title || product?.title || 'Product';
  const description =
    product?.seo?.description || product?.description || DEFAULT_DESCRIPTION;
  const image =
    variant?.image?.url ||
    product?.images?.nodes?.[0]?.url ||
    product?.featuredImage?.url;
  const handle = product?.handle;

  return buildSeoMeta({
    title,
    description,
    url: handle ? `/products/${handle}` : undefined,
    media: image
      ? {
          url: image,
          type: 'image',
          altText: product?.title || title,
          width: variant?.image?.width || product?.images?.nodes?.[0]?.width || product?.featuredImage?.width,
          height: variant?.image?.height || product?.images?.nodes?.[0]?.height || product?.featuredImage?.height,
        }
      : undefined,
    jsonLd: [
      breadcrumbJsonLd([
        {label: 'Home', to: '/'},
        {label: 'Shop', to: '/collections'},
        {label: product?.title || title, to: handle ? `/products/${handle}` : undefined},
      ]),
      data?.isMock
        ? null
        : productJsonLd({
            product,
            selectedVariant: variant,
            reviews: data?.reviews,
          }),
    ].filter(Boolean),
  });
};

export async function loader({context, params, request}) {
  const {handle} = params;
  const {storefront, env} = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  let product = null;
  let relatedResult = null;

  try {
    [{product}, relatedResult] = await Promise.all([
      storefront.query(PRODUCT_QUERY, {
        variables: {handle, selectedOptions: getSelectedProductOptions(request)},
      }),
      storefront.query(RELATED_QUERY, {
        variables: {handle, selectedOptions: getSelectedProductOptions(request)},
      }),
    ]);
  } catch {
    product = null;
  }

  if (!product?.id) {
    const mock = getMockProductByHandle(handle);
    if (!mock) {
      throw new Response(null, {status: 404});
    }
    const leafTag = [...(mock.tags || [])].reverse().find(Boolean);
    const related = getProductsByTag(leafTag || 'dogs')
      .filter((p) => p.handle !== handle)
      .slice(0, 4);
    return {
      product: mock,
      relatedProducts: related,
      reviews: null,
      isMock: true,
    };
  }

  redirectIfHandleIsLocalized(request, {handle, data: product});

  const integrations = getIntegrations(env);
  const reviews = integrations.judgeMe.apiEnabled
    ? await fetchJudgeMeProductReviews(integrations.judgeMe, product)
    : null;

  const recommendations =
    relatedResult?.productRecommendations?.filter((p) => p.handle !== handle) ?? [];

  return {
    product,
    relatedProducts: recommendations.slice(0, 4),
    reviews,
    isMock: false,
  };
}

export default function Product() {
  const {product, relatedProducts, reviews, isMock} = useLoaderData();

  const selectedVariant = useOptimisticVariant(
    isMock ? null : product.selectedOrFirstAvailableVariant,
    isMock ? [] : getAdjacentAndFirstAvailableVariants(product),
  );

  useSelectedOptionInUrlParam(isMock ? [] : selectedVariant?.selectedOptions);

  if (isMock) {
    return <MockProductDetail product={product} relatedProducts={relatedProducts} />;
  }

  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  return (
    <>
      <GorgiasPageContext
        pageType="product"
        product={{
          id: product.id,
          title: product.title,
          handle: product.handle,
          price: selectedVariant?.price?.amount,
        }}
      />
      <PawraProductPage
        product={product}
        selectedVariant={selectedVariant}
        productOptions={productOptions}
        relatedProducts={relatedProducts}
        reviews={reviews}
      />
    </>
  );
}

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

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    productType
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

const RELATED_PRODUCT_FRAGMENT = `#graphql
  fragment RelatedProduct on Product {
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
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
  }
`;

const RELATED_QUERY = `#graphql
  query RelatedProducts(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
    }
    productRecommendations(productHandle: $handle) {
      ...RelatedProduct
    }
  }
  ${RELATED_PRODUCT_FRAGMENT}
`;

/** @typedef {import('./+types/products.$handle').Route} Route */
