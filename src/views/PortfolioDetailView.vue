<script setup>
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { projectsList, categories } from '@/pageData/portfolio/portfolioProjectList'
import { projectLoaders } from '@/pageData/portfolio/portfolioImages'
import { useAnalytics } from '@/composables/useAnalytics'
import DecorDark from '@/components/global/DecorDark.vue'

const route = useRoute()
const router = useRouter()
const analytics = useAnalytics()

function getRouteId() {
  const raw = route.params.id
  return Array.isArray(raw) ? raw[0] : raw
}

const projectId = computed(() => String(getRouteId() || ''))
const projectMeta = computed(() => projectsList.find((p) => p.id === projectId.value) || null)

const images = ref([])
const loading = ref(false)
const loadError = ref(false)
const activeIndex = ref(0)

function clampIndex(i) {
  const n = images.value.length || 1
  return ((i % n) + n) % n
}

function nextImage() {
  if (!images.value.length) return
  activeIndex.value = clampIndex(activeIndex.value + 1)
}

function prevImage() {
  if (!images.value.length) return
  activeIndex.value = clampIndex(activeIndex.value - 1)
}

function closeViewer() {
  router.push({ name: 'Портфолио' })
}
// Get image assets
function unwrapModule(mod) {
  return mod?.default && typeof mod.default === 'object' ? mod.default : mod
}

// images imported in the same order they were exported as
function normalizeImages(mod) {
  const obj = unwrapModule(mod)
  if (!obj || typeof obj !== 'object') return []

  // insertion order preserved for non integer keys
  const keys = Object.keys(obj)

  // ensure coverImg first if present else keep as is
  const ordered = keys.includes('cover') ? ['cover', ...keys.filter((k) => k !== 'cover')] : keys

  return ordered.map((k) => obj[k]).filter(Boolean)
}

async function loadProjectImages(id) {
  loading.value = true
  loadError.value = false
  images.value = []
  activeIndex.value = 0

  const loader = projectLoaders[id]
  if (!loader) {
    loadError.value = true
    loading.value = false
    return
  }

  try {
    const mod = await loader()
    const list = normalizeImages(mod)
    images.value = list

    // apply query index AFTER getting images
    const qi = Number(route.query.i)
    if (Number.isFinite(qi) && images.value.length) {
      activeIndex.value = clampIndex(qi)
    }
  } catch (e) {
    loadError.value = true
    console.error('Error loading images:', e)
  } finally {
    loading.value = false
  }
}

// Load when id changes
watch(
  projectId,
  (id) => {
    if (!id) return
    activeIndex.value = 0
    loadProjectImages(id)
  },
  { immediate: true },
)

// Keeps index in sync if user navigates with different ?i=
watch(
  () => route.query.i,
  () => {
    const i = Number(route.query.i)
    if (Number.isFinite(i) && images.value.length) {
      activeIndex.value = clampIndex(i)
    }
  },
)

function onKey(e) {
  if (e.key === 'ArrowRight') nextImage()
  else if (e.key === 'ArrowLeft') prevImage()
  else if (e.key === 'Escape') closeViewer()
}

const projectIndex = computed(() => projectsList.findIndex((p) => p.id === projectId.value))

const hasPrevProject = computed(() => projectIndex.value > 0)
const hasNextProject = computed(
  () => projectIndex.value >= 0 && projectIndex.value < projectsList.length - 1,
)

const prevProjectMeta = computed(() =>
  hasPrevProject.value ? projectsList[projectIndex.value - 1] : null,
)
const nextProjectMeta = computed(() =>
  hasNextProject.value ? projectsList[projectIndex.value + 1] : null,
)

function goToProject(p, startIndex = 0) {
  if (!p?.id) return
  router.push({
    name: 'Проект',
    params: { id: p.id },
    query: { i: String(startIndex) },
  })
}

function prevProject() {
  if (!hasPrevProject.value) return
  goToProject(prevProjectMeta.value, 0)
}

function nextProject() {
  if (!hasNextProject.value) return
  goToProject(nextProjectMeta.value, 0)
}

onMounted(() => {
  if (import.meta.env.SSR) return
  window.addEventListener('keydown', onKey)

  if (projectMeta.value) {
    analytics?.openItem(projectMeta.value.title, projectMeta.value.service)
  }
})

onBeforeRouteLeave(() => {
  if (projectMeta.value) analytics?.closeItem(projectMeta.value.title, projectMeta.value.service)
})

onUnmounted(() => {
  if (import.meta.env.SSR) return
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <main class="bg-zinc-950 relative isolate min-h-[100dvh]">
    <div class="relative isolate -z-10">
      <DecorDark />
    </div>

    <!-- Top bar -->
    <header class="sticky top-0 z-10 bg-zinc-950/80 backdrop-blur border-b border-white/10">
      <div class="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <div class="min-w-0 text-start">
          <div class="text-lg font-semibold text-white truncate">
            {{ projectMeta?.title || 'Проект' }}
          </div>
          <div class="text-sm text-gray-400 truncate">
            {{ projectMeta?.service || '' }}
          </div>
        </div>
        <button
          type="button"
          @click="closeViewer"
          class="inline-flex items-center gap-2 rounded-xl bg-white/5 px-3 py-3 text-xs font-semibold text-white ring-1 ring-white/10 hover:bg-white/10 transition"
        >
          <XMarkIcon class="size-5" />
          <span class="hidden sm:inline">Затвори</span>
        </button>
      </div>
    </header>

    <!-- Not found -->
    <div v-if="!projectMeta" class="mx-auto max-w-6xl px-4 sm:px-6 py-10 text-gray-300">
      Проектът не е намерен.
      <button class="ml-3 underline" @click="closeViewer">Назад</button>
    </div>

    <!-- Content -->
    <div v-else class="mx-auto max-w-6xl px-4 sm:px-6 py-6 space-y-5">
      <!-- Loading / Error -->
      <div v-if="loading" class="rounded-2xl bg-white/5 ring-1 ring-white/10 p-5 text-gray-300">
        <div class="rounded-2xl bg-white/5 ring-1 ring-white/10 p-3 sm:p-4">
          <div
            class="aspect-[4/5] sm:aspect-[16/9] max-h-[78dvh] w-full animate-pulse rounded-xl bg-white/5"
          ></div>
        </div>
      </div>

      <div
        v-else-if="loadError"
        class="rounded-2xl bg-white/5 ring-1 ring-white/10 p-5 text-gray-300"
      >
        Не успяхме да заредим снимките за този проект.
        <button class="ml-3 underline" @click="closeViewer">Назад</button>
      </div>

      <div
        v-else-if="!images.length"
        class="rounded-2xl bg-white/5 ring-1 ring-white/10 p-5 text-gray-300"
      >
        Няма снимки за този проект.
        <button class="ml-3 underline" @click="closeViewer">Назад</button>
      </div>

      <template v-else>
        <!-- Main Image -->
        <section class="relative overflow-hidden rounded-2xl bg-black/25 ring-1 ring-white/10">
          <div
            class="absolute right-3 top-3 rounded-full bg-black/45 px-3 py-1 text-xs text-white ring-1 ring-white/15"
          >
            {{ activeIndex + 1 }} / {{ images.length }}
          </div>
          <div class="relative w-full aspect-[4/5] sm:aspect-[16/9] max-h-[78dvh]">
            <img
              :src="images[activeIndex]"
              :alt="projectMeta.title"
              class="absolute inset-0 w-full h-full sm:object-cover object-contain"
              draggable="false"
            />

            <div
              class="absolute inset-0 bg-linear-to-t from-zinc-950/60 via-transparent to-transparent"
            />
            <div
              class="absolute right-3 top-3 rounded-full bg-black/45 px-3 py-1 text-xs text-white ring-1 ring-white/15"
            >
              {{ activeIndex + 1 }} / {{ images.length }}
            </div>
          </div>

          <button
            type="button"
            @click="prevImage"
            :disabled="activeIndex < 1"
            class="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-xl bg-black/45 p-2 ring-1 ring-white/15 hover:bg-black/60 transition"
            :class="[activeIndex < 1 ? 'opacity-40 cursor-not-allowed' : '']"
          >
            <ChevronLeftIcon class="size-5 text-white" />
          </button>

          <button
            type="button"
            @click="nextImage"
            :disabled="activeIndex >= images.length - 1"
            class="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-xl bg-black/45 p-2 ring-1 ring-white/15 hover:bg-black/60 transition"
            :class="[activeIndex >= images.length - 1 ? 'opacity-40 cursor-not-allowed' : '']"
          >
            <ChevronRightIcon class="size-5 text-white" />
          </button>
        </section>

        <!-- Thumbnails -->
        <section class="min-w-0 scroll-fade">
          <div
            class="flex gap-3 overflow-x-auto py-2 px-1 [-webkit-overflow-scrolling:touch] thumb-scroll"
          >
            <button
              v-for="(img, idx) in images"
              :key="img + idx"
              type="button"
              @click="activeIndex = idx"
              class="shrink-0 overflow-hidden rounded-xl ring-0 transition w-24 h-16 sm:w-28 sm:h-18"
              :class="
                idx === activeIndex
                  ? 'ring-2 ring-red-500/40'
                  : 'ring-2 ring-white/10 hover:ring-white/20'
              "
            >
              <img :src="img" alt="" class="w-full h-full object-cover" draggable="false" />
            </button>
          </div>
        </section>
        <!-- Project Navigation -->
        <section class="flex items-center justify-between gap-3">
          <button
            type="button"
            @click="prevProject()"
            :disabled="!hasPrevProject"
            class="inline-flex items-center gap-2 rounded-lg bg-white/5 p-3 text-xs font-semibold text-white ring-1 ring-white/10 hover:bg-white/10 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeftIcon class="size-3" />
            <span class="truncate">{{ prevProjectMeta?.title || 'Предишен' }}</span>
          </button>

          <button
            type="button"
            @click="nextProject()"
            :disabled="!hasNextProject"
            class="inline-flex items-center gap-2 rounded-lg bg-white/5 p-3 text-xs font-semibold text-white ring-1 ring-white/10 hover:bg-white/10 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span class="truncate">{{ nextProjectMeta?.title || 'Следващ' }}</span>
            <ChevronRightIcon class="size-3" />
          </button>
        </section>
        <!-- Project Accents -->
        <section class="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4 sm:p-5">
          <div class="flex flex-wrap gap-2">
            <span
              class="inline-flex items-center rounded-full bg-red-500/15 px-3 py-1 text-xs font-semibold text-red-200 ring-1 ring-red-500/25"
            >
              {{ categories.find((x) => x.key === projectMeta.category)?.label }}
            </span>
          </div>

          <h3 class="mt-4 text-sm font-semibold text-white">Ключови акценти</h3>
          <ul class="mt-3 space-y-2 text-sm text-gray-200/90">
            <li v-for="h in projectMeta.highlights || []" :key="h" class="flex gap-3 min-w-0">
              <span class="mt-2 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0"></span>
              <span class="min-w-0 break-words">{{ h }}</span>
            </li>
          </ul>
        </section>
      </template>
    </div>
  </main>
</template>
