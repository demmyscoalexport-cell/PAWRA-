import {shopifyProductNumericId} from '~/lib/judgeme';

/**
 * Judge.me preview badge for product cards / titles.
 * Hydrated client-side by widget_preloader.js when Judge.me is enabled.
 *
 * @param {{ productId?: string; className?: string }} props
 */
export function JudgeMePreviewBadge({productId, className = ''}) {
  const id = shopifyProductNumericId(productId) || productId || '';
  if (!id) return null;

  return (
    <div
      className={`jdgm-widget jdgm-preview-badge ${className}`.trim()}
      data-id={id}
      data-auto-install="false"
    />
  );
}
