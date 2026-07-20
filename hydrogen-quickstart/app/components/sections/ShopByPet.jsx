/**
 * @file ShopByPet.jsx
 * @description Chewy-style shop-by-pet entry strip for the homepage.
 */

import {Link} from 'react-router';
import {SectionReveal} from './SectionReveal';
import {Icon} from '~/components/ui/Icon';
import {collectionPath} from '~/lib/pawraCollections';

const PETS = [
  {
    name: 'Dog',
    desc: 'Food, treats, beds, and everyday essentials',
    href: collectionPath('dogs'),
    icon: 'paw',
  },
  {
    name: 'Cat',
    desc: 'Meals, comfort, grooming, and play',
    href: collectionPath('cats'),
    icon: 'heart',
  },
];

export function ShopByPet() {
  return (
    <SectionReveal>
      <section className="border-b border-forest-green/10 bg-cloud px-4 py-10 md:px-8 md:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-display-s text-forest-green">Shop by pet</h2>
              <p className="mt-2 max-w-xl font-sans text-body-m text-ink/70">
                Start with your pet — then narrow by food, comfort, or care.
              </p>
            </div>
            <Link
              to="/collections/all"
              className="font-sans text-body-s font-semibold text-forest-green no-underline hover:underline"
            >
              Browse all products →
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {PETS.map((pet) => (
              <Link
                key={pet.name}
                to={pet.href}
                className="group flex items-center gap-5 rounded-xl border border-forest-green/15 bg-warm-oat px-5 py-6 no-underline transition-colors hover:border-forest-green/40 hover:bg-warm-oat/80"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-forest-green text-electric-jade">
                  <Icon name={pet.icon} size="lg" color="text-electric-jade" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-sans text-body-l font-semibold text-forest-green">
                    {pet.name}
                  </span>
                  <span className="mt-1 block font-sans text-body-s text-ink/65">{pet.desc}</span>
                </span>
                <Icon
                  name="arrow-right"
                  size="md"
                  color="text-forest-green"
                  className="shrink-0 transition-transform group-hover:translate-x-1"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
