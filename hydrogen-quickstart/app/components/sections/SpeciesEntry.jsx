/**
 * Species entry tiles — primary homepage discovery path (Chewy-style).
 */

import {SectionReveal} from './SectionReveal';
import {Button} from '~/components/ui/Button';
import {Icon} from '~/components/ui/Icon';
import {PAWRA_SPECIES} from '~/lib/pawraCollections';

const ICONS = {dogs: 'paw', cats: 'heart'};

export function SpeciesEntry() {
  return (
    <SectionReveal>
      <section className="bg-cloud px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="font-serif text-display-s text-forest-green">Who are you shopping for?</h2>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-body-l text-ink/80">
              Start with your pet — every category organized the way you think.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {PAWRA_SPECIES.map((species) => (
              <article
                key={species.id}
                className="flex flex-col rounded-xl border border-forest-green/20 bg-warm-oat p-8 md:p-10"
              >
                <Icon
                  name={ICONS[species.id] ?? 'paw'}
                  size="lg"
                  color="text-electric-jade"
                  className="!h-12 !w-12"
                />
                <h3 className="mt-6 font-serif text-heading-l text-forest-green">{species.title}</h3>
                <p className="mt-3 font-sans text-body-m text-ink/80">{species.description}</p>
                <ul className="mt-4 space-y-1 font-sans text-body-s text-ink/60">
                  {species.categories.slice(0, 4).map((cat) => (
                    <li key={cat.handle}>· {cat.title.replace(/^Dog |^Cat /, '')}</li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button variant="primary" size="md" href={species.path}>
                    Shop {species.title}
                  </Button>
                  <Button variant="ghost" size="md" href={species.featuredPath}>
                    {species.featuredLabel}
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
