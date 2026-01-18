<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid'
import whiteCarTintElement from '@/assets/whiteCarWhiteBg.webp'
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

let onResize
onMounted(async () => {
  await nextTick()
  updateArrows()

  onResize = () => updateArrows()
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})

const carouselEl = ref(null)
const canLeft = ref(false)
const canRight = ref(false)

function updateArrows() {
  const el = carouselEl.value
  if (!el) return

  const maxScrollLeft = el.scrollWidth - el.clientWidth
  const x = el.scrollLeft

  // Small tolerance because of subpixels
  const eps = 2
  canLeft.value = x > eps
  canRight.value = x < maxScrollLeft - eps
}
function scrollByCard(dir = 1) {
  const el = carouselEl.value
  if (!el) return

  // One "card" == the viewport width (because each slide is w-full)
  const amount = el.clientWidth
  el.scrollBy({ left: dir * amount, behavior: 'smooth' })

  // update after scroll settles a bit
  window.setTimeout(updateArrows, 250)
}
const stats = [
  { id: 1, name: 'Най-тъмно затъмняване', value: '5%', img: 'src' },
  { id: 2, name: 'Балансирано затъмняване', value: '35%', img: 'src' },
  { id: 3, name: 'Леко затъмняване', value: '50%', img: 'src' },
  { id: 4, name: 'UV защита', value: '70%', img: 'src' },
]
</script>

<template>
  <div class="bg-zinc-900 py-24 sm:py-48 relative overflow-hidden">
    <!-- Background Layer -->
    <div class="grid-el-2"></div>

    <!-- Foreground Layer -->
    <div class="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
      <div class="mx-auto max-w-2xl lg:max-w-none">
        <div class="text-center py-12">
          <h2 class="text-4xl font-semibold tracking-tight text-balance text-gray-200 sm:text-5xl">
            Премиум затъмняване на стъкла
          </h2>
          <p class="mt-6 text-lg/8 text-gray-400">
            Изберете ниво на прозрачност според стила и комфорта си:
          </p>
        </div>
        <dl class="relative mt-20 overflow-hidden rounded-lg ring-1 ring-white/10">
          <!-- bg-image -->
          <div
            class="absolute inset-0 bg-center bg-cover"
            :style="{ backgroundImage: `url(${whiteCarTintElement})` }"
          />
          <div class="absolute inset-0 bg-black/30" />

          <!-- Title -->
          <h2
            class="pointer-events-none absolute inset-x-0 top-6 sm:top-20 z-20 text-gray-200 uppercase text-center font-bold text-2xl sm:text-5xl tracking-wide"
          >
            Нивo на затъмняване
          </h2>

          <!-- MOBILE-ONLY: Chevrons -->
          <button
            v-show="canLeft"
            type="button"
            @click="scrollByCard(-1)"
            class="sm:hidden absolute left-3 top-1/2 -translate-y-1/2 z-30 size-10 rounded-full bg-black/60 ring-1 ring-white/15 flex items-center justify-center text-white/90 hover:bg-black/70 active:scale-95 transition"
            aria-label="Предишно"
          >
            <ChevronLeftIcon class="size-6" />
          </button>

          <button
            v-show="canRight"
            type="button"
            @click="scrollByCard(1)"
            class="sm:hidden absolute right-3 top-1/2 -translate-y-1/2 z-30 size-10 rounded-full bg-black/60 ring-1 ring-white/15 flex items-center justify-center text-white/90 hover:bg-black/70 active:scale-95 transition"
            aria-label="Следващо"
          >
            <ChevronRightIcon class="size-6" />
          </button>

          <!-- CONTENT -->
          <div class="relative z-10">
            <!-- MOBILE: swipe carousel -->
            <div
              ref="carouselEl"
              @scroll="updateArrows"
              class="sm:hidden flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none"
            >
              <div
                v-for="(stat, i) in stats"
                :key="stat.id"
                class="snap-start shrink-0 w-full h-[520px] flex flex-col justify-end text-center px-6 pb-10 pt-24"
                :class="[
                  i === 0 && 'bg-black/90',
                  i === 1 && 'bg-black/80',
                  i === 2 && 'bg-black/60',
                  i === 3 && 'bg-black/50',
                ]"
              >
                <dd class="order-first text-7xl font-semibold tracking-tight text-white/75">
                  {{ stat.value }}
                </dd>
                <dt class="mt-2 text-sm font-semibold text-red-500">
                  {{ stat.name }}
                </dt>
              </div>
            </div>

            <!-- DESKTOP: grid -->
            <div class="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4">
              <div
                v-for="(stat, i) in stats"
                :key="stat.id"
                class="group relative flex flex-col justify-end p-8 min-h-[520px] text-center"
                :class="[
                  i === 0 && 'bg-black/95',
                  i === 1 && 'bg-black/65',
                  i === 2 && 'bg-black/50',
                  i === 3 && 'bg-black/30',
                ]"
              >
                <dd
                  class="order-first text-8xl font-bold tracking-tight text-white/70 group-hover:-translate-y-30 transition-all duration-200 delay-100 group-hover:text-red-500 select-none"
                >
                  {{ stat.value }}
                </dd>
                <dt class="mt-2 font-semibold text-red-500">
                  {{ stat.name }}
                </dt>

                <div
                  v-if="i !== stats.length - 1"
                  class="hidden lg:block absolute top-0 right-0 h-full w-px bg-white/10"
                />
              </div>
            </div>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>
