import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  SlidersHorizontal, 
  GraduationCap, 
  MapPin, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { EGE_SUBJECTS, UNIVERSITIES, REGIONS } from '../data/mockData';
import { University, Program } from '../types';

interface EgeCalculatorProps {
  onSelectUniversity: (u: University) => void;
}

interface SubjectScore {
  [key: string]: number;
}

export const EgeCalculator: React.FC<EgeCalculatorProps> = ({ onSelectUniversity }) => {
  // Initial subject scores
  const [scores, setScores] = useState<SubjectScore>({
    rus: 80,
    math_prof: 76,
    cs: 84,
    physics: 65,
    social: 70,
    eng: 75,
    history: 60,
    bio: 60,
    chem: 60,
    lit: 65,
    geo: 60,
  });

  // Active subjects selected
  const [activeSubjects, setActiveSubjects] = useState<string[]>(['rus', 'math_prof', 'cs']);
  const [targetType, setTargetType] = useState<'budget' | 'paid'>('budget');
  const [targetRegion, setTargetRegion] = useState<string>('Все регионы');
  const [individualAchievement, setIndividualAchievement] = useState<number>(5); // GTO / Gold medal / Volunteer

  // Presets
  const applyPreset = (preset: 'tech_cs' | 'tech_phys' | 'econ' | 'human' | 'med') => {
    if (preset === 'tech_cs') {
      setActiveSubjects(['rus', 'math_prof', 'cs']);
    } else if (preset === 'tech_phys') {
      setActiveSubjects(['rus', 'math_prof', 'physics']);
    } else if (preset === 'econ') {
      setActiveSubjects(['rus', 'math_prof', 'social']);
    } else if (preset === 'human') {
      setActiveSubjects(['rus', 'social', 'history']);
    } else if (preset === 'med') {
      setActiveSubjects(['rus', 'bio', 'chem']);
    }
  };

  const handleScoreChange = (id: string, val: number) => {
    const clamped = Math.max(0, Math.min(100, isNaN(val) ? 0 : val));
    setScores(prev => ({ ...prev, [id]: clamped }));
  };

  const toggleSubjectActive = (id: string) => {
    if (id === 'rus') return; // Russian is mandatory
    if (activeSubjects.includes(id)) {
      setActiveSubjects(activeSubjects.filter(s => s !== id));
    } else {
      setActiveSubjects([...activeSubjects, id]);
    }
  };

  // Match calculations
  const matchedPrograms = useMemo(() => {
    const results: {
      university: University;
      program: Program;
      userSum: number;
      passingCutoff: number;
      diff: number;
      chance: 'high' | 'medium' | 'low';
    }[] = [];

    // Helper map from subject name in Russian to subject ID
    const nameToId: { [key: string]: string } = {
      'Русский язык': 'rus',
      'Профильная математика': 'math_prof',
      'Информатика (ИКТ)': 'cs',
      'Информатика': 'cs',
      'Физика': 'physics',
      'Обществознание': 'social',
      'Английский язык': 'eng',
      'История': 'history',
      'Биология': 'bio',
      'Химия': 'chem',
      'Литература': 'lit',
      'География': 'geo',
    };

    UNIVERSITIES.forEach(uni => {
      if (targetRegion !== 'Все регионы' && uni.region !== targetRegion) return;

      uni.faculties.forEach(fac => {
        fac.programs.forEach(prog => {
          // Check if user has all required subjects
          let canTake = true;
          let calculatedSum = individualAchievement;

          prog.subjects.forEach(req => {
            const subId = nameToId[req.subject] || 'rus';
            if (!activeSubjects.includes(subId)) {
              canTake = false;
            } else {
              const userScore = scores[subId] || 0;
              if (userScore < req.minScore) {
                canTake = false;
              }
              calculatedSum += userScore;
            }
          });

          if (canTake) {
            const cutoff = targetType === 'budget' ? prog.passingScoreBudget : prog.passingScorePaid;
            const diff = calculatedSum - cutoff;

            let chance: 'high' | 'medium' | 'low' = 'low';
            if (diff >= 5) {
              chance = 'high';
            } else if (diff >= -5) {
              chance = 'medium';
            } else {
              chance = 'low';
            }

            results.push({
              university: uni,
              program: prog,
              userSum: calculatedSum,
              passingCutoff: cutoff,
              diff,
              chance
            });
          }
        });
      });
    });

    // Sort by difference descending (best chances first)
    return results.sort((a, b) => b.diff - a.diff);
  }, [scores, activeSubjects, targetType, targetRegion, individualAchievement]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 mb-3">
          <Calculator className="w-3.5 h-3.5" />
          Калькулятор шансов поступления 2026
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Куда поступить с вашими баллами ЕГЭ?
        </h2>
        <p className="text-sm text-slate-600 mt-2 font-medium">
          Укажите сданные предметы и баллы. Алгоритм сравнит их с реальными проходными порогами вузов и покажет вероятность поступления.
        </p>
      </div>

      {/* Preset Quick Selectors */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs font-bold text-slate-500 mr-1">Быстрые наборы:</span>
        <button
          onClick={() => applyPreset('tech_cs')}
          className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 hover:border-blue-500 hover:text-blue-600 shadow-sm transition-all"
        >
          💻 IT (Рус + Мат + Инф)
        </button>
        <button
          onClick={() => applyPreset('tech_phys')}
          className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 hover:border-blue-500 hover:text-blue-600 shadow-sm transition-all"
        >
          ⚙️ Инженерия (Рус + Мат + Физ)
        </button>
        <button
          onClick={() => applyPreset('econ')}
          className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 hover:border-blue-500 hover:text-blue-600 shadow-sm transition-all"
        >
          📊 Экономика (Рус + Мат + Общ)
        </button>
        <button
          onClick={() => applyPreset('human')}
          className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 hover:border-blue-500 hover:text-blue-600 shadow-sm transition-all"
        >
          ⚖️ Юриспруденция (Рус + Общ + Ист)
        </button>
        <button
          onClick={() => applyPreset('med')}
          className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 hover:border-blue-500 hover:text-blue-600 shadow-sm transition-all"
        >
          🧬 Медицина (Рус + Био + Хим)
        </button>
      </div>

      {/* Main Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Subject Selectors and Scores */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-5">
          <h3 className="text-base font-bold text-slate-900 flex items-center justify-between">
            <span>Выберите предметы и введите баллы</span>
            <span className="text-xs font-normal text-slate-500">
              Выбрано предметов: <strong>{activeSubjects.length}</strong>
            </span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {EGE_SUBJECTS.map((sub) => {
              const isActive = activeSubjects.includes(sub.id);
              const score = scores[sub.id] || 0;
              return (
                <div
                  key={sub.id}
                  className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-blue-50/60 border-blue-300 shadow-sm'
                      : 'bg-slate-50 border-slate-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <div 
                    onClick={() => toggleSubjectActive(sub.id)}
                    className="flex items-center space-x-2.5 cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={() => toggleSubjectActive(sub.id)}
                      disabled={sub.required}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        {sub.name}
                      </span>
                      {sub.required && (
                        <span className="text-[10px] text-blue-600 font-semibold block">Обязательный</span>
                      )}
                    </div>
                  </div>

                  {isActive ? (
                    <div className="flex items-center space-x-1.5 shrink-0">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={score}
                        onChange={(e) => handleScoreChange(sub.id, parseInt(e.target.value))}
                        className="w-16 px-2 py-1.5 text-center text-sm font-extrabold bg-white border border-blue-300 rounded-xl text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-xs text-slate-400 font-bold">/ 100</span>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 font-medium">Не сдавался</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Individual Achievements */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-slate-800 block">
                Индивидуальные достижения (ИД)
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Аттестат с отличием / медаль, ГТО, волонтерство (до +10 баллов)
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="0"
                max="10"
                value={individualAchievement}
                onChange={(e) => setIndividualAchievement(parseInt(e.target.value))}
                className="w-28 accent-blue-600 cursor-pointer"
              />
              <span className="text-sm font-bold text-blue-600 w-8 text-center bg-blue-50 py-1 rounded-lg border border-blue-200">
                +{individualAchievement}
              </span>
            </div>
          </div>
        </div>

        {/* Right Col: Filters & Target Options */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              Параметры подбора
            </h3>

            {/* Target Type: Budget vs Paid */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Форма финансирования
              </label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl">
                <button
                  onClick={() => setTargetType('budget')}
                  className={`py-2 text-xs font-bold rounded-xl transition-all ${
                    targetType === 'budget'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Бюджетные места
                </button>
                <button
                  onClick={() => setTargetType('paid')}
                  className={`py-2 text-xs font-bold rounded-xl transition-all ${
                    targetType === 'paid'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Платное обучение
                </button>
              </div>
            </div>

            {/* Target Region */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                Желаемый регион
              </label>
              <select
                value={targetRegion}
                onChange={(e) => setTargetRegion(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {REGIONS.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            {/* Summary Stat Box */}
            <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl border border-blue-200 space-y-2">
              <span className="text-xs text-blue-900 font-semibold block">
                Сводка по расчету:
              </span>
              <div className="flex items-center justify-between text-xs text-slate-700">
                <span>Подходящих программ:</span>
                <strong className="text-sm font-black text-blue-700">{matchedPrograms.length}</strong>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-700">
                <span>Высокий шанс (бюджет):</span>
                <strong className="text-sm font-black text-emerald-600">
                  {matchedPrograms.filter(p => p.chance === 'high').length}
                </strong>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 font-medium leading-tight">
            * Вероятность оценивается математически по тренду конкурса прошлых лет. Гарантией зачисления является только приказ ректора вуза.
          </div>
        </div>

      </div>

      {/* Results Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            Результаты расчета шансов ({matchedPrograms.length})
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            Сортировка по запасу баллов
          </span>
        </div>

        {matchedPrograms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matchedPrograms.map((item, idx) => (
              <div
                key={`${item.university.id}-${item.program.id}-${idx}`}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-card-hover transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{item.university.logo}</span>
                      <div>
                        <h4 
                          onClick={() => onSelectUniversity(item.university)}
                          className="text-base font-bold text-slate-900 hover:text-blue-600 cursor-pointer transition-colors"
                        >
                          {item.university.name}
                        </h4>
                        <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                          <MapPin className="w-3 h-3" />
                          {item.university.region}
                        </span>
                      </div>
                    </div>

                    {/* Chance Badge */}
                    <div className="shrink-0">
                      {item.chance === 'high' && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Высокий шанс
                        </span>
                      )}
                      {item.chance === 'medium' && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5" />
                          Средний шанс
                        </span>
                      )}
                      {item.chance === 'low' && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-300 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          Рискованно
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-3">
                    <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded mr-1.5">
                      {item.program.code}
                    </span>
                    <span className="text-sm font-bold text-slate-800">
                      {item.program.name}
                    </span>
                  </div>

                  {/* Score Comparison Box */}
                  <div className="grid grid-cols-3 gap-2 mt-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-center text-xs">
                    <div>
                      <span className="text-slate-500 block text-[11px]">Ваш балл (+ИД)</span>
                      <strong className="text-sm font-extrabold text-blue-600">{item.userSum}</strong>
                    </div>
                    <div className="border-x border-slate-200">
                      <span className="text-slate-500 block text-[11px]">Проходной порог</span>
                      <strong className="text-sm font-extrabold text-slate-800">{item.passingCutoff}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">Разница</span>
                      <strong className={`text-sm font-extrabold ${item.diff >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {item.diff >= 0 ? `+${item.diff}` : item.diff} б.
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">
                    Мест: <strong className="text-slate-700">{item.program.budgetSlots} бюджет</strong>
                  </span>
                  <button
                    onClick={() => onSelectUniversity(item.university)}
                    className="font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    Подробнее о вузе
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
            <GraduationCap className="w-12 h-12 text-slate-300 mx-auto" />
            <h4 className="text-base font-bold text-slate-800">
              По выбранным предметам и баллам программ не найдено
            </h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Попробуйте активировать дополнительные предметы ЕГЭ или выбрать «Все регионы».
            </p>
          </div>
        )}

      </div>

    </div>
  );
};
