<script lang="ts">
  import { dismissToast, toastStore } from './toast';
</script>

<aside class="toast-region" aria-label="Notifications">
  <div class="toast-stack" aria-live="polite" aria-relevant="additions">
    {#each $toastStore as toast (toast.id)}
      <article class="toast" role="status">
        <span class="toast__accent" aria-hidden="true"></span>
        <div class="toast__content">
          <p class="toast__title">{toast.title}</p>
          <p class="toast__message">{toast.message}</p>
        </div>
        <button
          class="toast__dismiss"
          type="button"
          aria-label="Dismiss notification"
          title="Dismiss notification"
          on:click={() => dismissToast(toast.id)}
        >
          ×
        </button>
      </article>
    {/each}
  </div>
</aside>

<style>
  .toast-region {
    position: fixed;
    z-index: 1000;
    top: var(--space-4);
    right: var(--space-4);
    width: min(24rem, calc(100vw - 2 * var(--space-4)));
    pointer-events: none;
  }

  .toast-stack {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .toast {
    display: flex;
    align-items: flex-start;
    gap: var(--space-3);
    padding: var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    border-left: 3px solid var(--color-accent);
    background: var(--color-surface-raised);
    color: var(--color-text);
    box-shadow: var(--shadow-md);
    pointer-events: auto;
    animation: toast-enter 180ms ease-out both;
  }

  .toast__accent {
    flex: 0 0 0.5rem;
    width: 0.5rem;
    height: 0.5rem;
    margin-top: 0.35rem;
    border-radius: 50%;
    background: var(--color-accent);
  }

  .toast__content {
    flex: 1;
    min-width: 0;
  }

  .toast__title,
  .toast__message {
    margin: 0;
  }

  .toast__title {
    font-size: var(--text-sm);
    font-weight: var(--weight-semibold);
    line-height: var(--leading-tight);
  }

  .toast__message {
    margin-top: var(--space-1);
    color: var(--color-text-muted);
    font-size: var(--text-sm);
    line-height: var(--leading-normal);
    overflow-wrap: anywhere;
  }

  .toast__dismiss {
    display: grid;
    flex: 0 0 2rem;
    width: 2rem;
    height: 2rem;
    place-items: center;
    margin: -0.35rem -0.35rem 0 0;
    border: 0;
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--color-text-muted);
    font: inherit;
    font-size: var(--text-lg);
    line-height: 1;
    cursor: pointer;
  }

  .toast__dismiss:hover {
    background: var(--color-surface);
    color: var(--color-text);
  }

  .toast__dismiss:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  @keyframes toast-enter {
    from { opacity: 0; transform: translateY(-0.4rem); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (prefers-reduced-motion: reduce) {
    .toast { animation: none; }
  }
</style>