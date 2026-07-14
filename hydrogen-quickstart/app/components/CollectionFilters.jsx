import {useSearchParams} from 'react-router';
import {
  COLLECTION_SORT_OPTIONS,
  SPECIES_FILTER_OPTIONS,
  filterProductsBySpecies,
  filterProductsByPrice,
  sortProducts,
} from '~/lib/pawraCollections';

/**
 * Shared PLP filters — species, price range, and sort via URL search params.
 * @param {{ showSpecies?: boolean }} props
 */
export function CollectionFilters({showSpecies = true}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || 'featured';
  const species = searchParams.get('species') || 'all';
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
    setSearchParams(next, {preventScrollReset: true});
  }

  return (
    <div className="flex flex-wrap items-end gap-4">
      {showSpecies && (
        <label className="flex flex-col gap-1 font-sans text-body-s">
          <span className="text-ink/60">Pet</span>
          <select
            value={species}
            onChange={(e) => updateParams({species: e.target.value})}
            className="rounded-md border border-forest-green/20 bg-cloud px-3 py-2 font-sans text-body-s text-ink"
          >
            {SPECIES_FILTER_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      )}
      <label className="flex flex-col gap-1 font-sans text-body-s">
        <span className="text-ink/60">Min price</span>
        <input
          type="number"
          min="0"
          step="1"
          placeholder="0"
          value={priceMin}
          onChange={(e) => updateParams({priceMin: e.target.value})}
          className="w-24 rounded-md border border-forest-green/20 bg-cloud px-3 py-2 font-mono text-mono-s text-ink"
        />
      </label>
      <label className="flex flex-col gap-1 font-sans text-body-s">
        <span className="text-ink/60">Max price</span>
        <input
          type="number"
          min="0"
          step="1"
          placeholder="Any"
          value={priceMax}
          onChange={(e) => updateParams({priceMax: e.target.value})}
          className="w-24 rounded-md border border-forest-green/20 bg-cloud px-3 py-2 font-mono text-mono-s text-ink"
        />
      </label>
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
  const priceMin = searchParams.get('priceMin');
  const priceMax = searchParams.get('priceMax');
  const sort = searchParams.get('sort') || 'featured';

  let filtered = filterProductsBySpecies(products, species);
  filtered = filterProductsByPrice(
    filtered,
    priceMin ? Number(priceMin) : null,
    priceMax ? Number(priceMax) : null,
  );
  return sortProducts(filtered, sort);
}
