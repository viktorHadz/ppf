<script setup>
import TheWelcome from '@/components/global/TheWelcome.vue'
</script>
<template>
  <TheWelcome :show-scroll-down-icon="true">
    <template #title>Фолиране</template>
    <template #under-title> Професионален детайлинг и сладолед</template>
  </TheWelcome>

  <div class="bg-zinc-900 py-24 sm:py-32 text-white">
    <p>видеа</p>
    <p>Информация за фолиране (Иван ще прати)</p>
    <br />
    <p>Снимки</p>
  </div>
</template>
