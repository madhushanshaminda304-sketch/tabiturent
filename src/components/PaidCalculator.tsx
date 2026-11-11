import React, { useState, useMemo } from 'react';
import { DollarSign, Landmark, Percent, ArrowRight, MapPin } from 'lucide-react';
import { UNIVERSITIES, REGIONS } from '../data/mockData';
import { University, Program } from '../types';

interface PaidCalculatorProps {
  onSelectUniversity: (u: University) => void;
}

export const PaidCalculator: React.FC<PaidCalculatorProps> = ({ onSelectUniversity }) => {
  const [maxAnnualTuition, setMaxAnnualTuition] = useState<number>(350000);
  const [selectedRegion, setSelectedRegion] = useState<string>('Все регионы');

  // Filter programs within price budget
  const affordablePrograms = useMemo(() => {
    const list: { university: University; program: Program }[] = [];
    UNIVERSITIES.forEach(uni => {
      if (selectedRegion !== 'Все регионы' && uni.region !== selectedRegion) return;

      uni.faculties.forEach(fac => {
        fac.programs.forEach(prog => {
          if (prog.tuitionPerYear <= maxAnnualTuition) {
            list.push({ university: uni, program: prog });
          }
        });
      });
    });

    return list.sort((a, b) => a.program.tuitionPerYear - b.program.tuitionPerYear);
  }, [maxAnnualTuition, selectedRegion]);

  // Government Subsidized Loan (3% per annum, 15 years repayment)
  // During study (4 years + 9 months grace period):
  // Year 1: pays only 40% of accrued interest
  // Year 2: pays only 60% of accrued interest
  // Year 3+: pays 100% of interest
  // After graduation: pays principal + 3% interest over 15 years (180 months)
  const calculateLoanStats = (annualCost: number) => {
    const totalLoan = annualCost * 4;
    const year1MonthlyInterest = Math.round((annualCost * 0.03 * 0.4) / 12);
    const year2MonthlyInterest = Math.round(((annualCost * 2) * 0.03 * 0.6) / 12);
    const studyYearsMonthlyInterest = Math.round(((annualCost * 4) * 0.03) / 12);

    // Monthly payment after graduation over 15 years (180 months) at 3% annual
    const monthlyRate = 0.03 / 12;
    const months = 180;
    const annuityFactor = (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const postGradMonthly = Math.round(totalLoan * annuityFactor);

    return {
      totalLoan,
      year1MonthlyInterest,
      year2MonthlyInterest,
      studyYearsMonthlyInterest,
      postGradMonthly
    };
  };

  const sampleLoan = calculateLoanStats(maxAnnualTuition);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200 mb-2">
          <DollarSign className="w-3.5 h-3.5" />
          Калькулятор платного обучения и господдержки
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Подбор программ по стоимости и расчет кредита под 3%
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
          Найдите качественные образовательные программы под ваш семейный бюджет и рассчитайте ежемесячный платеж по государственной программе образовательного кредитования.
        </p>
      </div>

      {/* Main Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Budget Slider & Region */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-bold text-slate-900">
                Максимальный бюджет в год:
              </label>
              <span className="text-lg font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-xl border border-indigo-200">
                {maxAnnualTuition.toLocaleString('ru-RU')} ₽ / год
              </span>
            </div>
            <input
              type="range"
              min="150000"
              max="900000"
              step="10000"
              value={maxAnnualTuition}
              onChange={(e) => setMaxAnnualTuition(parseInt(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-semibold mt-1">
              <span>150 000 ₽</span>
              <span>450 000 ₽</span>
              <span>750 000 ₽</span>
              <span>900 000 ₽</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                Регион обучения:
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {REGIONS.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs flex flex-col justify-center">
              <span className="text-slate-500 block">Найдено программ:</span>
              <strong className="text-lg font-black text-slate-900">{affordablePrograms.length} программ</strong>
            </div>
          </div>

          {/* Quick presets */}
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="text-xs font-bold text-slate-500 self-center">Пресеты:</span>
            <button
              onClick={() => setMaxAnnualTuition(250000)}
              className="px-3 py-1 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
            >
              До 250k ₽
            </button>
            <button
              onClick={() => setMaxAnnualTuition(400000)}
              className="px-3 py-1 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
            >
              До 400k ₽
            </button>
            <button
              onClick={() => setMaxAnnualTuition(700000)}
              className="px-3 py-1 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
            >
              До 700k ₽ (Топовые)
            </button>
          </div>
        </div>

        {/* Right Col: Subsidized 3% Education Loan Simulator */}
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-indigo-700/60">
              <div className="flex items-center gap-2">
                <Landmark className="w-5 h-5 text-indigo-400" />
                <span className="text-sm font-bold">Госкредит под 3%</span>
              </div>
              <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Субсидия РФ
              </span>
            </div>

            <p className="text-xs text-indigo-200 mt-3 leading-relaxed">
              Государство субсидирует ставку до <strong>3% годовых</strong>. Во время учебы и 9 месяцев после выпуска студент платит только часть процентов:
            </p>

            <div className="space-y-2 mt-4 text-xs font-medium">
              <div className="flex items-center justify-between p-2.5 bg-white/10 rounded-xl">
                <span>1-й год учебы:</span>
                <strong className="text-emerald-400 font-extrabold">~{sampleLoan.year1MonthlyInterest} ₽ / мес</strong>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-white/10 rounded-xl">
                <span>2-й год учебы:</span>
                <strong className="text-emerald-400 font-extrabold">~{sampleLoan.year2MonthlyInterest} ₽ / мес</strong>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-white/10 rounded-xl">
                <span>3–4 курсы:</span>
                <strong className="text-emerald-400 font-extrabold">~{sampleLoan.studyYearsMonthlyInterest} ₽ / мес</strong>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-white/15 rounded-xl border border-white/20">
                <span>После выпуска (15 лет):</span>
                <strong className="text-white font-extrabold">~{sampleLoan.postGradMonthly.toLocaleString('ru-RU')} ₽ / мес</strong>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-indigo-300 font-normal leading-tight pt-2 border-t border-indigo-800">
            * Оформляется в банке-партнере (Сбер/ВТБ) без поручителей и справок о доходах с 14 лет.
          </div>
        </div>

      </div>

      {/* Affordable Programs Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Percent className="w-5 h-5 text-indigo-600" />
          Доступные программы в рамках бюджета ({affordablePrograms.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {affordablePrograms.map((item, idx) => {
            const loanStats = calculateLoanStats(item.program.tuitionPerYear);
            return (
              <div
                key={`${item.university.id}-${item.program.id}-${idx}`}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{item.university.logo}</span>
                      <div>
                        <h4
                          onClick={() => onSelectUniversity(item.university)}
                          className="text-sm font-bold text-slate-900 hover:text-indigo-600 cursor-pointer transition-colors"
                        >
                          {item.university.name}
                        </h4>
                        <span className="text-xs text-slate-500 font-medium">{item.university.region}</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      {item.program.code}
                    </span>
                  </div>

                  <h5 className="text-sm font-bold text-slate-800 mb-3 line-clamp-2">
                    {item.program.name}
                  </h5>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1.5 font-medium">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Стоимость в год:</span>
                      <strong className="text-sm font-extrabold text-indigo-700">
                        {item.program.tuitionPerYear.toLocaleString('ru-RU')} ₽
                      </strong>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-600">
                      <span>По госкредиту (во время учебы):</span>
                      <strong className="text-emerald-700 font-bold">от {loanStats.year1MonthlyInterest} ₽/мес</strong>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-600">
                      <span>Проходной (платное):</span>
                      <strong>{item.program.passingScorePaid} б.</strong>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Платных мест: {item.program.paidSlots}</span>
                  <button
                    onClick={() => onSelectUniversity(item.university)}
                    className="font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    Подробнее
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
