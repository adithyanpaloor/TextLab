import React from 'react';
import { X, Command, Keyboard, CornerDownLeft, Trash2 } from 'lucide-react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const shortcuts = [
    {
      keys: ['Ctrl/Cmd', 'Enter'],
      description: 'Copy all variations to clipboard',
      icon: CornerDownLeft,
    },
    {
      keys: ['Ctrl/Cmd', 'K'],
      description: 'Focus input textarea',
      icon: Command,
    },
    {
      keys: ['Escape'],
      description: 'Clear input field text',
      icon: Trash2,
    },
    {
      keys: ['?'],
      description: 'Toggle Keyboard Shortcuts modal',
      icon: Keyboard,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-md p-6 space-y-6 animate-fade-in relative">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                Keyboard Shortcuts
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Speed up your workflow with hotkeys
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {shortcuts.map((sc, idx) => {
            const Icon = sc.icon;
            return (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800"
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {sc.description}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {sc.keys.map((k, kIdx) => (
                    <kbd
                      key={kIdx}
                      className="px-2 py-1 text-xs font-mono font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md text-slate-800 dark:text-slate-200 shadow-sm"
                    >
                      {k}
                    </kbd>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-2 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold text-xs transition-colors hover:bg-slate-800 dark:hover:bg-slate-100"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
