<script setup>
import { computed, ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAnalytics } from '@/composables/useAnalytics'
import DecorDiagSheen from '@/components/global/DecorDiagSheen.vue'
import { projectsList, categories } from '@/pageData/portfolio/portfolioProjectList'

const router = useRouter()
const analytics = useAnalytics()

const featuredIds = ['rr', 'eqs', 'taycan']
const activeCategory = ref('all')
const query = ref('')

const featured = computed(() => projectsList.filter((p) => featuredIds.includes(p.id)))

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return projectsList.filter((p) => {
    const matchCat = activeCategory.value === 'all' || p.category === activeCategory.value
    const matchQ =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.service.toLowerCase().includes(q) ||
      (p.highlights || []).some((h) => h.toLowerCase().includes(q))
    return matchCat && matchQ
  })
})

function openProject(p, startIndex = 0) {
  router.push({
    name: 'Проект',
    params: { id: p.id },
    query: { i: String(startIndex) },
  })
}

function onPortfolioInquiryClick() {
  analytics?.cta('portfolio_bottom_inquiry', 'portfolio_page', 'Запитване')
}
</script>

<template>
  <main class="bg-zinc-950 relative isolate overflow-hidden">
    <!-- Decorative Element Dark -->
    <svg
      class="absolute inset-x-0 top-0 -z-10 h-256 w-full stroke-zinc-800/30 sm:stroke-zinc-800/20 mask-[radial-gradient(32rem_32rem_at_center,white,transparent)]"
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

          <div class="max-w-sm w-full">
            <input
              id="projects-search"
              v-model="query"
              type="search"
              placeholder="Търсене…"
              class="w-full rounded-2xl bg-white/5 px-4 py-3 text-sm text-white ring-1 ring-white/10 placeholder:text-gray-500 focus:outline-none focus:ring-red-500/40"
            />
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

        <!-- Project Cards -->
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
  </main>
</template>
