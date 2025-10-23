<script setup>
import { ArrowDownCircleIcon } from '@heroicons/vue/24/outline'
defineProps({
    showButtons: {
        type: Boolean,
        default: false
    },
    showScrollDownIcon: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <div class="relative bg-black overflow-hidden">
        <!-- Grid pattern with radial mask -->
        <div class="absolute inset-0 grid-el mask-radial-from-40% mask-radial-to-80% mask-radial-at-center"></div>

        <!-- Gradient overlay -->
        <div class="absolute inset-0 bg-gradient-to-b from-zinc-900/50 via-transparent to-black/80"></div>

        <div class="relative px-6 pt-14 lg:px-8">
            <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                <div class="text-center space-y-8">
                    <h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl uppercase">
                        <slot name="title">Default Title</slot>
                    </h1>


                    <p class="text-lg font-medium text-zinc-400 sm:text-xl tracking-wide">
                        <slot name="under-title">Default subtitle text</slot>
                    </p>

                    <div v-if="showButtons" class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            class="px-8 py-3.5 bg-red-600 text-white font-medium text-sm uppercase tracking-wider border border-red-600 transition-all duration-300 hover:bg-red-700 rounded hover:scale-105 active:scale-90">
                            <slot name="primary-button">
                                Бутон 1
                            </slot>
                        </button>

                        <button
                            class="px-8 py-3.5 bg-transparent text-zinc-300 font-medium text-sm uppercase tracking-wider border border-zinc-700 transition-all duration-300  hover:text-black hover:bg-white rounded hover:scale-105 active:scale-90">
                            <slot name="secondary-button">
                                Бутон 2
                            </slot>
                        </button>
                    </div>
                    <div v-if="showScrollDownIcon">
                        <button class="mt-20">
                            <ArrowDownCircleIcon
                                class="size-12  stroke-white transition-all duration-300 hover:stroke-red-600 hover:scale-105 active:scale-90" />
                        </button>
                    </div>

                    <div v-if="$slots.actions" class="mt-10">
                        <slot name="actions"></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.grid-el {
    background-image: url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='29' height='50.115' patternTransform='scale(2) rotate(15)'><rect x='0' y='0' width='100%' height='100%' fill='none'/><path d='M14.498 16.858L0 8.488.002-8.257l14.5-8.374L29-8.26l-.002 16.745zm0 50.06L0 58.548l.002-16.745 14.5-8.373L29 41.8l-.002 16.744zM28.996 41.8l-14.498-8.37.002-16.744L29 8.312l14.498 8.37-.002 16.745zm-29 0l-14.498-8.37.002-16.744L0 8.312l14.498 8.37-.002 16.745z'  stroke-width='0.1' stroke='%23ffffff3d' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(-60,-141.69)' fill='url(%23a)'/></svg>")
}
</style>