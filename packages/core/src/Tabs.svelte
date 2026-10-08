<script lang="ts">
  export let active = '';
  export let id = 'tabs';

  function selectTab(tabId: string) {
    active = tabId;
  }
</script>

<div class="tabs">
  <slot name="list" {active} {selectTab} {id} />
  <slot name="panels" {active} {id} />
</div>

<style>
  .tabs {
    width: 100%;
    color: var(--color-text);
  }
</style>