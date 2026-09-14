import React, { useState } from 'react';
import { Scissors, Copy, Check, Sparkles, Space, CornerDownLeft, FileCode, Hash } from 'lucide-react';
import confetti from 'canvas-confetti';

export const TextCleanerTool: React.FC = () => {
  const [cleanerText, setCleanerText] = useState<string>('  Sample   Text   with   EXTRA   spaces\n\nand   multiple   lines!!!   123   #hashtag  ');
  const [copied, setCopied] = useState<boolean>(false);

  const applyClean = (action: string) => {
    let result = cleanerText;
    switch (action) {
      case 'spaces':
        result = result.replace(/[ \t]+/g, ' ').trim();
        break;
      case 'lines':
        result = result.replace(/[\r\n]+/g, ' ').replace(/[ \t]+/g, ' ').trim();
        break;
      case 'trimLines':
        result = result.split('\n').map((l) => l.trim()).join('\n').trim();
        break;
      case 'numbers':
        result = result.replace(/[0-9]/g, '');
        break;
      case 'symbols':
        result = result.replace(/[^\w\s\u00C0-\u024F]/g, '');
        break;
      case 'html':
        result = result.replace(/<[^>]*>?/gm, '');
        break;
      default:
        break;
    }
    setCleanerText(result);
  };

  const handleCopy = () => {
    if (!cleanerText) return;
    navigator.clipboard.writeText(cleanerText);
    setCopied(true);
    try {
      confetti({ particleCount: 35, spread: 55, origin: { y: 0.7 } });
    } catch (e) {}
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Scissors className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              Advanced Text Cleaner
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Sanitize raw client copy by stripping junk whitespace, linebreaks, HTML tags, and unwanted symbols.
            </p>
          </div>

          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              copied
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                : 'bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-500/20'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>✓ Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Cleaned Text</span>
              </>
            )}
          </button>
        </div>

        {/* Cleaning Action Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <button
            onClick={() => applyClean('spaces')}
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-brand-50 hover:border-brand-300 dark:hover:bg-brand-950 border border-slate-200 dark:border-slate-700/80 text-left transition-colors"
          >
            <Space className="w-4 h-4 text-brand-600 dark:text-brand-400 mb-1" />
            <div className="text-xs font-bold text-slate-900 dark:text-white">Remove Extra Spaces</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Collapses multiple spaces to 1</p>
          </button>

          <button
            onClick={() => applyClean('lines')}
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-brand-50 hover:border-brand-300 dark:hover:bg-brand-950 border border-slate-200 dark:border-slate-700/80 text-left transition-colors"
          >
            <CornerDownLeft className="w-4 h-4 text-brand-600 dark:text-brand-400 mb-1" />
            <div className="text-xs font-bold text-slate-900 dark:text-white">Remove Line Breaks</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Flattens multi-line paragraphs</p>
          </button>

          <button
            onClick={() => applyClean('trimLines')}
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-brand-50 hover:border-brand-300 dark:hover:bg-brand-950 border border-slate-200 dark:border-slate-700/80 text-left transition-colors"
          >
            <Sparkles className="w-4 h-4 text-brand-600 dark:text-brand-400 mb-1" />
            <div className="text-xs font-bold text-slate-900 dark:text-white">Trim Line Whitespace</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Trims line starts & ends</p>
          </button>

          <button
            onClick={() => applyClean('symbols')}
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-brand-50 hover:border-brand-300 dark:hover:bg-brand-950 border border-slate-200 dark:border-slate-700/80 text-left transition-colors"
          >
            <Scissors className="w-4 h-4 text-brand-600 dark:text-brand-400 mb-1" />
            <div className="text-xs font-bold text-slate-900 dark:text-white">Strip Symbols</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Removes special characters</p>
          </button>

          <button
            onClick={() => applyClean('numbers')}
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-brand-50 hover:border-brand-300 dark:hover:bg-brand-950 border border-slate-200 dark:border-slate-700/80 text-left transition-colors"
          >
            <Hash className="w-4 h-4 text-brand-600 dark:text-brand-400 mb-1" />
            <div className="text-xs font-bold text-slate-900 dark:text-white">Strip Numbers</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Removes digits 0-9</p>
          </button>

          <button
            onClick={() => applyClean('html')}
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-brand-50 hover:border-brand-300 dark:hover:bg-brand-950 border border-slate-200 dark:border-slate-700/80 text-left transition-colors"
          >
            <FileCode className="w-4 h-4 text-brand-600 dark:text-brand-400 mb-1" />
            <div className="text-xs font-bold text-slate-900 dark:text-white">Strip HTML Tags</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Removes &lt;p&gt;, &lt;div&gt;, etc.</p>
          </button>
        </div>

        {/* Text Input / Output workspace */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
            <span>Cleaner Output Workspace</span>
            <button
              onClick={() => setCleanerText('')}
              className="text-rose-600 dark:text-rose-400 hover:underline text-[11px]"
            >
              Clear Workspace
            </button>
          </div>
          <textarea
            value={cleanerText}
            onChange={(e) => setCleanerText(e.target.value)}
            rows={7}
            className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 text-sm leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
};
