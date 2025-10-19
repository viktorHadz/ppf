<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TheNav from './components/TheNav.vue'

</script>

<template>
  <header>
    <TheNav />
  </header>

  <RouterView />
</template>

<style scoped></style>
