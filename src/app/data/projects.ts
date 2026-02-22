export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  stack: string;
  tags: string[];
  images: string[];
  demoUrl?: string;
  githubUrl?: string;
  company: string;
  year: string;
  countries?: string[];
}

export const projects: Project[] = [
  // =========================
  // GOOGLE ADS — Landing Library
  // =========================
  {
    id: 'landing-0748-google-ads',
    title: 'Лендинг: Quest Adventures — VR‑квесты',
    description:
      'Иммерсивный лендинг под Google Ads: видео-hero, сильные офферы, блоки доверия и CTA для записи. Акценты на motion и премиальный визуал.',
    category: 'Google Ads',
    stack: 'GSAP, Video, Tailwind, Glass, Gradients',
    tags: ['Google Ads', 'Лендинг', 'GSAP', 'Видео'],
    images: ['/assets/projects/landing-0748-google-ads-cover.jpg'],
    demoUrl: 'https://askhalilov.github.io/landing-library/landings/landing-0748-google-ads/',
    company: 'Landing Library',
    year: '2024'
  ,
    countries: ['PH']},
  {
    id: 'landing-1048-google-ads',
    title: 'Лендинг: Nexo Caldera — консалтинг и обучение',
    description:
      'Лендинг под Google Ads для консалтинга и обучения: оффер, услуги/программа, кейсы/отзывы и лид-форма. Плавная подача контента и фокус на конверсию.',
    category: 'Google Ads',
    stack: 'Video, SmoothScroll, Tailwind, Glass, Gradients',
    tags: ['Google Ads', 'Лендинг', 'SmoothScroll', 'Glass'],
    images: ['/assets/projects/landing-1048-google-ads-cover.jpg'],
    demoUrl: 'https://askhalilov.github.io/landing-library/landings/landing-1048-google-ads/',
    company: 'Landing Library',
    year: '2024'
  ,
    countries: ['RU']},
  {
    id: 'landing-0087-google-ads',
    title: 'Лендинг: Vita Solis — солнечная энергетика',
    description:
      'Лендинг под Google Ads: структура услуг, видео-блок, сторителлинг через секции, ROI/калькулятор и форма заявки. Акцент на ясный UI.',
    category: 'Google Ads',
    stack: 'Video, SmoothScroll, Tailwind, Glass, Gradients',
    tags: ['Google Ads', 'Лендинг', 'Видео', 'UI'],
    images: ['/assets/projects/landing-0087-google-ads-cover.jpg'],
    demoUrl: 'https://askhalilov.github.io/landing-library/landings/landing-0087-google-ads/',
    company: 'Landing Library',
    year: '2024'
  ,
    countries: ['DE', 'AT']},
  {
    id: 'landing-0951-google-ads',
    title: 'Лендинг: Fable Co — культурные туры',
    description:
      'Лендинг под Google Ads: сильный визуал, фокус на выгодах, блоки доверия и CTA. Typed-анимации усиливают оффер и удержание внимания.',
    category: 'Google Ads',
    stack: 'Video, SmoothScroll, Typed, Tailwind, Gradients',
    tags: ['Google Ads', 'Лендинг', 'Typed', 'Видео'],
    images: ['/assets/projects/landing-0951-google-ads-cover.jpg'],
    demoUrl: 'https://askhalilov.github.io/landing-library/landings/landing-0951-google-ads/',
    company: 'Landing Library',
    year: '2024'
  ,
    countries: ['IT']},
  {
    id: 'landing-0743-google-ads',
    title: 'Лендинг: образовательные услуги',
    description:
      'Лендинг под Google Ads: видео-hero, блок “как это работает”, выгоды, отзывы и форма заявки. Акцент на ясную структуру.',
    category: 'Google Ads',
    stack: 'Video, SmoothScroll, Tailwind, Glass, Gradients',
    tags: ['Google Ads', 'Лендинг', 'Видео', 'Формы'],
    images: ['/assets/projects/landing-0743-google-ads-cover.jpg'],
    demoUrl: 'https://askhalilov.github.io/landing-library/landings/landing-0743-google-ads/',
    company: 'Landing Library',
    year: '2024'
  ,
    countries: ['RU']},
  {
    id: 'landing-0628-google-ads',
    title: 'Лендинг: Liyab Frost — VR‑игры',
    description:
      'Лендинг под Google Ads: видео-hero, секции продукта/сценариев, доверие и CTA. GSAP даёт ощущение “премиум-презентации”.',
    category: 'Google Ads',
    stack: 'GSAP, Video, Tailwind, Gradients',
    tags: ['Google Ads', 'Лендинг', 'GSAP', 'Видео'],
    images: ['/assets/projects/landing-0628-google-ads-cover.jpg'],
    demoUrl: 'https://askhalilov.github.io/landing-library/landings/landing-0628-google-ads/',
    company: 'Landing Library',
    year: '2024'
  ,
    countries: ['PH']},
  {
    id: 'landing-1107-google-ads',
    title: 'Лендинг: технологичная презентация сервиса',
    description:
      'Лендинг под Google Ads: Canvas-анимации, видео и микроконтраст в UI. Сфокусирован на конверсионном скролл-пути и понятных CTA.',
    category: 'Google Ads',
    stack: 'Canvas, Video, Tailwind, Glass, Gradients',
    tags: ['Google Ads', 'Лендинг', 'Canvas', 'UI'],
    images: ['/assets/projects/landing-1107-google-ads-cover.jpg'],
    demoUrl: 'https://askhalilov.github.io/landing-library/landings/landing-1107-google-ads/',
    company: 'Landing Library',
    year: '2024'
  ,
    countries: ['RU']},
  {
    id: 'landing-1120-google-ads',
    title: 'Лендинг: IT‑решения для бизнеса',
    description:
      'High-tech лендинг под Google Ads: услуги/процесс, кейсы, блоки доверия и форма заявки. Премиальная подача и типографика.',
    category: 'Google Ads',
    stack: 'Video, SmoothScroll, Tailwind, Glass, Gradients',
    tags: ['Google Ads', 'Лендинг', 'Видео', 'UI'],
    images: ['/assets/projects/landing-1120-google-ads-cover.jpg'],
    demoUrl: 'https://askhalilov.github.io/landing-library/landings/landing-1120-google-ads/',
    company: 'Landing Library',
    year: '2024'
  ,
    countries: ['RU']},
  {
    id: 'landing-0418-google-ads',
    title: 'Лендинг: промышленный сервис',
    description:
      'Лендинг под Google Ads: оффер → преимущества → доверие → форма. Акцент на читабельные блоки и быстрые CTA.',
    category: 'Google Ads',
    stack: 'Video, SmoothScroll, Tailwind, Glass, Gradients',
    tags: ['Google Ads', 'Лендинг', 'Формы', 'Видео'],
    images: ['/assets/projects/landing-0418-google-ads-cover.jpg'],
    demoUrl: 'https://askhalilov.github.io/landing-library/landings/landing-0418-google-ads/',
    company: 'Landing Library',
    year: '2024'
  ,
    countries: ['RU']},
  {
    id: 'landing-0996-google-ads',
    title: 'Лендинг: студия и мастер‑классы',
    description:
      'Лендинг под Google Ads: Canvas/Typed-акценты, видео, витрина услуг, галерея и отзывы. Конверсионные CTA на запись.',
    category: 'Google Ads',
    stack: 'Canvas, Video, Typed, Tailwind, Gradients',
    tags: ['Google Ads', 'Лендинг', 'Canvas', 'Typed'],
    images: ['/assets/projects/landing-0996-google-ads-cover.jpg'],
    demoUrl: 'https://askhalilov.github.io/landing-library/landings/landing-0996-google-ads/',
    company: 'Landing Library',
    year: '2024'
  ,
    countries: ['IT']},
  {
    id: 'landing-0320-google-ads',
    title: 'Лендинг: продвижение и реклама',
    description:
      'Лендинг под Google Ads: Typed-анимации в оффере, smooth-scroll, градиенты и сильные CTA. Сфокусирован на лидогенерации.',
    category: 'Google Ads',
    stack: 'Video, SmoothScroll, Typed, Tailwind, Gradients',
    tags: ['Google Ads', 'Лендинг', 'Typed', 'SmoothScroll'],
    images: ['/assets/projects/landing-0320-google-ads-cover.jpg'],
    demoUrl: 'https://askhalilov.github.io/landing-library/landings/landing-0320-google-ads/',
    company: 'Landing Library',
    year: '2024'
  ,
    countries: ['IT']},

  // =========================
  // САЙТЫ
  // =========================
  {
    id: 'site-perspektiva',
    title: 'Сайт: ООО «ПерспективаТЦ»',
    description:
      'Сайт с формами и контентом: услуги, преимущества, блоки доверия и заявки. Сделан с упором на структуру, UX и конверсию.',
    category: 'Сайты',
    stack: 'HTML, CSS, JS',
    tags: ['Сайт', 'Формы', 'UI'],
    images: ['/assets/projects/site-perspektiva-cover.jpg'],
    demoUrl: 'https://askhalilov.github.io/',
    company: 'ООО «ПерспективаТЦ»',
    year: '2024'
  },

  // =========================
  // СКРИПТЫ / CRM (HQ‑превью + код на GitHub)
  // =========================
  {
    id: 'script-whitepages-api',
    title: 'Инструмент: Whitepages API — Run/Tasks панель',
    description:
      'Интерфейс для запуска пайплайнов и мониторинга задач: режим Mock/Real API, генерация run, статусы, логи и выгрузка результатов. Код и README — на GitHub.',
    category: 'Скрипты/CRM',
    stack: 'JS, PHP',
    tags: ['API', 'Dashboard', 'Automation'],
    images: ['/assets/projects/script-whitepages-api-cover.jpg'],
    demoUrl: '/demos/scripts/whitepages/',
    githubUrl: 'https://github.com/askhalilov?tab=repositories',
    company: 'Gorgona Media',
    year: '2026'
  },
  {
    id: 'dashboard-eco-monitoring',
    title: 'Dashboard: «ЭкоМониторинг» — отчёты и аналитика',
    description:
      'Админ‑панель экологического мониторинга: формирование отчётов, статус готовности, быстрые шаблоны, экспорт (PDF/Excel/CSV/JSON) и контроль ПДК по показателям. Код и README — на GitHub.',
    category: 'Скрипты/CRM',
    stack: 'JS, PHP',
    tags: ['Dashboard', 'Reports', 'UI'],
    images: ['/assets/projects/dashboard-eco-monitoring-cover.jpg'],
    demoUrl: '/demos/scripts/eco-monitoring/',
    githubUrl: 'https://github.com/askhalilov?tab=repositories',
    company: 'Gorgona Media',
    year: '2026'
  },
  {
    id: 'tool-domain-checker',
    title: 'Утилита: Domain Checker — массовая проверка доменов',
    description:
      'Инструмент для пакетной проверки доменов: загрузка списком/файлом, статусы и сообщения, фильтры, поиск, экспорт (CSV/JSON) и копирование таблицы. Код и README — на GitHub.',
    category: 'Скрипты/CRM',
    stack: 'JS, PHP',
    tags: ['Utility', 'Automation', 'Export'],
    images: ['/assets/projects/tool-domain-checker-cover.jpg'],
    demoUrl: '/demos/scripts/domain-checker/',
    githubUrl: 'https://github.com/askhalilov?tab=repositories',
    company: 'Gorgona Media',
    year: '2026'
  },
  {
    id: 'tool-deploy-catalog',
    title: 'Инструмент: Deploy Catalog API — деплой архивов',
    description:
      'Панель для запуска деплоя каталога/архивов: настройки и режимы, список доменов, состояние run, очередь задач, логи и управление процессом. Код и README — на GitHub.',
    category: 'Скрипты/CRM',
    stack: 'JS, PHP',
    tags: ['DevOps', 'Automation', 'Dashboard'],
    images: ['/assets/projects/tool-deploy-catalog-cover.jpg'],
    demoUrl: '/demos/scripts/deploy-catalog/',
    githubUrl: 'https://github.com/askhalilov?tab=repositories',
    company: 'Gorgona Media',
    year: '2026'
  },
  {
    id: 'eco-pet-project',
    title: 'Pet: ECO — мониторинг окружающей среды',
    description:
      'Пет‑проект: панель экологического мониторинга с виджетами, графиками и фильтрами. Демо развёрнуто на GitHub Pages.',
    category: 'Pet',
    stack: 'React, Vite, Tailwind, Radix UI, Recharts',
    tags: ['Pet', 'Dashboard', 'UI'],
    images: ['/assets/projects/eco-pet-project-cover.png'],
    demoUrl: 'https://askhalilov.github.io/ECO_PET_project/',
    githubUrl: 'https://github.com/askhalilov?tab=repositories',
    company: 'personal',
    year: '2026'
  }
];

export const categories = ['Все', 'Google Ads', 'Сайты', 'Скрипты/CRM', 'Pet'];
