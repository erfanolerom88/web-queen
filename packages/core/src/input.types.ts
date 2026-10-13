/** Public prop contract for the `Input` component. */

export type InputVariant = 'default' | 'filled' | 'ghost';

export type InputSize = 'sm' | 'md' | 'lg';

export type InputStatus = 'idle' | 'error' | 'success';

export type InputType = 'text' | 'email' | 'password' | 'search' | 'url' | 'tel' | 'number';

/**
 * Motion preset name from `@web-queen/motion` (e.g. `'fade-in'`, `'reveal-in'`).
 * Any other string is treated as a no-op so the component works without the
 * motion package installed.
 */
export type InputAnimation = string;

export interface InputProps {
  /** Visual treatment. @default 'default' */
  variant?: InputVariant;
  /** Control height and label/message scale. @default 'md' */
  size?: InputSize;
  /** Validation state driving the border, ring and message styling. @default 'idle' */
  status?: InputStatus;
  /** Rendered in a `<label>` above the field and linked via `for`/`id`. */
  label?: string;
  /** Helper text below the field, exposed via `aria-describedby`. */
  hint?: string;
  /** Shown when `status === 'error'`; linked via `aria-describedby` and `role="alert"`. */
  errorMessage?: string;
  /** Disables the control and lowers opacity. */
  disabled?: boolean;
  /** Marks the field as required on the native control. */
  required?: boolean;
  /** Native input type. @default 'text' */
  type?: InputType;
  placeholder?: string;
  /** Bound text value. */
  value?: string;
  /** Motion preset from `@web-queen/motion`; applied as a mount animation. */
  animation?: InputAnimation;
  /** Stretches the field to fill its container. */
  fullWidth?: boolean;
}
