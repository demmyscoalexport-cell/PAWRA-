/**
 * @file CompareBar.jsx
 * @description Sticky compare tray when 2+ products selected.
 */

import {Link} from 'react-router';
import {useCompare} from './CompareContext';
import {Button} from '~/components/ui/Button';
import {getMockProductByHandle} from '~/data/products';

export function CompareBar() {
  const {handles, remove, clear} = useCompare();
  if (handles.length < 2) return null;

  const qs = handles.join(',');

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[80] border-t border-border-subtle bg-surface/95 px-4 py-3 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-1440 flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <p className="font-sans text-body-s font-semibold text-text-primary">
            Compare ({handles.length}/4)
          </p>
          {handles.map((handle) => {
            const product = getMockProductByHandle(handle);
            return (
              <div key={handle} className="flex items-center gap-2 rounded-md border border-border-subtle bg-page-bg px-2 py-1">
                {product?.featuredImage?.url ? (
                  <img src={product.featuredImage.url} alt="" className="h-8 w-8 rounded object-cover" />
                ) : null}
                <span className="max-w-[8rem] truncate font-sans text-body-xs text-text-primary">
                  {product?.title || handle}
                </span>
                <button type="button" className="reset text-text-secondary hover:text-text-primary" onClick={() => remove(handle)} aria-label={`Remove ${handle}`}>
                  ×
                </button>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className="reset font-sans text-body-s text-text-secondary underline" onClick={clear}>
            Clear
          </button>
          <Button variant="primary" size="md" href={`/compare?handles=${encodeURIComponent(qs)}`}>
            Compare Now
          </Button>
        </div>
      </div>
    </div>
  );
}
