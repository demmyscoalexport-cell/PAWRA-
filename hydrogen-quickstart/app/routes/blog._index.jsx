/**
 * @file blog._index.jsx
 * @description PAWRA Journal index — mock articles grid.
 */

import {Link, useLoaderData} from 'react-router';
import {ARTICLES} from '~/data/articles';
import {BRAND} from '~/lib/branding';
import {buildSeoMeta, breadcrumbJsonLd} from '~/lib/seo';

export const meta = () => {
  return buildSeoMeta({
    title: 'PAWRA Journal',
    description: `Pet care tips, product guides, and wellness advice from ${BRAND.name}.`,
    url: '/blog',
    jsonLd: breadcrumbJsonLd([
      {label: 'Home', to: '/'},
      {label: 'Journal', to: '/blog'},
    ]),
  });
};

export async function loader() {
  return {posts: ARTICLES};
}

export default function BlogIndex() {
  const {posts} = useLoaderData();

  return (
    <div className="bg-page-bg px-4 py-12 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="font-sans text-body-xs font-medium uppercase tracking-[0.2em] text-action-primary">
          PAWRA Journal
        </p>
        <h1 className="mt-3 font-sans text-display-s text-text-primary">Stories for pet people.</h1>
        <p className="mt-4 max-w-2xl font-sans text-body-l text-text-secondary">
          Tips, guides, and stories for cat and dog owners who want the best for their pets.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} className="flex flex-col overflow-hidden rounded-lg bg-surface shadow-sm">
              <img src={post.image} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover" />
              <div className="flex flex-1 flex-col p-6">
                <p className="font-mono text-mono-s uppercase tracking-wide text-action-primary">
                  {post.category}
                </p>
                <h2 className="mt-3 font-sans text-heading-s text-text-primary">{post.title}</h2>
                <p className="mt-2 font-mono text-mono-s text-text-secondary">
                  {post.date} · {post.readTime}
                </p>
                <p className="mt-4 flex-1 font-sans text-body-m text-text-secondary">{post.excerpt}</p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="mt-6 inline-flex items-center gap-2 font-sans text-body-s font-semibold text-action-primary no-underline hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
