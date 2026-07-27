/**
 * @file offline.jsx
 * @description Simple offline fallback page for PWA.
 */

import {Button} from '~/components/ui/Button';
import {PawraLogo} from '~/components/ui/PawraLogo';
import {buildSeoMeta} from '~/lib/seo';

export const meta = () =>
  buildSeoMeta({
    title: 'Offline',
    description: 'You appear to be offline.',
    url: '/offline',
    robots: {noIndex: true, noFollow: true},
  });

export default function OfflinePage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-page-bg px-4 py-24 text-center">
      <PawraLogo variant="primary" height={36} />
      <h1 className="mt-8 font-sans text-display-s text-text-primary">You&apos;re offline</h1>
      <p className="mt-3 max-w-md font-sans text-body-m text-text-secondary">
        Check your connection, then try again. Cached pages may still be available.
      </p>
      <Button variant="primary" size="md" href="/" className="mt-8">
        Try homepage
      </Button>
    </div>
  );
}
