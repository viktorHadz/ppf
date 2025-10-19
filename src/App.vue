<script setup>
import { RouterView } from 'vue-router'
import TheNav from './components/global/TheNav.vue'

</script>

<template>
  <header>
    <TheNav />
  </header>

  <RouterView />
</template>

<style scoped></style>
