<script lang="ts">
  import { useGsap } from '@web-queen/motion';
  import type { InputAnimation, InputSize, InputStatus, InputType, InputVariant } from './input.types';

  export let variant: InputVariant = 'default';
  export let size: InputSize = 'md';
  export let status: InputStatus = 'idle';
  export let label = '';
  export let hint = '';
  export let errorMessage = '';
  export let disabled = false;
  export let required = false;
  export let type: InputType = 'text';
  export let placeholder = '';
  export let value = '';
  export let animation: InputAnimation | undefined = undefined;
  export let fullWidth = false;

  /** Back-compat aliases so existing call sites keep working. */
  export let error = '';
  export let helperText = '';

  /** Stable id so the label and descriptions can point at the control. */
  const fieldId = `wq-input-${Math.random().toString(36).slice(2, 9)}`;
  const hintId = `${fieldId}-hint`;
  const errorId = `${fieldId}-error`;

  // `status="error"` or a legacy `error` string both drive the error affordance.
  $: hasError = status === 'error' || error.length > 0;
  // `errorMessage` is the documented prop; `error` remains supported.
  $: message = errorMessage || error;
  $: hintText = hint || helperText;
  $: showHint = Boolean(hintText) && !(hasError && message);
  $: describedBy =
    [showHint ? hintId : '', hasError && message ? errorId : ''].filter(Boolean).join(' ') ||
    undefined;

  // Motion presets keyed by name. Unknown names are a no-op, so a missing or
  // partial motion package never breaks the component.
  const motionPresets: Record<string, Record<string, number>> = {
    'fade-in': { opacity: 0, y: 0, duration: 0.35 },
    'slide-up': { opacity: 0, y: 10, duration: 0.4 },
    'scale-in': { opacity: 0, scale: 0.97, duration: 0.35 },
    'reveal-in': { opacity: 0, y: 14, duration: 0.5 }
  };

  $: motionConfig = animation ? motionPresets[animation] ?? {} : undefined;
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
    {#if hasError}
      <!-- Never rely on colour alone: an icon plus text carries the meaning. -->
      <svg class="field__icon field__icon--error" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <path
          d="M8 1.5 15 14H1L8 1.5Zm0 4.2a.85.85 0 0 0-.85.85v3.1a.85.85 0 0 0 1.7 0v-3.1A.85.85 0 0 0 8 5.7Zm0 6.05a.95.95 0 1 0 0 1.9.95.95 0 0 0 0-1.9Z"
          fill="currentColor"
        />
      </svg>
    {:else if status === 'success'}
      <svg class="field__icon field__icon--success" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <path
          d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Zm3.6 5.6-4.2 4.7a.9.9 0 0 1-1.32.02L4.4 8.5a.9.9 0 1 1 1.3-1.24l1.02 1.06 3.55-3.97A.9.9 0 0 1 11.6 5.6Z"
          fill="currentColor"
        />
      </svg>
    {/if}

    <input
      id={fieldId}
      class="field__input"
      {type}
      {placeholder}
      {disabled}
      {required}
      bind:value
      aria-invalid={hasError ? 'true' : undefined}
      aria-describedby={describedBy}
      use:useGsap={motionConfig}
    />
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
    width: min(100%, 360px);
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

  /* The wrapper owns the border and ring so the status icon sits inside the box. */
  .field__control {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    border: 1px solid var(--color-border);
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

  .field__control--filled {
    background: var(--color-surface);
    border-color: transparent;
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

  .field__input {
    flex: 1;
    min-width: 0;
    border: 0;
    background: transparent;
    color: var(--color-text);
    font: inherit;
    font-size: var(--text-sm);
    line-height: var(--leading-tight);
    padding: var(--space-2) 0;
  }

  .field__control--lg .field__input {
    font-size: var(--text-base);
  }

  /* The ring belongs to the wrapper, so suppress the native input outline. */
  .field__input:focus,
  .field__input:focus-visible {
    outline: none;
  }

  .field__input::placeholder {
    color: var(--color-text-muted);
    opacity: 1;
  }

  /* Hover */
  .field__control:hover:not(:focus-within) {
    border-color: var(--color-text-muted);
  }

  .field--disabled .field__control,
  .field__control:has(.field__input:disabled) {
    opacity: var(--opacity-disabled);
    cursor: not-allowed;
  }

  .field__input:disabled {
    cursor: not-allowed;
  }

  /* Focus ring — visible in both light and dark themes. */
  .field__control:focus-within {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px var(--focus-ring);
  }

  /* Error — border, ring and icon all shift to the danger token. */
  [data-status='error'] .field__control,
  .field__control:has(.field__input[aria-invalid='true']) {
    border-color: var(--color-danger);
  }

  [data-status='error'] .field__control:hover,
  .field__control:has(.field__input[aria-invalid='true']):hover {
    border-color: var(--color-danger-hover);
  }

  [data-status='error'] .field__control:focus-within,
  .field__control:has(.field__input[aria-invalid='true']):focus-within {
    border-color: var(--color-danger);
    box-shadow: 0 0 0 3px var(--focus-ring-danger);
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
    box-shadow: 0 0 0 3px var(--focus-ring-success);
  }

  .field__icon {
    flex: 0 0 auto;
    width: var(--icon-md);
    height: var(--icon-md);
  }

  .field__icon--error {
    color: var(--color-danger);
  }

  .field__icon--success {
    color: var(--color-success);
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

  /* Touch targets: raise the control to the 44px minimum hit area. */
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
