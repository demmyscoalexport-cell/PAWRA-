/**
 * @file telehealth._index.jsx
 * @description Telehealth landing — free chat + video consult.
 */

import {Button} from '~/components/ui/Button';
import {buildSeoMeta, breadcrumbJsonLd} from '~/lib/seo';

export const meta = () =>
  buildSeoMeta({
    title: 'Telehealth',
    description: 'Free vet chat and video consultations with PAWRA Telehealth.',
    url: '/telehealth',
    jsonLd: breadcrumbJsonLd([
      {label: 'Home', to: '/'},
      {label: 'Telehealth', to: '/telehealth'},
    ]),
  });

export default function TelehealthIndex() {
  return (
    <div className="bg-page-bg">
      <section className="border-b border-border-subtle bg-surface px-4 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-1440">
          <p className="font-sans text-body-xs font-medium uppercase tracking-[0.2em] text-action-primary">
            PAWRA Telehealth
          </p>
          <h1 className="mt-3 max-w-2xl font-sans text-display-m text-text-primary">
            Telehealth
          </h1>
          <p className="mt-4 max-w-xl font-sans text-body-l text-text-secondary">
            Vet guidance when you need it.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-1440 gap-6 px-4 py-16 md:grid-cols-2 md:px-10">
        <article className="rounded-lg border border-border-subtle bg-surface p-8">
          <h2 className="font-sans text-heading-s text-text-primary">Free Vet Chat</h2>
          <p className="mt-3 font-sans text-body-m text-text-secondary">
            Message a licensed vet about diet, allergies, and everyday concerns. Demo conversation — no PHI sent.
          </p>
          <Button variant="primary" size="lg" href="/telehealth/chat" className="mt-8">
            Start free chat
          </Button>
        </article>
        <article className="rounded-lg border border-border-subtle bg-surface p-8">
          <h2 className="font-sans text-heading-s text-text-primary">Video Consultation</h2>
          <p className="mt-3 font-sans text-body-m text-text-secondary">
            15-minute video visit for $25. Pick a slot that works for you — booking is simulated locally.
          </p>
          <Button variant="secondary" size="lg" href="/telehealth/book" className="mt-8">
            Book for $25
          </Button>
        </article>
      </section>

      <section className="border-t border-border-subtle bg-surface px-4 py-16 md:px-10">
        <div className="mx-auto max-w-1440">
          <h2 className="font-sans text-heading-m text-text-primary">How it works</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              ['Tell us about your pet', 'Share species, age, and the concern.'],
              ['Chat or book video', 'Choose free messaging or a scheduled consult.'],
              ['Get next steps', 'Receive product guidance or pharmacy handoff.'],
            ].map(([title, copy], i) => (
              <li key={title} className="rounded-lg border border-border-subtle bg-page-bg p-6">
                <span className="font-mono text-mono-s text-action-primary">0{i + 1}</span>
                <h3 className="mt-3 font-sans text-body-m font-semibold text-text-primary">{title}</h3>
                <p className="mt-2 font-sans text-body-s text-text-secondary">{copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
