<script setup>
import founder1 from '@/assets/founders/founder1.webp'
import founder2 from '@/assets/founders/founder2.webp'
const team = [
  {
    name: 'Иван Хинков',
    role: 'Основател и Главен Детайлър',
    image: founder1,
    bio: 'Иван изгражда ИДО ГРУП с фокус върху прецизност, иновация и доверие. Отговаря за качествения контрол, процесите и обучението на нови специалисти.',
  },
  {
    name: 'Орлин Йончев',
    role: 'Основател и Главен Детайлър',
    image: founder2,
    bio: 'Орлин отговаря за комуникацията с клиентите, организацията на проекти и изграждането на дългосрочни партньорства. Вярва, че успешният проект започва с добро разбиране на нуждите.',
  },
]
</script>

<template>
  <main class="isolate bg-zinc-900">
    <section class="bg-zinc-950 py-24 sm:py-32 relative isolate overflow-hidden">
      <!-- Decorative Element Dark -->
      <svg
        class="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-zinc-800/30 sm:stroke-zinc-800/20 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="team-grid"
            width="200"
            height="200"
            x="50%"
            y="-1"
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y="-1" class="overflow-visible fill-zinc-800/20">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            stroke-width="0"
          />
        </svg>
        <rect width="100%" height="100%" stroke-width="0" fill="url(#team-grid)" />
      </svg>

      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="max-w-3xl">
          <h1 class="text-base/7 font-semibold text-red-500 mb-4">За нас</h1>
          <h2 class="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Хората зад ИДО ГРУП
          </h2>
          <p class="mt-4 text-sm/7 text-gray-400">
            Всеки проект е отражение на нашите ценности - внимание към детайла, уважение към клиента
            и стремеж към съвършенство. Екипът на ИДО ГРУП съчетава страст и комбинативно мислене,
            за да предложи решения, които надминават очакванията.
          </p>
        </div>

        <!-- Team Members -->
        <div class="mt-14 space-y-20 sm:space-y-24">
          <article
            v-for="(person, index) in team"
            :key="person.name"
            class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-center"
          >
            <div :class="['lg:col-span-5', index % 2 !== 0 ? 'lg:order-2' : 'lg:order-1']">
              <div class="relative">
                <!-- glow -->
                <div
                  class="absolute -inset-6 rounded-[2rem] bg-linear-to-tr from-red-500/15 via-white/5 to-transparent blur-2xl"
                  aria-hidden="true"
                ></div>

                <div
                  class="relative overflow-hidden rounded-[2rem] bg-white/5 ring-1 ring-white/10 shadow-2xl"
                >
                  <img
                    :src="person.image"
                    :alt="person.name"
                    class="w-full aspect-[4/5] object-cover"
                    loading="lazy"
                  />
                  <!-- overlay fade -->
                  <div
                    class="absolute inset-0 bg-linear-to-t from-zinc-950/70 via-zinc-950/10 to-transparent"
                    aria-hidden="true"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Text -->
            <div
              :class="[
                'lg:col-span-7',
                index % 2 !== 0 ? 'lg:order-1 lg:text-right' : 'lg:order-2 lg:text-left',
                'text-center',
              ]"
            >
              <p class="text-red-500 font-semibold text-sm/7">
                {{ person.role }}
              </p>

              <h3 class="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {{ person.name }}
              </h3>

              <p class="mt-6 text-gray-400 text-base/7 max-w-2xl mx-auto lg:mx-0">
                {{ person.bio }}
              </p>

              <div
                class="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center"
                :class="index % 2 !== 0 ? 'lg:justify-end' : 'lg:justify-start'"
              >
                <RouterLink
                  to="/contact"
                  class="inline-flex items-center justify-center rounded-xl bg-red-500 px-6 py-3 text-sm font-semibold text-white hover:bg-red-400 transition"
                >
                  Консултация
                </RouterLink>

                <RouterLink
                  to="/portfolio"
                  class="inline-flex items-center justify-center rounded-xl bg-white/5 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-white/10 transition"
                >
                  Виж проекти
                </RouterLink>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>
