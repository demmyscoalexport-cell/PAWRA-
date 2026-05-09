import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui';
import { usePageMeta } from '@/hooks/usePageMeta';

export const NotFoundPage = () => {
  usePageMeta({
    title: '404 - Page Not Found | PAWRA',
    description: 'The page you requested could not be found.',
  });

  return (
    <div className="w-full">
      <section className="section-padding">
        <div className="container max-w-2xl text-center">
          <p className="text-soft-emerald uppercase tracking-widest text-sm font-semibold mb-4">
            404
          </p>
          <h1 className="text-5xl font-serif font-bold text-matte-black mb-4">
            Page not found
          </h1>
          <p className="text-stone mb-8">
            The page you are looking for does not exist or has moved.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link to="/">
              <Button variant="primary">Go Home</Button>
            </Link>
            <Link to="/collections">
              <Button variant="secondary">Browse Products</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
