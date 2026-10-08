<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{ change: boolean }>();

  export let checked = false;
  export let label = '';
  export let disabled = false;

  function toggle() {
    if (disabled) return;
    checked = !checked;
    dispatch('change', checked);
  }
</script>

<button
  type="button"
  role="switch"
  aria-checked={checked}
  aria-label={label}
  {disabled}
  class="switch"
  class:switch--checked={checked}
  class:switch--disabled={disabled}
  on:click={toggle}
>
  <span class="switch__track" aria-hidden="true">
    <span class="switch__thumb"></span>
  </span>
  <span class="switch__label">{label}</span>
</button>

<style>
  .switch {
    display: inline-flex;
    align-items: center;
    gap: var(--space-3);
    width: fit-content;
    padding: 0;
    border: 0;
    background: transparent;
    color: var(--color-text);
    font: inherit;
    text-align: left;
    cursor: pointer;
  }

  .switch:focus-visible .switch__track {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  .switch--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .switch__track {
    display: flex;
    flex: 0 0 2.5rem;
    align-items: center;
    width: 2.5rem;
    height: 1.5rem;
    padding: 2px;
    border: 1px solid var(--color-border);
    border-radius: 999px;
    background: var(--color-surface-raised);
    transition: background 140ms ease, border-color 140ms ease;
  }

  .switch--checked .switch__track {
    border-color: var(--color-accent);
    background: var(--color-accent);
  }

  .switch__thumb {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: var(--color-text-muted);
    transition: transform 140ms ease, background 140ms ease;
  }

  .switch--checked .switch__thumb {
    transform: translateX(1rem);
    background: var(--color-accent-fg);
  }

  .switch__label {
    font-size: var(--text-sm);
    line-height: var(--leading-normal);
  }

  @media (prefers-reduced-motion: reduce) {
    .switch__track,
    .switch__thumb { transition: none; }
  }
</style>