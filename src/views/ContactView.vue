<script setup>
import TheButton from '@/components/global/TheButton.vue'
import { computed, reactive, onMounted, watch } from 'vue'
import mercEQS from '@/assets/detailingMercEqs.webp'
import { useRoute } from 'vue-router'
import { useContactValidation } from '@/composables/useContactValidation'
import DropDown from '@/components/global/DropDown.vue'

// TODO: Add contact details in the form
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

  // PPF
  folioType: '', // 'cveten' | 'bezcveten'
  coverage: '', // 'cqlo' | 'prednica'
  package: '', // 'fenders' | 'hood' | 'hood_fenders' | 'custom'
  customDetails: '',

  promoCode: '',
  consent: false,
  w: '',
})

// --- For dropdowns ---
// PPF
// folioType
const folioType = [
  { text: 'цветно', formValue: 'cveten' },
  { text: 'безцветно', formValue: 'bezcveten' },
]
// coverage
const coverage = [
  { text: 'цяло', formValue: 'cqlo' },
  { text: 'предница', formValue: 'prednica' },
]
// package
const pkg = [
  { text: 'калници', formValue: 'fenders' },
  { text: 'капак', formValue: 'hood' },
  { text: 'Капак и Калници', formValue: 'hood_fenders' },
  { text: 'Персонално', formValue: 'custom' },
]

// Darkening
const tint = [
  { text: '5% - Най-тъмно', formValue: '5' },
  { text: '30% - Балансирано', formValue: '30' },
  { text: '50% - Леко', formValue: '50' },
  { text: '70% - UV защита', formValue: '  70' },
]

// Detailing
const detailing = [
  { text: 'Екстериорен детайлинг', formValue: 'Екстериорен детайлинг' },
  { text: 'Интериорен детайлинг', formValue: 'Интериорен детайлинг' },
  { text: 'Керамично покритие', formValue: 'Керамично покритие' },
]

const needsCustomDetails = computed(() => form.package === 'custom')

const { errors, dirty, validateAll, onBlur, onInput, setService, resetForm } =
  useContactValidation(form)

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

  if (typeof q.selectedService === 'string') {
    setService(q.selectedService) // sets form.selectedService & dirty.selectedService & validates
  }

  if (typeof q.tint === 'string') {
    // only apply tint if service is darkening
    if (form.selectedService === 'darkening') {
      const allowed = new Set(['5', '30', '50', '70'])

      if (allowed.has(q.tint)) {
        form.tint = q.tint
        onBlur('tint') // marks dirty + validates
      } else {
        // if invalid query value  - clears and ignores
        form.tint = ''
      }
    }
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
    if (p !== 'custom') {
      form.customDetails = ''
      errors.customDetails = ''
      dirty.customDetails = false
      return
    }
    if (dirty.customDetails) onInput('customDetails')
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
    <div class="relative mx-auto max-w-7xl px-4 lg:px-8">
      <div
        class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-start rounded-4xl bg-white/5 ring-1 ring-white/10 p-4 sm:p-10 shadow-2xl"
      >
        <!-- LEFT: context panel -->
        <aside class="lg:col-span-5 max-w-2xl mx-auto">
          <h1 class="text-sm font-semibold tracking-widest text-red-500 mt-6 sm:mt-0">
            Запитване за PPF затъмняване и детайлинг
          </h1>
          <h2 class="mt-6 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Контакт и консултация
          </h2>

          <p class="mt-4 text-sm/7 text-gray-400">
            Изпратете запитване за PPF защитно фолио, затъмняване на стъкла, детайлинг или
            застраховки в София. Отговаряме бързо.
          </p>
          <!-- Direct contact: -->
          <p class="font-semibold text-gray-300 mt-8">За директна връзка:</p>

          <ul class="space-y-3 mt-4">
            <li class="flex gap-3 rounded-xl px-4 py-3">
              <span class="mt-2 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0"></span>
              <p class="text-sm/6 text-gray-200">
                <span class="font-semibold">Телефон:</span> +359 878 988 996
              </p>
            </li>
            <li class="flex gap-3 rounded-xl px-4 py-3">
              <span class="mt-2 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0"></span>
              <p class="text-sm/6 text-gray-200">
                <span class="font-semibold">Имейл:</span> info@idogroupbg.com
              </p>
            </li>
          </ul>
          <div
            class="relative overflow-hidden rounded-2xl sm:rounded-[2rem] bg-white/5 ring-1 ring-white/10 shadow-2xl mt-10"
          >
            <img
              :src="mercEQS"
              alt="Броня на мерцедес"
              class="w-full aspect-[3/3] lg:aspect-[4/5] object-cover"
            />

            <!-- overlay -->
            <div
              class="absolute inset-0 bg-linear-to-t from-zinc-950/60 via-zinc-950/10 to-transparent"
              aria-hidden="true"
            ></div>
          </div>
        </aside>
        <!-- RIGHT: form -->
        <div class="lg:col-span-7">
          <form
            @submit.prevent="submit"
            class="mx-auto max-w-2xl rounded-2xl bg-zinc-950/80 ring-1 ring-white/10 px-4 py-6 sm:p-10"
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
              <!-- DropDowns -->
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
              <h3 class="text-lg font-semibold text-white text-center sm:text-start">
                Тип на запитване
              </h3>
              <p class="mt-1 text-sm text-white/60 text-center sm:text-start">
                Опишете допълнителни изисквания в "Съобщение"
              </p>
              <p
                v-if="errors.selectedService"
                class="text-red-400 text-xs mt-2 text-center sm:text-start"
              >
                {{ errors.selectedService }}
              </p>
              <!-- <div class="mt-8 flex justify-between gap-4 w-full"> -->
              <div class="mt-8 grid grid-cols-2 gap-3 sm:flex sm:justify-between sm:gap-4">
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
              <div class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <!-- folioType -->
                <DropDown
                  brow="Тип Фолио"
                  :dropdown-values="folioType"
                  :error-text="errors.folioType"
                  v-model="form.folioType"
                  @blur="onBlur('folioType')"
                />

                <!-- coverage -->
                <DropDown
                  brow="Покритие"
                  :dropdown-values="coverage"
                  :error-text="errors.coverage"
                  v-model="form.coverage"
                  @blur="onBlur('coverage')"
                />

                <!-- packages -->
                <DropDown
                  brow="Пакет"
                  :dropdown-values="pkg"
                  :error-text="errors.package"
                  v-model="form.package"
                  @blur="onBlur('package')"
                />

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
              <DropDown
                brow="Тип Затъмняване"
                :dropdown-values="tint"
                :error-text="errors.tint"
                v-model="form.tint"
                @blur="onBlur('tint')"
              />
            </div>
            <!-- Detailing -->
            <div class="mt-8" v-if="form.selectedService === 'detailing'">
              <DropDown
                brow="Тип Детайлинг"
                :dropdown-values="detailing"
                :error-text="errors.detailingType"
                v-model="form.detailingType"
                @blur="onBlur('detailingType')"
              />
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
            <!-- Consent -->
            <div class="mt-8 flex gap-3 items-center">
              <input
                id="consent"
                v-model="form.consent"
                @blur="onBlur('consent')"
                @input="onInput('consent')"
                type="checkbox"
                class="stop-light shrink-0"
              />
              <label for="consent" class="text-sm text-white/60">
                Давам съгласие да бъда потърсен/а относно запитването ми и приемам
                <RouterLink to="/privacy" class="underline hover:text-red-400"
                  >Политиката за поверителност.</RouterLink
                >
              </label>
              <p v-if="errors.consent" class="text-red-400 text-xs mt-1">
                {{ errors.consent }}
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
