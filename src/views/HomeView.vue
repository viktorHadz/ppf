<script setup>
import TheWelcome from '@/components/global/TheWelcome.vue'

import IconFoil from '@/components/icons/IconFoil.vue'
import IconDarkening from '@/components/icons/IconDarkening.vue'
import IconDetailing from '@/components/icons/IconDetailing.vue'
import IconInsurance from '@/components/icons/IconInsurance.vue'
import CtaDarkening from '@/components/CtaDarkening.vue'
import CtaFoil from '@/components/CtaFoil.vue'
import CtaDetailing from '@/components/CtaDetailing.vue'
import DecorDiagSheen from '@/components/global/DecorDiagSheen.vue'

// TODO: add banner with contact

const heroFeatures = [
  {
    name: 'Премиум Автофолиране',
    description:
      'Използваме висококачествени фолия и технологии за постигане на перфектно покритие и дълготрайна защита. Всеки детайл се обработва с внимание и прецизност.',
    href: 'ppf',
    icon: IconFoil,
  },
  {
    name: 'Затъмняване на Автостъкла',
    description:
      'Професионално поставяне на фолио за стъкла с оптимален баланс между стил, безопасност и защита от UV лъчи. Сертифицирани материали и безкомпромисно качество.',
    href: 'tinting',
    icon: IconDarkening,
  },
  {
    name: 'Авто Детайлинг',
    description:
      'Дълбочинно почистване и възстановяване на екстериора и интериора – полиране, деконтаминация, защита на лак, кожа и пластмаси. Фокус върху детайла, не върху бързия ефект.',
    href: 'detailing',
    icon: IconDetailing,
  },
  {
    name: 'Застраховане и Консултация',
    description:
      'Осигуряваме съдействие при избор на подходяща застраховка и пълна консултация за защита на вашия автомобил. Работим с утвърдени партньори и прозрачни условия.',
    href: 'insurance',
    icon: IconInsurance,
  },
]
</script>
<template>
  <TheWelcome
    :show-buttons="true"
    :showGridPattern="false"
    :showVideo="true"
    redirect-to-prim="contact"
    redirect-to-sec="portfolio"
    video-mp4="/hero/video/hero-bg-1600k.mp4"
    poster="/hero/img/home-hero-poster.webp"
  >
    <template #title>
      Елитна визия <br />
      премиум защита
    </template>
    <template #under-title> PPF фолиране затъмняване и детайлинг </template>
    <template #primary>запитване</template>
    <template #secondary>портфолио</template>
  </TheWelcome>

  <div class="bg-zinc-900 py-24 sm:py-32 relative overflow-hidden">
    <!-- Decorative Element Light -->
    <div class="grid-el-2"></div>
    <!-- Decorative Element Dividers and Sheen -->
    <DecorDiagSheen />

    <div class="mx-auto px-6 lg:px-8 z-10 relative">
      <div class="mx-auto max-w-2xl lg:text-center">
        <h2 class="text-base/7 font-semibold text-red-500 mb-8">Професионални Авто Услуги София</h2>
        <p
          class="text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl lg:text-balance mb-12"
        >
          Всичко необходимо за безупречения вид на вашия автомобил
        </p>
        <p class="text-lg/8 text-gray-400">
          Предлагаме цялостни решения за защита, стил, комфорт и сигурност - от премиум фолиране и
          професионално затъмняване до авто детайлинг и застрахователни консултации. Всяка услуга се
          изпълнява с внимание към детайла и гарантирано качество.
        </p>
      </div>
      <div class="mx-auto my-24 lg:mt-28 max-w-2xl lg:max-w-7xl">
        <dl class="grid grid-cols-1 gap-x-16 gap-y-16 lg:max-w-none md:grid-cols-2 2xl:grid-cols-4">
          <div v-for="feature in heroFeatures" :key="feature.name" class="flex flex-col">
            <dt class="flex items-center gap-x-3 text-base/7 font-semibold text-gray-200">
              <component
                :is="feature.icon"
                class="size-12 flex-none text-red-500"
                aria-hidden="true"
              />
              {{ feature.name }}
            </dt>
            <dd class="mt-4 flex flex-auto flex-col text-base/7 text-gray-400">
              <p class="flex-auto">{{ feature.description }}</p>
              <p class="mt-6">
                <RouterLink
                  :to="`/${feature.href}#${feature.href}-brow`"
                  class="group text-sm/6 font-semibold text-red-500 inline-flex items-center"
                >
                  Научи повече
                  <span
                    aria-hidden="true"
                    class="ml-1 transform transition-transform duration-300 translate-x-0 group-hover:translate-x-4"
                  >
                    →
                  </span>
                </RouterLink>
              </p>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
  <CtaFoil></CtaFoil>
  <CtaDarkening></CtaDarkening>
  <CtaDetailing></CtaDetailing>
</template>
