/**
 * @file LocaleSwitcher.jsx
 * @description Placeholder language / currency preference switcher.
 */

import {createContext, useContext, useEffect, useMemo, useState} from 'react';

const STORAGE_KEY = 'pawra-locale-pref';

const OPTIONS = [
  {id: 'en-US', label: 'English / USD'},
  {id: 'en-CA', label: 'English / CAD'},
  {id: 'fr-CA', label: 'Français / CAD'},
  {id: 'es-US', label: 'Español / USD'},
];

const LocaleContext = createContext({
  locale: 'en-US',
  setLocale: /** @type {(id: string) => void} */ (() => {}),
  options: OPTIONS,
});

/** @param {{ children: import('react').ReactNode }} props */
export function LocaleProvider({children}) {
  const [locale, setLocaleState] = useState('en-US');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && OPTIONS.some((o) => o.id === stored)) setLocaleState(stored);
    } catch {
      // ignore
    }
  }, []);

  const setLocale = (id) => {
    setLocaleState(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      // ignore
    }
  };

  const value = useMemo(() => ({locale, setLocale, options: OPTIONS}), [locale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocalePref() {
  return useContext(LocaleContext);
}

/**
 * @param {{ className?: string }} props
 */
export function LocaleSwitcher({className = ''}) {
  const {locale, setLocale, options} = useLocalePref();

  return (
    <label className={`inline-flex items-center ${className}`}>
      <span className="sr-only">Language and currency</span>
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value)}
        className="h-11 max-w-[9.5rem] rounded-md border border-border-subtle bg-surface px-2 font-sans text-body-xs text-text-primary outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
        aria-label="Language and currency preference"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
