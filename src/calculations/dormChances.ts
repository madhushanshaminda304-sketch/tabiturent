export interface DormEvaluationInput {
  hasDorm: boolean;
  distanceKm: 'close' | 'medium' | 'far';
  educationType: 'budget' | 'paid';
  socialBenefit: 'none' | 'orphan' | 'bvi' | 'target';
  egeScore: number;
}

export interface DormEvaluationResult {
  percent: number;
  priorityBand: 'priority_guaranteed' | 'high_priority' | 'quota_dependent' | 'residual_paid' | 'ineligible_distance' | 'no_dorm';
  status: string;
  color: 'emerald' | 'amber' | 'rose';
  recommendation: string;
  dormType: string;
  provenanceDisclaimer: string;
}

/**
 * Pure evaluation function for student dormitory allocation probability.
 * Replaces arbitrary percentages with structured administrative priority bands
 * and explicit non-guarantee provenance disclaimers.
 */
export function evaluateDormChances(input: DormEvaluationInput): DormEvaluationResult {
  const provenanceDisclaimer = 'Оценка носит индикативный характер на основе типового положения о студенческих общежитиях РФ. Окончательное решение принимает жилищная комиссия вуза на основании поданных заявлений и квот.';

  if (!input.hasDorm) {
    return {
      percent: 0,
      priorityBand: 'no_dorm',
      status: 'Общежитие отсутствует',
      color: 'rose',
      recommendation: 'У вуза нет собственного жилого фонда. Рекомендуется рассмотреть аренду квартир в складчину или студенческие коливинги.',
      dormType: 'Аренда жилья',
      provenanceDisclaimer
    };
  }

  if (input.distanceKm === 'close') {
    return {
      percent: 5,
      priorityBand: 'ineligible_distance',
      status: 'Ограничение по радиусу прописки',
      color: 'rose',
      recommendation: 'Согласно регламенту проживания, студенты с постоянной регистрацией в пределах пригородной зоны (обычно до 50–80 км) общежитие не получают.',
      dormType: 'Проживание дома / самостоятельный проезд',
      provenanceDisclaimer
    };
  }

  // 1. First-order legal entitlement (Orphans, BVI quota)
  if (input.socialBenefit === 'orphan' || input.socialBenefit === 'bvi') {
    return {
      percent: 95,
      priorityBand: 'priority_guaranteed',
      status: 'Первоочередное право на заселение',
      color: 'emerald',
      recommendation: 'За вами законодательно закреплено право приоритетного предоставления жилого помещения на весь период обучения.',
      dormType: 'Основной кампус',
      provenanceDisclaimer
    };
  }

  // 2. Paid students: residual allocation
  if (input.educationType === 'paid') {
    return {
      percent: 35,
      priorityBand: 'residual_paid',
      status: 'Заселение по остаточному принципу',
      color: 'amber',
      recommendation: 'Студенты коммерческого набора распределяются только после расселения всех бюджетников и льготников (обычно после 1 сентября при наличии свободных мест).',
      dormType: 'Резервный фонд / партнерские гостиницы',
      provenanceDisclaimer
    };
  }

  // 3. Target quota
  if (input.socialBenefit === 'target') {
    return {
      percent: 85,
      priorityBand: 'high_priority',
      status: 'Высокая вероятность (целевая квота)',
      color: 'emerald',
      recommendation: 'Целевики рассматриваются в льготном порядке при подтверждении направления от организации.',
      dormType: 'Блочный / коридорный кампус',
      provenanceDisclaimer
    };
  }

  // 4. Standard budget competition by EGE score
  if (input.egeScore >= 275) {
    return {
      percent: 80,
      priorityBand: 'high_priority',
      status: 'Высокий шанс (высокие баллы ЕГЭ)',
      color: 'emerald',
      recommendation: 'Бюджетники с высокими баллами имеют приоритет в рейтинговом списке на заселение.',
      dormType: 'Блочный / коридорный кампус',
      provenanceDisclaimer
    };
  }

  return {
    percent: 65,
    priorityBand: 'quota_dependent',
    status: 'Шансы зависят от конкурса заявлений',
    color: 'amber',
    recommendation: 'Подавайте заявление на общежитие сразу после публикации приказа о зачислении. Заселение зависит от общего числа иногородних абитуриентов.',
    dormType: 'Студенческий кампус вуза',
    provenanceDisclaimer
  };
}
