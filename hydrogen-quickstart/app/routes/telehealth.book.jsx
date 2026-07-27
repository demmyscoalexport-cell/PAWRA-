/**
 * @file telehealth.book.jsx
 * @description Video consultation booking with mock slots.
 */

import {useState} from 'react';
import {Button} from '~/components/ui/Button';
import {TELEHEALTH_SLOTS} from '~/data/platform';
import {buildSeoMeta} from '~/lib/seo';

export const meta = () =>
  buildSeoMeta({
    title: 'Book Video Consultation',
    description: 'Schedule a PAWRA video vet consult.',
    url: '/telehealth/book',
  });

export default function TelehealthBookPage() {
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const slot = TELEHEALTH_SLOTS.find((s) => s.id === selected);

  if (confirmed && slot) {
    return (
      <div className="bg-page-bg px-4 py-16 md:px-10">
        <div className="mx-auto max-w-lg rounded-lg border border-border-subtle bg-surface p-8 text-center">
          <h1 className="font-sans text-heading-m text-text-primary">Appointment confirmed</h1>
          <p className="mt-3 font-sans text-body-m text-text-secondary">
            Video consult on {slot.date} at {slot.time} · $25
          </p>
          <p className="mt-2 font-sans text-body-s text-text-secondary">Demo booking — no payment processed.</p>
          <Button variant="primary" size="md" href="/telehealth" className="mt-8">
            Back to Telehealth
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-page-bg px-4 py-12 md:px-10 md:py-16">
      <div className="mx-auto grid max-w-1440 gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h1 className="font-sans text-display-s text-text-primary">Book a video consult</h1>
          <p className="mt-3 font-sans text-body-m text-text-secondary">
            Choose an available time. All slots are mock data for the demo experience.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {TELEHEALTH_SLOTS.map((item) => (
              <button
                key={item.id}
                type="button"
                disabled={!item.available}
                onClick={() => setSelected(item.id)}
                className={`reset rounded-lg border px-4 py-4 text-left transition-colors ${
                  selected === item.id
                    ? 'border-action-primary bg-action-primary/10'
                    : item.available
                      ? 'border-border-subtle bg-surface hover:border-action-primary/50'
                      : 'cursor-not-allowed border-border-subtle bg-action-secondary opacity-50'
                }`}
              >
                <p className="font-sans text-body-s font-semibold text-text-primary">{item.date}</p>
                <p className="mt-1 font-mono text-mono-s text-text-secondary">{item.time}</p>
              </button>
            ))}
          </div>
        </div>

        <aside className="h-fit rounded-lg border border-border-subtle bg-surface p-6 shadow-sm">
          <h2 className="font-sans text-body-m font-semibold text-text-primary">Appointment summary</h2>
          <dl className="mt-4 space-y-3 font-sans text-body-s">
            <div className="flex justify-between gap-3">
              <dt className="text-text-secondary">Service</dt>
              <dd className="text-text-primary">Video consultation</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-text-secondary">Price</dt>
              <dd className="font-mono text-text-primary">$25.00</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-text-secondary">When</dt>
              <dd className="text-text-primary">{slot ? `${slot.date} · ${slot.time}` : 'Select a slot'}</dd>
            </div>
          </dl>
          <Button
            type="button"
            variant="primary"
            size="lg"
            className="mt-6 w-full"
            disabled={!selected}
            onClick={() => setConfirmed(true)}
          >
            Confirm booking
          </Button>
        </aside>
      </div>
    </div>
  );
}
