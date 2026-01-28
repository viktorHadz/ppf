<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterView } from 'vue-router'
import TheNav from './components/global/TheNav.vue'
import TheFooter from './components/global/TheFooter.vue'

const menuOpen = ref(false)
const isHidden = ref(false)
let lastScrollY = 0

// Nav show/hide controller
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

  <footer>
    <TheFooter />
  </footer>
</template>

<style scoped></style>
