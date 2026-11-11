import React, { useState } from 'react';
import { 
  Building2, 
  Calculator, 
  MessageSquareText, 
  Trophy, 
  GitCompare, 
  Calendar, 
  HelpCircle, 
  BookOpen, 
  Bookmark, 
  GraduationCap, 
  Menu, 
  X,
  User,
  Sparkles,
  DollarSign,
  Award,
  Home,
  Navigation,
  ShieldCheck,
  TrendingUp,
  CalendarCheck,
  PlusCircle
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  compareCount: number;
  bookmarksCount: number;
  openCompare: () => void;
  openBookmarks: () => void;
  openAuth: () => void;
  openSubmitReview?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  compareCount,
  bookmarksCount,
  openCompare,
  openBookmarks,
  openAuth,
  openSubmitReview
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const primaryNavItems = [
    { id: 'vuz', label: 'Поиск вуза', icon: Building2 },
    { id: 'podbor', label: 'Подборка', icon: Sparkles },
    { id: 'calculator', label: 'Калькулятор ЕГЭ', icon: Calculator },
    { id: 'calculator_pay', label: 'Платное (3%)', icon: DollarSign },
    { id: '100program', label: 'Топ-100 программ', icon: Award },
    { id: 'topspec', label: 'Топ направлений РФ', icon: TrendingUp },
    { id: 'calendar', label: 'Календарь 2026', icon: CalendarCheck },
    { id: 'reviews', label: 'Отзывы («Сливы»)', icon: MessageSquareText },
    { id: 'dorms', label: 'Общаги', icon: Home },
    { id: 'rankings', label: 'Рейтинги', icon: Trophy },
    { id: 'map', label: 'Карта', icon: Navigation },
    { id: 'specialties', label: 'Специальности', icon: GraduationCap },
    { id: 'dod', label: 'Дни дверей', icon: Calendar },
    { id: 'qna', label: 'Вопросы', icon: HelpCircle },
    { id: 'articles', label: 'Статьи', icon: BookOpen },
    { id: 'vuzam', label: 'Вузам', icon: ShieldCheck },
    { id: 'premium', label: 'Премиум', icon: Sparkles },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-tabi-navy text-white shadow-md border-b border-slate-700/60">
      {/* Top Banner / Utility Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-2 sm:space-x-3 cursor-pointer shrink-0" onClick={() => handleNavClick('vuz')}>
            <div className="bg-blue-600 text-white font-mono font-black text-base sm:text-xl px-2 sm:px-2.5 py-0.5 sm:py-1 rounded shadow-sm flex items-center justify-center">
              ТА
            </div>
            <div>
              <span className="text-base sm:text-xl font-extrabold tracking-tight text-white flex items-center gap-1 sm:gap-1.5">
                ТАБИТУРИЕНТ
                <span className="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  2026
                </span>
              </span>
              <span className="hidden sm:block text-[11px] text-slate-400 font-medium tracking-wide">
                Честный гид по вузам и поступлению
              </span>
            </div>
          </div>

          {/* Quick Action Buttons (Submit review, Compare, Bookmarks, Login) */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
            
            {/* Submit Review action button */}
            {openSubmitReview && (
              <button
                onClick={openSubmitReview}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600/90 hover:bg-emerald-600 text-white transition-all shadow-sm border border-emerald-500/50 hover:scale-[1.02]"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Прислать слив</span>
              </button>
            )}

            {/* Compare Button */}
            <button
              onClick={openCompare}
              className={`relative px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 border ${
                compareCount > 0
                  ? 'bg-blue-600 text-white border-blue-500'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
              title="Сравнение выбранных вузов"
            >
              <GitCompare className="w-4 h-4" />
              <span className="hidden md:inline">Сравнить</span>
              {compareCount > 0 && (
                <span className="bg-white text-blue-700 text-xs font-bold px-1.5 py-0.2 rounded-full">
                  {compareCount}
                </span>
              )}
            </button>

            {/* Bookmarks Button */}
            <button
              onClick={openBookmarks}
              className={`relative px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 border ${
                bookmarksCount > 0
                  ? 'bg-amber-600 text-white border-amber-500'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
              title="Сохраненные программы и вузы"
            >
              <Bookmark className="w-4 h-4" />
              <span className="hidden md:inline">Закладки</span>
              {bookmarksCount > 0 && (
                <span className="bg-white text-amber-700 text-xs font-bold px-1.5 py-0.2 rounded-full">
                  {bookmarksCount}
                </span>
              )}
            </button>

            {/* Auth / Profile */}
            <button
              onClick={openAuth}
              className="px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center gap-1.5"
              aria-label="Вход в личный кабинет"
            >
              <User className="w-4 h-4 text-slate-400" />
              <span className="hidden sm:inline">Вход</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700"
              aria-label="Открыть меню"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Main Navigation Tabs with Horizontal Scroll */}
      <nav className="hidden md:block bg-tabi-navyDark/95 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto py-1.5 scrollbar-none">
            {primaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-tabi-navyDark border-t border-slate-700 px-4 pt-2 pb-4 space-y-1 max-h-[75vh] overflow-y-auto">
          {openSubmitReview && (
            <button
              onClick={() => { setMobileMenuOpen(false); openSubmitReview(); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold bg-emerald-600 text-white mb-2"
            >
              <PlusCircle className="w-4 h-4" />
              Прислать отзыв о своем вузе
            </button>
          )}
          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
