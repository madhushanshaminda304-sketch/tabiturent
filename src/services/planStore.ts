import { useState, useEffect } from 'react';
import { PlanItem, PlanItemPublicMeta, PlanStage, PlanState } from '../types/plan';
import { 
  CURRENT_PLAN_SCHEMA_VERSION, 
  migrateAndValidatePlanState, 
  validatePlanItem 
} from './planValidation';

const PLAN_STORAGE_KEY = 'unipedia_my_plan_v1';

type Listener = (items: PlanItem[]) => void;

class PlanStore {
  private items: PlanItem[] = [];
  private listeners: Set<Listener> = new Set();
  private lastRemovedItem: { item: PlanItem; index: number } | null = null;
  private storageAvailable: boolean = true;
  private lastStorageError: string | null = null;
  private isInitialized: boolean = false;

  constructor() {
    this.init();
  }

  private init() {
    if (this.isInitialized) return;
    this.isInitialized = true;

    if (typeof window === 'undefined' || !window.localStorage) {
      this.storageAvailable = false;
      this.items = [];
      return;
    }

    try {
      const raw = window.localStorage.getItem(PLAN_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        const state = migrateAndValidatePlanState(parsed);
        this.items = state.items;
      } else {
        // Requirement 4: Start new users with an empty plan. Do not pre-save universities or programmes.
        this.items = [];
      }
      this.storageAvailable = true;
      this.lastStorageError = null;
    } catch (err: any) {
      console.warn('[PlanStore] Failed to read from localStorage, using in-memory plan:', err);
      this.items = [];
      this.lastStorageError = 'Не удалось загрузить сохраненный план из браузера (поврежденные данные). План инициализирован заново.';
    }
  }

  private persist(): boolean {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }

    const state: PlanState = {
      version: CURRENT_PLAN_SCHEMA_VERSION,
      items: this.items
    };

    try {
      window.localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(state));
      this.storageAvailable = true;
      this.lastStorageError = null;
      return true;
    } catch (err: any) {
      this.storageAvailable = false;
      const isQuota = err && (err.name === 'QuotaExceededError' || err.code === 22);
      this.lastStorageError = isQuota
        ? 'Превышен лимит памяти хранилища браузера (QuotaExceeded). Изменения доступны только до закрытия вкладки.'
        : 'Хранилище браузера недоступно. Ваши данные не могут быть сохранены локально.';
      console.error('[PlanStore] Storage write failed:', err);
      return false;
    }
  }

  private emit() {
    const copy = [...this.items];
    this.listeners.forEach((l) => {
      try {
        l(copy);
      } catch (err) {
        console.error('[PlanStore] Listener notification error:', err);
      }
    });
  }

  public getItems(): PlanItem[] {
    return [...this.items];
  }

  public getItem(id: string): PlanItem | undefined {
    return this.items.find((i) => i.id === id);
  }

  public hasProgram(programId: string, intakeId: string = 'intake-2026-main'): boolean {
    const compositeId = `${programId}::${intakeId}`;
    return this.items.some((i) => i.id === compositeId || i.programId === programId);
  }

  public addProgram(
    meta: Omit<PlanItemPublicMeta, 'intakeId' | 'intakeName'> & {
      intakeId?: string;
      intakeName?: string;
    },
    initialStage: PlanStage = 'considering'
  ): { item: PlanItem; alreadyExisted: boolean } {
    const intakeId = meta.intakeId || 'intake-2026-main';
    const compositeId = `${meta.programId}::${intakeId}`;

    const existingIndex = this.items.findIndex((i) => i.id === compositeId);
    if (existingIndex >= 0) {
      // Deduplicate entries using stable programme/intake identifiers
      return { item: this.items[existingIndex], alreadyExisted: true };
    }

    const newItem: PlanItem = {
      id: compositeId,
      programId: meta.programId,
      programCode: meta.programCode || '00.00.00',
      programName: meta.programName,
      universityId: meta.universityId,
      universityName: meta.universityName,
      campusId: meta.campusId || `${meta.universityId}-main`,
      campusName: meta.campusName || 'Главный кампус',
      intakeId,
      intakeName: meta.intakeName || 'Основной набор 2026',
      durationYears: meta.durationYears || 4,
      degree: meta.degree || 'Бакалавриат',
      pathway: meta.pathway || 'ugc_state',
      tuitionPerYear: meta.tuitionPerYear || 0,
      passingScoreBudget: meta.passingScoreBudget,
      passingScorePaid: meta.passingScorePaid,
      budgetSlots: meta.budgetSlots,
      paidSlots: meta.paidSlots,
      knownRequirements: meta.knownRequirements || [],
      provenance: meta.provenance,
      privateNote: '',
      unresolvedQuestion: '',
      stage: initialStage,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const valid = validatePlanItem(newItem);
    if (!valid) {
      throw new Error('Некорректные данные программы для сохранения в план.');
    }

    this.items.unshift(valid);
    this.persist();
    this.emit();
    return { item: valid, alreadyExisted: false };
  }

  public updateItem(id: string, updates: Partial<PlanItem>): PlanItem | undefined {
    const index = this.items.findIndex((i) => i.id === id);
    if (index === -1) return undefined;

    const current = this.items[index];
    const merged: PlanItem = {
      ...current,
      ...updates,
      id: current.id, // prevent changing ID
      programId: current.programId,
      intakeId: current.intakeId,
      updatedAt: new Date().toISOString()
    };

    const valid = validatePlanItem(merged);
    if (!valid) return undefined;

    this.items[index] = valid;
    this.persist();
    this.emit();
    return valid;
  }

  public removeItem(id: string): PlanItem | null {
    const index = this.items.findIndex((i) => i.id === id);
    if (index === -1) return null;

    const removed = this.items[index];
    this.lastRemovedItem = { item: removed, index };
    this.items.splice(index, 1);
    this.persist();
    this.emit();
    return removed;
  }

  public undoLastRemove(): PlanItem | null {
    if (!this.lastRemovedItem) return null;

    const { item, index } = this.lastRemovedItem;
    // Prevent duplicate if already added back
    if (!this.items.some((i) => i.id === item.id)) {
      const insertAt = Math.min(index, this.items.length);
      this.items.splice(insertAt, 0, item);
      this.persist();
      this.emit();
    }
    this.lastRemovedItem = null;
    return item;
  }

  public hasUndo(): boolean {
    return this.lastRemovedItem !== null;
  }

  public importBackup(items: PlanItem[], mode: 'replace' | 'merge'): void {
    if (mode === 'replace') {
      this.items = [...items];
    } else {
      const existingMap = new Map(this.items.map((i) => [i.id, i]));
      for (const item of items) {
        existingMap.set(item.id, item);
      }
      this.items = Array.from(existingMap.values());
    }
    this.lastRemovedItem = null;
    this.persist();
    this.emit();
  }

  public clearPlan(): void {
    this.items = [];
    this.lastRemovedItem = null;
    this.persist();
    this.emit();
  }

  public isStorageHealthy(): boolean {
    return this.storageAvailable;
  }

  public getStorageError(): string | null {
    return this.lastStorageError;
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    // Initial call
    listener([...this.items]);
    return () => {
      this.listeners.delete(listener);
    };
  }
}

// Global shared singleton
export const planStore = new PlanStore();

/**
 * React hook to consume planStore reactively.
 */
export function usePlanStore() {
  const [items, setItems] = useState<PlanItem[]>(() => planStore.getItems());
  const [canUndo, setCanUndo] = useState<boolean>(() => planStore.hasUndo());
  const [storageError, setStorageError] = useState<string | null>(() => planStore.getStorageError());

  useEffect(() => {
    const unsubscribe = planStore.subscribe((updatedItems) => {
      setItems(updatedItems);
      setCanUndo(planStore.hasUndo());
      setStorageError(planStore.getStorageError());
    });
    return unsubscribe;
  }, []);

  return {
    items,
    canUndo,
    storageError,
    addProgram: planStore.addProgram.bind(planStore),
    updateItem: planStore.updateItem.bind(planStore),
    removeItem: planStore.removeItem.bind(planStore),
    undoLastRemove: planStore.undoLastRemove.bind(planStore),
    importBackup: planStore.importBackup.bind(planStore),
    clearPlan: planStore.clearPlan.bind(planStore),
    hasProgram: planStore.hasProgram.bind(planStore),
    isStorageHealthy: planStore.isStorageHealthy.bind(planStore)
  };
}
