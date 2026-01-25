<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import logo from '@/assets/logo.svg'

const route = useRoute()

const navigation = [
  { name: 'Начало', href: '/' },
  {
    name: 'Услуги',
    href: '/услуги',
    children: [
      { name: 'Фолиране на Автомобил', href: '/ppf' },
      { name: 'Затъмняване на Стъкла', href: '/tinting' },
      { name: 'Авто Детайлинг', href: '/detailing' },
      { name: 'Авто Застраховки', href: '/insurance' },
      // { name: 'Консумативи и Плотери', href: '/плотери' }, // To release in the future
    ],
  },
  { name: 'Портфолио', href: '/portfolio' },
  { name: 'Екип', href: '/about' },
  { name: 'Контакт', href: '/contact' },
]

const openStates = ref({})
// Emits for menu opening. Communicated to App.vue for scroll hide show behavior
const emit = defineEmits(['update:navOpen'])
const desktopOpen = computed(() => Object.values(openStates.value).some(Boolean))

const notifyNavOpen = (mobileOpen) => {
  emit('update:navOpen', mobileOpen || desktopOpen.value)
}

const toggleDropdown = (name) => {
  openStates.value[name] = !openStates.value[name]
}

const setOpen = (name, state) => {
  openStates.value[name] = state
}

// Checks if a parent item should appear active based on current route
const isParentActive = (item) => {
  if (!item.children) return false
  return item.children.some((child) => route.path.startsWith(child.href))
}
let mq
onMounted(() => {
  mq = window.matchMedia('(min-width: 768px)') // tailwind md
  const handler = () => {
    openStates.value = {} // close dropdown/accordions
    emit('update:navOpen', false) // force unlock header
  }
  mq.addEventListener('change', handler)
  onUnmounted(() => mq.removeEventListener('change', handler))
})
</script>

<template>
  <Disclosure as="nav" class="relative bg-zinc-950 border-b border-zinc-800/50" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
      <div class="relative flex h-20 items-center justify-between">
        <!-- MOBILE MENU BUTTON -->
        <div class="absolute inset-y-0 right-0 flex items-center md:hidden">
          <DisclosureButton
            class="relative inline-flex items-center justify-center p-2.5 text-zinc-400 hover:text-red-500 hover:bg-zinc-900/50 border border-zinc-800 transition-all duration-200 rounded-xl"
          >
            <span class="sr-only">{{ notifyNavOpen(open || desktopOpen) }}</span>
            <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
            <XMarkIcon v-else class="block size-6" aria-hidden="true" />
          </DisclosureButton>
        </div>

        <!-- LOGO -->
        <div class="flex flex-1 items-start justify-start sm:items-stretch sm:justify-between">
          <RouterLink to="/" class="flex shrink-0 items-center">
            <img class="h-14 sm:h-16 w-auto" :src="logo" alt="ИДО ГРУП" />
            <div class="ml-4">
              <p class="text-white tracking-widest text-lg/tight font-serif uppercase">ido elite</p>
              <p class="text-white tracking-tighter text-lg/tight font-serif uppercase">
                protection
              </p>
            </div>
          </RouterLink>

          <!-- DESKTOP NAV -->
          <div class="hidden md:flex md:space-x-1 ml-6 my-auto relative">
            <template v-for="item in navigation" :key="item.name">
              <!-- ITEMS WITH CHILDREN -->
              <div
                v-if="item.children"
                class="relative group"
                @mouseenter="setOpen(item.name, true)"
                @mouseleave="setOpen(item.name, false)"
              >
                <button
                  @click="toggleDropdown(item.name)"
                  class="flex items-center space-x-1.5 px-4 h-20 text-zinc-300 hover:text-white transition-all duration-200 relative border-l border-r border-transparent hover:border-zinc-800/50 hover:bg-zinc-900/30"
                  :class="{
                    'text-red-500 border-zinc-800/50': isParentActive(item),
                  }"
                >
                  <span class="text-sm font-medium tracking-wide uppercase">{{ item.name }}</span>
                  <ChevronDownIcon
                    class="size-4 text-zinc-500 transition-transform duration-300 group-hover:text-white"
                    :class="{ 'rotate-180': openStates[item.name] }"
                  />
                  <span
                    class="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent transition-transform duration-300"
                    :class="
                      isParentActive(item) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    "
                  ></span>
                </button>

                <div class="absolute left-0 right-0 bottom-[-12px] h-[12px]"></div>
                <transition
                  enter-active-class="transition duration-200 ease-out"
                  enter-from-class="opacity-0 -translate-y-2"
                  enter-to-class="opacity-100 translate-y-0"
                  leave-active-class="transition duration-200 ease-in"
                  leave-from-class="opacity-100 translate-y-0"
                  leave-to-class="opacity-0 -translate-y-2"
                >
                  <div
                    v-show="openStates[item.name]"
                    class="absolute left-0 top-full w-56 bg-zinc-950 border border-zinc-800/50 shadow-2xl"
                  >
                    <RouterLink
                      v-for="child in item.children"
                      :key="child.name"
                      :to="child.href"
                      custom
                      v-slot="{ href, navigate, isExactActive }"
                    >
                      <a
                        :href="href"
                        @click="navigate($event)"
                        :class="[
                          'block px-5 py-3 text-sm transition-all duration-200 tracking-wide uppercase border-b border-zinc-800/30 last:border-b-0 border-l-2',
                          isExactActive
                            ? 'text-white border-l-red-500 bg-zinc-900/30' // ← left border visible when active
                            : 'text-zinc-400 border-l-transparent hover:text-white hover:bg-zinc-900 hover:border-l-red-500', // ← left border on hover
                        ]"
                      >
                        {{ child.name }}
                      </a>
                    </RouterLink>
                  </div>
                </transition>
              </div>

              <!-- ITEMS WITHOUT CHILDREN -->
              <div v-else class="relative group">
                <RouterLink :to="item.href" custom v-slot="{ href, navigate, isExactActive }">
                  <a
                    :href="href"
                    @click="navigate($event)"
                    :class="[
                      'flex items-center px-4 h-20 text-sm font-medium tracking-wide uppercase transition-all duration-200 relative border-l border-r hover:bg-zinc-900/30',
                      isExactActive
                        ? 'text-white border-zinc-800/50'
                        : 'text-zinc-300 hover:text-white border-transparent hover:border-zinc-800/50',
                    ]"
                  >
                    {{ item.name }}
                    <span
                      class="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent transition-transform duration-300"
                      :class="isExactActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'"
                    ></span>
                  </a>
                </RouterLink>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- MOBILE MENU -->
    <DisclosurePanel class="md:hidden">
      <div class="space-y-0 px-4 pt-3 pb-4 border-t border-zinc-800/50 bg-zinc-950">
        <div v-for="item in navigation" :key="item.name">
          <!-- MOBILE WITH CHILDREN -->
          <div v-if="item.children">
            <button
              @click="toggleDropdown(item.name)"
              class="flex w-full items-center justify-between px-3 py-3 text-sm font-medium uppercase tracking-wide border-b transition-all duration-200"
              :class="
                isParentActive(item)
                  ? 'text-red-500 border-zinc-800/30'
                  : 'text-zinc-300 border-zinc-800/30 hover:text-red-500'
              "
            >
              <span>{{ item.name }}</span>
              <ChevronDownIcon
                class="size-4 text-zinc-500 transition-transform duration-300"
                :class="{ 'rotate-180': openStates[item.name] }"
              />
            </button>

            <transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 -translate-y-2 max-h-0"
              enter-to-class="opacity-100 translate-y-0 max-h-40"
              leave-active-class="transition-all duration-500 ease-in"
              leave-from-class="opacity-100 translate-y-0 max-h-40"
              leave-to-class="opacity-0 -translate-y-2 max-h-0"
            >
              <div v-show="openStates[item.name]" class="overflow-hidden bg-zinc-900/30">
                <RouterLink
                  v-for="child in item.children"
                  :key="child.name"
                  :to="child.href"
                  class="block px-6 py-2.5 text-sm uppercase tracking-wide border-l-2 transition-all duration-200"
                  :class="
                    route.path === child.href
                      ? 'text-white border-red-500 bg-zinc-900/30'
                      : 'text-zinc-400 border-transparent hover:text-white hover:border-red-500'
                  "
                >
                  {{ child.name }}
                </RouterLink>
              </div>
            </transition>
          </div>

          <!-- MOBILE WITHOUT CHILDREN -->
          <RouterLink
            v-else
            :to="item.href"
            class="block px-3 py-3 text-sm font-medium uppercase tracking-wide border-b transition-all duration-200"
            :class="
              route.path === item.href
                ? 'text-red-500 border-b-red-500'
                : 'text-zinc-300 border-b-zinc-800/30 hover:text-red-500 hover:border-b-zinc-700'
            "
          >
            {{ item.name }}
          </RouterLink>
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>
