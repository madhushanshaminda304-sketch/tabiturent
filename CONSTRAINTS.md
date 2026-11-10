# Quality Contract (CONSTRAINTS.md)

## Performance & Quality Floor
- **Lighthouse Scores**:
  - Performance: ≥ 90 (target ≥ 95)
  - Accessibility: ≥ 95 (fixing baseline 61)
  - Best Practices: ≥ 95
  - SEO: ≥ 95
- **Core Web Vitals**:
  - LCP: ≤ 2.0 s (beating baseline 3.0 s)
  - CLS: ≤ 0.05 (beating baseline 0.002)
  - INP: ≤ 150 ms
  - Initial JS bundle: ≤ 200 KB gzipped
- **Code Quality**:
  - 0 TypeScript compilation errors
  - 0 Console errors/warnings on initial load and navigation
  - 100% Mobile & Desktop responsive (375px through 1920px)
  - WCAG 2.2 AA accessibility compliance
  - Full keyboard accessibility and visible focus rings
- **Feature Completeness**:
  - All 12 core modules of Tabiturient fully operational
  - Live EGE calculation logic
  - Dynamic filtering, sorting, university comparisons, reviews, and bookmarks persisted in localStorage
