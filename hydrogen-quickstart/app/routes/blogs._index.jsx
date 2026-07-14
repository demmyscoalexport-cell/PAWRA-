/**
 * @file blogs._index.jsx
 * @description Redirect legacy /blogs route to PAWRA static blog at /blog.
 */

import {redirect} from 'react-router';

export const meta = () => [{title: 'PAWRA | Blog'}];

export async function loader() {
  return redirect('/blog', 301);
}

/** @typedef {import('./+types/blogs._index').Route} Route */
