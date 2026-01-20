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
    <!-- Decorative Element Dark -->
    <div>
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
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <p v-if="page.eyebrow" class="text-base/7 font-semibold text-red-500 mb-8">
            {{ page.eyebrow }}
          </p>
          <div class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
            <div class="lg:col-span-6">
              <h1 class="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {{ page.title }}
              </h1>
              <p v-if="page.subtitle" class="mt-12 text-lg/8 text-gray-400">
                {{ page.subtitle }}
              </p>
              <div v-if="page.cta" class="mt-16 flex flex-col gap-4 sm:flex-row">
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
            <div v-if="page.heroImage" class="lg:col-span-6">
              <img
                :src="page.heroImage.src"
                :alt="page.heroImage.alt || ''"
                class="w-full rounded-2xl shadow-2xl ring-1 ring-white/10 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- BENEFITS -->
      <section v-if="page.benefits?.length" class="pb-24 sm:pb-32 bg-zinc-950">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 class="text-lg font-semibold text-white">{{ page.benefitsTitle || 'Предимства' }}</h2>
          <dl class="mt-12 grid gap-8 text-base/7 text-gray-400 sm:grid-cols-2 grid-cols-1">
            <div
              v-for="b in page.benefits"
              :key="b.title"
              class="rounded-2xl bg-white/5 ring-1 ring-white/10 p-8"
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
        <!-- PACKAGES / TYPES -->
        <section v-if="page.sections?.length" class="pb-24 sm:pb-32">
          <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div v-for="(s, idx) in page.sections" :key="idx" class="mt-16 first:mt-0">
              <h2 class="text-lg font-semibold text-white">{{ s.title }}</h2>
              <p v-if="s.subtitle" class="mt-2 text-sm/6 text-gray-400">{{ s.subtitle }}</p>
              <div class="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div
                  v-for="card in s.cards"
                  :key="card.title"
                  class="rounded-2xl bg-white/5 ring-1 ring-white/10 p-8"
                >
                  <div class="text-base font-semibold text-white">{{ card.title }}</div>
                  <p v-if="card.desc" class="mt-4 text-sm/6 text-gray-400">{{ card.desc }}</p>
                  <ul v-if="card.items?.length" class="mt-6 space-y-3 text-sm text-gray-300/90">
                    <li v-for="it in card.items" :key="it" class="flex gap-3">
                      <span class="mt-2 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0"></span>
                      <span>{{ it }}</span>
                    </li>
                  </ul>
                  <a
                    v-if="card.cta"
                    :href="card.cta.href"
                    class="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-black/30 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-black/40 transition"
                  >
                    {{ card.cta.label }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- Why Us -->
        <section v-if="page.whyUs?.length" class="pb-24 sm:pb-32">
          <div v-for="why in page.whyUs" :key="why.title" class="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 class="text-lg font-semibold text-white text-center">{{ why.title }}</h2>

            <div class="mt-10 p-8">
              <ul class="grid gap-4 sm:grid-cols-2">
                <li
                  v-for="(desc, i) in why.items"
                  :key="i"
                  class="group flex gap-4 rounded-xl bg-black/20 ring-1 ring-white/10 px-5 py-4 hover:bg-black/30 transition items-center"
                >
                  <span
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-500/15 ring-1 ring-red-500/30 text-sm font-semibold text-red-300 tabular-nums"
                  >
                    {{ i + 1 }}
                  </span>

                  <p class="text-sm/6 text-gray-200">
                    {{ desc }}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <!-- FAQ -->
        <section v-if="page.faq?.length" class="pb-24 sm:pb-32">
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
        <!-- FINAL CTA -->
        <section class="pb-24 sm:pb-32">
          <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div
              class="rounded-2xl bg-white/5 ring-1 ring-white/10 p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8"
            >
              <div>
                <h2 class="text-lg font-semibold text-white">
                  {{ page.finalCta?.title || 'Готови ли сте?' }}
                </h2>
                <p class="mt-2 text-sm/6 text-gray-400">
                  {{
                    page.finalCta?.subtitle ||
                    'Изпратете запитване и ще ви предложим решение според автомобила.'
                  }}
                </p>
              </div>
              <a
                :href="page.finalCta?.href || '/contact'"
                class="inline-flex items-center justify-center rounded-xl bg-red-500 px-7 py-3.5 text-sm font-semibold text-white hover:bg-red-400 transition"
              >
                {{ page.finalCta?.label || 'Запитване' }}
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>
