/**
 * Species mega menu — Chewy-inspired pet-first navigation.
 */

import {NavLink} from 'react-router';
import {PAWRA_SPECIES} from '~/lib/pawraCollections';
import {Button} from '~/components/ui/Button';

/**
 * @param {{speciesId: string; onNavigate?: () => void}} props
 */
export function MegaMenu({speciesId, onNavigate}) {
  const species = PAWRA_SPECIES.find((s) => s.id === speciesId);
  if (!species) return null;

  return (
    <div className="absolute left-0 top-full z-50 mt-0 w-[min(640px,calc(100vw-2rem))] rounded-lg border border-cloud/10 bg-midnight py-4 shadow-xl">
      <div className="grid gap-6 px-4 md:grid-cols-[1fr_auto] md:px-6">
        <div>
          <p className="font-sans text-body-xs font-semibold uppercase tracking-wide text-electric-jade">
            Shop {species.title}
          </p>
          <NavLink
            to={species.path}
            onClick={onNavigate}
            className="mt-1 block font-serif text-heading-s text-cloud no-underline hover:text-electric-jade"
          >
            All {species.title} Products
          </NavLink>
          <ul className="mt-4 grid gap-1 sm:grid-cols-2">
            {species.categories.map((cat) => (
              <li key={cat.handle}>
                <NavLink
                  to={cat.path}
                  onClick={onNavigate}
                  className="block rounded-md px-2 py-1.5 font-sans text-body-s text-cloud/80 no-underline hover:bg-forest-green/50 hover:text-cloud"
                >
                  {cat.title.replace(`${species.title.slice(0, -1)} `, '').replace('Dog ', '').replace('Cat ', '')}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden flex-col justify-between rounded-lg bg-forest-green/40 p-4 md:flex md:min-w-[180px]">
          <div>
            <p className="font-sans text-body-xs uppercase tracking-wide text-cloud/60">Featured</p>
            <p className="mt-2 font-sans text-body-s font-medium text-cloud">{species.featuredLabel}</p>
          </div>
          <Button variant="accent" size="sm" href={species.featuredPath} className="mt-4">
            Shop now
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * Mobile accordion for species categories.
 * @param {{speciesId: string; onNavigate?: () => void}} props
 */
export function MobileSpeciesMenu({speciesId, onNavigate}) {
  const species = PAWRA_SPECIES.find((s) => s.id === speciesId);
  if (!species) return null;

  return (
    <div className="ml-3 space-y-1 border-l border-cloud/10 pl-3">
      <NavLink
        to={species.path}
        onClick={onNavigate}
        className="block rounded-md px-3 py-2 font-sans text-body-s text-cloud/80 no-underline hover:bg-forest-green/50"
      >
        All {species.title}
      </NavLink>
      {species.categories.map((cat) => (
        <NavLink
          key={cat.handle}
          to={cat.path}
          onClick={onNavigate}
          className="block rounded-md px-3 py-2 font-sans text-body-s text-cloud/70 no-underline hover:bg-forest-green/50"
        >
          {cat.title}
        </NavLink>
      ))}
    </div>
  );
}
