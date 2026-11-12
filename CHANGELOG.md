# Changelog

All notable changes to the Tabiturient platform remake will be documented in this file.

## [1.3.0] - 2026-11-12: UniPedia Feature Lab Foundation & "My Plan" Programme Workspace

### Added
- **Connected "My Plan" Programme Workspace (`#plan`)**: Mobile-first student workspace centred on saved programmes (not just universities), tracking degrees, duration, campus, intake, budget/paid costs, and entrance requirements.
- **Stage Progression & Management**: Move programmes across 5 clear stages (*Considering*, *Shortlisted*, *Preparing*, *Applied*, *Archived*) with accessible keyboard selectors.
- **Personal Student Notes & Unresolved Questions**: Integrated inline private note editor and admissions question tracker stored strictly client-side.
- **Actionable Next Steps**: Configurable single next action with optional target deadline (e.g. *“Submit certified transcript copies by 2026-07-20”*).
- **Undo Action & Zero Accidental Loss**: Non-destructive deletion with 5-second undo toast restore.
- **Private JSON Backup & Restore**: Full JSON backup export with private notes, plus validated import preview modal offering non-destructive merge or replace choices.
- **Clean Empty State & No Pre-saved Data**: New users start with a clean empty plan, empty bookmarks, and empty comparison without arbitrary pre-populated records.
- **Cross-Screen "Save to Plan" Buttons**: Direct 1-click addition to plan from `UniversityDetailModal` (programs tab), `Top100Programs`, and `EgeCalculator`.
- **Shared Data Access Services (`src/services/`)**: Introduced `universityService`, `reviewService`, `planStore`, `calendarService`, `shortlistService`, and `authService` to eliminate raw mock-data coupling.
- **Pure Calculation Modules (`src/calculations/`)**: Extracted `recommendations.ts`, `dormChances.ts`, and `admissionChances.ts` with transparent criteria and legal priority bands.
- **Data Provenance & Dataset Labelling**: All archive records explicitly labelled with `DataProvenance` metadata (`dataset: 'experimental_ru_archive'`).
- **EXPERIMENT.md**: Comprehensive document outlining feature goals, demo boundaries, and UniPedia integration architecture.

### Fixed
- **PodborWizard Criteria Matching**: Fixed heuristic that previously ignored funding goal (`goal`) and study direction (`direction`); replaced fake "neural network" claims with honest criteria match reporting.
- **Comparison URL Restoration**: Fixed `?compare=id1,id2` synchronization so shared comparison URLs are properly parsed and restored on page load.
- **Global Review Submissions**: Fixed review submissions from the global modal which were previously discarded; connected to `reviewService` with browser persistence.
- **Calendar RFC 5545 Compliance**: Added real `DTSTART`, `DTEND`, `DTSTAMP`, and `VALARM` dates parsed from Russian milestones.
- **Admissions Reminders & Auth Honesty**: Replaced fake notification and account creation messages with honest local browser session behaviour and local reminder tracking.
- **Admission & Dorm Percentages**: Replaced arbitrary percentage claims with legal priority bands and transparent provenance disclaimers.
- **Directory Area Filters**: Fixed 'Естественные науки' and 'Архитектура и дизайн' filters which previously passed all records.

### Performance & Quality
- **Lighthouse Performance**: 100 / 100 🟢
- **Lighthouse Accessibility**: 96 / 100 🟢
- **Lighthouse Best Practices**: 100 / 100 🟢
- **Lighthouse SEO**: 100 / 100 🟢
- **TypeScript**: 0 compiler errors (`tsc && vite build` clean exit)


### Added
- **Global Search & Command Palette (`Ctrl+K`)**: Keyboard-navigable quick search modal across all universities, specialties (OKSO codes), knowledge base articles, and interactive tools.
- **Categorized Mega-Navigation**: Reorganized top navigation with 5 primary highlighted tabs and 3 semantic dropdown menus («Инструменты», «Поступление», «Вузам») with full mobile drawer accordion support.
- **URL Hash Synchronization**: Two-way routing via `window.location.hash`, enabling direct deep links (e.g. `#vuz`, `#podbor`, `#calculator`, `#calendar`, `#reviews`, `#premium`) and browser Back/Forward navigation.
- **Reviews Keyword Search & Sorting**: Added live keyword filter and sorting dropdowns («Сначала полезные», «Сначала новые», «С официальным ответом вуза»).
- **Batch Calendar Export (.ics)**: 1-click export of all 10 key admissions deadlines into a combined `.ics` calendar file for Apple Calendar, Google Calendar, and Outlook.
- **Admissions Uncompleted Tasks Filter**: Added a toggle to filter out completed milestones and focus on upcoming deadlines.
- **Specialty Cross-Catalog Links**: Added «Смотреть вузы» buttons on each specialty card in the OKSO directory to jump directly into the university search filtered by that discipline.
- **Interactive SNILS / Application ID Position Tracker**: Realistic competitive queue simulation in Premium Analytics with original certificate filtering and live zone estimation.
- **Dynamic Code-Splitting with `React.lazy`**: Chunked secondary tabs and modals, reducing initial JavaScript bundle from 515 kB to 299 kB (83 kB gzipped).

### Performance & Quality
- **Lighthouse Performance**: 98 / 100
- **Lighthouse Accessibility**: 96 / 100
- **Lighthouse Best Practices**: 100 / 100
- **Lighthouse SEO**: 100 / 100
- **Core Web Vitals**: FCP 0.2s, LCP 0.2s, TBT 10ms, CLS 0.003
- **TypeScript**: 0 compiler errors (`tsc --noEmit` pass)

## [1.1.0] - 2026-11-11
- Added Podbor Wizard (`/podbor`) with 5-criteria questionnaire.
- Added Paid Tuition & 3% Preferred Loan Calculator (`/calculator/pay`).
- Added Top-100 Educational Programs (`/100program`).
- Added Top Specialties Ranking (`/topspec`).
- Added Admissions Deadlines Calendar 2026 (`/calendar`).
- Added Dorm Inspector and Chance Calculator (`/dorms`).
- Added University Partner Portal (`/vuzam`).
- Added Premium Admission Analytics (`/premium`).
- Added Side-by-side University Comparison Modal (`/sravni`).
- Added Advertiser Media Kit (`/adv`, `/kp`) and Moderation Feedback (`/feedback`).
- Added Russian OAuth Authentication Modal (`/zaklad`, Telegram, VK, Yandex).

## [1.0.0] - 2026-11-10
- Initial reverse-engineered remake of https://tabiturient.ru/
- Fully fluid responsive UI from 375px to 1920px.
