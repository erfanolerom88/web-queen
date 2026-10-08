<script lang="ts">
  export let value = '';
  export let label = '';
  export let placeholder = '';
  export let disabled = false;
  export let error = '';
  export let helperText = '';
  export let name = '';
  export let rows = 4;
  export let fullWidth = false;
</script>

<label class="field" class:field--full={fullWidth}>
  {#if label}
    <span class="field__label">{label}</span>
  {/if}

  <textarea
    {name}
    {placeholder}
    {disabled}
    {rows}
    bind:value
    class:error={Boolean(error)}
    aria-invalid={Boolean(error)}
    class="field__textarea"
  ></textarea>

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

  .field__textarea {
    display: block;
    width: 100%;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface-raised);
    color: var(--color-text);
    font: inherit;
    font-size: var(--text-base);
    line-height: var(--leading-normal);
    padding: 0.8rem 0.9rem;
    resize: vertical;
    transition: border-color 140ms ease, box-shadow 140ms ease;
  }

  .field__textarea::placeholder {
    color: var(--color-text-muted);
  }

  .field__textarea:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px oklch(from var(--color-accent) l c h / 0.18);
  }

  .field__textarea:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .field__textarea.error {
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