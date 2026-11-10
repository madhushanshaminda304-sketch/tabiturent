export type SentimentType = 'positive' | 'neutral' | 'negative';

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
