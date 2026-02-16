<script setup>
import { computed, ref, watch } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import { RouterLink } from 'vue-router'

import DecorDiagSheen from '@/components/global/DecorDiagSheen.vue'
import bmwX5 from '@/assets/portfolio/bmwX5'
import bmwX7 from '@/assets/portfolio/bmwX7'
import mercSClass from '@/assets/portfolio/mercSClass'
import mercEqs from '@/assets/portfolio/mercEqs'
import pTaykan from '@/assets/portfolio/pTaykan'
import pCayenne from '@/assets/portfolio/pCayenne'
import rollsRoyce from '@/assets/portfolio/rRoyceRS'
import { useAnalytics } from '@/composables/useAnalytics'
const categories = [
  { key: 'all', label: 'Всички' },
  { key: 'ppf', label: 'PPF' },
  { key: 'tinting', label: 'Затъмняване' },
  { key: 'detailing', label: 'Детайлинг' },
]

const projects = [
  {
    id: 'rr',
    title: 'Ролс Ройс РС',
    service: 'Цялостно Фолиране',
    category: 'ppf',
    cover: rollsRoyce.cover,
    highlights: ['Максимална защита', 'Самовъзстановащо Фолио'],
    images: Object.values(rollsRoyce),
  },
  {
    id: 'eqs',
    title: 'Мерцедес EQS',
    service: 'Фолиране • Затъмняване',
    category: 'tinting',
    cover: mercEqs.cover,
    highlights: ['Фолиране - частично', 'Затъмняване - 70%'],
    images: Object.values(mercEqs),
  },
  {
    id: 'sclass',
    title: 'Мерцедес S Class',
    service: 'Фолиране',
    category: 'ppf',
    cover: mercSClass.cover,
    highlights: ['Фолиране - Chrome Delete'],
    images: Object.values(mercSClass),
  },
  {
    id: 'cayenne',
    title: 'Порше Кайен',
    service: 'Фолиране',
    category: 'ppf',
    cover: pCayenne.cover,
    highlights: ['Фолиране - предница'],
    images: Object.values(pCayenne),
  },
  {
    id: 'taycan',
    title: 'Порше Тайкан',
    service: 'Фолиране',
    category: 'ppf',
    cover: pTaykan.cover,
    highlights: ['Фолиране - предница'],
    images: Object.values(pTaykan),
  },
  {
    id: 'x7',
    title: 'БМВ Х7',
    service: 'Фолиране',
    category: 'ppf',
    cover: bmwX7.cover,
    highlights: ['Фолиране - подмяна', 'Chrome Matte'],
    images: Object.values(bmwX7),
  },
  {
    id: 'x5',
    title: 'БМВ Х5',
    service: 'Фолиране',
    category: 'ppf',
    cover: bmwX5.cover,
    highlights: ['Фолиране - частично', 'предница'],
    images: Object.values(bmwX5),
  },
]

// optional “featured” picks (top row big cards)
const featuredIds = ['rr', 'eqs', 'taycan']

const activeCategory = ref('all')
const query = ref('')

// Lightbox state
const open = ref(false)
const activeProjectId = ref(null)
const activeImageIndex = ref(0)

const featured = computed(() => projects.filter((p) => featuredIds.includes(p.id)))

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return projects.filter((p) => {
    const matchCat = activeCategory.value === 'all' || p.category === activeCategory.value
    const matchQ =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.service.toLowerCase().includes(q) ||
      (p.highlights || []).some((h) => h.toLowerCase().includes(q))
    return matchCat && matchQ
  })
})

const activeProject = computed(() => {
  if (!activeProjectId.value) return null
  return projects.find((p) => p.id === activeProjectId.value) || null
})

function openProject(p, startIndex = 0) {
  analytics?.portfolio(p.id, p.title)
  activeProjectId.value = p.id
  activeImageIndex.value = startIndex
  open.value = true
}

function closeProject() {
  open.value = false
}

function nextImage() {
  const p = activeProject.value
  if (!p) return
  activeImageIndex.value = (activeImageIndex.value + 1) % p.images.length
}

function prevImage() {
  const p = activeProject.value
  if (!p) return
  activeImageIndex.value = (activeImageIndex.value - 1 + p.images.length) % p.images.length
}

watch(open, (v) => {
  if (!v) {
    activeProjectId.value = null
    activeImageIndex.value = 0
  }
})

const analytics = useAnalytics()

function onPortfolioInquiryClick() {
  analytics?.cta('portfolio_bottom_inquiry', 'portfolio_page', 'Запитване')
}

function onModalConsultationClick() {
  const p = activeProject.value
  analytics?.cta(
    'portfolio_modal_consultation',
    'portfolio_modal',
    p?.id ? `${p.id} • ${p.title}` : 'Консултация',
  )
}
</script>

<template>
  <main class="bg-zinc-950 relative isolate overflow-hidden">
    <!-- Decorative Element Dark -->
    <svg
      class="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-zinc-800/30 sm:stroke-zinc-800/20 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="gallery-grid"
          width="200"
          height="200"
          x="50%"
          y="-1"
          patternUnits="userSpaceOnUse"
        >
          <path d="M.5 200V.5H200" fill="none" />
        </pattern>
      </defs>
      <svg x="50%" y="-1" class="overflow-visible fill-zinc-800/20">
        <path
          d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
          stroke-width="0"
        />
      </svg>
      <rect width="100%" height="100%" stroke-width="0" fill="url(#gallery-grid)" />
    </svg>

    <!-- Top controls -->
    <section class="py-16 sm:py-20">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div class="max-w-2xl">
            <h1 class="text-base/7 font-semibold text-red-500 mb-4">Портфолио</h1>
            <h2 class="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Проекти, които говорят сами
            </h2>
            <p class="mt-4 text-sm/7 text-gray-400">
              Филтрирайте по услуга и разгледайте детайлите по всеки проект.
            </p>
          </div>
        </div>

        <!-- Category pills -->
        <div class="mt-10 flex flex-wrap gap-3">
          <button
            v-for="c in categories"
            :key="c.key"
            type="button"
            @click="activeCategory = c.key"
            :class="[
              'rounded-full px-4 py-2 text-sm font-semibold ring-1 transition',
              activeCategory === c.key
                ? 'bg-red-500/15 text-red-200 ring-red-500/25'
                : 'bg-white/5 text-gray-200 ring-white/10 hover:bg-white/10',
            ]"
          >
            {{ c.label }}
          </button>
        </div>
      </div>
    </section>

    <section class="bg-zinc-900 py-20 sm:py-28 relative overflow-hidden">
      <div class="grid-el-2"></div>
      <DecorDiagSheen />

      <div class="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <!-- Featured -->
        <div class="flex items-end justify-between gap-6">
          <div>
            <h2 class="text-lg font-semibold text-white">Акценти</h2>
          </div>
        </div>

        <div class="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <button
            v-for="p in featured"
            :key="p.id"
            type="button"
            @click="openProject(p, 0)"
            class="group relative flex w-full flex-col overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 hover:bg-white/6 transition text-left"
          >
            <div class="relative">
              <img :src="p.cover" :alt="p.title" class="h-56 w-full object-cover" />
              <div
                class="absolute inset-0 bg-linear-to-t from-zinc-950/70 via-zinc-950/10 to-transparent"
              />
              <div class="absolute inset-x-0 bottom-0 p-6">
                <div class="text-white text-base font-semibold">{{ p.title }}</div>
                <div class="mt-1 text-sm text-gray-200/80">{{ p.service }}</div>
              </div>
            </div>

            <div class="p-6">
              <ul class="space-y-2 text-sm text-gray-300">
                <li v-for="h in p.highlights" :key="h" class="flex gap-3">
                  <span class="mt-2 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0"></span>
                  <span>{{ h }}</span>
                </li>
              </ul>

              <div class="mt-6 inline-flex items-center text-sm font-semibold text-red-300">
                Виж проекта
                <span class="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </div>
            </div>
          </button>
        </div>

        <!-- Grid header -->
        <div class="mt-20 flex items-end justify-between gap-6">
          <div>
            <h2 class="text-lg font-semibold text-white">Всички проекти</h2>
            <p class="mt-2 text-sm/7 text-gray-400">
              {{ filtered.length }} резултата
              <span v-if="activeCategory !== 'all'">
                • {{ categories.find((x) => x.key === activeCategory)?.label }}</span
              >
              <span v-if="query.trim()"> • “{{ query.trim() }}”</span>
            </p>
          </div>
        </div>

        <!-- Project Cards Outside -->
        <div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <button
            v-for="p in filtered"
            :key="p.id"
            type="button"
            @click="openProject(p, 0)"
            class="group relative flex w-full flex-col overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 hover:bg-white/6 transition text-left"
          >
            <div class="relative">
              <img :src="p.cover" :alt="p.title" class="h-60 w-full object-cover" />
              <div
                class="absolute inset-0 bg-linear-to-t from-zinc-950/75 via-zinc-950/10 to-transparent"
              />
              <div class="absolute inset-x-0 bottom-0 p-6">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <div class="text-white text-base font-semibold">{{ p.title }}</div>
                    <div class="mt-1 text-sm text-gray-200/80">{{ p.service }}</div>
                  </div>

                  <span
                    class="mt-0.5 inline-flex items-center rounded-full bg-red-500/15 px-3 py-1 text-xs font-semibold text-red-200 ring-1 ring-red-500/25"
                  >
                    {{ categories.find((x) => x.key === p.category)?.label }}
                  </span>
                </div>
              </div>
            </div>

            <div class="p-6">
              <div class="text-sm text-gray-400 line-clamp-2">
                {{ p.highlights?.join(' • ') }}
              </div>

              <div class="mt-6 inline-flex items-center text-sm font-semibold text-red-300">
                Разгледай
                <span class="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </div>
            </div>
          </button>
        </div>

        <!-- Bottom CTA -->
        <div
          class="mt-20 rounded-2xl bg-black/30 ring-1 ring-white/10 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <p class="text-sm/7 text-gray-300 max-w-2xl">
            <span class="text-gray-100 font-semibold">Искате подобен резултат?</span>
            Изпратете запитване и ще препоръчаме най-добрия пакет спрямо вашия автомобил и цел.
          </p>

          <RouterLink
            to="/contact"
            @click="onPortfolioInquiryClick"
            class="inline-flex items-center justify-center rounded-xl bg-red-500 px-6 py-3 text-sm font-semibold text-white hover:bg-red-400 transition"
          >
            Запитване
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Project Viewer -->
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-50" @close="closeProject">
        <TransitionChild
          as="template"
          enter="ease-out duration-200"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-150"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/80 backdrop-blur-sm" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 sm:p-8">
            <TransitionChild
              enter="ease-out duration-200"
              enter-from="opacity-0 translate-y-2 scale-[0.98]"
              enter-to="opacity-100 translate-y-0 scale-100"
              leave="ease-in duration-150"
              leave-from="opacity-100 translate-y-0 scale-100"
              leave-to="opacity-0 translate-y-2 scale-[0.98]"
            >
              <div class="w-full max-w-5xl transform-gpu will-change-transform">
                <DialogPanel
                  class="w-full overflow-hidden rounded-2xl bg-zinc-950 ring-1 ring-white/10 shadow-2xl"
                >
                  <div class="flex items-center justify-between px-6 py-4 border-b border-white/10">
                    <div>
                      <DialogTitle class="text-base font-semibold text-white">
                        {{ activeProject?.title }}
                      </DialogTitle>
                      <p class="mt-1 text-sm text-gray-400">{{ activeProject?.service }}</p>
                    </div>

                    <button
                      type="button"
                      @click="closeProject"
                      class="inline-flex items-center justify-center rounded-xl bg-white/5 p-2 ring-1 ring-white/10 hover:bg-white/10 transition"
                    >
                      <XMarkIcon class="size-5 text-white" />
                    </button>
                  </div>

                  <div class="grid grid-cols-1 lg:grid-cols-12">
                    <!-- Main image -->
                    <div class="lg:col-span-8 relative place-self-center">
                      <div class="relative">
                        <img
                          v-if="activeProject"
                          :src="activeProject.images[activeImageIndex]"
                          :alt="activeProject.title"
                          class="w-full aspect-[16/11] object-cover"
                        />
                        <div
                          class="absolute inset-0 bg-linear-to-t from-zinc-950/60 via-transparent to-transparent"
                        />
                      </div>

                      <button
                        type="button"
                        @click="prevImage"
                        class="absolute left-4 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-xl bg-black/40 p-2 ring-1 ring-white/10 hover:bg-black/55 transition"
                      >
                        <ChevronLeftIcon class="size-5 text-white" />
                      </button>

                      <button
                        type="button"
                        @click="nextImage"
                        class="absolute right-4 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-xl bg-black/40 p-2 ring-1 ring-white/10 hover:bg-black/55 transition"
                      >
                        <ChevronRightIcon class="size-5 text-white" />
                      </button>
                    </div>

                    <!-- Details -->
                    <div class="lg:col-span-4 p-6">
                      <div class="flex flex-wrap gap-2">
                        <span
                          class="inline-flex items-center rounded-full bg-red-500/15 px-3 py-1 text-xs font-semibold text-red-200 ring-1 ring-red-500/25"
                        >
                          {{ categories.find((x) => x.key === activeProject?.category)?.label }}
                        </span>
                      </div>
                      <h3 class="mt-6 text-sm font-semibold text-white">Ключови акценти</h3>

                      <ul class="mt-4 space-y-3 text-sm text-gray-200/90">
                        <li
                          v-for="h in activeProject?.highlights || []"
                          :key="h"
                          class="flex gap-3"
                        >
                          <span class="mt-2 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0"></span>
                          <span>{{ h }}</span>
                        </li>
                      </ul>

                      <h3 class="mt-8 text-sm font-semibold text-white">Снимки</h3>
                      <div class="mt-4 grid grid-cols-3 gap-3">
                        <button
                          v-for="(img, idx) in activeProject?.images || []"
                          :key="img + idx"
                          type="button"
                          @click="activeImageIndex = idx"
                          class="relative overflow-hidden rounded-xl ring-1 transition"
                          :class="
                            idx === activeImageIndex
                              ? 'ring-red-500/40'
                              : 'ring-white/10 hover:ring-white/20'
                          "
                        >
                          <img :src="img" alt="" class="h-20 w-full object-cover" />
                          <div
                            v-if="idx === activeImageIndex"
                            class="absolute inset-0 bg-red-500/10"
                            aria-hidden="true"
                          />
                        </button>
                      </div>

                      <RouterLink
                        to="/contact"
                        @click="onModalConsultationClick"
                        class="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-red-500 px-6 py-3 text-sm font-semibold text-white hover:bg-red-400 transition"
                      >
                        Консултация
                      </RouterLink>
                    </div>
                  </div>
                </DialogPanel>
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </main>
</template>
