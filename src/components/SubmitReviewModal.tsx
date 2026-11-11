import React, { useState } from 'react';
import { UNIVERSITIES } from '../data/mockData';
import { Review } from '../types';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  Star, 
  Upload, 
  AlertCircle,
  FileText
} from 'lucide-react';

interface SubmitReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: Review) => void;
}

export const SubmitReviewModal: React.FC<SubmitReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview
}) => {
  const [step, setStep] = useState<number>(1);

  // Form State
  const [selectedUniId, setSelectedUniId] = useState<string>(UNIVERSITIES[0].id);
  const [facultyName, setFacultyName] = useState<string>('');
  const [authorName, setAuthorName] = useState<string>('');
  const [authorStatus, setAuthorStatus] = useState<'Студент' | 'Выпускник' | 'Отчисленный' | 'Аноним'>('Студент');
  const [educationForm, setEducationForm] = useState<'budget' | 'paid'>('budget');

  // Ratings
  const [teaching, setTeaching] = useState<number>(5);
  const [corruption, setCorruption] = useState<'Нет' | 'Редко' | 'Да'>('Нет');
  const [dormitory, setDormitory] = useState<number>(4);
  const [studentLife, setStudentLife] = useState<number>(5);
  const [career, setCareer] = useState<number>(5);

  // Review Text
  const [title, setTitle] = useState<string>('');
  const [pros, setPros] = useState<string>('');
  const [cons, setCons] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [isVerifiedProof, setIsVerifiedProof] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentUni = UNIVERSITIES.find((u) => u.id === selectedUniId) || UNIVERSITIES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fullContent = `【Плюсы】\n${pros || 'Не указаны'}\n\n【Минусы】\n${cons || 'Не указаны'}\n\n【Итог и совет】\n${summary || 'В целом рекомендую данный вуз.'}`;

    const newRev: Review = {
      id: `rev-user-${Date.now()}`,
      universityId: currentUni.id,
      universityName: currentUni.name,
      facultyName: facultyName || 'Основной факультет',
      author: authorName.trim() || 'Анонимный студент',
      authorStatus: authorStatus,
      sentiment: teaching >= 4 ? 'positive' : teaching === 3 ? 'neutral' : 'negative',
      date: 'Сегодня',
      title: title.trim() || `Честный отзыв про ${currentUni.name}`,
      content: fullContent,
      ratings: {
        teaching,
        corruption,
        dormitory,
        studentLife,
        career
      },
      likes: 1,
      commentsCount: 0,
      comments: []
    };

    onSubmitReview(newRev);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setStep(1);
    setTitle('');
    setPros('');
    setCons('');
    setSummary('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-tabi-navy to-slate-900 p-6 text-white flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Сливы Табитуриента
            </span>
            <h2 className="text-lg sm:text-xl font-black">
              Прислать отзыв о своем вузе
            </h2>
            <p className="text-xs text-slate-300">
              Помогите сотням тысяч абитуриентов узнать реальную правду об учебе без прикрас
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900">
              Отзыв успешно опубликован!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Спасибо за честный вклад в сообщество Табитуриента! Ваш отзыв уже отображается в общем каталоге и в карточке выбранного университета.
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-sm"
            >
              Вернуться к сайту
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            {/* Steps indicator */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 text-xs font-bold">
              <button
                type="button"
                onClick={() => setStep(1)}
                className={`flex items-center gap-2 ${step === 1 ? 'text-blue-600' : 'text-slate-400'}`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center ${step === 1 ? 'bg-blue-600 text-white' : 'bg-slate-100'}`}>1</span>
                Вуз и статус
              </button>
              <span className="text-slate-300">→</span>
              <button
                type="button"
                onClick={() => setStep(2)}
                className={`flex items-center gap-2 ${step === 2 ? 'text-blue-600' : 'text-slate-400'}`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center ${step === 2 ? 'bg-blue-600 text-white' : 'bg-slate-100'}`}>2</span>
                Оценки по критериям
              </button>
              <span className="text-slate-300">→</span>
              <button
                type="button"
                onClick={() => setStep(3)}
                className={`flex items-center gap-2 ${step === 3 ? 'text-blue-600' : 'text-slate-400'}`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center ${step === 3 ? 'bg-blue-600 text-white' : 'bg-slate-100'}`}>3</span>
                Текст отзыва
              </button>
            </div>

            {/* STEP 1: University & Status */}
            {step === 1 && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-1.5">
                  <label htmlFor="uni-select" className="text-xs font-bold text-slate-700 block">
                    Выберите университет:
                  </label>
                  <select
                    id="uni-select"
                    value={selectedUniId}
                    onChange={(e) => setSelectedUniId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    {UNIVERSITIES.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name} — {u.fullName} ({u.region})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="faculty-input" className="text-xs font-bold text-slate-700 block">
                      Факультет / Институт / Кафедра:
                    </label>
                    <input
                      id="faculty-input"
                      type="text"
                      placeholder="Например: ФКН, ИУ, Мехмат..."
                      value={facultyName}
                      onChange={(e) => setFacultyName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="author-input" className="text-xs font-bold text-slate-700 block">
                      Ваше имя или псевдоним:
                    </label>
                    <input
                      id="author-input"
                      type="text"
                      placeholder="Оставьте пустым для анонимности"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">Ваш статус:</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['Студент', 'Выпускник', 'Отчисленный', 'Аноним'] as const).map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setAuthorStatus(st)}
                          className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                            authorStatus === st
                              ? 'bg-blue-600 text-white shadow-sm'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">Форма обучения:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setEducationForm('budget')}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                          educationForm === 'budget'
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        Бюджет
                      </button>
                      <button
                        type="button"
                        onClick={() => setEducationForm('paid')}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                          educationForm === 'paid'
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        Платное
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-sm"
                  >
                    Далее: Оценки →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Multi-criteria ratings */}
            {step === 2 && (
              <div className="space-y-5 animate-fade-in">
                
                {/* Teaching */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div>
                    <span className="text-xs font-extrabold text-slate-900 block">Качество преподавания</span>
                    <span className="text-[11px] text-slate-500">Компетентность, актуальность материала, подача</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setTeaching(star)}
                        className={`p-1 transition-transform hover:scale-110 ${
                          teaching >= star ? 'text-amber-500' : 'text-slate-300'
                        }`}
                        aria-label={`${star} звезд`}
                      >
                        <Star className="w-5 h-5 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Corruption */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div>
                    <span className="text-xs font-extrabold text-slate-900 block">Взятки и вымогательства</span>
                    <span className="text-[11px] text-slate-500">Приходилось ли платить за зачеты/экзамены</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {(['Нет', 'Редко', 'Да'] as const).map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setCorruption(c)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          corruption === c
                            ? c === 'Нет'
                              ? 'bg-emerald-600 text-white'
                              : c === 'Редко'
                              ? 'bg-amber-600 text-white'
                              : 'bg-rose-600 text-white'
                            : 'bg-white text-slate-700 border border-slate-200'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dormitory */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div>
                    <span className="text-xs font-extrabold text-slate-900 block">Состояние общежитий</span>
                    <span className="text-[11px] text-slate-500">Ремонт, насекомые, комендантский режим, душ</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setDormitory(star)}
                        className={`p-1 transition-transform hover:scale-110 ${
                          dormitory >= star ? 'text-amber-500' : 'text-slate-300'
                        }`}
                        aria-label={`${star} звезд`}
                      >
                        <Star className="w-5 h-5 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Student Life */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div>
                    <span className="text-xs font-extrabold text-slate-900 block">Студенческая жизнь</span>
                    <span className="text-[11px] text-slate-500">Клубы, спорт, хакатоны, тусовки, движ</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setStudentLife(star)}
                        className={`p-1 transition-transform hover:scale-110 ${
                          studentLife >= star ? 'text-amber-500' : 'text-slate-300'
                        }`}
                        aria-label={`${star} звезд`}
                      >
                        <Star className="w-5 h-5 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Career */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div>
                    <span className="text-xs font-extrabold text-slate-900 block">Карьерные перспективы</span>
                    <span className="text-[11px] text-slate-500">Стажировки, связи с компаниями, ярмарки вакансий</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setCareer(star)}
                        className={`p-1 transition-transform hover:scale-110 ${
                          career >= star ? 'text-amber-500' : 'text-slate-300'
                        }`}
                        aria-label={`${star} звезд`}
                      >
                        <Star className="w-5 h-5 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                  >
                    ← Назад
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-sm"
                  >
                    Далее: Текст отзыва →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Review Text & Proof */}
            {step === 3 && (
              <div className="space-y-4 animate-fade-in">
                
                <div className="space-y-1.5">
                  <label htmlFor="rev-title" className="text-xs font-bold text-slate-700 block">
                    Заголовок отзыва:
                  </label>
                  <input
                    id="rev-title"
                    type="text"
                    placeholder="Например: Реальность учебы на ФКН — тяжело, но оно того стоит"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="rev-pros" className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Плюсы (что порадовало):
                  </label>
                  <textarea
                    id="rev-pros"
                    rows={2}
                    placeholder="Расскажите о лучших преподавателях, проектах, оборудовании..."
                    value={pros}
                    onChange={(e) => setPros(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="rev-cons" className="text-xs font-bold text-rose-700 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-rose-600" /> Минусы (подводные камни):
                  </label>
                  <textarea
                    id="rev-cons"
                    rows={2}
                    placeholder="Что бесит: неадекватные преподы, старая общага, бюрократия..."
                    value={cons}
                    onChange={(e) => setCons(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="rev-summary" className="text-xs font-bold text-slate-700 block">
                    Итоговый вывод и совет поступающим:
                  </label>
                  <textarea
                    id="rev-summary"
                    rows={2}
                    placeholder="Кому стоит сюда поступать, а кому категорически нет..."
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>

                {/* Proof attachment simulation */}
                <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-blue-900 block flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5 text-blue-600" /> Верификация студента
                    </span>
                    <span className="text-[11px] text-blue-700">
                      Прикрепить фото студенческого билета для значка «Проверенный автор»
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsVerifiedProof(!isVerifiedProof)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      isVerifiedProof
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-blue-700 border border-blue-300 hover:bg-blue-100'
                    }`}
                  >
                    {isVerifiedProof ? 'Прикреплено ✓' : 'Загрузить файл'}
                  </button>
                </div>

                <div className="pt-2 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                  >
                    ← Назад
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-md flex items-center gap-1.5"
                  >
                    <FileText className="w-4 h-4" />
                    Опубликовать слив
                  </button>
                </div>
              </div>
            )}

          </form>
        )}

      </div>
    </div>
  );
};
