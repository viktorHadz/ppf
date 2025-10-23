<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary'].includes(v),
  },
  label: {
    type: String,
    default: '',
  },
})

const baseClasses =
  'px-8 py-3.5 font-medium text-sm uppercase tracking-wider border transition-all duration-300 rounded hover:scale-105 active:scale-90'

// Variant-specific styles
const variantClasses = {
  primary: 'bg-red-600 text-white border-red-600 hover:bg-red-700',
  secondary: 'bg-transparent text-zinc-300 border-zinc-700 hover:text-black hover:bg-white',
}

const buttonClasses = computed(() => `${baseClasses} ${variantClasses[props.variant]}`)
</script>

<template>
  <button :class="buttonClasses" @click="$emit('click', $event)">
    <slot>{{ label }}</slot>
  </button>
</template>
