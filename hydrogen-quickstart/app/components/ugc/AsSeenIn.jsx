/**
 * @file AsSeenIn.jsx
 * @description Minimal press strip.
 */

import {PRESS_LOGOS} from '~/data/platform';

export function AsSeenIn() {
  return (
    <section className="border-y border-border-subtle bg-page-bg px-5 py-12 md:px-10">
      <div className="mx-auto max-w-1440">
        <p className="text-center font-sans text-body-xs font-medium uppercase tracking-[0.18em] text-text-secondary">
          As seen in
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {PRESS_LOGOS.map((logo) => (
            <div key={logo.name} title={logo.name} className="font-sans text-body-s tracking-wide text-text-secondary/70">
              {logo.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
