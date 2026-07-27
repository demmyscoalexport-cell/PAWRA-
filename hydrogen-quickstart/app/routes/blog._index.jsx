/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET SHOP               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetshop.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file blog._index.jsx
 * @description Route module: blog._index — Pawra Pet Shop page or API handler.
 * @author Pawra LLC
 * @website pawrapetshop.com
 */

import {Link} from 'react-router';
import {BLOG_POSTS} from '~/lib/blogPosts';
import {Button} from '~/components/ui/Button';

import {BRAND} from '~/lib/branding';
import {buildSeoMeta} from '~/lib/seo';

export const meta = () => {
  return buildSeoMeta({
    title: 'PAWRA Journal',
    description: `Pet care tips, product guides, and wellness advice from ${BRAND.name}.`,
    url: '/blog',
  });
};

export async function loader() {
  return {posts: BLOG_POSTS};
}

export default function BlogIndex() {
  return (
    <div className="bg-page-bg px-4 py-12 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="font-sans text-body-xs font-medium uppercase tracking-[0.2em] text-action-primary">
          PAWRA Journal
        </p>
        <h1 className="mt-3 font-serif text-display-s text-action-primary">Stories for pet people.</h1>
        <p className="mt-4 max-w-2xl font-sans text-body-l text-text-primary/80">
          Tips, guides, and stories for cat and dog owners who want the best for their pets.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <article key={post.slug} className="flex flex-col rounded-lg bg-surface p-6 shadow-sm">
              <p className="font-mono text-mono-s uppercase tracking-wide text-action-primary">
                {post.category}
              </p>
              <h2 className="mt-3 font-serif text-heading-s text-action-primary">{post.title}</h2>
              <p className="mt-2 font-mono text-mono-s text-text-secondary">{post.date}</p>
              <p className="mt-4 flex-1 font-sans text-body-m text-text-primary/80">{post.excerpt}</p>
              <Link
                to={post.href}
                className="mt-6 inline-flex items-center gap-2 font-sans text-body-s font-semibold text-action-primary no-underline hover:text-action-primary"
              >
                Read More →
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button variant="secondary" href="/blogs/journal">
            View all posts
          </Button>
        </div>
      </div>
    </div>
  );
}

/** @typedef {import('./+types/blog._index').Route} Route */
