import React from 'react';
import { Sun, Moon, Settings } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  onOpenSettings?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode, onOpenSettings }) => {
  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-20 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
            TL
          </div>
          <div>
            <h1 className="font-bold text-lg text-slate-900 dark:text-white tracking-tight leading-tight">
              TextLab
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Text tools for designers
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Light / Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Settings Icon */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
            title="Settings & Shortcuts"
            aria-label="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
