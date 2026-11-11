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
              Независимый информационно-аналитический проект о высшем образовании в России. Честные отзывы студентов («сливы»), проходные баллы, умный подбор и рейтинги.
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
                <button onClick={() => setActiveTab('podbor')} className="hover:text-white transition-colors">
                  Умный подбор вуза
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('calculator')} className="hover:text-white transition-colors">
                  Калькулятор баллов ЕГЭ
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('calculator_pay')} className="hover:text-white transition-colors">
                  Платное обучение и госкредит 3%
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('100program')} className="hover:text-white transition-colors">
                  Топ-100 программ России
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('reviews')} className="hover:text-white transition-colors">
                  Сливы отзывов студентов
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dorms')} className="hover:text-white transition-colors">
                  Инспектор общежитий
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Events & Guides */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Инструменты и сервисы
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('rankings')} className="hover:text-white transition-colors">
                  Сводные рейтинги вузов 2026
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('map')} className="hover:text-white transition-colors">
                  Карта кампусов и метро
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('specialties')} className="hover:text-white transition-colors">
                  Специальности (ОКСО)
                </button>
              </li>
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
                  Статьи и гайды
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('premium')} className="hover:text-white transition-colors">
                  Премиум трекер согласий
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Quality & University Reps */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Представителям вузов
            </h4>
            <button
              onClick={() => setActiveTab('vuzam')}
              className="w-full p-3 bg-slate-900 hover:bg-slate-800 text-left rounded-xl border border-slate-800 text-[11px] leading-relaxed transition-colors block"
            >
              <span className="text-blue-400 font-bold block mb-1">
                🏛️ Кабинет вуза
              </span>
              Управление профилем, официальные ответы на отзывы студентов и размещение ДОД.
            </button>
            <div className="text-[11px] text-slate-500 pt-2">
              Все отзывы модерируются. Сделано с заботой об абитуриентах.
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
