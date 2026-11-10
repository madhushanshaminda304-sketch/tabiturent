import React from 'react';
import { 
  MapPin, 
  ShieldCheck, 
  Home, 
  ChevronRight, 
  Bookmark, 
  GitCompare, 
  ThumbsUp, 
  Users
} from 'lucide-react';
import { University } from '../types';

interface UniversityCardProps {
  university: University;
  onSelect: (u: University) => void;
  isBookmarked: boolean;
  onToggleBookmark: (u: University) => void;
  isCompared: boolean;
  onToggleCompare: (u: University) => void;
}

export const UniversityCard: React.FC<UniversityCardProps> = ({
  university,
  onSelect,
  isBookmarked,
  onToggleBookmark,
  isCompared,
  onToggleCompare,
}) => {
  const totalReviews = university.reviewsCount;
  const posPct = Math.round((university.positiveReviewsCount / totalReviews) * 100);
  const neuPct = Math.round((university.neutralReviewsCount / totalReviews) * 100);
  const negPct = 100 - posPct - neuPct;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-200 overflow-hidden flex flex-col justify-between">
      
      {/* Top Section */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          
          {/* Logo & Header Info */}
          <div className="flex items-start space-x-3.5">
            <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-2xl shadow-inner shrink-0">
              {university.logo}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h3 
                  onClick={() => onSelect(university)} 
                  className="text-lg sm:text-xl font-bold text-slate-900 hover:text-blue-600 cursor-pointer transition-colors"
                >
                  {university.name}
                </h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {university.region}
                </span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-1 font-medium">
                {university.fullName}
              </p>
            </div>
          </div>

          {/* Quick Action Badges (Bookmark & Compare) */}
          <div className="flex items-center space-x-1 shrink-0">
            <button
              onClick={() => onToggleCompare(university)}
              className={`p-2 rounded-lg text-xs font-medium border transition-colors ${
                isCompared
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
              }`}
              title={isCompared ? 'Удалить из сравнения' : 'Добавить к сравнению'}
              aria-label="Сравнить вуз"
            >
              <GitCompare className="w-4 h-4" />
            </button>
            <button
              onClick={() => onToggleBookmark(university)}
              className={`p-2 rounded-lg text-xs font-medium border transition-colors ${
                isBookmarked
                  ? 'bg-amber-500 text-white border-amber-500'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
              }`}
              title={isBookmarked ? 'Удалить из закладок' : 'Сохранить в закладки'}
              aria-label="Добавить в закладки"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Feature Badges */}
        <div className="flex flex-wrap items-center gap-1.5 mt-3.5">
          {university.isState && (
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
              Государственный
            </span>
          )}
          {university.isHead && (
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
              Головной
            </span>
          )}
          {university.hasMilitary && (
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              Военная кафедра
            </span>
          )}
          {university.hasDorm && (
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
              <Home className="w-3 h-3 text-amber-600" />
              Общежитие
            </span>
          )}
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
          <div>
            <span className="text-[11px] text-slate-600 block font-semibold">Проходной балл</span>
            <span className="text-sm sm:text-base font-extrabold text-slate-900">
              от {university.minPassingScore}
            </span>
          </div>
          <div className="border-x border-slate-200">
            <span className="text-[11px] text-slate-600 block font-semibold">Стоимость / год</span>
            <span className="text-sm sm:text-base font-extrabold text-slate-900">
              от {Math.round(university.minTuition / 1000)}k ₽
            </span>
          </div>
          <div>
            <span className="text-[11px] text-slate-600 block font-semibold">Мест на бюджет</span>
            <span className="text-sm sm:text-base font-extrabold text-blue-600">
              {university.budgetSlotsTotal}
            </span>
          </div>
        </div>

        {/* Student Reviews & Sentiment Distribution */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            <span className="text-slate-700 flex items-center gap-1">
              <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
              {university.studentSatisfaction}% довольны обучением
            </span>
            <span className="text-slate-500 flex items-center gap-1 font-medium">
              <Users className="w-3 h-3" />
              {totalReviews} отзывов
            </span>
          </div>

          {/* Segmented Color Bar */}
          <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden flex" title={`Положительные: ${posPct}%, Нейтральные: ${neuPct}%, Отрицательные: ${negPct}%`}>
            <div style={{ width: `${posPct}%` }} className="bg-emerald-500 h-full" />
            <div style={{ width: `${neuPct}%` }} className="bg-amber-400 h-full" />
            <div style={{ width: `${negPct}%` }} className="bg-rose-500 h-full" />
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1 font-medium">
            <span className="text-emerald-700 font-semibold">{posPct}% за</span>
            <span className="text-amber-700 font-semibold">{neuPct}% нейтрально</span>
            <span className="text-rose-700 font-semibold">{negPct}% против</span>
          </div>
        </div>

      </div>

      {/* Card Footer / Action */}
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-500 font-medium">
          Факультетов: <strong className="text-slate-700">{university.faculties.length}</strong>
        </span>
        <button
          onClick={() => onSelect(university)}
          className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
        >
          Все программы и баллы
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
