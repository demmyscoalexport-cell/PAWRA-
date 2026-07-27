/**
 * @file registry.$registryId.jsx
 * @description Public gift registry page.
 */

import {Link, useLoaderData} from 'react-router';
import {Button} from '~/components/ui/Button';
import {getMockRegistryById} from '~/data/platform';
import {buildSeoMeta, breadcrumbJsonLd} from '~/lib/seo';

export const meta = ({data}) => {
  const registry = data?.registry;
  const title = registry ? `${registry.occasion} registry for ${registry.recipient}` : 'Gift Registry';
  return buildSeoMeta({
    title,
    description: 'Shop a PAWRA gift registry for pets you love.',
    url: registry ? `/registry/${registry.id}` : '/registry',
    jsonLd: breadcrumbJsonLd([
      {label: 'Home', to: '/'},
      {label: 'Registry', to: registry ? `/registry/${registry.id}` : undefined},
    ]),
  });
};

export async function loader({params}) {
  const registry = getMockRegistryById(params.registryId);
  if (!registry) {
    throw new Response('Registry not found', {status: 404});
  }
  return {registry};
}

export default function PublicRegistryPage() {
  const {registry} = useLoaderData();
  const purchased = registry.items.filter((i) => i.purchased).length;

  return (
    <div className="bg-page-bg px-5 py-12 md:px-10 md:py-16">
      <div className="mx-auto max-w-3xl">
        <p className="font-sans text-body-xs font-medium uppercase tracking-[0.2em] text-action-primary">
          Gift registry
        </p>
        <h1 className="mt-3 font-sans text-display-s text-text-primary">
          {registry.occasion} for {registry.recipient}
        </h1>
        <p className="mt-2 font-sans text-body-m text-text-secondary">Event date {registry.date}</p>

        <div className="mt-6 h-2 overflow-hidden rounded-pill bg-action-secondary">
          <div className="h-full bg-action-primary" style={{width: `${Math.round(registry.progress * 100)}%`}} />
        </div>
        <p className="mt-2 font-mono text-mono-s text-text-secondary">
          {purchased} of {registry.items.length} gifts purchased
        </p>

        <ul className="mt-10 space-y-4">
          {registry.items.map((item) => (
            <li key={item.handle} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border-subtle bg-surface p-4">
              <div>
                <p className="font-sans text-body-m font-medium text-text-primary">{item.title}</p>
                <p className="font-mono text-mono-s text-text-secondary">${item.price}</p>
              </div>
              {item.purchased ? (
                <span className="rounded-pill bg-success/10 px-3 py-1 font-sans text-body-xs font-medium text-success">
                  Purchased
                </span>
              ) : (
                <Button variant="primary" size="sm" href={`/products/${item.handle}`}>
                  Buy gift
                </Button>
              )}
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center font-sans text-body-s text-text-secondary">
          Managing this registry?{' '}
          <Link to="/account/registries" className="font-semibold text-action-primary">
            Open account
          </Link>
        </p>
      </div>
    </div>
  );
}
