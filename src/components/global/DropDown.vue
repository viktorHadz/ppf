<!-- DropDown.vue -->
<script setup>
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { computed, ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
  brow: String,
  dropdownValues: {
    type: Array,
    required: true,
    default: () => [],
  },
  errorText: String,

  // v-model
  modelValue: {
    type: [String, Number],
    default: '',
  },

  // optional: placeholder + allow clearing
  placeholder: {
    type: String,
    default: 'Изберете...',
  },
})

const emit = defineEmits(['update:modelValue', 'blur'])

const open = ref(false)
const dropdownRef = ref(null)

const toggleOpen = () => {
  open.value = !open.value
}

// Close + emit blur when user clicks outside *while open*
onClickOutside(dropdownRef, () => {
  if (!open.value) return
  if (open.value) emit('blur')
  open.value = false
})

// Derive the visible label from modelValue so it stays in sync
const selectedLabel = computed(() => {
  const v = props.modelValue
  if (v === '' || v === null || v === undefined) return ''
  const found = props.dropdownValues.find((x) => x.formValue === v)
  return found?.text ?? ''
})

watch(
  () => [props.modelValue, props.dropdownValues],
  () => {
    if (props.modelValue === '' || props.modelValue == null) return
    const exists = props.dropdownValues.some((x) => x.formValue === props.modelValue)
    if (!exists) emit('update:modelValue', '')
  },
)

function selectItem(item) {
  emit('update:modelValue', item.formValue)
  open.value = false
  emit('blur')
}
// if i decide to implement later
// function clearSelection() {
//   emit('update:modelValue', '')
//   open.value = false
//   emit('blur')
// }
</script>

<template>
  <div>
    <p class="text-sm font-semibold text-white/80 ml-0.5">
      {{ brow }}
    </p>

    <div ref="dropdownRef" class="text-white/70 text-sm mt-2">
      <!-- select button -->
      <button
        type="button"
        @click="toggleOpen"
        class="w-full rounded-lg bg-zinc-900/70 relative px-4 py-3 text-start ring-1 ring-white/10 focus:ring-2 focus:ring-red-500/60 focus:outline-none hover:ring-white/15 capitalize"
        :aria-expanded="open ? 'true' : 'false'"
      >
        {{ selectedLabel || placeholder }}
        <ChevronDownIcon
          class="size-4 absolute right-3 top-4 transition-transform duration-300"
          :class="open ? 'rotate-180' : ''"
        />
      </button>

      <!-- dropdown -->
      <div v-if="open" class="relative z-10">
        <div
          class="absolute right-0 left-0 top-1 mx-auto w-full bg-zinc-800 rounded-lg overflow-clip"
        >
          <div class="flex flex-col">
            <button
              type="button"
              class="w-full text-start py-2 px-3 text-white/50 hover:bg-zinc-700/30 cursor-auto"
              disabled="true"
            >
              {{ placeholder }}
            </button>

            <button
              v-for="item in dropdownValues"
              :key="item.formValue"
              type="button"
              @click="selectItem(item)"
              class="hover:bg-zinc-700/40 w-full text-start py-2 px-3 capitalize"
            >
              {{ item.text }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute">
      <p v-if="errorText" class="text-red-400 text-xs mt-1 ml-1">
        {{ errorText }}
      </p>
    </div>
  </div>
</template>
