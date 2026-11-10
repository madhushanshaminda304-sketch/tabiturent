import React from 'react';
import { Bookmark, X, Trash2, ArrowRight, MapPin, GitCompare } from 'lucide-react';
import { University } from '../types';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedUniversities: University[];
  onRemoveBookmark: (id: string) => void;
  onClearBookmarks: () => void;
  onSelectUniversity: (u: University) => void;
  onToggleCompare: (u: University) => void;
  comparedIds: string[];
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarkedUniversities,
  onRemoveBookmark,
  onClearBookmarks,
  onSelectUniversity,
  onToggleCompare,
  comparedIds,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md h-full bg-white shadow-2xl border-l border-slate-200 flex flex-col justify-between">
        
        {/* Drawer Header */}
        <div className="p-5 bg-tabi-navy text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            <Bookmark className="w-5 h-5 text-amber-400 fill-current" />
            <div>
              <h3 className="text-base font-bold">Закладки ({bookmarkedUniversities.length})</h3>
              <p className="text-xs text-slate-300">Сохраненные вузы для быстрого доступа</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {bookmarkedUniversities.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Bookmark className="w-12 h-12 text-slate-300 mx-auto" />
              <h4 className="text-base font-bold text-slate-800">
                У вас пока нет закладок
              </h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Нажимайте на звездочку или флажок закладки в карточке любого вуза, чтобы сохранить его в этот список.
              </p>
            </div>
          ) : (
            bookmarkedUniversities.map(uni => {
              const isComp = comparedIds.includes(uni.id);
              return (
                <div
                  key={uni.id}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-200 hover:shadow-sm transition-all space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className="text-2xl">{uni.logo}</span>
                      <div>
                        <h4 
                          onClick={() => { onClose(); onSelectUniversity(uni); }}
                          className="text-sm font-bold text-slate-900 hover:text-blue-600 cursor-pointer"
                        >
                          {uni.name}
                        </h4>
                        <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                          <MapPin className="w-3 h-3" />
                          {uni.region}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveBookmark(uni.id)}
                      className="text-slate-400 hover:text-rose-500 p-1"
                      title="Удалить из закладок"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-200 font-medium">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Проходной балл</span>
                      <strong className="text-blue-700 font-extrabold">от {uni.minPassingScore}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Одобрение студентов</span>
                      <strong className="text-emerald-600 font-extrabold">{uni.studentSatisfaction}%</strong>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs">
                    <button
                      onClick={() => onToggleCompare(uni)}
                      className={`px-2 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 border transition-colors ${
                        isComp 
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <GitCompare className="w-3 h-3" />
                      {isComp ? 'В сравнении' : 'Сравнить'}
                    </button>

                    <button
                      onClick={() => { onClose(); onSelectUniversity(uni); }}
                      className="font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 text-xs"
                    >
                      Подробнее
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer */}
        {bookmarkedUniversities.length > 0 && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
            <button
              onClick={onClearBookmarks}
              className="text-xs font-semibold text-rose-600 hover:text-rose-800 transition-colors"
            >
              Очистить все закладки
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
            >
              Закрыть
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
