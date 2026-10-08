<script lang="ts">
  import { onDestroy, setContext } from 'svelte';

  type TooltipContext = {
    readonly open: boolean;
    readonly disabled: boolean;
    readonly id: string;
    readonly trigger: HTMLElement | null;
    readonly content: HTMLElement | null;
    show: () => void;
    hide: () => void;
    registerTrigger: (node: HTMLElement) => void;
    unregisterTrigger: () => void;
    registerContent: (node: HTMLElement) => void;
    unregisterContent: () => void;
  };

  export let open = false;
  export let delay = 200;
  export let disabled = false;

  let trigger: HTMLElement | null = null;
  let content: HTMLElement | null = null;
  let timer: ReturnType<typeof setTimeout> | undefined;

  const id = `tooltip-${Math.random().toString(36).slice(2, 10)}`;

  function clearTimer() {
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }
  }

  function show() {
    if (disabled) return;

    clearTimer();
    timer = setTimeout(() => {
      open = true;
    }, delay);
  }

  function hide() {
    clearTimer();
    open = false;
  }

  function registerTrigger(node: HTMLElement) {
    trigger = node;
  }

  function unregisterTrigger() {
    trigger = null;
  }

  function registerContent(node: HTMLElement) {
    content = node;
  }

  function unregisterContent() {
    content = null;
  }

  const tooltipContext = {
    get open() {
      return open;
    },
    get disabled() {
      return disabled;
    },
    get id() {
      return id;
    },
    get trigger() {
      return trigger;
    },
    get content() {
      return content;
    },
    show,
    hide,
    registerTrigger,
    unregisterTrigger,
    registerContent,
    unregisterContent
  } satisfies TooltipContext;

  setContext('tooltip', tooltipContext);

  onDestroy(() => {
    clearTimer();
  });
</script>

<div class="tooltip">
  <slot />
</div>

<style>
  .tooltip {
    position: relative;
    display: inline-flex;
    align-items: center;
  }
</style>
