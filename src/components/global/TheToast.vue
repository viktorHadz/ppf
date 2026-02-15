<script setup>
import { computed, watch } from 'vue'
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/vue/24/outline'
import { XMarkIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  variant: { type: String, default: 'success' }, // 'success' | 'error' | 'info'
  title: { type: String, default: '' },
  message: { type: String, default: '' },
  timeout: { type: Number, default: 4500 }, // ms | set 0 to disable auto-hide
})

const emit = defineEmits(['update:modelValue'])

const show = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})

const icon = computed(() => {
  if (props.variant === 'error') return ExclamationTriangleIcon
  if (props.variant === 'info') return InformationCircleIcon
  return CheckCircleIcon
})

const iconClass = computed(() => {
  if (props.variant === 'error') return 'text-red-500'
  if (props.variant === 'info') return 'text-sky-500'
  return 'text-emerald-500'
})

let t
watch(
  () => props.modelValue,
  (v) => {
    clearTimeout(t)
    if (v && props.timeout > 0) {
      t = setTimeout(() => (show.value = false), props.timeout)
    }
  },
)
</script>

<template>
  <div
    aria-live="assertive"
    class="pointer-events-none fixed inset-0 z-[200] flex items-end px-4 py-6 sm:items-start sm:p-6"
  >
    <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
      <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-12 opacity-0 sm:translate-y-0 sm:translate-x-12"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="show"
          class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black/10"
        >
          <div class="p-4">
            <div class="flex items-start gap-3">
              <component :is="icon" class="mt-0.5 size-6" :class="iconClass" aria-hidden="true" />
              <div class="min-w-0 flex-1">
                <p class="text-sm font-semibold text-zinc-900">
                  {{ title || (variant === 'error' ? 'Грешка' : 'Успешно') }}
                </p>
                <p v-if="message" class="mt-1 text-sm text-zinc-600">
                  {{ message }}
                </p>
              </div>

              <button
                type="button"
                @click="show = false"
                class="inline-flex rounded-md bg-white text-zinc-400 hover:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-900/20"
              >
                <span class="sr-only">Close</span>
                <XMarkIcon class="size-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
