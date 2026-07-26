/**
 * Client-side helpers for GA4 + Klaviyo (fire only in the browser).
 */

/**
 * @param {string} measurementId
 * @param {string} pagePath
 * @param {string} [pageTitle]
 */
export function trackGa4PageView(measurementId, pagePath, pageTitle) {
  if (typeof window === 'undefined' || !measurementId || !window.gtag) return;
  window.gtag('event', 'page_view', {
    page_path: pagePath,
    page_title: pageTitle || document.title,
    send_to: measurementId,
  });
}

/**
 * @param {string} eventName
 * @param {Record<string, unknown>} [params]
 */
export function trackGa4Event(eventName, params = {}) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', eventName, params);
}

/** Ensure Klaviyo queue exists before the onsite script finishes loading. */
export function ensureKlaviyoQueue() {
  if (typeof window === 'undefined') return null;
  if (!window.klaviyo) {
    window._klOnsite = window._klOnsite || [];
    window.klaviyo = {
      push(...args) {
        window._klOnsite.push(args);
      },
      track(name, props) {
        window._klOnsite.push(['track', name, props]);
      },
      identify(props) {
        window._klOnsite.push(['identify', props]);
      },
    };
  }
  return window.klaviyo;
}

/**
 * @param {string} eventName
 * @param {Record<string, unknown>} [props]
 */
export function trackKlaviyoEvent(eventName, props = {}) {
  const klaviyo = ensureKlaviyoQueue();
  if (!klaviyo) return;
  try {
    if (typeof klaviyo.track === 'function') {
      klaviyo.track(eventName, props);
    } else {
      klaviyo.push(['track', eventName, props]);
    }
  } catch {
    // Best-effort only.
  }
}

/**
 * Map Hydrogen product analytics payload → Klaviyo "Viewed Product".
 * @param {any} payload
 */
export function klaviyoViewedProductProps(payload) {
  const products = payload?.products || [];
  const product = products[0] || payload?.product || {};
  const variant = product?.selectedVariant || product?.variants?.[0] || {};
  return {
    ProductName: product.title || product.productTitle || '',
    ProductID: stripGid(product.id),
    SKU: variant.sku || '',
    Categories: product.collections?.map?.((c) => c.title) || [],
    ImageURL: variant.image?.url || product.featuredImage?.url || '',
    URL: typeof window !== 'undefined' ? window.location.href : '',
    Brand: product.vendor || 'PAWRA',
    Price: Number(variant.price?.amount || product.price?.amount || 0),
    CompareAtPrice: Number(variant.compareAtPrice?.amount || 0),
  };
}

/**
 * @param {any} payload
 */
export function klaviyoAddedToCartProps(payload) {
  const lines = payload?.currentLine
    ? [payload.currentLine]
    : payload?.cart?.lines?.nodes || [];
  const line = lines[0] || {};
  const merchandise = line.merchandise || {};
  const product = merchandise.product || {};
  return {
    ProductName: product.title || merchandise.title || '',
    ProductID: stripGid(product.id),
    VariantID: stripGid(merchandise.id),
    SKU: merchandise.sku || '',
    ImageURL: merchandise.image?.url || '',
    URL: product.handle ? `/products/${product.handle}` : '',
    Quantity: line.quantity || 1,
    Price: Number(merchandise.price?.amount || line.cost?.totalAmount?.amount || 0),
  };
}

/**
 * @param {string | undefined} gid
 */
function stripGid(gid) {
  if (!gid) return '';
  const match = String(gid).match(/(\d+)$/);
  return match ? match[1] : String(gid);
}
