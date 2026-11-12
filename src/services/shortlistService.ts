const BOOKMARKS_KEY = 'tabi_bookmarks';
const COMPARE_KEY = 'tabi_compare';

/**
 * Service to manage university bookmarks, side-by-side comparisons,
 * and URL sharing restoration.
 */
export class ShortlistService {
  /**
   * Starts new users clean with empty arrays if not previously saved.
   */
  public static getInitialBookmarks(): string[] {
    if (typeof window === 'undefined' || !window.localStorage) return [];
    try {
      const saved = localStorage.getItem(BOOKMARKS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }

  public static getInitialCompare(): string[] {
    // Check URL parameters first (e.g. ?compare=hse,bmstu or #vuz?compare=hse,bmstu)
    const fromUrl = ShortlistService.parseCompareFromUrl();
    if (fromUrl.length > 0) {
      return fromUrl.slice(0, 4);
    }

    if (typeof window === 'undefined' || !window.localStorage) return [];
    try {
      const saved = localStorage.getItem(COMPARE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }

  public static parseCompareFromUrl(): string[] {
    if (typeof window === 'undefined') return [];

    try {
      // Check window.location.search (?compare=id1,id2)
      const urlParams = new URLSearchParams(window.location.search);
      const searchCompare = urlParams.get('compare');
      if (searchCompare) {
        return searchCompare.split(',').map(s => s.trim()).filter(Boolean);
      }

      // Check window.location.hash (#vuz?compare=id1,id2)
      if (window.location.hash.includes('compare=')) {
        const hashQuery = window.location.hash.split('?')[1];
        if (hashQuery) {
          const hashParams = new URLSearchParams(hashQuery);
          const hashCompare = hashParams.get('compare');
          if (hashCompare) {
            return hashCompare.split(',').map(s => s.trim()).filter(Boolean);
          }
        }
      }
    } catch (e) {
      console.warn('[ShortlistService] Failed to parse compare from URL:', e);
    }

    return [];
  }

  public static generateShareUrl(compareIds: string[], baseUrl?: string): string {
    const origin = typeof window !== 'undefined' ? window.location.origin : (baseUrl || 'https://unipedia-lab.local');
    const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
    const ids = compareIds.join(',');
    return `${origin}${pathname}?compare=${ids}#vuz`;
  }

  public static saveBookmarks(ids: string[]): void {
    if (typeof window === 'undefined' || !window.localStorage) return;
    try {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(ids));
    } catch {}
  }

  public static saveCompare(ids: string[]): void {
    if (typeof window === 'undefined' || !window.localStorage) return;
    try {
      localStorage.setItem(COMPARE_KEY, JSON.stringify(ids));
    } catch {}
  }
}
