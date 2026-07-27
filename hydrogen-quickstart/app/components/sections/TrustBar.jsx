/**
 * @file TrustBar.jsx
 * @description Minimal trust strip — icon + one-word labels.
 */

import {SectionReveal} from './SectionReveal';
import {Icon} from '~/components/ui/Icon';

const ITEMS = [
  {icon: 'truck', label: 'Free shipping'},
  {icon: 'check', label: '30-day returns'},
  {icon: 'shield', label: 'Quality curated'},
  {icon: 'heart', label: 'Designed for pets'},
];

export function TrustBar() {
  return (
    <SectionReveal>
      <section className="border-y border-border-subtle bg-page-bg px-4 py-12 md:px-10">
        <div className="mx-auto grid max-w-1440 grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
          {ITEMS.map((item) => (
            <div key={item.label} className="flex flex-col items-center text-center md:items-start md:text-left">
              <Icon name={item.icon} size="md" color="text-text-primary" />
              <p className="mt-3 font-sans text-body-s font-medium text-text-primary">{item.label}</p>
            </div>
          ))}
        </div>
      </section>
    </SectionReveal>
  );
}
