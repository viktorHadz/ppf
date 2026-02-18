<script setup>
import { SparklesIcon, ShieldCheckIcon, BeakerIcon } from '@heroicons/vue/20/solid'
import detailingRollsRoyce from '@/assets/detailingRollsRoyce.webp'
import { useAnalytics } from '@/composables/useAnalytics'
import DecorDark from './global/DecorDark.vue'
const analytics = useAnalytics()

const ctaPlacementDetailing = 'home_detailing_section'
const ctaDetailingInquiryId = 'home_detailing_click_inquiry'
const ctaDetailingViewServiceId = 'home_detailing_click_view_service'

function onDetailingInquiryClick() {
  analytics?.cta(ctaDetailingInquiryId, ctaPlacementDetailing, 'Запитване')
  analytics?.service('detailing', 'Детайлинг', ctaPlacementDetailing)
}

function onDetailingViewServiceClick() {
  analytics?.cta(ctaDetailingViewServiceId, ctaPlacementDetailing, 'Виж услугата')
  analytics?.service('detailing', 'Детайлинг', ctaPlacementDetailing)
}

const benefits = [
  {
    name: 'Перфектна визия',
    description: 'Блясък на боята, чисти детайли и свеж салон.',
    icon: SparklesIcon,
  },
  {
    name: 'Защита',
    description: 'Wax / sealant / керамично покритие срещу UV и ежедневни рискове.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Хигиена',
    description: 'Петна, прах и миризми - премахнати професионално.',
    icon: BeakerIcon,
  },
]

const types = [
  { title: 'Екстериорен', desc: 'Измиване • гланц • защита' },
  { title: 'Интериорен', desc: 'Тапицерия • кожа • пластмаси' },
  { title: 'Керамика', desc: 'Дълготрайна защита • хидрофобен ефект' },
]
</script>

<template>
  <section class="bg-zinc-950 py-24 sm:py-32 overflow-hidden relative isolate">
    <!-- Decorative Element Dark -->
    <DecorDark></DecorDark>
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-16 items-start">
        <!-- LEFT -->
        <div class="lg:col-span-6">
          <p class="text-base/7 font-semibold text-red-500 mb-8">Премиум Детайлинг</p>

          <h2 class="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Автомобилът ви като нов вътре и отвън
          </h2>

          <p class="mt-10 text-lg/8 text-gray-400">
            Професионална грижа, която възстановява визията. Не “бърз ефект”, а чист резултат.
          </p>

          <!-- CTAs -->
          <div class="mt-12 flex flex-col gap-4 sm:flex-row">
            <RouterLink
              :to="{
                path: '/contact',
                query: {
                  selectedService: 'detailing',
                },
              }"
              @click="onDetailingInquiryClick"
              class="inline-flex items-center justify-center rounded-xl bg-red-500 px-7 py-3.5 text-sm font-semibold text-white hover:bg-red-400 transition"
            >
              Запитване
            </RouterLink>
            <RouterLink
              to="/detailing#detailing-brow"
              @click="onDetailingViewServiceClick"
              class="inline-flex items-center justify-center rounded-xl bg-white/5 px-7 py-3.5 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-white/10 transition"
            >
              Виж услугата
            </RouterLink>
          </div>

          <!-- Benefits -->
          <dl class="mt-16 space-y-8 text-base/7 text-gray-400">
            <div v-for="b in benefits" :key="b.name" class="relative pl-9">
              <dt class="font-semibold text-white">
                <component :is="b.icon" class="absolute left-1 top-1 size-5 text-red-500" />
                {{ b.name }}
              </dt>
              <dd class="mt-1">{{ b.description }}</dd>
            </div>
          </dl>

          <!-- Types -->
          <div class="mt-14">
            <h3 class="text-sm font-semibold text-white/90 uppercase tracking-wide">Видове</h3>
            <div class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div
                v-for="t in types"
                :key="t.title"
                class="rounded-2xl bg-white/5 ring-1 ring-white/10 p-5"
              >
                <div class="text-sm font-semibold text-white">{{ t.title }}</div>
                <div class="mt-2 text-xs text-gray-400">{{ t.desc }}</div>
              </div>
            </div>
          </div>

          <p class="mt-8 text-xs text-gray-500">
            * Подходящо и преди продажба за по-добър вид и покачване на стойността.
          </p>
        </div>

        <!-- RIGHT -->
        <div class="lg:col-span-6">
          <img
            :src="detailingRollsRoyce"
            alt="Авто детайлинг"
            class="w-full rounded-2xl shadow-2xl ring-1 ring-white/10 object-cover"
          />
        </div>
      </div>
    </div>
  </section>
</template>
