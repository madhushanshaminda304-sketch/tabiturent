import React, { useState } from 'react';
import { 
  X, 
  GitCompare, 
  CheckCircle2, 
  Trash2, 
  Download, 
  Share2 
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
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleExportCsv = () => {
    if (comparedUniversities.length === 0) return;

    const headers = [
      'Параметр',
      ...comparedUniversities.map((u) => `"${u.name}"`)
    ];

    const rows = [
      ['Полное название', ...comparedUniversities.map((u) => `"${u.fullName}"`)],
      ['Регион', ...comparedUniversities.map((u) => `"${u.region}"`)],
      ['Средний балл ЕГЭ', ...comparedUniversities.map((u) => u.avgPassingScore)],
      ['Минимальная стоимость (₽/год)', ...comparedUniversities.map((u) => u.minTuition)],
      ['Общежитие', ...comparedUniversities.map((u) => (u.hasDorm ? `Есть (${u.dormPriceMonthly} ₽/мес)` : 'Нет'))],
      ['Военный учебный центр (ВУЦ)', ...comparedUniversities.map((u) => (u.hasMilitary ? 'Есть' : 'Нет'))],
      ['Удовлетворенность студентов (%)', ...comparedUniversities.map((u) => `${u.studentSatisfaction}%`)],
      ['Место в общем рейтинге РФ', ...comparedUniversities.map((u) => `#${u.globalRank}`)]
    ];

    const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'tabiturient-sravnenie.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Таблица сравнения успешно скачана в CSV!');
  };

  const handleCopyShareLink = () => {
    const ids = comparedUniversities.map((u) => u.id).join(',');
    const url = `${window.location.origin}?tab=vuz&compare=${ids}`;
    navigator.clipboard?.writeText(url);
    showToast('Ссылка на сравнение скопирована в буфер обмена!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-fade-in">
      
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2 text-xs font-semibold animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

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
                Очистить
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 transition-colors"
              aria-label="Закрыть"
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
                          <span className="text-xs text-slate-500 font-medium block">
                            {uni.region}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  
                  {/* Status */}
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-slate-700">Статус</td>
                    {comparedUniversities.map((u) => (
                      <td key={u.id} className="py-3.5 px-4 text-center">
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold">
                          {u.isState ? 'Государственный' : 'Частный'}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Avg EGE Passing Score */}
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-slate-700">
                      Средний балл ЕГЭ (бюджет)
                    </td>
                    {comparedUniversities.map((u) => (
                      <td key={u.id} className="py-3.5 px-4 text-center">
                        <span className="text-base font-extrabold text-emerald-600 block">
                          {u.avgPassingScore} б.
                        </span>
                        <span className="text-[11px] text-slate-400">
                          мин. от {u.minPassingScore}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Tuition cost */}
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-slate-700">
                      Мин. стоимость обучения
                    </td>
                    {comparedUniversities.map((u) => (
                      <td key={u.id} className="py-3.5 px-4 text-center font-bold text-slate-900">
                        от {u.minTuition.toLocaleString('ru-RU')} ₽/год
                      </td>
                    ))}
                  </tr>

                  {/* Student satisfaction */}
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-slate-700">
                      Удовлетворенность студентов
                    </td>
                    {comparedUniversities.map((u) => (
                      <td key={u.id} className="py-3.5 px-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-extrabold text-blue-600">
                            {u.studentSatisfaction}%
                          </span>
                          <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-600 rounded-full" 
                              style={{ width: `${u.studentSatisfaction}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-slate-400">
                            {u.reviewsCount} отзывов
                          </span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Dormitory */}
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-slate-700">
                      Общежитие
                    </td>
                    {comparedUniversities.map((u) => (
                      <td key={u.id} className="py-3.5 px-4 text-center">
                        {u.hasDorm ? (
                          <div className="text-emerald-700 font-bold space-y-0.5">
                            <span className="flex items-center justify-center gap-1">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              Есть
                            </span>
                            <span className="text-[11px] text-slate-500 font-medium block">
                              ~{u.dormPriceMonthly} ₽/мес (рейтинг {u.dormRating}/5)
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-400">Не предоставляется</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Military Center */}
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-slate-700">
                      Военный учебный центр
                    </td>
                    {comparedUniversities.map((u) => (
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
                    {comparedUniversities.map((u) => (
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

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {comparedUniversities.length > 0 && (
              <>
                <button
                  onClick={handleExportCsv}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors border border-slate-200 flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  Экспорт в CSV
                </button>
                <button
                  onClick={handleCopyShareLink}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors border border-slate-200 flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  Копировать ссылку
                </button>
              </>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
          >
            Закрыть
          </button>
        </div>

      </div>
    </div>
  );
};
