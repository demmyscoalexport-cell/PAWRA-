/**
 * Gorgias Chat helpers for the PAWRA Hydrogen storefront.
 * Public widget IDs are safe to ship — they load in the browser.
 */

import {BRAND} from '~/lib/branding';

/** Manual Installation → Any other website (Chat with Pawra) */
export const DEFAULT_GORGIAS_WIDGET_ID = '01KYACCTWHCH0YCM1889XQYYXJ';

/** Gorgias Convert / Campaign bundle (static.9gtb.com) */
export const DEFAULT_GORGIAS_CONVERT_ID = 'f1be878a-6227-44d3-a38b-f33486a96881';

export const GORGIAS_WIDGET_SCRIPT_ID = 'gorgias-chat-widget-install-v3';
export const GORGIAS_CONVERT_SCRIPT_ID = 'gorgias-convert-bundle';

/**
 * @param {{widgetId?: string; convertId?: string} | null | undefined} config
 */
export function resolveGorgiasConfig(config) {
  const widgetId = config?.widgetId || DEFAULT_GORGIAS_WIDGET_ID;
  const convertId = config?.convertId || DEFAULT_GORGIAS_CONVERT_ID;
  return {
    enabled: Boolean(widgetId || convertId),
    widgetId,
    convertId,
  };
}

/** Wait until GorgiasChat is ready (official init pattern). */
export function whenGorgiasReady() {
  if (typeof window === 'undefined') {
    return Promise.resolve(null);
  }

  if (window.GorgiasChat?.init) {
    return window.GorgiasChat.init().then(() => window.GorgiasChat);
  }

  return new Promise((resolve) => {
    const onLoaded = () => {
      const api = window.GorgiasChat;
      if (api?.init) {
        api.init().then(() => resolve(api));
      } else {
        resolve(api || null);
      }
    };

    window.addEventListener('gorgias-widget-loaded', onLoaded, {once: true});
  });
}

/** Open the Gorgias chat bubble (used by support CTAs). */
export function openGorgiasChat() {
  return whenGorgiasReady().then((api) => {
    try {
      api?.open?.();
    } catch {
      // Best-effort — widget may still be mounting.
    }
    return api;
  });
}

/**
 * Prefer logged-in Customer Account profile, fall back to cart buyer identity.
 * @param {{email?: string; name?: string; id?: string; phone?: string} | null | undefined} accountCustomer
 * @param {any} cart
 */
export function resolveGorgiasCustomer(accountCustomer, cart) {
  const fromCart = customerFromCart(cart);
  const email = accountCustomer?.email || fromCart?.email || '';
  if (!email) return null;

  return {
    email,
    name: accountCustomer?.name || fromCart?.name || '',
    id: accountCustomer?.id || fromCart?.id || '',
    phone: accountCustomer?.phone || fromCart?.phone || '',
  };
}

/**
 * Infer storefront page type from the current path.
 * @param {string} pathname
 * @returns {'home' | 'product' | 'collection' | 'cart' | 'account' | 'search' | 'blog' | 'other'}
 */
export function pageTypeFromPath(pathname = '/') {
  if (pathname === '/' || pathname === '') return 'home';
  if (pathname.startsWith('/products/')) return 'product';
  if (pathname.startsWith('/collections')) return 'collection';
  if (pathname.startsWith('/cart')) return 'cart';
  if (pathname.startsWith('/account')) return 'account';
  if (pathname.startsWith('/search')) return 'search';
  if (pathname.startsWith('/blogs') || pathname.startsWith('/blog')) return 'blog';
  return 'other';
}

/**
 * Map a Hydrogen Storefront cart into a Shopify Ajax cart-like payload
 * for GorgiasChat.captureShopifyCart().
 * @param {any} cart
 */
export function toGorgiasShopifyCart(cart) {
  if (!cart?.id) return null;

  const lines = cart.lines?.nodes || cart.lines || [];
  const currency =
    cart.cost?.totalAmount?.currencyCode ||
    lines[0]?.merchandise?.price?.currencyCode ||
    'USD';

  const totalAmount = Number(cart.cost?.totalAmount?.amount || 0);
  const subtotalAmount = Number(cart.cost?.subtotalAmount?.amount || totalAmount);
  const cents = (value) => Math.round(Number(value || 0) * 100);

  const items = lines.map((line) => {
    const merchandise = line.merchandise || {};
    const product = merchandise.product || {};
    const unitPrice = Number(
      line.cost?.amountPerQuantity?.amount || merchandise.price?.amount || 0,
    );
    const lineTotal = Number(line.cost?.totalAmount?.amount || unitPrice * (line.quantity || 1));
    const handle = product.handle || '';

    return {
      id: numericShopifyId(merchandise.id),
      variant_id: numericShopifyId(merchandise.id),
      product_id: numericShopifyId(product.id),
      key: line.id,
      quantity: line.quantity || 1,
      title: product.title || merchandise.title || '',
      variant_title: merchandise.title || '',
      product_title: product.title || '',
      price: cents(unitPrice),
      original_price: cents(merchandise.compareAtPrice?.amount || unitPrice),
      line_price: cents(lineTotal),
      final_line_price: cents(lineTotal),
      final_price: cents(unitPrice),
      sku: merchandise.sku || '',
      vendor: product.vendor || '',
      url: handle ? `/products/${handle}` : '',
      image: merchandise.image?.url || '',
      handle,
      properties: Object.fromEntries(
        (line.attributes || []).map((attr) => [attr.key, attr.value]),
      ),
    };
  });

  return {
    token: cart.id,
    note: cart.note || null,
    attributes: Object.fromEntries((cart.attributes || []).map((a) => [a.key, a.value])),
    original_total_price: cents(subtotalAmount),
    total_price: cents(totalAmount),
    total_discount: Math.max(0, cents(subtotalAmount) - cents(totalAmount)),
    total_weight: 0,
    item_count: cart.totalQuantity || items.reduce((sum, item) => sum + item.quantity, 0),
    items,
    currency,
    items_subtotal_price: cents(subtotalAmount),
    cart_level_discount_applications: (cart.discountCodes || [])
      .filter((code) => code.applicable)
      .map((code) => ({title: code.code})),
    // Helpful extras for AI / ticket sidebar
    checkout_url: cart.checkoutUrl || '',
    storefront_url: BRAND.url,
  };
}

/**
 * @param {string | undefined} gid
 * @returns {number | string}
 */
function numericShopifyId(gid) {
  if (!gid) return '';
  const match = String(gid).match(/(\d+)$/);
  return match ? Number(match[1]) : gid;
}

/**
 * Best-effort shopper email from Hydrogen cart buyer identity.
 * @param {any} cart
 * @returns {string}
 */
export function emailFromCart(cart) {
  return (
    cart?.buyerIdentity?.email ||
    cart?.buyerIdentity?.customer?.email ||
    ''
  );
}

/**
 * @param {any} cart
 * @returns {{email: string; name: string; id: string; phone: string} | null}
 */
export function customerFromCart(cart) {
  const email = emailFromCart(cart);
  if (!email) return null;

  const customer = cart?.buyerIdentity?.customer;
  const name = [customer?.firstName, customer?.lastName].filter(Boolean).join(' ').trim();

  return {
    email,
    name: name || customer?.displayName || '',
    id: customer?.id || '',
    phone: cart?.buyerIdentity?.phone || '',
  };
}
