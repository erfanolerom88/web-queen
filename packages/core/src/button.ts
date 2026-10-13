/** Public prop types for the `Button` component (kept out of the .svelte file so
 *  the package barrel can re-export them as types). */

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonType = 'button' | 'submit' | 'reset';

export type ButtonProps = {
  /** Visual treatment. @default 'primary' */
  variant?: ButtonVariant;
  /** Control height / padding / label size. @default 'md' */
  size?: ButtonSize;
  /** Native button type; ignored when `href` renders an anchor. @default 'button' */
  type?: ButtonType;
  /** When set, the component renders an `<a>` instead of a `<button>`. */
  href?: string;
  /** Disables the control (native for buttons, `aria-disabled` + click guard for links). */
  disabled?: boolean;
  /** Shows a spinner, blocks interaction and sets `aria-busy`. */
  loading?: boolean;
  /** Plays the GSAP mount animation. Skipped when reduced motion is preferred. */
  animate?: boolean;
};
