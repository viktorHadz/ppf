<script setup>
import { CheckCircleIcon } from '@heroicons/vue/24/outline'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { MinusIcon, PlusIcon } from '@heroicons/vue/24/outline'

defineProps({
  page: { type: Object, required: true },
})
</script>

<template>
  <main class="bg-zinc-950 relative isolate overflow-hidden">
    <div>
      <!-- Decorative Element Dark -->
      <svg
        class="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-zinc-800/30 sm:stroke-zinc-800/20 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
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
      <!-- HERO -->
      <section class="py-24 sm:py-32">
        <!-- Variant 1 - Image Tile Stack -->
        <div v-if="page.hero?.variant === 'imageTileStack'">
          <div class="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
            <div
              class="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:max-w-none lg:min-w-full lg:flex-none lg:gap-y-8"
            >
              <div class="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
                <p v-if="page.eyebrow" class="text-base/7 font-semibold text-red-500 mb-8">
                  {{ page.eyebrow }}
                </p>

                <h1 class="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  {{ page.title }}
                </h1>

                <p v-if="page.subtitle" class="mt-6 text-lg/8 text-gray-400">
                  {{ page.subtitle }}
                </p>

                <p v-if="page.hero?.body" class="mt-6 text-sm/7 text-gray-400">
                  {{ page.hero.body }}
                </p>

                <div v-if="page.cta" class="mt-10 flex flex-col gap-4 sm:flex-row">
                  <a
                    :href="page.cta.primary.href"
                    class="inline-flex items-center justify-center rounded-xl bg-red-500 px-7 py-3.5 text-sm font-semibold text-white hover:bg-red-400 transition"
                  >
                    {{ page.cta.primary.label }}
                  </a>

                  <a
                    v-if="page.cta.secondary"
                    :href="page.cta.secondary.href"
                    class="inline-flex items-center justify-center rounded-xl bg-white/5 px-7 py-3.5 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-white/10 transition"
                  >
                    {{ page.cta.secondary.label }}
                  </a>
                </div>
              </div>

              <div class="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
                <div class="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                  <img
                    :src="page.hero?.tiles?.[0]?.src"
                    :alt="page.hero?.tiles?.[0]?.alt || ''"
                    class="aspect-7/5 w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                  />
                </div>

                <div
                  class="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8"
                >
                  <div class="order-first flex w-64 flex-none justify-end self-end lg:w-auto">
                    <img
                      :src="page.hero?.tiles?.[1]?.src"
                      :alt="page.hero?.tiles?.[1]?.alt || ''"
                      class="aspect-4/3 w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                    />
                  </div>

                  <div class="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                    <img
                      :src="page.hero?.tiles?.[2]?.src"
                      :alt="page.hero?.tiles?.[2]?.alt || ''"
                      class="aspect-7/5 w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                    />
                  </div>

                  <div class="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                    <img
                      :src="page.hero?.tiles?.[3]?.src"
                      :alt="page.hero?.tiles?.[3]?.alt || ''"
                      class="aspect-4/3 w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Variant 2 - Horizontal Image -->
        <div v-else-if="page.hero?.variant === 'lgHozImage'">
          <!-- Text -->
          <div class="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <p v-if="page.eyebrow" class="text-base/7 font-semibold text-red-500 mb-4">
              {{ page.eyebrow }}
            </p>

            <h1
              class="text-4xl font-semibold tracking-tight text-white sm:text-5xl max-w-4xl mx-auto"
            >
              {{ page.title }}
            </h1>

            <p v-if="page.subtitle" class="mt-6 text-lg/8 text-gray-400 max-w-3xl mx-auto">
              {{ page.subtitle }}
            </p>

            <div v-if="page.cta" class="mt-10 flex justify-center gap-4 flex-wrap">
              <a
                :href="page.cta.primary.href"
                class="inline-flex items-center justify-center rounded-xl bg-red-500 px-7 py-3.5 text-sm font-semibold text-white hover:bg-red-400 transition"
              >
                {{ page.cta.primary.label }}
              </a>

              <a
                v-if="page.cta.secondary"
                :href="page.cta.secondary.href"
                class="inline-flex items-center justify-center rounded-xl bg-white/5 px-7 py-3.5 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-white/10 transition"
              >
                {{ page.cta.secondary.label }}
              </a>
            </div>
          </div>

          <!-- Image -->
          <div class="relative mt-16">
            <!-- glow -->
            <div
              class="absolute inset-x-0 -top-24 h-64 bg-linear-to-tr from-red-500/20 via-white/5 to-transparent blur-3xl"
              aria-hidden="true"
            ></div>

            <div class="mx-auto max-w-7xl px-6 lg:px-8">
              <div
                class="relative overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 shadow-2xl"
              >
                <img
                  :src="page.heroImage.src"
                  :alt="page.heroImage.alt || ''"
                  class="w-full object-cover aspect-[16/7]"
                />
                <!-- fade -->
                <div
                  class="absolute inset-0 bg-linear-to-t from-zinc-950/70 via-zinc-950/20 to-transparent"
                  aria-hidden="true"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <!-- Variant 3 - Text Left / Image right -->
        <div v-else class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
            <!-- LEFT -->
            <div class="lg:col-span-6 lg:pr-6">
              <p v-if="page.eyebrow" class="text-base/7 font-semibold text-red-500 mb-6">
                {{ page.eyebrow }}
              </p>

              <h1 class="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {{ page.title }}
              </h1>

              <p v-if="page.subtitle" class="mt-6 text-lg/8 text-gray-400 max-w-xl">
                {{ page.subtitle }}
              </p>

              <p v-if="page.hero?.body" class="mt-4 text-sm/7 text-gray-400 max-w-xl">
                {{ page.hero.body }}
              </p>

              <div v-if="page.cta" class="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  :href="page.cta.primary.href"
                  class="inline-flex items-center justify-center rounded-xl bg-red-500 px-7 py-3.5 text-sm font-semibold text-white hover:bg-red-400 transition"
                >
                  {{ page.cta.primary.label }}
                </a>

                <a
                  v-if="page.cta.secondary"
                  :href="page.cta.secondary.href"
                  class="inline-flex items-center justify-center rounded-xl bg-white/5 px-7 py-3.5 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-white/10 transition"
                >
                  {{ page.cta.secondary.label }}
                </a>
              </div>
            </div>

            <!-- RIGHT -->
            <div v-if="page.heroImage" class="lg:col-span-6">
              <div class="relative">
                <!-- glow behind image -->
                <div
                  class="absolute -inset-6 rounded-[2rem] bg-linear-to-tr from-red-500/15 via-white/5 to-transparent blur-2xl"
                  aria-hidden="true"
                ></div>

                <div
                  class="relative overflow-hidden rounded-[2rem] bg-white/5 ring-1 ring-white/10 shadow-2xl"
                >
                  <img
                    :src="page.heroImage.src"
                    :alt="page.heroImage.alt || ''"
                    class="w-full aspect-[4/5] object-cover"
                  />

                  <!-- overlay -->
                  <div
                    class="absolute inset-0 bg-linear-to-t from-zinc-950/60 via-zinc-950/10 to-transparent"
                    aria-hidden="true"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- BENEFITS -->
      <section v-if="page.benefits?.length" class="pb-24 sm:pb-32 bg-zinc-950">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 class="text-lg font-semibold text-white">{{ page.benefitsTitle || 'Предимства' }}</h2>
          <p v-if="page.benefitsSubtitle" class="text-gray-400 mt-8 text-pretty text-lg/8">
            {{ page.benefitsSubtitle }}
          </p>
          <dl class="mt-16 grid gap-8 text-base/7 text-gray-400 sm:grid-cols-2 grid-cols-1">
            <div
              v-for="(b, idx) in page.benefits"
              :key="b.title"
              :class="[
                'rounded-2xl ring-1 p-8 transition',
                idx === 0
                  ? 'bg-white/7 ring-red-500/30 shadow-[0_0_0_1px_rgba(239,68,68,0.15)]'
                  : 'bg-white/5 ring-white/10',
              ]"
            >
              <div class="text-base font-semibold text-white">{{ b.title }}</div>
              <div v-if="Array.isArray(b.desc)">
                <ul class="mt-6 space-y-4 text-base/7 text-gray-400">
                  <li v-for="item in b.desc" :key="item" class="flex gap-4 items-center">
                    <CheckCircleIcon class="size-5 text-red-500 shrink-0" aria-hidden="true" />
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
              <p v-else class="mt-3 text-sm/6 text-gray-400">{{ b.desc }}</p>
            </div>
          </dl>
        </div>
      </section>
    </div>

    <!-- Lighter BG container -->
    <div class="bg-zinc-900 py-24 sm:py-32 relative">
      <!-- Decorative Element Light -->
      <div class="grid-el-2"></div>

      <div class="relative">
        <!-- WHY US -->
        <section v-if="page.whyUs?.length" class="pb-24 sm:pb-32">
          <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="max-w-3xl">
              <p class="text-xs font-semibold tracking-widest text-red-300/90 uppercase">
                Защо IDO Group
              </p>
              <h2 class="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {{ page.whyUs?.[0]?.title }}
              </h2>
              <p class="mt-4 text-sm/7 text-gray-400">
                {{ page.whyUs?.[0]?.subtitle }}
              </p>
            </div>

            <div
              v-for="why in page.whyUs"
              :key="why.title"
              class="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-start"
            >
              <!-- Image  -->
              <div v-if="why.image" class="lg:col-span-5">
                <div class="relative">
                  <div
                    class="absolute -inset-6 rounded-[2rem] bg-linear-to-tr from-red-500/15 via-white/5 to-transparent blur-2xl"
                    aria-hidden="true"
                  ></div>

                  <div
                    class="relative overflow-hidden rounded-[2rem] bg-white/5 ring-1 ring-white/10 shadow-2xl"
                  >
                    <img
                      :src="why.image"
                      :alt="why.imageAlt || ''"
                      class="w-full aspect-[4/3] object-cover"
                    />
                    <div
                      class="absolute inset-0 bg-linear-to-t from-zinc-950/70 via-zinc-950/15 to-transparent"
                      aria-hidden="true"
                    ></div>
                  </div>
                </div>
              </div>

              <!-- List -->
              <div :class="why.image ? 'lg:col-span-7' : 'lg:col-span-12'">
                <ul class="grid gap-4 sm:grid-cols-2">
                  <li
                    v-for="(desc, i) in why.items"
                    :key="i"
                    class="group flex gap-4 rounded-2xl bg-black/20 ring-1 ring-white/10 px-6 py-5 hover:bg-black/30 transition items-center"
                  >
                    <span
                      class="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/15 ring-1 ring-red-500/30 text-sm font-semibold text-red-200 tabular-nums"
                    >
                      {{ i + 1 }}
                    </span>

                    <p class="text-sm/7 text-gray-200">
                      {{ desc }}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- PACKAGES / TYPES -->
        <section
          v-if="page.sections?.length"
          class="pb-24 sm:pb-32"
          :id="page.sectionsAnchor || 'types'"
        >
          <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <!-- section header -->
            <div class="max-w-3xl">
              <p class="text-xs font-semibold tracking-widest text-red-300/90 uppercase">
                Варианти и пакети
              </p>
              <h2 class="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Изберете най-подходящия пакет
              </h2>
              <p class="mt-4 text-sm/7 text-gray-400">
                По-долу са най-често избираните варианти. Ако се колебаете — ще ви насочим според
                автомобила, бюджета и желания ефект.
              </p>
            </div>

            <div v-for="(s, idx) in page.sections" :key="idx" class="mt-14">
              <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 class="text-lg font-semibold text-white">{{ s.title }}</h3>
                  <p v-if="s.subtitle" class="mt-2 text-gray-400 text-sm/7 max-w-3xl">
                    {{ s.subtitle }}
                  </p>
                </div>

                <!-- optional anchor jump -->
                <a
                  v-if="page.cta?.primary"
                  :href="page.cta.primary.href"
                  class="inline-flex items-center justify-center rounded-xl bg-white/5 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-white/10 transition"
                >
                  {{ page.cta.primary.label }}
                </a>
              </div>

              <div class="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div
                  v-for="card in s.cards"
                  :key="card.title"
                  :class="[
                    'rounded-2xl ring-1 p-8 transition relative overflow-hidden',
                    card.badge
                      ? 'bg-white/8 ring-red-500/35 shadow-[0_30px_60px_rgba(0,0,0,0.45)]'
                      : 'bg-white/5 ring-white/10 hover:bg-white/6',
                  ]"
                >
                  <!-- subtle glow for featured -->
                  <div
                    v-if="card.badge"
                    class="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-red-500/15 blur-3xl"
                    aria-hidden="true"
                  ></div>

                  <div class="flex items-start justify-between gap-4 relative">
                    <div class="text-base font-semibold text-white">{{ card.title }}</div>

                    <span
                      v-if="card.badge"
                      class="inline-flex items-center text-center rounded-full bg-red-500/15 px-3 py-1 text-xs font-semibold text-red-200 ring-1 ring-red-500/25"
                    >
                      {{ card.badge }}
                    </span>
                  </div>

                  <p v-if="card.desc" class="mt-4 text-sm/7 text-gray-400 relative">
                    {{ card.desc }}
                  </p>

                  <ul
                    v-if="card.items?.length"
                    class="mt-6 space-y-3 text-sm text-gray-200/90 relative"
                  >
                    <li v-for="it in card.items" :key="it" class="flex gap-3">
                      <span class="mt-2 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0"></span>
                      <span>{{ it }}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div
                class="mt-12 rounded-2xl bg-black/30 ring-1 ring-white/10 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
              >
                <p class="text-sm/7 text-gray-300 max-w-2xl">
                  <span class="text-gray-100 font-semibold"
                    >Не сте сигурни кой вариант е подходящ?</span
                  >
                  Свържете се с нас за кратка консултация и ще ви насочим към оптималния пакет
                  според вашия автомобил.
                </p>

                <a
                  :href="page.finalCta?.href || '/contact'"
                  class="inline-flex items-center justify-center rounded-xl bg-red-500 px-6 py-3 text-sm font-semibold text-white hover:bg-red-400 transition"
                >
                  {{ page.finalCta?.label || 'Консултация' }}
                </a>
              </div>
            </div>
          </div>
        </section>

        <!-- FAQ -->
        <section v-if="page.faq?.length" class="pb-24 sm:pb-12">
          <div class="mx-auto max-w-4xl px-6 lg:px-8">
            <h2 class="text-lg font-semibold text-white">Често задавани въпроси</h2>
            <dl class="mt-16 divide-y divide-white/10">
              <Disclosure
                as="div"
                v-for="q in page.faq"
                :key="q.q"
                class="py-6 first:pt-0 last:pb-0"
                v-slot="{ open }"
              >
                <dt>
                  <DisclosureButton
                    class="flex w-full items-start justify-between text-left text-white"
                  >
                    <span class="text-base/7 font-semibold">{{ q.q }}</span>
                    <span class="ml-6 flex h-7 items-center">
                      <PlusIcon v-if="!open" class="size-6" aria-hidden="true" />
                      <MinusIcon v-else class="size-6" aria-hidden="true" />
                    </span>
                  </DisclosureButton>
                </dt>
                <DisclosurePanel as="dd" class="mt-2 pr-12">
                  <p class="text-base/7 text-gray-300">{{ q.a }}</p>
                </DisclosurePanel>
              </Disclosure>
            </dl>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>
