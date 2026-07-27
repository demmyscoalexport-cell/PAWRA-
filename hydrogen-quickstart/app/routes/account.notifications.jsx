/**
 * @file account.notifications.jsx
 * @description Notification preference toggles (mock / local state).
 */

import {useState} from 'react';
import {buildSeoMeta} from '~/lib/seo';

export const meta = () =>
  buildSeoMeta({
    title: 'Notification Preferences',
    url: '/account/notifications',
    robots: {noIndex: true, noFollow: true},
  });

const DEFAULTS = {
  email: true,
  sms: false,
  push: true,
  orderUpdates: true,
  healthReminders: true,
  promotions: false,
};

export default function AccountNotificationsPage() {
  const [prefs, setPrefs] = useState(DEFAULTS);

  function toggle(key) {
    setPrefs((prev) => ({...prev, [key]: !prev[key]}));
  }

  const rows = [
    ['email', 'Email'],
    ['sms', 'SMS'],
    ['push', 'Push'],
    ['orderUpdates', 'Order updates'],
    ['healthReminders', 'Health reminders'],
    ['promotions', 'Promotions & offers'],
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-heading-m text-text-primary">Notification preferences</h2>
        <p className="mt-1 font-sans text-body-s text-text-secondary">
          Demo toggles — preferences are not persisted to a backend yet.
        </p>
      </div>
      <ul className="divide-y divide-border-subtle rounded-lg border border-border-subtle bg-surface">
        {rows.map(([key, label]) => (
          <li key={key} className="flex items-center justify-between gap-4 px-4 py-4">
            <span className="font-sans text-body-s text-text-primary">{label}</span>
            <button
              type="button"
              role="switch"
              aria-checked={prefs[key]}
              onClick={() => toggle(key)}
              className={`relative h-7 w-12 rounded-pill transition-colors ${
                prefs[key] ? 'bg-action-primary' : 'bg-action-secondary'
              }`}
            >
              <span
                className={`absolute top-0.5 h-6 w-6 rounded-full bg-surface shadow-sm transition-transform ${
                  prefs[key] ? 'left-5' : 'left-0.5'
                }`}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
