import React, { useState } from 'react';
import { MapPin, Navigation, ArrowRight } from 'lucide-react';
import { UNIVERSITIES } from '../data/mockData';
import { University } from '../types';

interface UniversityMapProps {
  onSelectUniversity: (u: University) => void;
}

export const UniversityMap: React.FC<UniversityMapProps> = ({ onSelectUniversity }) => {
  const [selectedCity, setSelectedCity] = useState<string>('Москва');

  const cityList = ['Москва', 'Санкт-Петербург', 'Республика Татарстан', 'Новосибирская область'];

  const filteredUnis = UNIVERSITIES.filter(u => u.region === selectedCity);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-2">
          <Navigation className="w-3.5 h-3.5" />
          Интерактивная карта кампусов
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Карта и навигатор по вузам России
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
          Узнайте точное расположение главных корпусов, ближайшие станции метро и транспортную доступность общежитий.
        </p>
      </div>

      {/* City Switcher */}
      <div className="flex items-center justify-center space-x-2">
        {cityList.map(city => (
          <button
            key={city}
            onClick={() => setSelectedCity(city)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedCity === city
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {city === 'Республика Татарстан' ? 'Казань' : city === 'Новосибирская область' ? 'Новосибирск' : city}
          </button>
        ))}
      </div>

      {/* Visual Map Representation Banner */}
      <div className="relative bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl p-6 sm:p-10 text-white">
        
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
              Городская локация: {selectedCity}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              Университетские кластеры и станции метро
            </h3>
          </div>
          <span className="text-xs px-3 py-1 bg-white/10 rounded-full text-slate-300 font-medium">
            Объектов на карте: <strong>{filteredUnis.length}</strong>
          </span>
        </div>

        {/* Map Cards Cluster */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {filteredUnis.map((uni) => (
            <div
              key={uni.id}
              className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 p-5 hover:bg-white/15 transition-all space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{uni.logo}</span>
                  <div>
                    <h4 
                      onClick={() => onSelectUniversity(uni)}
                      className="text-base font-extrabold text-white hover:text-blue-400 cursor-pointer transition-colors"
                    >
                      {uni.name}
                    </h4>
                    <span className="text-xs text-slate-300 line-clamp-1">{uni.fullName}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-white/10 font-medium">
                <p className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{uni.address}</span>
                </p>
                {uni.metroStation && (
                  <p className="flex items-center gap-1.5 text-blue-300 font-semibold">
                    <span>🚇 Метро: {uni.metroStation}</span>
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 text-xs">
                <span className="text-emerald-400 font-bold">
                  {uni.studentSatisfaction}% довольны локацией
                </span>
                <button
                  onClick={() => onSelectUniversity(uni)}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 transition-colors"
                >
                  Карточка вуза
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
