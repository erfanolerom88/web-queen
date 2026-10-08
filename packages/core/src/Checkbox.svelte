<script lang="ts">
  export let checked = false;
  export let label = '';
  export let disabled = false;
</script>

<label class="checkbox" class:checkbox--disabled={disabled}>
  <input
    type="checkbox"
    bind:checked
    {disabled}
    aria-checked={checked}
    class="checkbox__input"
  />
  <span class="checkbox__box" aria-hidden="true">
    {#if checked}<span class="checkbox__mark"></span>{/if}
  </span>
  <span class="checkbox__label">{label}</span>
</label>

<style>
  .checkbox {
    display: inline-flex;
    align-items: flex-start;
    gap: var(--space-3);
    width: fit-content;
    color: var(--color-text);
    cursor: pointer;
  }

  .checkbox--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .checkbox__input {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    clip-path: inset(50%);
  }

  .checkbox__box {
    display: grid;
    flex: 0 0 1.25rem;
    width: 1.25rem;
    height: 1.25rem;
    place-items: center;
    margin-top: 0.1rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    background: var(--color-surface-raised);
    transition: background 140ms ease, border-color 140ms ease, box-shadow 140ms ease;
  }

  .checkbox__input:checked + .checkbox__box {
    border-color: var(--color-accent);
    background: var(--color-accent);
  }

  .checkbox__input:focus-visible + .checkbox__box {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  .checkbox__input:disabled + .checkbox__box {
    background: var(--color-surface);
  }

  .checkbox__mark {
    width: 0.36rem;
    height: 0.65rem;
    margin-top: -0.1rem;
    border: solid var(--color-accent-fg);
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  .checkbox__label {
    font-size: var(--text-sm);
    line-height: var(--leading-normal);
  }

  @media (prefers-reduced-motion: reduce) {
    .checkbox__box { transition: none; }
  }
</style>