<script lang="ts">
  import { gsapAnimate } from '@web-queen/motion';

  import type { BadgeVariant } from './badge';

  type Variant = BadgeVariant;

  export let variant: Variant = 'primary';
  /** Play the GSAP mount animation. Skipped silently when reduced motion is preferred. */
  export let animate = false;

  $: motionConfig = { scale: 0.96, opacity: 0, duration: animate ? 0.3 : 0.24 };
</script>

<span class="badge badge--{variant}" use:gsapAnimate={animate ? motionConfig : undefined} {...$$restProps}>
  <slot />
</span>

<style>
  .badge {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-1) var(--space-2);
    border: var(--border-width) solid transparent;
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--color-text);
    font-family: var(--font-sans);
    font-size: var(--text-sm);
    font-weight: var(--weight-semibold);
    line-height: var(--leading-tight);
    white-space: nowrap;
  }

  /* Variants */
  .badge--primary {
    background: var(--color-accent);
    border-color: var(--color-accent);
    color: var(--color-accent-fg);
  }

  .badge--secondary {
    background: var(--color-surface-raised);
    border-color: var(--color-border);
    color: var(--color-text);
  }

  .badge--ghost {
    background: transparent;
    border-color: transparent;
    color: var(--color-text-muted);
  }

  .badge--danger {
    background: var(--color-danger);
    border-color: var(--color-danger);
    color: var(--color-danger-fg);
  }
</style>
