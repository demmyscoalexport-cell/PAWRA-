import {useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from 'react-router';
import {Image, Money, Analytics} from '@shopify/hydrogen';
import {AddToCartButton} from '~/components/AddToCartButton';
import {useAside} from '~/components/Aside';
import {Icon} from '~/components/ui/Icon';
import {FaqAccordion} from '~/components/FaqAccordion';
import {PawraProductCard} from '~/components/PawraProductCard';
import {Testimonials} from '~/components/sections/Testimonials';
import {ProductImagePlaceholder} from '~/components/sections/ProductImagePlaceholder';

const PRODUCT_FAQ = [
  {q: 'How long does shipping take?', a: 'Most US orders arrive in 3–5 business days. Free shipping on orders over $75.'},
  {q: 'Is this compatible with the PAWRA app?', a: 'Yes. All PAWRA smart devices pair with the iOS and Android PAWRA app in under five minutes.'},
  {q: 'What is the return policy?', a: '30-day returns on unused products in original packaging. Walker Approved items include extended support.'},
  {q: 'Does it work with professional walkers?', a: 'Yes. Share live GPS access with walkers through the PAWRA Walker Program.'},
  {q: 'Is the device waterproof?', a: 'Outdoor PAWRA devices are IP67 rated for rain, snow, and splashes during city walks.'},
  {q: 'What warranty is included?', a: 'Every PAWRA device includes a 1-year limited warranty with optional Care Plan coverage.'},
];

const FEATURES = [
  {icon: 'gps', label: 'Live GPS tracking every 30 seconds'},
  {icon: 'shield', label: 'Geofence and safety alerts'},
  {icon: 'wifi', label: 'Cellular connectivity included'},
  {icon: 'check', label: 'Walker Approved for NYC routes'},
  {icon: 'heart', label: 'Health and activity insights'},
  {icon: 'truck', label: 'Free US shipping over $75'},
];

/**
 * @param {{
 *   product: ProductFragment;
 *   selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
 *   productOptions: import('@shopify/hydrogen').MappedProductOptions[];
 *   relatedProducts?: Array<import('storefrontapi.generated').ProductItemFragment>;
 * }}
 */
export function PawraProductPage({product, selectedVariant, productOptions, relatedProducts = []}) {
  const {open} = useAside();
  const navigate = useNavigate();
  const ctaRef = useRef(null);
  const [quantity, setQuantity] = useState(1);
  const [carePlan, setCarePlan] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const images = product.images?.nodes?.length
    ? product.images.nodes
    : selectedVariant?.image
      ? [selectedVariant.image]
      : [];

  const activeImage = images[activeImageIndex] ?? selectedVariant?.image;
  const price = selectedVariant?.price;
  const compareAt = selectedVariant?.compareAtPrice;
  const installment = price ? (Number(price.amount) / 4).toFixed(2) : null;

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
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
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

          <div>
            <h1 className="font-serif text-[2.5rem] leading-tight text-forest-green">{product.title}</h1>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({length: 5}, (_, i) => (
                  <Icon key={`rating-${i}`} name="star" size="sm" color="text-champagne" className="!h-4 !w-4" />
                ))}
              </div>
              <span className="font-mono text-mono-s text-ink/60">4.9 · 128 reviews</span>
            </div>
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
                    <Link to="/pages/how-it-works" className="mt-2 inline-block font-sans text-body-s text-forest-green underline">
                      Size guide
                    </Link>
                  )}
                </div>
              );
            })}

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

            <div ref={ctaRef} className="mt-8">
              <AddToCartButton
                disabled={!selectedVariant?.availableForSale}
                onClick={() => open('cart')}
                lines={
                  selectedVariant
                    ? [{merchandiseId: selectedVariant.id, quantity, selectedVariant}]
                    : []
                }
                className="flex h-[52px] w-full items-center justify-center rounded-md bg-forest-green font-sans text-body-l font-medium text-cloud reset hover:bg-forest-night"
              >
                {selectedVariant?.availableForSale ? 'Add to Cart' : 'Sold out'}
              </AddToCartButton>
            </div>

            <label className="mt-4 flex cursor-pointer items-start gap-4 rounded-xl border border-champagne bg-cloud/80 p-4">
              <input
                type="checkbox"
                checked={carePlan}
                onChange={(e) => setCarePlan(e.target.checked)}
                className="mt-1"
              />
              <div>
                <div className="flex items-center gap-2">
                  <Icon name="star" size="sm" color="text-champagne" />
                  <span className="font-sans text-body-m font-semibold text-ink">Add PAWRA Care Plan</span>
                </div>
                <p className="mt-1 font-sans text-body-s text-ink/70">
                  $4.99/month — GPS monitoring, health alerts, priority support
                </p>
              </div>
            </label>

            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-forest-green/10 pt-8">
              {[
                'Free US shipping',
                '30-day returns',
                '1-year warranty',
                'Walker Approved',
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

      <section className="border-t border-forest-green/10 bg-cloud px-4 py-16 md:px-8">
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

      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-display-s text-forest-green">Specifications</h2>
          <table className="mt-8 w-full font-mono text-mono-s">
            <tbody>
              {[
                ['Connectivity', 'LTE + GPS'],
                ['Battery', 'Up to 7 days'],
                ['Water rating', 'IP67'],
                ['Weight', '2.4 oz'],
                ['Compatibility', 'Dogs 15–120 lbs'],
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

      <section className="bg-cloud px-4 py-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-display-s text-forest-green">What&apos;s in the box</h2>
          <ul className="mt-8 space-y-3">
            {['PAWRA device', 'USB-C charging cable', 'Quick start guide', 'PAWRA app access card'].map(
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

      <Testimonials />

      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-serif text-display-s text-forest-green">Product FAQ</h2>
          <FaqAccordion items={PRODUCT_FAQ} className="mt-10" />
        </div>
      </section>

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
