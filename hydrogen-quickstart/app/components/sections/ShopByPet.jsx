/**
 * @file ShopByPet.jsx
 * @description Two image-led tiles — Dog / Cat.
 */

import {Link} from 'react-router';
import {SectionReveal} from './SectionReveal';
import {getImage} from '~/lib/lifestyleImages';
import {collectionPath} from '~/lib/pawraCollections';

const PETS = [
  {
    name: 'Shop Dogs',
    href: collectionPath('dogs'),
    image: getImage('dog'),
    alt: 'Dog in a modern living space',
  },
  {
    name: 'Shop Cats',
    href: collectionPath('cats'),
    image: getImage('cat'),
    alt: 'Cat on designer furniture',
  },
];

export function ShopByPet() {
  return (
    <SectionReveal eager>
      <section className="bg-page-bg px-4 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-1440 gap-4 md:grid-cols-2 md:gap-6">
          {PETS.map((pet) => (
            <Link
              key={pet.name}
              to={pet.href}
              className="group relative aspect-[4/5] overflow-hidden rounded-md no-underline md:aspect-[5/4]"
            >
              <img
                src={pet.image}
                alt={pet.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-slow group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/35" />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 md:p-8">
                <span className="font-sans text-heading-m text-white md:text-heading-l">{pet.name}</span>
                <span className="font-sans text-body-m text-white/90" aria-hidden="true">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </SectionReveal>
  );
}
