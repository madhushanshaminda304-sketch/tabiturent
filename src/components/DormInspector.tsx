import React, { useState } from 'react';
import { Home, MapPin, Star, CheckCircle2, Search, Calculator } from 'lucide-react';
import { DORMS_DATA } from '../data/mockData';
import { DormChanceCalculator } from './DormChanceCalculator';

export const DormInspector: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'catalog' | 'calc'>('catalog');
  const [search, setSearch] = useState<string>('');
  const [filterPests, setFilterPests] = useState<string>('all');

  const filteredDorms = DORMS_DATA.filter(d => {
    if (filterPests !== 'all' && d.pests !== filterPests) return false;
    if (search && !d.name.toLowerCase().includes(search.toLowerCase()) && !d.universityName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200 mb-2">
          <Home className="w-3.5 h-3.5" />
          Студенческий ревизор общежитий
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Инспекция общежитий: тараканы, коменданты и реальные условия
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
          Вся правда о студенческом быте: где идеальный евроремонт, а куда лучше не заселяться без запаса дихлофоса.
        </p>
      </div>

      {/* Sub-navigation switcher */}
      <div className="flex justify-center">
        <div className="bg-white p-1 rounded-2xl border border-slate-200 shadow-sm inline-flex gap-1">
          <button
            onClick={() => setActiveSubTab('catalog')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeSubTab === 'catalog'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            Каталог студгородков ({DORMS_DATA.length})
          </button>
          <button
            onClick={() => setActiveSubTab('calc')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeSubTab === 'calc'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            Калькулятор шансов заселения
          </button>
        </div>
      </div>

      {/* Mode 1: Catalog */}
      {activeSubTab === 'catalog' && (
        <div className="space-y-6 animate-fade-in">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск по вузу или студгородку..."
                className="w-full text-xs font-medium pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>

            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-semibold text-slate-500">Насекомые:</span>
              {(['all', 'Отсутствуют', 'Редко', 'Бывают'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => setFilterPests(p)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    filterPests === p
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {p === 'all' ? 'Все' : p}
                </button>
              ))}
            </div>
          </div>

          {/* Dorm Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredDorms.map((dorm) => (
              <div
                key={dorm.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-xs font-extrabold text-blue-600 block">
                        {dorm.universityName}
                      </span>
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5">
                        {dorm.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-50 text-amber-900 font-extrabold px-3 py-1 rounded-xl border border-amber-200 shrink-0">
                      <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                      <span>{dorm.ratingOverall} / 5.0</span>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs text-slate-500 mb-3">
                    <p className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{dorm.address}</span>
                    </p>
                    {dorm.metro && (
                      <p className="flex items-center gap-1.5 text-blue-700 font-medium">
                        <span>🚇 Метро: {dorm.metro} ({dorm.walkMinutesToMetro} мин пешком)</span>
                      </p>
                    )}
                    <p className="text-slate-600 font-medium">
                      🕒 Время до учебных корпусов: <strong>~{dorm.travelMinutesToCampus} минут</strong>
                    </p>
                  </div>

                  {/* Audit parameters */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 bg-slate-50 rounded-2xl text-xs font-semibold text-slate-700 mb-3 border border-slate-100">
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase block">Тараканы / клопы:</span>
                      <span className={`font-bold ${dorm.pests === 'Отсутствуют' ? 'text-emerald-700' : dorm.pests === 'Редко' ? 'text-amber-700' : 'text-rose-700'}`}>
                        {dorm.pests}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase block">Комендант:</span>
                      <span>{dorm.wardenStrictness}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase block">Режим входа:</span>
                      <span>{dorm.curfew}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase block">Душевые:</span>
                      <span>{dorm.showerLocation}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase block">Wi-Fi скорость:</span>
                      <span>{dorm.wifiSpeed}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase block">Цена в месяц:</span>
                      <strong className="text-slate-900">{dorm.priceMonthly} ₽</strong>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-xs text-blue-900 italic">
                    «{dorm.reviewSnippet}»
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Проверено студенческим советом
                  </span>
                  <span className="font-semibold text-slate-600">Гос. аккредитация</span>
                </div>
              </div>
            ))}
          </div>

          {filteredDorms.length === 0 && (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 text-xs">
              Общежитий по выбранным параметрам не найдено.
            </div>
          )}
        </div>
      )}

      {/* Mode 2: Dorm Chance Calculator */}
      {activeSubTab === 'calc' && (
        <div className="animate-fade-in">
          <DormChanceCalculator />
        </div>
      )}

    </div>
  );
};
