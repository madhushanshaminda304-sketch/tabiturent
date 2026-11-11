# Tabiturient Remake Expanded Specification (.pipeline/spec.md)

## 1. Executive Summary
A comprehensive, ultra-responsive, high-performance clone and modernization of **Табитуриент (tabiturient.ru)** — Russia's leading university admissions and review intelligence platform. Built with React 18, TypeScript, Vite, Tailwind CSS, Lucide icons, and modern zero-latency client reactivity.

## 2. All 15 Core Modules

### 1. Поиск вуза (University Search & Directory - `/`)
- Real-time search by name, abbreviation (МЭИ, ВШЭ, Бауманка).
- Filter by Region (Москва, Санкт-Петербург, Новосибирск, Казань, etc.).
- Filter by Direction, State university, Military department, and Dormitory.
- Detailed cards with review satisfaction bar, passing score, tuition, and budget seats.

### 2. Подборка образовательных программ (Smart Matcher Wizard - `/podbor`)
- 5-step interactive questionnaire for applicants.
- Custom score calculations evaluating goal, region, direction, priorities (dorm, military, career), and EGE score range.
- Top-3 personalized recommendation matches with exact percentage match.

### 3. Калькулятор ЕГЭ (Admission Calculator - `/calculator`)
- 11 EGE subjects with numeric score inputs (0–100) and toggles.
- Quick presets (IT, Engineering, Economics, Humanities, Medicine).
- Individual achievements score (+1 to +10).
- Real-time chance calculation: Высокий шанс, Средний шанс, Рискованный.

### 4. Калькулятор платного обучения & Госкредит 3% (`/calculator/pay`)
- Filter programs by annual tuition fee budget slider (150 000 to 900 000 ₽ / год).
- Subsidized student loan simulator (3% annual interest, government subsidy, grace period payments of 150–900 ₽/month during study, 15-year repayment schedule).

### 5. Топ-100 программ России (`/100program`)
- National ranking of top undergraduate and specialist programs.
- Sorting by rank, start salary, passing EGE score, and competition (чел/место).

### 6. Сливы отзывов студентов (`/slivlist`, `/sliv`)
- Real unfiltered student reviews classified as Positive, Neutral, Negative.
- Multi-criteria ratings (teaching, corruption, dorms, student life, career).
- Verified official replies from university administrations.
- Interactive submission form.

### 7. Инспектор студенческих общежитий («Общаги»)
- Comprehensive dorm directory with inspection metrics:
  - Cleanliness & pests (Тараканы / Клопы: Отсутствуют, Редко, Бывают).
  - Warden strictness (Лояльный, Умеренный, Строгий).
  - Curfew (24/7 или закрывается).
  - Bathroom location, Wi-Fi speed, distance to metro & campus.

### 8. Сводные рейтинги вузов (`/rating`, `/globalrating`, `/vuzege`, `/vuzcost`)
- 4 league tables: by student satisfaction, national global rank, passing scores, and tuition cost.

### 9. Интерактивная карта кампусов и навигатор (`/map`)
- City-by-city map navigator (Москва, Санкт-Петербург, Казань, Новосибирск) with metro stations and campus locations.

### 10. Каталог специальностей (ОКСО - `/np`)
- Complete code classification (09.03.01, 09.03.04, 01.03.02, 38.03.01, etc.) with required exams, average salaries, and universities count.

### 11. Дни открытых дверей (ДОД - `/dod`)
- Event calendar filterable by format (Очно / Онлайн) and registration links.

### 12. Сообщество вопросов и ответов (Q&A - `/question`)
- Applicant Q&A feed with views, categories, and student answers.
- "Задать вопрос" form.

### 13. Статьи и база знаний (`/article`)
- Editorial guides on admission calendar, Olympiads (БВИ), budgeting, and dorm survival.
- Modal article reader.

### 14. Кабинет представителя вуза («Вузам» - `/vuzam`)
- Verification dashboard for university staff.
- Official reply publisher with verification badge.
- Open doors event publisher and view analytics.

### 15. Премиум аналитика поступления & Трекер согласий (`/premium`)
- Real-time simulation of competitive ranking lists.
- Filters out non-original diploma submissions to compute true applicant rank.
