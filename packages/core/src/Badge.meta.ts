import type { ComponentMeta } from './meta.types';

/** Companion metadata for the `Badge` component. */
export const meta = {
  name: 'Badge',
  category: 'display',
  description: 'Token-driven non-interactive label with the shared core variant vocabulary.',
  props: {
    variant: { type: 'enum', options: ['primary', 'secondary', 'ghost', 'danger'], default: 'primary' },
    animate: { type: 'boolean', default: false }
  }
} satisfies ComponentMeta;
