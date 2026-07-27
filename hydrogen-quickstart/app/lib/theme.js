/**
 * Theme helpers — light / dark / system, persisted in localStorage.
 */

export const THEME_STORAGE_KEY = 'pawra-theme';

/** @typedef {'light' | 'dark' | 'system'} ThemeMode */

/**
 * Inline boot script — run before paint to avoid theme flash.
 * Keep in sync with resolveTheme() / applyTheme() below.
 */
export const THEME_BOOT_SCRIPT = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var t=localStorage.getItem(k);var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var dark=t==='dark'||((t==='system'||!t||t==='')&&d)||(t!=='light'&&t!=='dark'&&t!=='system'&&d);document.documentElement.classList.toggle('dark',dark);document.documentElement.style.colorScheme=dark?'dark':'light';}catch(e){}})();`;

/** @returns {boolean} */
export function prefersDark() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * @param {ThemeMode | string | null} theme
 * @returns {'light' | 'dark'}
 */
export function resolveTheme(theme) {
  if (theme === 'dark') return 'dark';
  if (theme === 'light') return 'light';
  return prefersDark() ? 'dark' : 'light';
}

/**
 * @param {ThemeMode} theme
 */
export function applyTheme(theme) {
  const resolved = resolveTheme(theme);
  document.documentElement.classList.toggle('dark', resolved === 'dark');
  document.documentElement.style.colorScheme = resolved === 'dark' ? 'dark' : 'light';
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // ignore private mode / blocked storage
  }
}

/** @returns {ThemeMode} */
export function readStoredTheme() {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
  } catch {
    // ignore
  }
  return 'system';
}
