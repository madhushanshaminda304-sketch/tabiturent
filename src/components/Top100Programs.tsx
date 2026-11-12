import React, { useState } from 'react';
import { Award, Search, Plus, BookmarkCheck } from 'lucide-react';
import { TOP_100_PROGRAMS } from '../data/mockData';
import { usePlanStore } from '../services/planStore';

export const Top100Programs: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>('Все направления');
  const [sortBy, setSortBy] = useState<'rank' | 'salary' | 'ege' | 'competition'>('rank');
  const [search, setSearch] = useState<string>('');
  const { addProgram, hasProgram } = usePlanStore();

  const domains = ['Все направления', 'Математика и IT', 'Инженерия и технологии', 'Экономика и управление', 'Гуманитарные и социальные науки'];

  const filteredPrograms = TOP_100_PROGRAMS
    .filter(p => {
      if (selectedDomain !== 'Все направления' && p.domain !== selectedDomain) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.code.includes(search) && !p.universityName.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'salary') return b.startSalary - a.startSalary;
      if (sortBy === 'ege') return b.avgEgeScore - a.avgEgeScore;
      if (sortBy === 'competition') return b.competitionPerSeat - a.competitionPerSeat;
      return a.rank - b.rank;
    });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200 mb-2">
          <Award className="w-3.5 h-3.5" />
          Национальный рейтинг программ
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Топ самых востребованных образовательных программ России
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
          Рейтинг образовательных программ бакалавриата и специалитета по популярности, конкурсу на место и уровню стартовой зарплаты выпускников.
        </p>
      </div>

      {/* Filter and Sort Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по названию или вузу..."
            className="w-full text-xs font-medium pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </div>

        {/* Domain Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-500">Сфера:</span>
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {domains.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Sort selector */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-500">Сортировать:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="rank">По рейтингу (популярность)</option>
            <option value="salary">По стартовой зарплате</option>
            <option value="ege">По проходному баллу</option>
            <option value="competition">По конкурсу (чел/место)</option>
          </select>
        </div>

      </div>

      {/* Programs League Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                <th className="py-4 px-4 w-16 text-center">Ранг</th>
                <th className="py-4 px-4">Программа и код</th>
                <th className="py-4 px-4">Университет</th>
                <th className="py-4 px-4 text-center">Конкурс</th>
                <th className="py-4 px-4 text-center">Проходной балл</th>
                <th className="py-4 px-4 text-center">Зарплата выпускника</th>
                <th className="py-4 px-4 text-right">Стоимость / год</th>
                <th className="py-4 px-4 text-center">В план</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium">
              {filteredPrograms.map((p, idx) => {
                const inPlan = hasProgram(p.id);
                return (
                <tr key={p.id} className="hover:bg-blue-50/40 transition-colors">
                  <td className="py-4 px-4 text-center">
                    {idx === 0 && <span className="text-lg">🥇</span>}
                    {idx === 1 && <span className="text-lg">🥈</span>}
                    {idx === 2 && <span className="text-lg">🥉</span>}
                    {idx > 2 && (
                      <span className="font-mono font-bold text-slate-500">
                        #{p.rank}
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-4">
                    <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-[10px] mr-2">
                      {p.code}
                    </span>
                    <strong className="text-slate-900 text-sm">{p.name}</strong>
                    <span className="block text-[11px] text-slate-500 mt-0.5">{p.domain}</span>
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">{p.universityLogo}</span>
                      <strong className="text-slate-800">{p.universityName}</strong>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-center">
                    <span className="font-bold text-slate-800 bg-slate-100 px-2 py-1 rounded-lg">
                      {p.competitionPerSeat} чел/место
                    </span>
                  </td>

                  <td className="py-4 px-4 text-center">
                    <span className="font-extrabold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                      {p.avgEgeScore} б.
                    </span>
                  </td>

                  <td className="py-4 px-4 text-center">
                    <strong className="text-emerald-700 font-extrabold text-sm">
                      {p.startSalary.toLocaleString('ru-RU')} ₽
                    </strong>
                  </td>

                  <td className="py-4 px-4 text-right">
                    <span className="font-bold text-slate-800">
                      {p.tuitionPerYear.toLocaleString('ru-RU')} ₽
                    </span>
                  </td>

                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => {
                        addProgram({
                          programId: p.id,
                          programCode: p.code,
                          programName: p.name,
                          universityId: p.id.split('-')[1] || 'uni',
                          universityName: p.universityName,
                          campusId: 'main-campus',
                          campusName: 'Главный кампус',
                          durationYears: 4,
                          degree: 'Бакалавриат',
                          pathway: 'ugc_state',
                          tuitionPerYear: p.tuitionPerYear,
                          passingScoreBudget: p.avgEgeScore,
                          budgetSlots: p.budgetSlots,
                          knownRequirements: [`Конкурс: ${p.competitionPerSeat} чел/место`, `Ср. балл: ${p.avgEgeScore}`]
                        }, 'considering');
                      }}
                      className={`p-1.5 rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1 ${
                        inPlan
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200'
                      }`}
                      title={inPlan ? 'Программа уже в вашем плане' : 'Добавить в Мой план'}
                    >
                      {inPlan ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </button>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
