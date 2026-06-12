import logoPrimary from '~/assets/logos/logo-primary.svg?url';
import logoHorizontal from '~/assets/logos/logo-horizontal.svg?url';
import logoIcon from '~/assets/logos/logo-icon.svg?url';
import logoLight from '~/assets/logos/logo-light.svg?url';
import logoDark from '~/assets/logos/logo-dark.svg?url';

export type LogoVariant = 'primary' | 'horizontal' | 'icon' | 'light' | 'dark';

const LOGO_SOURCES: Record<LogoVariant, string> = {
  primary: logoPrimary,
  horizontal: logoHorizontal,
  icon: logoIcon,
  light: logoLight,
  dark: logoDark,
};

const LOGO_SIZES: Record<LogoVariant, {width: number; height: number}> = {
  primary: {width: 120, height: 80},
  horizontal: {width: 180, height: 48},
  icon: {width: 48, height: 48},
  light: {width: 180, height: 48},
  dark: {width: 180, height: 48},
};

type LogoProps = {
  variant?: LogoVariant;
  className?: string;
  height?: number;
};

export function Logo({variant = 'horizontal', className = '', height}: LogoProps) {
  const size = LOGO_SIZES[variant];
  const resolvedHeight = height ?? size.height;
  const aspectRatio = size.width / size.height;

  return (
    <img
      src={LOGO_SOURCES[variant]}
      alt="PAWRA"
      className={className}
      height={resolvedHeight}
      width={Math.round(resolvedHeight * aspectRatio)}
      loading="eager"
    />
  );
}
