  <script setup>
  import TheWelcome from '@/components/global/TheWelcome.vue'

</script>
<template>
  <TheWelcome>
    <template #title>ППФ ЕКСПЕРТИ ДА СИ ИБЕ</template>
    <template #under-title>Орлин и Иван да черпят Виктор курва</template>
  </TheWelcome>
  <div class="h-200 grid">
    <div class="grid-el"></div>
  </div>
  <div class="scene">
    <div class="red-layer"></div>
    <div class="cracked-surface"></div>
  </div>

</template>
<style>
.scene {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.red-layer {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, red, darkred);
  animation: move 5s linear infinite;
  z-index: 0;
}

.cracked-surface {
  position: absolute;
  inset: 0;
  background: black;
  z-index: 1;

  /* Properly inverted hex mask — red shows through hex LINES only */
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Cdefs%3E%3Cpattern id='hex' patternUnits='userSpaceOnUse' width='29' height='50.115' patternTransform='scale(3) rotate(15)'%3E%3Crect width='100%25' height='100%25' fill='white'/%3E%3Cpath d='M14.498 16.858L0 8.488.002-8.257l14.5-8.374L29-8.26l-.002 16.745zm0 50.06L0 58.548l.002-16.745 14.5-8.373L29 41.8l-.002 16.744zM28.996 41.8l-14.498-8.37.002-16.744L29 8.312l14.498 8.37-.002 16.745zm-29 0l-14.498-8.37.002-16.744L0 8.312l14.498 8.37-.002 16.745z' fill='none' stroke='black' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23hex)'/%3E%3C/svg%3E");
  -webkit-mask-repeat: repeat;
  -webkit-mask-size: auto;
  -webkit-mask-mode: luminance;

  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Cdefs%3E%3Cpattern id='hex' patternUnits='userSpaceOnUse' width='29' height='50.115' patternTransform='scale(3) rotate(15)'%3E%3Crect width='100%25' height='100%25' fill='white'/%3E%3Cpath d='M14.498 16.858L0 8.488.002-8.257l14.5-8.374L29-8.26l-.002 16.745zm0 50.06L0 58.548l.002-16.745 14.5-8.373L29 41.8l-.002 16.744zM28.996 41.8l-14.498-8.37.002-16.744L29 8.312l14.498 8.37-.002 16.745zm-29 0l-14.498-8.37.002-16.744L0 8.312l14.498 8.37-.002 16.745z' fill='none' stroke='black' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23hex)'/%3E%3C/svg%3E");
  mask-repeat: repeat;
  mask-size: auto;
  mask-mode: luminance;
}

@keyframes move {
  from {
    transform: translateX(100%);
    rotate: 45deg;
    scale: 3;
  }

  to {
    transform: translateX(-200%);
    rotate: 45deg;
  }
}

.grid-el {
  background-image: url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='29' height='50.115' patternTransform='scale(3) rotate(15)'><rect x='0' y='0' width='100%' height='100%' fill=''/><path d='M14.498 16.858L0 8.488.002-8.257l14.5-8.374L29-8.26l-.002 16.745zm0 50.06L0 58.548l.002-16.745 14.5-8.373L29 41.8l-.002 16.744zM28.996 41.8l-14.498-8.37.002-16.744L29 8.312l14.498 8.37-.002 16.745zm-29 0l-14.498-8.37.002-16.744L0 8.312l14.498 8.37-.002 16.745z'  stroke-width='0.5' stroke='%23ffffff3d' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(-60,-141.69)' fill='url(%23a)'/></svg>")
}
</style>