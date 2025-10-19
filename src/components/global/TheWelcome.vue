<script setup>
defineProps({
    showButtons: {
        type: Boolean,
        default: false
    }
})
</script>

<style scoped>
@keyframes drift {
    0% {
        transform: translate(-100px, -100px);
    }

    25% {
        transform: translate(calc(100vw - 400px), 100px);
    }

    50% {
        transform: translate(calc(100vw - 300px), calc(100% - 300px));
    }

    75% {
        transform: translate(200px, calc(100% - 200px));
    }

    100% {
        transform: translate(-100px, -100px);
    }
}
</style>

<template>
    <div class="relative bg-black overflow-hidden">
        <!-- Subtle grid pattern overlay -->
        <div
            class="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20">
        </div>

        <!-- Animated red glow moving across grid -->
        <div class="absolute inset-0 opacity-30">
            <div
                class="absolute w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[100px] animate-[drift_15s_ease-in-out_infinite]">
            </div>
        </div>

        <!-- Gradient accent -->
        <div class="absolute inset-0 bg-gradient-to-b from-zinc-900/50 via-transparent to-black/80"></div>

        <div class="relative px-6 pt-14 lg:px-8">
            <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                <div class="text-center space-y-8">
                    <!-- Title -->
                    <h1 class="text-5xl font-bold tracking-tight text-white sm:text-7xl uppercase">
                        <slot name="title">
                            Default Title
                        </slot>
                    </h1>

                    <!-- Decorative divider -->
                    <div class="flex items-center justify-center gap-4">
                        <div class="h-[2px] w-16 bg-gradient-to-r from-transparent to-red-600"></div>
                        <div class="h-2 w-2 rotate-45 bg-red-600"></div>
                        <div class="h-[2px] w-16 bg-gradient-to-l from-transparent to-red-600"></div>
                    </div>

                    <!-- Subtitle -->
                    <p class="mt-8 text-lg font-medium text-zinc-400 sm:text-xl tracking-wide">
                        <slot name="under-title">
                            Default subtitle text
                        </slot>
                    </p>

                    <!-- Optional CTA Buttons -->
                    <div v-if="showButtons" class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <slot name="primary-button">
                            <button
                                class="group relative px-8 py-3.5 bg-red-600 text-white font-medium text-sm uppercase tracking-wider border border-red-600 overflow-hidden transition-all duration-300 hover:bg-red-700 hover:border-red-700">
                                <span class="relative z-10">Запази Час</span>
                                <div
                                    class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700">
                                </div>
                            </button>
                        </slot>

                        <slot name="secondary-button">
                            <button
                                class="px-8 py-3.5 bg-transparent text-zinc-300 font-medium text-sm uppercase tracking-wider border border-zinc-700 transition-all duration-300 hover:border-red-600 hover:text-white hover:bg-zinc-900/50">
                                Научи Повече
                            </button>
                        </slot>
                    </div>

                    <!-- Custom action slot -->
                    <div v-if="$slots.actions" class="mt-10">
                        <slot name="actions"></slot>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bottom accent line -->
        <div
            class="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent">
        </div>
    </div>
</template>