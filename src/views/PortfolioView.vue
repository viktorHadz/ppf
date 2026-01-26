<script setup>
import DecorDiagSheen from '@/components/global/DecorDiagSheen.vue'
import TheWelcome from '@/components/global/TheWelcome.vue'
</script>
<template>
  <TheWelcome :show-scroll-down-icon="true">
    <template #title>Галерия</template>
    <template #under-title>
      Виж работата ни. Сертифицирани експерти които ще купят на Виктор сладолед
    </template>
  </TheWelcome>

  <svg
    width="526"
    height="607"
    viewBox="0 0 526 607"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M262.839 0L525.678 151.75V455.25L262.839 607L0.000152588 455.25V151.75L262.839 0Z"
      fill="#D9D9D9"
    />
  </svg>

  <section class="bg-zinc-900 py-24 sm:py-40 relative overflow-hidden">
    <!-- Decorative Element Dividers and Sheen -->
    <DecorDiagSheen />
    <!-- Decorative Element Light -->
    <div class="grid-el-2"></div>

    <div class="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
      <!-- Header -->
      <div class="mx-auto max-w-2xl text-center">
        <p class="text-base/7 font-semibold text-red-500 mb-8">Затъмняване на стъклата</p>
        <h2 class="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Стил, комфорт и защита за вашия автомобил
        </h2>
        <p class="mt-8 text-lg/8 text-gray-400">
          Премиум фолиа, които намаляват топлината, филтрират UV лъчите и дават дискретност – без да
          пречат на видимостта.
        </p>
      </div>
    </div>
  </section>
</template>
