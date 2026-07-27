/**
 * @file AnnouncementBar.jsx
 * @description Forest-green top bar — shipping + Pet Guarantee.
 */

import {useEffect, useState} from 'react';
import {Icon} from '~/components/ui/Icon';
import {FREE_SHIPPING_THRESHOLD_USD} from '~/lib/commerce';

const MESSAGE = `Free shipping over $${FREE_SHIPPING_THRESHOLD_USD} · 30-day Pet Guarantee`;
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
    <div className="relative bg-header px-4 py-2.5 text-action-primary-label">
      <p className="text-center font-sans text-body-xs font-medium tracking-wide md:text-body-s">
        {MESSAGE}
      </p>
      <button
        type="button"
        onClick={handleClose}
        className="absolute right-3 top-1/2 -translate-y-1/2 reset text-action-primary-label opacity-80 hover:opacity-100"
        aria-label="Close announcement"
      >
        <Icon name="close" size="sm" color="text-action-primary-label" />
      </button>
    </div>
  );
}
