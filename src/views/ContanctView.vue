<script setup>
import TheButton from '@/components/global/TheButton.vue'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { ref, computed, reactive, onMounted } from 'vue'
import mercEQS from '@/assets/detailingMercEqs.webp'

const selectClass =
  'w-full rounded-lg bg-zinc-900/70 text-white ring-1 ring-white/10 ' +
  'px-4 py-3 pr-10 text-sm appearance-none ' +
  'focus:outline-none focus:ring-2 focus:ring-red-500/60'

// For chevron animation - focus states (kept explicit on purpose)
const folioFocused = ref(false)
const coverageFocused = ref(false)
const packageFocused = ref(false)
const windowDarkenFocused = ref(false)
const detailingFocused = ref(false)

const form = reactive({
  name: '',
  phone: '',
  email: '',
  carMakeModel: '',
  message: '',

  // Service type
  selectedService: '',

  // Window Darkening Type
  windowDarkenType: '',

  // Detailing Type
  detailingType: '',

  // Folirane
  folioType: '', // 'cveten' | 'bezcveten'
  coverage: '', // 'cqlo' | 'prednica'
  package: '', // 'fenders' | 'hood' | 'hood_fenders' | 'custom'
  customDetails: '',

  promoCode: '',
  consent: true,
})
const needsCustomDetails = computed(() => form.package === 'custom')

function submit() {
  // Replace with your API call or email service
  // Example: emit event / fetch / supabase / resend etc.
  console.log('Submit form:', JSON.parse(JSON.stringify(form)))

  // quick reset (optional)
  // Object.assign(form, { ...defaults })
}
onMounted(() => {
  // check if the url contains anything on page load
  // if it does then fill the form values if it corresponds to it
})
</script>

<template>
  <div class="relative bg-zinc-950 py-14 sm:py-20 overflow-hidden">
    <div
      class="pointer-events-none absolute inset-0 [mask-image:radial-gradient(40rem_40rem_at_center,white,transparent)]"
      aria-hidden="true"
    >
      <div
        class="absolute inset-x-0 top-[-8rem] h-[28rem] bg-linear-to-tr from-red-500/20 via-white/5 to-transparent blur-3xl"
      ></div>
    </div>
    <div class="relative mx-auto max-w-7xl px-6 lg:px-8">
      <div
        class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-start rounded-[2rem] bg-white/5 ring-1 ring-white/10 p-6 sm:p-10 shadow-2xl"
      >
        <!-- LEFT: context panel -->
        <aside class="lg:col-span-5">
          <p class="text-xs font-semibold tracking-widest text-red-500 uppercase">
            Свържете се с нас
          </p>

          <h2 class="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Контакт и консултация
          </h2>

          <p class="mt-4 text-sm/7 text-gray-400">
            Изпратете запитване и ще се върнем към вас възможно най-скоро. Ако не сте сигурни кой
            пакет е подходящ — кажете ни марка/модел и какъв резултат искате.
          </p>

          <div
            class="relative overflow-hidden rounded-2xl sm:rounded-[2rem] bg-white/5 ring-1 ring-white/10 shadow-2xl mt-10"
          >
            <img :src="mercEQS" alt="Броня на мерцедес" class="w-full aspect-[4/5] object-cover" />

            <!-- overlay -->
            <div
              class="absolute inset-0 bg-linear-to-t from-zinc-950/60 via-zinc-950/10 to-transparent"
              aria-hidden="true"
            ></div>
          </div>

          <!-- “trust chips” -->
          <ul class="mt-8 space-y-3">
            <li class="flex gap-3 rounded-xl bg-black/20 ring-1 ring-white/10 px-4 py-3">
              <span class="mt-2 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0"></span>
              <p class="text-sm/6 text-gray-200">Отговор в рамките на работния ден</p>
            </li>
            <li class="flex gap-3 rounded-xl bg-black/20 ring-1 ring-white/10 px-4 py-3">
              <span class="mt-2 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0"></span>
              <p class="text-sm/6 text-gray-200">Персонална препоръка според автомобила</p>
            </li>
            <li class="flex gap-3 rounded-xl bg-black/20 ring-1 ring-white/10 px-4 py-3">
              <span class="mt-2 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0"></span>
              <p class="text-sm/6 text-gray-200">Прецизна изработка и премиум материали</p>
            </li>
          </ul>
        </aside>
        <div class="lg:col-span-7">
          <form
            @submit.prevent="submit"
            class="mx-auto max-w-2xl rounded-2xl bg-zinc-950/80 ring-1 ring-white/10 p-6 sm:p-10"
          >
            <!-- Regular inputs -->
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div class="sm:col-span-1">
                <label for="name" class="block text-sm font-semibold text-white/80"
                  >Име и фамилия</label
                >
                <input
                  autocomplete="name"
                  id="name"
                  v-model.trim="form.name"
                  type="text"
                  required
                  class="mt-2 w-full rounded-lg bg-zinc-900/70 text-white ring-1 ring-white/10 px-4 py-3 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-500/60"
                  placeholder="Напр. Иван Иванов"
                />
              </div>
              <div class="sm:col-span-1">
                <label for="phone" class="block text-sm font-semibold text-white/80">Телефон</label>
                <input
                  autocomplete="phone"
                  id="phone"
                  v-model.trim="form.phone"
                  type="tel"
                  required
                  class="mt-2 w-full rounded-lg bg-zinc-900/70 text-white ring-1 ring-white/10 px-4 py-3 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-500/60"
                  placeholder="Напр. +359 88 123 4567"
                />
              </div>
              <div class="sm:col-span-1">
                <label for="email" class="block text-sm font-semibold text-white/80">Имейл</label>
                <input
                  autocomplete="email"
                  id="email"
                  v-model.trim="form.email"
                  type="email"
                  class="mt-2 w-full rounded-lg bg-zinc-900/70 text-white ring-1 ring-white/10 px-4 py-3 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-500/60"
                  placeholder="Напр. you@email.com"
                />
              </div>
              <div class="sm:col-span-1">
                <label for="carMake" class="block text-sm font-semibold text-white/80"
                  >Марка / Модел</label
                >
                <input
                  id="carMake"
                  v-model.trim="form.carMakeModel"
                  type="text"
                  class="mt-2 w-full rounded-lg bg-zinc-900/70 text-white ring-1 ring-white/10 px-4 py-3 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-500/60"
                  placeholder="Напр. BMW 3 Series"
                />
              </div>
            </div>
            <!-- Choose service -->
            <div class="mt-8">
              <h3 class="text-lg font-semibold text-white">Тип на запитване</h3>
              <p class="mt-1 text-sm text-white/60">
                Изберете услугата която желаете. За специфични изисквания - моля опишете ги в
                "Съобщение".
              </p>
              <div class="mt-6 flex items-center justify-around gap-4 w-full">
                <div class="flex flex-col-reverse items-center">
                  <input
                    id="ppf"
                    v-model="form.selectedService"
                    value="ppf"
                    type="radio"
                    class="mt-4 stop-light"
                  />
                  <label for="ppf" class="text-sm text-white/80 font-medium">Фолиране</label>
                </div>
                <div class="flex flex-col-reverse items-center">
                  <input
                    id="tint"
                    v-model="form.selectedService"
                    value="darkening"
                    type="radio"
                    class="mt-4 stop-light"
                  />
                  <label for="tint" class="text-sm text-white/80 font-medium">Затъмняване</label>
                </div>
                <div class="flex flex-col-reverse items-center">
                  <input
                    id="detail"
                    v-model="form.selectedService"
                    value="detailing"
                    type="radio"
                    class="mt-4 stop-light"
                  />
                  <label for="detail" class="text-sm text-white/80 font-medium">Детайлинг</label>
                </div>
                <div class="flex flex-col-reverse items-center">
                  <input
                    id="insurance"
                    v-model="form.selectedService"
                    value="insurance"
                    type="radio"
                    class="mt-4 stop-light"
                  />
                  <label for="insurance" class="text-sm text-white/80 font-medium"
                    >Застраховки</label
                  >
                </div>
                <div class="flex flex-col-reverse items-center">
                  <input
                    id="other"
                    v-model="form.selectedService"
                    value="other"
                    type="radio"
                    class="mt-4 stop-light"
                  />
                  <label for="other" class="text-sm text-white/80 font-medium">Друго</label>
                </div>
              </div>
            </div>
            <!-- PPF block -->
            <div class="mt-8" v-if="form.selectedService === 'ppf'">
              <h3 class="text-lg font-semibold text-white">Фолиране</h3>
              <p class="mt-1 text-sm text-white/60">Изберете тип фолиране и покритие.</p>
              <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <!-- folio type -->
                <div>
                  <label for="foilType" class="block text-sm font-semibold text-white/80"
                    >Тип фолио</label
                  >
                  <div class="relative mt-2">
                    <select
                      id="foilType"
                      v-model="form.folioType"
                      required
                      :class="selectClass"
                      @focus="folioFocused = true"
                      @blur="folioFocused = false"
                    >
                      <option value="" disabled>Изберете...</option>
                      <option value="cveten">Цветен</option>
                      <option value="bezcveten">Безцветен</option>
                    </select>
                    <ChevronDownIcon
                      class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500 transition-transform duration-300"
                      :class="{ 'rotate-180': folioFocused }"
                    />
                  </div>
                </div>
                <!-- coverage -->
                <div>
                  <label for="coverType" class="block text-sm font-semibold text-white/80"
                    >Покритие</label
                  >
                  <div class="relative mt-2">
                    <select
                      id="coverType"
                      v-model="form.coverage"
                      required
                      :class="selectClass"
                      @focus="coverageFocused = true"
                      @blur="coverageFocused = false"
                    >
                      <option value="" disabled>Изберете...</option>
                      <option value="cqlo">Цялостно</option>
                      <option value="prednica">Предница</option>
                    </select>
                    <ChevronDownIcon
                      class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500 transition-transform duration-300"
                      :class="{ 'rotate-180': coverageFocused }"
                    />
                  </div>
                </div>
                <!-- packages -->
                <div class="sm:col-span-2">
                  <label for="packageType" class="block text-sm font-semibold text-white/80"
                    >Пакет</label
                  >
                  <div class="relative mt-2">
                    <select
                      id="packageType"
                      v-model="form.package"
                      required
                      :class="selectClass"
                      @focus="packageFocused = true"
                      @blur="packageFocused = false"
                    >
                      <option value="" disabled>Изберете...</option>
                      <option value="fenders">Калници (fenders)</option>
                      <option value="hood">Капак (hood)</option>
                      <option value="hood_fenders">Капак + калници (hood & fenders)</option>
                      <option value="custom">Персонално (custom)</option>
                    </select>
                    <ChevronDownIcon
                      class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500 transition-transform duration-300"
                      :class="{ 'rotate-180': packageFocused }"
                    />
                  </div>
                </div>
                <!-- custom text -->
                <div v-if="needsCustomDetails" class="sm:col-span-2">
                  <label for="customDetailType" class="block text-sm font-semibold text-white/80">
                    Персонално – опишете зоните/детайлите
                  </label>
                  <input
                    id="customDetailType"
                    v-model.trim="form.customDetails"
                    type="text"
                    required
                    class="mt-2 w-full rounded-lg bg-zinc-900/70 text-white ring-1 ring-white/10 px-4 py-3 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-500/60"
                    placeholder="Напр. броня + огледала + прагове"
                  />
                </div>
              </div>
            </div>
            <!-- WindowDarkening block -->
            <div class="mt-8" v-if="form.selectedService === 'darkening'">
              <label for="darkeningType" class="block text-sm font-semibold text-white/80"
                >Тип Затъмняване</label
              >
              <div class="relative mt-2">
                <select
                  id="darkeningType"
                  v-model="form.windowDarkenType"
                  required
                  :class="selectClass"
                  @focus="windowDarkenFocused = true"
                  @blur="windowDarkenFocused = false"
                >
                  <option value="" disabled>Изберете...</option>
                  <option value="Затъмняване-5%">5% - Най-тъмно</option>
                  <option value="Затъмняване-35%">35% - Балансирано затъмняване</option>
                  <option value="Затъмняване-50%">50% - Леко затъмняване</option>
                  <option value="Затъмняване-70%">70% - UV защита</option>
                </select>
                <ChevronDownIcon
                  class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500 transition-transform duration-300"
                  :class="{ 'rotate-180': windowDarkenFocused }"
                />
              </div>
            </div>
            <!-- Detailing -->
            <div class="mt-8" v-if="form.selectedService === 'detailing'">
              <label for="detailingType" class="block text-sm font-semibold text-white/80"
                >Тип Детайлинг</label
              >
              <div class="relative mt-2">
                <select
                  id="detailingType"
                  v-model="form.detailingType"
                  required
                  :class="selectClass"
                  @focus="detailingFocused = true"
                  @blur="detailingFocused = false"
                >
                  <option value="" disabled>Изберете...</option>
                  <option value="Екстериорен детайлинг">
                    Екстериорен детайлинг – измиване, гланц, полиране, защита на боята
                  </option>
                  <option value="Интериорен детайлинг">
                    Интериорен детайлинг – почистване на тапицерия, кожа, килими, пластмаси и стъкла
                  </option>
                  <option value="Керамично покритие">
                    Керамично покритие – дълготрайна защита, отблъскваща вода, мръсотия и химикали
                  </option>
                </select>
                <ChevronDownIcon
                  class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500 transition-transform duration-300"
                  :class="{ 'rotate-180': detailingFocused }"
                />
              </div>
            </div>
            <!-- Message -->
            <div class="mt-8">
              <label for="message" class="block text-sm font-semibold text-white/80"
                >Съобщение</label
              >
              <textarea
                id="message"
                v-model.trim="form.message"
                rows="5"
                class="mt-2 w-full rounded-lg bg-zinc-900/70 text-white ring-1 ring-white/10 px-4 py-3 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-500/60"
                placeholder="Опишете кратко какво искате, срок, локация и др."
              />
            </div>
            <!-- Promo code -->
            <div class="mt-6">
              <label for="promoCode" class="block text-sm font-semibold text-white/80">
                Промо код <span class="text-white/40">(по желание)</span>
              </label>
              <input
                id="promoCode"
                v-model.trim="form.promoCode"
                type="text"
                class="mt-2 w-full rounded-lg bg-zinc-900/70 text-white ring-1 ring-white/10 px-4 py-3 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-500/60"
                placeholder="Напр. IDO10"
              />
            </div>
            <!-- Consent -->
            <div class="mt-6 flex gap-3 items-center">
              <input id="consent" v-model="form.consent" type="checkbox" class="stop-light" />
              <label for="consent" class="text-sm text-white/60">
                Съгласен/на съм да бъда потърсен/а по телефон или имейл относно запитването.
              </label>
            </div>
            <!-- Actions -->
            <div class="mt-8 flex flex-col sm:flex-row gap-3">
              <TheButton variant="primary" type="submit">Изпрати запитване</TheButton>
              <TheButton
                variant="secondary"
                type="reset"
                @click.prevent="
                  Object.assign(form, {
                    name: '',
                    phone: '',
                    email: '',
                    carMakeModel: '',
                    message: '',
                    folioType: '',
                    coverage: '',
                    package: '',
                    customDetails: '',
                    promoCode: '',
                    consent: true,
                  })
                "
              >
                Изчисти
              </TheButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.stop-light {
  -webkit-appearance: none;
  appearance: none;
  width: 1rem;
  height: 1rem;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgb(24, 24, 27);
  /* zinc-900-ish */
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

/* “LED + glow” layer */
.stop-light::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;

  /* center dot + glow */
  background: radial-gradient(
    circle at center,
    rgba(239, 68, 68, 1) 0%,
    rgba(239, 68, 68, 1) 30%,
    rgba(239, 68, 68, 0.6) 40%,
    rgba(239, 68, 68, 0.25) 50%,
    rgba(239, 68, 68, 0) 65%
  );

  opacity: 0;
  transition: opacity 180ms ease;
}

/* checked = fade in */
.stop-light:checked::after {
  opacity: 1;
}

/* checked glow bloom (around border) */
.stop-light:checked {
  box-shadow: 0 0 10px rgba(239, 68, 68, 0.45);
}

/* accessibility */
.stop-light:focus-visible {
  outline: 2px solid rgba(239, 68, 68, 0.6);
  outline-offset: 2px;
}
</style>
