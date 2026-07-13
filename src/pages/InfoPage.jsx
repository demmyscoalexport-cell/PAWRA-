import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import { usePageMeta } from '@/hooks/usePageMeta';

const PAGE_CONTENT = {
  shipping: {
    title: 'Shipping Information',
    body: 'Orders are processed in 1-2 business days. Standard delivery typically arrives within 3-7 business days depending on destination and carrier availability.',
  },
  returns: {
    title: 'Returns & Exchanges',
    body: 'You can request a return within 30 days of delivery for unused items in original packaging. Refunds are issued to the original payment method after inspection.',
  },
  faq: {
    title: 'Frequently Asked Questions',
    body: 'Find answers to common questions about orders, delivery, returns, product sizing, and pet-safe material guidance. Detailed FAQ entries can be extended here.',
  },
  about: {
    title: 'About PAWRA',
    body: 'PAWRA is a premium pet lifestyle brand building thoughtful products that blend aesthetics, durability, and everyday function for modern pet families.',
  },
  careers: {
    title: 'Careers',
    body: 'We are building a global commerce and product experience team. Share your profile and area of interest to explore future opportunities.',
  },
  press: {
    title: 'Press',
    body: 'For media and partnership requests, reach out to press@pawrapetshop.com. Brand assets and official announcements can be maintained on this page.',
  },
  sustainability: {
    title: 'Sustainability',
    body: 'We prioritize durable materials, reduced waste packaging, and supplier partnerships that align with responsible manufacturing practices.',
  },
  privacy: {
    title: 'Privacy Policy',
    body: 'This page outlines what user data is collected, why it is collected, and how it is managed securely. Replace with your legal policy before production launch.',
  },
  terms: {
    title: 'Terms of Service',
    body: 'This page contains the legal terms governing use of PAWRA services and purchases. Replace with your final legal terms before launch.',
  },
  cookies: {
    title: 'Cookie Settings',
    body: 'Manage consent and categories for essential, analytics, and marketing cookies. Full cookie consent tooling can be integrated in a future release.',
  },
};

export const InfoPage = () => {
  const { slug } = useParams();
  const page = PAGE_CONTENT[slug] || {
    title: 'Information',
    body: 'This page is available for custom content and policy details.',
  };
  usePageMeta({
    title: `${page.title} - PAWRA`,
    description: page.body,
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
              {page.title}
            </h1>
            <p className="text-lg text-stone">{page.body}</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container">
          <Link to="/collections">
            <Button variant="secondary">Back to Shop</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
