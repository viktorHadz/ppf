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
  'px-8 py-3.5 font-medium text-sm uppercase tracking-wider border transition-all duration-300 rounded-xl hover:scale-105 active:scale-95'

// Variant-specific styles
const variantClasses = {
  primary: 'bg-red-600/60 text-white border-red-600 hover:bg-red-700/95',
  secondary: 'bg-white/20 text-white border-zinc-500 hover:text-black hover:bg-white/80 ',
}

const buttonClasses = computed(() => `${baseClasses} ${variantClasses[props.variant]}`)
</script>

<template>
  <button :class="buttonClasses" @click="$emit('click', $event)">
    <slot>{{ label }}</slot>
  </button>
</template>
