import {Link} from 'react-router';
import {Button} from '~/components/ui/Button';
import {PAWRA_COLLECTIONS} from '~/lib/pawraCollections';

/**
 * Branded 404 page for catch-all and missing routes.
 */
export function PawraNotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-page-bg px-4 py-20 text-center">
      <p className="font-mono text-mono-s uppercase tracking-widest text-action-primary/60">404</p>
      <h1 className="mt-4 font-serif text-[2.5rem] text-action-primary md:text-[3rem]">
        This page wandered off
      </h1>
      <p className="mt-4 max-w-md font-sans text-body-m text-text-secondary">
        We couldn&apos;t find that page. Try shopping our collections or head back home.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Button variant="primary" size="lg" href="/">
          Back to home
        </Button>
        <Button variant="secondary" size="lg" href="/collections/all">
          Shop all products
        </Button>
      </div>
      <div className="mt-12 flex flex-wrap justify-center gap-3">
        {PAWRA_COLLECTIONS.filter((c) => c.handle !== 'all').slice(0, 4).map((col) => (
          <Link
            key={col.handle}
            to={col.path}
            className="rounded-md border border-border-subtle bg-surface px-4 py-2 font-sans text-body-s text-action-primary no-underline hover:bg-surface/80"
          >
            {col.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
