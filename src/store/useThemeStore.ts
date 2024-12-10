import { create } from 'zustand';
import { storage } from '../lib/storage';

interface ThemeStore {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: storage.get<'light' | 'dark'>('theme', 'light'),
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      storage.set('theme', newTheme);
      return { theme: newTheme };
    }),
}));