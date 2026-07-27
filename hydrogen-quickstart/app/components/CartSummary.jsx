/**
 * @file CartSummary.jsx
 * @description Enterprise cart totals — discounts, gift cards, Shop Pay, trust, loyalty.
 */

import {CartForm, Money, ShopPayButton} from '@shopify/hydrogen';
import {useEffect, useId, useMemo, useRef, useState} from 'react';
import {useFetcher, useRouteLoaderData} from 'react-router';
import {GorgiasChatButton} from '~/components/gorgias/GorgiasChatButton';
import {CartTrustStrip} from '~/components/cart/CartTrustStrip';
import {CartLoyaltyHint} from '~/components/cart/CartLoyaltyHint';
import {CartDeliveryEstimate} from '~/components/cart/CartDeliveryEstimate';
import {CartErrors} from '~/components/cart/CartErrors';
import {PRIMARY_CTA_CLASSES} from '~/lib/primaryButton';

/**
 * @param {CartSummaryProps}
 */
export function CartSummary({cart, layout}) {
  const rootData = useRouteLoaderData('root');
  const loopReturnsUrl = rootData?.integrations?.loopReturns?.returnsUrl || null;
  const className =
    layout === 'page'
      ? 'cart-summary-page rounded-lg border border-border-subtle bg-surface p-6 shadow-sm lg:sticky lg:top-24'
      : 'cart-summary-aside';
  const summaryId = useId();
  const discountsHeadingId = useId();
  const discountCodeInputId = useId();
  const giftCardHeadingId = useId();
  const giftCardInputId = useId();
  const noteId = useId();
  const [showExtras, setShowExtras] = useState(layout === 'page');

  const shopPayVariants = useMemo(() => {
    const nodes = cart?.lines?.nodes ?? [];
    return nodes
      .map((line) => {
        const id = line?.merchandise?.id;
        if (!id) return null;
        return {id, quantity: line.quantity || 1};
      })
      .filter(Boolean);
  }, [cart?.lines?.nodes]);

  return (
    <div aria-labelledby={summaryId} className={className}>
      <h2 id={summaryId} className="font-sans text-heading-s text-text-primary">
        Order summary
      </h2>

      <CartErrors className="mt-3" />

      <dl role="group" className="mt-4 space-y-2 font-sans text-body-m">
        <div className="flex items-center justify-between">
          <dt className="text-text-secondary">Subtotal</dt>
          <dd className="font-mono font-semibold text-action-primary">
            {cart?.cost?.subtotalAmount?.amount ? <Money data={cart.cost.subtotalAmount} /> : '—'}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-text-secondary">Shipping</dt>
          <dd className="font-sans text-body-s text-text-secondary">Calculated at checkout</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-text-secondary">Tax</dt>
          <dd className="font-sans text-body-s text-text-secondary">Calculated at checkout</dd>
        </div>
      </dl>

      <div className="my-4 border-t border-border-subtle" />

      <div className="flex items-center justify-between font-sans text-body-l font-semibold text-text-primary">
        <span>Total</span>
        <span className="font-mono">
          {cart?.cost?.totalAmount?.amount ? <Money data={cart.cost.totalAmount} /> : '—'}
        </span>
      </div>

      <CartDeliveryEstimate className="mt-3" />
      <CartLoyaltyHint subtotalAmount={cart?.cost?.subtotalAmount} className="mt-3" />

      <button
        type="button"
        className="reset mt-4 font-sans text-body-s font-semibold text-action-primary underline"
        onClick={() => setShowExtras((v) => !v)}
        aria-expanded={showExtras}
      >
        {showExtras ? 'Hide discount, gift card & note' : 'Add discount, gift card or note'}
      </button>

      {showExtras ? (
        <div className="mt-3 space-y-4">
          <CartDiscounts
            discountCodes={cart?.discountCodes}
            discountsHeadingId={discountsHeadingId}
            discountCodeInputId={discountCodeInputId}
          />
          <CartGiftCard
            giftCardCodes={cart?.appliedGiftCards}
            giftCardHeadingId={giftCardHeadingId}
            giftCardInputId={giftCardInputId}
          />
          <CartNote note={cart?.note} noteId={noteId} />
        </div>
      ) : null}

      <CartCheckoutActions
        checkoutUrl={cart?.checkoutUrl}
        shopPayVariants={shopPayVariants}
        layout={layout}
      />

      <CartTrustStrip className="mt-5" loopReturnsUrl={loopReturnsUrl} />
    </div>
  );
}

/**
 * @param {{
 *   checkoutUrl?: string;
 *   shopPayVariants?: Array<{id: string; quantity: number}>;
 *   layout: CartLayout;
 * }}
 */
function CartCheckoutActions({checkoutUrl, shopPayVariants = [], layout}) {
  if (!checkoutUrl) {
    return (
      <p className="mt-4 rounded-md border border-sale/30 bg-sale/10 px-3 py-3 font-sans text-body-s text-text-primary">
        Checkout is unavailable right now. Refresh and try again, or confirm{' '}
        <code className="font-mono text-mono-s">PUBLIC_CHECKOUT_DOMAIN</code> is set on Oxygen.
      </p>
    );
  }

  return (
    <div className={`mt-4 space-y-3 ${layout === 'aside' ? 'cart-checkout-sticky' : ''}`}>
      <a
        href={checkoutUrl}
        target="_self"
        className={`flex h-14 w-full items-center justify-center rounded-md font-sans text-body-l font-semibold no-underline shadow-sm ${PRIMARY_CTA_CLASSES}`}
      >
        Checkout
      </a>

      {shopPayVariants.length > 0 ? (
        <div className="shop-pay-wrap overflow-hidden rounded-md">
          <ShopPayButton
            channel="hydrogen"
            variantIdsAndQuantities={shopPayVariants}
            width="100%"
            className="w-full [&_shop-pay-button]:!w-full"
          />
        </div>
      ) : null}

      <p className="text-center font-sans text-body-xs text-text-secondary">
        Secure Shopify checkout · taxes &amp; shipping calculated next
      </p>
      <GorgiasChatButton
        label="Need help with your cart?"
        variant="link"
        className="w-full justify-center text-body-s"
      />
    </div>
  );
}

/**
 * @param {{ note?: string | null; noteId: string }}
 */
function CartNote({note, noteId}) {
  return (
    <section aria-label="Order note">
      <CartForm route="/cart" action={CartForm.ACTIONS.NoteUpdate}>
        <label htmlFor={noteId} className="mb-1 block font-sans text-body-s font-medium text-text-primary">
          Gift / order note
        </label>
        <textarea
          id={noteId}
          name="note"
          defaultValue={note || ''}
          rows={3}
          placeholder="Add a gift message or delivery note"
          className="w-full rounded-md border border-border-subtle bg-page-bg px-3 py-2 font-sans text-body-s outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
        />
        <button
          type="submit"
          className="mt-2 rounded-md border border-action-primary/25 px-3 py-2 font-sans text-body-s font-semibold text-action-primary"
        >
          Save note
        </button>
      </CartForm>
    </section>
  );
}

/**
 * @param {{
 *   discountCodes?: CartApiQueryFragment['discountCodes'];
 *   discountsHeadingId: string;
 *   discountCodeInputId: string;
 * }}
 */
function CartDiscounts({discountCodes, discountsHeadingId, discountCodeInputId}) {
  const codes =
    discountCodes?.filter((discount) => discount.applicable)?.map(({code}) => code) || [];

  return (
    <section aria-label="Discounts" className="space-y-2">
      <dl hidden={!codes.length}>
        <div>
          <dt id={discountsHeadingId} className="sr-only">
            Discounts
          </dt>
          <UpdateDiscountForm>
            <div className="cart-discount flex flex-wrap items-center gap-2" role="group" aria-labelledby={discountsHeadingId}>
              <code className="rounded bg-action-secondary px-2 py-1 font-mono text-mono-s">{codes?.join(', ')}</code>
              <button type="submit" aria-label="Remove discount" className="font-sans text-body-xs font-semibold text-sale underline">
                Remove
              </button>
            </div>
          </UpdateDiscountForm>
        </div>
      </dl>

      <UpdateDiscountForm discountCodes={codes}>
        <div className="flex gap-2">
          <label htmlFor={discountCodeInputId} className="sr-only">
            Discount code
          </label>
          <input
            id={discountCodeInputId}
            type="text"
            name="discountCode"
            placeholder="Discount code"
            className="min-w-0 flex-1 rounded-md border border-border-subtle bg-page-bg px-3 py-2 font-sans text-body-s"
          />
          <button
            type="submit"
            aria-label="Apply discount code"
            className="rounded-md border border-action-primary/25 px-3 py-2 font-sans text-body-s font-semibold text-action-primary"
          >
            Apply
          </button>
        </div>
      </UpdateDiscountForm>
    </section>
  );
}

/**
 * @param {{
 *   discountCodes?: string[];
 *   children: React.ReactNode;
 * }}
 */
function UpdateDiscountForm({discountCodes, children}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.DiscountCodesUpdate}
      inputs={{
        discountCodes: discountCodes || [],
      }}
    >
      {children}
    </CartForm>
  );
}

/**
 * @param {{
 *   giftCardCodes: CartApiQueryFragment['appliedGiftCards'] | undefined;
 *   giftCardHeadingId: string;
 *   giftCardInputId: string;
 * }}
 */
function CartGiftCard({giftCardCodes, giftCardHeadingId, giftCardInputId}) {
  const giftCardCodeInput = useRef(null);
  const removeButtonRefs = useRef(new Map());
  const previousCardIdsRef = useRef([]);
  const giftCardAddFetcher = useFetcher({key: 'gift-card-add'});
  const [removedCardIndex, setRemovedCardIndex] = useState(null);

  useEffect(() => {
    if (giftCardAddFetcher.data) {
      if (giftCardCodeInput.current !== null) {
        giftCardCodeInput.current.value = '';
      }
    }
  }, [giftCardAddFetcher.data]);

  useEffect(() => {
    const currentCardIds = giftCardCodes?.map((card) => card.id) || [];

    if (removedCardIndex !== null && giftCardCodes) {
      const focusTargetIndex = Math.min(removedCardIndex, giftCardCodes.length - 1);
      const focusTargetCard = giftCardCodes[focusTargetIndex];
      const focusButton = focusTargetCard ? removeButtonRefs.current.get(focusTargetCard.id) : null;

      if (focusButton) {
        focusButton.focus();
      } else if (giftCardCodeInput.current) {
        giftCardCodeInput.current.focus();
      }

      setRemovedCardIndex(null);
    }

    previousCardIdsRef.current = currentCardIds;
  }, [giftCardCodes, removedCardIndex]);

  const handleRemoveClick = (cardId) => {
    const index = previousCardIdsRef.current.indexOf(cardId);
    if (index !== -1) {
      setRemovedCardIndex(index);
    }
  };

  return (
    <section aria-label="Gift cards" className="space-y-2">
      {giftCardCodes && giftCardCodes.length > 0 && (
        <dl>
          <dt id={giftCardHeadingId} className="font-sans text-body-s text-text-secondary">
            Applied gift card(s)
          </dt>
          {giftCardCodes.map((giftCard) => (
            <dd key={giftCard.id} className="cart-discount mt-1 flex flex-wrap items-center gap-2">
              <RemoveGiftCardForm
                giftCardId={giftCard.id}
                lastCharacters={giftCard.lastCharacters}
                onRemoveClick={() => handleRemoveClick(giftCard.id)}
                buttonRef={(el) => {
                  if (el) {
                    removeButtonRefs.current.set(giftCard.id, el);
                  } else {
                    removeButtonRefs.current.delete(giftCard.id);
                  }
                }}
              >
                <code className="font-mono text-mono-s">***{giftCard.lastCharacters}</code>
                &nbsp;
                <Money data={giftCard.amountUsed} />
              </RemoveGiftCardForm>
            </dd>
          ))}
        </dl>
      )}

      <AddGiftCardForm fetcherKey="gift-card-add">
        <div className="flex gap-2">
          <label htmlFor={giftCardInputId} className="sr-only">
            Gift card code
          </label>
          <input
            id={giftCardInputId}
            type="text"
            name="giftCardCode"
            placeholder="Gift card code"
            ref={giftCardCodeInput}
            className="min-w-0 flex-1 rounded-md border border-border-subtle bg-page-bg px-3 py-2 font-sans text-body-s"
          />
          <button
            type="submit"
            disabled={giftCardAddFetcher.state !== 'idle'}
            aria-label="Apply gift card code"
            className="rounded-md border border-action-primary/25 px-3 py-2 font-sans text-body-s font-semibold text-action-primary"
          >
            Apply
          </button>
        </div>
      </AddGiftCardForm>
    </section>
  );
}

/**
 * @param {{
 *   fetcherKey?: string;
 *   children: React.ReactNode;
 * }}
 */
function AddGiftCardForm({fetcherKey, children}) {
  return (
    <CartForm fetcherKey={fetcherKey} route="/cart" action={CartForm.ACTIONS.GiftCardCodesAdd}>
      {children}
    </CartForm>
  );
}

/**
 * @param {{
 *   giftCardId: string;
 *   lastCharacters: string;
 *   children: React.ReactNode;
 *   onRemoveClick?: () => void;
 *   buttonRef?: (el: HTMLButtonElement | null) => void;
 * }}
 */
function RemoveGiftCardForm({giftCardId, lastCharacters, children, onRemoveClick, buttonRef}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.GiftCardCodesRemove}
      inputs={{
        giftCardCodes: [giftCardId],
      }}
    >
      {children}
      &nbsp;
      <button
        type="submit"
        aria-label={`Remove gift card ending in ${lastCharacters}`}
        onClick={onRemoveClick}
        ref={buttonRef}
        className="font-sans text-body-xs font-semibold text-sale underline"
      >
        Remove
      </button>
    </CartForm>
  );
}

/**
 * @typedef {{
 *   cart: OptimisticCart<CartApiQueryFragment | null>;
 *   layout: CartLayout;
 * }} CartSummaryProps
 */

/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
/** @typedef {import('~/components/CartMain').CartLayout} CartLayout */
/** @typedef {import('@shopify/hydrogen').OptimisticCart} OptimisticCart */
