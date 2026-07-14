/**
 * @file blogs.$blogHandle._index.jsx
 * @description Redirect legacy Shopify blog routes to PAWRA static blog.
 */

import {redirect} from 'react-router';

export const meta = () => [{title: 'PAWRA | Blog'}];

export async function loader() {
  return redirect('/blog', 301);
}

/** @typedef {import('./+types/blogs.$blogHandle._index').Route} Route */
