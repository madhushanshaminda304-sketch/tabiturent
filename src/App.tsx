import React, { useState, useEffect, useMemo, useCallback, Suspense, lazy } from 'react';
import { Header } from './components/Header';
import { HeroSearch } from './components/HeroSearch';
import { UniversityCard } from './components/UniversityCard';
import { UniversityDetailModal } from './components/UniversityDetailModal';
import { Footer } from './components/Footer';
import { UNIVERSITIES } from './data/mockData';
import { University } from './types';
import { Building2 } from 'lucide-react';

// Lazy-load secondary tabs and non-critical modals for optimum performance & fast TBT
const EgeCalculator = lazy(() => import('./components/EgeCalculator').then(m => ({ default: m.EgeCalculator })));
const PaidCalculator = lazy(() => import('./components/PaidCalculator').then(m => ({ default: m.PaidCalculator })));
const PodborWizard = lazy(() => import('./components/PodborWizard').then(m => ({ default: m.PodborWizard })));
const Top100Programs = lazy(() => import('./components/Top100Programs').then(m => ({ default: m.Top100Programs })));
const TopSpecialtiesSection = lazy(() => import('./components/TopSpecialtiesSection').then(m => ({ default: m.TopSpecialtiesSection })));
const AdmissionsCalendar = lazy(() => import('./components/AdmissionsCalendar').then(m => ({ default: m.AdmissionsCalendar })));
const DormInspector = lazy(() => import('./components/DormInspector').then(m => ({ default: m.DormInspector })));
const UniversityPartnerPortal = lazy(() => import('./components/UniversityPartnerPortal').then(m => ({ default: m.UniversityPartnerPortal })));
const UniversityMap = lazy(() => import('./components/UniversityMap').then(m => ({ default: m.UniversityMap })));
const PremiumAnalytics = lazy(() => import('./components/PremiumAnalytics').then(m => ({ default: m.PremiumAnalytics })));
const ReviewsSection = lazy(() => import('./components/ReviewsSection').then(m => ({ default: m.ReviewsSection })));
const RankingsSection = lazy(() => import('./components/RankingsSection').then(m => ({ default: m.RankingsSection })));
const ComparisonModal = lazy(() => import('./components/ComparisonModal').then(m => ({ default: m.ComparisonModal })));
const SpecialtiesSection = lazy(() => import('./components/SpecialtiesSection').then(m => ({ default: m.SpecialtiesSection })));
const OpenDaysSection = lazy(() => import('./components/OpenDaysSection').then(m => ({ default: m.OpenDaysSection })));
const QnaSection = lazy(() => import('./components/QnaSection').then(m => ({ default: m.QnaSection })));
const ArticlesSection = lazy(() => import('./components/ArticlesSection').then(m => ({ default: m.ArticlesSection })));
const BookmarksDrawer = lazy(() => import('./components/BookmarksDrawer').then(m => ({ default: m.BookmarksDrawer })));
const SubmitReviewModal = lazy(() => import('./components/SubmitReviewModal').then(m => ({ default: m.SubmitReviewModal })));
const AdvertiserPortalModal = lazy(() => import('./components/AdvertiserPortalModal').then(m => ({ default: m.AdvertiserPortalModal })));
const FeedbackModal = lazy(() => import('./components/FeedbackModal').then(m => ({ default: m.FeedbackModal })));
const AuthModal = lazy(() => import('./components/AuthModal').then(m => ({ default: m.AuthModal })));
const GlobalSearchModal = lazy(() => import('./components/GlobalSearchModal').then(m => ({ default: m.GlobalSearchModal })));

const VALID_TABS = [
  'vuz', 'podbor', 'calculator', 'calculator_pay', '100program',
  'topspec', 'calendar', 'reviews', 'dorms', 'rankings',
  'map', 'specialties', 'dod', 'qna', 'articles', 'vuzam', 'premium'
];

export const App: React.FC = () => {
  // Navigation with URL Hash synchronization
  const [activeTab, setActiveTabState] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace(/^#/, '');
      if (VALID_TABS.includes(hash)) return hash;
    }
    return 'vuz';
  });

  const setActiveTab = useCallback((tab: string) => {
    setActiveTabState(tab);
    if (typeof window !== 'undefined') {
      window.location.hash = tab;
    }
  }, []);

  // Listen to browser Back/Forward hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (VALID_TABS.includes(hash)) {
        setActiveTabState(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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
  const [isSubmitReviewOpen, setIsSubmitReviewOpen] = useState<boolean>(false);
  const [isAdvOpen, setIsAdvOpen] = useState<boolean>(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState<boolean>(false);

  // Global Ctrl+K / Cmd+K search palette trigger
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsGlobalSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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

  const handleSelectUniByName = (name: string) => {
    const found = UNIVERSITIES.find(
      (u) =>
        u.name.toLowerCase().includes(name.toLowerCase()) ||
        name.toLowerCase().includes(u.name.toLowerCase())
    );
    if (found) {
      setSelectedUniversity(found);
    } else {
      setActiveTab('vuz');
      setSearchQuery(name);
    }
  };

  // Filtered universities for Tab 1
  const filteredUniversities = useMemo(() => {
    return UNIVERSITIES.filter((uni) => {
      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = uni.name.toLowerCase().includes(q) || uni.fullName.toLowerCase().includes(q);
        const matchesDesc = uni.description.toLowerCase().includes(q);
        const matchesFaculty = uni.faculties.some(f => 
          f.name.toLowerCase().includes(q) || 
          f.programs.some(p => p.name.toLowerCase().includes(q) || p.code.includes(q))
        );
        if (!matchesName && !matchesDesc && !matchesFaculty) return false;
      }

      // Region Filter
      if (selectedRegion !== 'Все регионы' && uni.region !== selectedRegion) {
        return false;
      }

      // Area Filter
      if (selectedArea !== 'Все направления') {
        const matchesArea = uni.faculties.some(f => 
          f.programs.some(p => {
            if (selectedArea === 'Математика и IT') {
              return p.code.startsWith('01.') || p.code.startsWith('02.') || p.code.startsWith('09.') || p.code.startsWith('10.');
            }
            if (selectedArea === 'Инженерия и технологии') {
              return p.code.startsWith('11.') || p.code.startsWith('12.') || p.code.startsWith('13.') || p.code.startsWith('15.') || p.code.startsWith('24.') || p.code.startsWith('08.');
            }
            if (selectedArea === 'Экономика и управление') {
              return p.code.startsWith('38.');
            }
            if (selectedArea === 'Медицина и биоинженерия') {
              return p.code.startsWith('31.') || p.code.startsWith('32.') || p.code.startsWith('33.') || p.code.startsWith('19.');
            }
            if (selectedArea === 'Гуманитарные и социальные науки') {
              return p.code.startsWith('40.') || p.code.startsWith('41.') || p.code.startsWith('42.') || p.code.startsWith('45.') || p.code.startsWith('46.');
            }
            return true;
          })
        );
        if (!matchesArea) return false;
      }

      // Checkbox filters
      if (filterStateOnly && !uni.isState) return false;
      if (filterMilitary && !uni.hasMilitary) return false;
      if (filterDorm && !uni.hasDorm) return false;

      return true;
    });
  }, [searchQuery, selectedRegion, selectedArea, filterStateOnly, filterMilitary, filterDorm]);

  const comparedUniversities = useMemo(() => {
    return UNIVERSITIES.filter(u => comparedIds.includes(u.id));
  }, [comparedIds]);

  const bookmarkedUniversities = useMemo(() => {
    return UNIVERSITIES.filter(u => bookmarkedIds.includes(u.id));
  }, [bookmarkedIds]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Global Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        compareCount={comparedIds.length}
        bookmarksCount={bookmarkedIds.length}
        openCompare={() => setIsCompareOpen(true)}
        openBookmarks={() => setIsBookmarksOpen(true)}
        openAuth={() => setIsAuthOpen(true)}
        openSubmitReview={() => setIsSubmitReviewOpen(true)}
        openGlobalSearch={() => setIsGlobalSearchOpen(true)}
        openAdvModal={() => setIsAdvOpen(true)}
        openFeedbackModal={() => setIsFeedbackOpen(true)}
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
        <Suspense fallback={<div className="p-12 text-center text-xs font-semibold text-slate-400">Загрузка...</div>}>
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

          {/* TAB 6: Top Specialties Ranking РФ */}
          {activeTab === 'topspec' && (
            <TopSpecialtiesSection onSelectUniversityByName={handleSelectUniByName} />
          )}

          {/* TAB 7: Admissions Calendar 2026 */}
          {activeTab === 'calendar' && <AdmissionsCalendar />}

          {/* TAB 8: Reviews ("Сливы") */}
          {activeTab === 'reviews' && <ReviewsSection />}

          {/* TAB 9: Dorm Inspector */}
          {activeTab === 'dorms' && <DormInspector />}

          {/* TAB 10: Rankings */}
          {activeTab === 'rankings' && (
            <RankingsSection onSelectUniversity={(u) => setSelectedUniversity(u)} />
          )}

          {/* TAB 11: University & Campus Map */}
          {activeTab === 'map' && (
            <UniversityMap onSelectUniversity={(u) => setSelectedUniversity(u)} />
          )}

          {/* TAB 12: Specialties (OKSO) */}
          {activeTab === 'specialties' && (
            <SpecialtiesSection
              onViewUniversities={(specQuery) => {
                setActiveTab('vuz');
                setSearchQuery(specQuery);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {/* TAB 13: Open Doors Days */}
          {activeTab === 'dod' && <OpenDaysSection />}

          {/* TAB 14: Q&A Community */}
          {activeTab === 'qna' && <QnaSection />}

          {/* TAB 15: Articles & Guides */}
          {activeTab === 'articles' && <ArticlesSection />}

          {/* TAB 16: University Partner Portal */}
          {activeTab === 'vuzam' && <UniversityPartnerPortal />}

          {/* TAB 17: Premium Wave Tracker */}
          {activeTab === 'premium' && <PremiumAnalytics />}
        </Suspense>

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

      {/* Modals & Drawers wrapped in Suspense for zero initial load impact */}
      <Suspense fallback={null}>
        {/* Comparison Modal */}
        {isCompareOpen && (
          <ComparisonModal
            isOpen={isCompareOpen}
            onClose={() => setIsCompareOpen(false)}
            comparedUniversities={comparedUniversities}
            onRemoveFromCompare={handleRemoveCompare}
            onClearCompare={handleClearCompare}
            onSelectUniversity={(u) => setSelectedUniversity(u)}
          />
        )}

        {/* Bookmarks Drawer */}
        {isBookmarksOpen && (
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
        )}

        {/* Submit Review Modal */}
        {isSubmitReviewOpen && (
          <SubmitReviewModal
            isOpen={isSubmitReviewOpen}
            onClose={() => setIsSubmitReviewOpen(false)}
            onSubmitReview={() => {
              setActiveTab('reviews');
            }}
          />
        )}

        {/* Advertiser Portal / KP Modal */}
        {isAdvOpen && (
          <AdvertiserPortalModal
            isOpen={isAdvOpen}
            onClose={() => setIsAdvOpen(false)}
          />
        )}

        {/* Feedback / Moderation Modal */}
        {isFeedbackOpen && (
          <FeedbackModal
            isOpen={isFeedbackOpen}
            onClose={() => setIsFeedbackOpen(false)}
          />
        )}

        {/* Auth Modal */}
        {isAuthOpen && (
          <AuthModal
            isOpen={isAuthOpen}
            onClose={() => setIsAuthOpen(false)}
          />
        )}

        {/* Global Command Palette / Search Modal (Ctrl+K) */}
        {isGlobalSearchOpen && (
          <GlobalSearchModal
            isOpen={isGlobalSearchOpen}
            onClose={() => setIsGlobalSearchOpen(false)}
            onSelectUniversity={(u) => {
              setSelectedUniversity(u);
              setIsGlobalSearchOpen(false);
            }}
            onNavigateTab={(tabId) => {
              setActiveTab(tabId);
              setIsGlobalSearchOpen(false);
            }}
          />
        )}
      </Suspense>

      {/* Global Footer */}
      <Footer 
        setActiveTab={setActiveTab} 
        openAdvModal={() => setIsAdvOpen(true)}
        openFeedbackModal={() => setIsFeedbackOpen(true)}
        openSubmitReview={() => setIsSubmitReviewOpen(true)}
      />

    </div>
  );
};
