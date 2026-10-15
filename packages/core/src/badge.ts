/** Public prop types for the `Badge` component (kept out of the .svelte file so
 *  the package barrel can re-export them as types). */

export type BadgeVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

export type BadgeProps = {
  /** Visual treatment. @default 'primary' */
  variant?: BadgeVariant;
  /** Plays the GSAP mount animation. Skipped when reduced motion is preferred. */
  animate?: boolean;
};
