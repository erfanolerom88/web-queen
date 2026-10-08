<script lang="ts">
  import { tick } from 'svelte';
  import { modalBackdropTransition, modalScaleTransition } from './motion';

  export let open = false;
  export let title = '';
  export let closeOnBackdrop = true;

  let backdrop: HTMLDivElement;
  let dialog: HTMLDivElement;
  let previouslyFocused: HTMLElement | null = null;
  let wasOpen = false;

  $: if (open && !wasOpen) {
    wasOpen = true;
    previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    tick().then(() => dialog?.focus());
    document.body.style.overflow = 'hidden';
  } else if (!open && wasOpen) {
    wasOpen = false;
    document.body.style.overflow = '';
    previouslyFocused?.focus();
  }

  function close() {
    open = false;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (!open) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }

    if (event.key !== 'Tab' || !dialog) return;

    const focusable = Array.from(
      dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'
      )
    ).filter((element) => element.getClientRects().length > 0);

    if (focusable.length === 0) {
      event.preventDefault();
      dialog.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (!dialog.contains(document.activeElement)) {
      event.preventDefault();
      (event.shiftKey ? last : first).focus();
      return;
    }

    if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function handleWindowClick(event: MouseEvent) {
    if (open && closeOnBackdrop && event.target === backdrop) close();
  }
</script>

<svelte:window on:click={handleWindowClick} />

{#if open}
  <div bind:this={backdrop} class="modal-backdrop" transition:modalBackdropTransition>
    <div
      bind:this={dialog}
      class="modal"
      role="dialog"
      aria-modal="true"
      aria-label={title || undefined}
      aria-labelledby={title && !$$slots.header ? 'modal-title' : undefined}
      tabindex="-1"
      transition:modalScaleTransition
      on:keydown={handleKeydown}
    >
      {#if title || $$slots.header}
        <header class="modal__header">
          {#if $$slots.header}
            <slot name="header" />
          {:else}
            <h2 id="modal-title" class="modal__title">{title}</h2>
          {/if}
          <button class="modal__close" type="button" aria-label="Close dialog" on:click={close}>
            ×
          </button>
        </header>
      {/if}
      <div class="modal__content">
        <slot />
      </div>
      {#if $$slots.footer}
        <footer class="modal__footer">
          <slot name="footer" />
        </footer>
      {/if}
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    z-index: 1100;
    inset: 0;
    display: grid;
    place-items: center;
    overflow-y: auto;
    padding: var(--space-6);
    background: oklch(from var(--color-bg) l c h / 0.72);
  }

  .modal {
    width: min(100%, 32rem);
    max-height: calc(100vh - 2 * var(--space-6));
    overflow-y: auto;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
    color: var(--color-text);
    box-shadow: var(--shadow-md);
    outline: none;
  }

  .modal__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    padding: var(--space-5) var(--space-6);
    border-bottom: 1px solid var(--color-border);
  }

  .modal__title {
    margin: 0;
    color: var(--color-text);
    font-size: var(--text-xl);
    font-weight: var(--weight-semibold);
    line-height: var(--leading-tight);
  }

  .modal__close {
    display: grid;
    flex: 0 0 2rem;
    width: 2rem;
    height: 2rem;
    place-items: center;
    border: 0;
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--color-text-muted);
    font: inherit;
    font-size: var(--text-xl);
    line-height: 1;
    cursor: pointer;
  }

  .modal__close:hover {
    background: var(--color-surface-raised);
    color: var(--color-text);
  }

  .modal__close:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  .modal__content {
    padding: var(--space-6);
    color: var(--color-text-muted);
    font-size: var(--text-base);
    line-height: var(--leading-normal);
  }

  .modal__footer {
    display: flex;
    justify-content: flex-end;
    gap: var(--space-3);
    padding: var(--space-4) var(--space-6);
    border-top: 1px solid var(--color-border);
  }

  @media (max-width: 480px) {
    .modal-backdrop { padding: var(--space-4); }
    .modal { max-height: calc(100vh - 2 * var(--space-4)); }
  }

</style>