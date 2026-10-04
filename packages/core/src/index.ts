export { default as Button } from './Button.svelte';
export { default as Card } from './Card.svelte';
export { default as Input } from './Input.svelte';
export { default as Select } from './Select.svelte';
export { default as Textarea } from './Textarea.svelte';
export { default as Toast } from './Toast.svelte';
export { clearToasts, dismissToast, showToast, toastStore } from './toast';
export type { ToastMessage, ToastOptions } from './toast';

export const corePackage = 'core';

export function makeGreeting(name: string) {
  return `Hello, ${name}!`;
}
