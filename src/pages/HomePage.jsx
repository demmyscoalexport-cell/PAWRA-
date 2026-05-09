import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import { usePageMeta } from '@/hooks/usePageMeta';

export const HomePage = () => {
  usePageMeta({
    title: 'PAWRA - Premium Pet Lifestyle Store',
    description:
      'Discover premium products for dogs and cats, curated for modern pet parents.',
  });

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ivory via-warm-white to-ivory relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-soft-emerald rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-frost-blue rounded-full blur-3xl"></div>
        </div>

        <div className="container relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-matte-black mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Premium Lifestyle
              <br />
              <span className="text-soft-emerald">for Modern Pet Parents</span>
            </motion.h1>

            <motion.p
              className="text-xl text-stone mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover PAWRA – the luxury pet brand for dogs and cats who deserve the best.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link to="/collections/dogs">
                <Button variant="primary" size="lg">
                  Shop Dogs
                </Button>
              </Link>
              <Link to="/collections/cats">
                <Button variant="secondary" size="lg">
                  Shop Cats
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="section-padding bg-ivory">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-matte-black mb-4">
              Collections
            </h2>
            <p className="text-lg text-stone">
              Curated collections for every pet lifestyle
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Dogs', icon: '🐕', path: '/collections/dogs' },
              { title: 'Cats', icon: '🐈', path: '/collections/cats' },
              { title: 'All Products', icon: '✨', path: '/collections' },
            ].map((collection, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Link to={collection.path}>
                  <div className="group cursor-pointer rounded-lg overflow-hidden bg-gradient-to-br from-warm-white to-ivory p-8 text-center hover:shadow-luxury transition-all duration-300">
                    <div className="text-6xl mb-4">{collection.icon}</div>
                    <h3 className="text-2xl font-serif font-bold text-matte-black mb-2">
                      {collection.title}
                    </h3>
                    <p className="text-stone group-hover:text-soft-emerald transition-colors">
                      Explore →
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="section-padding bg-matte-black text-ivory">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              About PAWRA
            </h2>
            <p className="text-lg text-sand leading-relaxed mb-4">
              PAWRA is a premium global pet lifestyle brand crafted for the modern pet parent who believes their companion deserves luxury, care, and elegance.
            </p>
            <p className="text-lg text-sand leading-relaxed mb-4">
              From grooming to nutrition, toys to wellness, every PAWRA product is designed with meticulous attention to quality, sustainability, and pet wellbeing.
            </p>
            <p className="text-lg text-sand leading-relaxed">
              We believe pets aren't just pets – they're family. They deserve premium products that reflect the love and care they give us every single day.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="section-padding bg-ivory">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '200+', label: 'Premium Products' },
              { number: '95K+', label: 'Happy Pet Parents' },
              { number: '4.8★', label: 'Average Rating' },
              { number: '10K+', label: 'Reviews' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl font-serif font-bold text-soft-emerald mb-2">
                  {stat.number}
                </div>
                <p className="text-stone">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-soft-emerald text-ivory">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Ready to Pamper Your Pet?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Explore our complete collection of premium pet products.
            </p>
            <Link to="/collections">
              <Button variant="primary" size="lg" className="bg-matte-black text-ivory hover:bg-charcoal">
                Shop Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
