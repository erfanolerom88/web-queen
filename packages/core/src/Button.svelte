<script lang="ts">
  import { gsapAnimate } from '@web-queen/motion';

  import type { ButtonSize, ButtonType, ButtonVariant } from './button';

  type Variant = ButtonVariant;
  type Size = ButtonSize;

  export let variant: Variant = 'primary';
  export let size: Size = 'md';
  export let type: ButtonType = 'button';
  export let href: string | undefined = undefined;
  export let disabled = false;
  export let loading = false;
  /** Play the GSAP mount animation. Skipped silently when reduced motion is preferred. */
  export let animate = false;

  $: isLink = typeof href === 'string' && href.length > 0;
  $: isDisabled = disabled || loading;
  $: motionConfig = isLink
    ? { scale: 0.98, opacity: 0, duration: 0.28 }
    : { scale: 0.96, opacity: 0, duration: 0.3 };
</script>

{#if isLink}
  <a
    {href}
    class="btn btn--{variant} btn--{size}"
    class:btn--loading={loading}
    aria-disabled={isDisabled ? 'true' : undefined}
    aria-busy={loading ? 'true' : undefined}
    tabindex={isDisabled ? -1 : undefined}
    on:click={(event) => {
      if (isDisabled) event.preventDefault();
    }}
    use:gsapAnimate={animate ? motionConfig : undefined}
    {...$$restProps}
  >
    {#if loading}
      <span class="btn__spinner" aria-hidden="true"></span>
    {/if}
    <span class="btn__label"><slot /></span>
  </a>
{:else}
  <button
    {type}
    class="btn btn--{variant} btn--{size}"
    class:btn--loading={loading}
    disabled={isDisabled}
    aria-disabled={isDisabled ? 'true' : undefined}
    aria-busy={loading ? 'true' : undefined}
    on:click
    use:gsapAnimate={animate ? motionConfig : undefined}
    {...$$restProps}
  >
    {#if loading}
      <span class="btn__spinner" aria-hidden="true"></span>
    {/if}
    <span class="btn__label"><slot /></span>
  </button>
{/if}

<style>
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    min-height: var(--control-h-md);
    padding: 0 var(--space-4);
    border: 1px solid transparent;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--color-text);
    font-family: var(--font-sans);
    font-size: var(--text-base);
    font-weight: var(--weight-medium);
    line-height: var(--leading-tight);
    text-align: center;
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    transition:
      background-color var(--motion-duration-enter) var(--motion-easing-standard),
      border-color var(--motion-duration-enter) var(--motion-easing-standard),
      color var(--motion-duration-enter) var(--motion-easing-standard);
  }

  /* Sizes */
  .btn--sm {
    min-height: var(--control-h-sm);
    padding: 0 var(--space-3);
    font-size: var(--text-sm);
  }

  .btn--md {
    min-height: var(--control-h-md);
    padding: 0 var(--space-4);
    font-size: var(--text-base);
  }

  .btn--lg {
    min-height: var(--control-h-lg);
    padding: 0 var(--space-6);
    font-size: var(--text-lg);
  }

  /* Variants */
  .btn--primary {
    background: var(--color-accent);
    border-color: var(--color-accent);
    color: var(--color-accent-fg);
  }

  .btn--primary:hover:not(:disabled):not([aria-disabled='true']) {
    background: var(--color-accent-hover);
    border-color: var(--color-accent-hover);
  }

  .btn--secondary {
    background: var(--color-surface-raised);
    border-color: var(--color-border);
    color: var(--color-text);
  }

  .btn--secondary:hover:not(:disabled):not([aria-disabled='true']) {
    border-color: var(--color-accent);
  }

  .btn--ghost {
    background: transparent;
    border-color: transparent;
    color: var(--color-text-muted);
  }

  .btn--ghost:hover:not(:disabled):not([aria-disabled='true']) {
    background: var(--color-surface-raised);
    color: var(--color-text);
  }

  .btn--danger {
    background: var(--color-danger);
    border-color: var(--color-danger);
    color: var(--color-danger-fg);
  }

  .btn--danger:hover:not(:disabled):not([aria-disabled='true']) {
    background: var(--color-danger-hover);
    border-color: var(--color-danger-hover);
  }

  /* States */
  .btn:active:not(:disabled):not([aria-disabled='true']) {
    opacity: var(--opacity-pressed);
  }

  /* Focus ring stays visible in both light and dark themes: the opaque accent
     outline carries the shape, the translucent halo adds contrast on the page. */
  .btn:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
    box-shadow: 0 0 0 4px var(--focus-ring);
  }

  .btn:disabled,
  .btn[aria-disabled='true'] {
    opacity: var(--opacity-disabled);
    cursor: not-allowed;
  }

  .btn--loading {
    cursor: progress;
  }

  .btn__label {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
  }

  .btn__spinner {
    flex: 0 0 auto;
    width: 1em;
    height: 1em;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: btn-spin 700ms linear infinite;
  }

  @keyframes btn-spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* Guarantee a 44x44 touch target on touch devices without inflating the
     visual box: the pseudo-element extends the hit area beyond the control. */
  @media (pointer: coarse) {
    .btn {
      position: relative;
    }

    .btn::after {
      content: '';
      position: absolute;
      inset: 50% 0 auto;
      height: var(--target-min);
      transform: translateY(-50%);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .btn {
      transition: none;
    }

    .btn__spinner {
      animation-duration: 1.4s;
    }
  }
</style>
