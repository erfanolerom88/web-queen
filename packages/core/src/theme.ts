import { writable } from 'svelte/store';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'web-queen-theme';
const DEFAULT_THEME: Theme = 'dark';

export const themeStore = writable<Theme>(DEFAULT_THEME);

function applyTheme(theme: Theme) {
  if (typeof document !== 'undefined') {
    document.documentElement.dataset.theme = theme;
  }
  themeStore.set(theme);
}

export function setTheme(theme: Theme) {
  applyTheme(theme);

  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // The theme still applies when storage is unavailable.
    }
  }
}

export function initializeTheme(): Theme {
  let theme: Theme = DEFAULT_THEME;

  if (typeof window !== 'undefined') {
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEY);
      if (savedTheme === 'light' || savedTheme === 'dark') {
        theme = savedTheme;
      } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        theme = 'light';
      }
    } catch {
      theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : DEFAULT_THEME;
    }
  }

  applyTheme(theme);
  return theme;
}