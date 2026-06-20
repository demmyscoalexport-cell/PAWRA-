/**
 * Shared collection page layout — header, filters, product grid.
 */

import {Breadcrumbs} from '~/components/Breadcrumbs';
import {CollectionFilters} from '~/components/CollectionFilters';
import {PawraProductCard} from '~/components/PawraProductCard';

/**
 * @param {{
 *   title: string;
 *   description?: string | null;
 *   breadcrumbs: Array<{label: string; path?: string}>;
 *   products: Array<import('storefrontapi.generated').ProductItemFragment>;
 *   facets?: {types: string[]; tags: string[]};
 *   showSpeciesFilter?: boolean;
 *   emptyMessage?: string;
 * }} props
 */
export function CollectionPageShell({
  title,
  description,
  breadcrumbs,
  products,
  facets = {types: [], tags: []},
  showSpeciesFilter = false,
  emptyMessage = 'No products match your filters yet.',
}) {
  return (
    <div className="bg-warm-oat">
      <section className="border-b border-forest-green/10 bg-cloud px-4 py-10 md:px-8 md:py-14">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs crumbs={breadcrumbs} />
          <h1 className="mt-4 font-serif text-[2.5rem] leading-[1.1] text-forest-green md:text-[3.5rem]">
            {title}
          </h1>
          {description && (
            <p className="mt-4 max-w-2xl font-sans text-body-l text-ink/80">{description}</p>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <div className="hidden lg:block">
            <CollectionFilters
              productTypes={facets.types}
              tags={facets.tags}
              showSpecies={showSpeciesFilter}
            />
          </div>

          <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 lg:hidden">
              <p className="font-mono text-mono-s text-ink/60">{products.length} products</p>
              <CollectionFilters
                productTypes={facets.types}
                tags={facets.tags}
                showSpecies={showSpeciesFilter}
              />
            </div>

            <p className="mb-6 hidden font-mono text-mono-s text-ink/60 lg:block">
              {products.length} {products.length === 1 ? 'product' : 'products'}
            </p>

            {products.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product, index) => (
                  <PawraProductCard
                    key={product.id}
                    product={product}
                    loading={index < 8 ? 'eager' : undefined}
                  />
                ))}
              </div>
            ) : (
              <p className="py-16 text-center font-sans text-body-m text-ink/60">{emptyMessage}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
