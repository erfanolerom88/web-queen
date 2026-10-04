export const tokens = {
  colors: {
    background: '#0b1020',
    surface: '#121a2b',
    primary: '#7c9cff',
    secondary: '#9ce3d4',
    accent: '#f7b267',
    text: '#edf2ff',
    muted: '#aeb9d1',
    border: '#2a3b5d',
    shadow: 'rgba(9, 12, 22, 0.35)'
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem'
  },
  radii: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem'
  },
  shadows: {
    sm: '0 8px 18px rgba(7, 10, 18, 0.22)',
    md: '0 14px 28px rgba(7, 10, 18, 0.3)'
  }
} as const;

export const themeCss = `
  :root {
    --color-background: ${tokens.colors.background};
    --color-surface: ${tokens.colors.surface};
    --color-primary: ${tokens.colors.primary};
    --color-secondary: ${tokens.colors.secondary};
    --color-accent: ${tokens.colors.accent};
    --color-text: ${tokens.colors.text};
    --color-muted: ${tokens.colors.muted};
    --color-border: ${tokens.colors.border};
    --color-shadow: ${tokens.colors.shadow};
    --spacing-xs: ${tokens.spacing.xs};
    --spacing-sm: ${tokens.spacing.sm};
    --spacing-md: ${tokens.spacing.md};
    --spacing-lg: ${tokens.spacing.lg};
    --spacing-xl: ${tokens.spacing.xl};
    --spacing-xxl: ${tokens.spacing.xxl};
    --radius-sm: ${tokens.radii.sm};
    --radius-md: ${tokens.radii.md};
    --radius-lg: ${tokens.radii.lg};
    --radius-xl: ${tokens.radii.xl};
    --shadow-sm: ${tokens.shadows.sm};
    --shadow-md: ${tokens.shadows.md};
  }
`;

export type ThemeTokens = typeof tokens;
