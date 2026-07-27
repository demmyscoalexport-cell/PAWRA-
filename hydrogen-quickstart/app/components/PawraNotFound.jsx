import {Link} from 'react-router';
import {Button} from '~/components/ui/Button';
import {COLLECTION_TAXONOMY, taxonomyCollectionPath} from '~/data/collections';
import {PawraLogo} from '~/components/ui/PawraLogo';

/**
 * Branded 404 page for catch-all and missing routes.
 */
export function PawraNotFound() {
  const shopLinks = Object.values(COLLECTION_TAXONOMY).slice(0, 4).map((root) => ({
    title: root.title,
    path: taxonomyCollectionPath([root.handle]),
  }));

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-page-bg px-4 py-20 text-center">
      <PawraLogo variant="icon-only" height={48} className="mb-6" />
      <p className="font-mono text-mono-s uppercase tracking-widest text-text-secondary">404</p>
      <h1 className="mt-4 font-sans text-[2.5rem] text-text-primary md:text-[3rem]">
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
        {shopLinks.map((col) => (
          <Link
            key={col.path}
            to={col.path}
            className="rounded-md border border-border-subtle bg-surface px-4 py-2 font-sans text-body-s text-text-primary no-underline transition-colors hover:border-action-primary hover:text-action-primary"
          >
            {col.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
