/**
 * @file CartLineItem.jsx
 * @description Enterprise cart line — image, title, autoship badge, qty controls.
 */

import {CartForm, Image} from '@shopify/hydrogen';
import {useVariantUrl} from '~/lib/variants';
import {Link} from 'react-router';
import {ProductPrice} from './ProductPrice';
import {useAside} from './Aside';

/**
 * @param {{
 *   layout: CartLayout;
 *   line: CartLine;
 *   childrenMap: LineItemChildrenMap;
 * }}
 */
export function CartLineItem({layout, line, childrenMap}) {
  const {id, merchandise, attributes} = line;
  const {product, title, image, selectedOptions} = merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);
  const {close} = useAside();
  const lineItemChildren = childrenMap[id];
  const childrenLabelId = `cart-line-children-${id}`;
  const isAutoship = Boolean(
    attributes?.some(
      (attr) =>
        (attr.key === '_autoship' || attr.key === 'Autoship') &&
        String(attr.value).toLowerCase() !== 'false' &&
        String(attr.value) !== '',
    ),
  );

  return (
    <li key={id} className="border-b border-border-subtle py-4 last:border-0">
      <div className="flex gap-4">
        {image ? (
          <Link
            to={lineItemUrl}
            onClick={() => {
              if (layout === 'aside') close();
            }}
            className="shrink-0"
          >
            <Image
              alt={title}
              aspectRatio="1/1"
              data={image}
              height={96}
              loading="lazy"
              width={96}
              className="h-24 w-24 rounded-md object-cover"
            />
          </Link>
        ) : (
          <div className="h-24 w-24 shrink-0 rounded-md bg-action-secondary" />
        )}

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <Link
                prefetch="intent"
                to={lineItemUrl}
                onClick={() => {
                  if (layout === 'aside') close();
                }}
                className="font-sans text-body-s font-semibold text-text-primary no-underline hover:text-action-primary"
              >
                {product.title}
              </Link>
              {isAutoship ? (
                <p className="mt-1 inline-flex rounded-md bg-action-primary/10 px-2 py-0.5 font-sans text-body-xs font-medium text-action-primary">
                  Autoship
                </p>
              ) : null}
              {selectedOptions?.length ? (
                <ul className="mt-1 space-y-0.5">
                  {selectedOptions.map((option) => (
                    <li key={option.name} className="font-sans text-body-xs text-text-secondary">
                      {option.name}: {option.value}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <div className="shrink-0 text-right font-mono text-mono-s font-medium text-action-primary">
              <ProductPrice price={line?.cost?.totalAmount} />
            </div>
          </div>

          <CartLineQuantity line={line} />
        </div>
      </div>

      {lineItemChildren ? (
        <div className="mt-3 pl-4 md:pl-28">
          <p id={childrenLabelId} className="sr-only">
            Line items with {product.title}
          </p>
          <ul aria-labelledby={childrenLabelId} className="space-y-2">
            {lineItemChildren.map((childLine) => (
              <CartLineItem
                childrenMap={childrenMap}
                key={childLine.id}
                line={childLine}
                layout={layout}
              />
            ))}
          </ul>
        </div>
      ) : null}
    </li>
  );
}

/**
 * @param {{line: CartLine}}
 */
function CartLineQuantity({line}) {
  if (!line || typeof line?.quantity === 'undefined') return null;
  const {id: lineId, quantity, isOptimistic} = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <div className="inline-flex items-center rounded-md border border-border-subtle bg-page-bg">
        <CartLineUpdateButton lines={[{id: lineId, quantity: prevQuantity}]}>
          <button
            aria-label="Decrease quantity"
            disabled={quantity <= 1 || !!isOptimistic}
            name="decrease-quantity"
            value={prevQuantity}
            className="reset flex h-9 w-9 items-center justify-center font-sans text-body-m text-text-primary disabled:opacity-40"
            type="submit"
          >
            −
          </button>
        </CartLineUpdateButton>
        <span className="min-w-8 text-center font-mono text-mono-s text-text-primary" aria-live="polite">
          {quantity}
        </span>
        <CartLineUpdateButton lines={[{id: lineId, quantity: nextQuantity}]}>
          <button
            aria-label="Increase quantity"
            name="increase-quantity"
            value={nextQuantity}
            disabled={!!isOptimistic}
            className="reset flex h-9 w-9 items-center justify-center font-sans text-body-m text-text-primary disabled:opacity-40"
            type="submit"
          >
            +
          </button>
        </CartLineUpdateButton>
      </div>
      <CartLineRemoveButton lineIds={[lineId]} disabled={!!isOptimistic} />
    </div>
  );
}

/**
 * @param {{
 *   lineIds: string[];
 *   disabled: boolean;
 * }}
 */
function CartLineRemoveButton({lineIds, disabled}) {
  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{lineIds}}
    >
      <button
        disabled={disabled}
        type="submit"
        className="reset font-sans text-body-xs font-medium text-text-secondary underline hover:text-sale disabled:opacity-40"
      >
        Remove
      </button>
    </CartForm>
  );
}

/**
 * @param {{
 *   children: React.ReactNode;
 *   lines: CartLineUpdateInput[];
 * }}
 */
function CartLineUpdateButton({children, lines}) {
  const lineIds = lines.map((line) => line.id);

  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{lines}}
    >
      {children}
    </CartForm>
  );
}

/**
 * @param {string[]} lineIds
 */
function getUpdateKey(lineIds) {
  return [CartForm.ACTIONS.LinesUpdate, ...lineIds].join('-');
}

/** @typedef {OptimisticCartLine<CartApiQueryFragment>} CartLine */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').CartLineUpdateInput} CartLineUpdateInput */
/** @typedef {import('~/components/CartMain').CartLayout} CartLayout */
/** @typedef {import('~/components/CartMain').LineItemChildrenMap} LineItemChildrenMap */
/** @typedef {import('@shopify/hydrogen').OptimisticCartLine} OptimisticCartLine */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
/** @typedef {import('storefrontapi.generated').CartLineFragment} CartLineFragment */
