import React, { useState } from 'react';
import { GraduationCap, Search, Briefcase, ArrowRight } from 'lucide-react';
import { SPECIALTIES } from '../data/mockData';

export const SpecialtiesSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const categories = ['Все', 'Математика и IT', 'Экономика и управление', 'Гуманитарные и социальные науки'];

  const filteredSpecialties = SPECIALTIES.filter(s => {
    if (selectedCategory !== 'Все' && s.category !== selectedCategory) return false;
    if (searchQuery && !s.name.toLowerCase().includes(searchQuery.toLowerCase()) && !s.code.includes(searchQuery)) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 mb-2">
          <GraduationCap className="w-3.5 h-3.5" />
          Справочник направлений подготовки (ОКСО)
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Каталог специальностей и профессий
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
          Узнайте, какие предметы ЕГЭ нужны для поступления, сколько зарабатывают выпускники и в каких вузах есть программы.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по коду (09.03.01) или названию..."
            className="w-full text-xs font-medium pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Specialties Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSpecialties.map((spec) => (
          <div
            key={spec.code}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {spec.code}
                </span>
                <span className="text-[11px] font-semibold text-slate-500">
                  {spec.category}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                {spec.name}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed font-normal mb-4 line-clamp-3">
                {spec.description}
              </p>

              {/* Requirements & Salary */}
              <div className="space-y-2 pt-3 border-t border-slate-100 text-xs font-medium">
                <div className="flex items-center justify-between text-slate-700">
                  <span className="flex items-center gap-1 text-slate-500">
                    <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                    Средняя зарплата:
                  </span>
                  <strong className="text-emerald-700 font-extrabold">
                    {spec.avgSalary.toLocaleString('ru-RU')} ₽ / мес
                  </strong>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px] mb-1">Предметы ЕГЭ:</span>
                  <div className="flex flex-wrap gap-1">
                    {spec.requiredSubjects.map((sub, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 bg-slate-100 rounded text-slate-700">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">
                Вузов в РФ: <strong className="text-slate-700">{spec.universitiesCount}</strong>
              </span>
              <span className="text-blue-600 font-bold flex items-center gap-1 cursor-pointer hover:underline">
                Смотреть вузы
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
