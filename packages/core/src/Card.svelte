<script lang="ts">
  export let title: string;
</script>

<div class="card">
  <h3 class="card__title">{title}</h3>
  <div class="card__body">
    <slot />
  </div>
</div>

<style>
  .card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-6);
    transition: border-color 140ms ease;
  }

  .card:hover {
    border-color: oklch(from var(--color-border) calc(l + 0.1) c h);
  }

  .card__title {
    font-size: var(--text-lg);
    font-weight: var(--weight-semibold);
    color: var(--color-text);
    margin: 0 0 var(--space-3) 0;
    line-height: var(--leading-tight);
  }

  .card__body {
    font-size: var(--text-sm);
    color: var(--color-text-muted);
    line-height: var(--leading-normal);
  }

  @media (prefers-reduced-motion: reduce) {
    .card { transition: none; }
  }
</style>
