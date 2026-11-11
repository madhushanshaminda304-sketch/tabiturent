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
  MessageSquareText,
  Calendar,
  HelpCircle,
  Building2,
  Sparkles
} from 'lucide-react';
import { University } from '../types';
import { REVIEWS, OPEN_DAYS, QNA_QUESTIONS } from '../data/mockData';
import { DormChanceCalculator } from './DormChanceCalculator';

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
  const [activeTab, setActiveTab] = useState<'about' | 'programs' | 'reviews' | 'dorm' | 'dod' | 'qna'>('programs');
  const [userScore, setUserScore] = useState<string>('');

  if (!university) return null;

  const uniReviews = REVIEWS.filter((r) => r.universityId === university.id);
  const uniEvents = OPEN_DAYS.filter((e) => e.universityId === university.id);
  const uniQuestions = QNA_QUESTIONS.filter((q) => q.universityId === university.id);

  const parsedUserScore = Number(userScore) || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
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
                {university.isState && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Гос. вуз
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                {university.fullName}
              </p>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 shrink-0" />
                {university.address} {university.metroStation && `• метро ${university.metroStation}`}
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
          <div className="flex items-center space-x-6 whitespace-nowrap">
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
              Военная кафедра: <strong>{university.hasMilitary ? 'Есть (ВУЦ)' : 'Нет'}</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <Home className="w-4 h-4 text-indigo-500" />
              Общежитие: <strong>{university.hasDorm ? `Есть (~${university.dormPriceMonthly} ₽/мес)` : 'Нет'}</strong>
            </span>
          </div>
        </div>

        {/* Navigation Tabs (Full Parity with /vuzu/<slug> subpages) */}
        <div className="border-b border-slate-200 px-6 flex space-x-6 shrink-0 bg-white overflow-x-auto">
          <button
            onClick={() => setActiveTab('programs')}
            className={`py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'programs'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            Программы и баллы ({university.faculties.reduce((acc, f) => acc + f.programs.length, 0)})
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'about'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Building2 className="w-4 h-4" />
            О вузе
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'reviews'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <MessageSquareText className="w-4 h-4" />
            Отзывы ({uniReviews.length})
          </button>
          <button
            onClick={() => setActiveTab('dorm')}
            className={`py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'dorm'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Home className="w-4 h-4" />
            Общежитие и шансы
          </button>
          <button
            onClick={() => setActiveTab('dod')}
            className={`py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'dod'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Дни дверей ({uniEvents.length})
          </button>
          <button
            onClick={() => setActiveTab('qna')}
            className={`py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'qna'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            Вопросы ({uniQuestions.length})
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: Programs & Score Simulator */}
          {activeTab === 'programs' && (
            <div className="space-y-6">
              
              {/* Quick score test bar */}
              <div className="p-4 bg-blue-50/80 rounded-2xl border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="text-xs font-extrabold text-blue-900 block flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-600" /> Проверка ваших шансов:
                  </span>
                  <p className="text-xs text-blue-700">
                    Введите сумму баллов ЕГЭ, чтобы подсветить программы, куда вы гарантированно проходите на бюджет
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <input
                    type="number"
                    min="100"
                    max="310"
                    placeholder="Ваш балл ЕГЭ..."
                    value={userScore}
                    onChange={(e) => setUserScore(e.target.value)}
                    className="w-36 px-3 py-2 rounded-xl border border-blue-300 text-xs font-bold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Ваш балл ЕГЭ"
                  />
                  {userScore && (
                    <button
                      onClick={() => setUserScore('')}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800"
                    >
                      Сбросить
                    </button>
                  )}
                </div>
              </div>

              {university.faculties.map((faculty) => (
                <div key={faculty.id} className="space-y-3">
                  <h3 className="text-base font-bold text-slate-900 border-l-4 border-blue-600 pl-3">
                    {faculty.name}
                  </h3>

                  <div className="grid grid-cols-1 gap-3">
                    {faculty.programs.map((program) => {
                      const passesBudget = parsedUserScore > 0 && parsedUserScore >= program.passingScoreBudget;
                      const passesPaid = parsedUserScore > 0 && parsedUserScore >= program.passingScorePaid;

                      return (
                        <div 
                          key={program.id}
                          className={`p-4 rounded-2xl border transition-all ${
                            passesBudget
                              ? 'border-emerald-300 bg-emerald-50/20 shadow-sm'
                              : parsedUserScore > 0 && !passesPaid
                              ? 'border-rose-200 bg-rose-50/10 opacity-70'
                              : 'border-slate-200 bg-slate-50/70 hover:bg-white hover:border-blue-200 hover:shadow-sm'
                          }`}
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
                            <div className="flex items-center gap-2">
                              {parsedUserScore > 0 && (
                                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-lg ${
                                  passesBudget
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : passesPaid
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-rose-100 text-rose-800'
                                }`}>
                                  {passesBudget ? 'Проходите на бюджет ✓' : passesPaid ? 'Проходите на платку' : 'Баллов недостаточно'}
                                </span>
                              )}
                              <span className="text-xs font-semibold px-2 py-1 bg-slate-200 rounded text-slate-700">
                                {program.degree} • {program.durationYears} года
                              </span>
                            </div>
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
                              <span className="text-slate-500 block">Стоимость в год</span>
                              <strong className="text-slate-800">{program.tuitionPerYear.toLocaleString('ru-RU')} ₽</strong>
                            </div>
                            <div>
                              <span className="text-slate-500 block">Предметы ЕГЭ</span>
                              <span className="text-slate-700 text-[11px]">
                                {program.subjects.map(s => s.subject).join(', ')}
                              </span>
                            </div>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: About University */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div className="prose prose-sm text-slate-700 max-w-none space-y-3">
                <h3 className="text-lg font-black text-slate-900">
                  Общая информация и история
                </h3>
                <p className="leading-relaxed">
                  {university.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-xs text-slate-500 block font-medium">Бюджетных мест в вузе</span>
                  <span className="text-lg font-black text-blue-600">{university.budgetSlotsTotal.toLocaleString('ru-RU')}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-xs text-slate-500 block font-medium">Мин. стоимость обучения</span>
                  <span className="text-lg font-black text-slate-900">{university.minTuition.toLocaleString('ru-RU')} ₽/год</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-xs text-slate-500 block font-medium">Общежитие для иногородних</span>
                  <span className="text-lg font-black text-emerald-600">
                    {university.hasDorm ? `Предоставляется (~${university.dormPriceMonthly} ₽)` : 'Нет'}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <h4 className="font-extrabold text-slate-900 uppercase tracking-wider">Контакты приёмной комиссии:</h4>
                <p className="text-slate-600">Адрес: {university.address}</p>
                {university.metroStation && <p className="text-slate-600">Ближайшее метро: {university.metroStation}</p>}
                <p className="text-slate-600">Режим работы: Пн-Пт с 09:00 до 18:00 (МСК)</p>
              </div>
            </div>
          )}

          {/* TAB 3: Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {uniReviews.length > 0 ? (
                uniReviews.map((rev) => (
                  <div key={rev.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <strong className="text-slate-900">{rev.author}</strong> ({rev.authorStatus}) • <span className="text-slate-500">{rev.facultyName}</span>
                      </div>
                      <span className="text-slate-400">{rev.date}</span>
                    </div>
                    <h4 className="text-sm font-extrabold text-slate-900">{rev.title}</h4>
                    <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">{rev.content}</p>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center text-slate-500 text-xs">
                  Для данного вуза пока нет опубликованных сливов. Вы можете прислать первый отзыв через кнопку «Прислать слив» в шапке сайта.
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Dormitory Chance Calculator */}
          {activeTab === 'dorm' && (
            <div className="space-y-6">
              <DormChanceCalculator initialUniId={university.id} />
            </div>
          )}

          {/* TAB 5: Open Days (ДОД) */}
          {activeTab === 'dod' && (
            <div className="space-y-4">
              {uniEvents.length > 0 ? (
                uniEvents.map((ev) => (
                  <div key={ev.id} className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        {ev.date} в {ev.time}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">{ev.facultyName}</h4>
                      <p className="text-xs text-slate-500">{ev.address} ({ev.format})</p>
                    </div>
                    <a
                      href={ev.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shrink-0 text-center"
                    >
                      Регистрация на ДОД
                    </a>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center text-slate-500 text-xs">
                  Ближайшие дни открытых дверей уточняются приемной комиссией.
                </div>
              )}
            </div>
          )}

          {/* TAB 6: Q&A Community */}
          {activeTab === 'qna' && (
            <div className="space-y-4">
              {uniQuestions.length > 0 ? (
                uniQuestions.map((q) => (
                  <div key={q.id} className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>{q.author}</span>
                      <span>{q.date}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{q.title}</h4>
                    <p className="text-xs text-slate-700">{q.content}</p>
                    {q.answers.map((ans, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 border border-slate-100">
                        <span className="font-bold text-blue-700">{ans.author} ({ans.role})</span>
                        <p className="text-slate-600">{ans.content}</p>
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                <div className="p-12 text-center text-slate-500 text-xs">
                  Вопросов об этом вузе пока не поступало.
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
          >
            Закрыть
          </button>
        </div>

      </div>
    </div>
  );
};
