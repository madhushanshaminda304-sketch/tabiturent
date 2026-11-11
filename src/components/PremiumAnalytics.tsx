import React, { useState } from 'react';
import { Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';
import { UNIVERSITIES } from '../data/mockData';

export const PremiumAnalytics: React.FC = () => {
  const [selectedUniId, setSelectedUniId] = useState('hse');
  const [userScore, setUserScore] = useState<number>(301);

  const currentUni = UNIVERSITIES.find(u => u.id === selectedUniId) || UNIVERSITIES[0];
  const program = currentUni.faculties[0]?.programs[0];

  // Budget seats for this program
  const budgetSlots = program ? program.budgetSlots : 80;

  // Generate realistic competitive list surrounding the user
  const mockApplicants = [
    { rank: 1, idCode: 'СНИЛС 194-284-912 01', score: 310, hasOriginal: true, priority: 1, status: 'Рекомендован' },
    { rank: 2, idCode: 'СНИЛС 182-391-049 84', score: 308, hasOriginal: true, priority: 1, status: 'Рекомендован' },
    { rank: 3, idCode: 'СНИЛС 175-920-114 77', score: 306, hasOriginal: false, priority: 2, status: 'В конкурсе' },
    { rank: 4, idCode: 'СНИЛС 164-819-203 62', score: 305, hasOriginal: true, priority: 1, status: 'Рекомендован' },
    { rank: 5, idCode: 'СНИЛС 159-402-881 53', score: 304, hasOriginal: false, priority: 3, status: 'В конкурсе' },
    { rank: 6, idCode: 'СНИЛС 142-990-332 41', score: 302, hasOriginal: true, priority: 1, status: 'Рекомендован' },
    { rank: 7, idCode: 'ВЫ (Ваш балл)', score: userScore, hasOriginal: true, priority: 1, status: userScore >= (program?.passingScoreBudget || 290) ? 'Проходит на бюджет' : 'Зона риска', isUser: true },
    { rank: 8, idCode: 'СНИЛС 188-412-094 22', score: 298, hasOriginal: true, priority: 1, status: 'В конкурсе' },
    { rank: 9, idCode: 'СНИЛС 173-102-994 15', score: 295, hasOriginal: false, priority: 2, status: 'В конкурсе' },
    { rank: 10, idCode: 'СНИЛС 162-881-744 09', score: 291, hasOriginal: true, priority: 1, status: 'В конкурсе' }
  ].sort((a, b) => b.score - a.score);

  const userIndex = mockApplicants.findIndex(a => a.isUser);
  const originalsAboveUser = mockApplicants.slice(0, userIndex).filter(a => a.hasOriginal).length;
  const isPassing = originalsAboveUser < budgetSlots;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Премиум аналитика поступления
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Трекер согласий и конкурсных списков
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
          Очистка списков от «мертвых душ» (тех, кто не подал оригинал диплома) и оценка вашей реальной позиции в приказе о зачислении.
        </p>
      </div>

      {/* Control Strip */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Выберите целевой университет:
            </label>
            <select
              value={selectedUniId}
              onChange={(e) => setSelectedUniId(e.target.value)}
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl p-2.5"
            >
              {UNIVERSITIES.map(u => (
                <option key={u.id} value={u.id}>{u.name} — {u.fullName}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Ваш суммарный балл ЕГЭ (+ИД):
            </label>
            <input
              type="number"
              min="150"
              max="310"
              value={userScore}
              onChange={(e) => setUserScore(parseInt(e.target.value) || 0)}
              className="w-full text-xs font-black bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-blue-700"
            />
          </div>
        </div>

        {/* Real position diagnosis */}
        <div className={`p-4 rounded-2xl border flex items-center justify-between flex-wrap gap-3 ${
          isPassing ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-amber-50 border-amber-200 text-amber-900'
        }`}>
          <div className="flex items-center space-x-3">
            {isPassing ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
            )}
            <div>
              <strong className="block text-sm font-extrabold">
                {isPassing ? 'Зеленая зона зачисления (Высокая вероятность)' : 'Желтая зона риска'}
              </strong>
              <span className="text-xs">
                Реальная позиция с учетом поданных оригиналов: <strong>#{originalsAboveUser + 1}</strong> из {budgetSlots} бюджетных мест
              </span>
            </div>
          </div>

          <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-white border shadow-sm">
            Запас: +{Math.max(0, budgetSlots - originalsAboveUser - 1)} мест
          </span>
        </div>
      </div>

      {/* Simulated Live List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700">
            Фрагмент ранжированного списка: {program?.name} ({program?.code})
          </span>
          <span className="text-[11px] text-slate-500 font-medium">
            Обновлено в реальном времени
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px] text-xs">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-200 text-[10px] uppercase font-bold text-slate-500">
                <th className="py-3 px-4 text-center w-12">№</th>
                <th className="py-3 px-4">Идентификатор (СНИЛС)</th>
                <th className="py-3 px-4 text-center">Балл</th>
                <th className="py-3 px-4 text-center">Оригинал диплома</th>
                <th className="py-3 px-4 text-center">Приоритет</th>
                <th className="py-3 px-4 text-right">Прогноз</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {mockApplicants.map((a, i) => (
                <tr
                  key={i}
                  className={a.isUser ? 'bg-blue-100/60 font-bold border-y-2 border-blue-400' : 'hover:bg-slate-50'}
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
                      <span className="text-slate-400 text-[10px]">Копия</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center font-bold">
                    {a.priority}
                  </td>
                  <td className="py-3 px-4 text-right font-bold">
                    <span className={a.hasOriginal ? 'text-emerald-600' : 'text-slate-500'}>
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
