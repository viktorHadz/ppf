<script setup>
import { defineComponent, h } from 'vue'
import TheButton from '@/components/global/TheButton.vue'
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/vue/24/outline'

const navigation = [
  {
    title: 'Услуги',
    subtitles: [
      { name: 'Автофолиране', href: '/ppf' },
      { name: 'Затъмняване на стъкла', href: '/tinting' },
      { name: 'Детайлинг и защита', href: '/detailing' },
      { name: 'Авто застраховки', href: '/insurance' },
    ],
  },
  {
    title: 'Правна информация',
    subtitles: [
      { name: 'Общи условия', href: '/terms' },
      { name: 'Политиката за поверителност', href: '/privacy' },
      { name: 'Политика за бисквитки', href: '/cookies' },
    ],
  },
]

const socials = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61582883043083',
    icon: defineComponent({
      render: () =>
        h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
          h('path', {
            'fill-rule': 'evenodd',
            d: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z',
            'clip-rule': 'evenodd',
          }),
        ]),
    }),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/ido_elite_protection/',
    icon: defineComponent({
      render: () =>
        h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
          h('path', {
            'fill-rule': 'evenodd',
            d: 'M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z',
            'clip-rule': 'evenodd',
          }),
        ]),
    }),
  },
]
</script>
<template>
  <footer class="bg-zinc-950">
    <div class="mx-auto max-w-7xl px-6 pb-8 sm:pb-12 lg:pb-16 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
      <div class="mx-auto max-w-2xl text-center">
        <hgroup>
          <h2 class="text-base/7 font-semibold text-red-500">Свържи се с нас</h2>
          <p class="mt-6 text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
            Професионално затъмняване, съобразено с вашия автомобил
          </p>
        </hgroup>
        <p class="mx-auto mt-12 max-w-xl text-lg/8 text-pretty text-gray-400">
          Избери качество, внимание към детайла и професионализъм. Екипът на
          <span class="font-bold text-red-500">ИДО ГРУП</span> е готов да ти помогне с индивидуални
          решения за защита, стил и комфорт на твоя автомобил.
        </p>
        <div class="mt-12 flex justify-center">
          <RouterLink to="/contact">
            <TheButton variant="primary">Консултация</TheButton>
          </RouterLink>
        </div>
      </div>

      <div class="mt-24 border-t border-zinc-800/20 pt-12">
        <div
          class="mx-auto grid max-w-5xl gap-12 px-2 sm:grid-cols-2 sm:gap-10 sm:px-0 lg:grid-cols-3 lg:gap-12"
        >
          <div v-for="service in navigation" :key="service.title" class="px-2">
            <h3 class="text-sm/6 font-semibold text-red-500">{{ service.title }}</h3>
            <ul role="list" class="mt-4 space-y-3">
              <li v-for="page in service.subtitles" :key="page.href">
                <RouterLink
                  :to="page.href"
                  class="text-sm/6 text-gray-200 hover:underline hover:decoration-red-500 hover:text-white"
                >
                  {{ page.name }}
                </RouterLink>
              </li>
            </ul>
          </div>

          <div class="px-2">
            <h3 class="text-sm/6 font-semibold text-red-500">Контакти</h3>

            <dl class="mt-4 space-y-4 text-sm/6">
              <div class="flex gap-3">
                <PhoneIcon class="mt-0.5 size-5 shrink-0 text-gray-400" aria-hidden="true" />
                <dd>
                  <a
                    href="tel:+359878988996"
                    class="text-gray-200 hover:text-white hover:underline hover:decoration-red-500"
                  >
                    +359 878 988 996
                  </a>
                </dd>
              </div>

              <div class="flex gap-3">
                <EnvelopeIcon class="mt-0.5 size-5 shrink-0 text-gray-400" aria-hidden="true" />
                <dd>
                  <a
                    href="mailto:office@idogroup.bg"
                    class="text-gray-200 hover:text-white hover:underline hover:decoration-red-500"
                  >
                    office@idogroup.bg
                  </a>
                </dd>
              </div>

              <div class="flex gap-3">
                <MapPinIcon class="mt-0.5 size-5 shrink-0 text-gray-400" aria-hidden="true" />
                <dd class="text-gray-200 break-words">
                  Научно-производствена зона Искър, ul. &quot;Munchen&quot; 14, Помещение 19<br />
                  София 1528, BG
                </dd>
              </div>

              <div class="flex gap-3">
                <ClockIcon class="mt-0.5 size-5 shrink-0 text-gray-400" aria-hidden="true" />
                <dd class="text-gray-200">
                  Пон–Пет: <span class="tabular-nums">09:00–18:00</span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div
          class="mt-12 border-t border-zinc-800/20 pt-8 flex gap-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <p class="text-sm/6 text-gray-400">
            &copy; 2025 ИДО ГРУП. <br class="sm:hidden" />
            Всички права запазени.
          </p>

          <div class="flex gap-x-6">
            <a
              v-for="item in socials"
              :key="item.name"
              :href="item.href"
              class="text-gray-400 hover:text-red-500"
            >
              <span class="sr-only">{{ item.name }}</span>
              <component :is="item.icon" class="size-6" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
