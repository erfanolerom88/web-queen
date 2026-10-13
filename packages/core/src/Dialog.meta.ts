import type { DialogComponentProps } from './dialog.types';

export const dialogMeta = {
  name: 'Dialog',
  category: 'overlay',
  description: 'Accessible modal dialog with variants, sizes, and reduced-motion support.',
  props: {
    open: { type: 'boolean', default: false },
    variant: { type: 'enum', options: ['default', 'alert', 'sheet'], default: 'default' },
    size: { type: 'enum', options: ['sm', 'md', 'lg', 'full'], default: 'md' },
    status: { type: 'enum', options: ['idle', 'error', 'success'], default: 'idle' },
    title: { type: 'string', default: '' },
    description: { type: 'string', default: '' },
    dismissible: { type: 'boolean', default: true },
    closeLabel: { type: 'string', default: 'Close' },
    transition: { type: 'boolean', default: true }
  },
  events: ['onOpenChange', 'onClose'],
  slots: ['children', 'footer']
} satisfies {
  name: string;
  category: string;
  description: string;
  props: Record<string, unknown>;
  events: string[];
  slots: string[];
};

export type { DialogComponentProps };
