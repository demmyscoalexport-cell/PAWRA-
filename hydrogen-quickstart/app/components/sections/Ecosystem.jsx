/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET SHOP               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetshop.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file Ecosystem.jsx
 * @description Homepage/marketing section: Ecosystem.
 * @author Pawra LLC
 * @website pawrapetshop.com
 */

import {SectionReveal} from './SectionReveal';
import {Button} from '~/components/ui/Button';
import {Icon} from '~/components/ui/Icon';

const CATEGORIES = [
  {icon: 'paw', name: 'Dogs', desc: 'Food, beds, toys, collars & wellness', href: '/collections/dogs'},
  {icon: 'heart', name: 'Cats', desc: 'Food, beds, toys & grooming essentials', href: '/collections/cats'},
  {icon: 'leaf', name: 'Food & Treats', desc: 'Premium nutrition for every pet', href: '/collections/food-and-treats'},
  {icon: 'shield', name: 'Grooming & Wellness', desc: 'Health and hygiene supplies', href: '/collections/grooming-wellness'},
];

export function Ecosystem() {
  return (
    <SectionReveal>
      <section className="bg-warm-oat px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="font-serif text-display-s text-forest-green">
            Shop by category
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-body-l text-ink">
            Premium pet products for cats and dogs — curated and delivered to your door.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {CATEGORIES.map((item) => (
              <article
                key={item.name}
                className="rounded-xl border border-forest-green/30 bg-midnight p-6 text-left"
              >
                <Icon name={item.icon} size="lg" color="text-electric-jade" className="!h-10 !w-10" />
                <h3 className="mt-4 font-sans text-body-l font-semibold text-cloud">{item.name}</h3>
                <p className="mt-3 font-sans text-body-s text-cloud/70">{item.desc}</p>
                <Button variant="accent" size="sm" href={item.href} className="mt-4">
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
