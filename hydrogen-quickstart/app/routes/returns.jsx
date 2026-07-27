/**
 * @file returns.jsx
 * @description Returns portal form (mock).
 */

import {useState} from 'react';
import {Button} from '~/components/ui/Button';
import {buildSeoMeta} from '~/lib/seo';

export const meta = () =>
  buildSeoMeta({
    title: 'Returns',
    description: 'Start a PAWRA return and request a label.',
    url: '/returns',
  });

export default function ReturnsPage() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="bg-page-bg px-4 py-16 md:px-10">
        <div className="mx-auto max-w-lg rounded-lg border border-border-subtle bg-surface p-8 text-center">
          <h1 className="font-sans text-heading-m text-text-primary">Return requested</h1>
          <p className="mt-3 font-sans text-body-m text-text-secondary">
            Demo confirmation — status: Label queued. Check your email for next steps.
          </p>
          <Button variant="primary" size="md" href="/" className="mt-8">
            Back home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-page-bg px-4 py-12 md:px-10 md:py-16">
      <div className="mx-auto max-w-xl">
        <h1 className="font-sans text-display-s text-text-primary">Returns portal</h1>
        <p className="mt-3 font-sans text-body-m text-text-secondary">
          Select an item and reason. This demo does not create a real RMA.
        </p>
        <form
          className="mt-8 space-y-4 rounded-lg border border-border-subtle bg-surface p-6"
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
          }}
        >
          <label className="block font-sans text-body-s text-text-primary">
            Order number
            <input name="order" required className="mt-1 w-full rounded-md border border-border-subtle bg-page-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" />
          </label>
          <label className="block font-sans text-body-s text-text-primary">
            Item
            <select name="item" required className="mt-1 w-full rounded-md border border-border-subtle bg-page-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">
              <option value="">Select…</option>
              <option>Grain-Free Salmon Recipe</option>
              <option>No-Pull Harness</option>
              <option>Donut Cuddler Bed</option>
            </select>
          </label>
          <label className="block font-sans text-body-s text-text-primary">
            Reason
            <select name="reason" required className="mt-1 w-full rounded-md border border-border-subtle bg-page-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">
              <option value="">Select…</option>
              <option>Changed mind</option>
              <option>Wrong item</option>
              <option>Damaged</option>
              <option>Doesn&apos;t fit / pet won&apos;t use</option>
            </select>
          </label>
          <label className="flex items-center gap-2 font-sans text-body-s text-text-primary">
            <input type="checkbox" name="label" defaultChecked className="accent-[rgb(var(--color-action-primary))]" />
            Request prepaid return label
          </label>
          <Button type="submit" variant="primary" size="md">
            Submit return
          </Button>
        </form>
      </div>
    </div>
  );
}
