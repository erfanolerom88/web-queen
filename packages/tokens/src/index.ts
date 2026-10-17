/** Design tokens — TypeScript source of truth. CSS vars live in `tokens.css`. */

export const colorThemes = {
  dark: {
    bg: 'oklch(12% 0.01 260)',
    surface: 'oklch(17% 0.015 260)',
    surfaceRaised: 'oklch(21% 0.015 260)',
    border: 'oklch(30% 0.02 260)',
    textMuted: 'oklch(66% 0.02 260)',
    text: 'oklch(92% 0.01 260)',
    accent: 'oklch(65% 0.18 250)',
    accentHover: 'oklch(70% 0.18 250)',
    accentFg: 'oklch(98% 0.01 250)',
    success: 'oklch(70% 0.12 160)',
    warning: 'oklch(78% 0.14 80)',
    danger: 'oklch(70% 0.16 20)',
    dangerHover: 'oklch(74% 0.16 20)',
    dangerFg: 'oklch(15% 0.02 20)',
    dangerFgAlt: 'oklch(15% 0.02 20)',
    shadowSm: '0 8px 18px rgba(7, 10, 18, 0.22)',
    shadowMd: '0 14px 28px rgba(7, 10, 18, 0.3)'
  },
  light: {
    bg: 'oklch(97% 0.008 250)',
    surface: 'oklch(100% 0 0)',
    surfaceRaised: 'oklch(99% 0.004 250)',
    border: 'oklch(84% 0.018 250)',
    textMuted: 'oklch(48% 0.025 255)',
    text: 'oklch(24% 0.025 255)',
    accent: 'oklch(52% 0.17 250)',
    accentHover: 'oklch(46% 0.17 250)',
    accentFg: 'oklch(99% 0.005 250)',
    success: 'oklch(48% 0.13 160)',
    warning: 'oklch(56% 0.14 75)',
    danger: 'oklch(54% 0.17 25)',
    dangerHover: 'oklch(48% 0.17 25)',
    dangerFg: 'oklch(99% 0.005 25)',
    dangerFgAlt: 'oklch(99% 0.005 25)',
    shadowSm: '0 8px 18px rgba(24, 35, 56, 0.08)',
    shadowMd: '0 14px 28px rgba(24, 35, 56, 0.14)'
  }
} as const;

export const spacing = {
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  12: '48px'
} as const;

export const radii = {
  sm: '6px',
  md: '10px',
  lg: '14px'
} as const;

/** Control sizing for interactive components (buttons, inputs, icon slots). */
export const sizes = {
  minTarget: '44px',
  controlSm: '32px',
  controlMd: '40px',
  controlLg: '48px',
  fieldMax: '360px'
} as const;

/** Border and focus-ring geometry shared by field-style controls. */
export const borders = {
  width: '1px',
  focusRingWidth: '3px'
} as const;

/** Dialog/sheet width caps, one per size step. */
export const dialogSizes = {
  sm: '25rem',
  md: '32.5rem',
  lg: '45rem',
  full: '90vw',
  sheet: '28rem'
} as const;

/** Semi-transparent layers for disabled / active (pressed) states. */
export const opacities = {
  disabled: '0.45',
  pressed: '0.85'
} as const;

export const type = {
  fontSans: 'system-ui, -apple-system, sans-serif',
  textSm: '0.875rem',
  textBase: '1rem',
  textLg: '1.125rem',
  textXl: '1.25rem',
  text2xl: '1.5rem',
  text4xl: '2.25rem',
  leadingTight: '1.25',
  leadingNormal: '1.6',
  weightNormal: '400',
  weightMedium: '500',
  weightSemibold: '600'
} as const;

export const motion = {
  duration: {
    fast: 120,
    enter: 160,
    modal: 190
  },
  easing: {
    standard: 'cubic-bezier(0.2, 0, 0, 1)',
    emphasized: 'cubic-bezier(0.16, 1, 0.3, 1)'
  }
} as const;

/** Default (dark) token bag used by JS consumers such as `@web-queen/core` motion helpers. */
export const tokens = {
  colors: {
    background: colorThemes.dark.bg,
    surface: colorThemes.dark.surface,
    primary: colorThemes.dark.accent,
    secondary: colorThemes.dark.success,
    accent: colorThemes.dark.accent,
    success: colorThemes.dark.success,
    warning: colorThemes.dark.warning,
    text: colorThemes.dark.text,
    muted: colorThemes.dark.textMuted,
    border: colorThemes.dark.border,
    shadow: 'rgba(9, 12, 22, 0.35)'
  },
  spacing: {
    xs: spacing[2],
    sm: spacing[3],
    md: spacing[4],
    lg: spacing[6],
    xl: spacing[8],
    xxl: spacing[12]
  },
  radii,
  opacities,
  borders,
  dialogSizes,
  shadows: {
    sm: colorThemes.dark.shadowSm,
    md: colorThemes.dark.shadowMd
  },
  motion
} as const;

export type ColorThemeName = keyof typeof colorThemes;
export type ThemeTokens = typeof tokens;
