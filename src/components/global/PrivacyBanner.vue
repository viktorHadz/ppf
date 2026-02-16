<script setup>
import { usePrivacyConsent } from '@/composables/usePrivacyConsent'
import TheButton from './TheButton.vue'

const { accepted, accept, decline } = usePrivacyConsent()
</script>

<template>
  <Transition name="cookie" appear>
    <div
      v-if="accepted === null"
      class="fixed inset-x-0 bottom-0 flex flex-col justify-between gap-x-8 gap-y-4 bg-zinc-950/90 p-4 ring-1 ring-gray-400/20 md:flex-row md:items-center lg:px-8 z-[200] backdrop-blur-2xl"
    >
      <p class="max-w-4xl text-sm/6 text-gray-400">
        Сайтът използва бисквитки и сходни технологии, с цел подобряване, и анализ на използването
        му. Повече информация в
        <RouterLink to="/cookies" class="font-semibold text-white hover:text-red-500">
          Политиката ни за бисквитки.
        </RouterLink>
      </p>

      <div class="flex flex-none gap-x-5">
        <TheButton variant="primary" @click="accept()" class="text-xs !p-2"> Приеми </TheButton>
        <TheButton variant="secondary" @click="decline()" class="text-xs !p-2"> Откажи </TheButton>
      </div>
    </div>
  </Transition>
</template>
<style scoped>
.cookie-enter-active,
.cookie-leave-active {
  transition:
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.25s ease;
}

/* start hidden below screen */
.cookie-enter-from,
.cookie-leave-to {
  transform: translateY(110%);
  opacity: 0;
}

/* end visible */
.cookie-enter-to,
.cookie-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>
