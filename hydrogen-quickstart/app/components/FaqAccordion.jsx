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
    <div className={`divide-y divide-forest-green/15 border-y border-forest-green/15 ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.q}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 py-5 text-left reset"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span className="font-sans text-body-m font-semibold text-forest-green">{item.q}</span>
              <Icon
                name="chevron-down"
                size="md"
                color="text-electric-jade"
                className={`shrink-0 transition-transform duration-base ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {isOpen && (
              <p className="pb-5 font-sans text-body-m text-ink/80">{item.a}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
