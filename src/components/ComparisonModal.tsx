import React from 'react';
import { 
  X, 
  GitCompare, 
  CheckCircle2, 
  Trash2 
} from 'lucide-react';
import { University } from '../types';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  comparedUniversities: University[];
  onRemoveFromCompare: (id: string) => void;
  onClearCompare: () => void;
  onSelectUniversity: (u: University) => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  isOpen,
  onClose,
  comparedUniversities,
  onRemoveFromCompare,
  onClearCompare,
  onSelectUniversity,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 bg-tabi-navy text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <GitCompare className="w-5 h-5 text-blue-400" />
            <div>
              <h3 className="text-base sm:text-lg font-bold">
                Сравнение университетов ({comparedUniversities.length} из 4)
              </h3>
              <p className="text-xs text-slate-300">
                Сопоставление ключевых критериев поступления и студенческой жизни
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {comparedUniversities.length > 0 && (
              <button
                onClick={onClearCompare}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Очистить все
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Table / Cards */}
        <div className="p-6 overflow-y-auto flex-1">
          {comparedUniversities.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <GitCompare className="w-12 h-12 text-slate-300 mx-auto" />
              <h4 className="text-base font-bold text-slate-800">
                Список сравнения пуст
              </h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Нажмите на иконку весов ⚖️ в карточке любого университета в каталоге или рейтинге, чтобы добавить его к сравнению.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[650px]">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="py-3 px-4 w-44 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Параметр
                    </th>
                    {comparedUniversities.map((uni) => (
                      <th key={uni.id} className="py-3 px-4 text-center">
                        <div className="flex flex-col items-center">
                          <button
                            onClick={() => onRemoveFromCompare(uni.id)}
                            className="text-xs text-rose-500 hover:text-rose-700 self-end mb-1 p-1"
                            title="Убрать из сравнения"
                          >
                            ✕
                          </button>
                          <span className="text-3xl mb-1">{uni.logo}</span>
                          <span 
                            onClick={() => { onClose(); onSelectUniversity(uni); }}
                            className="text-sm font-extrabold text-slate-900 hover:text-blue-600 cursor-pointer text-center block"
                          >
                            {uni.name}
                          </span>
                          <span className="text-[11px] text-slate-400 font-normal">
                            {uni.region}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  
                  {/* Satisfaction & Reviews */}
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-slate-700">
                      Удовлетворенность студентов
                    </td>
                    {comparedUniversities.map(u => (
                      <td key={u.id} className="py-3.5 px-4 text-center">
                        <span className="font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          {u.studentSatisfaction}% ({u.reviewsCount} отзывов)
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Average EGE score */}
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-slate-700">
                      Средний балл ЕГЭ на бюджет
                    </td>
                    {comparedUniversities.map(u => (
                      <td key={u.id} className="py-3.5 px-4 text-center font-black text-sm text-blue-700">
                        {u.avgPassingScore} б.
                      </td>
                    ))}
                  </tr>

                  {/* Min Passing score */}
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-slate-700">
                      Минимальный проходной порог
                    </td>
                    {comparedUniversities.map(u => (
                      <td key={u.id} className="py-3.5 px-4 text-center font-bold text-slate-800">
                        от {u.minPassingScore} б.
                      </td>
                    ))}
                  </tr>

                  {/* Tuition cost */}
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-slate-700">
                      Стоимость обучения в год
                    </td>
                    {comparedUniversities.map(u => (
                      <td key={u.id} className="py-3.5 px-4 text-center font-extrabold text-slate-900">
                        от {u.minTuition.toLocaleString('ru-RU')} ₽
                      </td>
                    ))}
                  </tr>

                  {/* Budget slots total */}
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-slate-700">
                      Бюджетных мест (всего)
                    </td>
                    {comparedUniversities.map(u => (
                      <td key={u.id} className="py-3.5 px-4 text-center font-bold text-blue-600">
                        {u.budgetSlotsTotal} мест
                      </td>
                    ))}
                  </tr>

                  {/* Dormitory & Monthly cost */}
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-slate-700">
                      Общежитие и стоимость
                    </td>
                    {comparedUniversities.map(u => (
                      <td key={u.id} className="py-3.5 px-4 text-center font-medium">
                        {u.hasDorm ? (
                          <span className="text-slate-800 font-bold block">
                            Есть ({u.dormPriceMonthly} ₽/мес, {u.dormRating}★)
                          </span>
                        ) : (
                          <span className="text-slate-400">Нет</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Military department */}
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-slate-700">
                      Военная кафедра
                    </td>
                    {comparedUniversities.map(u => (
                      <td key={u.id} className="py-3.5 px-4 text-center">
                        {u.hasMilitary ? (
                          <span className="text-emerald-700 font-bold flex items-center justify-center gap-1">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            Есть (ВУЦ)
                          </span>
                        ) : (
                          <span className="text-slate-400">Нет</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Global rank in Russia */}
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-slate-700">
                      Место в рейтинге РФ
                    </td>
                    {comparedUniversities.map(u => (
                      <td key={u.id} className="py-3.5 px-4 text-center font-black text-amber-600 text-sm">
                        #{u.globalRank}
                      </td>
                    ))}
                  </tr>

                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
          >
            Закрыть
          </button>
        </div>

      </div>
    </div>
  );
};
