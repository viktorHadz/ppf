<script setup>
import { RouterView } from 'vue-router'
import TheNav from './components/global/TheNav.vue'
import TheFooter from './components/global/TheFooter.vue'
</script>

<template>
  <header>
    <TheNav />
  </header>

  <RouterView />

  <footer>
    <TheFooter />
  </footer>
</template>

<style scoped></style>
