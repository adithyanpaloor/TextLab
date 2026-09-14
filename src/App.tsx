import { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { TextInput } from './components/TextInput';
import { QuickActions } from './components/QuickActions';
import { VariationCard } from './components/VariationCard';
import { EmptyState } from './components/EmptyState';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';
import { computeTextStats, variations } from './utils/textConverter';

export function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('textlab_theme');
    if (saved !== null) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [inputText, setInputText] = useState<string>('');
  const [copiedAll, setCopiedAll] = useState<boolean>(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState<boolean>(false);

  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('textlab_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('textlab_theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        if (inputText) {
          e.preventDefault();
          handleCopyAll();
        }
      }
      if (e.key === 'Escape') {
        if (isShortcutsOpen) {
          setIsShortcutsOpen(false);
        } else if (inputText) {
          setInputText('');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputText, isShortcutsOpen]);

  const stats = computeTextStats(inputText);

  const handleCopyAll = () => {
    if (!inputText) return;
    const allText = variations
      .map((v) => `--- ${v.name} ---\n${v.convert(inputText)}`)
      .join('\n\n');
    navigator.clipboard.writeText(allText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 1800);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Header */}
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenSettings={() => setIsShortcutsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 sm:py-8 space-y-6">
        {/* Large Text Area */}
        <TextInput
          text={inputText}
          setText={setInputText}
          stats={stats}
          onClear={() => setInputText('')}
          inputRef={inputRef}
        />

        {/* Quick Modifier Actions */}
        {inputText && (
          <QuickActions
            text={inputText}
            setText={setInputText}
            onCopyAll={handleCopyAll}
            copiedAll={copiedAll}
          />
        )}

        {/* Variations Grid or Empty State */}
        {inputText ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {variations.map((variation) => (
              <VariationCard
                key={variation.id}
                variation={variation}
                inputText={inputText}
              />
            ))}
          </div>
        ) : (
          <EmptyState onSelectPreset={(presetText) => setInputText(presetText)} />
        )}
      </main>

      {/* Keyboard Shortcuts Modal */}
      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />
    </div>
  );
}

export default App;
