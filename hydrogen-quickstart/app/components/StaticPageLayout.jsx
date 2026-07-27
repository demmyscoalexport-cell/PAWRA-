/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET CARES               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetcares.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file StaticPageLayout.jsx
 * @description Shared component: StaticPageLayout.
 * @author Pawra LLC
 * @website pawrapetcares.com
 */

import {SectionReveal} from '~/components/sections/SectionReveal';

/**
 * @param {{title: string; description?: string; children: React.ReactNode}}
 */
export function StaticPageLayout({title, description, children}) {
  return (
    <SectionReveal>
      <div className="bg-page-bg px-4 py-12 md:px-10 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="font-sans text-body-xs font-medium uppercase tracking-[0.2em] text-action-primary">
            PAWRA
          </p>
          <h1 className="mt-3 font-sans text-display-s text-text-primary md:text-[3.5rem] md:leading-[1.1]">
            {title}
          </h1>
          {description && (
            <p className="mt-4 font-sans text-body-l text-text-secondary">{description}</p>
          )}
          <div className="prose-pawra mt-10 font-sans text-body-m text-text-primary [&_a]:text-action-primary [&_a]:underline [&_h3]:mt-8 [&_h3]:font-sans [&_h3]:text-heading-s [&_h3]:text-text-primary [&_li]:mt-2 [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-4">
            {children}
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
