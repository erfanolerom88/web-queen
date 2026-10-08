import { writable } from 'svelte/store';

export type ToastMessage = {
  id: number;
  title: string;
  message: string;
  variant: ToastVariant;
};

export type ToastVariant = 'info' | 'success' | 'warning';

export type ToastOptions = {
  title?: string;
  duration?: number;
  variant?: ToastVariant;
};

export const toastStore = writable<ToastMessage[]>([]);

let nextToastId = 0;
const timeoutIds = new Map<number, ReturnType<typeof setTimeout>>();

export function showToast(message: string, options: ToastOptions = {}) {
  const id = ++nextToastId;
  const toast = {
    id,
    title: options.title ?? 'Notification',
    message,
    variant: options.variant ?? 'info'
  };

  toastStore.update((toasts) => [...toasts, toast]);

  if ((options.duration ?? 4500) > 0) {
    const timeoutId = setTimeout(() => dismissToast(id), options.duration ?? 4500);
    timeoutIds.set(id, timeoutId);
  }

  return id;
}

export function dismissToast(id: number) {
  const timeoutId = timeoutIds.get(id);
  if (timeoutId) clearTimeout(timeoutId);
  timeoutIds.delete(id);
  toastStore.update((toasts) => toasts.filter((toast) => toast.id !== id));
}

export function clearToasts() {
  for (const timeoutId of timeoutIds.values()) clearTimeout(timeoutId);
  timeoutIds.clear();
  toastStore.set([]);
}