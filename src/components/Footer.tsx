import React from 'react';

interface FooterProps {
  setActiveTab: (t: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-tabi-navyDark text-slate-400 text-xs border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="bg-blue-600 text-white font-mono font-black text-sm px-2 py-0.5 rounded">
                ТА
              </div>
              <span className="text-base font-extrabold text-white tracking-tight">
                ТАБИТУРИЕНТ
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Независимый информационно-аналитический проект о высшем образовании в России. Честные отзывы студентов («сливы»), проходные баллы и рейтинги.
            </p>
            <span className="text-[11px] text-slate-500 block">
              © 2014–2026 Проект «Табитуриент». Все права защищены.
            </span>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Абитуриенту
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('vuz')} className="hover:text-white transition-colors">
                  Поиск вузов России
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('specialties')} className="hover:text-white transition-colors">
                  Специальности и направления
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('calculator')} className="hover:text-white transition-colors">
                  Калькулятор баллов ЕГЭ
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('reviews')} className="hover:text-white transition-colors">
                  Сливы отзывов студентов
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('rankings')} className="hover:text-white transition-colors">
                  Сводные рейтинги вузов 2026
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Events & Guides */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Поступление 2026
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('dod')} className="hover:text-white transition-colors">
                  Дни открытых дверей (ДОД)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('qna')} className="hover:text-white transition-colors">
                  Вопросы и ответы о поступлении
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('articles')} className="hover:text-white transition-colors">
                  Статьи и советы экспертов
                </button>
              </li>
              <li>
                <span className="text-slate-500">
                  Общежития и студенческие городки
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Quality & Legal */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              О платформе
            </h4>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] leading-relaxed">
              <span className="text-emerald-400 font-bold block mb-1">
                🛡️ Модерация и достоверность
              </span>
              Все отзывы проходят проверку модераторами на спам и заказные тексты. Мнения авторов могут не совпадать с позицией редакции.
            </div>
            <div className="text-[11px] text-slate-500">
              Сделано с заботой о будущих студентах.
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
