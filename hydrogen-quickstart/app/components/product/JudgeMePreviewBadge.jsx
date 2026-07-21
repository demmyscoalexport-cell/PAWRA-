import {JudgemePreviewBadge} from '@judgeme/shopify-hydrogen';

/**
 * Judge.me preview badge for product cards / titles.
 * @param {{ productId?: string; className?: string }} props
 */
export function JudgeMePreviewBadge({productId, className = ''}) {
  if (!productId) return null;

  return (
    <div className={className}>
      <JudgemePreviewBadge id={productId} />
    </div>
  );
}
