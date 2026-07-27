/**
 * @file cart.jsx
 * @description Enterprise cart page — unified summary, trust, recommendations.
 */

import {useLoaderData, data, Link} from 'react-router';
import {CartForm, Money} from '@shopify/hydrogen';
import {CartMain} from '~/components/CartMain';
import {CartSummary} from '~/components/CartSummary';
import {CartErrors} from '~/components/cart/CartErrors';
import {Button} from '~/components/ui/Button';
import {PRIMARY_CTA_CLASSES} from '~/lib/primaryButton';
import {PawraProductCard} from '~/components/PawraProductCard';
import {ProductImagePlaceholder} from '~/components/sections/ProductImagePlaceholder';
import {buildSeoMeta} from '~/lib/seo';

/** Cart is private — keep out of search indexes. */
export const meta = () => {
  return buildSeoMeta({
    title: 'Cart',
    description: 'Your PAWRA shopping cart.',
    url: '/cart',
    robots: {noIndex: true, noFollow: true},
  });
};

/** Propagate action response headers (cart cookie, redirects) to the client. */
export const headers = ({actionHeaders}) => actionHeaders;

/**
 * Handles all CartForm mutations — add/update/remove lines, discounts, gift cards, notes.
 * @param {Route.ActionArgs} args
 */
export async function action({request, context}) {
  const {cart} = context;
  const formData = await request.formData();
  const {action: cartAction, inputs} = CartForm.getFormInput(formData);

  if (!cartAction) {
    throw new Error('No action provided');
  }

  let status = 200;
  let result;

  switch (cartAction) {
    case CartForm.ACTIONS.LinesAdd:
      result = await cart.addLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesUpdate:
      result = await cart.updateLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesRemove:
      result = await cart.removeLines(inputs.lineIds);
      break;
    case CartForm.ACTIONS.DiscountCodesUpdate: {
      const formDiscountCode = inputs.discountCode;
      const discountCodes = formDiscountCode ? [formDiscountCode] : [];
      discountCodes.push(...(inputs.discountCodes || []));
      result = await cart.updateDiscountCodes(discountCodes);
      break;
    }
    case CartForm.ACTIONS.GiftCardCodesAdd: {
      const formGiftCardCode = inputs.giftCardCode;
      const giftCardCodes = formGiftCardCode ? [formGiftCardCode] : [];
      result = await cart.addGiftCardCodes(giftCardCodes);
      break;
    }
    case CartForm.ACTIONS.GiftCardCodesRemove: {
      result = await cart.removeGiftCardCodes(inputs.giftCardCodes);
      break;
    }
    case CartForm.ACTIONS.BuyerIdentityUpdate: {
      result = await cart.updateBuyerIdentity({...inputs.buyerIdentity});
      break;
    }
    case CartForm.ACTIONS.NoteUpdate: {
      result = await cart.updateNote(inputs.note ?? '');
      break;
    }
    default:
      throw new Error(`${cartAction} cart action is not defined`);
  }

  const cartId = result?.cart?.id;
  const headersOut = cartId ? cart.setCartId(result.cart.id) : new Headers();
  const {cart: cartResult, errors, warnings} = result;
  const redirectTo = formData.get('redirectTo') ?? null;

  if (typeof redirectTo === 'string') {
    status = 303;
    headersOut.set('Location', redirectTo);
  }

  return data(
    {cart: cartResult, errors, warnings, analytics: {cartId}},
    {status, headers: headersOut},
  );
}

/**
 * Loads current cart and product recommendations for "Complete your setup".
 * @param {Route.LoaderArgs} args
 */
export async function loader({context}) {
  const {cart, storefront} = context;
  const cartData = await cart.get();
  const firstProductId = cartData?.lines?.nodes?.[0]?.merchandise?.product?.id;

  let recommendations = [];
  if (firstProductId) {
    const {productRecommendations} = await storefront.query(PRODUCT_RECOMMENDATIONS_QUERY, {
      variables: {productId: firstProductId},
      cache: storefront.CacheShort(),
    });
    recommendations = (productRecommendations || []).slice(0, 4);
  }

  if (recommendations.length < 2) {
    const {products} = await storefront.query(RECOMMENDATIONS_QUERY, {
      variables: {first: 4},
      cache: storefront.CacheShort(),
    });
    const fallback = products?.nodes ?? [];
    const existing = new Set(recommendations.map((p) => p.id));
    for (const product of fallback) {
      if (existing.has(product.id)) continue;
      recommendations.push(product);
      if (recommendations.length >= 4) break;
    }
  }

  return {cart: cartData, recommendations};
}

/**
 * Full-page cart with line items, enterprise order summary, and cross-sell grid.
 */
export default function CartPage() {
  const {cart, recommendations} = useLoaderData();
  const hasItems = (cart?.totalQuantity ?? 0) > 0;

  if (!hasItems) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-page-bg px-4 py-24 text-center">
        <ProductImagePlaceholder label="Empty cart" className="mx-auto h-40 w-40 rounded-lg" />
        <h1 className="mt-8 font-serif text-display-s text-action-primary">Your cart is empty</h1>
        <p className="mt-3 font-sans text-body-m text-text-secondary">
          Find food, treats, beds, and care essentials for dogs and cats.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button variant="primary" size="lg" href="/collections/dogs">
            Shop Dogs
          </Button>
          <Button variant="secondary" size="lg" href="/collections/cats">
            Shop Cats
          </Button>
        </div>
        <Link
          to="/track-order"
          className="mt-6 font-sans text-body-s text-text-secondary no-underline hover:text-action-primary"
        >
          Track an existing order →
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-page-bg px-4 py-10 pb-28 md:px-10 md:py-16 md:pb-16">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-serif text-display-s text-action-primary">Your cart</h1>
        <p className="mt-2 font-sans text-body-m text-text-secondary">
          {(cart?.totalQuantity ?? 0)} item{(cart?.totalQuantity ?? 0) === 1 ? '' : 's'} · Review and checkout securely
        </p>

        <CartErrors className="mt-6" />

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <CartMain layout="page" cart={cart} showSummary={false} />
            {recommendations.length > 0 && (
              <section className="mt-12 border-t border-border-subtle pt-10">
                <h2 className="font-serif text-heading-m text-action-primary">Complete your setup</h2>
                <p className="mt-2 font-sans text-body-s text-text-secondary">
                  Recommended with items in your cart.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {recommendations.map((product, i) => (
                    <PawraProductCard
                      key={product.id}
                      product={product}
                      loading={i < 2 ? 'eager' : undefined}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside>
            <CartSummary layout="page" cart={cart} />
          </aside>
        </div>
      </div>

      {/* Mobile sticky checkout */}
      {cart?.checkoutUrl ? (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border-subtle bg-surface/95 px-4 py-3 shadow-md backdrop-blur-md md:hidden">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="font-sans text-body-xs text-text-secondary">Total</p>
              <p className="font-mono text-mono-m font-semibold text-action-primary">
                {cart?.cost?.totalAmount ? <Money data={cart.cost.totalAmount} /> : '—'}
              </p>
            </div>
            <a
              href={cart.checkoutUrl}
              className={`inline-flex h-12 flex-1 items-center justify-center rounded-md font-sans text-body-m font-semibold no-underline ${PRIMARY_CTA_CLASSES}`}
            >
              Checkout
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}

const PRODUCT_CARD_FIELDS = `
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
`;

const PRODUCT_RECOMMENDATIONS_QUERY = `#graphql
  query CartProductRecommendations($productId: ID!, $country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    productRecommendations(productId: $productId) {
      ${PRODUCT_CARD_FIELDS}
    }
  }
`;

const RECOMMENDATIONS_QUERY = `#graphql
  query CartRecommendationsFallback($country: CountryCode, $language: LanguageCode, $first: Int!)
    @inContext(country: $country, language: $language) {
    products(first: $first) {
      nodes {
        ${PRODUCT_CARD_FIELDS}
      }
    }
  }
`;

/** @typedef {import('./+types/cart').Route} Route */
