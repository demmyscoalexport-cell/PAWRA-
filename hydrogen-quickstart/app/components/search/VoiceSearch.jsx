/**
 * @file VoiceSearch.jsx
 * @description Microphone listening-state UI placeholder.
 */

import {useState} from 'react';
import {Icon} from '~/components/ui/Icon';

/**
 * @param {{ className?: string; onListeningChange?: (listening: boolean) => void }} props
 */
export function VoiceSearchButton({className = '', onListeningChange}) {
  const [listening, setListening] = useState(false);

  function toggle() {
    setListening((prev) => {
      const next = !prev;
      onListeningChange?.(next);
      return next;
    });
  }

  return (
    <button
      type="button"
      className={`reset relative inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors ${
        listening
          ? 'bg-action-primary/15 text-action-primary'
          : 'text-text-secondary hover:bg-page-bg hover:text-action-primary'
      } ${className}`}
      aria-label={listening ? 'Stop voice search' : 'Start voice search'}
      aria-pressed={listening}
      title="Voice search"
      onClick={toggle}
    >
      {listening ? <span className="absolute inset-0 animate-ping rounded-md bg-action-primary/20" aria-hidden="true" /> : null}
      <Icon name="chat" size="sm" color="currentColor" />
    </button>
  );
}
