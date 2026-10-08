<script lang="ts">
  export let value = '';
  export let label = '';
  export let type: 'text' | 'email' | 'password' | 'search' | 'url' = 'text';
  export let placeholder = '';
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

  <input
    {type}
    {name}
    {placeholder}
    {disabled}
    bind:value
    class:error={Boolean(error)}
    class="field__input"
  />

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

  .field__input {
    width: 100%;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface-raised);
    color: var(--color-text);
    font: inherit;
    font-size: var(--text-base);
    padding: 0.8rem 0.9rem;
    transition: border-color 140ms ease, box-shadow 140ms ease;
  }

  .field__input::placeholder {
    color: var(--color-text-muted);
  }

  .field__input:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px oklch(from var(--color-accent) l c h / 0.18);
  }

  .field__input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .field__input.error {
    border-color: var(--color-danger);
    box-shadow: 0 0 0 3px color-mix(in oklch, var(--color-danger) 18%, transparent);
  }

  .field__message {
    font-size: var(--text-sm);
    color: var(--color-text-muted);
    line-height: var(--leading-normal);
  }

  .field__message--error {
    color: var(--color-danger);
  }
</style>
