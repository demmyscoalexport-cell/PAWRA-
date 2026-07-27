/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET SHOP               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetshop.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file FaqAccordion.jsx
 * @description Shared component: FaqAccordion.
 * @author Pawra LLC
 * @website pawrapetshop.com
 */

import {useState} from 'react';
import {Icon} from '~/components/ui/Icon';

/**
 * @param {{items: Array<{q: string; a: string}>; className?: string}}
 */
export function FaqAccordion({items, className = ''}) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className={`divide-y divide-border-subtle border-y border-border-subtle ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.q}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 py-4 text-left reset"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span className="font-sans text-body-m font-semibold text-text-primary">{item.q}</span>
              <Icon
                name="chevron-down"
                size="md"
                color="text-text-secondary"
                className={`shrink-0 transition-transform duration-base ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {isOpen && (
              <p className="pb-4 font-sans text-body-m text-text-secondary">{item.a}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
