import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Clock, 
  Eye, 
  ArrowRight, 
  X, 
  Search, 
  Share2, 
  CheckCircle2, 
  Sparkles, 
  PlusCircle, 
  Send 
} from 'lucide-react';
import { ARTICLES } from '../data/mockData';
import { Article } from '../types';

export const ArticlesSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Submit article state
  const [submitTitle, setSubmitTitle] = useState('');
  const [submitCategory, setSubmitCategory] = useState<Article['category']>('Поступление');
  const [submitAuthor, setSubmitAuthor] = useState('');
  const [submitText, setSubmitText] = useState('');
  const [isSent, setIsSent] = useState(false);

  const categories = ['Все', 'Поступление', 'ЕГЭ', 'Общежития', 'Олимпиады и БВИ', 'Студенческая жизнь'];

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((a) => {
      const matchCat = selectedCategory === 'Все' || a.category === selectedCategory;
      const matchQuery =
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  const handleShare = (art: Article) => {
    navigator.clipboard?.writeText(window.location.href);
    setToastMessage(`Ссылка на статью «${art.title}» скопирована!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSubmitArticle = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2 text-xs font-semibold animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 p-6 sm:p-10 text-white shadow-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
            <BookOpen className="w-3.5 h-3.5" />
            База знаний и блог Табитуриента
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Статьи, аналитика и руководства по поступлению
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            Авторитетные разборы приемных кампаний, экономика платки и репетиторов, олимпиады БВИ и реальная правда об общежитиях.
          </p>
        </div>

        <button
          onClick={() => { setIsSent(false); setIsSubmitModalOpen(true); }}
          className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold transition-all shadow-md flex items-center gap-2 shrink-0 hover:scale-[1.02]"
        >
          <PlusCircle className="w-4 h-4" />
          Прислать статью
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              id="article-search-input"
              placeholder="Поиск по статьям и советам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Поиск по статьям"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === c
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Articles Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((art) => (
          <div
            key={art.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-200">
                  {art.category}
                </span>
                <span className="flex items-center gap-1 font-medium text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {art.readTime}
                </span>
              </div>

              <h3 
                onClick={() => setSelectedArticle(art)}
                className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 cursor-pointer transition-colors leading-snug"
              >
                {art.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {art.excerpt}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 flex items-center gap-1 font-semibold">
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                {art.views.toLocaleString('ru-RU')}
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

      {filteredArticles.length === 0 && (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-2">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">Статей не найдено</h3>
          <p className="text-xs text-slate-500">Попробуйте изменить поисковый запрос или категорию.</p>
        </div>
      )}

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-tabi-navy to-slate-900 p-6 sm:p-8 text-white flex items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-400/30">
                    {selectedArticle.category}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {selectedArticle.readTime}
                  </span>
                  <span className="text-xs text-slate-400">• {selectedArticle.date}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {selectedArticle.title}
                </h2>
              </div>

              <button
                onClick={() => setSelectedArticle(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
                aria-label="Закрыть"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Key Takeaway Box */}
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-1 text-xs">
                <span className="font-extrabold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Главный вывод редакции:
                </span>
                <p className="text-blue-800 leading-relaxed font-medium">
                  {selectedArticle.excerpt}
                </p>
              </div>

              {/* Body paragraphs */}
              <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                {selectedArticle.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-slate-400" />
                  {selectedArticle.views.toLocaleString('ru-RU')} читателей
                </span>

                <button
                  onClick={() => handleShare(selectedArticle)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors flex items-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  Поделиться
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Submit Article Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
            <div className="bg-gradient-to-r from-tabi-navy to-slate-900 p-6 text-white flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black">Предложить статью в блог Табитуриента</h3>
                <p className="text-xs text-slate-300">Публикуем материалы студентов, преподавателей и репетиторов</p>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white"
                aria-label="Закрыть"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isSent ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-extrabold text-slate-900">Материал отправлен в редакцию!</h4>
                <p className="text-xs text-slate-600">Мы свяжемся с вами после проверки текста редакторами.</p>
                <button
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
                >
                  Закрыть
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitArticle} className="p-6 space-y-4 text-xs font-bold text-slate-700">
                <div>
                  <label htmlFor="art-title" className="block mb-1">Заголовок статьи:</label>
                  <input
                    id="art-title"
                    type="text"
                    required
                    placeholder="Например: Как я совмещал подготовку к ЕГЭ и олимпиады"
                    value={submitTitle}
                    onChange={(e) => setSubmitTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="art-cat" className="block mb-1">Категория:</label>
                    <select
                      id="art-cat"
                      value={submitCategory}
                      onChange={(e) => setSubmitCategory(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="Поступление">Поступление</option>
                      <option value="ЕГЭ">ЕГЭ</option>
                      <option value="Общежития">Общежития</option>
                      <option value="Олимпиады и БВИ">Олимпиады и БВИ</option>
                      <option value="Студенческая жизнь">Студенческая жизнь</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="art-auth" className="block mb-1">Автор / Вуз:</label>
                    <input
                      id="art-auth"
                      type="text"
                      required
                      placeholder="Иван, студент 2 курса"
                      value={submitAuthor}
                      onChange={(e) => setSubmitAuthor(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="art-text" className="block mb-1">Текст статьи или тезисы:</label>
                  <textarea
                    id="art-text"
                    required
                    rows={4}
                    placeholder="Опишите ваш личный опыт, практические советы и выводы..."
                    value={submitText}
                    onChange={(e) => setSubmitText(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" /> Отправить на модерацию
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
