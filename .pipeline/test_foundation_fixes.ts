import assert from 'node:assert';
import { universityService } from '../src/services/universityService';
import { ShortlistService } from '../src/services/shortlistService';
import { reviewService } from '../src/services/reviewService';
import { calculateRecommendations } from '../src/calculations/recommendations';
import { evaluateDormChances } from '../src/calculations/dormChances';
import { buildIcsCalendar } from '../src/services/calendarService';
import { ADMISSIONS_DEADLINES } from '../src/data/mockData';

console.log('Testing Foundation Fixes...');

// 1. University Service filtering test (Issue 7)
const allUnis = universityService.getAll();
assert.ok(allUnis.length > 0, 'Must load universities with provenance');
assert.ok(allUnis[0].provenance, 'University must have provenance attached');
assert.strictEqual(allUnis[0].provenance?.dataset, 'experimental_ru_archive', 'Dataset must be labelled experimental_ru_archive');

// Filter by area: 'Архитектура и дизайн' should not return all universities
const archUnis = universityService.filter({ studyArea: 'Архитектура и дизайн' });
assert.ok(archUnis.length < allUnis.length, 'Filter for Architecture must filter out non-matching universities');

// Filter by area: 'Математика и IT'
const itUnis = universityService.filter({ studyArea: 'Математика и IT' });
assert.ok(itUnis.length > 0 && itUnis.length <= allUnis.length, 'Filter for IT must return IT universities');

// 2. Shortlist URL Parser (Issue 2)
// Simulated URL parsing
const shareUrl = ShortlistService.generateShareUrl(['hse', 'bmstu']);
assert.ok(shareUrl.includes('compare=hse,bmstu'), 'Share URL must encode IDs');

// 3. Review Service (Issue 3)
const initialReviewsCount = reviewService.getAll().length;
const newReview = reviewService.addReview({
  id: 'rev-user-test-1',
  universityId: 'hse',
  universityName: 'НИУ ВШЭ',
  facultyName: 'ФКН',
  author: 'Тестовый Студент',
  authorStatus: 'Студент',
  sentiment: 'positive',
  date: 'Только что',
  title: 'Честный отзыв о ФКН',
  content: 'Тестовый текст отзыва',
  ratings: { teaching: 5, corruption: 'Нет', dormitory: 5, studentLife: 5, career: 5 },
  likes: 0,
  commentsCount: 0
});
const updatedReviews = reviewService.getAll();
assert.strictEqual(updatedReviews.length, initialReviewsCount + 1, 'Review must be added to reviewService');
assert.strictEqual(updatedReviews[0].id, 'rev-user-test-1', 'New review must be at the top');

// 4. Recommendation calculation incorporates goal & direction (Issue 1)
const recsBudget = calculateRecommendations(allUnis, {
  goal: 'budget',
  direction: 'it',
  region: 'Все регионы',
  priority: 'career',
  scoreRange: 'high'
});
assert.ok(recsBudget.length > 0, 'Recommendations should return ranked universities');
assert.ok(recsBudget[0].matchPercent >= 55 && recsBudget[0].matchPercent <= 99, 'Match percent should be in bounds');
assert.ok(recsBudget[0].matchedCriteria.length > 0, 'Matched criteria must be explained');

// 5. Dorm Chance evaluation (Issue 6)
const dormRes1 = evaluateDormChances({
  hasDorm: true,
  distanceKm: 'far',
  educationType: 'budget',
  socialBenefit: 'orphan',
  egeScore: 280
});
assert.strictEqual(dormRes1.priorityBand, 'priority_guaranteed', 'Orphans must receive legal priority');
assert.ok(dormRes1.provenanceDisclaimer.length > 0, 'Must include provenance disclaimer');

const dormResNoDorm = evaluateDormChances({
  hasDorm: false,
  distanceKm: 'far',
  educationType: 'budget',
  socialBenefit: 'none',
  egeScore: 280
});
assert.strictEqual(dormResNoDorm.priorityBand, 'no_dorm');
assert.strictEqual(dormResNoDorm.percent, 0);

// 6. Calendar ICS with valid RFC 5545 dates (Issue 5)
const icsOutput = buildIcsCalendar(ADMISSIONS_DEADLINES.slice(0, 2), 'Test Calendar');
assert.ok(icsOutput.includes('BEGIN:VCALENDAR'), 'ICS must have calendar header');
assert.ok(icsOutput.includes('DTSTART:2026'), 'ICS must have parsed DTSTART date');
assert.ok(icsOutput.includes('DTEND:2026'), 'ICS must have parsed DTEND date');
assert.ok(icsOutput.includes('BEGIN:VALARM'), 'ICS must have VALARM notification trigger');

console.log('✓ ALL FOUNDATION FIX TESTS PASSED SUCCESSFULLY!');
