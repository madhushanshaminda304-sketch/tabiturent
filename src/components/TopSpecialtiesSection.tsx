import React, { useState, useMemo } from 'react';
import { TOP_SPECIALTIES } from '../data/mockData';
import { 
  TrendingUp, 
  Search, 
  Building2, 
  ArrowUpDown, 
  ChevronRight,
  Flame,
  Info,
  GraduationCap
} from 'lucide-react';

interface TopSpecialtiesSectionProps {
  onSelectUniversityByName?: (name: string) => void;
}

export const TopSpecialtiesSection: React.FC<TopSpecialtiesSectionProps> = ({ 
  onSelectUniversityByName 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [sortBy, setSortBy] = useState<'rank' | 'share' | 'salary' | 'score'>('rank');
  const [expandedCode, setExpandedCode] = useState<string | null>(null);

  const categories = [
    'Все',
    'IT и ИИ',
    'Экономика и Бизнес',
    'Юриспруденция и Право',
    'Медицина и Здравоохранение',
    'Инженерия и Технологии',
    'Гуманитарные и Медиа'
  ];

  const filteredSpecialties = useMemo(() => {
    return TOP_SPECIALTIES.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.topUniversity.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = selectedCategory === 'Все' || item.category === selectedCategory;
      return matchSearch && matchCat;
    }).sort((a, b) => {
      if (sortBy === 'share') return b.sharePercent - a.sharePercent;
      if (sortBy === 'salary') return b.medianSalary - a.medianSalary;
      if (sortBy === 'score') return b.avgBudgetScore - a.avgBudgetScore;
      return a.rank - b.rank;
    });
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 p-6 sm:p-10 text-white shadow-xl border border-slate-800">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold tracking-wide uppercase">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            Официальная аналитика приема РФ
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Топ самых популярных направлений подготовки России
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Рейтинг востребованности специальностей по данным приемных комиссий. Доля абитуриентов, медианная зарплата выпускников, проходные баллы на бюджет и вузы-лидеры.
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-slate-200">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-sm">
              <span className="text-xs text-slate-400 block font-medium">Всего направлений</span>
              <span className="text-lg font-black text-white">400+ ОКСО</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-sm">
              <span className="text-xs text-slate-400 block font-medium">Топ-1 выбор</span>
              <span className="text-lg font-black text-amber-300">Экономика (5.2%)</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-sm">
              <span className="text-xs text-slate-400 block font-medium">Лидер роста мест</span>
              <span className="text-lg font-black text-emerald-300">IT (+16%)</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-sm">
              <span className="text-xs text-slate-400 block font-medium">Макс. зарплата</span>
              <span className="text-lg font-black text-sky-300">195 000 ₽</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              id="specialty-search"
              placeholder="Поиск по коду ОКСО, названию или вузу..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-all text-slate-800"
              aria-label="Поиск по специальностям"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs text-slate-500 font-semibold whitespace-nowrap flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" /> Сортировка:
            </span>
            <button
              onClick={() => setSortBy('rank')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                sortBy === 'rank'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              По популярности
            </button>
            <button
              onClick={() => setSortBy('salary')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                sortBy === 'salary'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              По зарплате
            </button>
            <button
              onClick={() => setSortBy('score')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                sortBy === 'score'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              По проходному баллу
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Specialties List */}
      <div className="space-y-4">
        {filteredSpecialties.map((item) => {
          const isExpanded = expandedCode === item.code;
          return (
            <div
              key={item.code}
              className={`bg-white rounded-3xl border transition-all duration-200 overflow-hidden shadow-sm hover:shadow-md ${
                isExpanded ? 'border-blue-500 ring-2 ring-blue-500/10' : 'border-slate-200'
              }`}
            >
              <div 
                className="p-5 sm:p-6 cursor-pointer flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
                onClick={() => setExpandedCode(isExpanded ? null : item.code)}
              >
                {/* Left Info: Rank + Code + Name */}
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg shrink-0 ${
                    item.rank <= 3
                      ? 'bg-amber-100 text-amber-700 border border-amber-200'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    #{item.rank}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-extrabold px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                        {item.code}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {item.degree}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {item.category}
                      </span>
                      {item.rank <= 5 && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                          <Flame className="w-3 h-3 text-amber-500 fill-amber-500" /> Топ спроса
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      Вуз-лидер: <strong className="text-slate-800">{item.topUniversity}</strong>
                    </p>
                  </div>
                </div>

                {/* Right Metrics: Share Bar, Salary, Budget Score */}
                <div className="flex items-center justify-between lg:justify-end gap-6 w-full lg:w-auto pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  
                  {/* Market Share */}
                  <div className="w-32 sm:w-36 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 font-medium">Доля абитуриентов</span>
                      <strong className="text-blue-700 font-extrabold">{item.sharePercent}%</strong>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(item.sharePercent * 18, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Median Salary */}
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 font-semibold uppercase block">Медиана зарплат</span>
                    <span className="text-sm sm:text-base font-extrabold text-slate-900">
                      {item.medianSalary.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>

                  {/* Avg Score */}
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 font-semibold uppercase block">Бюджет ЕГЭ</span>
                    <span className="text-sm sm:text-base font-extrabold text-emerald-600">
                      {item.avgBudgetScore} б.
                    </span>
                  </div>

                  <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </div>
              </div>

              {/* Expandable Details Drawer */}
              {isExpanded && (
                <div className="px-5 pb-6 pt-2 bg-slate-50/70 border-t border-slate-100 space-y-4 animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-1">
                      <span className="text-slate-500 font-medium block">Динамика бюджетных мест (2026):</span>
                      <span className="font-extrabold text-emerald-700 text-sm">{item.budgetGrowth}</span>
                      <p className="text-[11px] text-slate-400">По данным Минобрнауки РФ</p>
                    </div>
                    <div className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-1">
                      <span className="text-slate-500 font-medium block">Вузов в РФ с этой программой:</span>
                      <span className="font-extrabold text-slate-900 text-sm">{item.universitiesCount} университетов</span>
                      <p className="text-[11px] text-slate-400">Включая филиалы и головные вузы</p>
                    </div>
                    <div className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-1">
                      <span className="text-slate-500 font-medium block">Выпускников в год:</span>
                      <span className="font-extrabold text-slate-900 text-sm">{item.totalGraduatesYear.toLocaleString('ru-RU')} чел.</span>
                      <p className="text-[11px] text-slate-400">Рынок труда и востребованность</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <p className="text-xs text-slate-500 flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-blue-500" />
                      Данная специальность преподается в лучших вузах страны. Рекомендуем оценить ваши шансы в Калькуляторе ЕГЭ.
                    </p>
                    {onSelectUniversityByName && (
                      <button
                        onClick={() => onSelectUniversityByName(item.topUniversity)}
                        className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5"
                      >
                        <Building2 className="w-3.5 h-3.5" />
                        Смотреть вуз-лидер ({item.topUniversity})
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredSpecialties.length === 0 && (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
            <GraduationCap className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">Направлений не найдено</h3>
            <p className="text-xs text-slate-500">Попробуйте изменить поисковый запрос или фильтр категории.</p>
          </div>
        )}
      </div>

    </div>
  );
};
