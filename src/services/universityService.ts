import { UNIVERSITIES, REGIONS, STUDY_AREAS } from '../data/mockData';
import { University, DataProvenance } from '../types';

export interface UniversityFilterOptions {
  searchQuery?: string;
  region?: string;
  studyArea?: string;
  isStateOnly?: boolean;
  hasMilitaryOnly?: boolean;
  hasDormOnly?: boolean;
}

export const ARCHIVE_PROVENANCE: DataProvenance = {
  sourceName: 'Архивный реестр вузов и направлений РФ',
  sourceUrl: 'https://tabiturient.ru',
  applicableYearOrIntake: '2025/2026',
  lastVerifiedDate: '2026-05-15',
  verificationStatus: 'historical',
  dataset: 'experimental_ru_archive',
  notes: 'Архивные данные РФ используются в качестве экспериментального полигона для платформы UniPedia.'
};

/**
 * Access layer for University and Program directory.
 * Decouples presentation components from monolithic mock data.
 */
class UniversityService {
  private universities: University[];

  constructor() {
    // Enrich with provenance and stable campus identifiers
    this.universities = UNIVERSITIES.map(u => ({
      ...u,
      campusId: u.campusId || `${u.id}-campus-main`,
      campusName: u.campusName || `${u.name} (Основной кампус)`,
      provenance: ARCHIVE_PROVENANCE,
      faculties: u.faculties.map(f => ({
        ...f,
        programs: f.programs.map(p => ({
          ...p,
          campusId: u.campusId || `${u.id}-campus-main`,
          intakeId: 'intake-2026-main',
          provenance: ARCHIVE_PROVENANCE
        }))
      }))
    }));
  }

  public getAll(): University[] {
    return [...this.universities];
  }

  public getById(id: string): University | undefined {
    return this.universities.find(u => u.id === id);
  }

  public getByName(name: string): University | undefined {
    const q = name.toLowerCase().trim();
    return this.universities.find(u => 
      u.name.toLowerCase() === q ||
      u.fullName.toLowerCase().includes(q) ||
      q.includes(u.name.toLowerCase())
    );
  }

  public getRegions(): string[] {
    return REGIONS;
  }

  public getStudyAreas(): string[] {
    return STUDY_AREAS;
  }

  /**
   * Filter universities with full criteria support, including Natural Sciences and Architecture/Design.
   */
  public filter(options: UniversityFilterOptions): University[] {
    const {
      searchQuery = '',
      region = 'Все регионы',
      studyArea = 'Все направления',
      isStateOnly = false,
      hasMilitaryOnly = false,
      hasDormOnly = false
    } = options;

    return this.universities.filter(uni => {
      // 1. Text Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = uni.name.toLowerCase().includes(q) || uni.fullName.toLowerCase().includes(q);
        const matchesDesc = uni.description.toLowerCase().includes(q);
        const matchesFaculty = uni.faculties.some(f => 
          f.name.toLowerCase().includes(q) || 
          f.programs.some(p => p.name.toLowerCase().includes(q) || p.code.includes(q))
        );
        if (!matchesName && !matchesDesc && !matchesFaculty) return false;
      }

      // 2. Region Filter
      if (region !== 'Все регионы' && uni.region !== region) {
        return false;
      }

      // 3. Study Area Filter (Handles all OKSO groups properly)
      if (studyArea !== 'Все направления') {
        const matchesArea = uni.faculties.some(f => 
          f.programs.some(p => {
            if (studyArea === 'Математика и IT') {
              return p.code.startsWith('01.') || p.code.startsWith('02.') || p.code.startsWith('09.') || p.code.startsWith('10.');
            }
            if (studyArea === 'Инженерия и технологии') {
              return p.code.startsWith('11.') || p.code.startsWith('12.') || p.code.startsWith('13.') || p.code.startsWith('15.') || p.code.startsWith('24.') || p.code.startsWith('08.');
            }
            if (studyArea === 'Экономика и управление') {
              return p.code.startsWith('38.');
            }
            if (studyArea === 'Медицина и биоинженерия') {
              return p.code.startsWith('31.') || p.code.startsWith('32.') || p.code.startsWith('33.') || p.code.startsWith('19.');
            }
            if (studyArea === 'Гуманитарные и социальные науки') {
              return p.code.startsWith('40.') || p.code.startsWith('41.') || p.code.startsWith('42.') || p.code.startsWith('45.') || p.code.startsWith('46.');
            }
            if (studyArea === 'Естественные науки') {
              return p.code.startsWith('03.') || p.code.startsWith('04.') || p.code.startsWith('05.') || p.code.startsWith('06.');
            }
            if (studyArea === 'Архитектура и дизайн') {
              return p.code.startsWith('07.') || p.code.startsWith('54.') || p.name.toLowerCase().includes('дизайн') || p.name.toLowerCase().includes('архитектур');
            }
            return false;
          })
        );
        if (!matchesArea) return false;
      }

      // 4. Boolean status filters
      if (isStateOnly && !uni.isState) return false;
      if (hasMilitaryOnly && !uni.hasMilitary) return false;
      if (hasDormOnly && !uni.hasDorm) return false;

      return true;
    });
  }
}

export const universityService = new UniversityService();
