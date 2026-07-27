/**
 * @file Ecosystem.jsx
 * @description Homepage/marketing section: Ecosystem.
 */

import {SectionReveal} from './SectionReveal';
import {Button} from '~/components/ui/Button';
import {Icon} from '~/components/ui/Icon';
import {collectionPath} from '~/lib/pawraCollections';

const CATEGORIES = [
  {icon: 'paw', name: 'Dogs', desc: 'Food, beds, toys, collars & wellness', href: collectionPath('dogs')},
  {icon: 'heart', name: 'Cats', desc: 'Food, beds, toys & grooming essentials', href: collectionPath('cats')},
  {icon: 'leaf', name: 'Featured', desc: 'Hand-picked favorites from PAWRA', href: collectionPath('frontpage')},
  {icon: 'shield', name: 'All Products', desc: 'Browse the full catalog', href: collectionPath('all')},
];

export function Ecosystem() {
  return (
    <SectionReveal>
      <section className="bg-page-bg px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="font-serif text-display-m text-text-primary">
            Shop by category
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-body-l text-text-secondary">
            Premium pet products for cats and dogs — curated and delivered to your door.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {CATEGORIES.map((item) => (
              <article
                key={item.name}
                className="rounded-lg border border-border-subtle bg-surface p-6 text-left transition-shadow hover:shadow-sm"
              >
                <Icon name={item.icon} size="lg" color="text-action-primary" className="!h-10 !w-10" />
                <h3 className="mt-4 font-sans text-heading-s text-text-primary">{item.name}</h3>
                <p className="mt-3 font-sans text-body-s text-text-secondary">{item.desc}</p>
                <Button variant="secondary" size="sm" href={item.href} className="mt-4">
                  Shop {item.name}
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
