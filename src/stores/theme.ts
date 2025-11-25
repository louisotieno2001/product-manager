// src/stores/theme.ts
import { defineStore } from 'pinia';

export type Theme = 'light' | 'dark';
const THEME_KEY = 'product-manager-theme';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: 'dark' as Theme,
  }),
  actions: {
    // This action will be called when the app initializes
    initialize() {
      const savedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
      const initialTheme = savedTheme || 'dark'; // Default to dark
      this.setTheme(initialTheme);
    },

    // This action sets the theme
    setTheme(theme: Theme) {
      // Apply the theme class to the <html> element
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(theme);

      // Save preference to localStorage
      localStorage.setItem(THEME_KEY, theme);

      // Update the store's state
      this.theme = theme;
    },

    // This action toggles the theme
    toggleTheme() {
      const newTheme = this.theme === 'light' ? 'dark' : 'light';
      this.setTheme(newTheme);
    },
  },
});