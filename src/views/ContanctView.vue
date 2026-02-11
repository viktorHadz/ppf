<script setup>
import TheButton from '@/components/global/TheButton.vue'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { ref, computed, reactive, onMounted, watch } from 'vue'
import mercEQS from '@/assets/detailingMercEqs.webp'
import { useRoute } from 'vue-router'
import { useContactValidation } from '@/composables/useContactValidation'

// TODO: FIX MOBILE RESPONSIVENESS OF FORM = type of enquiry, t&c agreement
// TODO: FIX SUBMIT FORM BUTTON OBJECT.ASSIGN

const selectClass =
  'w-full rounded-lg bg-zinc-900/70 text-white/80 ring-1 ring-white/10 ' +
  'px-4 py-3 pr-10 text-sm appearance-none ' +
  'focus:outline-none focus:ring-2 focus:ring-red-500/60'

// For chevron animation focus states
const folioFocused = ref(false)
const coverageFocused = ref(false)
const packageFocused = ref(false)
const windowDarkenFocused = ref(false)
const detailingFocused = ref(false)

const form = reactive({
  name: '',
  phone: '',
  email: '',
  carMake: '',
  message: '',

  // Service type
  selectedService: '',

  // Window Darkening Type
  tint: '',

  // Detailing Type
  detailingType: '',

  // Folirane
  folioType: '', // 'cveten' | 'bezcveten'
  coverage: '', // 'cqlo' | 'prednica'
  package: '', // 'fenders' | 'hood' | 'hood_fenders' | 'custom'
  customDetails: '',

  promoCode: '',
  // consent: true,
  w: '',
})
const needsCustomDetails = computed(() => form.package === 'custom')
const { errors, validateAll, onBlur, onInput, setService, resetForm } = useContactValidation(form)

async function submit() {
  if (!validateAll()) return

  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    console.error('Contact submit failed:', data)
    // TODO: show UI error here
    return
  }

  console.log('Sent:', data)
  // TODO: show UI success here
}

const route = useRoute()

function setFromQuery() {
  const q = route.query

  if (q.selectedService && typeof q.selectedService === 'string') {
    setService(q.selectedService)
  }

  if (q.tint && typeof q.tint === 'string') {
    // only apply tint if service is darkening
    if (form.selectedService === 'darkening') form.tint = q.tint
  }
}
onMounted(() => {
  setFromQuery()
})
watch(
  () => route.query,
  () => setFromQuery(),
  { immediate: true },
)

watch(
  () => form.package,
  (p) => {
    if (p !== 'custom') form.customDetails = ''
    onBlur('customDetails')
  },
)
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
        <!-- RIGHT: form -->
        <div class="lg:col-span-7">
          <form
            @submit.prevent="submit"
            class="mx-auto max-w-2xl rounded-2xl bg-zinc-950/80 ring-1 ring-white/10 p-6 sm:p-10"
          >
            <!-- Contact Info -->
            <h3 class="text-lg font-semibold text-white">Лична информация</h3>
            <p class="mt-1 text-sm text-white/60">Предоставете данни за контакт</p>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-8">
              <div class="sm:col-span-1 relative">
                <div class="hidden" tabindex="-1">
                  <input type="text" name="w" v-model="form.w" tabindex="-1" autocomplete="off" />
                </div>
                <label for="name" class="block text-sm font-semibold text-white/80"
                  >Име и фамилия</label
                >
                <input
                  autocomplete="name"
                  id="name"
                  v-model.trim="form.name"
                  @blur="onBlur('name')"
                  @input="onInput('name')"
                  type="text"
                  class="mt-2 w-full rounded-lg bg-zinc-900/70 text-white ring-1 ring-white/10 px-4 py-3 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-500/60"
                  placeholder="Напр. Иван Иванов"
                />
                <div class="absolute">
                  <p v-if="errors.name" class="text-red-400 text-xs mt-1">
                    {{ errors.name }}
                  </p>
                </div>
              </div>
              <div class="sm:col-span-1">
                <label for="phone" class="block text-sm font-semibold text-white/80">Телефон</label>
                <input
                  autocomplete="phone"
                  id="phone"
                  v-model.trim="form.phone"
                  @blur="onBlur('phone')"
                  @input="onInput('phone')"
                  type="tel"
                  class="mt-2 w-full rounded-lg bg-zinc-900/70 text-white ring-1 ring-white/10 px-4 py-3 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-500/60"
                  placeholder="Напр. 088 629 9593"
                />
                <div class="absolute">
                  <p v-if="errors.phone" class="text-red-400 text-xs mt-1">
                    {{ errors.phone }}
                  </p>
                </div>
              </div>
              <div class="sm:col-span-1 mt-6">
                <label for="email" class="block text-sm font-semibold text-white/80">Имейл</label>

                <input
                  autocomplete="email"
                  id="email"
                  v-model.trim="form.email"
                  @blur="onBlur('email')"
                  @input="onInput('email')"
                  type="email"
                  class="mt-2 w-full rounded-lg bg-zinc-900/70 text-white ring-1 ring-white/10 px-4 py-3 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-500/60"
                  placeholder="Напр. you@email.com"
                />
                <p v-if="errors.email" class="text-red-400 text-xs mt-1">
                  {{ errors.email }}
                </p>
              </div>
              <div class="sm:col-span-1 mt-6">
                <label for="carMake" class="block text-sm font-semibold text-white/80"
                  >Марка / Модел</label
                >
                <input
                  id="carMake"
                  v-model.trim="form.carMake"
                  @blur="onBlur('carMake')"
                  @input="onInput('carMake')"
                  type="text"
                  class="mt-2 w-full rounded-lg bg-zinc-900/70 text-white ring-1 ring-white/10 px-4 py-3 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-500/60"
                  placeholder="Напр. BMW 3 Series"
                />
                <p v-if="errors.carMake" class="text-red-400 text-xs mt-1">
                  {{ errors.carMake }}
                </p>
              </div>
            </div>
            <!-- Service Types -->
            <div class="mt-10">
              <h3 class="text-lg font-semibold text-white">Тип на запитване</h3>
              <p class="mt-1 text-sm text-white/60">
                Опишете допълнителни изисквания в "Съобщение"
              </p>
              <p v-if="errors.selectedService" class="text-red-400 text-xs mt-2">
                {{ errors.selectedService }}
              </p>
              <div class="mt-8 flex justify-between gap-4 w-full">
                <div class="flex flex-col-reverse items-center">
                  <input
                    id="ppf"
                    name="selectedService"
                    type="radio"
                    class="mt-4 stop-light"
                    :checked="form.selectedService === 'ppf'"
                    @change="setService('ppf')"
                  />
                  <label for="ppf" class="text-sm text-white/80 font-medium">Фолиране</label>
                </div>
                <div class="flex flex-col-reverse items-center">
                  <input
                    id="tint"
                    name="selectedService"
                    type="radio"
                    class="mt-4 stop-light"
                    @change="setService('darkening')"
                    :checked="form.selectedService === 'darkening'"
                  />
                  <label for="tint" class="text-sm text-white/80 font-medium">Затъмняване</label>
                </div>
                <div class="flex flex-col-reverse items-center">
                  <input
                    id="detail"
                    name="selectedService"
                    type="radio"
                    class="mt-4 stop-light"
                    @change="setService('detailing')"
                    :checked="form.selectedService === 'detailing'"
                  />
                  <label for="detail" class="text-sm text-white/80 font-medium">Детайлинг</label>
                </div>
                <div class="flex flex-col-reverse items-center">
                  <input
                    id="insurance"
                    name="selectedService"
                    type="radio"
                    class="mt-4 stop-light"
                    @change="setService('insurance')"
                    :checked="form.selectedService === 'insurance'"
                  />
                  <label for="insurance" class="text-sm text-white/80 font-medium"
                    >Застраховки</label
                  >
                </div>
                <div class="flex flex-col-reverse items-center">
                  <input
                    id="other"
                    name="selectedService"
                    type="radio"
                    class="mt-4 stop-light"
                    @change="setService('other')"
                    :checked="form.selectedService === 'other'"
                  />
                  <label for="other" class="text-sm text-white/80 font-medium">Друго</label>
                </div>
              </div>
            </div>
            <!-- PPF block -->
            <div class="mt-8" v-if="form.selectedService === 'ppf'">
              <h3 class="text-lg font-semibold text-white">Фолиране</h3>
              <p class="mt-1 text-sm text-white/60">Изберете тип фолиране и покритие.</p>
              <div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <!-- Folio type -->
                <div>
                  <label for="foilType" class="block text-sm font-semibold text-white/80"
                    >Тип фолио</label
                  >
                  <div class="relative mt-2">
                    <select
                      id="foilType"
                      v-model="form.folioType"
                      :class="selectClass"
                      @change="onBlur('folioType')"
                      @blur="folioFocused = false"
                      @focus="folioFocused = true"
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
                  <div class="absolute">
                    <p v-if="errors.folioType" class="text-red-400 text-xs mt-1">
                      {{ errors.folioType }}
                    </p>
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
                      :class="selectClass"
                      @change="onBlur('coverage')"
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
                  <div class="absolute">
                    <p v-if="errors.coverage" class="text-red-400 text-xs mt-1">
                      {{ errors.coverage }}
                    </p>
                  </div>
                </div>
                <!-- packages -->
                <div class="sm:col-span-2 mt-4">
                  <label for="packageType" class="block text-sm font-semibold text-white/80"
                    >Пакет</label
                  >
                  <div class="relative mt-2">
                    <select
                      id="packageType"
                      v-model="form.package"
                      :class="selectClass"
                      @change="onBlur('package')"
                      @focus="packageFocused = true"
                      @blur="packageFocused = false"
                    >
                      <option value="" disabled>Изберете...</option>
                      <option value="fenders">Калници</option>
                      <option value="hood">Капак</option>
                      <option value="hood_fenders">Капак и Калници</option>
                      <option value="custom">Персонално</option>
                    </select>
                    <ChevronDownIcon
                      class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500 transition-transform duration-300"
                      :class="{ 'rotate-180': packageFocused }"
                    />
                  </div>
                  <div class="absolute">
                    <p v-if="errors.package" class="text-red-400 text-xs mt-1">
                      {{ errors.package }}
                    </p>
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
                    @blur="onBlur('customDetails')"
                    @input="onInput('customDetails')"
                    class="mt-2 w-full rounded-lg bg-zinc-900/70 text-white ring-1 ring-white/10 px-4 py-3 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-500/60"
                    placeholder="Напр. броня + огледала + прагове"
                  />
                  <p v-if="errors.customDetails" class="text-red-400 text-xs mt-1">
                    {{ errors.customDetails }}
                  </p>
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
                  v-model="form.tint"
                  :class="selectClass"
                  @change="onBlur('tint')"
                  @focus="windowDarkenFocused = true"
                  @blur="windowDarkenFocused = false"
                >
                  <option value="" disabled>Изберете...</option>
                  <option value="5">5% - Най-тъмно</option>
                  <option value="30">30% - Балансирано</option>
                  <option value="50">50% - Леко</option>
                  <option value="70">70%- UV защита</option>
                </select>
                <ChevronDownIcon
                  class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500 transition-transform duration-300"
                  :class="{ 'rotate-180': windowDarkenFocused }"
                />
              </div>
              <div class="absolute">
                <p v-if="errors.tint" class="text-red-400 text-xs mt-1">
                  {{ errors.tint }}
                </p>
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
                  :class="selectClass"
                  @change="onBlur('detailingType')"
                  @focus="detailingFocused = true"
                  @blur="detailingFocused = false"
                >
                  <option value="" disabled>Изберете...</option>
                  <option value="Екстериорен детайлинг">Екстериорен детайлинг</option>
                  <option value="Интериорен детайлинг">Интериорен детайлинг</option>
                  <option value="Керамично покритие">Керамично покритие</option>
                </select>
                <ChevronDownIcon
                  class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500 transition-transform duration-300"
                  :class="{ 'rotate-180': detailingFocused }"
                />
              </div>
              <p v-if="errors.detailingType" class="text-red-400 text-xs mt-1">
                {{ errors.detailingType }}
              </p>
            </div>
            <!-- Message -->
            <div class="mt-12">
              <h3 class="text-lg font-semibold text-white">Съобщение</h3>
              <p class="mt-1 text-sm text-white/60">
                Опишете кратко какво искате, срок, локация и др
              </p>
              <textarea
                id="message"
                v-model.trim="form.message"
                @blur="onBlur('message')"
                @input="onInput('message')"
                rows="5"
                class="mt-2 w-full rounded-lg bg-zinc-900/70 text-white ring-1 ring-white/10 px-4 py-3 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-500/60"
                placeholder="Напр. затъмняване само на предно стъкло"
              />
              <p v-if="errors.message" class="text-red-400 text-xs">
                {{ errors.message }}
              </p>
            </div>
            <!-- Promo code -->
            <div class="mt-10">
              <h3 for="promoCode" class="text-lg font-semibold text-white">Промо код</h3>
              <input
                id="promoCode"
                v-model.trim="form.promoCode"
                @blur="onBlur('promoCode')"
                @input="onInput('promoCode')"
                type="text"
                class="mt-4 w-full rounded-lg bg-zinc-900/70 text-white ring-1 ring-white/10 px-4 py-3 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-500/60"
                placeholder="Напр. IDO10"
              />
              <p v-if="errors.promoCode" class="text-red-400 text-xs mt-1">
                {{ errors.promoCode }}
              </p>
            </div>

            <!-- Actions -->
            <div class="mt-10 flex flex-col sm:flex-row gap-3">
              <TheButton variant="primary" type="submit">Изпрати запитване</TheButton>
              <TheButton variant="secondary" type="reset" @click.prevent="resetForm()">
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
