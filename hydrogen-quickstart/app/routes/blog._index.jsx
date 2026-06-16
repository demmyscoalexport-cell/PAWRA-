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

export const meta = () => {
  return [
    {title: 'PAWRA Journal | Blog'},
    {name: 'description', content: `Pet care tips, product guides, and wellness advice from ${BRAND.name}.`},
  ];
};

export async function loader() {
  return {posts: BLOG_POSTS};
}

export default function BlogIndex() {
  return (
    <div className="bg-warm-oat px-4 py-12 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="font-sans text-body-xs font-medium uppercase tracking-[0.2em] text-forest-green">
          PAWRA Journal
        </p>
        <h1 className="mt-3 font-serif text-display-s text-forest-green">Stories for pet people.</h1>
        <p className="mt-4 max-w-2xl font-sans text-body-l text-ink/80">
          Tips, guides, and stories for cat and dog owners who want the best for their pets.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <article key={post.slug} className="flex flex-col rounded-xl bg-cloud p-6 shadow-card">
              <p className="font-mono text-mono-s uppercase tracking-wide text-electric-jade">
                {post.category}
              </p>
              <h2 className="mt-3 font-serif text-heading-s text-forest-green">{post.title}</h2>
              <p className="mt-2 font-mono text-mono-s text-ink/50">{post.date}</p>
              <p className="mt-4 flex-1 font-sans text-body-m text-ink/80">{post.excerpt}</p>
              <Link
                to={post.href}
                className="mt-6 inline-flex items-center gap-2 font-sans text-body-s font-semibold text-forest-green no-underline hover:text-electric-jade"
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
