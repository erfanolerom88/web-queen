<script lang="ts">
  import type { SelectOption, SelectSize, SelectStatus, SelectVariant } from './select.types';

  export let value = '';
  export let label = '';
  export let options: SelectOption[] = [];
  export let placeholder = 'Select an option';
  export let disabled = false;
  export let required = false;
  export let size: SelectSize = 'md';
  export let variant: SelectVariant = 'default';
  export let status: SelectStatus = 'idle';
  export let hint = '';
  export let errorMessage = '';
  export let fullWidth = false;

  /** Back-compat aliases so existing call sites keep working. */
  export let error = '';
  export let helperText = '';
  export let name = '';

  /** Stable id so the label and descriptions can point at the control. */
  const fieldId = `wq-select-${Math.random().toString(36).slice(2, 9)}`;
  const hintId = `${fieldId}-hint`;
  const errorId = `${fieldId}-error`;

  // `status="error"` or a legacy `error` string both drive the error affordance.
  $: hasError = status === 'error' || error.length > 0;
  $: message = errorMessage || error;
  $: hintText = hint || helperText;
  $: showHint = Boolean(hintText) && !(hasError && message);
  $: describedBy =
    [showHint ? hintId : '', hasError && message ? errorId : ''].filter(Boolean).join(' ') ||
    undefined;

  /** Copy of the options so the native fallback never re-renders the bound array. */
  $: selectOptions = options;
</script>

<div
  class="field"
  class:field--full={fullWidth}
  class:field--disabled={disabled}
  data-status={status}
  data-variant={variant}
>
  {#if label}
    <label class="field__label field__label--{size}" for={fieldId}>
      {label}
      {#if required}<span class="field__required" aria-hidden="true">*</span>{/if}
    </label>
  {/if}

  <div class="field__control field__control--{variant} field__control--{size}">
    <!-- Native select: full keyboard support comes from the platform, and the
         popup lists every option (which is why the listbox is ARIA 1.1 safe). -->
    <select
      id={fieldId}
      {name}
      {disabled}
      {required}
      bind:value
      class="field__select"
      aria-invalid={hasError ? 'true' : undefined}
      aria-describedby={describedBy}
    >
      {#if placeholder}
        <option value="" disabled={required || value !== ''}>{placeholder}</option>
      {/if}

      {#each selectOptions as option}
        <option value={option.value} disabled={option.disabled ?? false}>{option.label}</option>
      {/each}
    </select>

    <svg class="field__caret" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path
        d="M4.2 6.2a.9.9 0 0 1 1.27 0L8 8.72l2.53-2.52a.9.9 0 1 1 1.27 1.27l-3.16 3.16a.9.9 0 0 1-1.28 0L4.2 7.47a.9.9 0 0 1 0-1.27Z"
        fill="currentColor"
      />
    </svg>
  </div>

  {#if hasError && message}
    <p class="field__message field__message--error" id={errorId} role="alert">
      <span class="field__message-text">{message}</span>
    </p>
  {:else if showHint}
    <p class="field__message field__message--hint" id={hintId}>{hintText}</p>
  {/if}
</div>

<style>
  .field {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    width: min(100%, var(--field-max));
  }

  .field--full {
    width: 100%;
  }

  .field__label {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    color: var(--color-text);
    font-weight: var(--weight-medium);
    line-height: var(--leading-tight);
  }

  .field__label--sm,
  .field__label--md {
    font-size: var(--text-sm);
  }

  .field__label--lg {
    font-size: var(--text-base);
  }

  .field__required {
    color: var(--color-danger);
  }

  /* The wrapper owns border, radius and ring so the caret sits inside the box. */
  .field__control {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-md);
    transition:
      border-color var(--motion-duration-enter) var(--motion-easing-standard),
      background-color var(--motion-duration-enter) var(--motion-easing-standard),
      box-shadow var(--motion-duration-enter) var(--motion-easing-standard);
  }

  /* Variants */
  .field__control--default {
    background: var(--color-surface-raised);
  }

  .field__control--outline {
    background: transparent;
    border-color: var(--color-accent);
  }

  .field__control--ghost {
    background: transparent;
    border-color: transparent;
    border-bottom-color: var(--color-border);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  /* Sizes → token-driven heights */
  .field__control--sm {
    min-height: var(--control-h-sm);
    padding-inline: var(--space-3);
  }

  .field__control--md {
    min-height: var(--control-h-md);
    padding-inline: var(--space-3);
  }

  .field__control--lg {
    min-height: var(--control-h-lg);
    padding-inline: var(--space-4);
  }

  .field__select {
    flex: 1;
    min-width: 0;
    width: 100%;
    appearance: none;
    border: 0;
    background: transparent;
    color: var(--color-text);
    font: inherit;
    font-size: var(--text-sm);
    line-height: var(--leading-tight);
    padding: var(--space-2) 0;
    padding-right: var(--space-6);
    cursor: pointer;
  }

  .field__control--lg .field__select {
    font-size: var(--text-base);
  }

  /* The ring belongs to the wrapper, so suppress the native outline. */
  .field__select:focus,
  .field__select:focus-visible {
    outline: none;
  }

  .field__select:disabled {
    cursor: not-allowed;
  }

  .field--disabled .field__control,
  .field__control:has(.field__select:disabled) {
    opacity: var(--opacity-disabled);
    cursor: not-allowed;
  }

  /* Hover */
  .field__control:hover:not(:focus-within) {
    border-color: var(--color-text-muted);
  }

  /* Focus ring — visible in both light and dark themes. */
  .field__control:focus-within {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 var(--focus-ring-width) var(--focus-ring);
  }

  /* Error — border, ring and caret all shift to the danger token. */
  [data-status='error'] .field__control,
  .field__control:has(.field__select[aria-invalid='true']) {
    border-color: var(--color-danger);
  }

  [data-status='error'] .field__control:hover,
  .field__control:has(.field__select[aria-invalid='true']):hover {
    border-color: var(--color-danger-hover);
  }

  [data-status='error'] .field__control:focus-within,
  .field__control:has(.field__select[aria-invalid='true']):focus-within {
    border-color: var(--color-danger);
    box-shadow: 0 0 0 var(--focus-ring-width) var(--focus-ring-danger);
  }

  /* Success */
  [data-status='success'] .field__control {
    border-color: var(--color-success);
  }

  [data-status='success'] .field__control:hover {
    border-color: var(--color-success);
  }

  [data-status='success'] .field__control:focus-within {
    border-color: var(--color-success);
    box-shadow: 0 0 0 var(--focus-ring-width) var(--focus-ring-success);
  }

  .field__caret {
    position: absolute;
    right: var(--space-3);
    top: 50%;
    width: var(--icon-md);
    height: var(--icon-md);
    transform: translateY(-50%);
    color: var(--color-text-muted);
    pointer-events: none;
  }

  .field__control--lg .field__caret {
    right: var(--space-4);
  }

  .field__message {
    display: flex;
    align-items: flex-start;
    gap: var(--space-1);
    margin: 0;
    font-size: var(--text-sm);
    line-height: var(--leading-normal);
  }

  .field__message--hint {
    color: var(--color-text-muted);
  }

  .field__message--error {
    color: var(--color-danger);
  }

  .field__message-text {
    min-width: 0;
  }

  /* Touch targets: raise the control to the token minimum hit area. */
  @media (pointer: coarse) {
    .field__control {
      min-height: var(--target-min);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .field__control {
      transition: none;
    }
  }
</style>