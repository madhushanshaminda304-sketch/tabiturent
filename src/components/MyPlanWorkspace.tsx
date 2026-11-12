import React, { useState, useId } from 'react';
import { 
  Compass, 
  Trash2, 
  RotateCcw, 
  Download, 
  Upload, 
  Calendar, 
  Clock, 
  HelpCircle, 
  FileText, 
  AlertCircle, 
  Shield,
  Building,
  GraduationCap,
  Sparkles,
  X
} from 'lucide-react';
import { 
  PlanItem, 
  PlanStage, 
  EducationPathway, 
  PlanImportPreview 
} from '../types/plan';
import { usePlanStore } from '../services/planStore';
import { 
  previewPlanImport, 
  serializePlanExport 
} from '../services/planValidation';

interface MyPlanWorkspaceProps {
  onNavigateToCatalog: () => void;
  onNavigateToCalculator?: () => void;
  onSelectUniversityByName?: (name: string) => void;
}

const STAGE_CONFIG: Record<PlanStage, { label: string; color: string; badgeBg: string; textCol: string }> = {
  considering: {
    label: 'Рассматриваю',
    color: 'border-slate-300',
    badgeBg: 'bg-slate-100',
    textCol: 'text-slate-700'
  },
  shortlisted: {
    label: 'В шортлисте',
    color: 'border-blue-400',
    badgeBg: 'bg-blue-50',
    textCol: 'text-blue-700'
  },
  preparing: {
    label: 'Готовлю документы',
    color: 'border-amber-400',
    badgeBg: 'bg-amber-50',
    textCol: 'text-amber-800'
  },
  applied: {
    label: 'Подано заявление',
    color: 'border-emerald-500',
    badgeBg: 'bg-emerald-50',
    textCol: 'text-emerald-800'
  },
  archived: {
    label: 'В архиве',
    color: 'border-slate-200',
    badgeBg: 'bg-slate-50',
    textCol: 'text-slate-500'
  }
};

const PATHWAY_CONFIG: Record<EducationPathway, { label: string; badgeClass: string; desc: string }> = {
  ugc_state: {
    label: 'Госбюджет (UGC/Гос)',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    desc: 'Финансируется государством, конкурс по баллам'
  },
  private_approved: {
    label: 'Контракт / Аккредитованный',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
    desc: 'Платное обучение с государственной аккредитацией'
  },
  international_mou: {
    label: 'Двойной диплом / MoU',
    badgeClass: 'bg-purple-50 text-purple-700 border-purple-200',
    desc: 'Международная программа партнерства'
  },
  other: {
    label: 'Иной образовательный трек',
    badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
    desc: 'Специальная программа или стажировка'
  }
};

export const MyPlanWorkspace: React.FC<MyPlanWorkspaceProps> = ({
  onNavigateToCatalog,
  onNavigateToCalculator,
  onSelectUniversityByName
}) => {
  const { 
    items, 
    updateItem, 
    removeItem, 
    undoLastRemove, 
    canUndo, 
    storageError, 
    importBackup 
  } = usePlanStore();

  const [activeStageFilter, setActiveStageFilter] = useState<PlanStage | 'all'>('all');
  const [undoToast, setUndoToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [importPreview, setImportPreview] = useState<PlanImportPreview | null>(null);
  const [importModalOpen, setImportModalOpen] = useState<boolean>(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const fileInputId = useId();

  // Filter items
  const filteredItems = items.filter(item => {
    if (activeStageFilter === 'all') return true;
    return item.stage === activeStageFilter;
  });

  const stageCounts = {
    all: items.length,
    considering: items.filter(i => i.stage === 'considering').length,
    shortlisted: items.filter(i => i.stage === 'shortlisted').length,
    preparing: items.filter(i => i.stage === 'preparing').length,
    applied: items.filter(i => i.stage === 'applied').length,
    archived: items.filter(i => i.stage === 'archived').length,
  };

  const handleRemove = (item: PlanItem) => {
    const removed = removeItem(item.id);
    if (removed) {
      setUndoToast({
        message: `Программа «${item.programName}» удалена из плана`,
        visible: true
      });
      setTimeout(() => {
        setUndoToast(prev => ({ ...prev, visible: false }));
      }, 5000);
    }
  };

  const handleUndo = () => {
    const restored = undoLastRemove();
    if (restored) {
      setUndoToast({
        message: `Программа «${restored.programName}» восстановлена в план!`,
        visible: true
      });
      setTimeout(() => {
        setUndoToast(prev => ({ ...prev, visible: false }));
      }, 3000);
    }
  };

  // Export JSON backup
  const handleExportBackup = (includePrivate: boolean) => {
    if (items.length === 0) return;
    const jsonStr = serializePlanExport(items, includePrivate);
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const dateStr = new Date().toISOString().slice(0, 10);
    link.setAttribute('download', includePrivate ? `unipedia-my-plan-backup-${dateStr}.json` : `unipedia-programmes-share-${dateStr}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // File upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const preview = previewPlanImport(content, items);
      setImportPreview(preview);
      setImportModalOpen(true);
      // Reset input
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsText(file);
  };

  const executeImport = (mode: 'merge' | 'replace') => {
    if (!importPreview || !importPreview.isValid) return;
    importBackup(importPreview.items, mode);
    setImportModalOpen(false);
    setImportPreview(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Storage Error Warning if any */}
      {storageError && (
        <div 
          role="alert"
          className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 text-amber-900 text-xs sm:text-sm animate-fade-in"
        >
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">Предупреждение локального хранилища</span>
            <span>{storageError}</span>
          </div>
        </div>
      )}

      {/* Header & Device Storage Explanation */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-2">
              <Compass className="w-3.5 h-3.5 text-blue-600" />
              Персональный навигатор поступления
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Мой план поступления
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Сохраняйте образовательные программы, фиксируйте вопросы и планируйте конкретные следующие шаги.
            </p>
          </div>

          {/* Backup / Export Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleExportBackup(true)}
              disabled={items.length === 0}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors inline-flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
              title="Скачать файл со всеми вашими программами, приватными заметками и вопросами"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Резервная копия (JSON)</span>
            </button>

            <label
              htmlFor={fileInputId}
              className="px-3.5 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              title="Восстановить план из ранее сохраненного файла"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Импорт из файла</span>
              <input
                id={fileInputId}
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                onChange={handleFileUpload}
                className="sr-only"
              />
            </label>
          </div>
        </div>

        {/* Calm "Saved on this device" guarantee banner */}
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-start gap-3 text-xs text-slate-600">
          <Shield className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-800">Сохранено локально на этом устройстве.</strong> Ваши личные заметки, вопросы и действия не отправляются на сторонние серверы и остаются приватными в вашем браузере. Вы можете в любой момент сохранить резервную копию в JSON-файл.
          </div>
        </div>
      </div>

      {/* Stage Filters Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveStageFilter('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeStageFilter === 'all'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
          }`}
        >
          <span>Все программы</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
            activeStageFilter === 'all' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
          }`}>
            {stageCounts.all}
          </span>
        </button>

        {(['considering', 'shortlisted', 'preparing', 'applied', 'archived'] as PlanStage[]).map(stageKey => {
          const cfg = STAGE_CONFIG[stageKey];
          const isSelected = activeStageFilter === stageKey;
          const count = stageCounts[stageKey];
          return (
            <button
              key={stageKey}
              onClick={() => setActiveStageFilter(stageKey)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              <span>{cfg.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main List or Calm Empty State */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center space-y-4 shadow-card">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div className="max-w-md mx-auto space-y-1">
            <h3 className="text-lg font-bold text-slate-900">
              {activeStageFilter === 'all' ? 'В плане пока нет выбранных программ' : `Нет программ на этапе «${STAGE_CONFIG[activeStageFilter].label}»`}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              {activeStageFilter === 'all' 
                ? 'План формируется из конкретных специальностей вузов. Найдите подходящие направления в каталоге или воспользуйтесь калькулятором баллов.'
                : 'Вы можете переместить программы на этот этап в карточках ниже или сбросить фильтр.'}
            </p>
          </div>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={onNavigateToCatalog}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors inline-flex items-center gap-2 shadow-sm"
            >
              <Building className="w-4 h-4" />
              <span>Перейти в каталог вузов</span>
            </button>
            {onNavigateToCalculator && (
              <button
                onClick={onNavigateToCalculator}
                className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Подобрать по баллам ЕГЭ</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map(item => (
            <PlanItemCard
              key={item.id}
              item={item}
              onUpdate={(updates) => updateItem(item.id, updates)}
              onRemove={() => handleRemove(item)}
              onSelectUniversityByName={onSelectUniversityByName}
              isEditingNote={editingNoteId === item.id}
              setIsEditingNote={(val) => setEditingNoteId(val ? item.id : null)}
              isEditingQuestion={editingQuestionId === item.id}
              setIsEditingQuestion={(val) => setEditingQuestionId(val ? item.id : null)}
            />
          ))}
        </div>
      )}

      {/* Undo Toast */}
      {undoToast.visible && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 sm:px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 text-xs font-medium animate-fade-in">
          <span>{undoToast.message}</span>
          {canUndo && (
            <button
              onClick={handleUndo}
              className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Отменить</span>
            </button>
          )}
        </div>
      )}

      {/* Import Preview & Confirmation Modal */}
      {importModalOpen && importPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Upload className="w-4 h-4 text-blue-600" />
                Восстановление плана из файла
              </h3>
              <button 
                onClick={() => setImportModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {importPreview.isValid ? (
              <div className="space-y-3 text-xs text-slate-600">
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <div className="flex justify-between">
                    <span>Всего записей в файле:</span>
                    <strong className="text-slate-900">{importPreview.totalInFile}</strong>
                  </div>
                  <div className="flex justify-between text-emerald-700">
                    <span>Новых программ для добавления:</span>
                    <strong>+{importPreview.newCount}</strong>
                  </div>
                  <div className="flex justify-between text-blue-700">
                    <span>Программ для обновления:</span>
                    <strong>{importPreview.updateCount}</strong>
                  </div>
                  {importPreview.invalidCount > 0 && (
                    <div className="flex justify-between text-rose-600">
                      <span>Пропущено некорректных записей:</span>
                      <strong>{importPreview.invalidCount}</strong>
                    </div>
                  )}
                </div>

                <p className="text-slate-500">
                  Выберите способ импорта. Во избежание случайной потери данных замена текущего плана требует подтверждения.
                </p>

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={() => executeImport('merge')}
                    className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-sm"
                  >
                    Объединить с текущим планом (Рекомендуется)
                  </button>
                  <button
                    onClick={() => executeImport('replace')}
                    className="w-full py-2.5 px-4 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 font-bold text-xs transition-colors"
                  >
                    Заменить текущий план полностью
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs text-rose-600">
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl">
                  {importPreview.errors.join(' ')}
                </div>
                <button
                  onClick={() => setImportModalOpen(false)}
                  className="w-full py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  Закрыть
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

// Sub-component for individual program card
interface PlanItemCardProps {
  item: PlanItem;
  onUpdate: (updates: Partial<PlanItem>) => void;
  onRemove: () => void;
  onSelectUniversityByName?: (name: string) => void;
  isEditingNote: boolean;
  setIsEditingNote: (val: boolean) => void;
  isEditingQuestion: boolean;
  setIsEditingQuestion: (val: boolean) => void;
}

const PlanItemCard: React.FC<PlanItemCardProps> = ({
  item,
  onUpdate,
  onRemove,
  onSelectUniversityByName,
  isEditingNote,
  setIsEditingNote,
  isEditingQuestion,
  setIsEditingQuestion
}) => {
  const [noteDraft, setNoteDraft] = useState(item.privateNote || '');
  const [questionDraft, setQuestionDraft] = useState(item.unresolvedQuestion || '');
  const [nextActionText, setNextActionText] = useState(item.nextAction?.actionText || '');
  const [targetDateText, setTargetDateText] = useState(item.nextAction?.targetDate || '');
  const [isEditingAction, setIsEditingAction] = useState(false);

  const pathwayInfo = PATHWAY_CONFIG[item.pathway] || PATHWAY_CONFIG.ugc_state;
  const stageInfo = STAGE_CONFIG[item.stage] || STAGE_CONFIG.considering;

  const handleSaveNote = () => {
    onUpdate({ privateNote: noteDraft.trim() });
    setIsEditingNote(false);
  };

  const handleSaveQuestion = () => {
    onUpdate({ unresolvedQuestion: questionDraft.trim() });
    setIsEditingQuestion(false);
  };

  const handleSaveAction = () => {
    if (!nextActionText.trim()) {
      onUpdate({ nextAction: undefined });
    } else {
      onUpdate({
        nextAction: {
          actionText: nextActionText.trim(),
          targetDate: targetDateText || undefined,
          isCompleted: item.nextAction?.isCompleted || false
        }
      });
    }
    setIsEditingAction(false);
  };

  const toggleActionCompleted = () => {
    if (!item.nextAction) return;
    onUpdate({
      nextAction: {
        ...item.nextAction,
        isCompleted: !item.nextAction.isCompleted
      }
    });
  };

  return (
    <div className={`bg-white rounded-2xl border ${stageInfo.color} p-4 sm:p-5 shadow-sm space-y-4 transition-all hover:shadow-md`}>
      
      {/* Top Row: Degree, Code, Title, University and Stage selector */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
              {item.programCode}
            </span>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${pathwayInfo.badgeClass}`}>
              {pathwayInfo.label}
            </span>
            <span className="text-[11px] text-slate-500">
              {item.degree} • {item.durationYears} года
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            {item.programName}
          </h3>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600">
            <button
              onClick={() => onSelectUniversityByName?.(item.universityName)}
              className="font-semibold text-blue-600 hover:underline inline-flex items-center gap-1"
            >
              <Building className="w-3.5 h-3.5" />
              <span>{item.universityName}</span>
            </button>
            <span>•</span>
            <span className="text-slate-500">{item.campusName}</span>
            <span>•</span>
            <span className="text-slate-500">{item.intakeName}</span>
          </div>
        </div>

        {/* Stage selector & Delete action */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <div className="relative">
            <label htmlFor={`stage-select-${item.id}`} className="sr-only">
              Этап рассмотрения для {item.programName}
            </label>
            <select
              id={`stage-select-${item.id}`}
              value={item.stage}
              onChange={(e) => onUpdate({ stage: e.target.value as PlanStage })}
              className={`text-xs font-bold py-1.5 px-3 rounded-xl border border-slate-300 bg-white ${stageInfo.textCol} focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer`}
            >
              <option value="considering">Рассматриваю</option>
              <option value="shortlisted">В шортлисте</option>
              <option value="preparing">Готовлю документы</option>
              <option value="applied">Подано заявление</option>
              <option value="archived">В архиве</option>
            </select>
          </div>

          <button
            onClick={onRemove}
            aria-label={`Удалить ${item.programName} из плана`}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Удалить из плана (можно отменить)"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Middle Row: Known Requirements / Passing Scores */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-slate-100 text-xs">
        <div>
          <span className="text-[10px] text-slate-400 block font-medium">Проходной бюджет</span>
          <span className="font-bold text-slate-800">
            {item.passingScoreBudget ? `${item.passingScoreBudget} б.` : 'Не указан'}
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block font-medium">Стоимость контракта</span>
          <span className="font-bold text-slate-800">
            {item.tuitionPerYear ? `${item.tuitionPerYear.toLocaleString('ru-RU')} ₽/год` : 'Бесплатно / Бюджет'}
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block font-medium">Мест (бюджет / плат)</span>
          <span className="font-bold text-slate-800">
            {item.budgetSlots || 0} / {item.paidSlots || 0}
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block font-medium">Требования</span>
          <span className="font-medium text-slate-700 truncate block">
            {item.knownRequirements.length > 0 ? item.knownRequirements.join(', ') : 'Стандартные ЕГЭ'}
          </span>
        </div>
      </div>

      {/* Next Action Priority Box */}
      <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-200/70 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-800">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>Следующее действие:</span>
          </div>

          {!isEditingAction && (
            <button
              onClick={() => setIsEditingAction(true)}
              className="text-[11px] font-semibold text-blue-600 hover:underline"
            >
              {item.nextAction ? 'Изменить' : '+ Назначить действие'}
            </button>
          )}
        </div>

        {isEditingAction ? (
          <div className="space-y-2 text-xs">
            <input
              type="text"
              placeholder="Например: Заказать справку о доходах или подать оригинал аттестата"
              value={nextActionText}
              onChange={(e) => setNextActionText(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-xs"
            />
            <div className="flex items-center gap-2">
              <label className="text-[11px] text-slate-500 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                Срок:
              </label>
              <input
                type="date"
                value={targetDateText}
                onChange={(e) => setTargetDateText(e.target.value)}
                className="px-2 py-1 rounded-lg border border-slate-300 text-xs text-slate-700 outline-none"
              />
              <div className="ml-auto flex items-center gap-1.5">
                <button
                  onClick={() => setIsEditingAction(false)}
                  className="px-2.5 py-1 text-slate-500 hover:text-slate-700 font-semibold"
                >
                  Отмена
                </button>
                <button
                  onClick={handleSaveAction}
                  className="px-3 py-1 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"
                >
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        ) : item.nextAction ? (
          <div className="flex items-center justify-between gap-2 text-xs">
            <label className="flex items-center gap-2 cursor-pointer flex-1">
              <input
                type="checkbox"
                checked={item.nextAction.isCompleted}
                onChange={toggleActionCompleted}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className={`text-slate-800 ${item.nextAction.isCompleted ? 'line-through text-slate-400' : 'font-medium'}`}>
                {item.nextAction.actionText}
              </span>
            </label>
            {item.nextAction.targetDate && (
              <span className="text-[11px] text-slate-500 shrink-0 font-medium inline-flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                до {item.nextAction.targetDate}
              </span>
            )}
          </div>
        ) : (
          <p className="text-xs text-slate-500 italic">
            Действие не назначено. Нажмите «+ Назначить действие», чтобы спланировать следующий шаг.
          </p>
        )}
      </div>

      {/* Bottom Accordion / Tabs: Private Note & Unresolved Questions */}
      <div className="pt-2 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        
        {/* Private Note Box */}
        <div className="p-3 rounded-xl bg-slate-50/60 border border-slate-200/60 space-y-1.5">
          <div className="flex items-center justify-between text-slate-700">
            <span className="font-semibold flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              Приватная заметка
            </span>
            {!isEditingNote && (
              <button
                onClick={() => setIsEditingNote(true)}
                className="text-[11px] text-blue-600 hover:underline font-medium"
              >
                {item.privateNote ? 'Править' : '+ Добавить'}
              </button>
            )}
          </div>

          {isEditingNote ? (
            <div className="space-y-2">
              <textarea
                rows={2}
                value={noteDraft}
                onChange={(e) => setNoteDraft(e.target.value)}
                placeholder="Ваши личные мысли, впечатления от кампуса, контакты деканата..."
                className="w-full p-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <div className="flex justify-end gap-1.5">
                <button
                  onClick={() => setIsEditingNote(false)}
                  className="px-2.5 py-1 text-slate-500 font-semibold"
                >
                  Отмена
                </button>
                <button
                  onClick={handleSaveNote}
                  className="px-3 py-1 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"
                >
                  Сохранить
                </button>
              </div>
            </div>
          ) : (
            <p className="text-slate-600 italic">
              {item.privateNote || 'Нет личных заметок.'}
            </p>
          )}
        </div>

        {/* Unresolved Question Box */}
        <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-200/60 space-y-1.5">
          <div className="flex items-center justify-between text-amber-900">
            <span className="font-semibold flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
              Нерешенный вопрос
            </span>
            {!isEditingQuestion && (
              <button
                onClick={() => setIsEditingQuestion(true)}
                className="text-[11px] text-amber-800 hover:underline font-medium"
              >
                {item.unresolvedQuestion ? 'Править' : '+ Задать вопрос'}
              </button>
            )}
          </div>

          {isEditingQuestion ? (
            <div className="space-y-2">
              <input
                type="text"
                value={questionDraft}
                onChange={(e) => setQuestionDraft(e.target.value)}
                placeholder="Что нужно уточнить в приёмной комиссии? (например: наличие общежития)"
                className="w-full p-2 text-xs rounded-lg border border-amber-300 focus:ring-2 focus:ring-amber-500 outline-none"
              />
              <div className="flex justify-end gap-1.5">
                <button
                  onClick={() => setIsEditingQuestion(false)}
                  className="px-2.5 py-1 text-slate-500 font-semibold"
                >
                  Отмена
                </button>
                <button
                  onClick={handleSaveQuestion}
                  className="px-3 py-1 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-700"
                >
                  Сохранить
                </button>
              </div>
            </div>
          ) : (
            <p className="text-amber-800 italic">
              {item.unresolvedQuestion || 'Вопросов к приёмной комиссии нет.'}
            </p>
          )}
        </div>

      </div>

    </div>
  );
};
