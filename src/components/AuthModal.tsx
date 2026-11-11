import React, { useState } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'login' | 'register' | 'remind'>('login');
  const [emailOrSnils, setEmailOrSnils] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
      onClose();
    }, 2000);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Успешный вход в личный кабинет абитуриента!');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Регистрация завершена! Персональный профиль создан.');
  };

  const handleRemindSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Инструкция по сбросу пароля отправлена на ${emailOrSnils}!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Toast */}
        {toastMessage && (
          <div className="p-4 bg-emerald-600 text-white text-xs font-bold text-center flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-tabi-navy to-slate-900 text-white flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold">
              {mode === 'login' ? 'Вход в личный кабинет' : mode === 'register' ? 'Регистрация абитуриента' : 'Восстановление доступа'}
            </h3>
            <span className="text-[11px] text-slate-300 font-medium">Проект «Табитуриент»</span>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 rounded-lg text-slate-400 hover:text-white"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          
          {/* Quick OAuth (Telegram, VK, Yandex) */}
          {mode === 'login' && (
            <div className="space-y-2 pb-3 border-b border-slate-100">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block text-center">
                Быстрый вход в один клик:
              </span>
              <button
                type="button"
                onClick={() => showToast('Вход через Telegram ID успешно выполнен!')}
                className="w-full py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" /> Войти через Telegram
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => showToast('Вход через VK ID успешно выполнен!')}
                  className="py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-sm"
                >
                  VK ID
                </button>
                <button
                  type="button"
                  onClick={() => showToast('Вход через Яндекс ID успешно выполнен!')}
                  className="py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-sm"
                >
                  Яндекс
                </button>
              </div>
            </div>
          )}

          {/* Form */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Email или СНИЛС:</label>
                <input
                  type="text"
                  required
                  placeholder="ivan@mail.ru или 123-456-789 00"
                  value={emailOrSnils}
                  onChange={(e) => setEmailOrSnils(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-bold text-slate-700">Пароль:</label>
                  <button
                    type="button"
                    onClick={() => setMode('remind')}
                    className="text-[10px] font-bold text-blue-600 hover:text-blue-800"
                  >
                    Забыли пароль?
                  </button>
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-sm"
              >
                Войти
              </button>
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="text-xs font-bold text-slate-600 hover:text-blue-600"
                >
                  Нет аккаунта? <u>Зарегистрироваться</u>
                </button>
              </div>
            </form>
          )}

          {/* Register Mode */}
          {mode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Ваше имя:</label>
                <input
                  type="text"
                  required
                  placeholder="Александр"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Email:</label>
                <input
                  type="email"
                  required
                  placeholder="alex@mail.ru"
                  value={emailOrSnils}
                  onChange={(e) => setEmailOrSnils(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Придумайте пароль:</label>
                <input
                  type="password"
                  required
                  placeholder="Не менее 6 символов"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-sm"
              >
                Создать аккаунт
              </button>
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-xs font-bold text-slate-600 hover:text-blue-600"
                >
                  Уже есть аккаунт? <u>Войти</u>
                </button>
              </div>
            </form>
          )}

          {/* Remind Password Mode */}
          {mode === 'remind' && (
            <form onSubmit={handleRemindSubmit} className="space-y-3">
              <p className="text-xs text-slate-600">
                Введите ваш Email или номер СНИЛС, указанный при регистрации, и мы отправим ссылку для восстановления доступа.
              </p>
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Email или СНИЛС:</label>
                <input
                  type="text"
                  required
                  placeholder="ivan@mail.ru или СНИЛС"
                  value={emailOrSnils}
                  onChange={(e) => setEmailOrSnils(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-sm"
              >
                Отправить ссылку для сброса
              </button>
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-xs font-bold text-slate-600 hover:text-blue-600"
                >
                  Вернуться ко входу
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
