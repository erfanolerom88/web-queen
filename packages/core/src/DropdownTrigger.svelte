<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{ activate: KeyboardEvent }>();
  export let open = false;
  export let disabled = false;

  function handleKeydown(event: KeyboardEvent) {
    if (disabled || (event.key !== 'Enter' && event.key !== ' ')) return;
    event.preventDefault();
    dispatch('activate', event);
  }
</script>

<button
  data-dropdown-trigger
  type="button"
  class="dropdown-trigger"
  {disabled}
  aria-haspopup="true"
  aria-expanded={open}
  on:keydown={handleKeydown}
  on:click
>
  <slot />
  <span class="dropdown-trigger__chevron" aria-hidden="true">▾</span>
</button>

<style>
  .dropdown-trigger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    min-height: 2.75rem;
    padding: var(--space-3) var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface-raised);
    color: var(--color-text);
    font: inherit;
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
    cursor: pointer;
    transition: border-color 140ms ease, background 140ms ease;
  }

  .dropdown-trigger:hover:not(:disabled) {
    border-color: var(--color-accent);
  }

  .dropdown-trigger:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  .dropdown-trigger:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .dropdown-trigger__chevron {
    color: var(--color-text-muted);
    font-size: var(--text-sm);
  }

  @media (prefers-reduced-motion: reduce) {
    .dropdown-trigger { transition: none; }
  }
</style>