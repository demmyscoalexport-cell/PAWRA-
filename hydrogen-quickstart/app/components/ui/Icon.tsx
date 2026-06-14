import type {SVGProps} from 'react';

export type IconName =
  | 'cart'
  | 'search'
  | 'user'
  | 'heart'
  | 'paw'
  | 'walker'
  | 'gps'
  | 'check'
  | 'arrow-right'
  | 'menu'
  | 'close'
  | 'star'
  | 'plus'
  | 'minus'
  | 'shield'
  | 'leaf'
  | 'truck'
  | 'wifi'
  | 'chevron-down'
  | 'instagram'
  | 'tiktok'
  | 'facebook'
  | 'pinterest';

export type IconSize = 'sm' | 'md' | 'lg';

const SIZE_MAP: Record<IconSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
};

const ICONS: Record<IconName, (props: SVGProps<SVGSVGElement>) => JSX.Element> = {
  cart: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 6h15l-1.5 9H7.5L6 6Z" />
      <path d="M6 6 5 3H2" />
      <circle cx="9" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
    </svg>
  ),
  search: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  ),
  user: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  ),
  heart: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 20s-7-4.5-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.5-9 9-9 9Z" />
    </svg>
  ),
  paw: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <circle cx="8" cy="8" r="2.5" />
      <circle cx="16" cy="8" r="2.5" />
      <circle cx="6" cy="14" r="2" />
      <circle cx="12" cy="16" r="2" />
      <circle cx="18" cy="14" r="2" />
      <ellipse cx="12" cy="19" rx="5" ry="3.5" />
    </svg>
  ),
  walker: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="5" r="2" />
      <path d="M10 22V12l-2-3 4-1 2 4v10" />
      <path d="M14 22v-6l3-5" />
    </svg>
  ),
  gps: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      <circle cx="12" cy="12" r="8" />
    </svg>
  ),
  check: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12l5 5L20 7" />
    </svg>
  ),
  'arrow-right': (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  ),
  menu: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  ),
  close: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  ),
  star: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="m12 2 2.9 6.9L22 9.8l-5 4.8 1.2 7L12 18.8 5.8 21.6 7 14.6 2 9.8l7.1-.9L12 2Z" />
    </svg>
  ),
  plus: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  minus: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14" />
    </svg>
  ),
  shield: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3 4 7v6c0 5 3.5 8 8 8s8-3 8-8V7l-8-4Z" />
    </svg>
  ),
  leaf: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 20c8-1 12-6 16-16-10 4-15 8-16 16Z" />
      <path d="M8 16c3-1 5-3 7-7" />
    </svg>
  ),
  truck: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-3.632-1.21A1 1 0 0 1 12 11.28V8a1 1 0 0 1 1-1h1a2 2 0 0 1 2 2v1" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  ),
  wifi: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <path d="M12 20h.01" />
      <path d="M2 8.82a15 15 0 0 1 20 0" />
    </svg>
  ),
  'chevron-down': (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  instagram: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  tiktok: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16 3a5 5 0 0 0 5 5v2h-3V8a2 2 0 0 0-2-2h-2V3h2Zm-2 7h3v2h-3v7a4 4 0 1 1-4-4h1.5a2.5 2.5 0 1 0 2.5 2.5V10Z" />
    </svg>
  ),
  facebook: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14 8h3V5h-3c-2.8 0-5 2.2-5 5v2H6v3h3v7h3v-7h2.5l.5-3H12V9c0-.6.4-1 1-1Z" />
    </svg>
  ),
  pinterest: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C6.5 2 2 6.5 2 12c0 4.1 2.5 7.6 6 9.2-.1-.8-.2-2 .1-3 0 0 .2-.8.2-.8s-.5-1-.5-2.5c0-2.3 1.3-4.1 3-4.1 1.4 0 2.1 1.1 2.1 2.4 0 1.5-.9 3.7-1.4 5.8-.4 1.7.9 3.1 2.6 3.1 3.1 0 5.5-3.3 5.5-8 0-4.2-3-7.1-7.3-7.1-5 0-7.9 3.7-7.9 7.5 0 1.5.6 3.1 1.3 4 .1.2.2.3.1.5l-.5 1.9c0 .2-.1.2-.3.1-1.8-.8-2.9-3.4-2.9-5.5C4 7 7.6 3.5 12 3.5S20 7 20 11.5 16.4 20 12 20c-.7 0-1.4-.1-2-.2l-1.2 4.6c-.3 1.1-1.1 2.5-1.6 3.4.6.2 1.2.3 1.8.3 5.5 0 10-4.5 10-10S17.5 2 12 2Z" />
    </svg>
  ),
};

type IconProps = {
  name: IconName;
  size?: IconSize;
  className?: string;
  color?: string;
};

export function Icon({name, size = 'md', className = '', color}: IconProps) {
  const Svg = ICONS[name];
  const colorClass = color ?? 'text-forest-green';

  return (
    <span className={`inline-flex shrink-0 items-center justify-center ${SIZE_MAP[size]} ${colorClass} ${className}`}>
      <Svg className="h-full w-full" aria-hidden="true" />
    </span>
  );
}
