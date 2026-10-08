<script lang="ts">
  export let active = '';
  export let baseId = 'tabs';
  export let label = 'Content views';
  export let selectTab: (tabId: string) => void = () => {};

  function handleKeydown(event: KeyboardEvent) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;

    const tabs = Array.from(
      event.currentTarget instanceof HTMLElement
        ? event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)')
        : []
    );
    if (tabs.length === 0) return;

    event.preventDefault();
    const currentIndex = tabs.indexOf(document.activeElement as HTMLButtonElement);
    let nextIndex: number;

    if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = tabs.length - 1;
    else if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % tabs.length;
    else nextIndex = (currentIndex <= 0 ? tabs.length : currentIndex) - 1;

    const nextTab = tabs[nextIndex];
    nextTab.focus();
    const tabId = nextTab.dataset.tabId;
    if (tabId) selectTab(tabId);
  }
</script>

<div class="tab-list" role="tablist" aria-label={label} tabindex="-1" on:keydown={handleKeydown}>
  <slot {active} {baseId} {selectTab} />
</div>

<style>
  .tab-list {
    display: flex;
    align-items: stretch;
    gap: var(--space-1);
    width: 100%;
    overflow-x: auto;
    border-bottom: 1px solid var(--color-border);
  }
</style>