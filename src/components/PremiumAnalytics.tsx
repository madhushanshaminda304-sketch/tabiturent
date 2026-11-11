import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Filter, 
  Users, 
  Award, 
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { UNIVERSITIES } from '../data/mockData';

export const PremiumAnalytics: React.FC = () => {
  const [selectedUniId, setSelectedUniId] = useState('hse');
  const [selectedProgramCode, setSelectedProgramCode] = useState<string>('');
  const [userScore, setUserScore] = useState<number>(301);
  const [userSnils, setUserSnils] = useState<string>('СНИЛС 178-902-334 19');
  const [userHasOriginal, setUserHasOriginal] = useState<boolean>(true);
  const [filterOriginalsOnly, setFilterOriginalsOnly] = useState<boolean>(false);

  const currentUni = UNIVERSITIES.find(u => u.id === selectedUniId) || UNIVERSITIES[0];

  // All available programs for selected university
  const allPrograms = useMemo(() => {
    return currentUni.faculties.flatMap(f => f.programs);
  }, [currentUni]);

  const activeProgram = useMemo(() => {
    if (selectedProgramCode) {
      const found = allPrograms.find(p => p.code === selectedProgramCode);
      if (found) return found;
    }
    return allPrograms[0] || {
      name: 'Прикладная математика и информатика',
      code: '01.03.02',
      passingScoreBudget: 298,
      budgetSlots: 80,
      paidSlots: 40,
      tuitionPerYear: 650000
    };
  }, [allPrograms, selectedProgramCode]);

  // Budget seats for this program
  const budgetSlots = activeProgram.budgetSlots || 80;

  // Generate realistic competitive list surrounding the user
  const rawApplicants = useMemo(() => {
    const list = [
      { rank: 1, idCode: 'СНИЛС 194-284-912 01', score: 310, hasOriginal: true, priority: 1, status: 'Рекомендован' },
      { rank: 2, idCode: 'СНИЛС 182-391-049 84', score: 308, hasOriginal: true, priority: 1, status: 'Рекомендован' },
      { rank: 3, idCode: 'СНИЛС 175-920-114 77', score: 306, hasOriginal: false, priority: 2, status: 'В конкурсе' },
      { rank: 4, idCode: 'СНИЛС 164-819-203 62', score: 305, hasOriginal: true, priority: 1, status: 'Рекомендован' },
      { rank: 5, idCode: 'СНИЛС 159-402-881 53', score: 304, hasOriginal: false, priority: 3, status: 'В конкурсе' },
      { rank: 6, idCode: 'СНИЛС 142-990-332 41', score: 302, hasOriginal: true, priority: 1, status: 'Рекомендован' },
      { 
        rank: 7, 
        idCode: `${userSnils || 'СНИЛС 178-902-334 19'} (ВЫ)`, 
        score: userScore, 
        hasOriginal: userHasOriginal, 
        priority: 1, 
        status: userScore >= (activeProgram.passingScoreBudget || 290) ? 'Проходит на бюджет' : 'Зона риска', 
        isUser: true 
      },
      { rank: 8, idCode: 'СНИЛС 188-412-094 22', score: 298, hasOriginal: true, priority: 1, status: 'В конкурсе' },
      { rank: 9, idCode: 'СНИЛС 173-102-994 15', score: 295, hasOriginal: false, priority: 2, status: 'В конкурсе' },
      { rank: 10, idCode: 'СНИЛС 162-881-744 09', score: 291, hasOriginal: true, priority: 1, status: 'В конкурсе' },
      { rank: 11, idCode: 'СНИЛС 151-229-840 91', score: 288, hasOriginal: false, priority: 4, status: 'В конкурсе' },
      { rank: 12, idCode: 'СНИЛС 149-110-432 18', score: 284, hasOriginal: true, priority: 1, status: 'В конкурсе' }
    ];

    // Sort by score descending
    return list.sort((a, b) => b.score - a.score);
  }, [userScore, userSnils, userHasOriginal, activeProgram]);

  // General position (all applicants)
  const generalUserIndex = rawApplicants.findIndex(a => a.isUser);
  const generalRank = generalUserIndex !== -1 ? generalUserIndex + 1 : 1;

  // Real position among applicants with originals
  const applicantsWithOriginals = useMemo(() => {
    return rawApplicants.filter(a => a.hasOriginal);
  }, [rawApplicants]);

  const realUserIndex = applicantsWithOriginals.findIndex(a => a.isUser);
  const realRank = realUserIndex !== -1 ? realUserIndex + 1 : generalRank;
  const isPassing = userHasOriginal && realRank <= budgetSlots;

  // Displayed list (respecting filterOriginalsOnly toggle)
  const displayedApplicants = filterOriginalsOnly ? applicantsWithOriginals : rawApplicants;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Премиум аналитика поступления 2026
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Трекер согласий и конкурсных списков
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
          Очистка списков от «мертвых душ» (тех, кто подал копии или указал 2–5 приоритет) и расчет вашей реальной позиции в приказе о зачислении на бюджет.
        </p>
      </div>

      {/* Control Strip */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-5">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* University */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1" htmlFor="uni-select">
              Целевой университет:
            </label>
            <select
              id="uni-select"
              value={selectedUniId}
              onChange={(e) => {
                setSelectedUniId(e.target.value);
                setSelectedProgramCode('');
              }}
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-purple-500 text-slate-900"
            >
              {UNIVERSITIES.map(u => (
                <option key={u.id} value={u.id}>{u.name} — {u.region}</option>
              ))}
            </select>
          </div>

          {/* Program */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1" htmlFor="prog-select">
              Направление подготовки:
            </label>
            <select
              id="prog-select"
              value={selectedProgramCode || activeProgram.code}
              onChange={(e) => setSelectedProgramCode(e.target.value)}
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-purple-500 text-slate-900 truncate"
            >
              {allPrograms.map(p => (
                <option key={p.code} value={p.code}>
                  {p.code} {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* User Score */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1" htmlFor="score-input">
              Сумма баллов ЕГЭ + ИД:
            </label>
            <input
              id="score-input"
              type="number"
              min="150"
              max="310"
              value={userScore}
              onChange={(e) => setUserScore(Math.min(310, Math.max(0, parseInt(e.target.value) || 0)))}
              className="w-full text-xs font-black bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-blue-700 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* User SNILS */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1" htmlFor="snils-input">
              Ваш СНИЛС / Номер заявления:
            </label>
            <input
              id="snils-input"
              type="text"
              value={userSnils}
              onChange={(e) => setUserSnils(e.target.value)}
              placeholder="СНИЛС 123-456-789 00"
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-purple-500 text-slate-900"
            />
          </div>

        </div>

        {/* Toggles Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100">
          
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={userHasOriginal}
                onChange={(e) => setUserHasOriginal(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
              />
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Я подал(а) оригинал аттестата / согласия
              </span>
            </label>
          </div>

          <button
            onClick={() => setFilterOriginalsOnly(!filterOriginalsOnly)}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              filterOriginalsOnly
                ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                : 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            {filterOriginalsOnly ? 'Показаны только оригиналы (фильтр включен)' : 'Очистить от «мертвых душ» (только оригиналы)'}
          </button>

        </div>

        {/* Real position diagnosis cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase text-slate-500 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-slate-400" /> Общая позиция в списке
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">#{generalRank}</span>
              <span className="text-xs text-slate-500">из {rawApplicants.length} подавших</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Включает тех, у кого оригинал в других вузах</p>
          </div>

          <div className={`p-4 rounded-2xl border flex flex-col justify-between ${
            isPassing ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'
          }`}>
            <span className="text-[11px] font-bold uppercase text-emerald-800 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-emerald-600" /> Реальная позиция (по оригиналам)
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className={`text-2xl font-black ${isPassing ? 'text-emerald-700' : 'text-amber-700'}`}>
                {userHasOriginal ? `#${realRank}` : 'Нет оригинала'}
              </span>
              <span className="text-xs text-slate-600">из {budgetSlots} мест</span>
            </div>
            <p className="text-[11px] text-slate-600 mt-1">
              {userHasOriginal ? `Перед вами ${realRank - 1} человек с оригиналом` : 'Подайте оригинал, чтобы войти в конкурс'}
            </p>
          </div>

          <div className={`p-4 rounded-2xl border flex flex-col justify-between ${
            isPassing ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'
          }`}>
            <span className="text-[11px] font-bold uppercase text-slate-700 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-blue-600" /> Прогноз зачисления
            </span>
            <div className="mt-2">
              <span className={`text-sm font-extrabold flex items-center gap-1.5 ${
                isPassing ? 'text-emerald-700' : 'text-amber-700'
              }`}>
                {isPassing ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    Высокая вероятность (Зеленая зона)
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    Зона риска / Вне бюджета
                  </>
                )}
              </span>
            </div>
            <p className="text-[11px] text-slate-600 mt-1">
              Запас: +{Math.max(0, budgetSlots - realRank)} мест до отсечки
            </p>
          </div>

        </div>

      </div>

      {/* Simulated Live Ranked Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-slate-800 block">
              Ранжированный конкурсный список: {activeProgram.name} ({activeProgram.code})
            </span>
            <span className="text-[11px] text-slate-500">
              Бюджетных мест: <strong>{budgetSlots}</strong> • Проходной балл 2025: <strong>{activeProgram.passingScoreBudget || 290}</strong>
            </span>
          </div>
          <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
            ● Данные обновлены в реальном времени
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[620px] text-xs">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-200 text-[10px] uppercase font-bold text-slate-500">
                <th className="py-3 px-4 text-center w-12">№</th>
                <th className="py-3 px-4">Идентификатор (СНИЛС)</th>
                <th className="py-3 px-4 text-center">Балл ЕГЭ+ИД</th>
                <th className="py-3 px-4 text-center">Оригинал диплома</th>
                <th className="py-3 px-4 text-center">Приоритет</th>
                <th className="py-3 px-4 text-right">Статус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {displayedApplicants.map((a, i) => (
                <tr
                  key={i}
                  className={a.isUser ? 'bg-blue-100/70 font-bold border-y-2 border-blue-500' : 'hover:bg-slate-50 transition-colors'}
                >
                  <td className="py-3 px-4 text-center text-slate-400 font-mono">
                    {i + 1}
                  </td>
                  <td className="py-3 px-4">
                    <span className={a.isUser ? 'text-blue-900 font-black' : 'text-slate-800'}>
                      {a.idCode}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center font-extrabold text-slate-900">
                    {a.score}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {a.hasOriginal ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        ✓ Подан оригинал
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[10px] bg-slate-100 px-2 py-0.5 rounded-full">
                        Копия
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center font-bold">
                    {a.priority}
                  </td>
                  <td className="py-3 px-4 text-right font-bold">
                    <span className={a.hasOriginal ? 'text-emerald-700' : 'text-slate-500'}>
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
