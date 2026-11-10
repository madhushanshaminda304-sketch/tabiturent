import React, { useState } from 'react';
import { BookOpen, Clock, Eye, ArrowRight, X } from 'lucide-react';
import { ARTICLES } from '../data/mockData';
import { Article } from '../types';

export const ArticlesSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');

  const categories = ['Все', 'Поступление', 'ЕГЭ', 'Общежития'];

  const filtered = ARTICLES.filter(a => {
    if (selectedCategory !== 'Все' && a.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          База знаний абитуриента
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Статьи, советы и руководства по поступлению
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
          Полезные аналитические материалы: даты приемной кампании, расчет бюджетов и лайфхаки для первокурсников.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-center space-x-2">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setSelectedCategory(c)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === c
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Articles Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {filtered.map(art => (
          <div
            key={art.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                <span className="font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  {art.category}
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <Clock className="w-3 h-3" />
                  {art.readTime}
                </span>
              </div>

              <h3 
                onClick={() => setSelectedArticle(art)}
                className="text-base font-extrabold text-slate-900 mb-2 leading-snug hover:text-blue-600 cursor-pointer transition-colors"
              >
                {art.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed font-normal line-clamp-3">
                {art.excerpt}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1 font-medium">
                <Eye className="w-3.5 h-3.5" />
                {art.views}
              </span>
              <button
                onClick={() => setSelectedArticle(art)}
                className="font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                Читать статью
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[90vh] flex flex-col">
            <div className="p-6 bg-tabi-navy text-white flex items-start justify-between gap-4 shrink-0">
              <div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-600 text-white mb-2 inline-block">
                  {selectedArticle.category}
                </span>
                <h3 className="text-xl font-bold leading-snug">{selectedArticle.title}</h3>
                <span className="text-xs text-slate-400 mt-1 block">
                  {selectedArticle.date} • Время чтения: {selectedArticle.readTime}
                </span>
              </div>
              <button 
                onClick={() => setSelectedArticle(null)}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-sm text-slate-700 leading-relaxed font-normal flex-1">
              <p className="text-base font-semibold text-slate-900 border-l-4 border-blue-600 pl-3">
                {selectedArticle.excerpt}
              </p>
              {selectedArticle.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
