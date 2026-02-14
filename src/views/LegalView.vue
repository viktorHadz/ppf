<!-- src/views/LegalView.vue -->
<script setup>
import { computed } from 'vue'
import { legalBG } from '@/pageData/legal/legal'
import DecorDiagSheen from '@/components/global/DecorDiagSheen.vue'

const props = defineProps({
  slug: { type: String, required: true }, // 'terms' | 'privacy' | 'cookies'
})

const page = computed(() => legalBG[props.slug] ?? null)
</script>

<template>
  <section class="relative isolate overflow-hidden bg-zinc-950 py-24 sm:py-32">
    <!-- Your existing decorative vibe -->
    <DecorDiagSheen />

    <!-- subtle grid pattern like your foiling section -->
    <svg
      class="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-zinc-800/30 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
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
      <rect
        width="100%"
        height="100%"
        stroke-width="0"
        fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
      />
    </svg>

    <div class="mx-auto max-w-5xl px-6 lg:px-8 relative z-10">
      <div v-if="page" class="mx-auto max-w-3xl">
        <!-- header block (matches your eyebrow/title rhythm) -->
        <p class="text-base/7 font-semibold text-red-500 mb-8">
          {{ page.eyebrow || 'Правна информация' }}
        </p>

        <h1 class="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {{ page.title }}
        </h1>

        <p v-if="page.updatedAt" class="mt-6 text-sm text-white/50">
          Последна актуализация: {{ page.updatedAt }}
        </p>

        <!-- content cards -->
        <div class="mt-12 space-y-6">
          <section
            v-for="(s, i) in page.sections"
            :key="i"
            class="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 sm:p-8"
          >
            <h2 class="text-lg font-semibold text-white">
              {{ s.heading }}
            </h2>

            <div class="mt-5 space-y-3 text-base/7 text-gray-400">
              <p v-for="(line, j) in s.body" :key="j" class="whitespace-pre-line">
                {{ line }}
              </p>
            </div>
          </section>
        </div>

        <!-- bottom nav -->
        <div class="mt-14 flex flex-wrap gap-3">
          <RouterLink
            to="/terms"
            class="inline-flex items-center justify-center rounded-xl bg-white/5 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-white/10 transition"
          >
            Общи условия
          </RouterLink>

          <RouterLink
            to="/privacy"
            class="inline-flex items-center justify-center rounded-xl bg-white/5 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-white/10 transition"
          >
            Поверителност
          </RouterLink>

          <RouterLink
            to="/cookies"
            class="inline-flex items-center justify-center rounded-xl bg-white/5 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-white/10 transition"
          >
            Бисквитки
          </RouterLink>
        </div>
      </div>

      <div v-else class="mx-auto max-w-3xl rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 sm:p-8">
        <h1 class="text-2xl font-semibold text-white">Страницата не е намерена</h1>
        <p class="mt-2 text-gray-400">Невалиден документ.</p>
      </div>
    </div>
  </section>
</template>
