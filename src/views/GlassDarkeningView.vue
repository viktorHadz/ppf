<script setup>
import TheWelcome from '@/components/global/TheWelcome.vue'
</script>
<template>
  <TheWelcome :show-scroll-down-icon="true">
    <template #title>Затъмняване</template>
    <template #under-title>Затъмняване на стъкла</template>
  </TheWelcome>
  <div class="bg-zinc-900 py-24 sm:py-32 text-white">
    <p>видеа</p>
    <p>Информация за затъмняване (Иван ще прати)</p>
    <ul>
      <li></li>
    </ul>
    <br />
    <p>Снимки</p>
  </div>
</template>
