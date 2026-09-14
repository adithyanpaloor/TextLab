import React from 'react';
import { Trash2, Sparkles, X } from 'lucide-react';
import { SAMPLE_PRESETS } from '../utils/textConverter';

interface TextInputProps {
  text: string;
  setText: (val: string) => void;
  stats: { characters: number; words: number };
  onClear: () => void;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
}

export const TextInput: React.FC<TextInputProps> = ({
  text,
  setText,
  stats,
  onClear,
  inputRef,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-3 transition-colors shadow-sm">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-900 dark:text-white">
          Enter your text
        </label>
        {text && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        )}
      </div>

      <div className="relative">
        <textarea
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here..."
          rows={4}
          className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-indigo-500 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 text-base leading-relaxed transition-all resize-y min-h-[120px] font-sans"
        />
        {text && (
          <button
            onClick={onClear}
            className="absolute top-3 right-3 p-1 rounded-lg bg-slate-200/80 dark:bg-slate-800 text-slate-500 hover:text-rose-500"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="font-semibold text-slate-400 flex items-center gap-1 shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            Try sample:
          </span>
          {SAMPLE_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => setText(preset)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950 text-slate-600 dark:text-slate-300 font-medium transition-colors shrink-0"
            >
              {preset.split(' ')[0]}...
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 font-medium shrink-0 self-end sm:self-auto">
          <span>
            <strong className="text-slate-900 dark:text-white font-semibold">{stats.characters}</strong> characters
          </span>
          <span>•</span>
          <span>
            <strong className="text-slate-900 dark:text-white font-semibold">{stats.words}</strong> words
          </span>
        </div>
      </div>
    </div>
  );
};
