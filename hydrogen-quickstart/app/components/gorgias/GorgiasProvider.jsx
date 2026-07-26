import {Await, useRouteLoaderData} from 'react-router';
import {Suspense} from 'react';
import {GorgiasCartContext} from '~/components/gorgias/GorgiasCartContext';
import {GorgiasChat} from '~/components/gorgias/GorgiasChat';
import {GorgiasIdentify} from '~/components/gorgias/GorgiasIdentify';
import {GorgiasPageContext} from '~/components/gorgias/GorgiasPageContext';
import {customerFromCart, resolveGorgiasConfig} from '~/lib/gorgias';

/**
 * Root-level Gorgias integration: widget + identify + cart + page context.
 * Mount once in Layout <body> so it survives SPA navigations.
 */
export function GorgiasProvider() {
  /** @type {{ integrations?: { gorgias?: { widgetId?: string; convertId?: string } | null }; cart?: Promise<any> | any } | undefined} */
  const rootData = useRouteLoaderData('root');
  const config = resolveGorgiasConfig(rootData?.integrations?.gorgias);

  if (!config.enabled) return null;

  return (
    <>
      <GorgiasChat
        enabled={config.enabled}
        widgetId={config.widgetId}
        convertId={config.convertId}
      />
      <GorgiasPageContext />
      <Suspense fallback={null}>
        <Await resolve={rootData?.cart}>
          {(cart) => (
            <>
              <GorgiasIdentify customer={customerFromCart(cart)} />
              <GorgiasCartContext cart={cart} />
            </>
          )}
        </Await>
      </Suspense>
    </>
  );
}
