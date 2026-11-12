import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Target, 
  MapPin, 
  GraduationCap, 
  ShieldCheck, 
  Trophy, 
  RotateCcw 
} from 'lucide-react';
import { UNIVERSITIES } from '../data/mockData';
import { University } from '../types';
import { calculateRecommendations } from '../calculations/recommendations';

interface PodborWizardProps {
  onSelectUniversity: (u: University) => void;
}

export const PodborWizard: React.FC<PodborWizardProps> = ({ onSelectUniversity }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Answers
  const [goal, setGoal] = useState<'budget' | 'paid_top' | 'any'>('budget');
  const [region, setRegion] = useState<string>('Все регионы');
  const [direction, setDirection] = useState<string>('it');
  const [priority, setPriority] = useState<'dorm' | 'military' | 'career' | 'easy'>('career');
  const [scoreRange, setScoreRange] = useState<'low' | 'mid' | 'high' | 'olympiad'>('mid');

  // Completed recommendation calculation
  const recommendations = useMemo(() => {
    return calculateRecommendations(UNIVERSITIES, {
      goal,
      region,
      direction,
      priority,
      scoreRange
    });
  }, [goal, region, direction, priority, scoreRange]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Критериальный алгоритм подбора
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Подборка идеального университета за 5 шагов
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
          Ответьте на несколько ключевых вопросов: система сопоставит вашу цель (бюджет/платка), направление обучения, регион и приоритеты.
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-between max-w-md mx-auto">
        {[1, 2, 3, 4, 5, 6].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                currentStep === s
                  ? 'bg-blue-600 text-white shadow-md ring-4 ring-blue-100'
                  : currentStep > s
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {currentStep > s ? '✓' : s === 6 ? '★' : s}
            </div>
            {s < 6 && (
              <div
                className={`w-6 sm:w-10 h-1 transition-all ${
                  currentStep > s ? 'bg-emerald-500' : 'bg-slate-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Wizard Steps Container */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card">
        
        {/* STEP 1: Goal */}
        {currentStep === 1 && (
          <div className="space-y-5 animate-fade-in">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Шаг 1 из 5: Какова ваша главная цель при поступлении?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => setGoal('budget')}
                className={`p-5 rounded-2xl border text-left transition-all ${
                  goal === 'budget'
                    ? 'border-blue-600 bg-blue-50/60 shadow-sm ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <strong className="block text-sm text-slate-900 mb-1">Только бюджет</strong>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Поступить на бесплатное место в государственный вуз с гарантированной стипендией.
                </p>
              </button>
              <button
                onClick={() => setGoal('paid_top')}
                className={`p-5 rounded-2xl border text-left transition-all ${
                  goal === 'paid_top'
                    ? 'border-blue-600 bg-blue-50/60 shadow-sm ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <strong className="block text-sm text-slate-900 mb-1">Топ-вуз (даже платно)</strong>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Главное — статус диплома, комьюнити и связи (рассматриваю скидки и госкредит под 3%).
                </p>
              </button>
              <button
                onClick={() => setGoal('any')}
                className={`p-5 rounded-2xl border text-left transition-all ${
                  goal === 'any'
                    ? 'border-blue-600 bg-blue-50/60 shadow-sm ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <strong className="block text-sm text-slate-900 mb-1">Специальность важнее</strong>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Конкретная интересная профессия, бренд вуза не на первом месте.
                </p>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Region */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-fade-in">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-600" />
              Шаг 2 из 5: В каком регионе вы планируете учиться?
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Москва', val: 'Москва' },
                { label: 'Санкт-Петербург', val: 'Санкт-Петербург' },
                { label: 'Казань (Татарстан)', val: 'Республика Татарстан' },
                { label: 'Новосибирск', val: 'Новосибирская область' },
                { label: 'Вся Россия', val: 'Все регионы' }
              ].map(item => (
                <button
                  key={item.val}
                  onClick={() => setRegion(item.val)}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    region === item.val
                      ? 'border-blue-600 bg-blue-50 font-bold text-blue-700 shadow-sm'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span className="text-sm">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Direction */}
        {currentStep === 3 && (
          <div className="space-y-5 animate-fade-in">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-600" />
              Шаг 3 из 5: Какое направление подготовки вас интересует?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'it', label: '💻 Программирование, IT и ИИ', desc: 'Разработка ПО, Data Science, кибербезопасность' },
                { id: 'eng', label: '⚙️ Инженерия, энергетика, робототехника', desc: 'Вычислительные комплексы, энергосистемы, машиностроение' },
                { id: 'econ', label: '📊 Экономика, финансы и менеджмент', desc: 'Корпоративные финансы, банки, консалтинг, маркетинг' },
                { id: 'law', label: '⚖️ Юриспруденция и право', desc: 'Корпоративное право, адвокатура, госслужба' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setDirection(item.id)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    direction === item.id
                      ? 'border-blue-600 bg-blue-50/70 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <strong className="block text-sm text-slate-900 mb-1">{item.label}</strong>
                  <span className="text-xs text-slate-500">{item.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: Priority */}
        {currentStep === 4 && (
          <div className="space-y-5 animate-fade-in">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-500" />
              Шаг 4 из 5: Что для вас имеет решающее значение?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'career', label: '🚀 Сильный старт карьеры', desc: 'Стажировки в Яндексе, Сбере, Росатоме уже с 3-го курса' },
                { id: 'dorm', label: '🏠 Качественное общежитие', desc: 'Чистый кампус рядом с университетом за адекватные деньги' },
                { id: 'military', label: '🛡️ Военная кафедра (ВУЦ)', desc: 'Освобождение от срочной службы в армии' },
                { id: 'easy', label: '🎯 Доступный проходной порог', desc: 'Уверенность в поступлении без заоблачных 300+ баллов' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setPriority(item.id as any)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    priority === item.id
                      ? 'border-blue-600 bg-blue-50/70 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <strong className="block text-sm text-slate-900 mb-1">{item.label}</strong>
                  <span className="text-xs text-slate-500">{item.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5: Score Range */}
        {currentStep === 5 && (
          <div className="space-y-5 animate-fade-in">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-purple-600" />
              Шаг 5 из 5: Ваш ожидаемый суммарный балл за 3 предмета ЕГЭ (+ИД):
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'low', label: 'До 230 баллов', desc: 'Комфортный бюджет в регионах' },
                { id: 'mid', label: '230 – 265 баллов', desc: 'Хороший шанс в Москве/СПб' },
                { id: 'high', label: '265 – 290 баллов', desc: 'Топовые направления' },
                { id: 'olympiad', label: '290+ / БВИ', desc: 'Элитные факультеты РФ' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setScoreRange(item.id as any)}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    scoreRange === item.id
                      ? 'border-blue-600 bg-blue-50 font-bold text-blue-700 shadow-sm'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <strong className="block text-sm mb-1">{item.label}</strong>
                  <span className="text-[11px] text-slate-500 font-normal">{item.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 6: Recommendations Output */}
        {currentStep === 6 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  Ваша персональная подборка готова!
                </h3>
                <p className="text-xs text-slate-500">
                  Вузы отранжированы с учетом выбранных вами критериев и баллов
                </p>
              </div>

              <button
                onClick={() => setCurrentStep(1)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Пройти заново
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendations.slice(0, 3).map((item, idx) => (
                <div
                  key={item.university.id}
                  className="bg-slate-50 rounded-2xl border-2 border-blue-200 p-5 flex flex-col justify-between hover:shadow-card-hover transition-all relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 bg-blue-600 text-white font-extrabold text-[11px] px-3 py-1 rounded-bl-xl shadow-sm">
                    {item.matchPercent}% совпадение
                  </div>

                  <div>
                    <span className="text-3xl block mb-2">{item.university.logo}</span>
                    <span className="text-xs font-bold text-blue-600">
                      #{idx + 1} Рекомендация
                    </span>
                    <h4 
                      onClick={() => onSelectUniversity(item.university)}
                      className="text-base font-extrabold text-slate-900 hover:text-blue-600 cursor-pointer mt-0.5"
                    >
                      {item.university.name}
                    </h4>
                    <span className="text-xs text-slate-500 block mb-3">{item.university.region}</span>

                    <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-200 pt-3 font-medium">
                      <div className="flex justify-between">
                        <span>Проходной:</span>
                        <strong className="text-slate-900">от {item.university.minPassingScore} б.</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Одобрение:</span>
                        <strong className="text-emerald-600">{item.university.studentSatisfaction}%</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Общежитие:</span>
                        <strong>{item.university.hasDorm ? 'Есть' : 'Нет'}</strong>
                      </div>
                    </div>

                    {item.matchedCriteria && item.matchedCriteria.length > 0 && (
                      <div className="mt-3 pt-2 border-t border-slate-200/60 space-y-1">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                          Совпало по критериям:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {item.matchedCriteria.slice(0, 2).map((crit, cIdx) => (
                            <span key={cIdx} className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-medium">
                              ✓ {crit}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => onSelectUniversity(item.university)}
                    className="mt-4 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors text-center shadow-sm"
                  >
                    Открыть факультеты и программы
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
          {currentStep > 1 && currentStep < 6 ? (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Назад
            </button>
          ) : <div />}

          {currentStep < 5 && (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 shadow-md transition-all"
            >
              Далее
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {currentStep === 5 && (
            <button
              onClick={() => setCurrentStep(6)}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 shadow-md transition-all"
            >
              Показать мою подборку
              <Sparkles className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
