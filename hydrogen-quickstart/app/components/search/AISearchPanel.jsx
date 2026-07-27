/**
 * @file AISearchPanel.jsx
 * @description Conversational search mock — keyword parse → product suggestions.
 */

import {useMemo, useState} from 'react';
import {Link} from 'react-router';
import {Button} from '~/components/ui/Button';
import {MOCK_PRODUCTS} from '~/data/products';

const ARTICLE_LINK = {title: 'Senior pet joint care basics', href: '/blog/senior-pet-joint-care'};

/**
 * @param {string} query
 */
function mockAiSearch(query) {
  const q = query.toLowerCase();
  const keywords = [];
  if (q.includes('grain')) keywords.push('grain-free');
  if (q.includes('senior')) keywords.push('senior');
  if (q.includes('joint')) keywords.push('joint');
  if (q.includes('dog')) keywords.push('dogs');
  if (q.includes('cat')) keywords.push('cats');
  if (q.includes('puppy')) keywords.push('puppy');
  if (q.includes('itch') || q.includes('allerg')) keywords.push('grain-free');
  if (!keywords.length) keywords.push('dogs');

  const scored = MOCK_PRODUCTS.map((product) => {
    const tags = (product.tags || []).join(' ').toLowerCase() + ' ' + product.title.toLowerCase();
    const score = keywords.reduce((acc, key) => (tags.includes(key) ? acc + 1 : acc), 0);
    return {product, score};
  })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map((row) => row.product);

  return {
    summary: `Based on “${query}”, here are products that match ${keywords.join(', ')}.`,
    products: scored,
    article: q.includes('joint') || q.includes('senior') ? ARTICLE_LINK : null,
  };
}

export function AISearchPanel() {
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState('');

  const result = useMemo(() => (submitted ? mockAiSearch(submitted) : null), [submitted]);

  return (
    <div className="rounded-lg border border-border-subtle bg-surface p-5">
      <p className="font-sans text-body-xs font-medium uppercase tracking-wide text-action-primary">Ask PAWRA AI</p>
      <h2 className="mt-2 font-sans text-heading-s text-text-primary">Describe what you need</h2>
      <p className="mt-2 font-sans text-body-s text-text-secondary">
        Example: “I need grain-free food for a senior dog with joint issues.”
      </p>
      <form
        className="mt-4 flex flex-col gap-3 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(query.trim());
        }}
      >
        <label className="sr-only" htmlFor="ai-search-input">
          Natural language product search
        </label>
        <input
          id="ai-search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-md border border-border-subtle bg-page-bg px-4 py-3 font-sans text-body-m text-text-primary outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          placeholder="Ask in plain language…"
        />
        <Button type="submit" variant="primary" size="md" className="shrink-0">
          Ask AI
        </Button>
      </form>

      {result ? (
        <div className="mt-6 space-y-4">
          <p className="font-sans text-body-m text-text-primary">{result.summary}</p>
          {result.article ? (
            <Link to={result.article.href} className="inline-block font-sans text-body-s font-semibold text-action-primary no-underline hover:underline">
              Related article: {result.article.title} →
            </Link>
          ) : null}
          <ul className="grid gap-3 sm:grid-cols-2">
            {result.products.map((product) => (
              <li key={product.id}>
                <Link
                  to={`/products/${product.handle}`}
                  className="flex gap-3 rounded-md border border-border-subtle bg-page-bg p-3 no-underline transition-colors hover:border-action-primary"
                >
                  {product.featuredImage?.url ? (
                    <img src={product.featuredImage.url} alt="" className="h-14 w-14 rounded object-cover" loading="lazy" />
                  ) : null}
                  <div>
                    <p className="font-sans text-body-s font-medium text-text-primary">{product.title}</p>
                    <p className="font-mono text-mono-s text-text-secondary">
                      ${product.priceRange.minVariantPrice.amount}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/telehealth/chat" className="inline-flex font-sans text-body-s font-semibold text-action-primary no-underline hover:underline">
            Ask AI Vet in chat →
          </Link>
        </div>
      ) : null}
    </div>
  );
}
