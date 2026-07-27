/**
 * @file AsSeenIn.jsx
 * @description Press / as-seen-in logo strip.
 */

import {PRESS_LOGOS} from '~/data/platform';

export function AsSeenIn() {
  return (
    <section className="border-y border-border-subtle bg-page-bg px-5 py-10 md:px-10">
      <div className="mx-auto max-w-1440">
        <p className="text-center font-sans text-body-xs font-medium uppercase tracking-[0.2em] text-text-secondary">
          As seen in
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {PRESS_LOGOS.map((logo) => (
            <div
              key={logo.name}
              className="flex h-12 min-w-[7rem] items-center justify-center rounded-md border border-border-subtle bg-surface px-4"
              title={logo.name}
            >
              <span className="font-serif text-heading-s tracking-wide text-text-secondary/70">{logo.initials}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
