import React, { useState } from 'react';
import { Calendar, MapPin, Clock, ExternalLink, Search, Video } from 'lucide-react';
import { OPEN_DAYS } from '../data/mockData';

export const OpenDaysSection: React.FC = () => {
  const [filterFormat, setFilterFormat] = useState<'all' | 'Очно' | 'Онлайн'>('all');
  const [search, setSearch] = useState('');

  const filteredEvents = OPEN_DAYS.filter(e => {
    if (filterFormat !== 'all' && !e.format.includes(filterFormat)) return false;
    if (search && !e.universityName.toLowerCase().includes(search.toLowerCase()) && !e.facultyName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 mb-2">
          <Calendar className="w-3.5 h-3.5" />
          Календарь абитуриента 2026
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Дни открытых дверей в вузах России (ДОД)
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
          Узнайте даты очных встреч с ректорами, экскурсий по кампусам и онлайн-трансляций приемных комиссий.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по вузу или институту..."
            className="w-full text-xs font-medium pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </div>

        <div className="flex items-center space-x-1.5">
          {(['all', 'Очно', 'Онлайн'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilterFormat(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterFormat === f
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f === 'all' ? 'Все форматы' : f}
            </button>
          ))}
        </div>
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEvents.map(evt => (
          <div
            key={evt.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-sm font-extrabold text-blue-600">
                  {evt.universityName}
                </span>
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                  evt.format.includes('Онлайн')
                    ? 'bg-purple-50 text-purple-700 border border-purple-200'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}>
                  {evt.format.includes('Онлайн') ? <Video className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                  {evt.format}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-2">
                {evt.facultyName}
              </h3>

              <div className="space-y-1.5 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>Дата: <strong className="text-slate-800">{evt.date}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Время: <strong>{evt.time}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="truncate">{evt.address}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-medium">
                Вход свободный (по регистрации)
              </span>
              <a
                href={evt.registrationLink}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center gap-1 shadow-sm"
              >
                Регистрация
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
