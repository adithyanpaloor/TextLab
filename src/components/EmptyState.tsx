import React from 'react';
import { Sparkles } from 'lucide-react';
import { SAMPLE_PRESETS } from '../utils/textConverter';

interface EmptyStateProps {
  onSelectPreset: (text: string) => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onSelectPreset }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center space-y-4 transition-colors">
      <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
        <Sparkles className="w-6 h-6" />
      </div>

      <div className="space-y-1">
        <h2 className="font-bold text-xl text-slate-900 dark:text-white">
          Start creating
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          Paste or type your text above to generate instant variations.
        </p>
      </div>

      <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
        {SAMPLE_PRESETS.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => onSelectPreset(preset)}
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors"
          >
            {preset}
          </button>
        ))}
      </div>
    </div>
  );
};
