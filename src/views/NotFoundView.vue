<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="relative isolate min-h-[calc(100vh-6rem)] overflow-hidden bg-zinc-950">
    <svg
      class="absolute inset-x-0 top-0 -z-10 h-[72rem] w-full stroke-zinc-800/30 sm:stroke-zinc-800/20 [mask-image:radial-gradient(34rem_34rem_at_center,white,transparent)]"
      aria-hidden="true"
    >
      <defs>
        <pattern id="nf-grid" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
          <path d="M.5 200V.5H200" fill="none" />
        </pattern>
      </defs>
      <svg x="50%" y="-1" class="overflow-visible fill-zinc-800/20">
        <path
          d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
          stroke-width="0"
        />
      </svg>
      <rect width="100%" height="100%" stroke-width="0" fill="url(#nf-grid)" />
    </svg>

    <div
      class="absolute -top-24 left-1/2 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-red-500/15 blur-3xl"
      aria-hidden="true"
    ></div>

    <section class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 relative">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-base/7 font-semibold text-red-500">404</p>

        <h1 class="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Страницата не е намерена
        </h1>

        <p class="mt-8 text-lg/8 text-gray-400">
          Възможно е линкът да е грешен или страницата да е преместена. Ако търсите услуга -
          изберете от опциите по-долу или ни пишете директно.
        </p>

        <!-- Primary CTAs -->
        <div class="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <RouterLink
            to="/"
            class="inline-flex items-center justify-center rounded-xl bg-red-500 px-7 py-3.5 text-sm font-semibold text-white hover:bg-red-400 transition"
          >
            Към началото
          </RouterLink>

          <RouterLink
            to="/contact"
            class="inline-flex items-center justify-center rounded-xl bg-white/5 px-7 py-3.5 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-white/10 transition"
          >
            Запитване
          </RouterLink>
        </div>
      </div>

      <div class="mx-auto mt-16 max-w-5xl">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <RouterLink
            to="/ppf#ppf-brow"
            class="group rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 hover:bg-white/7 hover:ring-white/15 transition"
          >
            <div class="flex items-start justify-between gap-4">
              <h3 class="text-sm font-semibold text-white">PPF фолиране</h3>
              <span class="text-red-500/80 group-hover:text-red-400 transition">→</span>
            </div>
            <p class="mt-3 text-sm/6 text-gray-400">Пакети, видове защита и детайли за монтажа.</p>
          </RouterLink>

          <RouterLink
            to="/tinting#tinting-brow"
            class="group rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 hover:bg-white/7 hover:ring-white/15 transition"
          >
            <div class="flex items-start justify-between gap-4">
              <h3 class="text-sm font-semibold text-white">Затъмняване</h3>
              <span class="text-red-500/80 group-hover:text-red-400 transition">→</span>
            </div>
            <p class="mt-3 text-sm/6 text-gray-400">UV защита, комфорт и законови опции.</p>
          </RouterLink>

          <RouterLink
            to="/detailing#detailing-brow"
            class="group rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 hover:bg-white/7 hover:ring-white/15 transition"
          >
            <div class="flex items-start justify-between gap-4">
              <h3 class="text-sm font-semibold text-white">Детайлинг</h3>
              <span class="text-red-500/80 group-hover:text-red-400 transition">→</span>
            </div>
            <p class="mt-3 text-sm/6 text-gray-400">
              Екстериор, интериор и възстановяване на блясък.
            </p>
          </RouterLink>

          <RouterLink
            to="/portfolio"
            class="group rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 hover:bg-white/7 hover:ring-white/15 transition"
          >
            <div class="flex items-start justify-between gap-4">
              <h3 class="text-sm font-semibold text-white">Портфолио</h3>
              <span class="text-red-500/80 group-hover:text-red-400 transition">→</span>
            </div>
            <p class="mt-3 text-sm/6 text-gray-400">Реални проекти, снимки и резултати.</p>
          </RouterLink>
        </div>

        <p class="mt-10 text-center text-sm text-gray-500">
          Ако сте стигнали тук от бутон или меню - кажете ни и ще го оправим.
        </p>
      </div>
    </section>
  </main>
</template>
