/**
 * @file CompareContext.jsx
 * @description Persist up to 4 product handles for comparison (sessionStorage).
 */

import {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';

const STORAGE_KEY = 'pawra-compare-handles';
const MAX = 4;

const CompareContext = createContext({
  handles: /** @type {string[]} */ ([]),
  toggle: /** @type {(handle: string) => void} */ (() => {}),
  remove: /** @type {(handle: string) => void} */ (() => {}),
  clear: /** @type {() => void} */ (() => {}),
  has: /** @type {(handle: string) => boolean} */ (() => false),
});

function readHandles() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(Boolean).slice(0, MAX) : [];
  } catch {
    return [];
  }
}

/** @param {{ children: import('react').ReactNode }} props */
export function CompareProvider({children}) {
  const [handles, setHandles] = useState(/** @type {string[]} */ ([]));

  useEffect(() => {
    setHandles(readHandles());
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(handles));
    } catch {
      // ignore
    }
  }, [handles]);

  const toggle = useCallback((handle) => {
    if (!handle) return;
    setHandles((prev) => {
      if (prev.includes(handle)) return prev.filter((h) => h !== handle);
      if (prev.length >= MAX) return prev;
      return [...prev, handle];
    });
  }, []);

  const remove = useCallback((handle) => {
    setHandles((prev) => prev.filter((h) => h !== handle));
  }, []);

  const clear = useCallback(() => setHandles([]), []);

  const value = useMemo(
    () => ({
      handles,
      toggle,
      remove,
      clear,
      has: (handle) => handles.includes(handle),
    }),
    [handles, toggle, remove, clear],
  );

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export function useCompare() {
  return useContext(CompareContext);
}
