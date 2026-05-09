import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import { usePageMeta } from '@/hooks/usePageMeta';

const posts = [
  {
    id: '1',
    title: 'How to Build a Better Routine for Pet Wellness',
    excerpt:
      'Create a daily ritual around grooming, nutrition, and enrichment that supports long-term health for dogs and cats.',
    category: 'Wellness',
  },
  {
    id: '2',
    title: '5 Enrichment Activities Indoor Pets Love',
    excerpt:
      'Simple activities to reduce boredom and anxiety for pets spending more time inside.',
    category: 'Lifestyle',
  },
  {
    id: '3',
    title: 'How to Choose the Right Harness Size',
    excerpt:
      'A quick guide to measuring your pet and selecting a comfortable, safe harness for daily walks.',
    category: 'Guide',
  },
];

export const BlogPage = () => {
  usePageMeta({
    title: 'Blog - PAWRA',
    description: 'Pet wellness, product guides, and lifestyle articles from PAWRA.',
  });

  return (
    <div className="w-full">
      <section className="bg-ivory py-14 md:py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-matte-black mb-4">
              PAWRA Journal
            </h1>
            <p className="text-lg text-stone">
              Educational stories and practical guides for modern pet parents.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="rounded-lg border border-sand/20 bg-warm-white p-6"
              >
                <p className="text-xs uppercase tracking-wide text-soft-emerald font-semibold mb-3">
                  {post.category}
                </p>
                <h2 className="text-2xl font-serif font-bold text-matte-black mb-3">
                  {post.title}
                </h2>
                <p className="text-stone mb-5">{post.excerpt}</p>
                <Button variant="ghost" className="p-0 h-auto">
                  Read article
                </Button>
              </motion.article>
            ))}
          </div>

          <div className="mt-10">
            <Link to="/collections">
              <Button variant="secondary">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
