import assert from 'node:assert';
import { 
  validatePlanItem, 
  migrateAndValidatePlanState, 
  previewPlanImport, 
  serializePlanExport 
} from '../src/services/planValidation';
import { PlanItem } from '../src/types/plan';

console.log('Testing Plan Validation and Storage Logic...');

// 1. Starting empty / malformed handling
const emptyState = migrateAndValidatePlanState(null);
assert.strictEqual(emptyState.items.length, 0, 'Null state should produce 0 items');

const corruptedState = migrateAndValidatePlanState({ invalid: 'nonsense', items: 'not an array' });
assert.strictEqual(corruptedState.items.length, 0, 'Corrupted structure should produce 0 items');

// 2. Item validation & sanitization
const validRaw = {
  programId: 'prog-hse-se-2026',
  programName: 'Программная инженерия',
  universityId: 'hse',
  universityName: 'НИУ ВШЭ',
  durationYears: 4,
  pathway: 'ugc_state',
  stage: 'considering'
};

const validated = validatePlanItem(validRaw);
assert.ok(validated, 'Valid raw should be accepted');
assert.strictEqual(validated?.id, 'prog-hse-se-2026::intake-2026-main', 'Should generate composite key');
assert.strictEqual(validated?.stage, 'considering');
assert.strictEqual(validated?.pathway, 'ugc_state');

// 3. Deduplication in state migration
const duplicateRawState = {
  version: 1,
  items: [
    validRaw,
    { ...validRaw, privateNote: 'second attempt' }
  ]
};
const deduplicatedState = migrateAndValidatePlanState(duplicateRawState);
assert.strictEqual(deduplicatedState.items.length, 1, 'Duplicate items should be deduplicated by composite ID');

// 4. Stage transition and private data separation
const fullItem: PlanItem = {
  ...validated!,
  privateNote: 'Secret note about dorm and cost',
  unresolvedQuestion: 'Can I transfer credits?',
  stage: 'preparing',
  nextAction: {
    actionText: 'Submit certified copies',
    targetDate: '2026-07-25',
    isCompleted: false
  }
};

const exportedPublic = serializePlanExport([fullItem], false);
const parsedPublic = JSON.parse(exportedPublic);
assert.strictEqual(parsedPublic.items[0].privateNote, undefined, 'Public export must omit private note');
assert.strictEqual(parsedPublic.items[0].unresolvedQuestion, undefined, 'Public export must omit unresolved question');
assert.strictEqual(parsedPublic.items[0].nextAction, undefined, 'Public export must omit personal next action');
assert.strictEqual(parsedPublic.items[0].programName, 'Программная инженерия', 'Public export retains program name');

const exportedPrivate = serializePlanExport([fullItem], true);
const parsedPrivate = JSON.parse(exportedPrivate);
assert.strictEqual(parsedPrivate.items[0].privateNote, 'Secret note about dorm and cost', 'Private export preserves notes');

// 5. Backup Preview validation
const previewValid = previewPlanImport(exportedPrivate, []);
assert.strictEqual(previewValid.isValid, true);
assert.strictEqual(previewValid.totalInFile, 1);
assert.strictEqual(previewValid.newCount, 1);
assert.strictEqual(previewValid.updateCount, 0);

// With existing item
const previewWithExisting = previewPlanImport(exportedPrivate, [fullItem]);
assert.strictEqual(previewWithExisting.updateCount, 1);
assert.strictEqual(previewWithExisting.newCount, 0);

// Malformed JSON preview
const previewMalformed = previewPlanImport('{ broken json', []);
assert.strictEqual(previewMalformed.isValid, false);
assert.ok(previewMalformed.errors.length > 0);

console.log('✓ ALL PLAN TESTS PASSED SUCCESSFULLY!');
