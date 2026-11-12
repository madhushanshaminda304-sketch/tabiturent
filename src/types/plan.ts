import { DataProvenance } from './index';

export type PlanStage = 
  | 'considering'   // Рассматриваю
  | 'shortlisted'   // В шортлисте
  | 'preparing'     // Готовлю документы
  | 'applied'       // Подано заявление
  | 'archived';     // В архиве

export type EducationPathway = 
  | 'ugc_state'           // Государственный грант / бюджет (UGC)
  | 'private_approved'    // Аккредитованный негосударственный / контракт
  | 'international_mou'   // Международная программа / двойной диплом
  | 'other';              // Иной трек

export interface PlanNextAction {
  actionText: string;
  targetDate?: string;    // ISO YYYY-MM-DD
  isCompleted: boolean;
}

export interface PlanItemPublicMeta {
  programId: string;
  programCode: string;
  programName: string;
  universityId: string;
  universityName: string;
  campusId: string;
  campusName: string;
  intakeId: string;
  intakeName: string;     // e.g. "Основной набор 2026"
  durationYears: number;
  degree: 'Бакалавриат' | 'Специалитет';
  pathway: EducationPathway;
  tuitionPerYear: number;
  passingScoreBudget?: number;
  passingScorePaid?: number;
  budgetSlots?: number;
  paidSlots?: number;
  knownRequirements: string[];
  provenance?: DataProvenance;
}

export interface PlanItemStudentPrivate {
  privateNote: string;
  unresolvedQuestion: string;
  stage: PlanStage;
  nextAction?: PlanNextAction;
  updatedAt: string;      // ISO string
}

export interface PlanItem extends PlanItemPublicMeta, PlanItemStudentPrivate {
  id: string;             // Composite unique key: `${programId}::${intakeId}`
  createdAt: string;      // ISO string
}

export interface PlanState {
  version: number;        // Schema version (currently 1)
  items: PlanItem[];
  lastBackupDate?: string;
}

export interface PlanImportPreview {
  isValid: boolean;
  totalInFile: number;
  newCount: number;
  updateCount: number;
  invalidCount: number;
  items: PlanItem[];
  errors: string[];
}
