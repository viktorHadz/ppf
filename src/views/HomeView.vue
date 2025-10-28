<script setup>
import TheWelcome from '@/components/global/TheWelcome.vue'
import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
  ArrowPathIcon,
} from '@heroicons/vue/20/solid'
import car from '@/assets/car-home.webp'
const stats = [
  { id: 1, name: 'Най-тъмно затъмняване', value: '5%' },
  { id: 2, name: 'Балансирано затъмняване', value: '35%' },
  { id: 3, name: 'Леко затъмняване', value: '50%' },
  { id: 4, name: 'UV защита', value: '70%' },
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
  <TheWelcome :show-buttons="true">
    <template #title>ппф експерти</template>
    <template #under-title>Орлин и Иван да черпят Виктор сладолед</template>
    <template #primary-button>Запази Час</template>
    <template #secondary-button>Научи Повече</template>
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
          Предлагаме цялостни решения за защита, стил и комфорт – от премиум фолиране до
          професионално затъмняване и застрахователна консултация. Всяка услуга се изпълнява с
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
        <dl
          class="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded text-center sm:grid-cols-2 lg:grid-cols-4"
        >
          <div v-for="stat in stats" :key="stat.id" class="flex flex-col bg-zinc-800 p-8">
            <dt class="text-sm/6 font-semibold text-red-500">{{ stat.name }}</dt>
            <dd class="order-first text-3xl font-semibold tracking-tight text-gray-200">
              {{ stat.value }}
            </dd>
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
