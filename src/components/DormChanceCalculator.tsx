import React, { useState, useMemo } from 'react';
import { UNIVERSITIES } from '../data/mockData';
import { 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  Compass
} from 'lucide-react';

interface DormChanceCalculatorProps {
  initialUniId?: string;
}

export const DormChanceCalculator: React.FC<DormChanceCalculatorProps> = ({ 
  initialUniId 
}) => {
  const [selectedUniId, setSelectedUniId] = useState<string>(initialUniId || UNIVERSITIES[0].id);
  const [distanceKm, setDistanceKm] = useState<'close' | 'medium' | 'far'>('far');
  const [educationType, setEducationType] = useState<'budget' | 'paid'>('budget');
  const [egeScore, setEgeScore] = useState<number>(275);
  const [socialBenefit, setSocialBenefit] = useState<'none' | 'orphan' | 'bvi' | 'target'>('none');

  const selectedUni = useMemo(() => {
    return UNIVERSITIES.find((u) => u.id === selectedUniId) || UNIVERSITIES[0];
  }, [selectedUniId]);

  // Probability Calculation
  const result = useMemo(() => {
    if (!selectedUni.hasDorm) {
      return {
        percent: 0,
        status: 'Общежитие отсутствует',
        color: 'rose',
        recommendation: 'У данного вуза нет собственного жилого фонда. Студенты арендуют квартиры или коворкинг-коливинги.',
        dormType: 'Аренда жилья'
      };
    }

    if (distanceKm === 'close') {
      return {
        percent: 5,
        status: 'Отказ по удаленности',
        color: 'rose',
        recommendation: 'По закону «Об образовании РФ» студенты с пропиской ближе определенного радиуса (обычно 50-80 км от МКАД/КАД) место в общежитии не получают.',
        dormType: 'Проживание дома'
      };
    }

    let chance = 70;

    // Social benefits guarantee
    if (socialBenefit === 'orphan' || socialBenefit === 'bvi') {
      chance = 99;
    } else if (socialBenefit === 'target') {
      chance += 15;
    }

    // Budget vs Paid
    if (educationType === 'budget') {
      chance += 15;
    } else {
      chance -= 30; // Paid students get dorms on leftover basis
    }

    // High EGE Bonus
    if (egeScore >= 280) {
      chance += 10;
    }

    chance = Math.min(Math.max(chance, 10), 99);

    let status = 'Средние шансы';
    let color = 'amber';
    let dormType = 'Блочный / Коридорный тип';

    if (chance >= 85) {
      status = 'Гарантированное заселение';
      color = 'emerald';
      dormType = selectedUni.id === 'hse' ? 'Квартирный кампус (Дубки)' : 'Блочный кампус';
    } else if (chance < 40) {
      status = 'Маловероятно (по остаточному принципу)';
      color = 'rose';
      dormType = 'Резервный фонд / партнерские гостиницы';
    }

    let recommendation = '';
    if (educationType === 'paid') {
      recommendation = 'Студенты платной формы заселяются только после 1 сентября при наличии свободных мест. Рекомендуем заранее подыскать варианты совместной аренды квартиры.';
    } else if (socialBenefit === 'bvi' || socialBenefit === 'orphan') {
      recommendation = 'Вам положено первоочередное заселение в день приезда. Общежитие гарантировано на весь срок обучения.';
    } else {
      recommendation = 'Подавайте заявление на общежитие в день публикации приказа о зачислении. Приоритет отдается иногородним с более высокими баллами ЕГЭ.';
    }

    return {
      percent: chance,
      status,
      color,
      recommendation,
      dormType
    };
  }, [selectedUni, distanceKm, educationType, egeScore, socialBenefit]);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" /> Умный калькулятор шансов
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
            Калькулятор вероятности получения общежития
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Оцените реальную вероятность предоставления койко-места в кампусе по критериям приёмной комиссии
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700">Вуз:</span>
          <select
            value={selectedUniId}
            onChange={(e) => setSelectedUniId(e.target.value)}
            className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Выбор университета для общежития"
          >
            {UNIVERSITIES.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.region})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid Inputs & Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Distance */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              Удаленность постоянной прописки:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setDistanceKm('close')}
                className={`p-3 rounded-2xl text-xs font-bold border transition-all text-left ${
                  distanceKm === 'close'
                    ? 'border-blue-600 bg-blue-50/50 text-blue-800 ring-2 ring-blue-500/10'
                    : 'border-slate-200 bg-slate-50/70 text-slate-700 hover:bg-white'
                }`}
              >
                Менее 50 км
                <span className="text-[10px] text-slate-400 block font-normal mt-0.5">Пригород / область</span>
              </button>
              <button
                type="button"
                onClick={() => setDistanceKm('medium')}
                className={`p-3 rounded-2xl text-xs font-bold border transition-all text-left ${
                  distanceKm === 'medium'
                    ? 'border-blue-600 bg-blue-50/50 text-blue-800 ring-2 ring-blue-500/10'
                    : 'border-slate-200 bg-slate-50/70 text-slate-700 hover:bg-white'
                }`}
              >
                50 – 100 км
                <span className="text-[10px] text-slate-400 block font-normal mt-0.5">Дальнее Подмосковье / ЛО</span>
              </button>
              <button
                type="button"
                onClick={() => setDistanceKm('far')}
                className={`p-3 rounded-2xl text-xs font-bold border transition-all text-left ${
                  distanceKm === 'far'
                    ? 'border-blue-600 bg-blue-50/50 text-blue-800 ring-2 ring-blue-500/10'
                    : 'border-slate-200 bg-slate-50/70 text-slate-700 hover:bg-white'
                }`}
              >
                Более 100 км
                <span className="text-[10px] text-slate-400 block font-normal mt-0.5">Другой субъект РФ</span>
              </button>
            </div>
          </div>

          {/* Form of Education */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              Форма обучения:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setEducationType('budget')}
                className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all ${
                  educationType === 'budget'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800 shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-white'
                }`}
              >
                Бюджетная форма (1-й приоритет)
              </button>
              <button
                type="button"
                onClick={() => setEducationType('paid')}
                className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all ${
                  educationType === 'paid'
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-800 shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-white'
                }`}
              >
                Платное обучение (коммерция)
              </button>
            </div>
          </div>

          {/* Social Benefit */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              Льготная категория / основания:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setSocialBenefit('none')}
                className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                  socialBenefit === 'none'
                    ? 'border-blue-600 bg-blue-50 text-blue-800'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-white'
                }`}
              >
                Без льгот
              </button>
              <button
                type="button"
                onClick={() => setSocialBenefit('bvi')}
                className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                  socialBenefit === 'bvi'
                    ? 'border-amber-600 bg-amber-50 text-amber-800'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-white'
                }`}
              >
                БВИ (Олимпиадник)
              </button>
              <button
                type="button"
                onClick={() => setSocialBenefit('orphan')}
                className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                  socialBenefit === 'orphan'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-white'
                }`}
              >
                Особая квота
              </button>
              <button
                type="button"
                onClick={() => setSocialBenefit('target')}
                className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                  socialBenefit === 'target'
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-800'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-white'
                }`}
              >
                Целевой договор
              </button>
            </div>
          </div>

          {/* EGE score slider */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700">Суммарный балл ЕГЭ (3 предмета + ИД):</span>
              <strong className="text-sm font-black text-blue-600">{egeScore} баллов</strong>
            </div>
            <input
              type="range"
              min="150"
              max="310"
              step="1"
              value={egeScore}
              onChange={(e) => setEgeScore(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              aria-label="Балл ЕГЭ"
            />
          </div>

        </div>

        {/* Right Result Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-tabi-navy to-slate-900 rounded-3xl p-6 text-white shadow-xl border border-slate-800 space-y-4">
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Прогноз заселения
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300">
              {selectedUni.name}
            </span>
          </div>

          {/* Odds Circle / Bar */}
          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-4xl sm:text-5xl font-black text-white">
                {result.percent}%
              </span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                result.color === 'emerald'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : result.color === 'amber'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              }`}>
                {result.status}
              </span>
            </div>

            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-700 rounded-full ${
                  result.color === 'emerald'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                    : result.color === 'amber'
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                    : 'bg-gradient-to-r from-rose-500 to-red-400'
                }`}
                style={{ width: `${result.percent}%` }}
              />
            </div>
          </div>

          {/* Dorm details */}
          <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
            <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
              <span className="text-slate-400 block text-[11px]">Ожидаемый тип:</span>
              <strong className="text-white font-bold">{result.dormType}</strong>
            </div>
            <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
              <span className="text-slate-400 block text-[11px]">Стоимость в месяц:</span>
              <strong className="text-emerald-400 font-bold">~{selectedUni.dormPriceMonthly} ₽/мес</strong>
            </div>
          </div>

          {/* Expert Advice */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 space-y-1">
            <span className="font-extrabold text-amber-400 flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Совет эксперта:
            </span>
            <p className="leading-relaxed">
              {result.recommendation}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
