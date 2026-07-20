/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET SHOP               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetshop.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file CartMain.jsx
 * @description Shared component: CartMain.
 * @author Pawra LLC
 * @website pawrapetshop.com
 */

import { useOptimisticCart } from '@shopify/hydrogen';
import { Link } from 'react-router';
import { useAside } from '~/components/Aside';
import { CartLineItem } from '~/components/CartLineItem';
import { FreeShippingProgress } from '~/components/FreeShippingProgress';
import { CartSummary } from './CartSummary';
/**
 * Returns a map of all line items and their children.
 * @param {CartLine[]} lines
 * @return {import("C:/pwara e commerce headless store/hydrogen-quickstart/app/components/CartMain").LineItemChildrenMap}
 */
function getLineItemChildrenMap(lines) {
  const children = {};
  for (const line of lines) {
    if ('parentRelationship' in line && line.parentRelationship?.parent) {
      const parentId = line.parentRelationship.parent.id;
      if (!children[parentId]) children[parentId] = [];
      children[parentId].push(line);
    }
    if ('lineComponents' in line) {
      const lineChildren = getLineItemChildrenMap(line.lineComponents);
      for (const [parentId, childIds] of Object.entries(lineChildren)) {
        if (!children[parentId]) children[parentId] = [];
        children[parentId].push(...childIds);
      }
    }
  }
  return children;
}
/**
 * The main cart component that displays the cart items and summary.
 * It is used by both the /cart route and the cart aside dialog.
 * @param {CartMainProps}
 */
export function CartMain({ layout, cart: originalCart, showSummary = true }) {
  // The useOptimisticCart hook applies pending actions to the cart
  // so the user immediately sees feedback when they modify the cart.
  const cart = useOptimisticCart(originalCart);

  const linesCount = Boolean(cart?.lines?.nodes?.length || 0);
  const withDiscount =
    cart && Boolean(cart?.discountCodes?.filter((code) => code.applicable)?.length);
  const className = `cart-main ${withDiscount ? 'with-discount' : ''}`;
  const cartHasItems = cart?.totalQuantity ? cart.totalQuantity > 0 : false;
  const childrenMap = getLineItemChildrenMap(cart?.lines?.nodes ?? []);

  return (
    <section className={className} aria-label={layout === 'page' ? 'Cart page' : 'Cart drawer'}>
      <CartEmpty hidden={linesCount} layout={layout} />
      <div className={`cart-details ${layout === 'aside' ? 'cart-details-aside' : ''}`} hidden={!linesCount}>
        <div className="cart-details-scroll">
          {cartHasItems ? (
            <FreeShippingProgress
              subtotalAmount={cart?.cost?.subtotalAmount}
              className="mb-4"
            />
          ) : null}
          <p id="cart-lines" className="sr-only">
            Line items
          </p>
          <ul aria-labelledby="cart-lines">
            {(cart?.lines?.nodes ?? []).map((line) => {
              if ('parentRelationship' in line && line.parentRelationship?.parent) {
                return null;
              }
              return (
                <CartLineItem key={line.id} line={line} layout={layout} childrenMap={childrenMap} />
              );
            })}
          </ul>
        </div>
        {cartHasItems && showSummary && <CartSummary cart={cart} layout={layout} />}
      </div>
    </section>
  );
}

/**
 * @param {{
 *   hidden: boolean;
 *   layout?: CartMainProps['layout'];
 * }}
 */
function CartEmpty({ hidden = false }) {
  const { close } = useAside();
  return (
    <div hidden={hidden} className="px-1 py-6">
      <p className="font-sans text-body-l font-semibold text-ink">Your cart is empty</p>
      <p className="mt-2 font-sans text-body-s text-ink/65">
        Find food, treats, beds, and more for dogs and cats.
      </p>
      <div className="mt-5 flex flex-col gap-2">
        <Link
          to="/collections/dogs"
          onClick={close}
          prefetch="viewport"
          className="rounded-md bg-forest-green px-4 py-3 text-center font-sans text-body-s font-semibold text-cloud no-underline"
        >
          Shop Dog
        </Link>
        <Link
          to="/collections/cats"
          onClick={close}
          prefetch="viewport"
          className="rounded-md border border-forest-green/25 px-4 py-3 text-center font-sans text-body-s font-semibold text-forest-green no-underline"
        >
          Shop Cat
        </Link>
        <Link
          to="/collections/all"
          onClick={close}
          prefetch="viewport"
          className="pt-1 text-center font-sans text-body-s font-medium text-forest-green no-underline hover:underline"
        >
          Browse all products →
        </Link>
      </div>
    </div>
  );
}

/** @typedef {'page' | 'aside'} CartLayout */
/**
 * @typedef {{
 *   cart: CartApiQueryFragment | null;
 *   layout: CartLayout;
 *   showSummary?: boolean;
 * }} CartMainProps
 */
/** @typedef {{[parentId: string]: CartLine[]}} LineItemChildrenMap */

/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
/** @typedef {import('~/components/CartLineItem').CartLine} CartLine */
