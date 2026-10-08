<script lang="ts">
  export let id: string;
  export let active = false;
  export let baseId = 'tabs';
</script>

<div
  id={`${baseId}-panel-${id}`}
  role="tabpanel"
  aria-labelledby={`${baseId}-tab-${id}`}
  tabindex="0"
  hidden={!active}
  class="tab-panel"
>
  <slot />
</div>

<style>
  .tab-panel {
    padding: var(--space-4) 0;
    color: var(--color-text);
    outline: none;
  }

  .tab-panel:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 3px;
    border-radius: var(--radius-sm);
  }
</style>