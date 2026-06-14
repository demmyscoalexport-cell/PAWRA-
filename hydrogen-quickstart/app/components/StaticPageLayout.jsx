import {SectionReveal} from '~/components/sections/SectionReveal';

/**
 * @param {{title: string; description?: string; children: React.ReactNode}}
 */
export function StaticPageLayout({title, description, children}) {
  return (
    <SectionReveal>
      <div className="bg-warm-oat px-4 py-12 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="font-sans text-body-xs font-medium uppercase tracking-[0.2em] text-forest-green">
            PAWRA
          </p>
          <h1 className="mt-3 font-serif text-display-s text-forest-green md:text-[3.5rem] md:leading-[1.1]">
            {title}
          </h1>
          {description && (
            <p className="mt-4 font-sans text-body-l text-ink/80">{description}</p>
          )}
          <div className="prose-pawra mt-10 font-sans text-body-m text-ink [&_a]:text-forest-green [&_a]:underline [&_h3]:mt-8 [&_h3]:font-serif [&_h3]:text-heading-s [&_h3]:text-forest-green [&_li]:mt-2 [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5">
            {children}
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
