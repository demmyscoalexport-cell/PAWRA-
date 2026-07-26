/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET SHOP               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetshop.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file FAQ.jsx
 * @description Homepage/marketing section: FAQ.
 * @author Pawra LLC
 * @website pawrapetshop.com
 */

import {useState} from 'react';
import {SectionReveal} from './SectionReveal';
import {Icon} from '~/components/ui/Icon';
import {BRAND} from '~/lib/branding';
import {GorgiasChatButton} from '~/components/gorgias/GorgiasChatButton';

const FAQS = [
  {
    q: 'What products does PAWRA sell?',
    a: 'We curate premium pet food, beds, toys, grooming supplies, collars, and wellness products for cats and dogs — all delivered to your door.',
  },
  {
    q: 'Do you ship across the US?',
    a: 'Yes. We ship to all 50 states. Free shipping on orders over $75. Most orders arrive within 3–5 business days.',
  },
  {
    q: 'What is your return policy?',
    a: `We offer 30-day returns on unused products in original packaging. Start live chat or email ${BRAND.supportEmail} for help.`,
  },
  {
    q: 'How do I track my order?',
    a: 'After your order ships, you will receive a tracking link by email. You can also view order status in your account, or ask in live chat.',
  },
  {
    q: 'How can I contact support?',
    a: `Use the chat bubble for the fastest answer, or email ${BRAND.supportEmail}. We typically reply to email within one business day.`,
  },
  {
    q: 'Are your products safe for both cats and dogs?',
    a: 'Each product page lists species and sizing details. Always check the description before ordering for your pet.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <SectionReveal>
      <section className="bg-warm-oat px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-serif text-display-s text-forest-green">
            Frequently asked questions
          </h2>
          <div className="mt-10 divide-y divide-forest-green/15 border-y border-forest-green/15">
            {FAQS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 py-5 text-left reset"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-sans text-body-m font-semibold text-forest-green">
                      {item.q}
                    </span>
                    <Icon
                      name="chevron-down"
                      size="md"
                      color="text-electric-jade"
                      className={`shrink-0 transition-transform duration-base ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <p className="pb-5 font-sans text-body-m text-ink">{item.a}</p>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-8 flex flex-col items-center gap-3 text-center">
            <p className="font-sans text-body-m text-ink/70">Still have a question?</p>
            <GorgiasChatButton label="Chat with PAWRA support" variant="secondary" />
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
