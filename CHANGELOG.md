# Changelog

All notable changes to the Tabiturient platform remake will be documented in this file.

## [1.2.0] - 2026-11-11

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
