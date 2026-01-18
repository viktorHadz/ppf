<script setup>
import {
  ShieldCheckIcon,
  SparklesIcon,
  SunIcon,
  BeakerIcon,
  CheckCircleIcon,
} from '@heroicons/vue/20/solid'

import foilingBmw from '@/assets/foilingBmw.webp'
import foilingMachine from '@/assets/foilingMachine.webp'
import foilingMerc from '@/assets/foilingMerc.webp'
import foilingMercSide from '@/assets/foilingMercSide.webp'

const benefits = [
  {
    name: 'Максимална защита',
    description: 'Дълготрайно запазва оригиналната боя в перфектно състояние',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Самовъзстановяване',
    description: 'Леките драскотини се “затварят” при топлина - финишът остава чист.',
    icon: SparklesIcon,
  },
  {
    name: 'UV + химическа устойчивост',
    description: 'Соли, насекоми, киселини и замърсявания - боята остава свежа.',
    icon: SunIcon,
  },
  {
    name: 'Лесна поддръжка',
    description: 'Мръсотията се задържа по-трудно и измиването е по-бързо и безопасно.',
    icon: BeakerIcon,
  },
]

const whyUs = [
  'Премиум материали и гарантирано качество',
  'Прецизен монтаж с фокус върху ръбове и детайли',
  'Ясна комуникация и контрол на качеството',
]
</script>

<template>
  <section class="relative isolate overflow-hidden bg-zinc-950 py-32 sm:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div
        class="mx-auto grid max-w-7xl grid-cols-1 gap-x-16 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2"
      >
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

        <!-- LEFT -->
        <div class="lg:pt-4 lg:pr-8">
          <div class="lg:max-w-xl mx-auto max-w-2xl">
            <!-- What is foiling -->
            <p class="text-base/7 font-semibold text-red-500 mb-6">Фолиране</p>

            <h2 class="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Запазете визията <br class="sm:hidden block" />на вашия автомобил
            </h2>

            <p class="mt-12 text-lg/8 text-gray-400">
              PPF фолирането е поставяне на защитен самовъзстановяващ се слой от полиуретан, който
              се нанася върху оригиналната боя на автомобила. След поставяне на фолио, боята на
              автомобила ви е предпазена от камъчета, драскотини, UV лъчи и химични замърсители.
            </p>

            <!-- PPF Benefits -->
            <dl class="my-24 grid grid-cols-1 gap-12 text-base/7 text-gray-400 sm:grid-cols-2">
              <div v-for="b in benefits" :key="b.name" class="relative pl-9">
                <dt class="font-semibold text-white">
                  <component
                    :is="b.icon"
                    class="absolute left-1 top-1 size-6 text-red-500"
                    aria-hidden="true"
                  />
                  {{ b.name }}
                </dt>
                <dd class="mt-2">{{ b.description }}</dd>
              </div>
            </dl>

            <!-- Why us -->
            <div class="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 sm:p-8">
              <h3 class="text-lg font-semibold text-white">Защо да изберете нас</h3>
              <ul class="mt-6 space-y-4 text-base/7 text-gray-400">
                <li v-for="item in whyUs" :key="item" class="flex gap-4">
                  <CheckCircleIcon class="mt-0.5 size-5 text-red-500 shrink-0" aria-hidden="true" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>

            <!-- CTA -->
            <div class="mt-12 flex flex-col gap-4 sm:flex-row">
              <a
                href="/services/ppf"
                class="inline-flex items-center justify-center rounded-xl bg-red-500 px-7 py-3.5 text-sm font-semibold text-white hover:bg-red-400 transition"
              >
                Виж пакети
              </a>
              <a
                href="/contact"
                class="inline-flex items-center justify-center rounded-xl bg-white/5 px-7 py-3.5 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-white/10 transition"
              >
                Запитване
              </a>
            </div>
          </div>
        </div>

        <!-- RIGHT: image stack -->
        <div class="relative py-8 sm:py-4">
          <div class="relative -right-0 sm:-right-28 mb-24">
            <img
              :src="foilingBmw"
              alt="Фолирано БМВ"
              class="w-[100%] sm:w-[80%] lg:w-[90%] rounded object-cover shadow-2xl ring-1 ring-zinc-800 transition-all duration-700 hover:scale-[1.02]"
            />
          </div>
          <div class="relative flex gap-x-8 mb-24">
            <img
              :src="foilingMerc"
              alt="Фолиран Мерцедес"
              class="w-[70%] sm:w-[70%] lg:w-[70%] xl:w-[80%] rounded object-cover shadow-2xl ring-1 ring-zinc-800 transition-all duration-700 hover:scale-[1.02]"
            />
            <img
              :src="foilingMachine"
              alt="Фолираща машина"
              class="w-[50%] rounded object-cover shadow-2xl ring-1 ring-zinc-800 transition-all duration-700 hover:scale-[1.02]"
            />
          </div>

          <div class="relative -right-0 sm:-right-28">
            <img
              :src="foilingMercSide"
              alt="Странична снимка на фолиран мерцедес"
              class="w-[100%] sm:w-[80%] lg:w-[90%] rounded object-cover shadow-2xl ring-1 ring-zinc-800 transition-all duration-700 hover:scale-[1.02]"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
