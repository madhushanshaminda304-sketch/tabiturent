import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  ShieldCheck, 
  Home, 
  Bookmark, 
  GitCompare, 
  Award, 
  GraduationCap, 
  MessageSquareText
} from 'lucide-react';
import { University } from '../types';
import { REVIEWS } from '../data/mockData';

interface UniversityDetailModalProps {
  university: University | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (u: University) => void;
  isCompared: boolean;
  onToggleCompare: (u: University) => void;
}

export const UniversityDetailModal: React.FC<UniversityDetailModalProps> = ({
  university,
  onClose,
  isBookmarked,
  onToggleBookmark,
  isCompared,
  onToggleCompare,
}) => {
  const [activeTab, setActiveTab] = useState<'programs' | 'reviews' | 'dorm'>('programs');

  if (!university) return null;

  const uniReviews = REVIEWS.filter(r => r.universityId === university.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-tabi-navy to-slate-900 text-white flex items-start justify-between gap-4 shrink-0">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-3xl shrink-0 shadow-inner">
              {university.logo}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  {university.name}
                </h2>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {university.region}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                {university.fullName}
              </p>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 shrink-0" />
                {university.address}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => onToggleCompare(university)}
              className={`p-2 rounded-xl text-xs font-medium border transition-colors ${
                isCompared
                  ? 'bg-blue-600 text-white border-blue-500'
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
              title="Сравнить вуз"
            >
              <GitCompare className="w-4 h-4" />
            </button>
            <button
              onClick={() => onToggleBookmark(university)}
              className={`p-2 rounded-xl text-xs font-medium border transition-colors ${
                isBookmarked
                  ? 'bg-amber-500 text-white border-amber-400'
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
              title="В закладки"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition-colors"
              aria-label="Закрыть модальное окно"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Rank Stat Strip */}
        <div className="bg-slate-100 border-b border-slate-200 px-6 py-2.5 flex items-center justify-between overflow-x-auto text-xs font-semibold text-slate-700 shrink-0">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              Глобальный рейтинг: <strong>#{university.globalRank} в РФ</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <MessageSquareText className="w-4 h-4 text-emerald-500" />
              По отзывам: <strong>#{university.reviewRank}</strong> ({university.studentSatisfaction}% довольны)
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-500" />
              Военная кафедра: <strong>{university.hasMilitary ? 'Есть' : 'Нет'}</strong>
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-slate-200 px-6 flex space-x-6 shrink-0 bg-white">
          <button
            onClick={() => setActiveTab('programs')}
            className={`py-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'programs'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            Программы и баллы ({university.faculties.reduce((acc, f) => acc + f.programs.length, 0)})
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'reviews'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <MessageSquareText className="w-4 h-4" />
            Отзывы студентов ({university.reviewsCount})
          </button>
          <button
            onClick={() => setActiveTab('dorm')}
            className={`py-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'dorm'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Home className="w-4 h-4" />
            Общежитие и кампус
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: Programs */}
          {activeTab === 'programs' && (
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 text-xs text-blue-800 leading-relaxed font-medium">
                💡 Проходные баллы указаны по результатам зачисления на бюджет предыдущего года. Обязательно проверяйте минимальные пороговые баллы по каждому отдельному предмету перед подачей документов!
              </div>

              {university.faculties.map((faculty) => (
                <div key={faculty.id} className="space-y-3">
                  <h3 className="text-base font-bold text-slate-900 border-l-4 border-blue-600 pl-3">
                    {faculty.name}
                  </h3>

                  <div className="grid grid-cols-1 gap-3">
                    {faculty.programs.map((program) => (
                      <div 
                        key={program.id}
                        className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-blue-200 hover:shadow-sm transition-all"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                          <div>
                            <span className="text-xs font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded mr-2">
                              {program.code}
                            </span>
                            <span className="text-sm font-bold text-slate-900">
                              {program.name}
                            </span>
                          </div>
                          <span className="text-xs font-semibold px-2 py-1 bg-slate-200 rounded text-slate-700 self-start sm:self-auto">
                            {program.degree} • {program.durationYears} года
                          </span>
                        </div>

                        {/* Program Stats Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-2 border-t border-slate-200/70 mt-2 font-medium">
                          <div>
                            <span className="text-slate-500 block">Проходной (бюджет)</span>
                            <strong className="text-sm text-emerald-600">{program.passingScoreBudget} б.</strong>
                          </div>
                          <div>
                            <span className="text-slate-500 block">Мест (бюджет / плат)</span>
                            <strong className="text-slate-800">{program.budgetSlots} / {program.paidSlots}</strong>
                          </div>
                          <div>
                            <span className="text-slate-500 block">Стоимость / год</span>
                            <strong className="text-slate-800">{program.tuitionPerYear.toLocaleString('ru-RU')} ₽</strong>
                          </div>
                          <div>
                            <span className="text-slate-500 block">Предметы ЕГЭ</span>
                            <span className="text-slate-700 text-[11px] truncate block" title={program.subjects.map(s => s.subject).join(', ')}>
                              {program.subjects.map(s => s.subject.split(' ')[0]).join(', ')}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h4 className="text-sm font-bold text-slate-800">
                  Честные отзывы студентов о {university.name}
                </h4>
                <span className="text-xs text-slate-500">
                  {university.reviewsCount} проверенных отзывов
                </span>
              </div>

              {uniReviews.length > 0 ? (
                uniReviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${
                          rev.sentiment === 'positive' ? 'bg-emerald-500' :
                          rev.sentiment === 'neutral' ? 'bg-amber-400' : 'bg-rose-500'
                        }`} />
                        <span className="text-xs font-bold text-slate-900">{rev.author}</span>
                        <span className="text-xs text-slate-400">({rev.authorStatus})</span>
                      </div>
                      <span className="text-xs text-slate-400">{rev.date}</span>
                    </div>

                    <h5 className="text-sm font-bold text-slate-800">{rev.title}</h5>
                    <p className="text-xs text-slate-600 leading-relaxed">{rev.content}</p>

                    <div className="flex flex-wrap gap-3 pt-2 text-[11px] text-slate-500 border-t border-slate-200">
                      <span>Качество преподавания: <strong>{rev.ratings.teaching}/5</strong></span>
                      <span>Взятки/Коррупция: <strong>{rev.ratings.corruption}</strong></span>
                      <span>Общежитие: <strong>{rev.ratings.dormitory}/5</strong></span>
                      <span>Карьера: <strong>{rev.ratings.career}/5</strong></span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-500 text-sm">
                  Здесь скоро появятся отзывы студентов этого университета. Вы можете стать первым!
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Dorm & Campus */}
          {activeTab === 'dorm' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60 flex items-start space-x-3">
                <Home className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-amber-900">Условия проживания в общежитиях</h4>
                  <p className="text-xs text-amber-800 mt-0.5">
                    Студенческий городок предоставляет места для иногородних студентов очной бюджетной и контрактной формы обучения.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-xs text-slate-500 block">Оценка студентов</span>
                  <strong className="text-xl font-black text-slate-900">{university.dormRating} / 5.0</strong>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-xs text-slate-500 block">Стоимость в месяц</span>
                  <strong className="text-xl font-black text-slate-900">{university.dormPriceMonthly} ₽</strong>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-xs text-slate-500 block">Наличие мест</span>
                  <strong className="text-xl font-black text-emerald-600">Гарантировано</strong>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {university.description}
              </p>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500 font-medium">
            Код вуза в базе: <strong className="text-slate-700">{university.id.toUpperCase()}</strong>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition-colors"
          >
            Закрыть
          </button>
        </div>

      </div>
    </div>
  );
};
