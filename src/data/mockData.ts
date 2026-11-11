import { University, Review, QnaQuestion, OpenDayEvent, Article, SpecialtyInfo, DormInfo, TopProgramItem } from '../types';

export const EGE_SUBJECTS = [
  { id: 'rus', name: 'Русский язык', defaultScore: 78, required: true },
  { id: 'math_prof', name: 'Профильная математика', defaultScore: 74, required: false },
  { id: 'cs', name: 'Информатика (ИКТ)', defaultScore: 82, required: false },
  { id: 'physics', name: 'Физика', defaultScore: 70, required: false },
  { id: 'social', name: 'Обществознание', defaultScore: 76, required: false },
  { id: 'eng', name: 'Английский язык', defaultScore: 80, required: false },
  { id: 'history', name: 'История', defaultScore: 72, required: false },
  { id: 'bio', name: 'Биология', defaultScore: 68, required: false },
  { id: 'chem', name: 'Химия', defaultScore: 70, required: false },
  { id: 'lit', name: 'Литература', defaultScore: 75, required: false },
  { id: 'geo', name: 'География', defaultScore: 65, required: false },
];

export const REGIONS = [
  'Все регионы',
  'Москва',
  'Санкт-Петербург',
  'Новосибирская область',
  'Республика Татарстан',
  'Томская область',
  'Свердловская область',
  'Нижегородская область'
];

export const STUDY_AREAS = [
  'Все направления',
  'Математика и IT',
  'Инженерия и технологии',
  'Экономика и управление',
  'Медицина и биоинженерия',
  'Гуманитарные и социальные науки',
  'Естественные науки',
  'Архитектура и дизайн'
];

export const UNIVERSITIES: University[] = [
  {
    id: 'hse',
    name: 'НИУ ВШЭ',
    fullName: 'Национальный исследовательский университет «Высшая школа экономики»',
    logo: '🎓',
    region: 'Москва',
    address: 'г. Москва, Покровский бульвар, д. 11',
    metroStation: 'Китай-город / Чкаловская',
    coordinates: { lat: 55.754, lng: 37.648 },
    isState: true,
    isHead: true,
    hasMilitary: true,
    hasDorm: true,
    dormPriceMonthly: 1800,
    dormRating: 4.6,
    minPassingScore: 285,
    avgPassingScore: 298,
    minTuition: 470000,
    budgetSlotsTotal: 2150,
    reviewsCount: 342,
    positiveReviewsCount: 274,
    neutralReviewsCount: 48,
    negativeReviewsCount: 20,
    globalRank: 1,
    reviewRank: 2,
    egeRank: 1,
    costRank: 18,
    studentSatisfaction: 80,
    description: 'Ведущий исследовательский университет России, специализирующийся на социально-экономических, компьютерных и гуманитарных науках. Известен 4-модульной системой обучения, гибким выбором майноров и высокой востребованностью выпускников в бигтехе.',
    faculties: [
      {
        id: 'hse-cs',
        name: 'Факультет компьютерных наук (ФКН)',
        programs: [
          {
            id: 'hse-pmi',
            code: '01.03.02',
            name: 'Прикладная математика и информатика',
            facultyName: 'Факультет компьютерных наук (ФКН)',
            degree: 'Бакалавриат',
            budgetSlots: 110,
            paidSlots: 140,
            passingScoreBudget: 308,
            passingScorePaid: 240,
            tuitionPerYear: 730000,
            durationYears: 4,
            subjects: [
              { subject: 'Русский язык', minScore: 70 },
              { subject: 'Профильная математика', minScore: 85 },
              { subject: 'Информатика (ИКТ)', minScore: 85 }
            ]
          },
          {
            id: 'hse-se',
            code: '09.03.04',
            name: 'Программная инженерия',
            facultyName: 'Факультет компьютерных наук (ФКН)',
            degree: 'Бакалавриат',
            budgetSlots: 80,
            paidSlots: 90,
            passingScoreBudget: 299,
            passingScorePaid: 230,
            tuitionPerYear: 690000,
            durationYears: 4,
            subjects: [
              { subject: 'Русский язык', minScore: 70 },
              { subject: 'Профильная математика', minScore: 80 },
              { subject: 'Информатика (ИКТ)', minScore: 80 }
            ]
          }
        ]
      },
      {
        id: 'hse-econ',
        name: 'Международный институт экономики и финансов (МИЭФ)',
        programs: [
          {
            id: 'hse-icef',
            code: '38.03.01',
            name: 'Экономика и финансы',
            facultyName: 'МИЭФ',
            degree: 'Бакалавриат',
            budgetSlots: 25,
            paidSlots: 180,
            passingScoreBudget: 302,
            passingScorePaid: 220,
            tuitionPerYear: 880000,
            durationYears: 4,
            subjects: [
              { subject: 'Русский язык', minScore: 70 },
              { subject: 'Профильная математика', minScore: 75 },
              { subject: 'Английский язык', minScore: 80 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'mpei',
    name: 'НИУ МЭИ',
    fullName: 'Национальный исследовательский университет «Московский энергетический институт»',
    logo: '⚡',
    region: 'Москва',
    address: 'г. Москва, Красноказарменная ул., д. 14',
    metroStation: 'Авиамоторная / Лефортово',
    coordinates: { lat: 55.753, lng: 37.708 },
    isState: true,
    isHead: true,
    hasMilitary: true,
    hasDorm: true,
    dormPriceMonthly: 1200,
    dormRating: 4.1,
    minPassingScore: 218,
    avgPassingScore: 242,
    minTuition: 245000,
    budgetSlotsTotal: 3400,
    reviewsCount: 289,
    positiveReviewsCount: 228,
    neutralReviewsCount: 42,
    negativeReviewsCount: 19,
    globalRank: 8,
    reviewRank: 6,
    egeRank: 9,
    costRank: 4,
    studentSatisfaction: 79,
    description: 'Один из крупнейших технических университетов России в области энергетики, электротехники, электроники, информатики и информационной безопасности. Собственный студенческий кампус в Лефортово с развитой инфраструктурой.',
    faculties: [
      {
        id: 'mpei-avti',
        name: 'Институт автоматики и вычислительной техники (АВТИ)',
        programs: [
          {
            id: 'mpei-ivt',
            code: '09.03.01',
            name: 'Информатика и вычислительная техника',
            facultyName: 'АВТИ',
            degree: 'Бакалавриат',
            budgetSlots: 140,
            paidSlots: 60,
            passingScoreBudget: 252,
            passingScorePaid: 175,
            tuitionPerYear: 285000,
            durationYears: 4,
            subjects: [
              { subject: 'Русский язык', minScore: 50 },
              { subject: 'Профильная математика', minScore: 60 },
              { subject: 'Информатика (ИКТ)', minScore: 60 }
            ]
          },
          {
            id: 'mpei-ib',
            code: '10.03.01',
            name: 'Информационная безопасность',
            facultyName: 'АВТИ',
            degree: 'Бакалавриат',
            budgetSlots: 75,
            paidSlots: 35,
            passingScoreBudget: 261,
            passingScorePaid: 180,
            tuitionPerYear: 295000,
            durationYears: 4,
            subjects: [
              { subject: 'Русский язык', minScore: 50 },
              { subject: 'Профильная математика', minScore: 60 },
              { subject: 'Информатика (ИКТ)', minScore: 65 }
            ]
          }
        ]
      },
      {
        id: 'mpei-ieee',
        name: 'Институт электроэнергетики (ИЭЭ)',
        programs: [
          {
            id: 'mpei-electro',
            code: '13.03.02',
            name: 'Электроэнергетика и электротехника',
            facultyName: 'ИЭЭ',
            degree: 'Бакалавриат',
            budgetSlots: 380,
            paidSlots: 50,
            passingScoreBudget: 224,
            passingScorePaid: 160,
            tuitionPerYear: 245000,
            durationYears: 4,
            subjects: [
              { subject: 'Русский язык', minScore: 45 },
              { subject: 'Профильная математика', minScore: 55 },
              { subject: 'Физика', minScore: 50 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bmstu',
    name: 'МГТУ им. Н.Э. Баумана',
    fullName: 'Московский государственный технический университет имени Н. Э. Баумана',
    logo: '🛠️',
    region: 'Москва',
    address: 'г. Москва, 2-я Бауманская ул., д. 5, стр. 1',
    metroStation: 'Бауманская / Электрозаводская',
    coordinates: { lat: 55.766, lng: 37.684 },
    isState: true,
    isHead: true,
    hasMilitary: true,
    hasDorm: true,
    dormPriceMonthly: 1400,
    dormRating: 3.9,
    minPassingScore: 254,
    avgPassingScore: 278,
    minTuition: 340000,
    budgetSlotsTotal: 3900,
    reviewsCount: 456,
    positiveReviewsCount: 360,
    neutralReviewsCount: 65,
    negativeReviewsCount: 31,
    globalRank: 2,
    reviewRank: 3,
    egeRank: 4,
    costRank: 8,
    studentSatisfaction: 79,
    description: 'Флагман инженерного образования России. Легендарная школа с глубокой фундаментальной подготовкой, новейшим кампусом на Яузе и прямыми контрактами с космической и оборонной отраслью.',
    faculties: [
      {
        id: 'bmstu-iu',
        name: 'Факультет «Информатика и системы управления» (ИУ)',
        programs: [
          {
            id: 'bmstu-iu7',
            code: '09.03.04',
            name: 'Программная инженерия (ИУ7)',
            facultyName: 'Факультет ИУ',
            degree: 'Бакалавриат',
            budgetSlots: 95,
            paidSlots: 45,
            passingScoreBudget: 294,
            passingScorePaid: 215,
            tuitionPerYear: 395000,
            durationYears: 4,
            subjects: [
              { subject: 'Русский язык', minScore: 60 },
              { subject: 'Профильная математика', minScore: 70 },
              { subject: 'Информатика (ИКТ)', minScore: 75 }
            ]
          },
          {
            id: 'bmstu-iu8',
            code: '10.05.03',
            name: 'Информационная безопасность автоматизированных систем',
            facultyName: 'Факультет ИУ',
            degree: 'Специалитет',
            budgetSlots: 80,
            paidSlots: 30,
            passingScoreBudget: 288,
            passingScorePaid: 200,
            tuitionPerYear: 390000,
            durationYears: 5,
            subjects: [
              { subject: 'Русский язык', minScore: 60 },
              { subject: 'Профильная математика', minScore: 70 },
              { subject: 'Информатика (ИКТ)', minScore: 70 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'itmo',
    name: 'Университет ИТМО',
    fullName: 'Национальный исследовательский университет ИТМО',
    logo: '🚀',
    region: 'Санкт-Петербург',
    address: 'г. Санкт-Петербург, Кронверкский пр., д. 49',
    metroStation: 'Горьковская',
    coordinates: { lat: 59.957, lng: 30.309 },
    isState: true,
    isHead: true,
    hasMilitary: true,
    hasDorm: true,
    dormPriceMonthly: 1500,
    dormRating: 4.4,
    minPassingScore: 262,
    avgPassingScore: 289,
    minTuition: 310000,
    budgetSlotsTotal: 1850,
    reviewsCount: 312,
    positiveReviewsCount: 265,
    neutralReviewsCount: 32,
    negativeReviewsCount: 15,
    globalRank: 4,
    reviewRank: 1,
    egeRank: 3,
    costRank: 7,
    studentSatisfaction: 85,
    description: 'Первый неклассический университет. Мировой рекордсмен чемпионата мира по программированию ICPC (7 побед). Прогрессивный подход к образованию, отсутствие советской бюрократии и мощные стартап-акселераторы.',
    faculties: [
      {
        id: 'itmo-fitip',
        name: 'Факультет информационных технологий и программирования',
        programs: [
          {
            id: 'itmo-pmi',
            code: '01.03.02',
            name: 'Прикладная математика и информатика',
            facultyName: 'ФИТиП',
            degree: 'Бакалавриат',
            budgetSlots: 100,
            paidSlots: 70,
            passingScoreBudget: 302,
            passingScorePaid: 220,
            tuitionPerYear: 440000,
            durationYears: 4,
            subjects: [
              { subject: 'Русский язык', minScore: 70 },
              { subject: 'Профильная математика', minScore: 80 },
              { subject: 'Информатика (ИКТ)', minScore: 80 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'spbu',
    name: 'СПбГУ',
    fullName: 'Санкт-Петербургский государственный университет',
    logo: '🏛️',
    region: 'Санкт-Петербург',
    address: 'г. Санкт-Петербург, Университетская наб., д. 7-9',
    metroStation: 'Василеостровская / Спортивная',
    coordinates: { lat: 59.941, lng: 30.304 },
    isState: true,
    isHead: true,
    hasMilitary: true,
    hasDorm: true,
    dormPriceMonthly: 1300,
    dormRating: 3.5,
    minPassingScore: 268,
    avgPassingScore: 286,
    minTuition: 360000,
    budgetSlotsTotal: 2400,
    reviewsCount: 420,
    positiveReviewsCount: 294,
    neutralReviewsCount: 75,
    negativeReviewsCount: 51,
    globalRank: 3,
    reviewRank: 8,
    egeRank: 2,
    costRank: 10,
    studentSatisfaction: 70,
    description: 'Старейший университет России, основанный Петром I в 1724 году. Классическое фундаментальное образование, сильные школы востоковедения, юриспруденции, физики и математики.',
    faculties: [
      {
        id: 'spbu-law',
        name: 'Юридический факультет',
        programs: [
          {
            id: 'spbu-juris',
            code: '40.03.01',
            name: 'Юриспруденция',
            facultyName: 'Юридический факультет',
            degree: 'Бакалавриат',
            budgetSlots: 65,
            paidSlots: 120,
            passingScoreBudget: 297,
            passingScorePaid: 210,
            tuitionPerYear: 420000,
            durationYears: 4,
            subjects: [
              { subject: 'Русский язык', minScore: 65 },
              { subject: 'Обществознание', minScore: 75 },
              { subject: 'История', minScore: 70 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'kfu',
    name: 'КФУ',
    fullName: 'Казанский (Приволжский) федеральный университет',
    logo: '🏰',
    region: 'Республика Татарстан',
    address: 'г. Казань, ул. Кремлевская, д. 18',
    metroStation: 'Кремлёвская / Площадь Тукая',
    coordinates: { lat: 55.792, lng: 49.122 },
    isState: true,
    isHead: true,
    hasMilitary: true,
    hasDorm: true,
    dormPriceMonthly: 800,
    dormRating: 4.8,
    minPassingScore: 232,
    avgPassingScore: 258,
    minTuition: 195000,
    budgetSlotsTotal: 3600,
    reviewsCount: 264,
    positiveReviewsCount: 219,
    neutralReviewsCount: 31,
    negativeReviewsCount: 14,
    globalRank: 9,
    reviewRank: 4,
    egeRank: 10,
    costRank: 2,
    studentSatisfaction: 83,
    description: 'Один из крупнейших федеральных университетов с историческим кампусом в центре Казани и знаменитой Деревней Универсиады — лучшим студенческим городком в РФ.',
    faculties: [
      {
        id: 'kfu-itis',
        name: 'Институт информационных технологий и интеллектуальных систем (ИТИС)',
        programs: [
          {
            id: 'kfu-soft',
            code: '09.03.04',
            name: 'Программная инженерия',
            facultyName: 'ИТИС',
            degree: 'Бакалавриат',
            budgetSlots: 120,
            paidSlots: 80,
            passingScoreBudget: 268,
            passingScorePaid: 170,
            tuitionPerYear: 240000,
            durationYears: 4,
            subjects: [
              { subject: 'Русский язык', minScore: 50 },
              { subject: 'Профильная математика', minScore: 60 },
              { subject: 'Информатика (ИКТ)', minScore: 65 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'nsu',
    name: 'НГУ',
    fullName: 'Новосибирский национальный исследовательский государственный университет',
    logo: '🌲',
    region: 'Новосибирская область',
    address: 'г. Новосибирск, ул. Пирогова, д. 1',
    metroStation: 'Академгородок',
    coordinates: { lat: 54.843, lng: 83.093 },
    isState: true,
    isHead: true,
    hasMilitary: true,
    hasDorm: true,
    dormPriceMonthly: 1100,
    dormRating: 4.3,
    minPassingScore: 248,
    avgPassingScore: 271,
    minTuition: 215000,
    budgetSlotsTotal: 1650,
    reviewsCount: 198,
    positiveReviewsCount: 168,
    neutralReviewsCount: 20,
    negativeReviewsCount: 10,
    globalRank: 5,
    reviewRank: 5,
    egeRank: 6,
    costRank: 3,
    studentSatisfaction: 85,
    description: 'Расположен в сердце знаменитого Новосибирского Академгородка. Преподают действующие ученые СО РАН, интеграция в науку с 1-го курса.',
    faculties: [
      {
        id: 'nsu-fit',
        name: 'Факультет информационных технологий (ФИТ)',
        programs: [
          {
            id: 'nsu-cs',
            code: '09.03.01',
            name: 'Информатика и вычислительная техника',
            facultyName: 'ФИТ',
            degree: 'Бакалавриат',
            budgetSlots: 90,
            paidSlots: 40,
            passingScoreBudget: 275,
            passingScorePaid: 180,
            tuitionPerYear: 235000,
            durationYears: 4,
            subjects: [
              { subject: 'Русский язык', minScore: 55 },
              { subject: 'Профильная математика', minScore: 65 },
              { subject: 'Информатика (ИКТ)', minScore: 65 }
            ]
          }
        ]
      }
    ]
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    universityId: 'hse',
    universityName: 'НИУ ВШЭ',
    facultyName: 'Факультет компьютерных наук',
    author: 'Михаил Т.',
    authorStatus: 'Студент',
    sentiment: 'positive',
    date: '18 октября 2026',
    title: 'ФКН Вышки — лучший выбор для тех, кто готов впахивать',
    content: 'Поступил на ПМИ по олимпиаде. Нагрузка здесь колоссальная: 4 сессии в год, дедлайны каждую неделю, система накопительной оценки. Если вы хотите халявы — вам точно не сюда. Но качество преподавания топовое: алгоритмы ведут сотрудники Яндекса, математика на уровне мехмата, много проектных семинаров. В конце 2-го курса уже 70% ребят стажируются в бигтехе.',
    ratings: {
      teaching: 5,
      corruption: 'Нет',
      dormitory: 4,
      studentLife: 5,
      career: 5
    },
    likes: 142,
    commentsCount: 28,
    officialReply: {
      representativeName: 'Деканат ФКН НИУ ВШЭ',
      role: 'Официальный представитель вуза',
      date: '19 октября 2026',
      text: 'Благодарим за подробный и объективный отзыв! Мы постоянно развиваем партнерские программы с индустрией, чтобы наши студенты получали самые востребованные навыки с первых курсов.'
    }
  },
  {
    id: 'rev-2',
    universityId: 'mpei',
    universityName: 'НИУ МЭИ',
    facultyName: 'АВТИ (Автоматика и ВТ)',
    author: 'Алексей Д.',
    authorStatus: 'Выпускник',
    sentiment: 'positive',
    date: '12 сентября 2026',
    title: 'Честный отзыв про МЭИ: отличный баланс учебы и студенческой жизни',
    content: 'Закончил кафедру вычислительной техники. Университет даёт твёрдую техническую базу. Общежития в Лефортово находятся прямо в 5 минутах пешком от корпусов — это гигантский плюс в Москве! Преподаватели в большинстве адекватные, взяток нет вообще (всё сдаётся головой). Военная кафедра спасает от армии. Если реально учиться, а не пинать воздух, выйдете хорошим инженером.',
    ratings: {
      teaching: 4,
      corruption: 'Нет',
      dormitory: 4,
      studentLife: 5,
      career: 4
    },
    likes: 98,
    commentsCount: 15,
    officialReply: {
      representativeName: 'Управление общественных связей НИУ МЭИ',
      role: 'Официальный представитель вуза',
      date: '14 сентября 2026',
      text: 'Спасибо за теплые слова об альма-матер! Кампус в Лефортово продолжает модернизироваться, открываются новые лаборатории цифровой энергетики.'
    }
  },
  {
    id: 'rev-3',
    universityId: 'spbu',
    universityName: 'СПбГУ',
    facultyName: 'Юридический факультет',
    author: 'Екатерина В.',
    authorStatus: 'Студент',
    sentiment: 'neutral',
    date: '24 августа 2026',
    title: 'Традиции и имя есть, но организация хромает',
    content: 'Юрфак СПбГУ — бренд с огромной историей. Преподаватели легендарные, профессура высочайшего уровня. Однако главный минус — общежития в Петергофе (ПУНК). Ездить каждый день по 1.5–2 часа в одну сторону до Васильевского острова на пары — это пытка. В корпусах ремонт хороший, но бюрократия в деканате иногда убивает желание учиться.',
    ratings: {
      teaching: 5,
      corruption: 'Нет',
      dormitory: 2,
      studentLife: 3,
      career: 4
    },
    likes: 85,
    commentsCount: 22
  },
  {
    id: 'rev-4',
    universityId: 'bmstu',
    universityName: 'МГТУ им. Баумана',
    facultyName: 'Факультет ИУ',
    author: 'Дмитрий К.',
    authorStatus: 'Студент',
    sentiment: 'positive',
    date: '05 ноября 2026',
    title: 'Новый кампус Бауманки перевернул представление об универе',
    content: 'После открытия нового кампуса на Яузе Бауманка вышла на совершенно другой уровень. Современные коворкинги, лаборатории мирового класса. На ИУ7 драконовская нагрузка по C++ и ОС, но после этого никакой работодатель уже не страшен. Военная кафедра мощнейшая.',
    ratings: {
      teaching: 5,
      corruption: 'Нет',
      dormitory: 4,
      studentLife: 4,
      career: 5
    },
    likes: 115,
    commentsCount: 19
  },
  {
    id: 'rev-5',
    universityId: 'kfu',
    universityName: 'КФУ',
    facultyName: 'ИТИС',
    author: 'Камилла С.',
    authorStatus: 'Студент',
    sentiment: 'positive',
    date: '02 ноября 2026',
    title: 'Деревня Универсиады — это сказка для иногородних',
    content: 'ИТИС даёт практическое программирование без лишней воды. У каждого студента с 3 курса есть профильная лаборатория от индустриальных партнеров. А про общагу: Деревня Универсиады — это лучший кампус в стране! Чистота, охрана, парк, спорткомплекс, цена копеечная.',
    ratings: {
      teaching: 4,
      corruption: 'Нет',
      dormitory: 5,
      studentLife: 5,
      career: 4
    },
    likes: 74,
    commentsCount: 11
  }
];

export const DORMS_DATA: DormInfo[] = [
  {
    id: 'dorm-kfu-du',
    universityId: 'kfu',
    universityName: 'КФУ (Казань)',
    name: 'Деревня Универсиады (Кампус КФУ)',
    address: 'г. Казань, ул. Деревня Универсиады, д. 1-32',
    metro: 'Проспект Победы',
    walkMinutesToMetro: 10,
    travelMinutesToCampus: 25,
    priceMonthly: 800,
    ratingOverall: 4.8,
    pests: 'Отсутствуют',
    wardenStrictness: 'Умеренный',
    curfew: 'Круглосуточно (24/7)',
    showerLocation: 'В блоке',
    wifiSpeed: '100 Мбит/с (оптика)',
    reviewSnippet: 'Лучший студенческий городок в России. Охраняемая территория, футбольные поля, бассейн, магазины. В комнатах евроремонт.'
  },
  {
    id: 'dorm-hse-dubki',
    universityId: 'hse',
    universityName: 'НИУ ВШЭ (Москва)',
    name: 'Студенческий городок «Дубки»',
    address: 'Московская обл., Одинцовский р-н, пос. ВНИИССОК',
    metro: 'Одинцово (МЦД-1)',
    walkMinutesToMetro: 15,
    travelMinutesToCampus: 55,
    priceMonthly: 1800,
    ratingOverall: 4.6,
    pests: 'Отсутствуют',
    wardenStrictness: 'Лояльный',
    curfew: 'Круглосуточно (24/7)',
    showerLocation: 'В блоке',
    wifiSpeed: '70 Мбит/с (eduroam)',
    reviewSnippet: 'Квартирный тип, в каждой квартире отдельная кухня и санузел. Далековато от центра, но курсируют бесплатные автобусы до станции.'
  },
  {
    id: 'dorm-mpei-lefortovo',
    universityId: 'mpei',
    universityName: 'НИУ МЭИ (Москва)',
    name: 'Кампус Лефортово (Корпуса 1-6)',
    address: 'г. Москва, ул. Энергетическая, д. 6-18',
    metro: 'Авиамоторная / Лефортово',
    walkMinutesToMetro: 5,
    travelMinutesToCampus: 5,
    priceMonthly: 1200,
    ratingOverall: 4.1,
    pests: 'Редко',
    wardenStrictness: 'Умеренный',
    curfew: 'Круглосуточно (24/7)',
    showerLocation: 'На этаже',
    wifiSpeed: '50 Мбит/с',
    reviewSnippet: 'Главный козырь — до учебных корпусов 3 минуты пешком! Рядом парк, бассейн МЭИ, стадион Энергия.'
  },
  {
    id: 'dorm-bmstu-izmaylovo',
    universityId: 'bmstu',
    universityName: 'МГТУ им. Баумана (Москва)',
    name: 'Студгородок в Измайлово и на Яузе',
    address: 'г. Москва, Измайловский пр., д. 73 / Госпитальный пер., д. 4',
    metro: 'Первомайская / Бауманская',
    walkMinutesToMetro: 7,
    travelMinutesToCampus: 20,
    priceMonthly: 1400,
    ratingOverall: 3.9,
    pests: 'Редко',
    wardenStrictness: 'Строгий',
    curfew: 'До 01:00',
    showerLocation: 'В блоке',
    wifiSpeed: '100 Мбит/с',
    reviewSnippet: 'Новые корпуса на Госпитальном переулке — премиум уровень! В Измайлово коридорно-блочный тип, крепкий ремонт.'
  },
  {
    id: 'dorm-spbu-punk',
    universityId: 'spbu',
    universityName: 'СПбГУ (Санкт-Петербург)',
    name: 'ПУНК (Петергофский городок)',
    address: 'г. Санкт-Петербург, г. Петергоф, Ботаническая ул.',
    metro: 'Автово / Ленинский пр. (на электричке)',
    walkMinutesToMetro: 20,
    travelMinutesToCampus: 90,
    priceMonthly: 1300,
    ratingOverall: 3.5,
    pests: 'Бывают',
    wardenStrictness: 'Умеренный',
    curfew: 'Круглосуточно (24/7)',
    showerLocation: 'В блоке',
    wifiSpeed: '30 Мбит/с',
    reviewSnippet: 'Своя особая атмосфера студенческого братства, но дорога до Васильевского острова занимает полтора часа.'
  }
];

export const TOP_100_PROGRAMS: TopProgramItem[] = [
  {
    id: 'prog-1',
    rank: 1,
    code: '01.03.02',
    name: 'Прикладная математика и информатика',
    universityName: 'НИУ ВШЭ (ФКН)',
    universityLogo: '🎓',
    domain: 'Математика и IT',
    avgEgeScore: 308,
    competitionPerSeat: 24.5,
    startSalary: 220000,
    tuitionPerYear: 730000,
    budgetSlots: 110
  },
  {
    id: 'prog-2',
    rank: 2,
    code: '01.03.02',
    name: 'Прикладная математика и информатика',
    universityName: 'Университет ИТМО (ФИТиП)',
    universityLogo: '🚀',
    domain: 'Математика и IT',
    avgEgeScore: 302,
    competitionPerSeat: 19.8,
    startSalary: 210000,
    tuitionPerYear: 440000,
    budgetSlots: 100
  },
  {
    id: 'prog-3',
    rank: 3,
    code: '09.03.04',
    name: 'Программная инженерия (ИУ7)',
    universityName: 'МГТУ им. Н.Э. Баумана',
    universityLogo: '🛠️',
    domain: 'Математика и IT',
    avgEgeScore: 294,
    competitionPerSeat: 18.2,
    startSalary: 195000,
    tuitionPerYear: 395000,
    budgetSlots: 95
  },
  {
    id: 'prog-4',
    rank: 4,
    code: '38.03.01',
    name: 'Экономика и финансы (МИЭФ)',
    universityName: 'НИУ ВШЭ',
    universityLogo: '🎓',
    domain: 'Экономика и управление',
    avgEgeScore: 302,
    competitionPerSeat: 15.4,
    startSalary: 190000,
    tuitionPerYear: 880000,
    budgetSlots: 25
  },
  {
    id: 'prog-5',
    rank: 5,
    code: '40.03.01',
    name: 'Юриспруденция',
    universityName: 'СПбГУ',
    universityLogo: '🏛️',
    domain: 'Гуманитарные и социальные науки',
    avgEgeScore: 297,
    competitionPerSeat: 22.0,
    startSalary: 140000,
    tuitionPerYear: 420000,
    budgetSlots: 65
  },
  {
    id: 'prog-6',
    rank: 6,
    code: '09.03.01',
    name: 'Информатика и вычислительная техника (АВТИ)',
    universityName: 'НИУ МЭИ',
    universityLogo: '⚡',
    domain: 'Инженерия и технологии',
    avgEgeScore: 252,
    competitionPerSeat: 12.3,
    startSalary: 150000,
    tuitionPerYear: 285000,
    budgetSlots: 140
  },
  {
    id: 'prog-7',
    rank: 7,
    code: '09.03.04',
    name: 'Программная инженерия (ИТИС)',
    universityName: 'КФУ',
    universityLogo: '🏰',
    domain: 'Математика и IT',
    avgEgeScore: 268,
    competitionPerSeat: 14.1,
    startSalary: 160000,
    tuitionPerYear: 240000,
    budgetSlots: 120
  },
  {
    id: 'prog-8',
    rank: 8,
    code: '09.03.01',
    name: 'Информатика и вычислительная техника (ФИТ)',
    universityName: 'НГУ (Новосибирск)',
    universityLogo: '🌲',
    domain: 'Математика и IT',
    avgEgeScore: 275,
    competitionPerSeat: 13.8,
    startSalary: 175000,
    tuitionPerYear: 235000,
    budgetSlots: 90
  }
];

export const QNA_QUESTIONS: QnaQuestion[] = [
  {
    id: 'q-1',
    author: 'Абитуриент-2026',
    date: 'Вчера, 19:40',
    universityName: 'НИУ МЭИ',
    title: 'Есть ли реальный шанс на бюджет в МЭИ на ИВТ с 249 баллами?',
    content: 'Привет! Сдал профильную математику на 84, русский на 83, английский 82. Дадут ли 5 баллов за золотую медаль и какой был реальный проходной в прошлой волне?',
    views: 4820,
    answersCount: 3,
    answers: [
      {
        author: 'Староста АВТИ',
        role: 'Студент 3 курса',
        date: 'Вчера, 20:15',
        content: 'Привет! За медаль в МЭИ дают +7 баллов (проверяй правила приема 2026). С суммой 249 + 7 = 256 баллов на ИВТ ты проходишь с вероятностью 90%. Обязательно подавай оригинал в первой волне.'
      },
      {
        author: 'Приемная комиссия (неофициально)',
        role: 'Модератор',
        date: 'Вчера, 21:00',
        content: 'Проходной в 2025 году был 252 балла. Твой балл очень комфортный для бюджета.'
      }
    ]
  },
  {
    id: 'q-2',
    author: 'Ольга П.',
    date: '3 дня назад',
    universityName: 'НИУ ВШЭ',
    title: 'Как работают скидки на платном обучении в ВШЭ?',
    content: 'Если не добрала до бюджета 5 баллов, какую скидку дают на первый год и как её удержать на последующих курсах?',
    views: 3150,
    answersCount: 2,
    answers: [
      {
        author: 'Максим Г.',
        role: 'Студент МИЭФ',
        date: '2 дня назад',
        content: 'При недоборе до 5 баллов дают скидку 70% на первый год обучения. Чтобы сохранить её на 2 курсе, нужно входить в топ-15% академического рейтинга факультета и не иметь пересдач.'
      }
    ]
  },
  {
    id: 'q-3',
    author: 'Артем Б.',
    date: '5 дней назад',
    title: 'Дает ли диплом призера регионального этапа ВсОШ право БВИ?',
    content: 'Стал призером рега по физике в 11 классе. Куда с этим можно поступить без экзаменов или это дает только 100 баллов?',
    views: 6240,
    answersCount: 2,
    answers: [
      {
        author: 'Олимпиадный куратор',
        role: 'Эксперт',
        date: '5 дней назад',
        content: 'Региональный этап не дает право поступления БВИ (БВИ дает только заключительный этап ВсОШ и олимпиады РСОШ 1-2 уровней). Но регион дает +3-5 баллов за ИД во многих технических вузах.'
      }
    ]
  }
];

export const OPEN_DAYS: OpenDayEvent[] = [
  {
    id: 'dod-1',
    universityId: 'mpei',
    universityName: 'НИУ МЭИ',
    date: '22 ноября 2026',
    time: '11:00 (МСК)',
    format: 'Очно и Онлайн',
    address: 'г. Москва, ул. Красноказарменная, д. 17',
    facultyName: 'Все институты и факультеты',
    registrationLink: 'https://mpei.ru/dod'
  },
  {
    id: 'dod-2',
    universityId: 'hse',
    universityName: 'НИУ ВШЭ',
    date: '29 ноября 2026',
    time: '12:00 (МСК)',
    format: 'Очно',
    address: 'г. Москва, Покровский бульвар, д. 11',
    facultyName: 'Факультет компьютерных наук (ФКН)',
    registrationLink: 'https://cs.hse.ru/dod'
  },
  {
    id: 'dod-3',
    universityId: 'bmstu',
    universityName: 'МГТУ им. Н.Э. Баумана',
    date: '06 декабря 2026',
    time: '10:00 (МСК)',
    format: 'Очно',
    address: 'г. Москва, 2-я Бауманская ул., д. 5',
    facultyName: 'День открытых дверей факультета ИУ и РК',
    registrationLink: 'https://bmstu.ru/openday'
  },
  {
    id: 'dod-4',
    universityId: 'itmo',
    universityName: 'Университет ИТМО',
    date: '13 декабря 2026',
    time: '14:00 (МСК)',
    format: 'Онлайн',
    address: 'Трансляция на YouTube и VK',
    facultyName: 'Все IT-направления бакалавриата',
    registrationLink: 'https://itmo.ru/stream'
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Календарь абитуриента 2026: ключевые даты приема и подачи согласий',
    category: 'Поступление',
    excerpt: 'Пошаговый график вступительной кампании: от старта приема документов на Госуслугах до публикации приказов о зачислении.',
    readTime: '6 мин',
    views: 18450,
    date: '10 ноября 2026',
    content: [
      'Приемная кампания 2026 года сохраняет подачу документов через суперсервис «Поступление в вуз онлайн» на портале Госуслуг, а также очно в приемных комиссиях.',
      'Основные даты: 20 июня — старт приема документов; 25 июля — завершение приема заявлений от поступающих по результатам ЕГЭ; 28 июля — завершение приема оригиналов от лиц с особыми правами и БВИ; 3 августа — завершение приема оригиналов на основные бюджетные места.'
    ]
  },
  {
    id: 'art-2',
    title: 'Что выгоднее: платное обучение или репетиторы и курсы для подготовки к ЕГЭ?',
    category: 'ЕГЭ',
    excerpt: 'Экономический разбор стоимости года коммерческого обучения в топ-вузах по сравнению с вложениями в 85+ баллов по каждому предмету.',
    readTime: '8 мин',
    views: 24100,
    date: '04 ноября 2026',
    content: [
      'Год обучения на престижных IT и экономических направлениях в Москве сегодня стоит от 350 000 до 850 000 рублей, то есть за 4 года семья отдаст от 1.5 до 3.5 миллионов рублей.',
      'Комплексная годовая подготовка к трем предметам в онлайн-школах с куратором обойдется в 70 000 – 120 000 рублей. Попадание на бюджет окупает подготовку в первый же семестр!'
    ]
  },
  {
    id: 'art-3',
    title: 'Общежития в Москве и СПб: как распределяются места и к чему готовиться',
    category: 'Общежития',
    excerpt: 'Где селят первокурсников, сколько стоит проживание, правила пропускного режима и как выжить в блоке.',
    readTime: '5 мин',
    views: 15300,
    date: '28 октября 2026',
    content: [
      'В государственных университетах общежитие гарантируется студентам очной бюджетной формы обучения, проживающим далее определенного радиуса (обычно от 50 до 100 км от МКАД / КАД).',
      'Стоимость проживания в среднем составляет от 800 до 2500 рублей в месяц для бюджетников. Обратите внимание, что некоторые вузы селят первокурсников в отдаленные кампусы или арендованные гостиницы.'
    ]
  }
];

export const SPECIALTIES: SpecialtyInfo[] = [
  {
    code: '09.03.01',
    name: 'Информатика и вычислительная техника',
    category: 'Математика и IT',
    description: 'Разработка аппаратных и программных вычислительных комплексов, микропроцессорных систем, системного ПО и встраиваемых решений.',
    requiredSubjects: ['Русский язык', 'Профильная математика', 'Информатика (ИКТ)'],
    avgSalary: 145000,
    universitiesCount: 184
  },
  {
    code: '09.03.04',
    name: 'Программная инженерия',
    category: 'Математика и IT',
    description: 'Проектирование архитектуры больших программных систем, управление разработкой ПО, frontend/backend разработка, DevOps.',
    requiredSubjects: ['Русский язык', 'Профильная математика', 'Информатика (ИКТ)'],
    avgSalary: 180000,
    universitiesCount: 142
  },
  {
    code: '01.03.02',
    name: 'Прикладная математика и информатика',
    category: 'Математика и IT',
    description: 'Математическое моделирование, Data Science, Machine Learning, алгоритмический трейдинг и высокопроизводительные вычисления.',
    requiredSubjects: ['Русский язык', 'Профильная математика', 'Информатика (ИКТ)'],
    avgSalary: 195000,
    universitiesCount: 120
  },
  {
    code: '10.05.03',
    name: 'Информационная безопасность автоматизированных систем',
    category: 'Математика и IT',
    description: 'Защита критической инфраструктуры, пентестинг, криптография, предотвращение кибератак и аудит ИБ.',
    requiredSubjects: ['Русский язык', 'Профильная математика', 'Информатика / Физика'],
    avgSalary: 160000,
    universitiesCount: 95
  },
  {
    code: '38.03.01',
    name: 'Экономика',
    category: 'Экономика и управление',
    description: 'Корпоративные финансы, инвестиционный анализ, банковское дело, аудит и финансовый консалтинг.',
    requiredSubjects: ['Русский язык', 'Профильная математика', 'Обществознание / Английский язык'],
    avgSalary: 130000,
    universitiesCount: 220
  },
  {
    code: '40.03.01',
    name: 'Юриспруденция',
    category: 'Гуманитарные и социальные науки',
    description: 'Гражданское, уголовное, международное и корпоративное право, адвокатура, нотариат и судебная практика.',
    requiredSubjects: ['Русский язык', 'Обществознание', 'История'],
    avgSalary: 125000,
    universitiesCount: 190
  }
];
