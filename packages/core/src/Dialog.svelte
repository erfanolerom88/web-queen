<script lang="ts">
  import type { DialogComponentProps } from './dialog.types';

  let {
    open = $bindable(false),
    variant = 'default',
    size = 'md',
    status = 'idle',
    title = '',
    description = '',
    dismissible = true,
    closeLabel = 'Close',
    transition = true,
    onOpenChange,
    onClose,
    children,
    footer,
    ...rest
  }: DialogComponentProps = $props();

  /** Stable ids so the dialog can point at its own title/description. */
  const baseId = `wq-dialog-${Math.random().toString(36).slice(2, 9)}`;
  const titleId = `${baseId}-title`;
  const descriptionId = `${baseId}-description`;

  let dialogEl = $state<HTMLDialogElement | null>(null);
  let previouslyFocused: HTMLElement | null = null;

  // Focus management: move focus in on open, restore it on close.
  $effect(() => {
    if (open) {
      previouslyFocused =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
      const id = requestAnimationFrame(() => dialogEl?.focus());
      return () => cancelAnimationFrame(id);
    }

    if (previouslyFocused) {
      previouslyFocused.focus();
      previouslyFocused = null;
    }
  });

  // The native <dialog> is the top layer; `showModal()` enables the platform's
  // focus containment, inertness of the page behind it, and native Escape.
  $effect(() => {
    const el = dialogEl;
    if (!el) return;

    if (open && !el.open) {
      if (typeof el.showModal === 'function') el.showModal();
      else el.setAttribute('open', '');
    } else if (!open && el.open) {
      if (typeof el.close === 'function') el.close();
      else el.removeAttribute('open');
    }

    return () => {
      if (typeof el.close === 'function' && el.open) el.close();
    };
  });

  // Lock body scroll while open, and restore whatever it was on close.
  $effect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  });

  function handleClose() {
    open = false;
    onOpenChange?.(false);
    onClose?.();
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && dismissible) {
      event.preventDefault();
      handleClose();
    }
  }

  function handleOverlayClick(event: MouseEvent) {
    if (dismissible && event.target === event.currentTarget) {
      handleClose();
    }
  }

  /** Native Escape and programmatic close both funnel through here. */
  function handleNativeClose() {
    if (!open) return;
    open = false;
    onOpenChange?.(false);
    onClose?.();
  }
</script>

{#if open}
  <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
  <dialog
    bind:this={dialogEl}
    class="wq-dialog"
    class:wq-dialog--no-transition={!transition}
    data-variant={variant}
    data-size={size}
    data-status={status}
    onclose={handleNativeClose}
    oncancel={(event) => {
      if (!dismissible) event.preventDefault();
    }}
    {...rest}
  >
    <!-- The overlay is a sibling of the panel so clicking it dismisses without
         the click ever reaching the dialog content. -->
    <div class="wq-dialog__overlay" role="presentation" onclick={handleOverlayClick}></div>

    <div
      class="wq-dialog__panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={description ? descriptionId : undefined}
      tabindex="-1"
      onkeydown={handleKeydown}
    >
      {#if title || description || dismissible}
        <header class="wq-dialog__header">
          <div class="wq-dialog__heading">
            {#if title}
              <h2 class="wq-dialog__title" id={titleId}>{title}</h2>
            {/if}
            {#if description}
              <p class="wq-dialog__description" id={descriptionId}>{description}</p>
            {/if}
          </div>

          {#if dismissible}
            <button
              class="wq-dialog__close"
              type="button"
              aria-label={closeLabel}
              title={closeLabel}
              onclick={handleClose}
            >
              <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                <path
                  d="M4.22 4.22a.75.75 0 0 1 1.06 0L8 6.94l2.72-2.72a.75.75 0 1 1 1.06 1.06L9.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L8 9.06l-2.72 2.72a.75.75 0 0 1-1.06-1.06L6.94 8 4.22 5.28a.75.75 0 0 1 0-1.06Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          {/if}
        </header>
      {/if}

      {#if children}
        <div class="wq-dialog__body">
          {@render children()}
        </div>
      {/if}

      {#if footer}
        <footer class="wq-dialog__footer">
          {@render footer()}
        </footer>
      {/if}
    </div>
  </dialog>
{/if}

<style>
  .wq-dialog {
    position: fixed;
    z-index: 1100;
    inset: 0;
    display: flex;
    width: 100%;
    max-width: none;
    height: 100%;
    max-height: none;
    margin: 0;
    padding: 0;
    border: 0;
    background: transparent;
    overflow: hidden;
    color: var(--color-text);
  }

  .wq-dialog[open] {
    display: flex;
  }

  .wq-dialog::backdrop {
    background: oklch(from var(--color-bg) l c h / 0.72);
  }

  .wq-dialog__overlay {
    position: absolute;
    inset: 0;
  }

  .wq-dialog__panel {
    position: relative;
    display: flex;
    flex-direction: column;
    margin: auto;
    max-height: calc(100vh - 2 * var(--space-6));
    overflow-y: auto;
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
    color: var(--color-text);
    box-shadow: var(--shadow-md);
    outline: none;
    animation: wq-dialog-in var(--motion-duration-modal) var(--motion-easing-emphasized) both;
  }

  .wq-dialog__panel:focus-visible {
    outline: var(--focus-ring-width) solid var(--focus-ring);
    outline-offset: var(--space-1);
  }

  /* Variants */
  [data-variant='default'] .wq-dialog__panel {
    padding: 0;
  }

  [data-variant='alert'] .wq-dialog__panel {
    padding: 0;
    border-top: var(--focus-ring-width) solid var(--color-danger);
  }

  [data-variant='sheet'] .wq-dialog__panel {
    width: min(100%, var(--dialog-sheet));
    height: 100vh;
    max-height: 100vh;
    margin: 0 0 0 auto;
    border-radius: 0;
    border-top: 0;
    border-right: 0;
    border-bottom: 0;
    animation-name: wq-dialog-in-sheet;
  }

  [data-variant='sheet'] {
    overflow: hidden;
  }

  /* Status accents */
  [data-status='error'] .wq-dialog__panel {
    border-color: var(--color-danger);
  }

  [data-status='success'] .wq-dialog__panel {
    border-color: var(--color-success);
  }

  [data-status='error'] .wq-dialog__header {
    border-bottom-color: var(--color-danger);
  }

  [data-status='success'] .wq-dialog__header {
    border-bottom-color: var(--color-success);
  }

  /* Sizes */
  [data-size='sm'] .wq-dialog__panel {
    width: min(100%, var(--dialog-sm));
  }

  [data-size='md'] .wq-dialog__panel {
    width: min(100%, var(--dialog-md));
  }

  [data-size='lg'] .wq-dialog__panel {
    width: min(100%, var(--dialog-lg));
  }

  [data-size='full'] .wq-dialog__panel {
    width: var(--dialog-full);
    max-width: var(--dialog-full);
  }

  .wq-dialog__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-4);
    padding: var(--space-5) var(--space-6);
    border-bottom: 1px solid var(--color-border);
  }

  .wq-dialog__heading {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    min-width: 0;
  }

  .wq-dialog__title {
    margin: 0;
    color: var(--color-text);
    font-size: var(--text-xl);
    font-weight: var(--weight-semibold);
    line-height: var(--leading-tight);
  }

  .wq-dialog__description {
    margin: 0;
    color: var(--color-text-muted);
    font-size: var(--text-sm);
    line-height: var(--leading-normal);
  }

  .wq-dialog__close {
    display: grid;
    flex: 0 0 auto;
    width: var(--control-h-sm);
    height: var(--control-h-sm);
    place-items: center;
    border: 0;
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--color-text-muted);
    cursor: pointer;
    transition: background-color var(--motion-duration-enter) var(--motion-easing-standard);
  }

  .wq-dialog__close svg {
    width: var(--icon-md);
    height: var(--icon-md);
  }

  .wq-dialog__close:hover {
    background: var(--color-surface-raised);
    color: var(--color-text);
  }

  .wq-dialog__close:focus-visible {
    outline: var(--focus-ring-width) solid var(--color-accent);
    outline-offset: var(--space-1);
  }

  .wq-dialog__body {
    padding: var(--space-6);
    color: var(--color-text-muted);
    font-size: var(--text-base);
    line-height: var(--leading-normal);
  }

  .wq-dialog__footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: var(--space-3);
    padding: var(--space-4) var(--space-6);
    border-top: 1px solid var(--color-border);
  }

  @keyframes wq-dialog-in {
    from {
      opacity: 0;
      transform: scale(0.96);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes wq-dialog-in-sheet {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @media (max-width: 480px) {
    .wq-dialog__panel {
      max-height: calc(100vh - 2 * var(--space-4));
      margin: var(--space-4);
      width: auto;
    }
  }

  /* Touch targets: keep the close control at the token minimum on touch. */
  @media (pointer: coarse) {
    .wq-dialog__close {
      width: var(--target-min);
      height: var(--target-min);
    }
  }

  /* Reduced motion: instant show, no animation. */
  @media (prefers-reduced-motion: reduce) {
    .wq-dialog__panel {
      animation: none;
    }

    .wq-dialog__close {
      transition: none;
    }
  }

  .wq-dialog--no-transition .wq-dialog__panel {
    animation: none;
  }
</style>
