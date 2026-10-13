import type { Snippet } from 'svelte';
import type { HTMLAttributes, HTMLDialogAttributes } from 'svelte/elements';

export type DialogVariant = 'default' | 'alert' | 'sheet';
export type DialogSize = 'sm' | 'md' | 'lg' | 'full';
export type DialogStatus = 'idle' | 'error' | 'success';

/**
 * Native `<dialog>` attributes are accepted, minus the ones this component owns:
 * `open` is controlled by the `open` prop, and the event handlers would clash with
 * the `onOpenChange` / `onClose` callbacks below.
 */
export type DialogNativeAttributes = Omit<
  HTMLDialogAttributes,
  'open' | 'onopen' | 'onclose' | 'oncancel' | 'onchange'
>;

export interface DialogProps extends DialogNativeAttributes {
  /** Controls visibility of the dialog. */
  open?: boolean;
  /** Visual style of the dialog. */
  variant?: DialogVariant;
  /** Size of the dialog. */
  size?: DialogSize;
  /** Status state for validation feedback. */
  status?: DialogStatus;
  /** Title shown in the dialog header. */
  title?: string;
  /** Description shown below the title. */
  description?: string;
  /** Whether the dialog can be closed by clicking the overlay or pressing Escape. */
  dismissible?: boolean;
  /** Accessible label for the close button. */
  closeLabel?: string;
  /** Smooth open/close transition (respects prefers-reduced-motion). */
  transition?: boolean;
  /** Body content. */
  children?: Snippet;
  /** Footer actions rendered below the body. */
  footer?: Snippet;
  /** Whitelisted native attributes forwarded to the `<dialog>` element. */
  restProps?: HTMLAttributes<HTMLDialogElement>;
}

export interface DialogEvents {
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
}

export type DialogComponentProps = DialogProps & DialogEvents;
