<script setup>
import TheWelcome from '@/components/global/TheWelcome.vue'
import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
  ArrowPathIcon,
} from '@heroicons/vue/20/solid'
import car from '@/assets/car-home.webp'
import whiteCarTintElement from '@/assets/whiteCarWhiteBg.webp'
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid'

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

const stats = [
  { id: 1, name: 'Най-тъмно затъмняване', value: '5%', img: 'src' },
  { id: 2, name: 'Балансирано затъмняване', value: '35%', img: 'src' },
  { id: 3, name: 'Леко затъмняване', value: '50%', img: 'src' },
  { id: 4, name: 'UV защита', value: '70%', img: 'src' },
]

const features = [
  {
    name: 'Push to deploy.',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'SSL certificates.',
    description:
      'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
    icon: LockClosedIcon,
  },
  {
    name: 'Database backups.',
    description:
      'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: ServerIcon,
  },
]

const features2 = [
  {
    name: 'Премиум Автофолиране',
    description:
      'Използваме висококачествени фолия и технологии за постигане на перфектно покритие и дълготрайна защита. Всеки детайл се обработва с внимание и прецизност.',
    href: '#',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Затъмняване на Автостъкла',
    description:
      'Професионално поставяне на фолио за стъкла с оптимален баланс между стил, безопасност и защита от UV лъчи. Сертифицирани материали и безкомпромисно качество.',
    href: '#',
    icon: LockClosedIcon,
  },
  {
    name: 'Застраховане и Консултация',
    description:
      'Осигуряваме съдействие при избор на подходяща застраховка и пълна консултация за защита на вашия автомобил. Работим с утвърдени партньори и прозрачни условия.',
    href: '#',
    icon: ArrowPathIcon,
  },
]
</script>
<template>
  <TheWelcome
    :show-buttons="true"
    :showGridPattern="false"
    :showVideo="true"
    video-mp4="/hero/video/hero-bg-1600k.mp4"
    poster="/hero/img/home-hero-poster.webp"
  >
    <template #title
      >Елитна визия <br />
      премиум защита</template
    >
    <template #under-title>сложи клипа като фон със бутон - за максимизиране и звук</template>
    <template #primary-button>запитване</template>
    <template #secondary-button>портфолио</template>
  </TheWelcome>

  <div class="bg-zinc-900 py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:text-center">
        <h2 class="text-base/7 font-semibold text-red-500">Професионални Авто Услуги</h2>
        <p
          class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl lg:text-balance"
        >
          Всичко необходимо за безупречен външен вид на вашия автомобил
        </p>
        <p class="mt-6 text-lg/8 text-gray-400">
          Предлагаме цялостни решения за защита, стил, комфорт и сигурност – от премиум фолиране до
          професионално затъмняване и застрахователни консултации. Всяка услуга се изпълнява с
          внимание към детайла и гарантирано качество.
        </p>
      </div>
      <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
          <div v-for="feature in features2" :key="feature.name" class="flex flex-col">
            <dt class="flex items-center gap-x-3 text-base/7 font-semibold text-gray-200">
              <component
                :is="feature.icon"
                class="size-5 flex-none text-red-500"
                aria-hidden="true"
              />
              {{ feature.name }}
            </dt>
            <dd class="mt-4 flex flex-auto flex-col text-base/7 text-gray-400">
              <p class="flex-auto">{{ feature.description }}</p>
              <p class="mt-6">
                <a
                  :href="feature.href"
                  class="group text-sm/6 font-semibold text-red-500 inline-flex items-center"
                >
                  Научи повече
                  <span
                    aria-hidden="true"
                    class="ml-1 transform transition-transform duration-300 translate-x-0 group-hover:translate-x-4"
                  >
                    →
                  </span>
                </a>
              </p>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>

  <div class="bg-zinc-900 py-24 sm:py-32 relative overflow-hidden">
    <!-- Background Layer -->
    <div class="grid-el-2"></div>

    <!-- Foreground Layer -->
    <div class="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
      <div class="mx-auto max-w-2xl lg:max-w-none">
        <div class="text-center">
          <h2 class="text-4xl font-semibold tracking-tight text-balance text-gray-200 sm:text-5xl">
            Премиум затъмняване на стъкла
          </h2>
          <p class="mt-4 text-lg/8 text-gray-400">
            Изберете ниво на прозрачност според стила и комфорта си:
          </p>
        </div>
        <dl class="relative mt-16 overflow-hidden rounded-lg ring-1 ring-white/10">
          <!-- bg-image -->
          <div
            class="absolute inset-0 bg-center bg-cover"
            :style="{ backgroundImage: `url(${whiteCarTintElement})` }"
          />
          <div class="absolute inset-0 bg-black/30" />

          <!-- Title -->
          <h2
            class="pointer-events-none absolute inset-x-0 top-6 sm:top-20 z-20 text-red-500 uppercase text-center font-bold text-2xl sm:text-4xl tracking-wide"
          >
            Нива на затъмняване
          </h2>

          <!-- MOBILE CHEVRONS (only on mobile) -->
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
                <dt class="mt-2 text-sm font-semibold text-white/70">
                  {{ stat.name }}
                </dt>
              </div>
            </div>

            <!-- DESKTOP: your nice grid -->
            <div class="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4">
              <div
                v-for="(stat, i) in stats"
                :key="stat.id"
                class="relative flex flex-col justify-end p-8 min-h-[520px] text-center"
                :class="[
                  i === 0 && 'bg-black/90',
                  i === 1 && 'bg-black/80',
                  i === 2 && 'bg-black/60',
                  i === 3 && 'bg-black/50',
                ]"
              >
                <dd class="order-first text-7xl font-semibold tracking-tight text-white/70">
                  {{ stat.value }}
                </dd>
                <dt class="mt-2 text-sm font-semibold text-white/70">
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
  <div class="overflow-hidden bg-zinc-900 py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div
        class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2"
      >
        <div class="lg:pt-4 lg:pr-8">
          <div class="lg:max-w-lg">
            <h2 class="text-base/7 font-semibold text-red-500">Фолиране</h2>
            <p
              class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl"
            >
              Подобрете и защитете боята на вашия автомобил
            </p>
            <p class="mt-6 text-lg/8 text-gray-300">
              Независимо дали колата ви е чисто нова или класика, нашите услуги за фолиране
              предлагат решение, съобразено с вашите нужди.
            </p>
            <dl class="mt-10 max-w-xl space-y-8 text-base/7 text-gray-400 lg:max-w-none">
              <div v-for="feature in features" :key="feature.name" class="relative pl-9">
                <dt class="inline font-semibold text-white">
                  <component
                    :is="feature.icon"
                    class="absolute top-1 left-1 size-5 text-red-500"
                    aria-hidden="true"
                  />
                  {{ feature.name }}
                </dt>
                {{ ' ' }}
                <dd class="inline">{{ feature.description }}</dd>
              </div>
            </dl>
          </div>
        </div>
        <div class="relative">
          <img
            :src="car"
            alt="Детайлинг"
            class="w-3xl max-w-none rounded shadow-xl ring-1 ring-white/10 sm:w-228 md:-ml-4 lg:-ml-0"
            width="2432"
            height="1442"
          />
        </div>
      </div>
    </div>
  </div>
</template>
