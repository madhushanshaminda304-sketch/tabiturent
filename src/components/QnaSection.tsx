import React, { useState } from 'react';
import { HelpCircle, MessageSquare, Eye, PlusCircle, Search, X } from 'lucide-react';
import { QNA_QUESTIONS } from '../data/mockData';
import { QnaQuestion } from '../types';

export const QnaSection: React.FC = () => {
  const [questions, setQuestions] = useState<QnaQuestion[]>(QNA_QUESTIONS);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New question form
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newUniName, setNewUniName] = useState('');
  const [newAuthor, setNewAuthor] = useState('');

  const filtered = questions.filter(q => {
    if (search && !q.title.toLowerCase().includes(search.toLowerCase()) && !q.content.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newQ: QnaQuestion = {
      id: `q-${Date.now()}`,
      author: newAuthor.trim() || 'Абитуриент-2026',
      date: 'Сегодня, только что',
      universityName: newUniName.trim() || undefined,
      title: newTitle.trim(),
      content: newContent.trim(),
      views: 1,
      answersCount: 0,
      answers: []
    };

    setQuestions([newQ, ...questions]);
    setIsModalOpen(false);
    setNewTitle('');
    setNewContent('');
    setNewUniName('');
    setNewAuthor('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            Сообщество поступающих
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Вопросы и ответы о поступлении в вузы
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            Задайте вопрос о баллах, общежитиях, олимпиадах или правилах приема — студенты и эксперты ответят.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          Задать вопрос
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск по вопросам абитуриентов..."
          className="w-full text-xs font-medium pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
      </div>

      {/* Questions Stream */}
      <div className="space-y-4">
        {filtered.map(q => (
          <div
            key={q.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-card-hover transition-all space-y-3"
          >
            <div className="flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px]">
                  {q.author[0] || 'А'}
                </div>
                <span className="font-bold text-slate-900">{q.author}</span>
                <span className="text-slate-400">• {q.date}</span>
                {q.universityName && (
                  <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-semibold text-[11px]">
                    {q.universityName}
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-3 text-slate-400 font-medium">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  {q.views}
                </span>
                <span className="flex items-center gap-1 text-blue-600 font-bold">
                  <MessageSquare className="w-3.5 h-3.5" />
                  {q.answersCount}
                </span>
              </div>
            </div>

            <h3 className="text-base font-extrabold text-slate-900">
              {q.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal whitespace-pre-line">
              {q.content}
            </p>

            {/* Answers */}
            {q.answers.length > 0 && (
              <div className="pt-3 border-t border-slate-100 space-y-2.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Ответы студентов и экспертов:
                </span>
                {q.answers.map((ans, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-bold text-slate-900">{ans.author}</span>
                        <span className="text-[10px] px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded font-semibold">
                          {ans.role}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">{ans.date}</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed font-normal">{ans.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal to Ask Question */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto">
            <div className="p-5 bg-tabi-navy text-white flex items-center justify-between">
              <h3 className="text-base font-bold">Задать вопрос о поступлении</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddQuestion} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Университет (если вопрос о конкретном вузе)
                </label>
                <input
                  type="text"
                  placeholder="Например: МЭИ, ВШЭ, Бауманка (необязательно)"
                  value={newUniName}
                  onChange={(e) => setNewUniName(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Суть вопроса (заголовок)
                </label>
                <input
                  type="text"
                  required
                  placeholder="Например: Хватит ли 250 баллов на бюджет в МЭИ?"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Подробное описание ситуации
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Опишите свои баллы по предметам, индивидуальные достижения, выбранные факультеты..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
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
                  Опубликовать вопрос
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
