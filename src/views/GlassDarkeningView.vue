<script setup>
import TheWelcome from '@/components/global/TheWelcome.vue'
import ServicePage from '@/components/global/ServicePage.vue'
import page from '@/components/services/darkening.js'
</script>
<template>
  <TheWelcome :show-scroll-down-icon="true">
    <template #title>Затъмняване</template>
    <template #under-title>Затъмняване на стъкла</template>
  </TheWelcome>

  <ServicePage :page="page" />
</template>
