import React, { useState } from 'react';
import { 
  MessageSquareText, 
  ThumbsUp, 
  PlusCircle, 
  Star, 
  ShieldAlert, 
  Home, 
  Briefcase, 
  UserCheck,
  X
} from 'lucide-react';
import { Review, SentimentType } from '../types';
import { REVIEWS, UNIVERSITIES } from '../data/mockData';

export const ReviewsSection: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [selectedSentiment, setSelectedSentiment] = useState<SentimentType | 'all'>('all');
  const [selectedUni, setSelectedUni] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New review form state
  const [newUniId, setNewUniId] = useState<string>(UNIVERSITIES[0].id);
  const [newFaculty, setNewFaculty] = useState<string>('');
  const [newAuthor, setNewAuthor] = useState<string>('');
  const [newAuthorStatus, setNewAuthorStatus] = useState<'Студент' | 'Выпускник' | 'Отчисленный' | 'Аноним'>('Студент');
  const [newSentiment, setNewSentiment] = useState<SentimentType>('positive');
  const [newTitle, setNewTitle] = useState<string>('');
  const [newContent, setNewContent] = useState<string>('');
  const [newTeaching, setNewTeaching] = useState<number>(5);
  const [newCorruption, setNewCorruption] = useState<'Нет' | 'Редко' | 'Да'>('Нет');
  const [newDorm, setNewDorm] = useState<number>(4);
  const [newStudentLife, setNewStudentLife] = useState<number>(5);
  const [newCareer, setNewCareer] = useState<number>(4);

  // Filter reviews
  const filteredReviews = reviewsList.filter(rev => {
    if (selectedSentiment !== 'all' && rev.sentiment !== selectedSentiment) return false;
    if (selectedUni !== 'all' && rev.universityId !== selectedUni) return false;
    return true;
  });

  const handleLike = (id: string) => {
    setReviewsList(prev => prev.map(r => r.id === id ? { ...r, likes: r.likes + 1 } : r));
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const uniObj = UNIVERSITIES.find(u => u.id === newUniId);
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      universityId: newUniId,
      universityName: uniObj ? uniObj.name : 'ВУЗ',
      facultyName: newFaculty.trim() || 'Основной факультет',
      author: newAuthor.trim() || 'Анонимный студент',
      authorStatus: newAuthorStatus,
      sentiment: newSentiment,
      date: 'Сегодня, только что',
      title: newTitle.trim(),
      content: newContent.trim(),
      ratings: {
        teaching: newTeaching,
        corruption: newCorruption,
        dormitory: newDorm,
        studentLife: newStudentLife,
        career: newCareer
      },
      likes: 1,
      commentsCount: 0
    };

    setReviewsList([newRev, ...reviewsList]);
    setIsModalOpen(false);
    // Reset form
    setNewTitle('');
    setNewContent('');
    setNewFaculty('');
    setNewAuthor('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header & Write Review Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-2">
            <MessageSquareText className="w-3.5 h-3.5" />
            Честные отзывы без цензуры
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            «Сливы» и отзывы студентов о вузах
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            Реальные истории об учебе, преподавателях, сессиях, взятках и общежитиях из первых уст.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          Написать свой «слив»
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        
        {/* Sentiment Filter Tabs */}
        <div className="flex items-center space-x-1.5 overflow-x-auto">
          <button
            onClick={() => setSelectedSentiment('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              selectedSentiment === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Все отзывы ({reviewsList.length})
          </button>
          <button
            onClick={() => setSelectedSentiment('positive')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
              selectedSentiment === 'positive'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Положительные ({reviewsList.filter(r => r.sentiment === 'positive').length})
          </button>
          <button
            onClick={() => setSelectedSentiment('neutral')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
              selectedSentiment === 'neutral'
                ? 'bg-amber-500 text-white'
                : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            Нейтральные ({reviewsList.filter(r => r.sentiment === 'neutral').length})
          </button>
          <button
            onClick={() => setSelectedSentiment('negative')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
              selectedSentiment === 'negative'
                ? 'bg-rose-600 text-white'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            Отрицательные ({reviewsList.filter(r => r.sentiment === 'negative').length})
          </button>
        </div>

        {/* University Filter Select */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-500 hidden sm:inline">Вуз:</span>
          <select
            value={selectedUni}
            onChange={(e) => setSelectedUni(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Все университеты</option>
            {UNIVERSITIES.map(u => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Reviews Feed */}
      <div className="space-y-4">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((rev) => {
            const sentimentBg = rev.sentiment === 'positive' 
              ? 'border-emerald-200 bg-white' 
              : rev.sentiment === 'neutral'
              ? 'border-amber-200 bg-white'
              : 'border-rose-200 bg-white';

            return (
              <div 
                key={rev.id}
                className={`rounded-3xl border p-6 shadow-sm hover:shadow-card-hover transition-all ${sentimentBg}`}
              >
                {/* Review Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-sm">
                      {rev.author[0] || 'А'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">{rev.author}</span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {rev.authorStatus}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500 font-medium">
                        {rev.universityName} • {rev.facultyName}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 text-xs text-slate-400">
                    <span>{rev.date}</span>
                    <span className={`px-2.5 py-0.5 rounded-full font-bold ${
                      rev.sentiment === 'positive' ? 'bg-emerald-100 text-emerald-800' :
                      rev.sentiment === 'neutral' ? 'bg-amber-100 text-amber-800' :
                      'bg-rose-100 text-rose-800'
                    }`}>
                      {rev.sentiment === 'positive' ? 'Рекомендует' : rev.sentiment === 'neutral' ? 'Нейтрально' : 'Не рекомендует'}
                    </span>
                  </div>
                </div>

                {/* Title & Content */}
                <div className="py-3">
                  <h4 className="text-base font-extrabold text-slate-900 mb-2">
                    {rev.title}
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed font-normal whitespace-pre-line">
                    {rev.content}
                  </p>
                </div>

                {/* Rating Criteria Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-3 bg-slate-50 rounded-2xl text-xs font-medium border border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-amber-500" />
                    <span>Преподавание: <strong>{rev.ratings.teaching}/5</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Взятки: <strong>{rev.ratings.corruption}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Home className="w-3.5 h-3.5 text-blue-500" />
                    <span>Общага: <strong>{rev.ratings.dormitory}/5</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-purple-500" />
                    <span>Движуха: <strong>{rev.ratings.studentLife}/5</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Работа: <strong>{rev.ratings.career}/5</strong></span>
                  </div>
                </div>

                {/* Action Bar (Upvote / Share) */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => handleLike(rev.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 transition-colors"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    Полезный отзыв ({rev.likes})
                  </button>
                  <span className="text-xs text-slate-400 font-medium">
                    Проверенный отзыв студента
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 text-sm">
            Отзывов по выбранным фильтрам не найдено.
          </div>
        )}
      </div>

      {/* Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
            
            <div className="p-5 bg-tabi-navy text-white flex items-center justify-between shrink-0">
              <h3 className="text-lg font-bold">Написать честный отзыв («слив»)</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddReview} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Университет
                </label>
                <select
                  value={newUniId}
                  onChange={(e) => setNewUniId(e.target.value)}
                  className="w-full text-xs font-semibold bg-slate-50 border border-slate-300 rounded-xl p-2.5"
                >
                  {UNIVERSITIES.map(u => (
                    <option key={u.id} value={u.id}>{u.name} — {u.fullName}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Факультет / Институт
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Например: ФКН, ИУ, Юрфак"
                    value={newFaculty}
                    onChange={(e) => setNewFaculty(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ваш статус
                  </label>
                  <select
                    value={newAuthorStatus}
                    onChange={(e: any) => setNewAuthorStatus(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5"
                  >
                    <option value="Студент">Студент</option>
                    <option value="Выпускник">Выпускник</option>
                    <option value="Отчисленный">Отчисленный</option>
                    <option value="Аноним">Аноним</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Общий вердикт
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewSentiment('positive')}
                    className={`py-2 text-xs font-bold rounded-xl border ${
                      newSentiment === 'positive'
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    👍 Рекомендую
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewSentiment('neutral')}
                    className={`py-2 text-xs font-bold rounded-xl border ${
                      newSentiment === 'neutral'
                        ? 'bg-amber-500 text-white border-amber-500'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    😐 Нейтрально
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewSentiment('negative')}
                    className={`py-2 text-xs font-bold rounded-xl border ${
                      newSentiment === 'negative'
                        ? 'bg-rose-600 text-white border-rose-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    👎 Не рекомендую
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Заголовок отзыва
                </label>
                <input
                  type="text"
                  required
                  placeholder="Коротко о главном впечатлении"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Текст отзыва
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Расскажите честно: как проходят пары, валят ли на сессии, в каком состоянии общага..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5"
                />
              </div>

              {/* Sliders for Criteria */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs">
                  <span>Качество преподавания: <strong>{newTeaching}/5</strong></span>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={newTeaching}
                    onChange={(e) => setNewTeaching(parseInt(e.target.value))}
                    className="w-32 accent-blue-600"
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span>Общежитие: <strong>{newDorm}/5</strong></span>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={newDorm}
                    onChange={(e) => setNewDorm(parseInt(e.target.value))}
                    className="w-32 accent-blue-600"
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span>Студенческая жизнь: <strong>{newStudentLife}/5</strong></span>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={newStudentLife}
                    onChange={(e) => setNewStudentLife(parseInt(e.target.value))}
                    className="w-32 accent-blue-600"
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span>Карьера / работа: <strong>{newCareer}/5</strong></span>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={newCareer}
                    onChange={(e) => setNewCareer(parseInt(e.target.value))}
                    className="w-32 accent-blue-600"
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span>Взятки / Коррупция:</span>
                  <div className="space-x-1.5">
                    {(['Нет', 'Редко', 'Да'] as const).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setNewCorruption(opt)}
                        className={`px-2.5 py-1 text-xs rounded-lg border font-semibold ${
                          newCorruption === opt ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Опубликовать отзыв
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
