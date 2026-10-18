import type { ComponentMeta } from './meta.types';

/** Companion metadata for the `Input` component. */
export const meta = {
  name: 'Input',
  category: 'form',
  description:
    'Token-driven text field with variants, sizes, validation states and motion presets.',
  props: {
    variant: { type: 'enum', options: ['default', 'filled', 'ghost'], default: 'default' },
    size: { type: 'enum', options: ['sm', 'md', 'lg'], default: 'md' },
    status: { type: 'enum', options: ['idle', 'error', 'success'], default: 'idle' },
    label: { type: 'string' },
    hint: { type: 'string' },
    errorMessage: { type: 'string' },
    disabled: { type: 'boolean' },
    required: { type: 'boolean' },
    type: {
      type: 'enum',
      options: ['text', 'email', 'password', 'search', 'url', 'tel', 'number'],
      default: 'text'
    },
    placeholder: { type: 'string' },
    value: { type: 'string' },
    animation: { type: 'string' },
    fullWidth: { type: 'boolean' },
    error: { type: 'string', deprecated: 'use errorMessage' },
    helperText: { type: 'string', deprecated: 'use hint' }
  },
  bindings: ['value']
} satisfies ComponentMeta;
