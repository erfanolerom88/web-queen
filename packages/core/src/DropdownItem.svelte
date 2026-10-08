<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{ select: MouseEvent }>();
  export let disabled = false;

  function activate(event: MouseEvent) {
    if (!disabled) dispatch('select', event);
  }
</script>

<button
  type="button"
  class="dropdown-item"
  role="menuitem"
  {disabled}
  tabindex={disabled ? -1 : 0}
  on:click={activate}
>
  <slot />
</button>

<style>
  .dropdown-item {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 2.5rem;
    padding: var(--space-2) var(--space-3);
    border: 0;
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--color-text);
    font: inherit;
    font-size: var(--text-sm);
    text-align: left;
    cursor: pointer;
  }

  .dropdown-item:hover:not(:disabled),
  .dropdown-item:focus-visible {
    outline: none;
    background: var(--color-surface);
    color: var(--color-text);
  }

  .dropdown-item:focus-visible {
    box-shadow: inset 0 0 0 2px var(--color-accent);
  }

  .dropdown-item:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
</style>