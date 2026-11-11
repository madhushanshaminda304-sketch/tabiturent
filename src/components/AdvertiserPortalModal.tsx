import React, { useState } from 'react';
import { 
  X, 
  Megaphone, 
  TrendingUp, 
  Users, 
  Eye, 
  CheckCircle2, 
  Sparkles, 
  Send
} from 'lucide-react';

interface AdvertiserPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdvertiserPortalModal: React.FC<AdvertiserPortalModalProps> = ({
  isOpen,
  onClose
}) => {
  const [selectedFormat, setSelectedFormat] = useState<string>('priority');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [institutionName, setInstitutionName] = useState('');
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const packages = [
    {
      id: 'priority',
      title: 'Приоритетное размещение вуза',
      price: '35 000 ₽/мес',
      desc: 'Закрепление карточки вуза в топе выдачи региона и направлений, золотой бейдж «Рекомендуем».',
      views: '500 000+ показов'
    },
    {
      id: 'calculator',
      title: 'Спонсорство Калькулятора ЕГЭ',
      price: '45 000 ₽/мес',
      desc: 'Интеграция ваших программ в результаты подбора при совпадении набора предметов ЕГЭ.',
      views: '800 000+ показов'
    },
    {
      id: 'telegram',
      title: 'Промо-пост в Telegram (140k)',
      price: '25 000 ₽/пост',
      desc: 'Публикация в официальном канале Табитуриента, охват 35 000+ целевых абитуриентов за 24 часа.',
      views: '35 000+ просмотров'
    },
    {
      id: 'all_inclusive',
      title: 'Комплексный пакет «Приемная кампания 2026»',
      price: '85 000 ₽/мес',
      desc: 'Полное брендирование профиля, приоритет в поиске, интеграция в калькуляторы и 2 поста в Telegram.',
      views: '1 500 000+ показов'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  const handleReset = () => {
    setIsSent(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-tabi-navy to-slate-900 p-6 sm:p-8 text-white flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Megaphone className="w-3.5 h-3.5" /> Медиакит Табитуриента
            </span>
            <h2 className="text-xl sm:text-2xl font-black">
              Реклама и коммерческое предложение для вузов
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Самая концентрированная аудитория абитуриентов, олимпиадников и их родителей в Рунете
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

        {/* Audience Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-6 bg-slate-50 border-b border-slate-100 text-center">
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
            <Users className="w-5 h-5 text-blue-600 mx-auto mb-1" />
            <span className="text-lg font-black text-slate-900 block">3.8 млн</span>
            <span className="text-[11px] text-slate-500 font-medium">Уникальных в сезон</span>
          </div>
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
            <Eye className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
            <span className="text-lg font-black text-slate-900 block">18 млн</span>
            <span className="text-[11px] text-slate-500 font-medium">Просмотров страниц</span>
          </div>
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
            <TrendingUp className="w-5 h-5 text-amber-600 mx-auto mb-1" />
            <span className="text-lg font-black text-slate-900 block">85%</span>
            <span className="text-[11px] text-slate-500 font-medium">Абитуриенты 11 кл.</span>
          </div>
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
            <Sparkles className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
            <span className="text-lg font-black text-slate-900 block">140 000+</span>
            <span className="text-[11px] text-slate-500 font-medium">Telegram-канал</span>
          </div>
        </div>

        {isSent ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900">Заявка успешно отправлена!</h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Наш отдел по работе с высшими учебными заведениями свяжется с вами в течение 2 рабочих часов и предоставит медиакит с персональной скидкой.
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-sm"
            >
              Закрыть окно
            </button>
          </div>
        ) : (
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Packages Selector */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Выберите рекламный формат:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {packages.map((pkg) => {
                  const isSelected = selectedFormat === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedFormat(pkg.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-500/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-slate-900">{pkg.title}</h4>
                        <span className="text-xs font-black text-blue-700 whitespace-nowrap">{pkg.price}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">{pkg.desc}</p>
                      <div className="mt-2 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
                        {pkg.views}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Contact Form */}
            <form onSubmit={handleSubmit} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                Запросить медиакит и расчет стоимости
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="inst-name" className="text-[11px] font-bold text-slate-700 block mb-1">
                    Название вуза / организации:
                  </label>
                  <input
                    id="inst-name"
                    type="text"
                    required
                    placeholder="Например: НИУ ВШЭ, МГТУ им. Баумана"
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="cont-name" className="text-[11px] font-bold text-slate-700 block mb-1">
                    Контактное лицо:
                  </label>
                  <input
                    id="cont-name"
                    type="text"
                    required
                    placeholder="ФИО, должность"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="cont-email" className="text-[11px] font-bold text-slate-700 block mb-1">
                    Рабочий Email:
                  </label>
                  <input
                    id="cont-email"
                    type="email"
                    required
                    placeholder="pr@university.ru"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="cont-phone" className="text-[11px] font-bold text-slate-700 block mb-1">
                    Телефон для связи:
                  </label>
                  <input
                    id="cont-phone"
                    type="tel"
                    required
                    placeholder="+7 (999) 000-00-00"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-500">
                  Мы работаем строго по договору и безналичному расчету (в т.ч. 44-ФЗ / 223-ФЗ).
                </span>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Отправить заявку
                </button>
              </div>
            </form>

          </div>
        )}

      </div>
    </div>
  );
};
