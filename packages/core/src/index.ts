export { default as Button } from './Button.svelte';
export { default as Card } from './Card.svelte';
export { default as Checkbox } from './Checkbox.svelte';
export { default as Dropdown } from './Dropdown.svelte';
export { default as DropdownTrigger } from './DropdownTrigger.svelte';
export { default as DropdownItem } from './DropdownItem.svelte';
export { default as Input } from './Input.svelte';
export { default as Modal } from './Modal.svelte';
export { dropdownTransition, modalBackdropTransition, modalScaleTransition, motion, tooltipTransition } from './motion';
export { default as Select } from './Select.svelte';
export { default as Switch } from './Switch.svelte';
export { default as Tab } from './Tab.svelte';
export { default as TabList } from './TabList.svelte';
export { default as TabPanel } from './TabPanel.svelte';
export { default as Tabs } from './Tabs.svelte';
export { default as Textarea } from './Textarea.svelte';
export { default as Toast } from './Toast.svelte';
export { default as Tooltip } from './Tooltip.svelte';
export { default as TooltipContent } from './TooltipContent.svelte';
export { default as TooltipTrigger } from './TooltipTrigger.svelte';
export { clearToasts, dismissToast, showToast, toastStore } from './toast';
export type { ToastMessage, ToastOptions, ToastVariant } from './toast';
export { initializeTheme, setTheme, themeStore } from './theme';
export type { Theme } from './theme';
export { validateValues } from './validation';
export type { ValidationErrors, ValidationFormat, ValidationRule } from './validation';

export const corePackage = 'core';

export function makeGreeting(name: string) {
  return `Hello, ${name}!`;
}
