/**
 * @file VisualSearch.jsx
 * @description Camera / image upload placeholder for visual search.
 */

import {useRef, useState} from 'react';
import {Icon} from '~/components/ui/Icon';

/**
 * @param {{ className?: string }} props
 */
export function VisualSearchButton({className = ''}) {
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState('');

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        className="reset inline-flex h-9 w-9 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-page-bg hover:text-action-primary"
        aria-label="Visual search — upload a photo"
        title="Visual search"
        onClick={() => inputRef.current?.click()}
      >
        <Icon name="search" size="sm" color="currentColor" />
        <span className="sr-only">Upload image</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          setFileName(file ? file.name : '');
        }}
      />
      {fileName ? (
        <p className="absolute left-0 top-full z-10 mt-1 whitespace-nowrap rounded-md bg-surface px-2 py-1 font-sans text-body-xs text-text-secondary shadow-sm">
          Preview only: {fileName}
        </p>
      ) : null}
    </div>
  );
}
