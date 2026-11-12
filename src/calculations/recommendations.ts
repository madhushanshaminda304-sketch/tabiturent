import { University } from '../types';

export interface PodborPreferences {
  goal: 'budget' | 'paid_top' | 'any';
  region: string;
  direction: string;
  priority: 'dorm' | 'military' | 'career' | 'easy';
  scoreRange: 'low' | 'mid' | 'high' | 'olympiad';
}

export interface RecommendationResult {
  university: University;
  matchPercent: number;
  matchedCriteria: string[];
}

/**
 * Pure, transparent criteria matching for university recommendations.
 * Replaces fake neural network claims with clear, honest criteria scoring.
 */
export function calculateRecommendations(
  universities: University[],
  prefs: PodborPreferences
): RecommendationResult[] {
  return universities.map((u) => {
    let score = 50; // base calibration
    const matchedCriteria: string[] = [];

    // 1. Goal match
    if (prefs.goal === 'budget') {
      if (u.budgetSlotsTotal >= 1500) {
        score += 15;
        matchedCriteria.push('Много бюджетных мест');
      } else if (u.budgetSlotsTotal >= 800) {
        score += 8;
      }
    } else if (prefs.goal === 'paid_top') {
      if (u.globalRank <= 5) {
        score += 15;
        matchedCriteria.push('Топовый статус вуза');
      } else if (u.globalRank <= 10) {
        score += 8;
      }
    } else {
      score += 10;
    }

    // 2. Study Direction match
    const directionKeywords: Record<string, string[]> = {
      it: ['информат', 'программ', 'компьютер', 'систем', 'данных', 'вычислител'],
      engineering: ['инженер', 'машиностро', 'технолог', 'приборостро', 'строитель'],
      economics: ['эконом', 'менеджмент', 'финанс', 'бизнес', 'управлен'],
      humanities: ['лингвист', 'юриспруд', 'медиа', 'журналист', 'перевод', 'истори'],
      medicine: ['медицин', 'биоинженер', 'лечеб', 'фармац', 'педиатри']
    };

    const keywords = directionKeywords[prefs.direction] || [];
    const hasDirectionProgram = u.faculties.some(f => 
      f.programs.some(p => {
        const pLower = p.name.toLowerCase();
        return keywords.some(k => pLower.includes(k));
      })
    );

    if (hasDirectionProgram) {
      score += 15;
      matchedCriteria.push('Сильная подготовка по выбранному направлению');
    }

    // 3. Region match
    if (prefs.region === 'Все регионы') {
      score += 5;
    } else if (u.region === prefs.region) {
      score += 15;
      matchedCriteria.push(`Расположен в регионе: ${u.region}`);
    }

    // 4. Priority match
    if (prefs.priority === 'dorm') {
      if (u.hasDorm && u.dormRating >= 4.0) {
        score += 12;
        matchedCriteria.push('Высокий рейтинг общежитий');
      } else if (u.hasDorm) {
        score += 6;
      }
    } else if (prefs.priority === 'military') {
      if (u.hasMilitary) {
        score += 12;
        matchedCriteria.push('Военный учебный центр (ВУЦ)');
      }
    } else if (prefs.priority === 'career') {
      if (u.globalRank <= 5) {
        score += 15;
        matchedCriteria.push('Высокая востребованность работодателями');
      }
    } else if (prefs.priority === 'easy') {
      if (u.minPassingScore <= 235) {
        score += 12;
        matchedCriteria.push('Доступный проходной порог');
      }
    }

    // 5. Score range match
    if (prefs.scoreRange === 'olympiad') {
      if (u.avgPassingScore >= 285) {
        score += 12;
        matchedCriteria.push('Олимпиадный уровень');
      }
    } else if (prefs.scoreRange === 'high') {
      if (u.avgPassingScore >= 265 && u.avgPassingScore <= 290) {
        score += 12;
        matchedCriteria.push('Соответствие высокому баллу');
      }
    } else if (prefs.scoreRange === 'mid') {
      if (u.avgPassingScore >= 235 && u.avgPassingScore < 275) {
        score += 12;
        matchedCriteria.push('Реалистичный средний конкурс');
      }
    } else if (prefs.scoreRange === 'low') {
      if (u.minPassingScore <= 230) {
        score += 12;
        matchedCriteria.push('Шанс поступить с базовыми баллами');
      }
    }

    const clampedPercent = Math.min(99, Math.max(55, score));
    return {
      university: u,
      matchPercent: clampedPercent,
      matchedCriteria
    };
  }).sort((a, b) => b.matchPercent - a.matchPercent);
}
