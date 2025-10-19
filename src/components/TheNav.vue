<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
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

const route = useRoute()

const navigation = [
    { name: 'Начало', href: '/' },
    {
        name: 'Услуги',
        href: '/услуги',
        children: [
            { name: 'Фолиране', href: '/фолиране' },
            { name: 'Застраховане', href: '/застраховане' },
            { name: 'Плотери', href: '/плотери' },
        ],
    },
    { name: 'Цени', href: '/цени' },
    { name: 'Галерия', href: '/галерия' },
    { name: 'Екипа', href: '/екип' },
    { name: 'Контакт', href: '/контакт' },
]

const openStates = ref({})

const toggleDropdown = (name) => {
    openStates.value[name] = !openStates.value[name]
}

const setOpen = (name, state) => {
    openStates.value[name] = state
}

// ✅ Check if a parent item should appear active based on current route
const isParentActive = (item) => {
    if (!item.children) return false
    return item.children.some((child) => route.path.startsWith(child.href))
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
                                    class="flex items-center space-x-1.5 px-4 h-20 text-zinc-300 hover:text-white transition-all duration-200 relative border-l border-r border-transparent hover:border-zinc-800/50 hover:bg-zinc-900/30"
                                    :class="{
                                        'text-red-500 border-zinc-800/50': isParentActive(item)
                                    }">
                                    <span class="text-sm font-medium tracking-wide uppercase">{{ item.name }}</span>
                                    <ChevronDownIcon class="size-3.5 text-zinc-500 transition-transform duration-300"
                                        :class="{ 'rotate-180': openStates[item.name] }" />
                                    <span
                                        class="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent transition-transform duration-300"
                                        :class="isParentActive(item) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'"></span>
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
                                            class="block px-5 py-3 text-sm text-zinc-400 hover:text-white hover:bg-zinc-900 border-b border-zinc-800/30 last:border-b-0 transition-all duration-200 tracking-wide uppercase"
                                            active-class="text-white border-l-2 border-red-600 bg-zinc-900/30"
                                            exact-active-class="text-white border-l-2 border-red-600 bg-zinc-900/30">
                                            {{ child.name }}
                                        </RouterLink>
                                    </div>
                                </transition>
                            </div>

                            <!-- ITEMS WITHOUT CHILDREN -->
                            <div v-else class="relative group">
                                <RouterLink :to="item.href"
                                    class="flex items-center px-4 h-20 text-sm font-medium tracking-wide uppercase transition-all duration-200 relative border-l border-r hover:bg-zinc-900/30 text-zinc-300 hover:text-white border-transparent hover:border-zinc-800/50"
                                    active-class="text-red-500 border-zinc-800/50"
                                    exact-active-class="text-red-500 border-zinc-800/50">
                                    {{ item.name }}
                                    <span
                                        class="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent transition-transform duration-300 scale-x-0 group-hover:scale-x-100"
                                        :class="$route.path === item.href ? 'scale-x-100' : ''"></span>
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
                            class="flex w-full items-center justify-between border-b border-zinc-800/30 px-3 py-3 text-sm font-medium text-zinc-300 hover:text-red-500 transition-all duration-200 tracking-wide uppercase"
                            :class="{ 'text-red-500': isParentActive(item) }">
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
                                <RouterLink v-for="child in item.children" :key="child.name" :to="child.href"
                                    class="block px-6 py-2.5 text-sm text-zinc-400 hover:text-white border-l-2 border-transparent hover:border-red-600 transition-all duration-200 tracking-wide uppercase"
                                    active-class="text-white border-red-600 bg-zinc-900/30"
                                    exact-active-class="text-white border-red-600 bg-zinc-900/30">
                                    {{ child.name }}
                                </RouterLink>
                            </div>
                        </transition>
                    </div>

                    <RouterLink v-else :to="item.href"
                        class="block px-3 py-3 text-sm font-medium transition-all duration-200 border-b tracking-wide uppercase text-zinc-300 hover:text-white border-b-zinc-800/30 hover:border-b-zinc-700"
                        active-class="text-red-500 border-b-red-600" exact-active-class="text-red-500 border-b-red-600">
                        {{ item.name }}
                    </RouterLink>
                </div>
            </div>
        </DisclosurePanel>
    </Disclosure>
</template>
