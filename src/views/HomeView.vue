<script setup>
import TheButton from '@/components/global/TheButton.vue'
import TheWelcome from '@/components/global/TheWelcome.vue'
const stats = [
  { id: 1, name: 'Creators on the platform', value: '8,000+' },
  { id: 2, name: 'Flat platform fee', value: '3%' },
  { id: 3, name: 'Uptime guarantee', value: '99.9%' },
  { id: 4, name: 'Paid out to creators', value: '$70M' },
]
</script>
<template>
  <TheWelcome :show-buttons="true">
    <template #title>ппф експерти</template>
    <template #under-title>Орлин и Иван да черпят Виктор сладолед</template>
    <template #primary-button>Запази Час</template>
    <template #secondary-button>Научи Повече</template>
  </TheWelcome>
  <div class="h-200 grid bg-zinc-950">
    <div class="grid-el mask-radial-from-0% mask-radial-to-80% mask-radial-at-center"></div>
    <div>
      <TheButton variant="primary">asdsad </TheButton>
      <TheButton variant="secondary">asdsad </TheButton>
    </div>
  </div>
  <div class="bg-zinc-900 py-24 sm:py-32 grid-el">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:max-w-none">
        <div class="text-center">
          <h2 class="text-4xl font-semibold tracking-tight text-balance text-gray-200 sm:text-5xl">
            Trusted by creators worldwide
          </h2>
          <p class="mt-4 text-lg/8 text-gray-400">
            Lorem ipsum dolor sit amet consect adipisicing possimus.
          </p>
        </div>
        <dl
          class="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4"
        >
          <div v-for="stat in stats" :key="stat.id" class="flex flex-col bg-zinc-800 p-8">
            <dt class="text-sm/6 font-semibold text-red-500">{{ stat.name }}</dt>
            <dd class="order-first text-3xl font-semibold tracking-tight text-gray-200">
              {{ stat.value }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>
<style>
.grid-el {
  background-image: url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='29' height='50.115' patternTransform='scale(2) rotate(15)'><rect x='0' y='0' width='100%' height='100%' fill='none'/><path d='M14.498 16.858L0 8.488.002-8.257l14.5-8.374L29-8.26l-.002 16.745zm0 50.06L0 58.548l.002-16.745 14.5-8.373L29 41.8l-.002 16.744zM28.996 41.8l-14.498-8.37.002-16.744L29 8.312l14.498 8.37-.002 16.745zm-29 0l-14.498-8.37.002-16.744L0 8.312l14.498 8.37-.002 16.745z'  stroke-width='0.1' stroke='%23ffffff3d' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(-60,-141.69)' fill='url(%23a)'/></svg>");
}
</style>
