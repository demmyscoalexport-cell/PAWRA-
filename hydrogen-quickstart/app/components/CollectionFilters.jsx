import {useSearchParams} from 'react-router';
import {
  COLLECTION_SORT_OPTIONS,
  SPECIES_FILTER_OPTIONS,
  filterProductsBySpecies,
  filterProductsByCategory,
  filterProductsByPrice,
  sortProducts,
} from '~/lib/pawraCollections';

const PRICE_PRESETS = [
  {label: 'Under $25', priceMin: '', priceMax: '25'},
  {label: '$25–$50', priceMin: '25', priceMax: '50'},
  {label: '$50–$100', priceMin: '50', priceMax: '100'},
  {label: '$100+', priceMin: '100', priceMax: ''},
];

/** Hydrogen cursor pagination keys — clear when filters change so PLP restarts at page 1. */
const PAGINATION_KEYS = ['cursor', 'direction'];

/**
 * Chewy-style PLP filters — pet chips, price presets, sort.
 * @param {{ showSpecies?: boolean }} props
 */
export function CollectionFilters({showSpecies = true}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || 'featured';
  const species = searchParams.get('species') || 'all';
  const category = searchParams.get('category') || 'all';
  const priceMin = searchParams.get('priceMin') || '';
  const priceMax = searchParams.get('priceMax') || '';

  /** @param {Record<string, string>} updates */
  function updateParams(updates) {
    const next = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(updates)) {
      if (!value || value === 'all' || value === 'featured') {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    }
    for (const key of PAGINATION_KEYS) next.delete(key);
    setSearchParams(next, {preventScrollReset: true});
  }

  function clearFilters() {
    const next = new URLSearchParams(searchParams);
    next.delete('species');
    next.delete('category');
    next.delete('priceMin');
    next.delete('priceMax');
    next.delete('sort');
    for (const key of PAGINATION_KEYS) next.delete(key);
    setSearchParams(next, {preventScrollReset: true});
  }

  const hasActiveFilters =
    (showSpecies && species !== 'all') ||
    category !== 'all' ||
    priceMin ||
    priceMax ||
    sort !== 'featured';

  return (
    <div className="flex w-full flex-col gap-4">
      {showSpecies ? (
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 font-sans text-body-s font-semibold text-ink/60">Pet</span>
          {SPECIES_FILTER_OPTIONS.map((opt) => {
            const active = species === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => updateParams({species: opt.value})}
                className={`reset rounded-md border px-3 py-1.5 font-sans text-body-s font-medium transition-colors ${
                  active
                    ? 'border-forest-green bg-forest-green text-cloud'
                    : 'border-forest-green/20 bg-cloud text-ink hover:border-forest-green/40'
                }`}
                aria-pressed={active}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 font-sans text-body-s font-semibold text-ink/60">Price</span>
        {PRICE_PRESETS.map((preset) => {
          const active = priceMin === preset.priceMin && priceMax === preset.priceMax;
          return (
            <button
              key={preset.label}
              type="button"
              onClick={() =>
                updateParams({
                  priceMin: active ? '' : preset.priceMin,
                  priceMax: active ? '' : preset.priceMax,
                })
              }
              className={`reset rounded-md border px-3 py-1.5 font-sans text-body-s font-medium transition-colors ${
                active
                  ? 'border-forest-green bg-forest-green text-cloud'
                  : 'border-forest-green/20 bg-cloud text-ink hover:border-forest-green/40'
              }`}
              aria-pressed={active}
            >
              {preset.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-end gap-4">
        <label className="flex flex-col gap-1 font-sans text-body-s">
          <span className="text-ink/60">Sort by</span>
          <select
            value={sort}
            onChange={(e) => updateParams({sort: e.target.value})}
            className="rounded-md border border-forest-green/20 bg-cloud px-3 py-2 font-sans text-body-s text-ink"
          >
            {COLLECTION_SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>

        {hasActiveFilters ? (
          <button
            type="button"
            onClick={clearFilters}
            className="reset font-sans text-body-s font-semibold text-forest-green underline"
          >
            Clear filters
          </button>
        ) : null}
      </div>
    </div>
  );
}

/**
 * Apply URL filter params to a product list.
 * @param {Array<{ tags?: string[]; title?: string; priceRange?: { minVariantPrice?: { amount?: string } } }>} products
 * @param {URLSearchParams} searchParams
 */
export function applyCollectionFilters(products, searchParams) {
  const species = searchParams.get('species') || 'all';
  const category = searchParams.get('category') || 'all';
  const priceMin = searchParams.get('priceMin');
  const priceMax = searchParams.get('priceMax');
  const sort = searchParams.get('sort') || 'featured';

  let filtered = filterProductsBySpecies(products, species);
  filtered = filterProductsByCategory(filtered, category);
  filtered = filterProductsByPrice(
    filtered,
    priceMin ? Number(priceMin) : null,
    priceMax ? Number(priceMax) : null,
  );
  return sortProducts(filtered, sort);
}

/** True when URL has client-side filters that shrink the current page of products. */
export function hasClientCollectionFilters(searchParams) {
  const species = searchParams.get('species');
  const category = searchParams.get('category');
  const priceMin = searchParams.get('priceMin');
  const priceMax = searchParams.get('priceMax');
  const sort = searchParams.get('sort');
  return Boolean(
    (species && species !== 'all') ||
      (category && category !== 'all') ||
      priceMin ||
      priceMax ||
      (sort && sort !== 'featured'),
  );
}
