import React from 'react';
import { Space, CornerDownLeft, Wand2, Scissors, Copy, Check } from 'lucide-react';

interface QuickActionsProps {
  text: string;
  setText: (val: string) => void;
  onCopyAll: () => void;
  copiedAll: boolean;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  text,
  setText,
  onCopyAll,
  copiedAll,
}) => {
  const handleRemoveExtraSpaces = () => {
    setText(text.replace(/[ \t]+/g, ' ').trim());
  };

  const handleRemoveLineBreaks = () => {
    setText(text.replace(/[\r\n]+/g, ' ').replace(/[ \t]+/g, ' ').trim());
  };

  const handleTrimWhitespace = () => {
    const lines = text.split('\n').map((l) => l.trim());
    setText(lines.join('\n').trim());
  };

  const handleRemovePunctuation = () => {
    setText(text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?'"\[\]]/g, ''));
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
      <div className="flex flex-wrap items-center gap-1.5 text-xs font-medium">
        <button
          onClick={handleRemoveExtraSpaces}
          disabled={!text}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors disabled:opacity-50"
        >
          <Space className="w-3.5 h-3.5" />
          <span>Remove extra spaces</span>
        </button>

        <button
          onClick={handleRemoveLineBreaks}
          disabled={!text}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors disabled:opacity-50"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
          <span>Remove line breaks</span>
        </button>

        <button
          onClick={handleTrimWhitespace}
          disabled={!text}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors disabled:opacity-50"
        >
          <Wand2 className="w-3.5 h-3.5" />
          <span>Trim whitespace</span>
        </button>

        <button
          onClick={handleRemovePunctuation}
          disabled={!text}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors disabled:opacity-50"
        >
          <Scissors className="w-3.5 h-3.5" />
          <span>Remove punctuation</span>
        </button>
      </div>

      <button
        onClick={onCopyAll}
        disabled={!text}
        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all disabled:opacity-50 ${
          copiedAll
            ? 'bg-emerald-600 text-white'
            : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
        }`}
      >
        {copiedAll ? (
          <>
            <Check className="w-3.5 h-3.5" />
            <span>✓ Copied All</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>Copy All</span>
          </>
        )}
      </button>
    </div>
  );
};
