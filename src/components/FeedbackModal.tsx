import React, { useState } from 'react';
import { 
  X, 
  MessageSquare, 
  ShieldAlert, 
  FileEdit, 
  HelpCircle, 
  CheckCircle2, 
  Send 
} from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [topic, setTopic] = useState<'moderation' | 'error' | 'partnership' | 'other'>('moderation');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [urlRef, setUrlRef] = useState('');
  const [message, setMessage] = useState('');
  const [ticketId, setTicketId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generated = `TABI-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(generated);
  };

  const handleReset = () => {
    setTicketId(null);
    setMessage('');
    setName('');
    setEmail('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-tabi-navy to-slate-900 p-6 text-white flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" /> Редакция Табитуриента
            </span>
            <h2 className="text-lg sm:text-xl font-black">
              Обратная связь и модерация
            </h2>
            <p className="text-xs text-slate-300">
              Служба рассмотрения обращений студентов, абитуриентов и представителей вузов
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {ticketId ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900">Обращение зарегистрировано!</h3>
            <div className="p-3 rounded-2xl bg-slate-100 text-slate-800 font-mono text-sm font-bold inline-block">
              Номер тикета: #{ticketId}
            </div>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              Мы получили ваше сообщение. Срок рассмотрения официальных запросов — до 24 рабочих часов. Ответ будет направлен на <strong>{email}</strong>.
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-sm"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            {/* Topic selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Тема обращения:</label>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setTopic('moderation')}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    topic === 'moderation'
                      ? 'border-blue-600 bg-blue-50/50 text-blue-700 ring-1 ring-blue-600'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <ShieldAlert className="w-4 h-4 text-blue-600 mb-1" />
                  Модерация отзыва
                </button>
                <button
                  type="button"
                  onClick={() => setTopic('error')}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    topic === 'error'
                      ? 'border-blue-600 bg-blue-50/50 text-blue-700 ring-1 ring-blue-600'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <FileEdit className="w-4 h-4 text-amber-600 mb-1" />
                  Ошибка в данных
                </button>
                <button
                  type="button"
                  onClick={() => setTopic('partnership')}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    topic === 'partnership'
                      ? 'border-blue-600 bg-blue-50/50 text-blue-700 ring-1 ring-blue-600'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mb-1" />
                  Сотрудничество
                </button>
                <button
                  type="button"
                  onClick={() => setTopic('other')}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    topic === 'other'
                      ? 'border-blue-600 bg-blue-50/50 text-blue-700 ring-1 ring-blue-600'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <HelpCircle className="w-4 h-4 text-slate-600 mb-1" />
                  Другой вопрос
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="fb-name" className="text-[11px] font-bold text-slate-700 block mb-1">
                  Ваше имя:
                </label>
                <input
                  id="fb-name"
                  type="text"
                  required
                  placeholder="Иван Петров"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="fb-email" className="text-[11px] font-bold text-slate-700 block mb-1">
                  Email для ответа:
                </label>
                <input
                  id="fb-email"
                  type="email"
                  required
                  placeholder="ivan@mail.ru"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="fb-url" className="text-[11px] font-bold text-slate-700 block mb-1">
                Ссылка на отзыв или вуз (если применимо):
              </label>
              <input
                id="fb-url"
                type="text"
                placeholder="https://tabiturient.ru/..."
                value={urlRef}
                onChange={(e) => setUrlRef(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="fb-msg" className="text-[11px] font-bold text-slate-700 block mb-1">
                Суть обращения:
              </label>
              <textarea
                id="fb-msg"
                required
                rows={3}
                placeholder="Опишите подробно ваш вопрос или приложите доказательства недостоверности сведений..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" /> Отправить обращение
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
