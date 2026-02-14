<script setup>
import { XMarkIcon } from '@heroicons/vue/20/solid'
import { ref } from 'vue'
// TODO: IMPLEMENT IF REQUIRED
// Potentially use sessionStorage
const closed = ref(false)

const closeBanner = () => {
  closed.value = !closed.value
}

// watch(
//   closed.value,
//   () => {

//   }
// )
// set session storage banner_open = true
// get session storage
// if session storage contact banner open true display banner - if (CONTACT_BANNER open = true)
//
</script>

<template>
  <div
    class="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-200 px-6 py-1 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10 sm:px-3.5 sm:before:flex-1"
    v-if="!closed"
  >
    <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
      <p class="text-sm/6 text-zinc-950">
        <strong class="font-semibold">GeneriCon 2023</strong>

        <svg viewBox="0 0 2 2" class="mx-2 inline size-0.5 fill-current" aria-hidden="true">
          <circle cx="1" cy="1" r="1" />
        </svg>
        Join us in Denver from June 7 – 9 to see what’s coming next.
      </p>
    </div>
    <div class="flex flex-1 justify-end">
      <button
        type="button"
        @click="closeBanner()"
        class="-m-3 p-3 focus-visible:-outline-offset-4 transition-transform duration-150"
      >
        <span class="sr-only">Dismiss</span>
        <XMarkIcon class="size-5 ext-zinc-950" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>
