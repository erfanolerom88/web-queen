<script lang="ts">
  export let variant: 'primary' | 'secondary' | 'ghost' = 'primary';
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let disabled = false;
  export let loading = false;
</script>

<button
  {type}
  disabled={disabled || loading}
  aria-busy={loading}
  class="btn btn--{variant}"
  on:click
>
  {#if loading}
    <span class="btn__spinner" aria-hidden="true"></span>
  {/if}
  <slot />
</button>

<style>
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-6);
    font-family: var(--font-sans);
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
    line-height: 1;
    border-radius: var(--radius-md);
    border: 1px solid transparent;
    cursor: pointer;
    transition: background 140ms ease, color 140ms ease, border-color 140ms ease;
    white-space: nowrap;
    text-decoration: none;
  }

  .btn:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  .btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .btn__spinner {
    width: 0.9rem;
    height: 0.9rem;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: btn-spin 700ms linear infinite;
  }

  @keyframes btn-spin {
    to { transform: rotate(360deg); }
  }

  .btn--primary {
    background: var(--color-accent);
    color: var(--color-accent-fg);
    border-color: var(--color-accent);
  }

  .btn--primary:hover:not(:disabled) {
    background: var(--color-accent-hover);
    border-color: var(--color-accent-hover);
  }

  .btn--primary:active:not(:disabled) {
    filter: brightness(0.92);
  }

  .btn--secondary {
    background: var(--color-surface-raised);
    color: var(--color-text);
    border-color: var(--color-border);
  }

  .btn--secondary:hover:not(:disabled) {
    background: oklch(from var(--color-surface-raised) calc(l + 0.04) c h);
    border-color: oklch(from var(--color-border) calc(l + 0.08) c h);
  }

  .btn--ghost {
    background: transparent;
    color: var(--color-text-muted);
    border-color: var(--color-border);
  }

  .btn--ghost:hover:not(:disabled) {
    color: var(--color-text);
    border-color: oklch(from var(--color-border) calc(l + 0.1) c h);
  }

  @media (prefers-reduced-motion: reduce) {
    .btn { transition: none; }
    .btn__spinner { animation-duration: 1.4s; }
  }
</style>
