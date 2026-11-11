import React, { useState, useEffect, useMemo } from 'react';
import { ADMISSIONS_DEADLINES } from '../data/mockData';
import { AdmissionsDeadline } from '../types';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Download, 
  Bell, 
  Filter, 
  CalendarCheck,
  Sparkles
} from 'lucide-react';

export const AdmissionsCalendar: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<string>('Все');
  const [selectedAudience, setSelectedAudience] = useState<string>('Все');
  const [completedIds, setCompletedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tabi_completed_deadlines');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  // Live Countdown calculation (simulated to the critical August 3 deadline)
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 42,
    hours: 14,
    minutes: 35,
    seconds: 18
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleCompleted = (id: string) => {
    const updated = completedIds.includes(id)
      ? completedIds.filter((item) => item !== id)
      : [...completedIds, id];
    setCompletedIds(updated);
    try {
      localStorage.setItem('tabi_completed_deadlines', JSON.stringify(updated));
    } catch {}
  };

  const stages = [
    'Все',
    'Прием документов',
    'ДВИ и вступительные',
    'Конкурсные списки',
    'Подача оригиналов',
    'Приказы'
  ];

  const audiences = [
    'Все',
    'Все абитуриенты',
    'БВИ и квотники',
    'Основной этап (ЕГЭ)',
    'Платное обучение'
  ];

  const filteredDeadlines = useMemo(() => {
    return ADMISSIONS_DEADLINES.filter((item) => {
      const matchStage = selectedStage === 'Все' || item.stage === selectedStage;
      const matchAudience = selectedAudience === 'Все' || item.targetAudience === selectedAudience;
      return matchStage && matchAudience;
    });
  }, [selectedStage, selectedAudience]);

  // Export event to ICS file
  const downloadIcs = (event: AdmissionsDeadline) => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Tabiturient.ru//Admissions Calendar 2026//RU
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description}\\nДокумент: ${event.officialDocument}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `tabiturient-${event.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRemindMe = (event: AdmissionsDeadline) => {
    setNotificationToast(`Напоминание для события «${event.title}» добавлено! Уведомление придет за 24 часа.`);
    setTimeout(() => {
      setNotificationToast(null);
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Toast alert */}
      {notificationToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 text-xs font-semibold animate-fade-in">
          <Bell className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{notificationToast}</span>
        </div>
      )}

      {/* Header Banner & Live Countdown */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 p-6 sm:p-10 text-white shadow-xl border border-slate-800">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold tracking-wide uppercase">
              <CalendarCheck className="w-4 h-4 text-blue-400" />
              Приемная кампания 2026
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Календарь абитуриента 2026: дедлайны и даты зачисления
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Официальные сроки Минобрнауки РФ. Не пропустите дату завершения приема согласий и приказов о зачислении. Время во всех дедлайнах указано строго по московскому времени (МСК).
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-300 pt-1">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Отмечено: {completedIds.length} из {ADMISSIONS_DEADLINES.length}
              </span>
              <span className="flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-400" /> Критических дедлайнов: 4
              </span>
            </div>
          </div>

          {/* Countdown Card */}
          <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/15 text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center justify-center gap-1.5">
              <Clock className="w-4 h-4" /> До Дня X (Оригиналы основного этапа)
            </span>
            <div className="grid grid-cols-4 gap-2 pt-2">
              <div className="bg-slate-900/60 rounded-2xl p-3 border border-white/10">
                <span className="text-2xl sm:text-3xl font-black text-white block">{timeLeft.days}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Дней</span>
              </div>
              <div className="bg-slate-900/60 rounded-2xl p-3 border border-white/10">
                <span className="text-2xl sm:text-3xl font-black text-white block">{timeLeft.hours}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Часов</span>
              </div>
              <div className="bg-slate-900/60 rounded-2xl p-3 border border-white/10">
                <span className="text-2xl sm:text-3xl font-black text-white block">{timeLeft.minutes}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Минут</span>
              </div>
              <div className="bg-slate-900/60 rounded-2xl p-3 border border-white/10">
                <span className="text-2xl sm:text-3xl font-black text-amber-400 block">{timeLeft.seconds}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Секунд</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-300">
              3 августа, 12:00 МСК — закрытие приема оригиналов на Госуслугах
            </p>
          </div>

        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          
          {/* Stage Filter */}
          <div className="space-y-1.5 w-full sm:w-auto">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5" htmlFor="stage-filter">
              <Filter className="w-3.5 h-3.5 text-blue-600" /> Этап поступления:
            </label>
            <div className="flex flex-wrap gap-1.5" id="stage-filter">
              {stages.map((stage) => (
                <button
                  key={stage}
                  onClick={() => setSelectedStage(stage)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedStage === stage
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {stage}
                </button>
              ))}
            </div>
          </div>

          {/* Target Audience */}
          <div className="space-y-1.5 w-full sm:w-auto">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5" htmlFor="aud-filter">
              Категория поступающего:
            </label>
            <div className="flex flex-wrap gap-1.5" id="aud-filter">
              {audiences.map((aud) => (
                <button
                  key={aud}
                  onClick={() => setSelectedAudience(aud)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedAudience === aud
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {aud}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Deadlines Timeline List */}
      <div className="space-y-4">
        {filteredDeadlines.map((item) => {
          const isDone = completedIds.includes(item.id);
          return (
            <div
              key={item.id}
              className={`bg-white rounded-3xl border transition-all duration-200 overflow-hidden shadow-sm hover:shadow-md p-5 sm:p-6 ${
                isDone
                  ? 'border-emerald-300 bg-emerald-50/20'
                  : item.isCritical
                  ? 'border-rose-300 ring-2 ring-rose-500/10'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                
                {/* Date & Title */}
                <div className="flex items-start gap-4">
                  
                  {/* Complete Checkbox */}
                  <button
                    onClick={() => toggleCompleted(item.id)}
                    className={`mt-1 w-6 h-6 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${
                      isDone
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-300 hover:border-blue-500 bg-white'
                    }`}
                    aria-label={`Отметить событие ${item.title}`}
                  >
                    {isDone && <CheckCircle2 className="w-4 h-4" />}
                  </button>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-extrabold text-sm px-3 py-1 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1.5">
                        <CalendarIcon className="w-3.5 h-3.5" />
                        {item.date} {item.time && `(${item.time})`}
                      </span>

                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-600">
                        {item.stage}
                      </span>

                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-lg bg-indigo-50 text-indigo-700">
                        {item.targetAudience}
                      </span>

                      {item.isCritical && (
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-rose-100 text-rose-700 border border-rose-200 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-rose-600" /> Критический дедлайн
                        </span>
                      )}
                    </div>

                    <h3 className={`text-base sm:text-lg font-extrabold ${isDone ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
                      {item.description}
                    </p>

                    {/* Practical tip */}
                    <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-amber-900 text-xs flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Совет редакции:</strong> {item.tips}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Actions: Remind, ICS Download */}
                <div className="flex sm:flex-col items-center sm:items-end gap-2 w-full sm:w-auto shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <button
                    onClick={() => handleRemindMe(item)}
                    className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                    title="Включить напоминание"
                  >
                    <Bell className="w-3.5 h-3.5 text-slate-500" />
                    Напомнить
                  </button>

                  <button
                    onClick={() => downloadIcs(item)}
                    className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 border border-blue-200"
                    title="Скачать файл календаря (.ics)"
                  >
                    <Download className="w-3.5 h-3.5" />
                    В календарь (.ics)
                  </button>
                </div>

              </div>
            </div>
          );
        })}

        {filteredDeadlines.length === 0 && (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
            <CalendarIcon className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">Событий не найдено</h3>
            <p className="text-xs text-slate-500">Попробуйте сбросить фильтры этапа или категории.</p>
          </div>
        )}
      </div>

    </div>
  );
};
