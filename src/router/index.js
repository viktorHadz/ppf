import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const BRAND = 'IDO Elite Protection'
const DEFAULT_DESC =
  'Премиум авто услуги в София: PPF защитно фолио, затъмняване на стъкла, авто детайлинг и консултация. Прецизен монтаж и премиум защита на боята.'

export const routes = [
  {
    path: '/',
    name: 'начало',
    component: HomeView,
    meta: {
      title: `PPF фолиране затъмняване и детайлинг | ${BRAND}`,
      description: DEFAULT_DESC,
    },
  },

  {
    path: '/portfolio',
    name: 'Портфолио',
    component: () => import('@/views/PortfolioView.vue'),
    meta: {
      title: `Портфолио | ${BRAND}`,
      description:
        'Проекти: PPF защитно фолио, затъмняване на стъкла и детайлинг. Снимки преди/след и премиум резултати.',
    },
  },

  {
    path: '/about',
    name: 'Екип',
    component: () => import('@/views/AboutView.vue'),
    meta: {
      title: `За нас | ${BRAND}`,
      description:
        'Екип и подход: прецизен монтаж, внимание към детайла и премиум материали за защита и визия на автомобила.',
    },
  },

  {
    path: '/contact',
    name: 'Контакт',
    component: () => import('@/views/ContactView.vue'),
    meta: {
      title: `Запитване за PPF, затъмняване и детайлинг | ${BRAND}`,
      description:
        'Изпратете запитване за PPF защитно фолио, затъмняване на стъкла, детайлинг или застраховки в София. Отговаряме бързо.',
    },
  },

  {
    path: '/ppf',
    name: 'Фолиране',
    component: () => import('@/views/PpfView.vue'),
    meta: {
      title: `PPF защитно фолио за автомобил в София | ${BRAND}`,
      description:
        'Професионално авто фолиране и защита София. Качествена и прецизна смяна на визията. Защита от камъчета, драскотини и петна. Прецизен монтаж и премиум покритие за боята.',
    },
  },
  {
    path: '/detailing',
    name: 'Детайлинг',
    component: () => import('@/views/DetailingView.vue'),
    meta: {
      title: `Авто детайлинг София | ${BRAND}`,
      description:
        'Екстериорен и интериорен детайлинг в София: деконтаминация, полиране и защитни покрития за премиум вид и поддръжка.',
    },
  },
  {
    path: '/insurance',
    name: 'Застраховки',
    component: () => import('@/views/InsuranceView.vue'),
    meta: {
      title: `Застраховки и Каско | ${BRAND}`,
      description:
        'Съдействие при избор на застраховка и консултация за защита на автомобила. Бърза комуникация и ясни условия.',
    },
  },

  {
    path: '/tinting',
    name: 'Затъмняване',
    component: () => import('@/views/TintingView.vue'),
    meta: {
      title: `Затъмняване на автостъкла в София | ${BRAND}`,
      description:
        'Професионално затъмняване на стъкла в София с UV защита и комфорт. Прецизен монтаж и дълготраен резултат.',
    },
  },

  // legal pages (same view, props)
  {
    path: '/terms',
    name: 'Terms',
    component: () => import('@/views/LegalView.vue'),
    props: { slug: 'terms' },
    meta: {
      title: `Общи условия | ${BRAND}`,
      description: 'Общи условия за ползване на уебсайта и изпращане на запитвания.',
    },
  },

  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import('@/views/LegalView.vue'),
    props: { slug: 'privacy' },
    meta: {
      title: `Политика за поверителност | ${BRAND}`,
      description: 'Политика за поверителност и обработка на лични данни съгласно GDPR.',
    },
  },

  {
    path: '/cookies',
    name: 'Cookies',
    component: () => import('@/views/LegalView.vue'),
    props: { slug: 'cookies' },
    meta: {
      title: `Политика за бисквитки | ${BRAND}`,
      description: 'Политика за бисквитки и управление на съгласие.',
    },
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: `Страницата не е намерена | ${BRAND}`, description: DEFAULT_DESC },
  },
]

export async function scrollBehavior(to, from, savedPosition) {
  // SSG/SSR safety: no DOM APIs
  if (import.meta.env.SSR) return { top: 0 }

  if (savedPosition) return savedPosition

  if (to.hash) {
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        resolve({ el: to.hash, behavior: 'smooth' })
      })
    })
  }

  return { top: 0 }
}

const router = createRouter({
  history: import.meta.env.SSR
    ? createMemoryHistory(import.meta.env.BASE_URL)
    : createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior,
})

export { BRAND, DEFAULT_DESC }
export default router
