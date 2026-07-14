/**
 * @file HeroSection.jsx
 * @description Homepage hero carousel with Cloudinary images and optional WaveSpeed video.
 */

import {useCallback, useEffect, useState} from 'react';
import {SectionReveal} from './SectionReveal';
import {Button} from '~/components/ui/Button';
import {Icon} from '~/components/ui/Icon';
import {BRAND} from '~/lib/branding';
import {PAWRA_HERO_SLIDES} from '~/lib/pawraMedia';

const SLIDES = PAWRA_HERO_SLIDES;
const AUTOPLAY_MS = 6000;

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return prefersReducedMotion;
}

/** @param {{ slide: typeof SLIDES[number]; isActive: boolean; isFirst: boolean }} props */
function HeroSlideMedia({slide, isActive, isFirst}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [videoFailed, setVideoFailed] = useState(false);
  const showVideo = Boolean(slide.video) && !prefersReducedMotion && !videoFailed;
  const mediaClass = `absolute inset-0 size-full object-cover transition-opacity duration-700 ${
    isActive ? 'opacity-100' : 'opacity-0'
  }`;

  if (showVideo) {
    return (
      <video
        key={`${slide.id}-video`}
        src={slide.video}
        poster={slide.image}
        autoPlay={isActive}
        muted
        loop
        playsInline
        aria-label={slide.imageAlt}
        className={mediaClass}
        onError={() => setVideoFailed(true)}
      />
    );
  }

  return (
    <img
      key={`${slide.id}-image`}
      src={slide.image}
      alt={slide.imageAlt}
      className={mediaClass}
      loading={isFirst ? 'eager' : 'lazy'}
      fetchPriority={isFirst ? 'high' : 'auto'}
    />
  );
}

export function HeroSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((index) => {
    setActive((index + SLIDES.length) % SLIDES.length);
  }, []);

  const goNext = useCallback(() => goTo(active + 1), [active, goTo]);
  const goPrev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(goNext, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, goNext]);

  const slide = SLIDES[active];

  return (
    <SectionReveal>
      <section
        className="bg-warm-oat px-4 py-12 md:px-8 md:py-20 lg:py-24"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-roledescription="carousel"
        aria-label="Featured promotions"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1" key={slide.id} aria-live="polite">
            <p className="mb-4 font-sans text-body-xs font-medium uppercase tracking-[0.2em] text-forest-green">
              {BRAND.name}
            </p>
            <h1 className="font-serif text-display-m text-forest-green md:text-display-xl">
              {slide.headline}
            </h1>
            <p className="mt-6 max-w-lg font-sans text-body-l text-ink">
              {slide.subheadline}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button variant="primary" size="lg" href={slide.ctaPrimary.href}>
                {slide.ctaPrimary.label}
              </Button>
              <Button variant="ghost" size="lg" href={slide.ctaSecondary.href}>
                {slide.ctaSecondary.label}
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex gap-2" role="tablist" aria-label="Hero slides">
                {SLIDES.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    aria-label={`Slide ${i + 1}`}
                    className={`size-2.5 rounded-full reset transition-colors ${
                      i === active ? 'bg-forest-green' : 'bg-forest-green/30 hover:bg-forest-green/50'
                    }`}
                    onClick={() => goTo(i)}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="flex size-10 items-center justify-center rounded-full border border-forest-green/20 bg-white text-forest-green reset hover:bg-warm-oat"
                  onClick={goPrev}
                  aria-label="Previous slide"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="flex size-10 items-center justify-center rounded-full border border-forest-green/20 bg-white text-forest-green reset hover:bg-warm-oat"
                  onClick={goNext}
                  aria-label="Next slide"
                >
                  ›
                </button>
              </div>
            </div>

            <div className="mt-8 flex items-start gap-3">
              <div className="flex gap-0.5">
                {Array.from({length: 5}, (_, i) => (
                  <Icon key={`hero-star-${i}`} name="star" size="sm" color="text-champagne" className="!h-4 !w-4" />
                ))}
              </div>
              <p className="font-sans text-body-s text-ink/80">
                &ldquo;The quality is outstanding — my cats and dog love everything we&apos;ve ordered.&rdquo;
                <span className="mt-1 block font-medium text-ink">Sarah K., Maine</span>
              </p>
            </div>
          </div>

          <div className="relative order-1 min-h-[280px] overflow-hidden rounded-xl lg:order-2 md:min-h-[420px]">
            {SLIDES.map((s, i) => (
              <HeroSlideMedia
                key={s.id}
                slide={s}
                isActive={i === active}
                isFirst={i === 0}
              />
            ))}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
