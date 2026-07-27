/**
 * @file pharmacy._index.jsx
 * @description Pharmacy landing — Rx products, how it works, status tracker.
 */

import {Link, useLoaderData} from 'react-router';
import {Button} from '~/components/ui/Button';
import {Badge} from '~/components/ui/Badge';
import {PawraProductCard} from '~/components/PawraProductCard';
import {PrescriptionStepper} from '~/components/pharmacy/PrescriptionStepper';
import {MOCK_PRESCRIPTION_STATUS} from '~/data/platform';
import {MOCK_PRODUCTS} from '~/data/products';
import {isPrescriptionRequired} from '~/lib/productFlags';
import {buildSeoMeta, breadcrumbJsonLd} from '~/lib/seo';

export const meta = () =>
  buildSeoMeta({
    title: 'Pharmacy',
    description: 'PAWRA Pharmacy — prescription diets, preventatives, and easy Rx uploads.',
    url: '/pharmacy',
    jsonLd: breadcrumbJsonLd([
      {label: 'Home', to: '/'},
      {label: 'Pharmacy', to: '/pharmacy'},
    ]),
  });

export async function loader() {
  const rxProducts = MOCK_PRODUCTS.filter(isPrescriptionRequired).slice(0, 8);
  const pharmacyProducts = MOCK_PRODUCTS.filter((p) =>
    (p.tags || []).some((t) => String(t).toLowerCase() === 'pharmacy'),
  ).slice(0, 8);
  return {rxProducts, pharmacyProducts, status: MOCK_PRESCRIPTION_STATUS};
}

export default function PharmacyIndex() {
  const {rxProducts, pharmacyProducts, status} = useLoaderData();

  return (
    <div className="bg-page-bg">
      <section className="border-b border-border-subtle bg-surface px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-1440">
          <p className="font-sans text-body-xs font-medium uppercase tracking-[0.2em] text-action-primary">
            PAWRA Pharmacy
          </p>
          <h1 className="mt-3 max-w-2xl font-sans text-display-m text-text-primary">
            Pharmacy
          </h1>
          <p className="mt-4 max-w-xl font-sans text-body-l text-text-secondary">
            Prescriptions and preventatives, handled with care.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="primary" size="lg" href="/pharmacy/upload">
              Upload a prescription
            </Button>
            <Button variant="secondary" size="lg" href="/telehealth">
              Connect with a vet
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-1440 px-5 py-14 md:px-10">
        <h2 className="font-sans text-heading-m text-text-primary">How it works</h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            ['1', 'Upload Rx', 'Share your vet prescription securely.'],
            ['2', 'Vet approval', 'We confirm details with your clinic when needed.'],
            ['3', 'We ship', 'Track status from approval to delivery.'],
          ].map(([n, title, copy]) => (
            <li key={n} className="rounded-lg border border-border-subtle bg-surface p-6">
              <span className="font-mono text-mono-s text-action-primary">{n}</span>
              <h3 className="mt-3 font-sans text-body-m font-semibold text-text-primary">{title}</h3>
              <p className="mt-2 font-sans text-body-s text-text-secondary">{copy}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-border-subtle bg-surface px-5 py-14 md:px-10">
        <div className="mx-auto grid max-w-1440 gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-sans text-heading-m text-text-primary">Prescription status</h2>
            <p className="mt-2 font-sans text-body-s text-text-secondary">
              Demo tracker for {status.product} ({status.petName})
            </p>
            <div className="mt-6">
              <PrescriptionStepper steps={status.steps} currentStep={status.currentStep} />
            </div>
          </div>
          <div className="rounded-lg border border-border-subtle bg-page-bg p-6">
            <Badge type="rx-required" />
            <p className="mt-4 font-sans text-body-m text-text-primary">Need a new prescription filled?</p>
            <p className="mt-2 font-sans text-body-s text-text-secondary">
              Start with an upload — we&apos;ll guide you through vet authorization.
            </p>
            <Button variant="primary" size="md" href="/pharmacy/upload" className="mt-6">
              Start prescription
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-1440 px-5 py-14 md:px-10">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="font-sans text-heading-m text-text-primary">Featured Rx products</h2>
          <Link to="/collections/pharmacy" className="font-sans text-body-s font-semibold text-action-primary no-underline hover:underline">
            Shop pharmacy
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rxProducts.map((product, i) => (
            <PawraProductCard key={product.id} product={product} loading={i < 2 ? 'eager' : 'lazy'} showCompare />
          ))}
        </div>
        <h2 className="mt-16 font-sans text-heading-m text-text-primary">Pharmacy essentials</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pharmacyProducts.map((product, i) => (
            <PawraProductCard key={product.id} product={product} loading="lazy" showCompare />
          ))}
        </div>
      </section>
    </div>
  );
}
