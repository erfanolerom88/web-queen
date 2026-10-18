import type { ComponentMeta } from './meta.types';

/** Companion metadata for the `Button` component. */
export const meta = {
  name: 'Button',
  category: 'action',
  description: 'Token-driven action control with the shared core variant vocabulary, three sizes and a loading state.',
  props: {
    variant: { type: 'enum', options: ['primary', 'secondary', 'ghost', 'danger'], default: 'primary' },
    size: { type: 'enum', options: ['sm', 'md', 'lg'], default: 'md' },
    type: { type: 'enum', options: ['button', 'submit', 'reset'], default: 'button' },
    href: { type: 'string' },
    disabled: { type: 'boolean', default: false },
    loading: { type: 'boolean', default: false },
    animate: { type: 'boolean', default: false }
  },
  slots: ['default']
} satisfies ComponentMeta;
