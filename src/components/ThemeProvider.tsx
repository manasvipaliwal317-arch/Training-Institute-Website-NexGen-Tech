'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setThemeMode: (mode: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  const applyThemeClasses = (targetTheme: Theme) => {
    const root = document.documentElement;
    const body = document.body;

    if (targetTheme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
      body?.classList.remove('dark');
      body?.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
      body?.classList.remove('light');
      body?.classList.add('dark');
    }
  };

  useEffect(() => {
    setMounted(true);
    const storedTheme = (localStorage.getItem('theme') as Theme | null) || 'dark';
    setTheme(storedTheme);
    applyThemeClasses(storedTheme);
  }, []);

  const setThemeMode = (mode: Theme) => {
    setTheme(mode);
    localStorage.setItem('theme', mode);
    applyThemeClasses(mode);
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setThemeMode(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setThemeMode }}>
      <div className={`min-h-screen transition-colors duration-300 ${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
}
