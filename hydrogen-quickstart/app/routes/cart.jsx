/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET SHOP               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetshop.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file cart.jsx
 * @description Route module: cart — Pawra Pet Shop page or API handler.
 * @author Pawra LLC
 * @website pawrapetshop.com
 */

import {useLoaderData, data} from 'react-router';
import {CartForm, Money} from '@shopify/hydrogen';
import {Link} from 'react-router';
import {CartMain} from '~/components/CartMain';
import {Button} from '~/components/ui/Button';
import {PRIMARY_CTA_CLASSES} from '~/lib/primaryButton';
import {Icon} from '~/components/ui/Icon';
import {PawraProductCard} from '~/components/PawraProductCard';
import {ProductImagePlaceholder} from '~/components/sections/ProductImagePlaceholder';

// ─── SEO Meta ─────────────────────────────────────────────────────────────────

/** Cart page title for browser tab and SEO. */
export const meta = () => {
  return [{title: 'PAWRA | Cart'}];
};

/** Propagate action response headers (cart cookie, redirects) to the client. */
export const headers = ({actionHeaders}) => actionHeaders;

// ─── Cart Action ──────────────────────────────────────────────────────────────

/**
 * Handles all CartForm mutations — add/update/remove lines, discounts, gift cards.
 * Supports optional redirect via `redirectTo` form field after mutation.
 * @param {Route.ActionArgs} args
 */
export async function action({request, context}) {
  const {cart} = context;
  const formData = await request.formData();
  const {action, inputs} = CartForm.getFormInput(formData);

  if (!action) {
    throw new Error('No action provided');
  }

  let status = 200;
  let result;

  // ─── Cart Mutation Dispatch ───
  switch (action) {
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
      discountCodes.push(...inputs.discountCodes);
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
    default:
      throw new Error(`${action} cart action is not defined`);
  }

  const cartId = result?.cart?.id;
  const headers = cartId ? cart.setCartId(result.cart.id) : new Headers();
  const {cart: cartResult, errors, warnings} = result;
  const redirectTo = formData.get('redirectTo') ?? null;

  if (typeof redirectTo === 'string') {
    status = 303;
    headers.set('Location', redirectTo);
  }

  return data({cart: cartResult, errors, warnings, analytics: {cartId}}, {status, headers});
}

// ─── Loader ───────────────────────────────────────────────────────────────────

/**
 * Loads current cart and product recommendations for "Complete your setup".
 * @param {Route.LoaderArgs} args
 */
export async function loader({context}) {
  const {cart, storefront} = context;
  const [cartData, {products}] = await Promise.all([
    cart.get(),
    storefront.query(RECOMMENDATIONS_QUERY, {variables: {first: 2}}),
  ]);
  return {cart: cartData, recommendations: products?.nodes ?? []};
}

// ─── Cart Page ────────────────────────────────────────────────────────────────

/**
 * Full-page cart with line items, order summary sidebar, and cross-sell grid.
 * Renders empty state when cart has no items.
 */
export default function CartPage() {
  const {cart, recommendations} = useLoaderData();
  const hasItems = (cart?.totalQuantity ?? 0) > 0;

  // ─── Empty State ───
  if (!hasItems) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-warm-oat px-4 py-20 text-center">
        <ProductImagePlaceholder label="Empty cart" className="mx-auto h-40 w-40 rounded-xl" />
        <h1 className="mt-8 font-serif text-[2.5rem] text-forest-green">Your cart is empty</h1>
        <p className="mt-3 font-sans text-body-m text-ink/70">
          Looks like you haven&apos;t added anything yet
        </p>
        <Button variant="primary" size="lg" href="/collections" className="mt-8">
          Start Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-warm-oat px-4 py-10 md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-serif text-display-s text-forest-green">Your cart</h1>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* ─── Line Items & Recommendations ─── */}
          <div>
            <CartMain layout="page" cart={cart} showSummary={false} />
            {recommendations.length > 0 && (
              <section className="mt-12 border-t border-forest-green/10 pt-10">
                <h2 className="font-serif text-heading-m text-forest-green">Complete your setup</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {recommendations.map((product, i) => (
                    <PawraProductCard key={product.id} product={product} loading={i < 2 ? 'eager' : undefined} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ─── Order Summary Sidebar ─── */}
          <aside className="h-fit rounded-xl bg-cloud p-6 shadow-md">
            <h2 className="font-serif text-heading-s text-forest-green">Order summary</h2>
            <dl className="mt-6 space-y-3 font-sans text-body-m">
              <div className="flex justify-between">
                <dt className="text-ink/70">Subtotal</dt>
                <dd className="font-mono text-mono-m text-ink">
                  {cart?.cost?.subtotalAmount ? <Money data={cart.cost.subtotalAmount} /> : '—'}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink/70">Shipping</dt>
                <dd className="font-sans text-body-s text-ink/60">Calculated at checkout</dd>
              </div>
            </dl>
            <div className="my-6 border-t border-forest-green/10" />
            <div className="flex justify-between font-mono text-[1.25rem] font-medium text-ink">
              <span>Total</span>
              <span>{cart?.cost?.totalAmount ? <Money data={cart.cost.totalAmount} /> : '—'}</span>
            </div>
            {cart?.checkoutUrl && (
              <a
                href={cart.checkoutUrl}
                className={`mt-6 flex h-[52px] w-full items-center justify-center rounded-md font-sans text-body-l font-medium no-underline ${PRIMARY_CTA_CLASSES}`}
              >
                Checkout
              </a>
            )}
            {/* TODO: Wire Shop Pay accelerated checkout button */}
            <button
              type="button"
              className="mt-3 flex h-[52px] w-full items-center justify-center rounded-md border border-forest-green/20 bg-warm-oat font-sans text-body-m font-medium text-ink reset"
            >
              Shop Pay
            </button>
            <div className="mt-6 flex flex-wrap justify-center gap-4 border-t border-forest-green/10 pt-6">
              <span className="flex items-center gap-1 font-sans text-body-xs text-ink/60">
                <Icon name="shield" size="sm" /> Secure checkout
              </span>
              <span className="flex items-center gap-1 font-sans text-body-xs text-ink/60">
                <Icon name="check" size="sm" /> SSL encrypted
              </span>
              <span className="flex items-center gap-1 font-sans text-body-xs text-ink/60">
                <Icon name="truck" size="sm" /> Free over $75
              </span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

// ─── GraphQL ──────────────────────────────────────────────────────────────────

/** Product recommendations shown below cart line items. */
const RECOMMENDATIONS_QUERY = `#graphql
  query CartRecommendations($country: CountryCode, $language: LanguageCode, $first: Int!) @inContext(country: $country, language: $language) {
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

/** @typedef {import('./+types/cart').Route} Route */
