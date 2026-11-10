# Project Architecture & Conventions (project.md)

## Overview
A modern, responsive reverse-engineered clone and remake of **Табитуриент (tabiturient.ru)**, Russia's premier university admissions and review intelligence platform.

## Tech Stack
- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS + custom design tokens (`tabi-*`)
- **Icons**: Lucide React
- **Data & Persistence**: LocalStorage for Bookmarks & Comparisons; comprehensive mock data in `src/data/mockData.ts`.

## How to Run
```bash
# Development server
npm run dev

# Production build
npm run build

# Production preview
npm run preview
```

## Folder Structure
```
/src
  /components
    Header.tsx               # Top utility bar, navigation tabs, mobile menu
    HeroSearch.tsx           # University search, region & area select, filter pills
    UniversityCard.tsx       # University card with metrics, sentiment bar, actions
    UniversityDetailModal.tsx# Comprehensive university dossier (faculties, reviews, dorms)
    EgeCalculator.tsx        # 11-subject EGE calculator with instant chance matching
    ReviewsSection.tsx       # Student reviews ("сливы") feed and submission modal
    RankingsSection.tsx      # 4 League tables (reviews, global, EGE, tuition)
    ComparisonModal.tsx      # Side-by-side comparison table (up to 4 universities)
    SpecialtiesSection.tsx   # OKSO code directory with required exams & salaries
    OpenDaysSection.tsx      # Open Doors Days (ДОД) calendar with format filters
    QnaSection.tsx           # Admissions community Q&A with ask question modal
    ArticlesSection.tsx      # Knowledge base & guides for applicants
    BookmarksDrawer.tsx      # Saved programs drawer
    Footer.tsx               # Footer with links, disclaimers, and legal info
  /data
    mockData.ts              # Authentic data for top Russian universities, reviews, Q&As
  /types
    index.ts                 # Full TypeScript definitions
  App.tsx                    # Main controller, state management, modal handling
  main.tsx                   # React root entry point
  index.css                  # Tailwind styles and base scrollbar styling
```

## Design Tokens & Colors
- `tabi-navy`: `#19212c` (Header & dark hero surface)
- `tabi-navyDark`: `#121720` (Sub-navigation & footer surface)
- `tabi-bg`: `#f4f6f8` (Main page background)
- `tabi-card`: `#ffffff` (Card surfaces)
- `tabi-positive`: `#10b981` (Green sentiment badge & high chance)
- `tabi-neutral`: `#f59e0b` (Amber sentiment badge & medium chance)
- `tabi-negative`: `#ef4444` (Rose sentiment badge & low chance)
- Font: Inter, sans-serif

## Future Updates
Use `/change-pipeline` for updating or extending features.
