<script setup>
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ShieldCheckIcon,
  SunIcon,
  SparklesIcon,
  BeakerIcon,
  CheckCircleIcon,
} from '@heroicons/vue/24/solid'

import whiteCarTintElement from '@/assets/whiteCarWhiteBg.webp'

import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import DecorDiagSheen from './global/DecorDiagSheen.vue'
import { useAnalytics } from '@/composables/useAnalytics'
const analytics = useAnalytics()

const ctaPlacementTinting = 'home_tinting_section'
const ctaLearnMoreTintingId = 'home_tinting_click_learn_more'
const ctaInquiryTintingId = 'home_tinting_click_inquiry'

function onTintingLearnMoreClick() {
  analytics?.cta(ctaLearnMoreTintingId, ctaPlacementTinting, 'Научи повече')
  analytics?.service('tinting', 'Затъмняване на стъклата', ctaPlacementTinting)
}

function onTintingInquiryClick(shade) {
  analytics?.cta(
    `${ctaInquiryTintingId}_shade_${shade}`,
    ctaPlacementTinting,
    `Запитване • ${shade}%`,
  )
  analytics?.service('tinting', 'Затъмняване на стъклата', ctaPlacementTinting)
}

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
  const eps = 2
  canLeft.value = x > eps
  canRight.value = x < maxScrollLeft - eps
}

function scrollByCard(dir = 1) {
  const el = carouselEl.value
  if (!el) return
  const amount = el.clientWidth
  el.scrollBy({ left: dir * amount, behavior: 'smooth' })
  window.setTimeout(updateArrows, 250)
}

const benefits = [
  {
    name: 'Комфорт и охлаждане',
    description: 'По-ниска температура в салона и по-леко натоварване на климатика.',
    icon: BeakerIcon,
  },
  {
    name: 'UV защита до 99%',
    description: 'Пази кожа/очи и предпазва интериора от избледняване и напукване.',
    icon: SunIcon,
  },
  {
    name: 'Безопасност',
    description: 'По-малко заслепяване + фолиото държи стъклото по-стабилно при удар.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Стил и дискретност',
    description: 'Уединение за пътниците и премиум завършек без компромис с видимостта.',
    icon: SparklesIcon,
  },
]

const stats = [
  { id: 1, shade: 5, lightAllowed: 5 },
  { id: 2, shade: 30, lightAllowed: 30 },
  { id: 3, shade: 50, lightAllowed: 50 },
  { id: 4, shade: 70, lightAllowed: 70 },
]

const filmTypes = [
  {
    title: 'Гланцово (Стандартно)',
    desc: 'Класическа визия и базова топлинна защита.',
  },
  {
    title: 'Керамично',
    desc: 'Висока топлинна и UV защита, без да затруднява видимостта',
  },
  {
    title: 'Карбон',
    desc: 'Модерен ефект с повишена устойчивост и дълготрайност',
  },
]

const whyUs = [
  'Прецизен монтаж без балончета, прах и дефекти',
  'Премиум фолиа за дълготрайно и гарантирано качество',
  'Чиста подготовка и контрол на качеството',
  'Препоръчваме фолио според модела, видимостта и целта ви',
]
</script>

<template>
  <section class="bg-zinc-900 py-24 sm:py-40 relative overflow-hidden">
    <!-- Decorative Element Dividers and Sheen -->
    <DecorDiagSheen />
    <!-- Decorative Element Light -->
    <div class="grid-el-2"></div>

    <div class="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
      <!-- Header -->
      <div class="mx-auto max-w-2xl text-center">
        <p class="text-base/7 font-semibold text-red-500 mb-8">Затъмняване на стъклата</p>
        <h2 class="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Стил, комфорт и защита за вашия автомобил
        </h2>
        <p class="mt-8 text-lg/8 text-gray-400">
          Премиум фолиа, които намаляват топлината, филтрират UV лъчите и дават дискретност – без да
          пречат на видимостта.
        </p>
      </div>

      <!-- What can tinting do for you -->
      <div class="mx-auto mt-20 max-w-5xl">
        <h3 class="text-lg font-semibold text-gray-200">Какво предлага затъмняването</h3>
        <dl class="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 text-base/7 text-gray-400">
          <div v-for="b in benefits" :key="b.name" class="relative pl-9">
            <dt class="font-semibold text-gray-200">
              <component
                :is="b.icon"
                class="absolute left-1 top-1 size-5 text-red-500"
                aria-hidden="true"
              />
              {{ b.name }}
            </dt>
            <dd class="mt-2">{{ b.description }}</dd>
          </div>
        </dl>
      </div>

      <!--  Guarantee & Tint Foil Type -->
      <div class="mx-auto mt-24 max-w-5xl">
        <div class="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12 items-stretch">
          <!-- Guarantee -->
          <div class="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 sm:p-8 lg:flex lg:flex-col">
            <div>
              <h3 class="text-lg font-semibold text-white">Нашата гаранция</h3>
              <ul class="mt-6 space-y-4 text-base/7 text-gray-400">
                <li v-for="item in whyUs" :key="item" class="flex gap-4">
                  <CheckCircleIcon class="mt-0.5 size-5 text-red-500 shrink-0" aria-hidden="true" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>

            <div class="mt-8 lg:mt-auto flex flex-col gap-3 sm:flex-row">
              <RouterLink
                to="/tinting#tinting-brow"
                @click="onTintingLearnMoreClick"
                class="inline-flex items-center justify-center rounded-xl bg-red-500 px-6 py-3 text-sm font-semibold text-white hover:bg-red-400 transition"
              >
                Научи повече
              </RouterLink>
            </div>
          </div>

          <!-- Tint Foil Type -->
          <div class="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 sm:p-8 lg:flex lg:flex-col">
            <div>
              <div class="flex items-end justify-between gap-8">
                <div>
                  <h3 class="text-lg font-semibold text-white">Тип фолиа</h3>
                  <p class="mt-2 text-sm/6 text-gray-400">
                    Избор на фолио според вашите цели (топлина / UV / визия).
                  </p>
                </div>
              </div>

              <div class="mt-8 space-y-4 lg:max-h-[320px] lg:overflow-auto lg:pr-1">
                <div
                  v-for="t in filmTypes"
                  :key="t.title"
                  class="rounded-xl bg-black/30 ring-1 ring-white/10 py-2 px-4"
                >
                  <div class="text-base font-semibold text-gray-200">{{ t.title }}</div>
                  <p class="mt-2 text-sm/6 text-gray-400">{{ t.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Interactive chart -->
      <div class="mx-auto mt-20 max-w-5xl">
        <div class="relative overflow-hidden rounded-2xl ring-1 ring-white/10">
          <!-- bg-image -->
          <div
            class="absolute inset-0 bg-center bg-cover"
            :style="{ backgroundImage: `url(${whiteCarTintElement})` }"
          />
          <div class="absolute inset-0 bg-black/35" />

          <!-- Title overlay -->
          <div class="pointer-events-none absolute inset-x-0 top-6 sm:top-10 z-20 text-center">
            <div
              class="inline-flex items-center gap-3 rounded-full bg-black/40 ring-1 ring-white/10 px-5 py-2"
            >
              <span class="h-2 w-2 rounded-full bg-red-500"></span>
              <span class="text-xs sm:text-sm font-semibold tracking-wide text-gray-200 uppercase">
                Нива на Затъмняване
              </span>
            </div>
          </div>

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

          <!-- INTERACTIVE CHART -->
          <div class="relative z-10">
            <!-- MOBILE: swipe carousel  -->
            <div
              ref="carouselEl"
              @scroll="updateArrows"
              class="sm:hidden flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none"
            >
              <div
                v-for="(stat, i) in stats"
                :key="stat.id"
                class="snap-start shrink-0 w-full min-h-[540px] px-6 pb-10 pt-28 flex flex-col justify-end text-center"
                :class="[
                  i === 0 && 'bg-black/90',
                  i === 1 && 'bg-black/80',
                  i === 2 && 'bg-black/65',
                  i === 3 && 'bg-black/45',
                ]"
              >
                <!-- Big number -->
                <div
                  class="text-[96px] leading-none font-bold tracking-tight text-white/75 select-none"
                >
                  {{ stat.shade }}
                </div>

                <!-- Small stats -->
                <div class="mt-8 space-y-3 text-sm text-gray-200/85">
                  <div>
                    <div class="font-semibold">{{ stat.lightAllowed }}%</div>
                    <div class="text-xs uppercase tracking-wide text-gray-200/70">
                      Light Allowed
                    </div>
                  </div>
                  <div>
                    <div class="font-semibold">{{ stat.uvRejected }}%</div>
                    <div class="text-xs uppercase tracking-wide text-gray-200/70">
                      UV Light Rejected
                    </div>
                  </div>
                </div>

                <!-- CTA -->
                <RouterLink
                  :to="{
                    path: '/contact',
                    query: {
                      selectedService: 'darkening',
                      tint: stat.shade,
                    },
                  }"
                  @click="onTintingInquiryClick(stat.shade)"
                  class="group text-base font-semibold text-red-500 inline-flex items-center self-center mt-2"
                >
                  запитване
                  <span
                    aria-hidden="true"
                    class="ml-1 transform transition-transform duration-300 translate-x-0 group-hover:translate-x-4"
                  >
                    →
                  </span>
                </RouterLink>
              </div>
            </div>

            <!-- DESKTOP: Chart -->
            <div class="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4">
              <div
                v-for="(stat, i) in stats"
                :key="stat.id"
                class="relative min-h-[520px] p-10 flex flex-col justify-end text-center"
                :class="[
                  i === 0 && 'bg-black/95',
                  i === 1 && 'bg-black/80',
                  i === 2 && 'bg-black/65',
                  i === 3 && 'bg-black/45',
                ]"
              >
                <div
                  class="text-[110px] leading-none font-bold tracking-tight text-gray-200/70 select-none"
                >
                  {{ stat.shade }}
                </div>

                <div class="mt-8 space-y-3 text-xl">
                  <div>
                    <div class="font-bold text-gray-200">{{ stat.lightAllowed }}%</div>
                    <div class="text-sm tracking-wide text-gray-200/70">Светлопропускливост</div>
                  </div>
                </div>

                <RouterLink
                  :to="{
                    path: '/contact',
                    query: {
                      selectedService: 'darkening',
                      tint: stat.shade,
                    },
                  }"
                  @click="onTintingInquiryClick(stat.shade)"
                  class="group text-base font-semibold text-red-500 inline-flex items-center self-center mt-2"
                >
                  запитване
                  <span
                    aria-hidden="true"
                    class="ml-1 transform transition-transform duration-300 translate-x-0 group-hover:translate-x-4"
                  >
                    →
                  </span>
                </RouterLink>

                <div
                  v-if="i !== stats.length - 1"
                  class="hidden lg:block absolute top-0 right-0 h-full w-px bg-white/10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
