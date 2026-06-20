/**
 * Sidebar filters for collection pages — Chewy-style facet filtering.
 */

import {useSearchParams} from 'react-router';
import {PRICE_FILTERS, SORT_OPTIONS} from '~/lib/pawraCollections';

/**
 * @param {{
 *   productTypes?: string[];
 *   tags?: string[];
 *   showSpecies?: boolean;
 * }} props
 */
export function CollectionFilters({productTypes = [], tags = [], showSpecies = false}) {
  const [searchParams, setSearchParams] = useSearchParams();

  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams);
    if (!value) {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next, {preventScrollReset: true});
  }

  const activePrice = searchParams.get('price') ?? '';
  const activeType = searchParams.get('type') ?? '';
  const activeTag = searchParams.get('tag') ?? '';
  const activeSpecies = searchParams.get('species') ?? '';

  return (
    <aside className="space-y-8">
      <div>
        <h2 className="font-sans text-body-s font-semibold uppercase tracking-wide text-forest-green">
          Sort
        </h2>
        <select
          value={searchParams.get('sort') || 'featured'}
          onChange={(e) => updateParam('sort', e.target.value === 'featured' ? '' : e.target.value)}
          className="mt-3 w-full rounded-md border border-forest-green/20 bg-cloud px-3 py-2 font-sans text-body-s text-ink"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {showSpecies && (
        <FilterGroup title="Pet">
          <FilterRadio
            label="All pets"
            checked={!activeSpecies}
            onChange={() => updateParam('species', '')}
          />
          <FilterRadio
            label="Dogs"
            checked={activeSpecies === 'dogs'}
            onChange={() => updateParam('species', 'dogs')}
          />
          <FilterRadio
            label="Cats"
            checked={activeSpecies === 'cats'}
            onChange={() => updateParam('species', 'cats')}
          />
        </FilterGroup>
      )}

      <FilterGroup title="Price">
        <FilterRadio
          label="All prices"
          checked={!activePrice}
          onChange={() => updateParam('price', '')}
        />
        {PRICE_FILTERS.map((range) => (
          <FilterRadio
            key={range.id}
            label={range.label}
            checked={activePrice === range.id}
            onChange={() => updateParam('price', range.id)}
          />
        ))}
      </FilterGroup>

      {productTypes.length > 0 && (
        <FilterGroup title="Category">
          <FilterRadio
            label="All categories"
            checked={!activeType}
            onChange={() => updateParam('type', '')}
          />
          {productTypes.map((type) => (
            <FilterRadio
              key={type}
              label={type}
              checked={activeType === type}
              onChange={() => updateParam('type', type)}
            />
          ))}
        </FilterGroup>
      )}

      {tags.length > 4 && (
        <FilterGroup title="Highlights">
          <FilterRadio
            label="All"
            checked={!activeTag}
            onChange={() => updateParam('tag', '')}
          />
          {tags.slice(0, 8).map((tag) => (
            <FilterRadio
              key={tag}
              label={tag.charAt(0).toUpperCase() + tag.slice(1)}
              checked={activeTag === tag}
              onChange={() => updateParam('tag', tag)}
            />
          ))}
        </FilterGroup>
      )}

      {(activePrice || activeType || activeTag || activeSpecies) && (
        <button
          type="button"
          onClick={() => setSearchParams({}, {preventScrollReset: true})}
          className="font-sans text-body-s text-forest-green underline reset"
        >
          Clear all filters
        </button>
      )}
    </aside>
  );
}

/** @param {{title: string; children: import('react').ReactNode}} props */
function FilterGroup({title, children}) {
  return (
    <div>
      <h2 className="font-sans text-body-s font-semibold uppercase tracking-wide text-forest-green">
        {title}
      </h2>
      <div className="mt-3 space-y-2">{children}</div>
    </div>
  );
}

/** @param {{label: string; checked: boolean; onChange: () => void}} props */
function FilterRadio({label, checked, onChange}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 font-sans text-body-s text-ink/80">
      <input
        type="radio"
        name={label}
        checked={checked}
        onChange={onChange}
        className="accent-forest-green"
      />
      {label}
    </label>
  );
}
