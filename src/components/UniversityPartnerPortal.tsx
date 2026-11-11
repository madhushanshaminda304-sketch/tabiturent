import React, { useState } from 'react';
import { Building2, ShieldCheck, MessageSquare, PlusCircle, CheckCircle, Send } from 'lucide-react';
import { UNIVERSITIES } from '../data/mockData';

export const UniversityPartnerPortal: React.FC = () => {
  const [selectedUni, setSelectedUni] = useState(UNIVERSITIES[0].id);
  const [replyText, setReplyText] = useState('');
  const [submittedReply, setSubmittedReply] = useState(false);

  const [dodTitle, setDodTitle] = useState('');
  const [dodDate, setDodDate] = useState('');
  const [dodSubmitted, setDodSubmitted] = useState(false);

  const currentUni = UNIVERSITIES.find(u => u.id === selectedUni) || UNIVERSITIES[0];

  const handlePostReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setSubmittedReply(true);
    setTimeout(() => {
      setSubmittedReply(false);
      setReplyText('');
    }, 3000);
  };

  const handlePostDod = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dodTitle.trim() || !dodDate.trim()) return;
    setDodSubmitted(true);
    setTimeout(() => {
      setDodSubmitted(false);
      setDodTitle('');
      setDodDate('');
    }, 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 mb-2">
          <Building2 className="w-3.5 h-3.5" />
          Сотрудничество с университетами
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Кабинет официального представителя вуза
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
          Управляйте репутацией университета на крупнейшей независимой площадке абитуриентов России: отвечайте на отзывы, публикуйте дни открытых дверей и отслеживайте статистику.
        </p>
      </div>

      {/* Select active university */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">{currentUni.logo}</span>
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase">Выбранный вуз:</span>
            <h3 className="text-base font-extrabold text-slate-900">{currentUni.name}</h3>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-600">Переключить вуз:</span>
          <select
            value={selectedUni}
            onChange={(e) => setSelectedUni(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
          >
            {UNIVERSITIES.map(u => (
              <option key={u.id} value={u.id}>{u.name} — {u.fullName}</option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
          <span className="text-xs text-slate-500 font-medium block">Просмотров карточки за месяц</span>
          <strong className="text-2xl font-black text-slate-900 mt-1 block">48 290</strong>
          <span className="text-[11px] text-emerald-600 font-bold">↑ +14% к прошлому году</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
          <span className="text-xs text-slate-500 font-medium block">Добавлений в закладки</span>
          <strong className="text-2xl font-black text-blue-600 mt-1 block">3 140</strong>
          <span className="text-[11px] text-slate-500 font-medium">Целевые абитуриенты</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
          <span className="text-xs text-slate-500 font-medium block">Одобрение студентов</span>
          <strong className="text-2xl font-black text-emerald-600 mt-1 block">{currentUni.studentSatisfaction}%</strong>
          <span className="text-[11px] text-slate-500 font-medium">{currentUni.reviewsCount} отзывов</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
          <span className="text-xs text-slate-500 font-medium block">Статус верификации</span>
          <strong className="text-sm font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 inline-flex items-center gap-1 mt-2">
            <ShieldCheck className="w-4 h-4" />
            Верифицирован
          </strong>
        </div>
      </div>

      {/* Tool 1: Post Official Response to Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">
              Официальный ответ на отзывы студентов
            </h3>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            Ответы от верифицированного представителя публикуются с синей галочкой и помогают развеять сомнения будущих абитуриентов.
          </p>

          <form onSubmit={handlePostReply} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Текст официального комментария
              </label>
              <textarea
                required
                rows={3}
                placeholder="Укажите позицию администрации, проведенную проверку или улучшения в кампусе..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {submittedReply && (
              <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Официальный ответ опубликован под отзывами вуза!
              </div>
            )}

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              Опубликовать ответ вуза
            </button>
          </form>
        </div>

        {/* Tool 2: Publish DOD announcement */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <PlusCircle className="w-5 h-5 text-purple-600" />
            <h3 className="text-base font-bold text-slate-900">
              Анонсировать день открытых дверей (ДОД)
            </h3>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            Анонс появится в общем календаре ДОД и в профиле университета с прямой ссылкой на регистрацию.
          </p>

          <form onSubmit={handlePostDod} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Название мероприятия / Факультет
              </label>
              <input
                type="text"
                required
                placeholder="Например: День открытых дверей Института IT и Робототехники"
                value={dodTitle}
                onChange={(e) => setDodTitle(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Дата и время
              </label>
              <input
                type="text"
                required
                placeholder="Например: 15 декабря 2026, 12:00 (МСК)"
                value={dodDate}
                onChange={(e) => setDodDate(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5"
              />
            </div>

            {dodSubmitted && (
              <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Мероприятие успешно добавлено в календарь ДОД!
              </div>
            )}

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Опубликовать ДОД
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
