<script setup>
import TheWelcome from '@/components/global/TheWelcome.vue'
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/vue/20/solid'
import car from '@/assets/car-home.webp'
const stats = [
  { id: 1, name: 'Creators on the platform', value: '8,000+' },
  { id: 2, name: 'Flat platform fee', value: '3%' },
  { id: 3, name: 'Uptime guarantee', value: '99.9%' },
  { id: 4, name: 'Paid out to creators', value: '$70M' },
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
</script>
<template>
  <TheWelcome :show-buttons="true">
    <template #title>ппф експерти</template>
    <template #under-title>Орлин и Иван да черпят Виктор сладолед</template>
    <template #primary-button>Запази Час</template>
    <template #secondary-button>Научи Повече</template>
  </TheWelcome>

  <div class="bg-zinc-900 py-24 sm:py-32 relative overflow-hidden">
    <!-- Background Layer -->
    <div class="grid-el-2"></div>

    <!-- Foreground Layer -->
    <div class="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
      <div class="mx-auto max-w-2xl lg:max-w-none">
        <div class="text-center">
          <h2 class="text-4xl font-semibold tracking-tight text-balance text-gray-200 sm:text-5xl">
            Trusted by creators worldwide
          </h2>
          <p class="mt-4 text-lg/8 text-gray-400">
            Lorem ipsum dolor sit amet consect adipisicing possimus.
          </p>
        </div>
        <dl
          class="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4"
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
            <h2 class="text-base/7 font-semibold text-red-500">Deploy faster</h2>
            <p
              class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl"
            >
              A better workflow
            </p>
            <p class="mt-6 text-lg/8 text-gray-300">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis
              suscipit eaque, iste dolor cupiditate blanditiis ratione.
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
          <!-- <img
            :src="car"
            class="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-white/10 sm:w-228 md:-ml-4 lg:-ml-0"
          /> -->
          <img
            src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png"
            alt="Product screenshot"
            class="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-white/10 sm:w-228 md:-ml-4 lg:-ml-0"
            width="2432"
            height="1442"
          />
        </div>
      </div>
    </div>
  </div>
</template>
