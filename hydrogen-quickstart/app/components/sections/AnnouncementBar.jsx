/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET SHOP               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetshop.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file AnnouncementBar.jsx
 * @description Homepage/marketing section: AnnouncementBar.
 * @author Pawra LLC
 * @website pawrapetshop.com
 */

import {useEffect, useState} from 'react';
import {Icon} from '~/components/ui/Icon';

const MESSAGES = [
  'Free shipping on all US orders over $75',
  'Subscribe & Save — 10% off recurring deliveries',
  'Premium products for cats and dogs',
  '30-day returns · Secure Shopify checkout',
];
const STORAGE_KEY = 'pawra-announcement-closed';

export function AnnouncementBar() {
  const [closed, setClosed] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setClosed(localStorage.getItem(STORAGE_KEY) === 'true');
  }, []);

  useEffect(() => {
    if (closed) return;
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % MESSAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [closed]);

  function handleClose() {
    localStorage.setItem(STORAGE_KEY, 'true');
    setClosed(true);
  }

  if (closed) return null;

  return (
    <div className="relative bg-forest-green px-4 py-2.5 text-cloud">
      <div className="mx-auto flex max-w-7xl items-center justify-center pr-8">
        <p className="hidden text-center font-sans text-body-s font-medium md:block">
          {MESSAGES.join(' · ')}
        </p>
        <p className="text-center font-sans text-body-s font-medium md:hidden" aria-live="polite">
          {MESSAGES[activeIndex]}
        </p>
      </div>
      <button
        type="button"
        onClick={handleClose}
        className="absolute right-3 top-1/2 -translate-y-1/2 reset text-cloud opacity-80 hover:opacity-100"
        aria-label="Close announcement"
      >
        <Icon name="close" size="sm" color="text-cloud" />
      </button>
    </div>
  );
}
