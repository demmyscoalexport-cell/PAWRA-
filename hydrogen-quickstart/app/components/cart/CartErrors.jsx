/**
 * @file CartErrors.jsx
 * @description Surfaces cart mutation errors / warnings from CartForm fetchers.
 */

import {useActionData, useFetchers} from 'react-router';

/**
 * @param {{ className?: string }} props
 */
export function CartErrors({className = ''}) {
  const actionData = useActionData();
  const fetchers = useFetchers();

  const messages = [];

  for (const err of normalizeMessages(actionData?.errors)) {
    messages.push({type: 'error', text: err});
  }
  for (const warn of normalizeMessages(actionData?.warnings)) {
    messages.push({type: 'warning', text: warn});
  }

  for (const fetcher of fetchers) {
    if (!fetcher.data) continue;
    const isCart =
      (typeof fetcher.formAction === 'string' && fetcher.formAction.includes('/cart')) ||
      fetcher.data?.analytics?.cartId ||
      fetcher.data?.cart;
    if (!isCart) continue;
    for (const err of normalizeMessages(fetcher.data.errors)) {
      messages.push({type: 'error', text: err});
    }
    for (const warn of normalizeMessages(fetcher.data.warnings)) {
      messages.push({type: 'warning', text: warn});
    }
  }

  const unique = [];
  const seen = new Set();
  for (const msg of messages) {
    const key = `${msg.type}:${msg.text}`;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(msg);
  }

  if (!unique.length) return null;

  return (
    <div
      className={`space-y-2 ${className}`}
      role="status"
      aria-live="polite"
    >
      {unique.map((msg) => (
        <p
          key={`${msg.type}-${msg.text}`}
          className={`rounded-md border px-3 py-2 font-sans text-body-s ${
            msg.type === 'error'
              ? 'border-sale/40 bg-sale/10 text-text-primary'
              : 'border-warning/40 bg-warning/10 text-text-primary'
          }`}
        >
          {msg.text}
        </p>
      ))}
    </div>
  );
}

/** @param {unknown} value */
function normalizeMessages(value) {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === 'string') return item;
        if (item && typeof item === 'object') {
          return item.message || item.code || JSON.stringify(item);
        }
        return String(item);
      })
      .filter(Boolean);
  }
  if (typeof value === 'string') return [value];
  return [];
}
