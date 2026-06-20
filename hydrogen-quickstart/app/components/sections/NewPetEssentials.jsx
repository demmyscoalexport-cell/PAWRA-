/**
 * New Pet Essentials — curated starter path for new pet parents.
 */

import {SectionReveal} from './SectionReveal';
import {Button} from '~/components/ui/Button';
import {PawraProductCard} from '~/components/PawraProductCard';

/**
 * @param {{products?: Array<import('storefrontapi.generated').ProductItemFragment>}} props
 */
export function NewPetEssentials({products = []}) {
  const display = products.slice(0, 4);

  return (
    <SectionReveal>
      <section className="bg-midnight px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <p className="font-sans text-body-xs font-semibold uppercase tracking-[0.2em] text-electric-jade">
                New pet parent?
              </p>
              <h2 className="mt-4 font-serif text-display-s text-cloud">New Pet Essentials</h2>
              <p className="mt-4 font-sans text-body-l text-cloud/80">
                Everything you need for day one — bowls, grooming basics, treats, and comfort
                essentials curated for cats and dogs.
              </p>
              <ul className="mt-6 space-y-2 font-sans text-body-s text-cloud/70">
                <li>✓ Starter kits for puppies and kittens</li>
                <li>✓ Vet-trusted grooming and feeding basics</li>
                <li>✓ Subscribe &amp; Save on repeat essentials</li>
              </ul>
              <Button variant="accent" size="lg" href="/collections/new-pet-essentials" className="mt-8">
                Shop New Pet Essentials
              </Button>
            </div>
            {display.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {display.map((product, index) => (
                  <PawraProductCard
                    key={product.id}
                    product={product}
                    loading={index < 2 ? 'eager' : undefined}
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {['Feeding Bowl', 'Grooming Kit', 'Treats Sampler', 'Comfort Bed'].map((label) => (
                  <div
                    key={label}
                    className="flex aspect-square items-center justify-center rounded-xl bg-forest-green/30 p-6 text-center font-sans text-body-s text-cloud/60"
                  >
                    {label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
