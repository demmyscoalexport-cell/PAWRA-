/**
 * @file $.jsx
 * @description Branded 404 catch-all route.
 */

import {PawraNotFound} from '~/components/PawraNotFound';

export async function loader({request}) {
  throw new Response(`${new URL(request.url).pathname} not found`, {
    status: 404,
  });
}

export default function CatchAllPage() {
  return <PawraNotFound />;
}

/** @typedef {import('./+types/$').Route} Route */
