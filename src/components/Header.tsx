import React, { useState, useRef, useEffect } from 'react';
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
  PlusCircle,
  Search,
  ChevronDown,
  Megaphone,
  MessageSquare
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
  openGlobalSearch?: () => void;
  openAdvModal?: () => void;
  openFeedbackModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  compareCount,
  bookmarksCount,
  openCompare,
  openBookmarks,
  openAuth,
  openSubmitReview,
  openGlobalSearch,
  openAdvModal,
  openFeedbackModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'tools' | 'admissions' | 'partner' | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  const primaryTabs = [
    { id: 'vuz', label: 'Поиск вуза', icon: Building2 },
    { id: 'calculator', label: 'Калькулятор ЕГЭ', icon: Calculator },
    { id: 'rankings', label: 'Рейтинги', icon: Trophy },
    { id: 'reviews', label: 'Отзывы («Сливы»)', icon: MessageSquareText },
    { id: 'calendar', label: 'Календарь 2026', icon: CalendarCheck },
  ];

  const toolsDropdown = [
    { id: 'podbor', label: 'Умный подбор вуза (тест)', icon: Sparkles, desc: 'Подбор по 5 критериям' },
    { id: 'calculator_pay', label: 'Платное обучение (3%)', icon: DollarSign, desc: 'Госкредит с господдержкой' },
    { id: '100program', label: 'Топ-100 программ РФ', icon: Award, desc: 'Национальный рейтинг' },
    { id: 'topspec', label: 'Топ направлений РФ', icon: TrendingUp, desc: 'Рейтинг популярности ОКСО' },
    { id: 'dorms', label: 'Общежития и шансы', icon: Home, desc: 'Инспектор и калькулятор шансов' },
    { id: 'map', label: 'Карта кампусов и метро', icon: Navigation, desc: 'Интерактивная карта РФ' },
    { id: 'specialties', label: 'Специальности (ОКСО)', icon: GraduationCap, desc: 'Каталог направлений и зарплат' },
  ];

  const admissionsDropdown = [
    { id: 'calendar', label: 'Календарь абитуриента 2026', icon: CalendarCheck, desc: 'Сроки и дедлайн Дня X' },
    { id: 'dod', label: 'Дни открытых дверей (ДОД)', icon: Calendar, desc: 'График и онлайн-трансляции' },
    { id: 'premium', label: 'Премиум-трекер списков', icon: Sparkles, desc: 'Отсечение списков без согласий' },
    { id: 'qna', label: 'Вопросы и ответы (Q&A)', icon: HelpCircle, desc: 'Сообщество поступающих' },
    { id: 'articles', label: 'Статьи и гайды', icon: BookOpen, desc: 'База знаний и разборы' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-tabi-navy text-white shadow-md border-b border-slate-700/60" ref={dropdownRef}>
      
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

          {/* Quick Search Trigger Bar */}
          {openGlobalSearch && (
            <button
              onClick={openGlobalSearch}
              className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-medium transition-all w-60 lg:w-72 justify-between shadow-inner"
              title="Быстрый поиск по сайту (Ctrl+K)"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span>Быстрый поиск вуза...</span>
              </div>
              <kbd className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-700 text-slate-300 border border-slate-600">
                Ctrl K
              </kbd>
            </button>
          )}

          {/* Quick Action Buttons (Submit review, Compare, Bookmarks, Login) */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
            
            {/* Mobile Search Button */}
            {openGlobalSearch && (
              <button
                onClick={openGlobalSearch}
                className="md:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
                aria-label="Быстрый поиск"
              >
                <Search className="w-4 h-4" />
              </button>
            )}

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

      {/* Desktop Main Navigation Tabs with Categorized Dropdowns */}
      <nav className="hidden md:block bg-tabi-navyDark/95 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-1 py-1.5">
            
            {/* Primary Visible Tabs */}
            {primaryTabs.map((item) => {
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

            {/* Dropdown 1: Инструменты */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'tools' ? null : 'tools')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeDropdown === 'tools' || ['podbor', 'calculator_pay', '100program', 'topspec', 'dorms', 'map', 'specialties'].includes(activeTab)
                    ? 'bg-slate-800 text-blue-400'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <span>Инструменты</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'tools' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'tools' && (
                <div className="absolute left-0 mt-2 w-72 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-2 z-50 animate-fade-in space-y-1">
                  {toolsDropdown.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <button
                        key={tool.id}
                        onClick={() => handleNavClick(tool.id)}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800 transition-colors flex items-start gap-2.5 group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-slate-800 group-hover:bg-blue-600 text-slate-300 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-blue-400">
                            {tool.label}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {tool.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Dropdown 2: Поступление */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'admissions' ? null : 'admissions')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeDropdown === 'admissions' || ['dod', 'premium', 'qna', 'articles'].includes(activeTab)
                    ? 'bg-slate-800 text-blue-400'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <span>Поступление</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'admissions' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'admissions' && (
                <div className="absolute left-0 mt-2 w-72 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-2 z-50 animate-fade-in space-y-1">
                  {admissionsDropdown.map((adm) => {
                    const Icon = adm.icon;
                    return (
                      <button
                        key={adm.id}
                        onClick={() => handleNavClick(adm.id)}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800 transition-colors flex items-start gap-2.5 group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-slate-800 group-hover:bg-blue-600 text-slate-300 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-blue-400">
                            {adm.label}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {adm.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Dropdown 3: Вузам и партнёрам */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'partner' ? null : 'partner')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeDropdown === 'partner' || activeTab === 'vuzam'
                    ? 'bg-slate-800 text-blue-400'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <span>Вузам</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'partner' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'partner' && (
                <div className="absolute left-0 mt-2 w-64 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-2 z-50 animate-fade-in space-y-1">
                  <button
                    onClick={() => handleNavClick('vuzam')}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800 transition-colors flex items-start gap-2.5 group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-slate-800 group-hover:bg-blue-600 text-slate-300 group-hover:text-white flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-blue-400">Кабинет представителя</div>
                      <div className="text-[10px] text-slate-400">Ответы на отзывы и ДОД</div>
                    </div>
                  </button>

                  {openAdvModal && (
                    <button
                      onClick={() => { setActiveDropdown(null); openAdvModal(); }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800 transition-colors flex items-start gap-2.5 group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-slate-800 group-hover:bg-blue-600 text-slate-300 group-hover:text-white flex items-center justify-center shrink-0">
                        <Megaphone className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-blue-400">Реклама на портале</div>
                        <div className="text-[10px] text-slate-400">Медиакит для вузов</div>
                      </div>
                    </button>
                  )}

                  {openFeedbackModal && (
                    <button
                      onClick={() => { setActiveDropdown(null); openFeedbackModal(); }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800 transition-colors flex items-start gap-2.5 group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-slate-800 group-hover:bg-blue-600 text-slate-300 group-hover:text-white flex items-center justify-center shrink-0">
                        <MessageSquare className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-blue-400">Служба модерации</div>
                        <div className="text-[10px] text-slate-400">Запросы представителей</div>
                      </div>
                    </button>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-tabi-navyDark border-t border-slate-700 px-4 pt-3 pb-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {openSubmitReview && (
            <button
              onClick={() => { setMobileMenuOpen(false); openSubmitReview(); }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              Прислать отзыв о своем вузе
            </button>
          )}

          {/* Primary tabs */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-2">
              Основные разделы
            </span>
            {primaryTabs.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                    isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Tools */}
          <div className="space-y-1 pt-2 border-t border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-2">
              Инструменты и калькуляторы
            </span>
            {toolsDropdown.map((tool) => {
              const Icon = tool.icon;
              const isActive = activeTab === tool.id;
              return (
                <button
                  key={tool.id}
                  onClick={() => handleNavClick(tool.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                    isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  {tool.label}
                </button>
              );
            })}
          </div>

          {/* Admissions */}
          <div className="space-y-1 pt-2 border-t border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-2">
              Поступление и инфо
            </span>
            {admissionsDropdown.map((adm) => {
              const Icon = adm.icon;
              const isActive = activeTab === adm.id;
              return (
                <button
                  key={adm.id}
                  onClick={() => handleNavClick(adm.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                    isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  {adm.label}
                </button>
              );
            })}
          </div>

        </div>
      )}
    </header>
  );
};
