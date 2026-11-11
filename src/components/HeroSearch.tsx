import React from 'react';
import { Search, MapPin, Compass, ShieldCheck, Home, Award, Building2 } from 'lucide-react';
import { REGIONS, STUDY_AREAS } from '../data/mockData';

interface HeroSearchProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedRegion: string;
  setSelectedRegion: (r: string) => void;
  selectedArea: string;
  setSelectedArea: (a: string) => void;
  filterStateOnly: boolean;
  setFilterStateOnly: (v: boolean) => void;
  filterMilitary: boolean;
  setFilterMilitary: (v: boolean) => void;
  filterDorm: boolean;
  setFilterDorm: (v: boolean) => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  searchQuery,
  setSearchQuery,
  selectedRegion,
  setSelectedRegion,
  selectedArea,
  setSelectedArea,
  filterStateOnly,
  setFilterStateOnly,
  filterMilitary,
  setFilterMilitary,
  filterDorm,
  setFilterDorm,
}) => {
  const cityHubs = [
    { name: 'Все регионы', label: 'Все города', badge: 'РФ' },
    { name: 'Москва', label: 'Москва', badge: '274 б.' },
    { name: 'Санкт-Петербург', label: 'Санкт-Петербург', badge: '265 б.' },
    { name: 'Республика Татарстан', label: 'Казань', badge: '248 б.' },
    { name: 'Новосибирская область', label: 'Новосибирск', badge: '252 б.' },
    { name: 'Свердловская область', label: 'Екатеринбург', badge: '242 б.' },
    { name: 'Томская область', label: 'Томск', badge: '246 б.' },
    { name: 'Нижегородская область', label: 'Нижний Новгород', badge: '240 б.' }
  ];

  return (
    <div className="bg-gradient-to-b from-tabi-navy to-slate-900 text-white pt-6 sm:pt-8 pb-8 sm:pb-10 px-3 sm:px-6 lg:px-8 border-b border-slate-800 shadow-inner overflow-x-hidden">
      <div className="max-w-5xl mx-auto space-y-4">
        
        {/* Title & Tagline */}
        <div className="text-center mb-5 sm:mb-6">
          <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2 break-words">
            Поиск и подбор университета в России
          </h1>
          <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto">
            Реальные проходные баллы, честные отзывы студентов без цензуры, калькулятор шансов и информация об общежитиях.
          </p>
        </div>

        {/* City Hubs Bar (Direct Tabiturient city navigation) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs text-slate-400 font-bold whitespace-nowrap mr-1 flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 text-blue-400" /> Города:
          </span>
          {cityHubs.map((city) => {
            const isSelected = selectedRegion === city.name;
            return (
              <button
                key={city.name}
                onClick={() => setSelectedRegion(city.name)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-400/30'
                    : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10'
                }`}
              >
                <span>{city.label}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-900/40 text-slate-400'
                }`}>
                  {city.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Filter Card */}
        <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/15 shadow-2xl">
          
          {/* Row 1: Selectors (Area & Region) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            {/* Direction Selector */}
            <div className="relative">
              <label htmlFor="select-direction" className="text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-blue-400" />
                Направление подготовки
              </label>
              <select
                id="select-direction"
                aria-label="Направление подготовки"
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full bg-slate-800/90 text-white rounded-xl px-3.5 py-2.5 text-sm border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer font-medium"
              >
                {STUDY_AREAS.map((area) => (
                  <option key={area} value={area} className="bg-slate-900 text-white">
                    {area}
                  </option>
                ))}
              </select>
            </div>

            {/* Region Selector */}
            <div className="relative">
              <label htmlFor="select-region" className="text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                Субъект РФ / Регион
              </label>
              <select
                id="select-region"
                aria-label="Субъект РФ / Регион"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full bg-slate-800/90 text-white rounded-xl px-3.5 py-2.5 text-sm border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer font-medium"
              >
                {REGIONS.map((reg) => (
                  <option key={reg} value={reg} className="bg-slate-900 text-white">
                    {reg}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Search Input Bar */}
          <div className="relative mb-4">
            <label htmlFor="uni-search-input" className="text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-blue-400" />
              Поиск по названию или аббревиатуре (например: МЭИ, ВШЭ, Бауманка)
            </label>
            <div className="relative">
              <input
                id="uni-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Введите название вуза или специальность..."
                className="w-full bg-white text-slate-900 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold shadow-inner"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 px-1.5 py-0.5 rounded"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Row 3: Quick Filter Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-white/10">
            <span className="text-xs text-slate-300 font-semibold mr-1">Параметры:</span>
            
            {/* State University Filter */}
            <button
              onClick={() => setFilterStateOnly(!filterStateOnly)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 border ${
                filterStateOnly
                  ? 'bg-blue-600 text-white border-blue-400 shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              Государственный
            </button>

            {/* Military Dept Filter */}
            <button
              onClick={() => setFilterMilitary(!filterMilitary)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 border ${
                filterMilitary
                  ? 'bg-blue-600 text-white border-blue-400 shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Военная кафедра
            </button>

            {/* Dormitory Filter */}
            <button
              onClick={() => setFilterDorm(!filterDorm)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 border ${
                filterDorm
                  ? 'bg-blue-600 text-white border-blue-400 shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              Есть общежитие
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
