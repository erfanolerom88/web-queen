<script lang="ts">
  import { tick } from 'svelte';
  import { dropdownTransition } from './motion';

  export let open = false;
  let root: HTMLDivElement;

  function toggle() {
    open = !open;
    if (open) tick().then(focusFirstItem);
  }

  function close(restoreFocus = false) {
    open = false;
    if (restoreFocus) tick().then(() => root?.querySelector<HTMLButtonElement>('[data-dropdown-trigger]')?.focus());
  }

  function focusFirstItem() {
    root?.querySelector<HTMLButtonElement>('[role="menuitem"]:not(:disabled)')?.focus();
  }

  function handleDocumentClick(event: MouseEvent) {
    if (open && root && !root.contains(event.target as Node)) close();
  }

  function handleDocumentKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && open) {
      event.preventDefault();
      close(true);
    }
  }

  function handleMenuClick(event: MouseEvent) {
    if ((event.target as Element).closest('[role="menuitem"]')) close(true);
  }

  function handleMenuKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault();
      close(true);
      return;
    }

    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;

    const items = Array.from(
      root.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not(:disabled)')
    );
    if (items.length === 0) return;

    event.preventDefault();
    const currentIndex = items.indexOf(document.activeElement as HTMLButtonElement);
    let nextIndex = 0;

    if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = items.length - 1;
    else if (event.key === 'ArrowDown') nextIndex = (currentIndex + 1) % items.length;
    else nextIndex = (currentIndex <= 0 ? items.length : currentIndex) - 1;

    items[nextIndex].focus();
  }
</script>

<svelte:window on:click={handleDocumentClick} on:keydown={handleDocumentKeydown} />

<div bind:this={root} class="dropdown">
  <slot name="trigger" {open} {toggle} />
  {#if open}
    <div class="dropdown__menu" role="menu" tabindex="-1" transition:dropdownTransition on:keydown={handleMenuKeydown} on:click={handleMenuClick}>
      <slot name="menu" {close} />
    </div>
  {/if}
</div>

<style>
  .dropdown {
    position: relative;
    display: inline-flex;
    width: fit-content;
  }

  .dropdown__menu {
    position: absolute;
    z-index: 900;
    top: calc(100% + var(--space-2));
    right: 0;
    min-width: 12rem;
    display: grid;
    gap: var(--space-1);
    padding: var(--space-2);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface-raised);
    color: var(--color-text);
    box-shadow: var(--shadow-md);
  }
</style>