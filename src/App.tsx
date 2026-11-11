import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { HeroSearch } from './components/HeroSearch';
import { UniversityCard } from './components/UniversityCard';
import { UniversityDetailModal } from './components/UniversityDetailModal';
import { EgeCalculator } from './components/EgeCalculator';
import { PaidCalculator } from './components/PaidCalculator';
import { PodborWizard } from './components/PodborWizard';
import { Top100Programs } from './components/Top100Programs';
import { DormInspector } from './components/DormInspector';
import { UniversityPartnerPortal } from './components/UniversityPartnerPortal';
import { UniversityMap } from './components/UniversityMap';
import { PremiumAnalytics } from './components/PremiumAnalytics';
import { ReviewsSection } from './components/ReviewsSection';
import { RankingsSection } from './components/RankingsSection';
import { ComparisonModal } from './components/ComparisonModal';
import { SpecialtiesSection } from './components/SpecialtiesSection';
import { OpenDaysSection } from './components/OpenDaysSection';
import { QnaSection } from './components/QnaSection';
import { ArticlesSection } from './components/ArticlesSection';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { Footer } from './components/Footer';
import { UNIVERSITIES } from './data/mockData';
import { University } from './types';
import { Building2, X } from 'lucide-react';

export const App: React.FC = () => {
  // Navigation
  const [activeTab, setActiveTab] = useState<string>('vuz');

  // Search & Filters for University Directory
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('Все регионы');
  const [selectedArea, setSelectedArea] = useState<string>('Все направления');
  const [filterStateOnly, setFilterStateOnly] = useState<boolean>(false);
  const [filterMilitary, setFilterMilitary] = useState<boolean>(false);
  const [filterDorm, setFilterDorm] = useState<boolean>(false);

  // Active Modals & Selected items
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);

  // Bookmarks & Compare persistent state
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tabi_bookmarks');
      return saved ? JSON.parse(saved) : ['hse', 'mpei'];
    } catch {
      return ['hse', 'mpei'];
    }
  });

  const [comparedIds, setComparedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tabi_compare');
      return saved ? JSON.parse(saved) : ['hse', 'bmstu'];
    } catch {
      return ['hse', 'bmstu'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('tabi_bookmarks', JSON.stringify(bookmarkedIds));
    } catch {}
  }, [bookmarkedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('tabi_compare', JSON.stringify(comparedIds));
    } catch {}
  }, [comparedIds]);

  // Toggle handlers
  const handleToggleBookmark = (u: University) => {
    if (bookmarkedIds.includes(u.id)) {
      setBookmarkedIds(bookmarkedIds.filter(id => id !== u.id));
    } else {
      setBookmarkedIds([...bookmarkedIds, u.id]);
    }
  };

  const handleToggleCompare = (u: University) => {
    if (comparedIds.includes(u.id)) {
      setComparedIds(comparedIds.filter(id => id !== u.id));
    } else {
      if (comparedIds.length >= 4) {
        alert('В сравнение можно добавить не более 4 вузов одновременно.');
        return;
      }
      setComparedIds([...comparedIds, u.id]);
    }
  };

  const handleRemoveCompare = (id: string) => {
    setComparedIds(comparedIds.filter(i => i !== id));
  };

  const handleClearCompare = () => {
    setComparedIds([]);
  };

  const handleRemoveBookmark = (id: string) => {
    setBookmarkedIds(bookmarkedIds.filter(i => i !== id));
  };

  const handleClearBookmarks = () => {
    setBookmarkedIds([]);
  };

  // Filtered universities
  const filteredUniversities = useMemo(() => {
    return UNIVERSITIES.filter(u => {
      // Name or abbreviation
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchName = u.name.toLowerCase().includes(q);
        const matchFullName = u.fullName.toLowerCase().includes(q);
        if (!matchName && !matchFullName) return false;
      }
      // Region
      if (selectedRegion !== 'Все регионы' && u.region !== selectedRegion) {
        return false;
      }
      // State Only
      if (filterStateOnly && !u.isState) return false;
      // Military
      if (filterMilitary && !u.hasMilitary) return false;
      // Dorm
      if (filterDorm && !u.hasDorm) return false;

      return true;
    });
  }, [searchQuery, selectedRegion, filterStateOnly, filterMilitary, filterDorm]);

  const bookmarkedUniversities = useMemo(() => {
    return UNIVERSITIES.filter(u => bookmarkedIds.includes(u.id));
  }, [bookmarkedIds]);

  const comparedUniversities = useMemo(() => {
    return UNIVERSITIES.filter(u => comparedIds.includes(u.id));
  }, [comparedIds]);

  return (
    <div className="min-h-screen flex flex-col bg-tabi-bg text-slate-800 w-full overflow-x-hidden">
      
      {/* Global Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        compareCount={comparedIds.length}
        bookmarksCount={bookmarkedIds.length}
        openCompare={() => setIsCompareOpen(true)}
        openBookmarks={() => setIsBookmarksOpen(true)}
        openAuth={() => setIsAuthOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* TAB 1: Search & University Directory */}
        {activeTab === 'vuz' && (
          <div>
            <HeroSearch
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              selectedArea={selectedArea}
              setSelectedArea={setSelectedArea}
              filterStateOnly={filterStateOnly}
              setFilterStateOnly={setFilterStateOnly}
              filterMilitary={filterMilitary}
              setFilterMilitary={setFilterMilitary}
              filterDorm={filterDorm}
              setFilterDorm={setFilterDorm}
            />

            {/* University List Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    Каталог вузов России ({filteredUniversities.length})
                  </h2>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">
                    Сортировка по востребованности среди абитуриентов
                  </p>
                </div>
                
                {(searchQuery || selectedRegion !== 'Все регионы' || filterStateOnly || filterMilitary || filterDorm) && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedRegion('Все регионы');
                      setSelectedArea('Все направления');
                      setFilterStateOnly(false);
                      setFilterMilitary(false);
                      setFilterDorm(false);
                    }}
                    className="text-xs font-bold text-rose-600 hover:text-rose-800 transition-colors"
                  >
                    Сбросить фильтры
                  </button>
                )}
              </div>

              {filteredUniversities.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredUniversities.map((uni) => (
                    <UniversityCard
                      key={uni.id}
                      university={uni}
                      onSelect={(u) => setSelectedUniversity(u)}
                      isBookmarked={bookmarkedIds.includes(uni.id)}
                      onToggleBookmark={handleToggleBookmark}
                      isCompared={comparedIds.includes(uni.id)}
                      onToggleCompare={handleToggleCompare}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-16 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
                  <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
                  <h3 className="text-base font-bold text-slate-800">
                    По вашему запросу вузов не найдено
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Попробуйте изменить регион, снять фильтры параметров или ввести другое название.
                  </p>
                </div>
              )}

            </div>
          </div>
        )}

        {/* TAB 2: Smart Podbor Wizard */}
        {activeTab === 'podbor' && (
          <PodborWizard onSelectUniversity={(u) => setSelectedUniversity(u)} />
        )}

        {/* TAB 3: EGE Calculator */}
        {activeTab === 'calculator' && (
          <EgeCalculator onSelectUniversity={(u) => setSelectedUniversity(u)} />
        )}

        {/* TAB 4: Paid Tuition & 3% Loan Calculator */}
        {activeTab === 'calculator_pay' && (
          <PaidCalculator onSelectUniversity={(u) => setSelectedUniversity(u)} />
        )}

        {/* TAB 5: Top-100 Programs */}
        {activeTab === '100program' && <Top100Programs />}

        {/* TAB 6: Reviews ("Сливы") */}
        {activeTab === 'reviews' && <ReviewsSection />}

        {/* TAB 7: Dorm Inspector */}
        {activeTab === 'dorms' && <DormInspector />}

        {/* TAB 8: Rankings */}
        {activeTab === 'rankings' && (
          <RankingsSection onSelectUniversity={(u) => setSelectedUniversity(u)} />
        )}

        {/* TAB 9: University & Campus Map */}
        {activeTab === 'map' && (
          <UniversityMap onSelectUniversity={(u) => setSelectedUniversity(u)} />
        )}

        {/* TAB 10: Specialties */}
        {activeTab === 'specialties' && <SpecialtiesSection />}

        {/* TAB 11: Open Doors Days */}
        {activeTab === 'dod' && <OpenDaysSection />}

        {/* TAB 12: Q&A Community */}
        {activeTab === 'qna' && <QnaSection />}

        {/* TAB 13: Articles & Guides */}
        {activeTab === 'articles' && <ArticlesSection />}

        {/* TAB 14: University Partner Portal */}
        {activeTab === 'vuzam' && <UniversityPartnerPortal />}

        {/* TAB 15: Premium Wave Tracker */}
        {activeTab === 'premium' && <PremiumAnalytics />}

      </main>

      {/* University Detail Modal */}
      <UniversityDetailModal
        university={selectedUniversity}
        onClose={() => setSelectedUniversity(null)}
        isBookmarked={selectedUniversity ? bookmarkedIds.includes(selectedUniversity.id) : false}
        onToggleBookmark={handleToggleBookmark}
        isCompared={selectedUniversity ? comparedIds.includes(selectedUniversity.id) : false}
        onToggleCompare={handleToggleCompare}
      />

      {/* Comparison Modal */}
      <ComparisonModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        comparedUniversities={comparedUniversities}
        onRemoveFromCompare={handleRemoveCompare}
        onClearCompare={handleClearCompare}
        onSelectUniversity={(u) => setSelectedUniversity(u)}
      />

      {/* Bookmarks Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedUniversities={bookmarkedUniversities}
        onRemoveBookmark={handleRemoveBookmark}
        onClearBookmarks={handleClearBookmarks}
        onSelectUniversity={(u) => setSelectedUniversity(u)}
        onToggleCompare={handleToggleCompare}
        comparedIds={comparedIds}
      />

      {/* Auth Modal (Mock Sign-In) */}
      {isAuthOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Вход в Табитуриент</h3>
              <button onClick={() => setIsAuthOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-600">
              Войдите, чтобы сохранять персональные подборки программ, отслеживать изменения проходных баллов и оставлять проверенные отзывы.
            </p>
            <div className="space-y-2">
              <button
                onClick={() => { alert('Вход через VK ID успешно выполнен!'); setIsAuthOpen(false); }}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-sm"
              >
                Войти через VK ID
              </button>
              <button
                onClick={() => { alert('Вход через Яндекс ID успешно выполнен!'); setIsAuthOpen(false); }}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-sm"
              >
                Войти через Яндекс
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
};
