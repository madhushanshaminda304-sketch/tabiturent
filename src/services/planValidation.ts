import { 
  PlanItem, 
  PlanState, 
  PlanStage, 
  EducationPathway, 
  PlanImportPreview 
} from '../types/plan';

export const CURRENT_PLAN_SCHEMA_VERSION = 1;

const VALID_STAGES: PlanStage[] = ['considering', 'shortlisted', 'preparing', 'applied', 'archived'];
const VALID_PATHWAYS: EducationPathway[] = ['ugc_state', 'private_approved', 'international_mou', 'other'];

/**
 * Validates a single plan item shape defensively.
 */
export function validatePlanItem(raw: any): PlanItem | null {
  if (!raw || typeof raw !== 'object') return null;

  const programId = String(raw.programId || raw.id || '').trim();
  const universityId = String(raw.universityId || '').trim();
  const programName = String(raw.programName || raw.name || '').trim();
  const universityName = String(raw.universityName || '').trim();

  if (!programId || !programName) {
    return null;
  }

  const intakeId = String(raw.intakeId || 'intake-2026-main').trim();
  const id = raw.id && raw.id.includes('::') ? raw.id : `${programId}::${intakeId}`;

  const stage: PlanStage = VALID_STAGES.includes(raw.stage) ? raw.stage : 'considering';
  const pathway: EducationPathway = VALID_PATHWAYS.includes(raw.pathway) ? raw.pathway : 'ugc_state';

  let nextAction = undefined;
  if (raw.nextAction && typeof raw.nextAction === 'object') {
    nextAction = {
      actionText: String(raw.nextAction.actionText || '').trim().slice(0, 200),
      targetDate: raw.nextAction.targetDate ? String(raw.nextAction.targetDate).slice(0, 20) : undefined,
      isCompleted: Boolean(raw.nextAction.isCompleted)
    };
  }

  return {
    id,
    programId,
    programCode: String(raw.programCode || raw.code || '00.00.00').trim(),
    programName,
    universityId: universityId || 'unknown-uni',
    universityName: universityName || 'Университет',
    campusId: String(raw.campusId || `${universityId}-main`).trim(),
    campusName: String(raw.campusName || 'Главный кампус').trim(),
    intakeId,
    intakeName: String(raw.intakeName || 'Набор 2026').trim(),
    durationYears: typeof raw.durationYears === 'number' && raw.durationYears > 0 ? raw.durationYears : 4,
    degree: raw.degree === 'Специалитет' ? 'Специалитет' : 'Бакалавриат',
    pathway,
    tuitionPerYear: typeof raw.tuitionPerYear === 'number' ? raw.tuitionPerYear : 0,
    passingScoreBudget: typeof raw.passingScoreBudget === 'number' ? raw.passingScoreBudget : undefined,
    passingScorePaid: typeof raw.passingScorePaid === 'number' ? raw.passingScorePaid : undefined,
    budgetSlots: typeof raw.budgetSlots === 'number' ? raw.budgetSlots : undefined,
    paidSlots: typeof raw.paidSlots === 'number' ? raw.paidSlots : undefined,
    knownRequirements: Array.isArray(raw.knownRequirements) ? raw.knownRequirements.map(String) : [],
    provenance: raw.provenance && typeof raw.provenance === 'object' ? raw.provenance : undefined,
    
    // Private student entries
    privateNote: typeof raw.privateNote === 'string' ? raw.privateNote.slice(0, 2000) : '',
    unresolvedQuestion: typeof raw.unresolvedQuestion === 'string' ? raw.unresolvedQuestion.slice(0, 1000) : '',
    stage,
    nextAction,
    createdAt: raw.createdAt && !isNaN(Date.parse(raw.createdAt)) ? raw.createdAt : new Date().toISOString(),
    updatedAt: raw.updatedAt && !isNaN(Date.parse(raw.updatedAt)) ? raw.updatedAt : new Date().toISOString()
  };
}

/**
 * Validates or migrates full plan storage state.
 */
export function migrateAndValidatePlanState(rawJson: unknown): PlanState {
  if (!rawJson || typeof rawJson !== 'object') {
    return { version: CURRENT_PLAN_SCHEMA_VERSION, items: [] };
  }

  const raw = rawJson as any;
  const rawItems = Array.isArray(raw.items) ? raw.items : Array.isArray(raw) ? raw : [];

  const validatedItems: PlanItem[] = [];
  const seenIds = new Set<string>();

  for (const item of rawItems) {
    const valid = validatePlanItem(item);
    if (valid && !seenIds.has(valid.id)) {
      seenIds.add(valid.id);
      validatedItems.push(valid);
    }
  }

  return {
    version: CURRENT_PLAN_SCHEMA_VERSION,
    items: validatedItems,
    lastBackupDate: typeof raw.lastBackupDate === 'string' ? raw.lastBackupDate : undefined
  };
}

/**
 * Validates a JSON backup string and produces a rich preview of incoming items.
 */
export function previewPlanImport(jsonContent: string, currentItems: PlanItem[]): PlanImportPreview {
  let parsed: any;

  try {
    parsed = JSON.parse(jsonContent);
  } catch (err: any) {
    return {
      isValid: false,
      totalInFile: 0,
      newCount: 0,
      updateCount: 0,
      invalidCount: 0,
      items: [],
      errors: ['Файл содержит некорректный JSON синтаксис.']
    };
  }

  const candidateItems = Array.isArray(parsed?.items)
    ? parsed.items
    : Array.isArray(parsed)
    ? parsed
    : [];

  if (candidateItems.length === 0) {
    return {
      isValid: false,
      totalInFile: 0,
      newCount: 0,
      updateCount: 0,
      invalidCount: 0,
      items: [],
      errors: ['В файле не найдено ни одной образовательной программы.']
    };
  }

  const currentIds = new Set(currentItems.map(i => i.id));
  const validItems: PlanItem[] = [];
  let newCount = 0;
  let updateCount = 0;
  let invalidCount = 0;

  for (const raw of candidateItems) {
    const valid = validatePlanItem(raw);
    if (!valid) {
      invalidCount++;
      continue;
    }
    validItems.push(valid);
    if (currentIds.has(valid.id)) {
      updateCount++;
    } else {
      newCount++;
    }
  }

  return {
    isValid: validItems.length > 0,
    totalInFile: candidateItems.length,
    newCount,
    updateCount,
    invalidCount,
    items: validItems,
    errors: invalidCount > 0 ? [`Пропущено ${invalidCount} некорректных записей.`] : []
  };
}

/**
 * Prepares JSON export. When includePrivateData is false, strips private notes and unresolved questions.
 */
export function serializePlanExport(items: PlanItem[], includePrivateData: boolean): string {
  const exportPayload = {
    app: 'UniPedia Feature Lab (Tabiturient)',
    exportType: includePrivateData ? 'private_full_backup' : 'shareable_selection',
    version: CURRENT_PLAN_SCHEMA_VERSION,
    exportedAt: new Date().toISOString(),
    itemCount: items.length,
    items: items.map(item => {
      if (includePrivateData) {
        return item;
      }
      // Strip personal notes and internal questions for clean shareable export
      const { privateNote, unresolvedQuestion, nextAction, ...publicMeta } = item;
      return {
        ...publicMeta,
        stage: item.stage
      };
    })
  };

  return JSON.stringify(exportPayload, null, 2);
}
