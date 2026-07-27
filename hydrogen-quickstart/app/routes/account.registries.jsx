/**
 * @file account.registries.jsx
 * @description Gift registry list + create form (mock).
 */

import {useState} from 'react';
import {Link} from 'react-router';
import {Button} from '~/components/ui/Button';
import {MOCK_REGISTRIES} from '~/data/platform';
import {MOCK_PRODUCTS} from '~/data/products';
import {buildSeoMeta} from '~/lib/seo';

export const meta = () =>
  buildSeoMeta({
    title: 'Gift Registries',
    url: '/account/registries',
    robots: {noIndex: true, noFollow: true},
  });

export default function AccountRegistriesPage() {
  const [registries, setRegistries] = useState(MOCK_REGISTRIES);
  const [selectedHandles, setSelectedHandles] = useState([]);

  function createRegistry(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const occasion = String(data.get('occasion') || 'Gift Registry');
    const recipient = String(data.get('recipient') || 'Pet');
    const date = String(data.get('date') || '2026-12-01');
    const id = `${occasion}-${recipient}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const items = selectedHandles.map((handle) => {
      const product = MOCK_PRODUCTS.find((p) => p.handle === handle);
      return {
        handle,
        title: product?.title || handle,
        price: product?.priceRange?.minVariantPrice?.amount || '0',
        purchased: false,
      };
    });
    setRegistries((prev) => [
      {
        id,
        occasion,
        recipient,
        date,
        progress: 0,
        items,
      },
      ...prev,
    ]);
    setSelectedHandles([]);
    event.currentTarget.reset();
  }

  function toggleProduct(handle) {
    setSelectedHandles((prev) =>
      prev.includes(handle) ? prev.filter((h) => h !== handle) : [...prev, handle].slice(0, 8),
    );
  }

  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-sans text-heading-m text-text-primary">Gift registries</h2>
        <p className="mt-1 font-sans text-body-s text-text-secondary">
          Create a shareable list for new pets, birthdays, and adoptions.
        </p>
      </div>

      <ul className="space-y-4">
        {registries.map((registry) => (
          <li key={registry.id} className="rounded-lg border border-border-subtle bg-page-bg p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-sans text-body-m font-semibold text-text-primary">
                  {registry.occasion} — {registry.recipient}
                </p>
                <p className="mt-1 font-mono text-mono-s text-text-secondary">Event {registry.date}</p>
              </div>
              <Link
                to={`/registry/${registry.id}`}
                className="font-sans text-body-s font-semibold text-action-primary no-underline hover:underline"
              >
                Public page →
              </Link>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-action-secondary">
              <div
                className="h-full rounded-full bg-action-primary"
                style={{width: `${Math.round(registry.progress * 100)}%`}}
              />
            </div>
            <p className="mt-2 font-mono text-mono-s text-text-secondary">
              {Math.round(registry.progress * 100)}% purchased · {registry.items.length} items
            </p>
          </li>
        ))}
      </ul>

      <form onSubmit={createRegistry} className="space-y-4 rounded-lg border border-border-subtle p-4">
        <h3 className="font-sans text-body-m font-semibold text-text-primary">Create a registry</h3>
        <div className="grid gap-3 md:grid-cols-3">
          <input name="occasion" required placeholder="Occasion" className="rounded-md border border-border-subtle bg-surface px-3 py-2 font-sans text-body-s outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" />
          <input name="recipient" required placeholder="Recipient name" className="rounded-md border border-border-subtle bg-surface px-3 py-2 font-sans text-body-s outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" />
          <input name="date" type="date" required className="rounded-md border border-border-subtle bg-surface px-3 py-2 font-sans text-body-s outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" />
        </div>
        <div>
          <p className="mb-2 font-sans text-body-s text-text-secondary">Add products (select up to 8)</p>
          <div className="grid max-h-56 gap-2 overflow-y-auto sm:grid-cols-2">
            {MOCK_PRODUCTS.slice(0, 16).map((product) => (
              <label key={product.handle} className="flex items-center gap-2 rounded-md border border-border-subtle bg-page-bg px-3 py-2 font-sans text-body-xs text-text-primary">
                <input
                  type="checkbox"
                  checked={selectedHandles.includes(product.handle)}
                  onChange={() => toggleProduct(product.handle)}
                  className="accent-[rgb(var(--color-action-primary))]"
                />
                {product.title}
              </label>
            ))}
          </div>
        </div>
        <Button type="submit" variant="primary" size="md">
          Create registry
        </Button>
      </form>
    </div>
  );
}
