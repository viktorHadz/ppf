<script setup>
import { usePrivacyConsent } from '@/composables/usePrivacyConsent'
import TheButton from './TheButton.vue'

const cookies = usePrivacyConsent()
</script>
<template>
  <div
    class="fixed inset-x-0 bottom-0 flex flex-col justify-between gap-x-8 gap-y-4 bg-zinc-950 p-4 ring-1 ring-gray-400/20 md:flex-row md:items-center lg:px-8 z-[200]"
    v-if="cookies.accepted.value === null"
  >
    <p class="max-w-4xl text-sm/6 text-gray-400">
      Сайтът използва бисквитки и сходни технологии, с цел подобряване, и анализ на използването му.
      Повече информация в
      <RouterLink to="/cookies" class="font-semibold text-white hover:text-red-500"
        >Политиката ни за бисквитки.</RouterLink
      >
    </p>
    <div class="flex flex-none gap-x-5">
      <TheButton variant="primary" @click="cookies.accept" class="text-xs !p-2"> Приеми </TheButton>
      <TheButton variant="secondary" @click="cookies.decline" class="text-xs !p-2">
        Откажи
      </TheButton>
    </div>
  </div>
</template>
