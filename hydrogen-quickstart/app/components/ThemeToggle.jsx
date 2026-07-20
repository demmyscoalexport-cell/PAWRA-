/**
 * Light / dark theme toggle button for the header.
 */

import {useEffect, useState} from 'react';
import {Icon} from '~/components/ui/Icon';
import {applyTheme, readStoredTheme} from '~/lib/theme';

/**
 * @param {{ className?: string; iconColor?: string }} props
 */
export function ThemeToggle({className = '', iconColor = 'text-cloud'}) {
  const [theme, setTheme] = useState(/** @type {'light' | 'dark'} */ ('light'));
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTheme(readStoredTheme());
    setReady(true);
  }, []);

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    applyTheme(next);
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className={`reset inline-flex items-center justify-center rounded-md p-1.5 transition-colors hover:bg-cloud/10 ${className}`}
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      suppressHydrationWarning
    >
      {ready ? (
        <Icon name={isDark ? 'sun' : 'moon'} size="md" color={iconColor} />
      ) : (
        <Icon name="moon" size="md" color={iconColor} />
      )}
    </button>
  );
}
