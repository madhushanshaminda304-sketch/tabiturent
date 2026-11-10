# Tabiturient Remake Specification (.pipeline/spec.md)

## 1. Executive Summary
A modern, ultra-responsive, high-performance remake of **Табитуриент (tabiturient.ru)** — Russia's leading university admissions and review intelligence platform. Built with React, TypeScript, Next.js / Vite, Tailwind CSS, Lucide icons, and modern animations.

## 2. Architecture & Tech Stack
- **Framework**: Vite + React 19 + TypeScript (instant HMR, fast builds, zero bloat, high client reactivity) or Next.js.
  *(Vite + React + Tailwind + Lucide is ideal here for zero-latency client-side calculations, interactive filtering of universities/specialties, comparison tray, and smooth client-side routing).*
- **Styling**: Tailwind CSS with custom design system tokens matching the Tabiturient visual aesthetic (Navy `#1a222e`, slate borders, modern cards, and emerald/amber/rose sentiment badges).
- **Icons**: Lucide React.
- **State Management**: React state + custom hooks + LocalStorage persistence for Saved Bookmarks and Comparison items.
- **Data Layer**: Structured mock database in TypeScript with comprehensive records of top Russian universities (МГУ, МФТИ, ВШЭ, МЭИ, СПбГУ, МГТУ им. Баумана, ИТМО, РХТУ, РАНХиГС, НГУ, ТГУ, КФУ, УрФУ, etc.), faculties, admission programs with historical passing scores, tuition fees, student reviews, Q&A topics, articles, and open door days.

## 3. Core Modules & User Journeys

### Module 1: Universal Header & Navigation
- Logo: Modernized "Табитуриент" wordmark with sub-label "Честный гид по вузам".
- Navigation Tabs:
  - 🏫 Поиск вуза (Search Universities)
  - 🎓 Специальности (Specialties / Programs)
  - 🧮 Калькулятор ЕГЭ (EGE Calculator)
  - 💬 Отзывы ("Сливы") (Reviews)
  - 🏆 Рейтинги (Rankings)
  - ⚖️ Сравнение (Compare)
  - 📅 Дни дверей (Open Days)
  - ❓ Вопросы (Q&A)
  - 📖 Статьи (Guides)
- Action buttons:
  - Bookmark counter badge
  - University compare badge
  - Login / Profile trigger modal

### Module 2: University Search & Directory (Home)
- Hero Search Section with dark navy backdrop:
  - Live query input (search by university name, abbreviation, or city)
  - Region selector dropdown (Все регионы, Москва, Санкт-Петербург, Новосибирск, Казань, etc.)
  - Study Area dropdown (Информатика, Экономика, Медицина, Инженерия, Юриспруденция, etc.)
  - Filter toggles:
    - Только государственные (State only)
    - Военная кафедра (Military department)
    - Общежитие (Dormitories available)
    - Бюджетные места (Budget seats)
- University Cards Grid:
  - Logo / Coat of arms, Full and short name, Region badge
  - Key statistics: Reviews count and satisfaction % (green/gray/red bar), Min passing score, Tuition cost from, Military & Dorm badges
  - Quick action: Add to Compare (⚖️), Bookmark (★), and "Подробнее" (Expand details)
- University Detail Modal / Accordion:
  - Full faculties and bachelor programs list
  - Real cut-off passing scores (бюджет) and tuition fees
  - Dormitory conditions and student feedback
  - Review sentiment distribution chart
  - Recent student reviews

### Module 3: EGE Score Admission Calculator
- 11 EGE subjects with numeric inputs (0–100) and toggles:
  - Русский язык (mandatory)
  - Профильная математика / Базовая математика
  - Обществознание, Физика, Информатика (ИКТ), Химия, Биология, История, Английский язык, Литература, География.
- Selection of preferences:
  - Budget vs Paid tuition
  - Desired Region(s)
  - Target fields of study
- Instant calculation algorithm:
  - Evaluates user sum against program entrance cut-offs:
    - **Высокий шанс (≥ cut-off + 5)**: Green badge
    - **Средний шанс (cut-off - 5 to +4)**: Amber badge
    - **Рискованный шанс (< cut-off - 5)**: Slate badge
  - Shows exact gap in points, number of budget slots, and link to program details.

### Module 4: Paid Tuition Calculator
- Filter programs by maximum annual tuition fee (e.g. slider from 100,000 to 700,000+ ₽/год).
- Ranking of programs by cost vs review rating ratio ("Лучшая ценность").

### Module 5: Student Reviews & "Сливы"
- Review sentiment categorization:
  - 🟢 Положительные (Positive)
  - 🟡 Нейтральные (Neutral)
  - 🔴 Отрицательные (Negative)
- Detailed score breakdown per review:
  - Качество преподавания (Teaching quality 1-5★)
  - Коррупция / Взятки (Corruption level: Отсутствует / Редко / Присутствует)
  - Состояние общежитий (Dormitory conditions 1-5★)
  - Внеучебная жизнь (Student life 1-5★)
  - Трудоустройство (Employment prospects 1-5★)
- Review Submission Modal:
  - Interactive form for submitting a review with sentiment, scores, and honest written text.
  - Reviews immediately appear in the feed.

### Module 6: League Tables & Rankings
- 4 interactive tabbed rankings:
  1. **Рейтинг по отзывам студентов**: ranked by positive review percentage and trust score.
  2. **Глобальный рейтинг вузов**: composite national academic & career ranking.
  3. **Рейтинг по проходному баллу**: sorted by average EGE score for budget admission.
  4. **Рейтинг по стоимости обучения**: sorted from affordable to premium.
- Filter rankings by region or search query.

### Module 7: University Comparison Tool (Side-by-Side)
- Compare up to 4 selected universities simultaneously across:
  - Средний балл ЕГЭ на бюджет
  - Стоимость обучения в год
  - % положительных отзывов студентов
  - Общежитие и количество мест
  - Наличие военной кафедры
  - Количество бюджетных мест
  - Возможность удалить / добавить университет.

### Module 8: Open Doors Days Calendar (Дни открытых дверей)
- Upcoming events filterable by month, university, and format (Онлайн / Очно).
- Event details, date, time, address, and registration link.

### Module 9: Specialties & Career Directory
- Taxonomy by official Russian OKSO codes (09.03.01, 01.03.02, 38.03.01, etc.).
- Descriptions, required EGE subjects, average salary after graduation, and list of universities teaching each program.

### Module 10: Questions & Answers (Q&A) Community
- Applicant questions list with answers, views counter, and university tags.
- "Задать вопрос" (Ask a question) modal with instant posting.

### Module 11: Articles & Guides
- Categorized guides for applicants (ЕГЭ, Поступление, БВИ и олимпиады, Общежития, Целевое обучение).
- Full article reader modal / view.

### Module 12: Bookmarks & Favorites
- Fast access drawer / tab showing all bookmarked universities and programs with one-click export or compare.
