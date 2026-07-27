/**
 * @file account.loyalty.jsx
 * @description Loyalty points, rewards catalog, and refer-a-friend.
 */

import {useState} from 'react';
import {Button} from '~/components/ui/Button';
import {LoyaltyProgress} from '~/components/account/LoyaltyProgress';
import {
  LOYALTY_HISTORY,
  LOYALTY_REWARDS,
  MOCK_ACCOUNT_USER,
  MOCK_REFERRALS,
} from '~/data/platform';
import {buildSeoMeta} from '~/lib/seo';

export const meta = () =>
  buildSeoMeta({
    title: 'Loyalty & Referrals',
    url: '/account/loyalty',
    robots: {noIndex: true, noFollow: true},
  });

export default function AccountLoyaltyPage() {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(MOCK_REFERRALS.shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-sans text-heading-m text-text-primary">PAWRA Rewards</h2>
        <p className="mt-1 font-sans text-body-s text-text-secondary">
          Earn points on every order. Refer friends for $10 / $10 credit.
        </p>
      </div>

      <LoyaltyProgress
        points={MOCK_ACCOUNT_USER.loyaltyPoints}
        tier={MOCK_ACCOUNT_USER.tier}
        thresholds={MOCK_ACCOUNT_USER.tierThresholds}
      />

      <section>
        <h3 className="font-sans text-body-m font-semibold text-text-primary">Rewards catalog</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {LOYALTY_REWARDS.map((reward) => (
            <article key={reward.id} className="rounded-lg border border-border-subtle bg-page-bg p-4">
              <p className="font-sans text-body-m font-semibold text-text-primary">{reward.title}</p>
              <p className="mt-1 font-sans text-body-s text-text-secondary">{reward.description}</p>
              <p className="mt-3 font-mono text-mono-s text-action-primary">{reward.points} points</p>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="mt-4"
                disabled={MOCK_ACCOUNT_USER.loyaltyPoints < reward.points}
              >
                Redeem
              </Button>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h3 className="font-sans text-body-m font-semibold text-text-primary">Points history</h3>
        <ul className="mt-4 divide-y divide-border-subtle rounded-lg border border-border-subtle bg-surface">
          {LOYALTY_HISTORY.map((row) => (
            <li key={row.id} className="flex items-center justify-between gap-3 px-4 py-3">
              <div>
                <p className="font-sans text-body-s text-text-primary">{row.label}</p>
                <p className="font-mono text-mono-s text-text-secondary">{row.date}</p>
              </div>
              <p className={`font-mono text-mono-s font-semibold ${row.points >= 0 ? 'text-success' : 'text-sale'}`}>
                {row.points >= 0 ? '+' : ''}{row.points}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-lg border border-border-subtle bg-page-bg p-4">
        <h3 className="font-sans text-body-m font-semibold text-text-primary">Refer a friend</h3>
        <p className="mt-2 font-sans text-body-s text-text-secondary">
          Share your link. You both get $10 when they place their first order. Credits earned: ${MOCK_REFERRALS.creditEarned}.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <code className="rounded-md bg-surface px-3 py-2 font-mono text-mono-s text-text-primary">
            {MOCK_REFERRALS.shareLink}
          </code>
          <Button type="button" variant="primary" size="sm" onClick={copyLink}>
            {copied ? 'Copied' : 'Copy link'}
          </Button>
        </div>
        <ul className="mt-6 space-y-2">
          {MOCK_REFERRALS.friends.map((friend) => (
            <li key={friend.id} className="flex justify-between rounded-md bg-surface px-4 py-3 font-sans text-body-s">
              <span className="text-text-primary">{friend.name}</span>
              <span className="text-text-secondary">
                {friend.status} · ${friend.credit} · {friend.date}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
