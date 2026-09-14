import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import type { TextVariation } from '../utils/textConverter';

interface VariationCardProps {
  variation: TextVariation;
  inputText: string;
}

export const VariationCard: React.FC<VariationCardProps> = ({ variation, inputText }) => {
  const [copied, setCopied] = useState(false);

  const convertedText = inputText ? variation.convert(inputText) : variation.example;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(convertedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div
      className={`bg-white dark:bg-slate-900 rounded-2xl border p-4 sm:p-5 flex flex-col justify-between gap-3 transition-all ${
        copied
          ? 'border-emerald-500 ring-2 ring-emerald-500/20'
          : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-800'
      }`}
    >
      {/* Header & Copy Button */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white tracking-tight">
            {variation.name}
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
            {variation.description}
          </p>
        </div>

        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
            copied
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>✓ Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Converted Output Text */}
      <div className="bg-slate-50/80 dark:bg-slate-950/80 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/80">
        <pre
          className={`whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-900 dark:text-slate-100 ${
            variation.isMonospace ? 'font-mono text-xs' : 'font-sans'
          }`}
        >
          {convertedText}
        </pre>
      </div>
    </div>
  );
};
