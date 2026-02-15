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
  'px-8 py-3.5 font-medium text-sm uppercase tracking-wider transition-all border duration-300 rounded-xl '

const variantClasses = {
  primary:
    'inline-flex items-center justify-center rounded-xl bg-red-500/70 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-red-500/90 active:bg-red-500/70 border-red-300/40',
  secondary: 'bg-white/20 text-white border-zinc-500  hover:bg-white/40 active:bg-white/20',
}

const buttonClasses = computed(() => `${baseClasses} ${variantClasses[props.variant]}`)
</script>

<template>
  <button :class="buttonClasses" @click="$emit('click', $event)" class="bg-">
    <slot>{{ label }}</slot>
  </button>
</template>
