import type { ComponentMeta } from './meta.types';

/** Companion metadata for the `Input` component. */
export const meta = {
  name: 'Input',
  category: 'form',
  description:
    'Token-driven text field with variants, sizes, validation states and motion presets.',
  props: {
    variant: { type: 'InputVariant', default: 'default' },
    size: { type: 'InputSize', default: 'md' },
    status: { type: 'InputStatus', default: 'idle' },
    label: { type: 'string' },
    hint: { type: 'string' },
    errorMessage: { type: 'string' },
    disabled: { type: 'boolean' },
    required: { type: 'boolean' },
    type: { type: 'InputType' },
    placeholder: { type: 'string' },
    value: { type: 'string' },
    animation: { type: 'InputAnimation' },
    fullWidth: { type: 'boolean' },
    error: { type: 'string', deprecated: 'use errorMessage' },
    helperText: { type: 'string', deprecated: 'use hint' }
  },
  bindings: ['value']
} satisfies ComponentMeta;
