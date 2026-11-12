import React, { useState, useMemo, useEffect } from 'react';
import { 
  MessageSquareText, 
  ThumbsUp, 
  PlusCircle, 
  Star, 
  ShieldAlert, 
  Home, 
  Briefcase, 
  UserCheck, 
  Building2, 
  ChevronDown, 
  ChevronUp, 
  Send, 
  MessageCircle,
  Search,
  ArrowUpDown,
  X
} from 'lucide-react';
import { Review, SentimentType, ReviewComment } from '../types';
import { UNIVERSITIES } from '../data/mockData';
import { SubmitReviewModal } from './SubmitReviewModal';
import { reviewService } from '../services/reviewService';

export const ReviewsSection: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<Review[]>(() => reviewService.getAll());

  useEffect(() => {
    return reviewService.subscribe(setReviewsList);
  }, []);

  const [selectedSentiment, setSelectedSentiment] = useState<SentimentType | 'all'>('all');
  const [selectedUni, setSelectedUni] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'helpful' | 'newest' | 'official'>('helpful');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [expandedDiscussionId, setExpandedDiscussionId] = useState<string | null>(null);

  // New comment input state per review
  const [commentText, setCommentText] = useState<{ [reviewId: string]: string }>({});
  const [commentAuthor, setCommentAuthor] = useState<{ [reviewId: string]: string }>({});

  // Filter and sort reviews
  const filteredReviews = useMemo(() => {
    return reviewsList
      .filter((rev) => {
        if (selectedSentiment !== 'all' && rev.sentiment !== selectedSentiment) return false;
        if (selectedUni !== 'all' && rev.universityId !== selectedUni) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = rev.title.toLowerCase().includes(q);
          const matchContent = rev.content.toLowerCase().includes(q);
          const matchAuthor = rev.author.toLowerCase().includes(q);
          const matchUni = rev.universityName.toLowerCase().includes(q);
          const matchFaculty = rev.facultyName.toLowerCase().includes(q);
          if (!matchTitle && !matchContent && !matchAuthor && !matchUni && !matchFaculty) return false;
        }
        if (sortBy === 'official' && !rev.officialReply) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'helpful') {
          return b.likes - a.likes;
        }
        if (sortBy === 'official') {
          return (b.officialReply ? 1 : 0) - (a.officialReply ? 1 : 0);
        }
        // newest (by id or order)
        return 0;
      });
  }, [reviewsList, selectedSentiment, selectedUni, searchQuery, sortBy]);

  const hasActiveFilters = selectedSentiment !== 'all' || selectedUni !== 'all' || searchQuery.trim() !== '' || sortBy !== 'helpful';

  const resetFilters = () => {
    setSelectedSentiment('all');
    setSelectedUni('all');
    setSearchQuery('');
    setSortBy('helpful');
  };

  const handleLike = (id: string) => {
    reviewService.likeReview(id);
  };

  const handleAddComment = (reviewId: string) => {
    const text = commentText[reviewId]?.trim();
    if (!text) return;

    const author = commentAuthor[reviewId]?.trim() || 'Аноним';
    const newComment: ReviewComment = {
      id: `c-user-${Date.now()}`,
      author,
      status: 'Студент / Абитуриент',
      date: 'Только что',
      text,
      likes: 1
    };

    reviewService.addComment(reviewId, newComment);
    setCommentText((prev) => ({ ...prev, [reviewId]: '' }));
  };

  const handleCreatedReview = (newRev: Review) => {
    reviewService.addReview(newRev);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fade-in">
      
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
          onClick={() => setIsSubmitModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md shrink-0 hover:scale-[1.02]"
        >
          <PlusCircle className="w-4 h-4" />
          Прислать слив о своем вузе
        </button>
      </div>

      {/* Filter, Search, and Sorting Bar */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-4">
        
        {/* Row 1: Search & University & Sorting */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Keyword Search */}
          <div className="relative md:col-span-5">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по тексту, автору или факультету..."
              className="w-full text-xs font-medium pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 p-0.5"
                title="Очистить поиск"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* University Selector */}
          <div className="md:col-span-4">
            <label htmlFor="uni-filter-select" className="sr-only">Фильтр по вузу</label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <select
                id="uni-filter-select"
                value={selectedUni}
                onChange={(e) => setSelectedUni(e.target.value)}
                className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Все университеты</option>
                {UNIVERSITIES.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sorting Dropdown */}
          <div className="md:col-span-3">
            <label htmlFor="sort-reviews-select" className="sr-only">Сортировка отзывов</label>
            <div className="relative">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <select
                id="sort-reviews-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="helpful">Сначала полезные</option>
                <option value="newest">Сначала новые</option>
                <option value="official">С официальным ответом</option>
              </select>
            </div>
          </div>

        </div>

        {/* Row 2: Sentiment Switcher & Reset */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
          
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedSentiment('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedSentiment === 'all'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Все ({reviewsList.length})
            </button>
            <button
              onClick={() => setSelectedSentiment('positive')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedSentiment === 'positive'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              Положительные
            </button>
            <button
              onClick={() => setSelectedSentiment('neutral')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedSentiment === 'neutral'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
              }`}
            >
              Нейтральные
            </button>
            <button
              onClick={() => setSelectedSentiment('negative')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedSentiment === 'negative'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
              }`}
            >
              Отрицательные
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
            <span>Найдено: <strong className="text-slate-900 font-bold">{filteredReviews.length}</strong></span>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-rose-600 hover:text-rose-800 font-bold transition-colors"
              >
                Сбросить фильтры
              </button>
            )}
          </div>

        </div>

      </div>

      {/* Reviews Stream */}
      <div className="space-y-4">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((rev) => {
            const isDiscussionExpanded = expandedDiscussionId === rev.id;
            const commentsList = rev.comments || [];

            return (
              <div 
                key={rev.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all space-y-4"
              >
                {/* Review Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center font-bold text-blue-700 text-sm">
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
                <div className="space-y-2">
                  <h4 className="text-base font-extrabold text-slate-900">
                    {rev.title}
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed font-normal whitespace-pre-line">
                    {rev.content}
                  </p>
                </div>

                {/* Multi-criteria scores */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-3 bg-slate-50 rounded-2xl text-xs font-medium border border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
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

                {/* Official University Reply (if present) */}
                {rev.officialReply && (
                  <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-1 text-xs">
                    <div className="flex items-center justify-between text-blue-900 font-bold">
                      <span className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-blue-600" />
                        {rev.officialReply.representativeName} ({rev.officialReply.role})
                      </span>
                      <span className="text-[11px] text-blue-700 font-medium">{rev.officialReply.date}</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">{rev.officialReply.text}</p>
                  </div>
                )}

                {/* Action Bar (Upvote / Discussions toggle) */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleLike(rev.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 transition-colors"
                      aria-label="Полезный отзыв"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      Полезный отзыв ({rev.likes})
                    </button>

                    <button
                      onClick={() => setExpandedDiscussionId(isDiscussionExpanded ? null : rev.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      Обсуждение ({commentsList.length || rev.commentsCount})
                      {isDiscussionExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <span className="text-[11px] text-slate-400 font-semibold hidden sm:inline">
                    Проверенный отзыв студента
                  </span>
                </div>

                {/* Expandable Discussion Thread */}
                {isDiscussionExpanded && (
                  <div className="pt-3 border-t border-slate-100 space-y-3 bg-slate-50/60 p-4 rounded-2xl animate-fade-in">
                    <h5 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                      Комментарии студентов ({commentsList.length}):
                    </h5>

                    {commentsList.length > 0 ? (
                      <div className="space-y-2.5">
                        {commentsList.map((c) => (
                          <div key={c.id} className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
                            <div className="flex items-center justify-between text-slate-500 text-[11px]">
                              <span className="font-bold text-slate-800">{c.author} <span className="font-normal text-slate-500">({c.status})</span></span>
                              <span>{c.date}</span>
                            </div>
                            <p className="text-slate-700 leading-snug">{c.text}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500 italic">Пока никто не оставил комментариев. Будьте первым!</p>
                    )}

                    {/* New Comment Input */}
                    <div className="pt-2 space-y-2">
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                        <input
                          type="text"
                          placeholder="Ваше имя / статус..."
                          value={commentAuthor[rev.id] || ''}
                          onChange={(e) => setCommentAuthor({ ...commentAuthor, [rev.id]: e.target.value })}
                          className="sm:col-span-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          placeholder="Написать ответ к отзыву..."
                          value={commentText[rev.id] || ''}
                          onChange={(e) => setCommentText({ ...commentText, [rev.id]: e.target.value })}
                          onKeyDown={(e) => { if (e.key === 'Enter') handleAddComment(rev.id); }}
                          className="sm:col-span-3 px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => handleAddComment(rev.id)}
                          className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
                        >
                          <Send className="w-3 h-3" /> Отправить ответ
                        </button>
                      </div>
                    </div>

                  </div>
                )}

              </div>
            );
          })
        ) : (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 text-sm">
            Отзывов по выбранным фильтрам не найдено.
          </div>
        )}
      </div>

      {/* Structured Submit Review Modal */}
      <SubmitReviewModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSubmitReview={handleCreatedReview}
      />

    </div>
  );
};
