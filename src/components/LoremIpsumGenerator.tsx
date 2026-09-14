import React, { useState } from 'react';
import { FileText, Copy, Check, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export const LoremIpsumGenerator: React.FC = () => {
  const [count, setCount] = useState<number>(3);
  const [type, setType] = useState<'paragraphs' | 'words' | 'sentences'>('paragraphs');
  const [copied, setCopied] = useState<boolean>(false);
  const [generatedText, setGeneratedText] = useState<string>('');

  const sampleParagraphs = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Curabitur pretium tiddunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.",
    "Modern brand identities require clean, intentional typography paired with crisp contrast. Every glyph conveys tone, emotion, and architectural direction across responsive visual media.",
    "Elevate your visual communication with harmonized type scales, structured layout grids, and accessible color ratios designed specifically for digital product environments."
  ];

  const generate = () => {
    let result = '';
    if (type === 'paragraphs') {
      const selected = [];
      for (let i = 0; i < count; i++) {
        selected.push(sampleParagraphs[i % sampleParagraphs.length]);
      }
      result = selected.join('\n\n');
    } else if (type === 'words') {
      const allWords = sampleParagraphs.join(' ').replace(/[^\w\s]/g, '').split(/\s+/);
      result = allWords.slice(0, Math.min(count, 500)).join(' ');
    } else if (type === 'sentences') {
      const allSentences = sampleParagraphs.join(' ').split(/(?<=[.!?])\s+/);
      result = allSentences.slice(0, Math.min(count, allSentences.length)).join(' ');
    }
    setGeneratedText(result);
  };

  // Generate initial on load
  React.useEffect(() => {
    generate();
  }, [count, type]);

  const handleCopy = () => {
    if (!generatedText) return;
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    try {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    } catch (e) {}
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              Lorem Ipsum Placeholder Generator
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Generate dummy copy for layout mockups, prototypes, and typography specs.
            </p>
          </div>

          <button
            onClick={generate}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Regenerate</span>
          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Generate:</span>
            <input
              type="number"
              min={1}
              max={50}
              value={count}
              onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-center text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            {(['paragraphs', 'sentences', 'words'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                  type === t
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <button
            onClick={handleCopy}
            className={`ml-auto flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              copied
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                : 'bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-500/20'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>✓ Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Lorem Ipsum</span>
              </>
            )}
          </button>
        </div>

        {/* Text output */}
        <div className="relative">
          <textarea
            readOnly
            value={generatedText}
            rows={8}
            className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-sm leading-relaxed font-sans"
          />
        </div>
      </div>
    </div>
  );
};
