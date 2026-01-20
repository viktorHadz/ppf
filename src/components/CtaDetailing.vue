<script setup>
import { SparklesIcon, ShieldCheckIcon, BeakerIcon } from '@heroicons/vue/20/solid'
import detailingScrub from '@/assets/detailingScrub.webp'

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
            <a
              href="/contact?service=detailing"
              class="inline-flex items-center justify-center rounded-xl bg-red-500 px-7 py-3.5 text-sm font-semibold text-white hover:bg-red-400 transition"
            >
              Запитване
            </a>
            <a
              href="/services/detailing"
              class="inline-flex items-center justify-center rounded-xl bg-white/5 px-7 py-3.5 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-white/10 transition"
            >
              Виж услугата
            </a>
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
            :src="detailingScrub"
            alt="Авто детайлинг"
            class="w-full rounded-2xl shadow-2xl ring-1 ring-white/10 object-cover"
          />
        </div>
      </div>
    </div>
  </section>
</template>
