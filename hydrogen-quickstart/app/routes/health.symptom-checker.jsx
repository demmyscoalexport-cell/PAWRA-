/**
 * @file health.symptom-checker.jsx
 * @description Symptom checker → conditions, products, telehealth.
 */

import {useState} from 'react';
import {Link} from 'react-router';
import {Button} from '~/components/ui/Button';
import {PawraProductCard} from '~/components/PawraProductCard';
import {SYMPTOM_GUIDE} from '~/data/platform';
import {getMockProductByHandle} from '~/data/products';
import {buildSeoMeta} from '~/lib/seo';

export const meta = () =>
  buildSeoMeta({
    title: 'Symptom Checker',
    description: 'Explore common pet symptoms and PAWRA care next steps.',
    url: '/health/symptom-checker',
  });

export default function SymptomCheckerPage() {
  const [symptom, setSymptom] = useState('');
  const guide = symptom ? SYMPTOM_GUIDE[symptom] : null;
  const products = guide
    ? guide.products.map((handle) => getMockProductByHandle(handle)).filter(Boolean)
    : [];

  return (
    <div className="bg-page-bg px-5 py-12 md:px-10 md:py-16">
      <div className="mx-auto max-w-3xl">
        <p className="font-sans text-body-xs font-medium uppercase tracking-[0.2em] text-action-primary">
          Health Hub
        </p>
        <h1 className="mt-3 font-sans text-display-s text-text-primary">Symptom checker</h1>
        <p className="mt-3 font-sans text-body-m text-text-secondary">
          Educational guidance only — not a diagnosis. For urgent concerns, contact your vet or start a telehealth chat.
        </p>

        <label className="mt-8 block font-sans text-body-s font-medium text-text-primary" htmlFor="symptom">
          What symptom is your pet experiencing?
        </label>
        <select
          id="symptom"
          value={symptom}
          onChange={(e) => setSymptom(e.target.value)}
          className="mt-2 w-full rounded-md border border-border-subtle bg-surface px-4 py-3 font-sans text-body-m text-text-primary outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
        >
          <option value="">Select a symptom…</option>
          {Object.entries(SYMPTOM_GUIDE).map(([key, value]) => (
            <option key={key} value={key}>
              {value.label}
            </option>
          ))}
        </select>

        {guide ? (
          <div className="mt-10 space-y-8">
            <section className="rounded-lg border border-border-subtle bg-surface p-6">
              <h2 className="font-sans text-body-m font-semibold text-text-primary">Possible considerations</h2>
              <ul className="mt-3 list-disc space-y-1 pl-5 font-sans text-body-s text-text-secondary">
                {guide.conditions.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="primary" size="md" href="/telehealth/chat">
                  Chat with a vet
                </Button>
                <Link to={guide.article} className="inline-flex items-center font-sans text-body-s font-semibold text-action-primary no-underline hover:underline">
                  Related reading →
                </Link>
              </div>
            </section>

            {products.length ? (
              <section>
                <h2 className="font-sans text-heading-s text-text-primary">Helpful products</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {products.map((product) => (
                    <PawraProductCard key={product.id} product={product} loading="lazy" showCompare />
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
