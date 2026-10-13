import type { SelectProps } from './select.types';

/** Companion metadata for the `Select` component. */
export const meta = {
  name: 'Select',
  category: 'form',
  description: 'Token-driven native select with variants, sizes, and validation states.',
  props: {
    value: { type: 'string', default: '' },
    label: { type: 'string', default: '' },
    options: { type: 'SelectOption[]', default: [] },
    placeholder: { type: 'string', default: 'Select an option' },
    disabled: { type: 'boolean', default: false },
    required: { type: 'boolean', default: false },
    size: { type: 'enum', options: ['sm', 'md', 'lg'], default: 'md' },
    variant: { type: 'enum', options: ['default', 'outline', 'ghost'], default: 'default' },
    status: { type: 'enum', options: ['idle', 'error', 'success'], default: 'idle' },
    hint: { type: 'string', default: '' },
    errorMessage: { type: 'string', default: '' },
    fullWidth: { type: 'boolean', default: false },
    name: { type: 'string', default: '' },
    error: { type: 'string', default: '', deprecated: 'Use `errorMessage` with `status="error"`.' },
    helperText: { type: 'string', default: '', deprecated: 'Use `hint`.' }
  },
  bindings: ['value'],
  slots: ['default']
} satisfies {
  name: string;
  category: string;
  description: string;
  props: Record<string, unknown>;
  bindings: string[];
  slots: string[];
};

export type { SelectProps };
