/**
 * Full Walker Referral Program page content.
 */

import {Button} from '~/components/ui/Button';
import {Badge} from '~/components/ui/Badge';
import {StaticPageLayout} from '~/components/StaticPageLayout';
import {
  FEATURED_WALKER,
  WALKER_PROGRAM,
  WALKER_SERVICE_REVIEWS,
} from '~/lib/walkerProgram';
import {BRAND} from '~/lib/branding';
import walkerHero from '~/assets/images/walker-program-hero.png';

export function WalkerProgramPage() {
  return (
    <StaticPageLayout title={WALKER_PROGRAM.title} description={WALKER_PROGRAM.description}>
      <div className="relative mb-10 overflow-hidden rounded-xl">
        <img
          src={walkerHero}
          alt={`${FEATURED_WALKER.name} walking a dog in PAWRA gear`}
          className="aspect-[16/9] w-full object-cover"
          width={1200}
          height={675}
          loading="eager"
        />
        <div className="absolute bottom-4 left-4 flex items-center gap-3">
          <Badge type="walker-approved" />
          <span className="rounded-md bg-midnight/70 px-3 py-1 font-sans text-body-s text-cloud">
            {FEATURED_WALKER.name} · {FEATURED_WALKER.location}
          </span>
        </div>
      </div>

      <p className="font-sans text-body-s text-ink/60">{FEATURED_WALKER.address}</p>
      <p>{FEATURED_WALKER.blurb}</p>

      <h3>What clients say about her walks</h3>
      <ul className="mt-4 list-none space-y-4 pl-0">
        {WALKER_SERVICE_REVIEWS.map((review) => (
          <li
            key={review.name}
            className="rounded-lg border border-forest-green/15 bg-cloud/60 p-5"
          >
            <p className="font-serif text-body-l italic text-ink">&ldquo;{review.quote}&rdquo;</p>
            <p className="mt-3 font-sans text-body-s font-semibold text-forest-green">
              {review.name}
              <span className="font-normal text-ink/60"> — {review.meta}</span>
            </p>
          </li>
        ))}
      </ul>

      <h3>How the referral program works</h3>
      <ol>
        <li>
          <strong>Apply</strong> — tell us about your walking business (city, experience, social
          links).
        </li>
        <li>
          <strong>Get approved</strong> — we email you a unique PAWRA discount code (for example{' '}
          <code>{WALKER_PROGRAM.exampleDiscountCode}</code>).
        </li>
        <li>
          <strong>Share with clients</strong> — recommend PAWRA food, beds, leashes, and wellness
          products; they use your code at checkout.
        </li>
        <li>
          <strong>Earn</strong> — track redemptions with us; we renew or upgrade codes for active
          partners.
        </li>
      </ol>

      <h3>Benefits for walkers</h3>
      <ul>
        <li>Your own shareable referral code</li>
        <li>Walker Approved story you can share with clients</li>
        <li>Early access to new gear your clients ask for</li>
        <li>Support from the PAWRA team at {BRAND.supportEmail}</li>
      </ul>

      <h3>Apply now</h3>
      <p>
        Email us with your name, city, Instagram or website, and a short note about your walking
        business.
      </p>
      <div className="mt-6 not-prose">
        <Button variant="primary" size="lg" href={WALKER_PROGRAM.applyMailto}>
          Email your application
        </Button>
      </div>

      <h3>FAQ</h3>
      <p>
        <strong>Who can join?</strong> Active professional dog walkers and small walking
        businesses in the United States.
      </p>
      <p>
        <strong>How do codes work?</strong> After approval we create a unique Shopify discount
        code for your clients. You share it; they enter it at checkout.
      </p>
      <p>
        <strong>What can clients buy?</strong> Any PAWRA product published on the store —
        including food, beds, grooming, and accessories.
      </p>
      <p>
        <strong>Is there a fee?</strong> No fee to apply. Partnership terms are confirmed by email
        when you are approved.
      </p>
    </StaticPageLayout>
  );
}
