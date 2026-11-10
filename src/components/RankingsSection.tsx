import React, { useState } from 'react';
import { 
  Trophy, 
  MessageSquareText, 
  TrendingUp, 
  DollarSign, 
  ArrowRight,
  Search
} from 'lucide-react';
import { UNIVERSITIES, REGIONS } from '../data/mockData';
import { University } from '../types';

interface RankingsSectionProps {
  onSelectUniversity: (u: University) => void;
}

export const RankingsSection: React.FC<RankingsSectionProps> = ({ onSelectUniversity }) => {
  const [activeRankType, setActiveRankType] = useState<'reviews' | 'global' | 'ege' | 'cost'>('reviews');
  const [selectedRegion, setSelectedRegion] = useState<string>('Все регионы');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sorted list based on active ranking type
  const sortedUniversities = [...UNIVERSITIES]
    .filter(u => {
      if (selectedRegion !== 'Все регионы' && u.region !== selectedRegion) return false;
      if (searchQuery && !u.name.toLowerCase().includes(searchQuery.toLowerCase()) && !u.fullName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (activeRankType === 'reviews') {
        // Sort by satisfaction desc, then positive reviews count
        if (b.studentSatisfaction !== a.studentSatisfaction) {
          return b.studentSatisfaction - a.studentSatisfaction;
        }
        return b.positiveReviewsCount - a.positiveReviewsCount;
      }
      if (activeRankType === 'global') {
        return a.globalRank - b.globalRank;
      }
      if (activeRankType === 'ege') {
        return b.avgPassingScore - a.avgPassingScore;
      }
      if (activeRankType === 'cost') {
        return a.minTuition - b.minTuition; // Most affordable first
      }
      return 0;
    });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200 mb-2">
          <Trophy className="w-3.5 h-3.5" />
          Официальные рейтинги вузов 2026
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Рейтинги и сравнение университетов
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
          Сводные таблицы на основе реальных отзывов студентов, проходных баллов ЕГЭ и стоимости обучения.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-200/80 rounded-2xl max-w-3xl mx-auto">
        <button
          onClick={() => setActiveRankType('reviews')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeRankType === 'reviews'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <MessageSquareText className="w-4 h-4 text-emerald-600" />
          По отзывам студентов
        </button>
        <button
          onClick={() => setActiveRankType('global')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeRankType === 'global'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Trophy className="w-4 h-4 text-amber-500" />
          Глобальный рейтинг
        </button>
        <button
          onClick={() => setActiveRankType('ege')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeRankType === 'ege'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-blue-600" />
          По баллам ЕГЭ
        </button>
        <button
          onClick={() => setActiveRankType('cost')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeRankType === 'cost'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <DollarSign className="w-4 h-4 text-indigo-600" />
          По стоимости (доступность)
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск вуза в таблице..."
            className="w-full text-xs font-medium pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-500">Регион:</span>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {REGIONS.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                <th className="py-4 px-4 sm:px-6 w-16 text-center">Место</th>
                <th className="py-4 px-4">Университет</th>
                <th className="py-4 px-4">Регион</th>
                {activeRankType === 'reviews' && (
                  <>
                    <th className="py-4 px-4 text-center">% одобрения</th>
                    <th className="py-4 px-4 text-center">Отзывов</th>
                  </>
                )}
                {activeRankType === 'global' && (
                  <>
                    <th className="py-4 px-4 text-center">Ранг в РФ</th>
                    <th className="py-4 px-4 text-center">Бюджетных мест</th>
                  </>
                )}
                {activeRankType === 'ege' && (
                  <>
                    <th className="py-4 px-4 text-center">Средний балл</th>
                    <th className="py-4 px-4 text-center">Мин. проходной</th>
                  </>
                )}
                {activeRankType === 'cost' && (
                  <>
                    <th className="py-4 px-4 text-center">Стоимость / год</th>
                    <th className="py-4 px-4 text-center">Общежитие / мес</th>
                  </>
                )}
                <th className="py-4 px-4 sm:px-6 text-right">Действие</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm font-medium">
              {sortedUniversities.map((uni, idx) => {
                const rankNum = idx + 1;
                return (
                  <tr 
                    key={uni.id}
                    className="hover:bg-blue-50/40 transition-colors"
                  >
                    {/* Rank Number / Medal */}
                    <td className="py-4 px-4 sm:px-6 text-center">
                      {rankNum === 1 && <span className="text-xl" title="1 место">🥇</span>}
                      {rankNum === 2 && <span className="text-xl" title="2 место">🥈</span>}
                      {rankNum === 3 && <span className="text-xl" title="3 место">🥉</span>}
                      {rankNum > 3 && (
                        <span className="font-mono font-bold text-slate-500 text-sm">
                          #{rankNum}
                        </span>
                      )}
                    </td>

                    {/* University Name & Emblem */}
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl shrink-0">{uni.logo}</span>
                        <div>
                          <span 
                            onClick={() => onSelectUniversity(uni)}
                            className="font-bold text-slate-900 hover:text-blue-600 cursor-pointer block"
                          >
                            {uni.name}
                          </span>
                          <span className="text-xs text-slate-400 font-normal line-clamp-1">
                            {uni.fullName}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Region */}
                    <td className="py-4 px-4">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {uni.region}
                      </span>
                    </td>

                    {/* Dynamic Columns based on ranking type */}
                    {activeRankType === 'reviews' && (
                      <>
                        <td className="py-4 px-4 text-center">
                          <span className="font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full text-xs border border-emerald-200">
                            {uni.studentSatisfaction}%
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center font-bold text-slate-700 text-xs">
                          {uni.reviewsCount}
                        </td>
                      </>
                    )}

                    {activeRankType === 'global' && (
                      <>
                        <td className="py-4 px-4 text-center">
                          <span className="font-extrabold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full text-xs border border-amber-200">
                            #{uni.globalRank}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center font-bold text-slate-700 text-xs">
                          {uni.budgetSlotsTotal} мест
                        </td>
                      </>
                    )}

                    {activeRankType === 'ege' && (
                      <>
                        <td className="py-4 px-4 text-center">
                          <span className="font-extrabold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full text-xs border border-blue-200">
                            {uni.avgPassingScore} б.
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center font-bold text-slate-700 text-xs">
                          от {uni.minPassingScore} б.
                        </td>
                      </>
                    )}

                    {activeRankType === 'cost' && (
                      <>
                        <td className="py-4 px-4 text-center">
                          <span className="font-extrabold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full text-xs border border-indigo-200">
                            от {uni.minTuition.toLocaleString('ru-RU')} ₽
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center font-bold text-slate-700 text-xs">
                          {uni.dormPriceMonthly} ₽
                        </td>
                      </>
                    )}

                    {/* Action */}
                    <td className="py-4 px-4 sm:px-6 text-right">
                      <button
                        onClick={() => onSelectUniversity(uni)}
                        className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1"
                      >
                        Профиль
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
