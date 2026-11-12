# UniPedia Feature Laboratory — Architecture & Experiment Guide

## 1. Executive Summary & Purpose
This repository acts as an **experimental feature laboratory** for **UniPedia**, a Sri Lankan university discovery and planning platform. It investigates and tests interaction patterns for a dependable student planning journey:

```
Discover programmes ──► Save a shortlist ──► Compare choices ──► Understand costs ──► Track next steps ──► Share the plan
```

> **Integration Boundary Notice**:
> Work in this repository is strictly contained to this testbed. It does not connect to, mutate, or deploy the core UniPedia production infrastructure.

---

## 2. The Connected “My Plan” Workspace
Unlike generic university bookmarking tools, the **“My Plan”** workspace is centered specifically on **programmes** (specialties), acknowledging that students apply to distinct faculties, degrees, and intakes:

### Key Capabilities
1. **Programme-Centric Tracking**:
   - Captures degree level (Bachelor's / Specialist), duration (years), intake (`intake-2026-main`), campus ID, budget vs. paid tuition, and known entrance requirements.
   - Stable composite keys (`${programId}::${intakeId}`) guarantee deduplication across directory, recommendation wizard, and calculator saves.
2. **Honest Pathway Classification**:
   - Distinguishes **UGC State Grant / Budget** (`ugc_state`) from **Accredited Private / Contract** (`private_approved`), **International MoU** (`international_mou`), and **Other Pathways** (`other`).
   - Does not fabricate Sri Lankan admission rules or arbitrary conversion formulas.
3. **Student Privacy & Personal Notes**:
   - Private personal notes (`privateNote`) and unresolved questions (`unresolvedQuestion`) remain client-side only.
   - Shareable exports and comparison links cleanly strip private student data, ensuring sensitive questions or personal budget notes are not inadvertently leaked.
4. **Actionable Next Steps**:
   - Each planned programme supports one designated **Next Action** with an optional personal target deadline (e.g. *“Submit certified transcript copies by 2026-07-20”*), focusing on immediate progress rather than artificial urgency badges or fake gamification streaks.
5. **Stage Progression**:
   - **Considering** (`considering`) → **Shortlisted** (`shortlisted`) → **Preparing** (`preparing`) → **Applied** (`applied`) → **Archived** (`archived`).
6. **Local Persistence & Data Safety**:
   - LocalStorage schema `unipedia_my_plan_v1` with validation and defensive migration.
   - Corrupted or unavailable storage falls back gracefully to in-memory state with a visible diagnostic alert instead of crashing or falsely pretending data was stored.
   - Single-click **Undo** for accidental removals.
   - Private JSON backup download and import with a preview modal (allowing the user to choose between non-destructive **Merge** and full **Replace**).

---

## 3. Verified Codebase Issues & Foundation Remediations

| # | Investigated Component | Previous Defect | Foundation Remediation in Laboratory |
|---|---|---|---|
| **1** | `PodborWizard` | Ignored funding goal (`goal`) and study direction (`direction`) while claiming to be a "neural network filter". | Extracted pure logic into `src/calculations/recommendations.ts`. Accurately evaluates all 5 criteria (goal, direction, region, priority, score tier) and displays transparent criteria match badges. |
| **2** | `ComparisonModal` & `App` | Comparison URLs (`?compare=...`) were generated but never parsed or restored on page load. | Added `ShortlistService.parseCompareFromUrl()` in `App.tsx` to automatically restore compared items and open the comparison modal on page load. |
| **3** | `SubmitReviewModal` & `App` | Global review submissions through the top modal discarded review data and only switched the active tab. | Introduced `reviewService.ts` with local persistence (`tabi_user_reviews`). Reviews submitted globally or within the tab are saved and shown immediately with a local demo badge. |
| **4** | `AdmissionsCalendar` & `AuthModal` | Displayed false success toasts claiming email instructions were sent, accounts were created, and 24-hour reminders were scheduled. | Replaced with honest demo behaviour: `authService.ts` creates local guest demo profiles; reminders are saved in local checklist state with explicit explanation of browser limits. |
| **5** | `AdmissionsCalendar` | `.ics` calendar exports completely lacked RFC 5545 `DTSTART` and `DTEND` dates, making events undated. | Created `calendarService.ts` with Russian date string parser and valid RFC 5545 `DTSTART`, `DTEND`, `DTSTAMP`, and `VALARM` triggers. |
| **6** | `DormChanceCalculator` & `EgeCalculator` | Arbitrary base percentages (e.g. 70 ± 15) clamped and presented as "Guaranteed admission/accommodation". | Extracted pure calculation functions (`src/calculations/dormChances.ts` and `admissionChances.ts`) using legal/administrative priority bands and explicit provenance disclaimers that real decisions belong to university admissions and housing committees. |
| **7** | `HeroSearch` & `App` | Filters for 'Естественные науки' and 'Архитектура и дизайн' returned `true` for all entries without filtering. | Introduced `universityService.filter(...)` with comprehensive OKSO code prefix handling (`03.*`, `04.*`, `05.*`, `06.*` for sciences, `07.*`, `54.*` for design/architecture). |

---

## 4. Dataset Provenance & Labelling

All university records, tuition figures, dormitory ratings, and admissions dates currently in this repository represent an **experimental Russian archive dataset** (`dataset: 'experimental_ru_archive'`).

- **Provenance Structure**:
  ```ts
  export interface DataProvenance {
    sourceUrl?: string;
    sourceName: string;
    applicableYearOrIntake: string;
    lastVerifiedDate?: string;
    verificationStatus: 'verified' | 'unverified' | 'historical' | 'sample_data';
    dataset: 'experimental_ru_archive';
    notes?: string;
  }
  ```
- **Rule of Integrity**: Under no circumstances should Russian institutions be falsely rebranded with fabricated Sri Lankan names. When UniPedia Sri Lanka data (UGC handbook data, state university faculties, TVEC vocational courses) is integrated in the core project, it must enter via official UGC verified pipelines. Unknown facts remain explicitly marked as unknown.

---

## 5. What Works vs. What is Simulated

### Fully Working Client-Side Features
- **My Plan Workspace**: Programme-level tracking, stages, inline note editing, unresolved questions, next actions with deadlines, undo, JSON backup export, and JSON validated restore.
- **Data Access Layer**: `universityService`, `reviewService`, `planStore`, `calendarService`, `shortlistService`, `authService`.
- **Pure Calculations**: Transparent admission EGE cutoff delta, dorm administrative priority bands, criteria-based recommendations, and 3% education loan schedule.
- **Deep Routing**: Synchronization of `#plan`, `#vuz`, `#calculator`, etc., and URL query parameter restoration (`?compare=id1,id2`).
- **Calendar RFC 5545**: `.ics` files with compliant timestamps and reminder alarms for Google Calendar, Apple Calendar, and Outlook.

### Simulated / Demo Operations (Honest Limitations)
- **Central Database Sync**: Data is saved to the user's browser `localStorage`. Multi-device sync requires importing a JSON backup.
- **Authentication**: Guest demo sessions operate client-side. No remote email confirmation or third-party OAuth is contacted.
- **Live University Admissions / ERP**: Submitting a review or viewing a status does not transmit records to the Russian Ministry of Education or Sri Lankan UGC servers.
