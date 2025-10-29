<script setup>
import TheWelcome from '@/components/global/TheWelcome.vue'
import towelGreen from '@/assets/car-towel-green.webp'
import handToolPpf from '@/assets/hand-tool-ppf.webp'
import wetCar from '@/assets/wet-car.webp'
import tintedWindows from '@/assets/tinted-windows-green-glow.webp'
import towelWrapping from '@/assets/carWrappingRedTowel.webp'
import detailingPurple from '@/assets/detailingPurpl.webp'

const team = [
  {
    name: 'Иван Хинков',
    role: 'Основател и Главен Детайлър',
    image: '/images/team/ivan.jpg',
    bio: 'Иван изгражда ИДО ГРУП с фокус върху прецизност, иновация и доверие. Отговаря за качествения контрол, процесите и обучението на нови специалисти.',
  },
  {
    name: 'Орлин Йончев',
    role: 'Основател и Главен Детайлър',
    image: '/images/team/orlin.jpg',
    bio: 'Орлин отговаря за комуникацията с клиентите, организацията на проекти и изграждането на дългосрочни партньорства. Вярва, че успешният проект започва с добро разбиране на нуждите.',
  },
]
</script>

<template>
  <TheWelcome :show-scroll-down-icon="true">
    <template #title>Екип</template>
    <template #under-title>Хора, които превръщат идеите в реалност</template>
  </TheWelcome>

  <main class="isolate bg-zinc-900">
    <!-- Hero section -->
    <div class="relative isolate -z-10 sm:py-24">
      <div class="grid-el-2"></div>

      <!-- Squares Pattern -->
      <!-- <svg
          class="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-zinc-800 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
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
          <rect
            width="100%"
            height="100%"
            stroke-width="0"
            fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
          />
        </svg> -->
      <!-- red blob -->
      <div
        class="absolute top-0 right-0 left-1/2 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
        aria-hidden="true"
      >
        <div
          class="aspect-801/1036 w-[50.0625rem] bg-linear-to-tr from-red-500 to-zinc-800 opacity-30"
          style="
            clip-path: polygon(
              63.1% 29.5%,
              100% 17.1%,
              76.6% 3%,
              48.4% 0%,
              44.6% 4.7%,
              54.5% 25.3%,
              59.8% 49%,
              55.2% 57.8%,
              44.4% 57.2%,
              27.8% 47.9%,
              35.1% 81.5%,
              0% 97.7%,
              39.2% 100%,
              35.2% 81.4%,
              97.2% 52.8%,
              63.1% 29.5%
            );
          "
        />
      </div>

      <div class="overflow-hidden">
        <div class="mx-auto max-w-7xl px-6 pt-36 pb-32 sm:pt-48 lg:px-8 lg:pt-32">
          <div class="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
            <!-- Text -->
            <div class="relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl">
              <h1 class="text-5xl font-semibold tracking-tight text-pretty text-white sm:text-6xl">
                Прецизна защита. Съвършен детайл.
              </h1>
              <p class="mt-8 text-pretty sm:max-w-md lg:max-w-none text-lg/8 text-gray-400">
                Добре дошли в <span class="text-red-500 font-semibold">ИДО ГРУП</span> – студио за
                луксозно PPF фолиране, детайлинг и защита на автомобили. Комбинираме технологии от
                следващо поколение с безкомпромисен усет към детайла, за да подчертаем вашия стил.
              </p>
            </div>

            <!-- Image stack -->
            <div
              class="mt-14 flex justify-end gap-8 sm:-mt-24 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0"
            >
              <div
                class="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80"
              >
                <div class="relative">
                  <img
                    :src="towelGreen"
                    alt=""
                    class="aspect-2/3 w-full rounded bg-zinc-800 md:hover:scale-[1.02] transition-all duration-500 object-cover shadow-lg ring-1 ring-zinc-700/60"
                  />
                </div>
              </div>

              <div class="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                <div class="relative">
                  <img
                    :src="towelWrapping"
                    alt=""
                    class="aspect-2/3 w-full rounded bg-zinc-800 md:hover:scale-[1.02] transition-all duration-500 object-cover shadow-lg ring-1 ring-zinc-700/60"
                  />
                </div>
                <div class="relative">
                  <img
                    :src="wetCar"
                    alt=""
                    class="aspect-2/3 w-full rounded bg-zinc-800 md:hover:scale-[1.02] transition-all duration-500 object-cover shadow-lg ring-1 ring-zinc-700/60"
                  />
                </div>
              </div>

              <div class="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                <div class="relative">
                  <img
                    :src="handToolPpf"
                    alt=""
                    class="aspect-2/3 w-full rounded bg-zinc-800 md:hover:scale-[1.02] transition-all duration-500 object-cover shadow-lg ring-1 ring-zinc-700/60"
                  />
                </div>
                <div class="relative">
                  <img
                    :src="tintedWindows"
                    alt=""
                    class="aspect-2/3 w-full rounded bg-zinc-800 md:hover:scale-[1.02] transition-all duration-500 object-cover shadow-lg ring-1 ring-zinc-700/60"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content section -->
    <div class="bg-zinc-900 py-28 sm:py-40">
      <div
        class="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col-reverse items-center gap-16 lg:flex-row relative"
      >
        <div class="grid-el-2"></div>

        <!-- Left Image -->
        <div class="w-full lg:w-1/3 flex justify-center isolate">
          <img
            :src="detailingPurple"
            alt="Luxury car protection film application"
            class="sm:w-[70%] rounded object-cover shadow-2xl ring-1 ring-zinc-800 transition-all duration-700 hover:scale-[1.03]"
          />
        </div>

        <!-- Right Text -->
        <div class="w-full lg:w-1/2 text-center lg:text-right isolate">
          <h2 class="text-5xl font-semibold tracking-tight text-pretty text-white sm:text-6xl">
            Нашата мисия
          </h2>
          <p class="mt-8 text-pretty sm:max-w-md lg:max-w-none ml-auto text-lg/8 text-gray-400">
            В <span class="text-red-500 font-semibold">ИДО ГРУП</span> вярваме, че автомобилът е
            повече от превозно средство той е отражение на личен стил и характер. Нашата мисия е да
            съхраним това съвършенство чрез технологии от най-висок клас и майсторство.
          </p>
          <p class="mt-10 text-pretty sm:max-w-md lg:max-w-none ml-auto text-lg/8 text-gray-400">
            Всеки наш проект започва с внимателно разбиране на нуждите на клиента и завършва с
            резултат, който вдъхновява доверие. Независимо дали става дума за защита с PPF фолио,
            стъкло-затъмняване, или корекция на лак ние работим с прецизност, етика и страст към
            съвършенството. За нас детайлът е същността на лукса.
          </p>
        </div>
      </div>
    </div>
  </main>

  <section class="bg-zinc-900 py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <!-- Header -->
      <div class="mx-auto max-w-2xl text-center sm:py-12">
        <p class="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Хората зад ИДО ГРУП
        </p>
        <p class="mt-6 text-lg text-gray-400 leading-relaxed">
          Всеки проект е отражение на нашите ценности – внимание към детайла, уважение към клиента и
          стремеж към съвършенство. Екипът на ИДО ГРУП съчетава страст и комбинативно мислене, за да
          предложи решения, които надминават очакванията.
        </p>
      </div>

      <!-- Team Members -->
      <div class="mt-24 space-y-44">
        <div
          v-for="(person, index) in team"
          :key="person.name"
          :class="[
            'flex flex-col items-center gap-16 lg:gap-32 lg:flex-row',
            index % 2 !== 0 ? 'lg:flex-row-reverse' : '',
          ]"
        >
          <!-- Image -->
          <div class="flex-shrink-0 w-full lg:w-1/2 flex justify-center">
            <img
              :src="person.image"
              :alt="person.name"
              class="w-96 h-96 object-cover rounded shadow-2xl ring-1 ring-zinc-800 transition-transform duration-700 hover:scale-[1.03]"
            />
          </div>

          <!-- Text -->
          <div class="w-full lg:w-1/2 text-center lg:text-left">
            <h3 class="text-3xl font-semibold text-white">{{ person.name }}</h3>
            <p class="text-red-500 font-medium text-lg mt-1">{{ person.role }}</p>
            <p class="mt-6 text-gray-400 leading-relaxed text-lg">{{ person.bio }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- Partners -->
    <div class="relative isolate bg-zinc-900 py-32 sm:py-48 mt-32">
      <!-- <div
        class="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 justify-center overflow-hidden [mask-image:radial-gradient(50%_45%_at_50%_55%,white,transparent)]"
      >
        <svg class="h-[40rem] w-[80rem] flex-none stroke-zinc-800" aria-hidden="true">
          <defs>
            <pattern
              id="grid-pattern"
              width="200"
              height="200"
              x="50%"
              y="50%"
              patternUnits="userSpaceOnUse"
              patternTransform="translate(-100 0)"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y="50%" class="overflow-visible fill-zinc-900">
            <path d="M-300 0h201v201h-201Z M300 200h201v201h-201Z" stroke-width="0" />
          </svg>
          <rect width="100%" height="100%" stroke-width="0" fill="url(#grid-pattern)" />
        </svg>
      </div> -->
      <div class="grid-el-2"></div>
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 class="text-center text-base font-semibold text-red-500">Доверени партньори</h2>
        <p class="mt-4 text-center text-4xl font-semibold text-white">
          Избрани марки, с които работим
        </p>

        <div
          class="mx-auto mt-24 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5"
        >
          <img
            class="col-span-2 max-h-12 w-full object-contain lg:col-span-1 opacity-80 hover:opacity-100 transition"
            src="https://tailwindui.com/plus-assets/img/logos/158x48/transistor-logo-gray-900.svg"
            alt="Transistor"
            width="158"
            height="48"
          />
          <img
            class="col-span-2 max-h-12 w-full object-contain lg:col-span-1 opacity-80 hover:opacity-100 transition"
            src="https://tailwindui.com/plus-assets/img/logos/158x48/reform-logo-gray-900.svg"
            alt="Reform"
            width="158"
            height="48"
          />
          <img
            class="col-span-2 max-h-12 w-full object-contain lg:col-span-1 opacity-80 hover:opacity-100 transition"
            src="https://tailwindui.com/plus-assets/img/logos/158x48/tuple-logo-gray-900.svg"
            alt="Tuple"
            width="158"
            height="48"
          />
          <img
            class="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1 opacity-80 hover:opacity-100 transition"
            src="https://tailwindui.com/plus-assets/img/logos/158x48/savvycal-logo-gray-900.svg"
            alt="SavvyCal"
            width="158"
            height="48"
          />
          <img
            class="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1 opacity-80 hover:opacity-100 transition"
            src="https://tailwindui.com/plus-assets/img/logos/158x48/statamic-logo-gray-900.svg"
            alt="Statamic"
            width="158"
            height="48"
          />
        </div>
      </div>
    </div>
  </section>
</template>
