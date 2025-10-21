  <script setup>
  import TheWelcome from '@/components/global/TheWelcome.vue'

</script>
<template>
  <TheWelcome :show-buttons="true">
    <template #title>ППФ ЕКСПЕРТИ ДА СИ ИБЕ</template>
    <template #under-title>Орлин и Иван да черпят Виктор курва</template>
    <template #primary-button>Запази Час</template>
    <template #secondary-button>Научи Повече</template>
  </TheWelcome>
  <div class="h-200 grid bg-zinc-950">
    <div class="grid-el mask-radial-from-0% mask-radial-to-80% mask-radial-at-center"></div>
  </div>

</template>
<style>
.grid-el {
  background-image: url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='29' height='50.115' patternTransform='scale(2) rotate(15)'><rect x='0' y='0' width='100%' height='100%' fill='none'/><path d='M14.498 16.858L0 8.488.002-8.257l14.5-8.374L29-8.26l-.002 16.745zm0 50.06L0 58.548l.002-16.745 14.5-8.373L29 41.8l-.002 16.744zM28.996 41.8l-14.498-8.37.002-16.744L29 8.312l14.498 8.37-.002 16.745zm-29 0l-14.498-8.37.002-16.744L0 8.312l14.498 8.37-.002 16.745z'  stroke-width='0.1' stroke='%23ffffff3d' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(-60,-141.69)' fill='url(%23a)'/></svg>")
}
</style>