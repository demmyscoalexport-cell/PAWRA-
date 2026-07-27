/**
 * Light / dark / system theme control for the header.
 */

import {useEffect, useState} from 'react';
import {Icon} from '~/components/ui/Icon';
import {applyTheme, readStoredTheme, resolveTheme} from '~/lib/theme';

/**
 * @param {{ className?: string; iconColor?: string }} props
 */
export function ThemeToggle({className = '', iconColor = 'text-text-primary'}) {
  const [theme, setTheme] = useState(/** @type {'light' | 'dark' | 'system'} */ ('system'));
  const [ready, setReady] = useState(false);
  const [spinKey, setSpinKey] = useState(0);

  useEffect(() => {
    const stored = readStoredTheme();
    setTheme(stored);
    applyTheme(stored);
    setReady(true);

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    function onChange() {
      const current = readStoredTheme();
      if (current === 'system') applyTheme('system');
    }
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  function cycle() {
    const order = /** @type {const} */ (['light', 'dark', 'system']);
    const next = order[(order.indexOf(theme) + 1) % order.length];
    setTheme(next);
    applyTheme(next);
    setSpinKey((k) => k + 1);
  }

  const resolved = resolveTheme(theme);
  const label =
    theme === 'system'
      ? `System (${resolved})`
      : theme === 'dark'
        ? 'Dark mode'
        : 'Light mode';

  return (
    <button
      type="button"
      className={`reset inline-flex h-11 w-11 items-center justify-center rounded-md p-1.5 transition-colors duration-300 hover:bg-action-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring ${className}`}
      onClick={cycle}
      aria-label={`Theme: ${label}. Click to change.`}
      title={label}
      suppressHydrationWarning
    >
      <span key={spinKey} className="inline-flex animate-theme-spin">
        {ready ? (
          <Icon
            name={theme === 'system' ? 'wifi' : resolved === 'dark' ? 'sun' : 'moon'}
            size="md"
            color={iconColor}
          />
        ) : (
          <Icon name="moon" size="md" color={iconColor} />
        )}
      </span>
    </button>
  );
}
