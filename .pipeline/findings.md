# Remake Pipeline Multi-Angle Audit Findings

**Target**: `https://tabiturient.ru/`  
**Captured Date**: 2026-11-10  
**Stack Detected**: PHP 7.0, Nginx, MySQL, jQuery 1.11, table-based CSS layout with fixed 1000px viewport.

---

## 1. Inventory & Features Audit

The original website is Russia's primary university review and applicant intelligence portal ("Табитуриент").

### Core Modules Identified:
1. **University Search & Directory (`/`, `/ajax/ajvuz1.php`)**:
   - Filter by Region (85+ Russian subjects: Москва, Санкт-Петербург, etc.)
   - Filter by Study Area / Major (01.00.00 through 54.00.00)
   - Real-time text search by university name and abbreviation (МГУ, МФТИ, ВШЭ, МЭИ, СПбГУ, etc.)
   - Filters: State university (Государственный), Military department (Военная кафедра), Dormitory (Общежитие), Budget seats available.
2. **University Detail Dossier (`/ajax/ajshowmoreinfof4.php`)**:
   - Overview, coat of arms / logo, accreditations, campus locations
   - Comprehensive faculty and bachelor program listings with:
     - Required EGE subjects and minimum score
     - Historical passing cut-off scores (бюджет)
     - Tuition cost per year (платное обучение)
     - Number of budget and paid slots
   - Review sentiment distribution: Positive (зеленый), Neutral (серый), Negative (красный) with exact percentages.
   - Campus infrastructure ratings (Dormitories, Dining, Location, Sports).
3. **EGE Score Admission Calculator (`/calculator`)**:
   - Input scores for all 11 EGE subjects: Русский язык, Профильная математика, Базовая математика, Физика, Информатика, Химия, Биология, История, Обществознание, Английский язык, Литература, География.
   - Smart probability matching (Высокий шанс, Средний шанс, Рискованный) based on actual cut-offs.
   - Filter by budget vs paid tuition and region.
4. **Paid Tuition Calculator (`/calculator/pay`)**:
   - Filter programs by annual tuition fee budget (e.g. up to 150k, 250k, 400k+ руб/год).
5. **Student Reviews & "Сливы" (`/slivlist`, `/sliv`)**:
   - Student & alumni reviews categorized by sentiment.
   - Structured ratings: Quality of teaching, bribes/corruption level, dormitory comfort, student life, career placement.
   - Filter by university, program, graduation year.
   - Interactive review submission form.
6. **University Rankings & League Tables**:
   - **Рейтинг по отзывам (`/rating`)**: ranked by student review approval index.
   - **Глобальный рейтинг (`/globalrating`)**: composite academic & market prestige index.
   - **Рейтинг по баллам ЕГЭ (`/vuzege`)**: sorted by highest admission threshold.
   - **Рейтинг по стоимости обучения (`/vuzcost`)**: tuition fees across universities.
   - **Топ направлений (`/topspec`)**: most demanded academic disciplines.
7. **University Comparison Tool (`/sravni`)**:
   - Side-by-side comparison of 2–4 selected universities across key parameters.
8. **Specialties & Career Taxonomy (`/np`)**:
   - Complete directory of Russian academic classifications with job market outlook and required exams.
9. **Open Doors Days Calendar (`/dod`)**:
   - Schedule of open day events across universities (online and in-person).
10. **Admissions Q&A Community (`/question`)**:
    - Applicants ask questions, students and alumni answer, categorized by university and topic.
11. **Articles & Guides (`/article`)**:
    - Practical admission advice, Olympiads (БВИ), target quota (целевой прием), dorm survival.
12. **Saved Bookmarks (`/zaklad`)**:
    - Save programs and universities to user shortlist with instant comparison.

---

## 2. Design Audit (`impeccable` critique mode)

- **Observed Typography**: Fallback to `calibri, calibri2, arial`, unscaled text sizes, lack of responsive typography hierarchy.
- **Observed Color Palette**:
  - Primary Dark: `#212934`, `#242934`
  - Card & Background: `#FFFFFF`, `#F1F1F1`, `#ECECEC`
  - Sentiment Accents: Light Green `#F3F8E7` (border `#8BC34A`), Light Red `#F8EBEB` (border `#E57373`), Light Amber `#F8F3E1`.
- **Layout & Responsiveness Issues**:
  - Hardcoded `<meta name="viewport" content="width=1000, user-scalable=no">` creates massive overflow and broken rendering on smartphones (as seen in `mobile-375.png`).
  - Table-based nested layouts with fixed pixel widths.
- **Recommendations for Remake**:
  - Preserve the iconic dark navy identity (`#1c2430` / `#0f172a`) paired with clean modern cards, crisp borders, and the recognizable green/amber/red sentiment system.
  - Implement 100% responsive mobile-first UI with modern navigation bar, sticky search, mobile bottom sheet filters, and smooth card transitions.

---

## 3. Motion & Animation Audit

- **Observed**: Hard instantaneous show/hide via jQuery `.fadeIn(0)` and `.fadeOut(0)`, jumpy layout shifts when opening accordions or modals.
- **Opportunities**:
  - Smooth micro-interactions on hover for university cards and badges.
  - Animated progress bars for review sentiment and EGE score probability meter.
  - Smooth expandable accordion drawers for university faculties and programs.
  - Modal dialogues with backdrop blur and smooth entrance scaling.
  - Tab transition indicators with spring physics.

---

## 4. Performance & Baseline Metrics

- **Lighthouse Scores (Original `tabiturient.ru`)**:
  - Performance: **90**
  - Accessibility: **61** (Severe contrast issues, missing form aria-labels, fixed non-scalable viewport)
  - Best Practices: **92**
  - SEO: **83**
  - LCP: **3.0 s**
  - CLS: **0.002**
  - TBT: **20 ms**
- **Quality Target for Remake**:
  - Performance: ≥ 95
  - Accessibility: ≥ 95 (fixing all WCAG contrast and aria labels)
  - Best Practices: ≥ 95
  - SEO: ≥ 95
  - LCP: ≤ 1.5 s
  - CLS: 0.000

---

## 5. User Flows & Click Paths

- **Flow 1: Search & Filter University**: User filters by region/specialty -> results update -> clicking a university opens full details (faculties, scores, tuition, reviews).
- **Flow 2: Calculate Chances with EGE Scores**: User selects their subjects -> enters scores -> receives instant matching list with probability tier badges.
- **Flow 3: Review Exploration & Submission**: User views honest student reviews filtered by positive/negative -> reads detailed ratings -> submits their own review.
- **Flow 4: University Comparison**: User adds universities to comparison tray -> compares scores, tuition, dorms, and review scores in a comparison grid.
- **Flow 5: Q&A Community**: Browse questions by topic -> ask a question -> see answers.
- **Flow 6: Bookmarking**: Save programs/universities with quick badge counter.

---

## 6. Unknowns & Resolved Inferences

- Real live database has 600+ Russian universities. We will bundle rich, highly detailed authentic data for top universities across Moscow, Saint Petersburg, Novosibirsk, Tomsk, Kazan, Ekaterinburg, etc., covering diverse faculties, real passing scores, tuition fees, and realistic student reviews.
