<script lang="ts">
  export let id: string;
  export let active = false;
  export let baseId = 'tabs';
  export let selectTab: (tabId: string) => void = () => {};
</script>

<button
  type="button"
  id={`${baseId}-tab-${id}`}
  data-tab-id={id}
  role="tab"
  aria-selected={active}
  aria-controls={`${baseId}-panel-${id}`}
  tabindex={active ? 0 : -1}
  class="tab"
  class:tab--active={active}
  on:click={() => selectTab(id)}
>
  <slot />
</button>

<style>
  .tab {
    position: relative;
    flex: 0 0 auto;
    min-height: 2.75rem;
    padding: var(--space-3) var(--space-4);
    border: 0;
    border-bottom: 2px solid transparent;
    background: transparent;
    color: var(--color-text-muted);
    font: inherit;
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
    cursor: pointer;
    transition: color 140ms ease, border-color 140ms ease;
  }

  .tab:hover { color: var(--color-text); }

  .tab--active {
    border-bottom-color: var(--color-accent);
    color: var(--color-text);
  }

  .tab:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: -3px;
    border-radius: var(--radius-sm);
  }

  @media (prefers-reduced-motion: reduce) {
    .tab { transition: none; }
  }
</style>