import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Search, 
  X, 
  Building2, 
  GraduationCap, 
  BookOpen, 
  Calculator, 
  Calendar, 
  Home, 
  ArrowRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { UNIVERSITIES, SPECIALTIES, ARTICLES } from '../data/mockData';
import { University } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectUniversity: (u: University) => void;
  onNavigateTab: (tabId: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectUniversity,
  onNavigateTab
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Handle Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const quickTools = useMemo(() => [
    { id: 'podbor', label: 'Умный подбор вуза по 5 критериям', icon: Sparkles, category: 'Сервис' },
    { id: 'calculator', label: 'Калькулятор баллов ЕГЭ', icon: Calculator, category: 'Сервис' },
    { id: 'calculator_pay', label: 'Платное обучение и госкредит 3%', icon: Calculator, category: 'Сервис' },
    { id: 'calendar', label: 'Календарь абитуриента 2026', icon: Calendar, category: 'Сервис' },
    { id: 'dorms', label: 'Инспектор и калькулятор общежитий', icon: Home, category: 'Сервис' },
    { id: 'topspec', label: 'Топ направлений подготовки РФ', icon: TrendingUp, category: 'Сервис' }
  ], []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return quickTools.map((t) => ({
        type: 'tool' as const,
        id: t.id,
        title: t.label,
        subtitle: t.category,
        icon: t.icon,
        data: t
      }));
    }

    const items: Array<{
      type: 'university' | 'specialty' | 'article' | 'tool';
      id: string;
      title: string;
      subtitle: string;
      icon: any;
      data: any;
    }> = [];

    // Universities
    UNIVERSITIES.forEach((u) => {
      if (
        u.name.toLowerCase().includes(q) ||
        u.fullName.toLowerCase().includes(q) ||
        u.region.toLowerCase().includes(q)
      ) {
        items.push({
          type: 'university',
          id: u.id,
          title: u.name,
          subtitle: `${u.fullName} (${u.region})`,
          icon: Building2,
          data: u
        });
      }
    });

    // Specialties
    SPECIALTIES.forEach((s) => {
      if (s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q)) {
        items.push({
          type: 'specialty',
          id: s.code,
          title: `${s.code} ${s.name}`,
          subtitle: `${s.category} • ср. зарплата ~${s.avgSalary.toLocaleString('ru-RU')} ₽`,
          icon: GraduationCap,
          data: s
        });
      }
    });

    // Articles
    ARTICLES.forEach((a) => {
      if (a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q)) {
        items.push({
          type: 'article',
          id: a.id,
          title: a.title,
          subtitle: `${a.category} • ${a.readTime}`,
          icon: BookOpen,
          data: a
        });
      }
    });

    // Quick tools
    quickTools.forEach((t) => {
      if (t.label.toLowerCase().includes(q)) {
        items.push({
          type: 'tool',
          id: t.id,
          title: t.label,
          subtitle: t.category,
          icon: t.icon,
          data: t
        });
      }
    });

    return items.slice(0, 8);
  }, [query, quickTools]);

  const handleSelect = (index: number) => {
    const item = results[index];
    if (!item) return;

    if (item.type === 'university') {
      onSelectUniversity(item.data);
    } else if (item.type === 'tool') {
      onNavigateTab(item.id);
    } else if (item.type === 'specialty') {
      onNavigateTab('specialties');
    } else if (item.type === 'article') {
      onNavigateTab('articles');
    }
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (results.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + (results.length || 1)) % (results.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSelect(selectedIndex);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-sm animate-fade-in pt-16 sm:pt-24"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Bar Input */}
        <div className="relative p-4 sm:p-5 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            placeholder="Быстрый поиск вуза, специальности (09.03.04), инструмента или статьи..."
            className="w-full bg-transparent text-sm sm:text-base font-semibold text-slate-900 focus:outline-none placeholder:text-slate-400"
            aria-label="Глобальный поиск"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
              title="Очистить"
              aria-label="Очистить поиск"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-1 text-[10px] font-bold text-slate-500 bg-slate-200 rounded-md border border-slate-300">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 sm:p-3 space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1 block">
            {query.trim() ? `Найдено результатов (${results.length}):` : 'Популярные разделы и инструменты:'}
          </span>

          {results.length > 0 ? (
            results.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = selectedIndex === idx;

              return (
                <div
                  key={`${item.type}-${item.id}-${idx}`}
                  onClick={() => handleSelect(idx)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 rounded-2xl flex items-center justify-between gap-3 cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-blue-600'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-xs sm:text-sm font-bold truncate">
                        {item.title}
                      </div>
                      <div className={`text-[11px] truncate ${
                        isSelected ? 'text-blue-100' : 'text-slate-500'
                      }`}>
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${
                    isSelected ? 'translate-x-1 text-white' : 'text-slate-300'
                  }`} />
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-slate-500 text-xs">
              По запросу «{query}» ничего не найдено. Попробуйте ввести другое название или код специальности.
            </div>
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="p-3 bg-slate-50 text-slate-500 text-[11px] flex items-center justify-between px-5 font-medium">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px] font-bold">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px] font-bold">↓</kbd>
              навигация
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px] font-bold">Enter</kbd>
              выбрать
            </span>
          </div>
          <span className="text-blue-600 font-bold">Табитуриент 2026</span>
        </div>

      </div>
    </div>
  );
};
