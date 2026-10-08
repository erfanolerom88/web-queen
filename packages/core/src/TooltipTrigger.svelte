<script lang="ts">
  import { getContext, onDestroy, onMount } from 'svelte';

  type TooltipContext = {
    readonly open: boolean;
    readonly id: string;
    readonly trigger: HTMLElement | null;
    show: () => void;
    hide: () => void;
    registerTrigger: (node: HTMLElement) => void;
    unregisterTrigger: () => void;
  };

  const tooltip = getContext<TooltipContext>('tooltip');

  if (!tooltip) {
    throw new Error('TooltipTrigger must be used inside Tooltip.');
  }

  let triggerNode: HTMLButtonElement;

  onMount(() => {
    tooltip.registerTrigger(triggerNode);
  });

  onDestroy(() => {
    if (tooltip.trigger === triggerNode) {
      tooltip.unregisterTrigger();
    }
  });
</script>

<button
  bind:this={triggerNode}
  type="button"
  class="tooltip-trigger"
  aria-describedby={tooltip.open ? tooltip.id : undefined}
  on:mouseenter={tooltip.show}
  on:mouseleave={tooltip.hide}
  on:focus={tooltip.show}
  on:blur={tooltip.hide}
>
  <slot />
</button>

<style>
  .tooltip-trigger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    background: var(--color-surface);
    color: var(--color-text);
    padding: var(--space-2) var(--space-3);
    font: inherit;
    cursor: pointer;
    transition: border-color 120ms ease, box-shadow 120ms ease;
  }

  .tooltip-trigger:hover {
    border-color: var(--color-primary);
  }

  .tooltip-trigger:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
</style>
