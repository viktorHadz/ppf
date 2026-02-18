<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import { useAnalytics } from '@/composables/useAnalytics'
import logo from '@/assets/logo.svg'

const route = useRoute()
const analytics = useAnalytics()

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
watch(desktopOpen, (v) => {
  emit('update:navOpen', v)
})
const closeAll = () => {
  openStates.value = {}
  emit('update:navOpen', false)
}

const onNavClick = (navigate, e, closeDisclosure) => {
  navigate(e)
  if (typeof closeDisclosure === 'function') closeDisclosure()
  closeAll()
}
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
  mq = window.matchMedia('(min-width: 768px)') // tw md
  const handler = () => {
    openStates.value = {} // close dropdown/accordions
    emit('update:navOpen', false) // force unlock header
  }
  mq.addEventListener('change', handler)
  onUnmounted(() => mq.removeEventListener('change', handler))
})
</script>

<template>
  <Disclosure
    as="nav"
    class="relative bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50"
    v-slot="{ open, close }"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
      <div class="relative flex h-20 items-center justify-between">
        <!-- MOBILE MENU BUTTON -->
        <div class="absolute inset-y-0 right-0 flex items-center md:hidden">
          <DisclosureButton
            @click="notifyNavOpen(!open)"
            class="relative inline-flex items-center justify-center p-2.5 text-zinc-400 hover:text-red-500 hover:bg-zinc-900/50 border border-zinc-800 transition-all duration-200 rounded-xl"
          >
            <!-- <span class="sr-only">{{ notifyNavOpen(open || desktopOpen) }}</span> -->
            <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
            <XMarkIcon v-else class="block size-6" aria-hidden="true" />
          </DisclosureButton>
        </div>

        <div class="flex flex-1 items-start justify-start sm:items-stretch sm:justify-between">
          <RouterLink to="/" class="flex shrink-0 items-center">
            <!-- LOGO -->
            <img class="h-14 w-auto" :src="logo" alt="ИДО ГРУП" />
            <div class="ml-4">
              <p class="text-white tracking-widest text-base/tight font-serif uppercase">
                ido elite
              </p>
              <p class="text-white tracking-tighter text-base/tight font-serif uppercase">
                protection
              </p>
            </div>
          </RouterLink>

          <!-- DESKTOP NAV -->
          <div class="hidden md:flex md:space-x-1 ml-6 my-auto relative">
            <template v-for="item in navigation" :key="item.name">
              <div
                v-if="item.children"
                class="relative group"
                @mouseenter="setOpen(item.name, true)"
                @mouseleave="setOpen(item.name, false)"
              >
                <button
                  @click="toggleDropdown(item.name)"
                  class="flex items-center space-x-2 px-4 h-20 text-zinc-300 hover:text-white transition-all duration-200 relative border-l border-r border-transparent hover:border-zinc-800/50 hover:bg-zinc-900/30"
                  :class="{
                    'text-red-500 border-zinc-800/50': isParentActive(item),
                  }"
                >
                  <span class="text-sm font-medium tracking-wide uppercase">{{ item.name }}</span>
                  <ChevronDownIcon
                    class="size-4 text-zinc-400 transition-transform duration-300 group-hover:text-white"
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
                    class="absolute left-0 top-full w-56 bg-zinc-950/80 border border-zinc-800/50 shadow-2xl backdrop-blur-md"
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
                            ? 'text-white border-l-red-500/80 bg-zinc-900/40' // ← left border visible when active
                            : 'text-zinc-400 border-l-transparent hover:text-white hover:bg-zinc-900/40 hover:border-l-red-500/80', // ← left border on hover
                        ]"
                      >
                        {{ child.name }}
                      </a>
                    </RouterLink>
                  </div>
                </transition>
              </div>

              <div v-else class="relative group">
                <RouterLink :to="item.href" custom v-slot="{ href, navigate, isExactActive }">
                  <a
                    :href="href"
                    @click="onNavClick(navigate, $event, close)"
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
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <DisclosurePanel v-show="open" class="md:hidden">
        <div class="border-t border-zinc-800/50 bg-zinc-950/90 backdrop-blur-md">
          <!-- Panel padding container -->
          <div class="px-4 pt-4 pb-5">
            <div class="space-y-1">
              <div v-for="item in navigation" :key="item.name">
                <!-- WITH CHILDREN -->
                <div v-if="item.children" class="rounded-xl overflow-hidden ring-1 ring-white/5">
                  <button
                    @click="toggleDropdown(item.name)"
                    class="flex w-full items-center justify-between px-4 py-3.5 text-sm font-semibold uppercase tracking-wide transition"
                    :class="
                      isParentActive(item)
                        ? 'text-white bg-zinc-900/40'
                        : 'text-zinc-200 bg-zinc-950/40 hover:bg-zinc-900/30'
                    "
                  >
                    <span class="flex items-center gap-3">
                      <span
                        class="h-5 w-[2px] rounded-full"
                        :class="isParentActive(item) ? 'bg-red-500' : 'bg-transparent'"
                      ></span>
                      {{ item.name }}
                    </span>

                    <ChevronDownIcon
                      class="size-5 text-zinc-400 transition-transform duration-300"
                      :class="{ 'rotate-180': openStates[item.name] }"
                    />
                  </button>

                  <transition
                    enter-active-class="transition duration-250 ease-out"
                    enter-from-class="opacity-0 -translate-y-1"
                    enter-to-class="opacity-100 translate-y-0"
                    leave-active-class="transition duration-200 ease-in"
                    leave-from-class="opacity-100 translate-y-0"
                    leave-to-class="opacity-0 -translate-y-1"
                  >
                    <div v-show="openStates[item.name]" class="bg-zinc-900/25">
                      <RouterLink
                        v-for="child in item.children"
                        :key="child.name"
                        :to="child.href"
                        custom
                        v-slot="{ href, navigate, isExactActive }"
                      >
                        <a
                          :href="href"
                          @click="onNavClick(navigate, $event, close)"
                          class="flex items-center gap-3 px-4 py-3 text-sm uppercase tracking-wide transition border-t border-zinc-800/30"
                          :class="
                            isExactActive
                              ? 'text-white bg-zinc-900/35'
                              : 'text-zinc-300 hover:text-white hover:bg-zinc-900/25'
                          "
                        >
                          <span
                            class="h-5 w-[2px] rounded-full"
                            :class="isExactActive ? 'bg-red-500' : 'bg-transparent'"
                          ></span>
                          {{ child.name }}
                        </a>
                      </RouterLink>
                    </div>
                  </transition>
                </div>

                <!-- SIMPLE LINK -->
                <div v-else class="rounded-xl overflow-hidden ring-1 ring-white/5">
                  <RouterLink :to="item.href" custom v-slot="{ href, navigate, isExactActive }">
                    <a
                      :href="href"
                      @click="onNavClick(navigate, $event, close)"
                      class="flex items-center gap-3 px-4 py-3.5 text-sm font-semibold uppercase tracking-wide transition"
                      :class="
                        isExactActive
                          ? 'text-white bg-zinc-900/40'
                          : 'text-zinc-200 bg-zinc-950/40 hover:bg-zinc-900/30 hover:text-white'
                      "
                    >
                      <span
                        class="h-5 w-[2px] rounded-full"
                        :class="isExactActive ? 'bg-red-500' : 'bg-transparent'"
                      ></span>
                      {{ item.name }}
                    </a>
                  </RouterLink>
                </div>
              </div>
            </div>

            <!-- Bottom CTA area -->
            <div
              class="mt-5 rounded-2xl bg-gradient-to-r from-zinc-900/40 via-zinc-950/40 to-zinc-900/40 ring-1 ring-white/5 p-4"
            >
              <p class="text-xs uppercase tracking-widest text-zinc-400">Бърза връзка</p>
              <div class="mt-3 flex gap-3">
                <a
                  href="tel:+359878988996"
                  @click="
                    () => {
                      close()
                      closeAll()
                    }
                  "
                  class="flex-1 inline-flex items-center justify-center rounded-xl bg-white/5 px-4 py-3 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-white/10 transition"
                >
                  Обади се
                </a>
                <RouterLink
                  to="/contact"
                  @click="
                    () => {
                      analytics?.cta('nav_quick_consultation', 'mobile_nav', 'Консултация')
                      close()
                      closeAll()
                    }
                  "
                  class="flex-1 inline-flex items-center justify-center rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white hover:bg-red-400 transition"
                >
                  Консултация
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </DisclosurePanel>
    </transition>
  </Disclosure>
</template>
