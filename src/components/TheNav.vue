<script setup>
import { ref } from 'vue'
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/vue'
import {
    Bars3Icon,
    XMarkIcon,
    ChevronDownIcon,
} from '@heroicons/vue/24/outline'
import logo from '@/assets/logo.svg'

const navigation = [
    { name: 'Начало', href: '/', current: true },
    {
        name: 'Услуги',
        href: '/услуги',
        current: false,
        children: [
            { name: 'Фолиране', href: '/фолиране', current: false },
            { name: 'Застраховане', href: '/застраховане', current: false },
            { name: 'Плотери', href: '/плотери', current: false },
        ],
    },
    { name: 'Цени', href: '/цени', current: false },
    { name: 'Галерия', href: '/галерия', current: false },
    { name: 'Екипа', href: '/екип', current: false },
    { name: 'Контакт', href: '/контакт', current: false },
]

const openStates = ref({})

const toggleDropdown = (name) => {
    openStates.value[name] = !openStates.value[name]
}

const setOpen = (name, state) => {
    openStates.value[name] = state
}
</script>

<template>
    <Disclosure as="nav" class="relative bg-black border-b border-zinc-800/50" v-slot="{ open }">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
            <div class="relative flex h-20 items-center justify-between">
                <!-- MOBILE MENU BUTTON -->
                <div class="absolute inset-y-0 right-0 flex items-center sm:hidden">
                    <DisclosureButton
                        class="relative inline-flex items-center justify-center p-2.5 text-zinc-400 hover:text-red-500 hover:bg-zinc-900/50 border border-zinc-800 transition-all duration-200">
                        <span class="sr-only">Главно меню</span>
                        <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
                        <XMarkIcon v-else class="block size-6" aria-hidden="true" />
                    </DisclosureButton>
                </div>

                <!-- LOGO -->
                <div class="flex flex-1 items-start justify-start sm:items-stretch sm:justify-between">
                    <div class="flex shrink-0 items-center">
                        <img class="h-14 sm:h-16 w-auto" :src="logo" alt="ИДО ГРУП" />
                    </div>

                    <!-- DESKTOP NAV -->
                    <div class="hidden sm:flex sm:space-x-1 ml-6 my-auto relative">
                        <template v-for="item in navigation" :key="item.name">
                            <!-- ITEMS WITH CHILDREN -->
                            <div v-if="item.children" class="relative group" @mouseenter="setOpen(item.name, true)"
                                @mouseleave="setOpen(item.name, false)">
                                <button @click="toggleDropdown(item.name)"
                                    class="flex items-center space-x-1.5 px-4 h-20 text-zinc-300 hover:text-white transition-all duration-200 relative border-l border-r border-transparent hover:border-zinc-800/50 hover:bg-zinc-900/30">
                                    <span class="text-sm font-medium tracking-wide uppercase">{{ item.name }}</span>
                                    <ChevronDownIcon class="size-3.5 text-zinc-500 transition-transform duration-300"
                                        :class="{ 'rotate-180': openStates[item.name] }" />
                                    <span
                                        class="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                </button>

                                <div class="absolute left-0 right-0 bottom-[-12px] h-[12px]"></div>

                                <transition enter-active-class="transition duration-200 ease-out"
                                    enter-from-class="opacity-0 -translate-y-2"
                                    enter-to-class="opacity-100 translate-y-0"
                                    leave-active-class="transition duration-200 ease-in"
                                    leave-from-class="opacity-100 translate-y-0"
                                    leave-to-class="opacity-0 -translate-y-2">
                                    <div v-show="openStates[item.name]"
                                        class="absolute left-0 top-full w-56 bg-black border border-zinc-800/50 shadow-2xl">
                                        <RouterLink v-for="child in item.children" :key="child.name" :to="child.href"
                                            class="block px-5 py-3 text-sm text-zinc-400 hover:text-white hover:bg-zinc-900 border-b border-zinc-800/30 last:border-b-0 transition-all duration-200 tracking-wide uppercase">
                                            {{ child.name }}
                                        </RouterLink>
                                    </div>
                                </transition>
                            </div>

                            <!-- ITEMS WITHOUT CHILDREN -->
                            <div v-else class="relative group">
                                <RouterLink :to="item.href" :class="[
                                    item.current
                                        ? 'text-red-500 border-zinc-800/50'
                                        : 'text-zinc-300 hover:text-white border-transparent hover:border-zinc-800/50',
                                    'flex items-center px-4 h-20 text-sm font-medium tracking-wide uppercase transition-all duration-200 relative border-l border-r hover:bg-zinc-900/30',
                                ]">
                                    {{ item.name }}
                                    <span
                                        class="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent transition-transform duration-300"
                                        :class="item.current ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'"></span>
                                </RouterLink>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>

        <!-- MOBILE MENU -->
        <DisclosurePanel class="sm:hidden">
            <div class="space-y-0 px-4 pt-3 pb-4 border-t border-zinc-800/50 bg-black">
                <div v-for="item in navigation" :key="item.name">
                    <div v-if="item.children">
                        <button @click="toggleDropdown(item.name)"
                            class="flex w-full items-center justify-between border-b border-zinc-800/30 px-3 py-3 text-sm font-medium text-zinc-300 hover:text-red-500 transition-all duration-200 tracking-wide uppercase">
                            <span>{{ item.name }}</span>
                            <ChevronDownIcon class="size-4 text-zinc-500 transition-transform duration-300"
                                :class="{ 'rotate-180': openStates[item.name] }" />
                        </button>

                        <transition enter-active-class="transition-all duration-300 ease-out"
                            enter-from-class="opacity-0 -translate-y-2 max-h-0"
                            enter-to-class="opacity-100 translate-y-0 max-h-40"
                            leave-active-class="transition-all duration-500 ease-in"
                            leave-from-class="opacity-100 translate-y-0 max-h-40"
                            leave-to-class="opacity-0 -translate-y-2 max-h-0">
                            <div v-show="openStates[item.name]" class="overflow-hidden bg-zinc-900/30">
                                <a v-for="child in item.children" :key="child.name" :href="child.href"
                                    class="block px-6 py-2.5 text-sm text-zinc-400 hover:text-white border-l-2 border-transparent hover:border-red-600 transition-all duration-200 tracking-wide uppercase">
                                    {{ child.name }}
                                </a>
                            </div>
                        </transition>
                    </div>

                    <a v-else :href="item.href" :class="[
                        item.current
                            ? 'text-red-500 border-b-red-600'
                            : 'text-zinc-300 hover:text-white border-b-zinc-800/30',
                        'block px-3 py-3 text-sm font-medium transition-all duration-200 border-b tracking-wide uppercase',
                    ]" :aria-current="item.current ? 'page' : undefined">
                        {{ item.name }}
                    </a>
                </div>
            </div>
        </DisclosurePanel>
    </Disclosure>
</template>