/**
 * @file HeroSection.jsx
 * @description Full-bleed minimal hero — single CTA, lifestyle photography.
 */

import {SectionReveal} from './SectionReveal';
import {Button} from '~/components/ui/Button';
import {PawraLogo} from '~/components/ui/PawraLogo';
import {getImage} from '~/lib/lifestyleImages';

const HERO_IMAGE = getImage('hero');

export function HeroSection() {
  return (
    <SectionReveal eager>
      <section className="relative min-h-[78vh] w-full overflow-hidden bg-page-bg md:min-h-[88vh]" aria-label="Hero">
        <img
          src={HERO_IMAGE}
          alt="Dog resting in a bright modern interior"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-black/10" />
        <div className="relative z-10 mx-auto flex min-h-[78vh] max-w-1440 flex-col items-center justify-center px-4 py-24 text-center md:min-h-[88vh] md:px-10">
          <div className="mb-8 text-white">
            <PawraLogo variant="light" height={28} />
          </div>
          <h1 className="max-w-3xl font-serif text-display-m text-white md:text-display-l">
            For the modern dog.
          </h1>
          <p className="mt-4 max-w-md font-sans text-body-m text-white/80">
            Essentials designed with calm intent.
          </p>
          <div className="mt-10">
            <Button
              variant="secondary"
              size="lg"
              href="/collections/dogs"
              className="!border-white !bg-white !text-forest-green hover:!bg-white/90"
            >
              Shop Dogs
            </Button>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
