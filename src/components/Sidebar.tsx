import React from 'react';
import { Type, Scissors, FileText, BarChart3, Wand2, Sparkles, X } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpen,
  onClose,
}) => {
  const menuItems = [
    {
      id: 'converter',
      label: 'Case Converter',
      icon: Type,
      description: '12+ instant text variations',
      badge: 'Core',
      isAvailable: true,
    },
    {
      id: 'cleaner',
      label: 'Text Cleaner',
      icon: Scissors,
      description: 'Remove spaces, line breaks & symbols',
      badge: 'Active',
      isAvailable: true,
    },
    {
      id: 'lorem',
      label: 'Lorem Ipsum',
      icon: FileText,
      description: 'Graphic design placeholder copy',
      badge: 'Active',
      isAvailable: true,
    },
    {
      id: 'counter',
      label: 'Character Counter',
      icon: BarChart3,
      description: 'Deep readability & word analytics',
      badge: 'Coming Soon',
      isAvailable: false,
    },
    {
      id: 'formatter',
      label: 'Text Formatter',
      icon: Wand2,
      description: 'Unicode tracking & designer styles',
      badge: 'Coming Soon',
      isAvailable: false,
    },
  ];

  const handleSelect = (item: typeof menuItems[0]) => {
    if (item.isAvailable) {
      setActiveTab(item.id);
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 md:top-16 z-50 md:z-0 h-screen md:h-[calc(100vh-4rem)] w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 ease-in-out flex flex-col justify-between ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-4 space-y-6 overflow-y-auto">
          {/* Mobile Header in Drawer */}
          <div className="flex items-center justify-between md:hidden pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold text-sm">
                TL
              </div>
              <span className="font-display font-bold text-slate-900 dark:text-white">TextLab Navigation</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tools Menu Section */}
          <div>
            <h3 className="px-3 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              Design Utility Tools
            </h3>
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    disabled={!item.isAvailable}
                    className={`w-full text-left flex items-start gap-3 p-3 rounded-xl transition-all duration-150 relative group ${
                      isActive
                        ? 'bg-brand-50 dark:bg-brand-950/70 text-brand-700 dark:text-brand-300 font-medium border border-brand-200/80 dark:border-brand-800/80 shadow-sm'
                        : item.isAvailable
                        ? 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70'
                        : 'opacity-60 cursor-not-allowed text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg mt-0.5 ${
                        isActive
                          ? 'bg-brand-600 text-white shadow-sm'
                          : item.isAvailable
                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'
                          : 'bg-slate-100 dark:bg-slate-800/50 text-slate-400 dark:text-slate-600'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold truncate">{item.label}</span>
                        {item.badge && (
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                              isActive
                                ? 'bg-brand-200 text-brand-800 dark:bg-brand-900 dark:text-brand-200'
                                : item.isAvailable
                                ? 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                                : 'bg-slate-200/60 dark:bg-slate-800/40 text-slate-400 dark:text-slate-500'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom Designer Tip Box */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-indigo-900 to-slate-900 text-white shadow-lg relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-brand-500/20 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center gap-2 text-indigo-300 font-semibold text-xs mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Designer Pro Tip</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Use <code className="px-1 py-0.5 bg-indigo-950 rounded text-indigo-200 font-mono text-[10px]">Cmd + K</code> to instantly focus text input anytime!
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
