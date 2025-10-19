import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// const navigation = [
//   { name: 'Начало', href: '#', current: true },
//   {
//     name: 'Услуги',
//     href: '#',
//     current: false,
//     children: [
//       { name: 'Фолиране', href: '#', current: false },
//       { name: 'Застраховане', href: '#', current: false },
//       { name: 'Плотери', href: '#', current: false },
//     ],
//   },
//   { name: 'Цени', href: '#', current: false },
//   { name: 'Галерия', href: '#', current: false },
//   { name: 'Екипа', href: '#', current: false },
//   { name: 'Контакт', href: '#', current: false },
// ]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'начало',
      component: HomeView,
    },

    { path: '/цени', name: 'Цени', component: () => import('@/views/PricesView.vue') },
    { path: '/галерия', name: 'Галерия', component: () => import('@/views/GalleryView.vue') },
    { path: '/екип', name: 'Екипа', component: () => import('@/views/TeamView.vue') },
    { path: '/контакт', name: 'Контакт', component: () => import('@/views/ContanctView.vue') },
    { path: '/услуги', name: 'Услуги', component: () => import('@/views/ServicesView.vue') },
  ],
})

export default router
