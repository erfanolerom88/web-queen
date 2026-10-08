<script lang="ts">
  import { getContext, onDestroy, onMount } from 'svelte';
  import { tooltipTransition } from './motion';

  type TooltipContext = {
    readonly open: boolean;
    readonly id: string;
    readonly content: HTMLElement | null;
    registerContent: (node: HTMLElement) => void;
    unregisterContent: () => void;
  };

  const tooltip = getContext<TooltipContext>('tooltip');

  if (!tooltip) {
    throw new Error('TooltipContent must be used inside Tooltip.');
  }

  let contentNode: HTMLDivElement;

  onMount(() => {
    tooltip.registerContent(contentNode);
  });

  onDestroy(() => {
    if (tooltip.content === contentNode) {
      tooltip.unregisterContent();
    }
  });
</script>

{#if tooltip.open}
  <div
    bind:this={contentNode}
    id={tooltip.id}
    class="tooltip-content"
    role="tooltip"
    aria-live="polite"
    transition:tooltipTransition
  >
    <slot />
  </div>
{/if}

<style>
  .tooltip-content {
    position: absolute;
    left: 50%;
    bottom: calc(100% + var(--space-2));
    transform: translateX(-50%);
    z-index: 1200;
    max-width: 18rem;
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    background: var(--color-surface-raised);
    color: var(--color-text);
    box-shadow: var(--shadow-sm);
    font-size: var(--text-sm);
    line-height: var(--leading-normal);
    white-space: normal;
  }
</style>
