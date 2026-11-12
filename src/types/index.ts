export type SentimentType = 'positive' | 'neutral' | 'negative';

export type VerificationStatus = 'verified' | 'unverified' | 'historical' | 'sample_data';

export interface DataProvenance {
  sourceUrl?: string;
  sourceName: string;
  applicableYearOrIntake: string;
  lastVerifiedDate?: string;
  verificationStatus: VerificationStatus;
  dataset: 'experimental_ru_archive';
  notes?: string;
}

export interface SubjectRequirement {
  subject: string;
  minScore: number;
}

export interface Program {
  id: string;
  code: string;
  name: string;
  facultyName: string;
  degree: 'Бакалавриат' | 'Специалитет';
  budgetSlots: number;
  paidSlots: number;
  passingScoreBudget: number;
  passingScorePaid: number;
  tuitionPerYear: number;
  subjects: SubjectRequirement[];
  durationYears: number;
  campusId?: string;
  intakeId?: string;
  provenance?: DataProvenance;
}

export interface Faculty {
  id: string;
  name: string;
  programs: Program[];
}

export interface University {
  id: string;
  name: string;
  fullName: string;
  logo: string;
  region: string;
  address: string;
  campusId?: string;
  campusName?: string;
  isState: boolean;
  isHead: boolean;
  hasMilitary: boolean;
  hasDorm: boolean;
  dormPriceMonthly: number;
  dormRating: number;
  minPassingScore: number;
  avgPassingScore: number;
  minTuition: number;
  budgetSlotsTotal: number;
  reviewsCount: number;
  positiveReviewsCount: number;
  neutralReviewsCount: number;
  negativeReviewsCount: number;
  globalRank: number;
  reviewRank: number;
  egeRank: number;
  costRank: number;
  studentSatisfaction: number;
  description: string;
  faculties: Faculty[];
  metroStation?: string;
  coordinates?: { lat: number; lng: number };
  provenance?: DataProvenance;
}

export interface ReviewComment {
  id: string;
  author: string;
  status: string;
  date: string;
  text: string;
  likes: number;
}

export interface Review {
  id: string;
  universityId: string;
  universityName: string;
  facultyName: string;
  author: string;
  authorStatus: 'Студент' | 'Выпускник' | 'Отчисленный' | 'Аноним';
  sentiment: SentimentType;
  date: string;
  title: string;
  content: string;
  ratings: {
    teaching: number;
    corruption: 'Нет' | 'Редко' | 'Да';
    dormitory: number;
    studentLife: number;
    career: number;
  };
  likes: number;
  commentsCount: number;
  comments?: ReviewComment[];
  officialReply?: {
    representativeName: string;
    role: string;
    date: string;
    text: string;
  };
}

export interface QnaQuestion {
  id: string;
  author: string;
  date: string;
  universityId?: string;
  universityName?: string;
  title: string;
  content: string;
  views: number;
  answersCount: number;
  answers: {
    author: string;
    role: string;
    date: string;
    content: string;
  }[];
}

export interface OpenDayEvent {
  id: string;
  universityId: string;
  universityName: string;
  date: string;
  time: string;
  format: 'Онлайн' | 'Очно' | 'Очно и Онлайн';
  address: string;
  facultyName: string;
  registrationLink: string;
}

export interface Article {
  id: string;
  title: string;
  category: 'Поступление' | 'ЕГЭ' | 'Общежития' | 'Олимпиады и БВИ' | 'Студенческая жизнь';
  excerpt: string;
  content: string[];
  readTime: string;
  views: number;
  date: string;
}

export interface SpecialtyInfo {
  code: string;
  name: string;
  category: string;
  description: string;
  requiredSubjects: string[];
  avgSalary: number;
  universitiesCount: number;
}

export interface DormInfo {
  id: string;
  universityId: string;
  universityName: string;
  name: string;
  address: string;
  metro?: string;
  walkMinutesToMetro: number;
  travelMinutesToCampus: number;
  priceMonthly: number;
  ratingOverall: number;
  pests: 'Отсутствуют' | 'Редко' | 'Бывают';
  wardenStrictness: 'Лояльный' | 'Умеренный' | 'Строгий';
  curfew: 'Круглосуточно (24/7)' | 'До 23:00' | 'До 01:00';
  showerLocation: 'В блоке' | 'На этаже' | 'В подвале';
  wifiSpeed: string;
  reviewSnippet: string;
}

export interface TopProgramItem {
  id: string;
  rank: number;
  code: string;
  name: string;
  universityName: string;
  universityLogo: string;
  domain: string;
  avgEgeScore: number;
  competitionPerSeat: number;
  startSalary: number;
  tuitionPerYear: number;
  budgetSlots: number;
}

export interface TopSpecialty {
  rank: number;
  code: string;
  name: string;
  sharePercent: number;
  category: string;
  degree: 'Бакалавриат' | 'Специалитет';
  medianSalary: number;
  avgBudgetScore: number;
  budgetGrowth: string;
  topUniversity: string;
  universitiesCount: number;
  totalGraduatesYear: number;
}

export interface AdmissionsDeadline {
  id: string;
  date: string;
  time?: string;
  title: string;
  stage: 'Прием документов' | 'ДВИ и вступительные' | 'Конкурсные списки' | 'Подача оригиналов' | 'Приказы';
  description: string;
  isCritical: boolean;
  targetAudience: 'Все абитуриенты' | 'БВИ и квотники' | 'Основной этап (ЕГЭ)' | 'Платное обучение';
  officialDocument: string;
  tips: string;
}

export * from './plan';


