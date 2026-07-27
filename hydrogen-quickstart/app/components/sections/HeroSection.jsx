/**
 * @file HeroSection.jsx
 * @description Full-bleed care-first hero — brand, promise, starter CTAs.
 */

import {SectionReveal} from './SectionReveal';
import {Button} from '~/components/ui/Button';
import {PawraLogo} from '~/components/ui/PawraLogo';
import {getImage} from '~/lib/lifestyleImages';
import {PET_GUARANTEE} from '~/data/starterKits';

const HERO_IMAGE = getImage('hero');

export function HeroSection() {
  return (
    <SectionReveal eager>
      <section
        className="relative min-h-[78vh] w-full overflow-hidden bg-page-bg md:min-h-[88vh]"
        aria-label="Hero"
      >
        <img
          src={HERO_IMAGE}
          alt="Dog resting in a bright modern home"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-black/15" />
        <div className="relative z-10 mx-auto flex min-h-[78vh] max-w-1440 flex-col items-center justify-center px-4 py-24 text-center md:min-h-[88vh] md:px-10">
          <div className="mb-8 text-white">
            <PawraLogo variant="light" height={28} />
          </div>
          <h1 className="max-w-3xl font-serif text-display-m text-white md:text-display-l">
            Care essentials for modern pets.
          </h1>
          <p className="mt-4 max-w-lg font-sans text-body-m text-white/85">
            Starter kits, thoughtful gear, and a {PET_GUARANTEE.title.toLowerCase()} — so your first order feels safe.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="secondary"
              size="lg"
              href="/bundles/new-dog-starter"
              className="!border-white !bg-white !text-forest-green hover:!bg-white/90"
            >
              Shop starter kit
            </Button>
            <Button
              variant="ghost"
              size="lg"
              href="/care/quiz"
              className="!border-white/50 !text-white hover:!bg-white/10"
            >
              Take the care quiz
            </Button>
          </div>
          <p className="mt-6 font-sans text-body-xs text-white/70">{PET_GUARANTEE.short}</p>
        </div>
      </section>
    </SectionReveal>
  );
}
