/**
 * @file AnnouncementBar.jsx
 * @description Minimal top bar — single calm message.
 */

import {useEffect, useState} from 'react';
import {Icon} from '~/components/ui/Icon';

const MESSAGE = 'Free shipping on US orders over $75';
const STORAGE_KEY = 'pawra-announcement-closed';

export function AnnouncementBar() {
  const [closed, setClosed] = useState(true);

  useEffect(() => {
    setClosed(localStorage.getItem(STORAGE_KEY) === 'true');
  }, []);

  function handleClose() {
    localStorage.setItem(STORAGE_KEY, 'true');
    setClosed(true);
  }

  if (closed) return null;

  return (
    <div className="relative border-b border-border-subtle bg-page-bg px-4 py-2.5 text-text-primary">
      <p className="text-center font-sans text-body-xs tracking-wide text-text-secondary">
        {MESSAGE}
      </p>
      <button
        type="button"
        onClick={handleClose}
        className="absolute right-3 top-1/2 -translate-y-1/2 reset text-text-secondary opacity-80 hover:opacity-100"
        aria-label="Close announcement"
      >
        <Icon name="close" size="sm" color="text-text-secondary" />
      </button>
    </div>
  );
}
