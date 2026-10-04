<script lang="ts">
  type SelectOption = {
    value: string;
    label: string;
  };

  export let value = '';
  export let label = '';
  export let options: SelectOption[] = [];
  export let placeholder = 'Select an option';
  export let disabled = false;
  export let error = '';
  export let helperText = '';
  export let name = '';
  export let fullWidth = false;
</script>

<label class="field" class:field--full={fullWidth}>
  {#if label}
    <span class="field__label">{label}</span>
  {/if}

  <div class="field__select-wrap">
    <select
      {name}
      {disabled}
      bind:value
      class:error={Boolean(error)}
      aria-invalid={Boolean(error)}
      class="field__select"
    >
      {#if placeholder}
        <option value="" disabled={value !== ''}>{placeholder}</option>
      {/if}

      {#each options as option}
        <option value={option.value}>{option.label}</option>
      {/each}
    </select>

    <span class="field__caret" aria-hidden="true">▾</span>
  </div>

  {#if error}
    <span class="field__message field__message--error">{error}</span>
  {:else if helperText}
    <span class="field__message">{helperText}</span>
  {/if}
</label>

<style>
  .field {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    width: min(100%, 360px);
  }

  .field--full {
    width: 100%;
  }

  .field__label {
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
    color: var(--color-text);
  }

  .field__select-wrap {
    position: relative;
    width: 100%;
  }

  .field__select {
    width: 100%;
    appearance: none;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface-raised);
    color: var(--color-text);
    font: inherit;
    font-size: var(--text-base);
    padding: 0.8rem 2.75rem 0.8rem 0.9rem;
    transition: border-color 140ms ease, box-shadow 140ms ease;
    cursor: pointer;
  }

  .field__select:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px oklch(from var(--color-accent) l c h / 0.18);
  }

  .field__select:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .field__select.error {
    border-color: oklch(62% 0.18 20);
    box-shadow: 0 0 0 3px oklch(62% 0.18 20 / 0.12);
  }

  .field__caret {
    position: absolute;
    right: 0.9rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-text-muted);
    pointer-events: none;
    font-size: 0.9rem;
  }

  .field__message {
    font-size: var(--text-sm);
    color: var(--color-text-muted);
    line-height: var(--leading-normal);
  }

  .field__message--error {
    color: oklch(62% 0.18 20);
  }
</style>