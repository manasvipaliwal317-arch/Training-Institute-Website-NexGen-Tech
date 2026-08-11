'use client';

import { Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface ThemeToggleProps {
  variant?: 'compact' | 'pill' | 'banner';
}

export default function ThemeToggle({ variant = 'compact' }: ThemeToggleProps) {
  const { theme, toggleTheme, setThemeMode } = useTheme();

  if (variant === 'pill') {
    return (
      <div className="inline-flex items-center p-1 rounded-2xl bg-slate-900/90 light:bg-slate-200 border border-slate-700/80 light:border-slate-300 shadow-lg">
        <button
          onClick={() => setThemeMode('dark')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
            theme === 'dark'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Moon className="w-3.5 h-3.5" />
          <span>Dark Mode</span>
        </button>

        <button
          onClick={() => setThemeMode('light')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
            theme === 'light'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
              : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <Sun className="w-3.5 h-3.5" />
          <span>Light Mode</span>
        </button>
      </div>
    );
  }

  if (variant === 'banner') {
    return (
      <div className="glass-card rounded-2xl p-4 border border-blue-500/30 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">Appearance & Vision Mode</h4>
            <p className="text-xs text-slate-400">Switch seamlessly between dark glassmorphism and high-contrast light mode.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setThemeMode('dark')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              theme === 'dark'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400/40'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            <Moon className="w-4 h-4 text-purple-300" />
            <span>Dark Theme</span>
          </button>

          <button
            onClick={() => setThemeMode('light')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              theme === 'light'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30 border border-amber-400/40'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            <Sun className="w-4 h-4 text-amber-300" />
            <span>Light Theme</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`p-2.5 rounded-xl transition-all border shadow-sm flex items-center gap-2 font-bold text-xs ${
        theme === 'dark'
          ? 'bg-slate-900/90 text-amber-300 border-slate-700/80 hover:bg-slate-800'
          : 'bg-slate-100 text-indigo-600 border-slate-300 hover:bg-slate-200'
      }`}
      title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
      aria-label="Toggle Theme Mode"
    >
      {theme === 'dark' ? (
        <>
          <Sun className="w-4 h-4 text-amber-300" />
          <span className="hidden md:inline">Light</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 text-indigo-600" />
          <span className="hidden md:inline">Dark</span>
        </>
      )}
    </button>
  );
}
