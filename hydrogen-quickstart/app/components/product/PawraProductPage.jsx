/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET SHOP               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetshop.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file PawraProductPage.jsx
 * @description Product detail UI: PawraProductPage.
 * @author Pawra LLC
 * @website pawrapetshop.com
 */

import {useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from 'react-router';
import {Image, Money, Analytics} from '@shopify/hydrogen';
import {AddToCartButton} from '~/components/AddToCartButton';
import {useAside} from '~/components/Aside';
import {Breadcrumbs} from '~/components/Breadcrumbs';
import {Icon} from '~/components/ui/Icon';
import {FaqAccordion} from '~/components/FaqAccordion';
import {PawraProductCard} from '~/components/PawraProductCard';
import {PRIMARY_CTA_CLASSES} from '~/lib/primaryButton';
import {ProductImagePlaceholder} from '~/components/sections/ProductImagePlaceholder';
import {ProductRating} from '~/components/product/ProductRating';
import {JudgeMeReviews} from '~/components/product/JudgeMeReviews';
import {JudgeMePreviewBadge} from '~/components/product/JudgeMePreviewBadge';
import {BRAND} from '~/lib/branding';
import {FREE_SHIPPING_THRESHOLD_USD} from '~/lib/commerce';

// ─── Static Content ─────────────────────────────────────────────────────────────

/** Product-specific FAQ items shown in the accordion below the fold. */
const PRODUCT_FAQ = [
  {q: 'How long does shipping take?', a: `Most US orders arrive in 3–5 business days. Free shipping on orders over $${FREE_SHIPPING_THRESHOLD_USD}.`},
  {q: 'What is the return policy?', a: '30-day returns on unused products in original packaging.'},
  {q: 'Are products safe for cats and dogs?', a: 'Every item is curated for pet safety. Check the product description for species-specific guidance.'},
  {q: 'Do you ship nationwide?', a: 'Yes — we ship to all 50 US states from our Presque Isle, ME fulfillment center.'},
  {q: 'How do I contact support?', a: `Email ${BRAND.supportEmail} and we will respond within one business day.`},
  {q: 'Can I track my order?', a: 'Yes. You will receive a tracking link by email once your order ships.'},
];

/** Feature highlights grid — icons map to ~/components/ui/Icon names. */
const FEATURES = [
  {icon: 'shield', label: 'Premium quality materials'},
  {icon: 'heart', label: 'Designed for pet wellness'},
  {icon: 'check', label: 'Curated for cats and dogs'},
  {icon: 'leaf', label: 'Trusted brands and ingredients'},
  {icon: 'star', label: 'PAWRA quality standards'},
  {icon: 'truck', label: `Free US shipping over $${FREE_SHIPPING_THRESHOLD_USD}`},
];

// ─── Product Page Component ───────────────────────────────────────────────────

/**
 * Full PAWRA product detail layout — gallery, variant pickers, add-to-cart,
 * feature blocks, specs, testimonials, FAQ, related products, and sticky CTA bar.
 *
 * @param {{
 *   product: ProductFragment;
 *   selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
 *   productOptions: import('@shopify/hydrogen').MappedProductOptions[];
 *   relatedProducts?: Array<import('storefrontapi.generated').ProductItemFragment>;
 *   reviews?: { rating: number; count: number; reviews: Array<{ quote: string; name: string; meta: string }> } | null;
 * }} props
 */
export function PawraProductPage({product, selectedVariant, productOptions, relatedProducts = [], reviews = null}) {
  const {open} = useAside();
  const navigate = useNavigate();
  const ctaRef = useRef(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showStickyBar, setShowStickyBar] = useState(false);

  // ─── Derived State ───
  const images = product.images?.nodes?.length
    ? product.images.nodes
    : selectedVariant?.image
      ? [selectedVariant.image]
      : [];

  const activeImage = images[activeImageIndex] ?? selectedVariant?.image;
  const price = selectedVariant?.price;
  const compareAt = selectedVariant?.compareAtPrice;
  const installment = price ? (Number(price.amount) / 4).toFixed(2) : null;

  // ─── Sticky Add-to-Cart Bar ───
  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting),
      {threshold: 0, rootMargin: '0px 0px -80px 0px'},
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-warm-oat">
      {/* ─── Hero: Gallery & Purchase Panel ─── */}
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
        <Breadcrumbs
          className="mb-6"
          items={[
            {label: 'Home', to: '/'},
            {label: 'Shop', to: '/collections/all'},
            ...(product.productType
              ? [{label: product.productType, to: `/collections/all`}]
              : []),
            {label: product.title},
          ]}
        />
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* ─── Image Gallery ─── */}
          <div>
            <div className="group relative aspect-square overflow-hidden rounded-xl bg-cloud shadow-card">
              {activeImage ? (
                <Image
                  data={activeImage}
                  alt={activeImage.altText || product.title}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-slow group-hover:scale-105"
                />
              ) : (
                <ProductImagePlaceholder label={product.title} className="h-full min-h-0 rounded-xl" />
              )}
            </div>
            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {images.slice(0, 4).map((img, i) => (
                  <button
                    key={img.id || i}
                    type="button"
                    className={`aspect-square overflow-hidden rounded-md border-2 reset ${
                      i === activeImageIndex ? 'border-forest-green' : 'border-transparent'
                    }`}
                    onClick={() => setActiveImageIndex(i)}
                  >
                    <Image data={img} alt="" sizes="120px" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ─── Product Info & Add to Cart ─── */}
          <div>
            <h1 className="font-serif text-[2.5rem] leading-tight text-forest-green">{product.title}</h1>
            <JudgeMePreviewBadge productId={product.id} className="mt-2" />
            <ProductRating rating={reviews?.rating} count={reviews?.count} />
            <div className="mt-6 flex flex-wrap items-baseline gap-3">
              {price && (
                <span className="font-mono text-[1.5rem] text-forest-green">
                  <Money data={price} />
                </span>
              )}
              {compareAt && Number(compareAt.amount) > Number(price?.amount ?? 0) && (
                <span className="font-mono text-mono-m text-ink/40 line-through">
                  <Money data={compareAt} />
                </span>
              )}
            </div>
            {installment && (
              <p className="mt-2 font-sans text-body-s text-ink/70">
                or 4 payments of ${installment} with Shop Pay
              </p>
            )}

            {/* ─── Variant Options (color swatches, size buttons) ─── */}
            {productOptions.map((option) => {
              if (option.optionValues.length <= 1) return null;
              const isColor = option.name.toLowerCase().includes('color');
              return (
                <div key={option.name} className="mt-8">
                  <p className="mb-3 font-sans text-body-s font-semibold text-ink">{option.name}</p>
                  <div className={`flex flex-wrap gap-2 ${isColor ? '' : ''}`}>
                    {option.optionValues.map((value) => {
                      const {name, variantUriQuery, selected, available, exists} = value;
                      if (isColor) {
                        const color = value.swatch?.color || '#ccc';
                        return (
                          <button
                            key={name}
                            type="button"
                            title={name}
                            disabled={!exists}
                            onClick={() => {
                              if (!selected) {
                                void navigate(`?${variantUriQuery}`, {replace: true, preventScrollReset: true});
                              }
                            }}
                            className={`h-10 w-10 rounded-full border-2 reset ${selected ? 'border-forest-green ring-2 ring-electric-jade' : 'border-cloud'} ${!available ? 'opacity-40' : ''}`}
                            style={{backgroundColor: color}}
                          />
                        );
                      }
                      return (
                        <button
                          key={name}
                          type="button"
                          disabled={!exists}
                          onClick={() => {
                            if (!selected) {
                              void navigate(`?${variantUriQuery}`, {replace: true, preventScrollReset: true});
                            }
                          }}
                          className={`min-w-[3rem] rounded-md border px-4 py-2 font-sans text-body-s reset ${
                            selected
                              ? 'border-forest-green bg-forest-green text-cloud'
                              : 'border-forest-green/20 bg-cloud text-ink'
                          } ${!available ? 'opacity-40' : ''}`}
                        >
                          {name}
                        </button>
                      );
                    })}
                  </div>
                  {option.name.toLowerCase().includes('size') && (
                    <Link to="/pages/size-guide" className="mt-2 inline-block font-sans text-body-s text-forest-green underline">
                      Size guide
                    </Link>
                  )}
                </div>
              );
            })}

            {/* ─── Quantity Stepper ─── */}
            <div className="mt-8">
              <p className="mb-2 font-sans text-body-s font-semibold text-ink">Quantity</p>
              <div className="inline-flex items-center rounded-md border border-forest-green/20 bg-cloud">
                <button
                  type="button"
                  className="reset px-4 py-3"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  <Icon name="minus" size="sm" />
                </button>
                <span className="min-w-[3rem] text-center font-mono text-mono-m">{quantity}</span>
                <button
                  type="button"
                  className="reset px-4 py-3"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  <Icon name="plus" size="sm" />
                </button>
              </div>
            </div>

            {/* ─── Primary CTA (observed for sticky bar) ─── */}
            <div ref={ctaRef} className="mt-8">
              <AddToCartButton
                disabled={!selectedVariant?.availableForSale}
                onClick={() => open('cart')}
                lines={
                  selectedVariant
                    ? [{merchandiseId: selectedVariant.id, quantity, selectedVariant}]
                    : []
                }
                className={`flex h-[52px] w-full items-center justify-center rounded-md font-sans text-body-l font-medium reset ${PRIMARY_CTA_CLASSES}`}
              >
                {selectedVariant?.availableForSale ? 'Add to Cart' : 'Sold out'}
              </AddToCartButton>
            </div>
            <p className="mt-4 font-sans text-body-s text-ink/70">
              Save on repeat orders with{' '}
              <Link to="/pages/subscribe-and-save" className="font-semibold text-forest-green underline">
                Subscribe &amp; Save
              </Link>
              .
            </p>

            {/* ─── Trust Badges ─── */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-forest-green/10 pt-8">
              {[
                `Free US shipping over $${FREE_SHIPPING_THRESHOLD_USD}`,
                '30-day returns',
                'Premium quality',
                'Cats & dogs',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Icon name="check" size="sm" color="text-electric-jade" />
                  <span className="font-sans text-body-s text-ink/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Product description (Chewy-style details) ─── */}
      {(product.descriptionHtml || product.description) && (
        <section className="border-t border-forest-green/10 bg-cloud px-4 py-16 md:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-display-s text-forest-green">About this item</h2>
            {product.descriptionHtml ? (
              <div
                className="prose prose-forest mt-8 max-w-none font-sans text-body-m text-ink [&_a]:text-forest-green [&_li]:my-1 [&_p]:mb-4 [&_ul]:my-4"
                dangerouslySetInnerHTML={{__html: product.descriptionHtml}}
              />
            ) : (
              <p className="mt-8 font-sans text-body-m text-ink whitespace-pre-line">
                {product.description}
              </p>
            )}
          </div>
        </section>
      )}

      {/* ─── Features Grid ─── */}
      <section className="border-t border-forest-green/10 bg-warm-oat px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-serif text-display-s text-forest-green">Features</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.label} className="flex gap-4">
                <Icon name={f.icon} size="lg" color="text-forest-green" className="shrink-0" />
                <p className="font-sans text-body-m text-ink">{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Specifications Table ─── */}
      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-display-s text-forest-green">Specifications</h2>
          <table className="mt-8 w-full font-mono text-mono-s">
            <tbody>
              {[
                ['Brand', product.vendor || 'PAWRA'],
                ['Category', product.productType || 'Pet supplies'],
                ['Availability', selectedVariant?.availableForSale ? 'In stock' : 'Sold out'],
                ['Shipping', `Free over $${FREE_SHIPPING_THRESHOLD_USD} (US)`],
                ['Returns', '30 days'],
              ].map(([k, v]) => (
                <tr key={k} className="border-b border-forest-green/10">
                  <td className="py-3 text-ink/60">{k}</td>
                  <td className="py-3 text-right text-ink">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ─── What's in the Box ─── */}
      <section className="bg-cloud px-4 py-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-display-s text-forest-green">What&apos;s in the box</h2>
          <ul className="mt-8 space-y-3">
            {['Product', 'Care instructions', 'PAWRA quality guarantee'].map(
              (item) => (
                <li key={item} className="flex items-center gap-3 font-sans text-body-m text-ink">
                  <Icon name="check" size="sm" color="text-electric-jade" />
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>
      </section>

      {/* ─── Judge.me reviews + write-a-review widget ─── */}
      <div className="px-4 py-4 md:px-8">
        <div className="mx-auto max-w-3xl">
          <JudgeMeReviews product={product} reviews={reviews} />
        </div>
      </div>

      {/* ─── Product FAQ ─── */}
      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-serif text-display-s text-forest-green">Product FAQ</h2>
          <FaqAccordion items={PRODUCT_FAQ} className="mt-10" />
        </div>
      </section>

      {/* ─── Related Products ─── */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-forest-green/10 px-4 py-16 md:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="font-serif text-display-s text-forest-green">Related products</h2>
            <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {relatedProducts.slice(0, 4).map((p, i) => (
                <PawraProductCard key={p.id} product={p} loading={i < 4 ? 'eager' : undefined} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Sticky Mobile/Desktop CTA Bar ─── */}
      {showStickyBar && selectedVariant && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-electric-jade/20 bg-forest-green px-4 py-3 shadow-lg md:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              {activeImage && (
                <Image data={activeImage} alt="" sizes="48px" className="h-12 w-12 rounded-md object-cover" />
              )}
              <div className="min-w-0">
                <p className="truncate font-sans text-body-s font-semibold text-cloud">{product.title}</p>
                {price && (
                  <p className="font-mono text-mono-s text-electric-jade">
                    <Money data={price} />
                  </p>
                )}
              </div>
            </div>
            <AddToCartButton
              disabled={!selectedVariant.availableForSale}
              onClick={() => open('cart')}
              lines={[{merchandiseId: selectedVariant.id, quantity: 1, selectedVariant}]}
              className="shrink-0 rounded-md bg-electric-jade px-6 py-3 font-sans text-body-s font-semibold text-midnight reset hover:brightness-95"
            >
              Add to Cart
            </AddToCartButton>
          </div>
        </div>
      )}

      {/* ─── Analytics ─── */}
      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant?.price.amount || '0',
              vendor: product.vendor,
              variantId: selectedVariant?.id || '',
              variantTitle: selectedVariant?.title || '',
              quantity: 1,
            },
          ],
        }}
      />
    </div>
  );
}

/** @typedef {import('storefrontapi.generated').ProductFragment} ProductFragment */
