<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { RouterView } from 'vue-router'
import TheNav from './components/global/TheNav.vue'
import TheFooter from './components/global/TheFooter.vue'
import { useGlobalHead } from './composables/useGlobalHead'
import { useGoogleAnalytics } from './composables/useAnalytics.js'
import PrivacyBanner from './components/global/PrivacyBanner.vue'
import { usePrivacyConsent } from './composables/usePrivacyConsent'

const consent = usePrivacyConsent()
useGlobalHead()
useGoogleAnalytics(consent.accepted)

// --- ANALYTICS ---
watch(
  () => consent.accepted.value,
  (value) => {
    console.log(value)
    console.log(typeof value)
    if (value === true) {
      console.log(`Analytics consent given: ${consent.accepted.value}`)
    } else if (value === false) {
      console.log('Analytics consent refused')
    } else {
      console.log('Awaiting consent')
    }
  },
  { immediate: true },
)

const menuOpen = ref(false)
const isHidden = ref(false)
let lastScrollY = 0

// Nav show/hide nav controller
const onScroll = () => {
  if (menuOpen.value) return

  const currentScrollY = window.scrollY

  if (currentScrollY > lastScrollY && currentScrollY > 80)
    isHidden.value = true // scrolling down
  else isHidden.value = false // scrolling up

  lastScrollY = currentScrollY
}

onMounted(() => {
  lastScrollY = window.scrollY
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header
    class="sticky top-0 z-[200] transition-transform duration-300"
    :class="isHidden ? '-translate-y-[105%]' : 'translate-y-0'"
  >
    <TheNav v-model:navOpen="menuOpen" />
  </header>

  <RouterView />
  <PrivacyBanner />
  <footer>
    <TheFooter />
  </footer>
</template>
