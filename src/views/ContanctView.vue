<script setup>
import TheButton from '@/components/global/TheButton.vue'
import { computed, reactive } from 'vue'

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
  coverage: '',  // 'cqlo' | 'prednica'
  package: '',   // 'fenders' | 'hood' | 'hood_fenders' | 'custom'
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
</script>

<template>
  <div class="bg-zinc-950 p-6 sm:p-10">
    <form @submit.prevent="submit"
      class="mx-auto max-w-2xl rounded-2xl bg-zinc-950/80 ring-1 ring-white/10 p-6 sm:p-10">
      <div class="mb-8">
        <h2 class="text-3xl font-semibold tracking-tight text-white">
          Контактна форма
        </h2>
        <p class="mt-2 text-sm text-white/60">
          Изпратете запитване и ще се свържем с вас възможно най-скоро.
        </p>
      </div>

      <!-- Normal inputs -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div class="sm:col-span-1">
          <label class="block text-sm font-semibold text-white/80">Име и фамилия</label>
          <input v-model.trim="form.name" type="text" required class="mt-2 w-full rounded-lg bg-zinc-900/70 text-white ring-1 ring-white/10 px-4 py-3
                   placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-500/60"
            placeholder="Напр. Иван Иванов" />
        </div>

        <div class="sm:col-span-1">
          <label class="block text-sm font-semibold text-white/80">Телефон</label>
          <input v-model.trim="form.phone" type="tel" required class="mt-2 w-full rounded-lg bg-zinc-900/70 text-white ring-1 ring-white/10 px-4 py-3
                   placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-500/60"
            placeholder="Напр. +359 88 123 4567" />
        </div>

        <div class="sm:col-span-1">
          <label class="block text-sm font-semibold text-white/80">Имейл</label>
          <input v-model.trim="form.email" type="email" class="mt-2 w-full rounded-lg bg-zinc-900/70 text-white ring-1 ring-white/10 px-4 py-3
                   placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-500/60"
            placeholder="Напр. you@email.com" />
        </div>

        <div class="sm:col-span-1">
          <label class="block text-sm font-semibold text-white/80">Марка / Модел</label>
          <input v-model.trim="form.carMakeModel" type="text" class="mt-2 w-full rounded-lg bg-zinc-900/70 text-white ring-1 ring-white/10 px-4 py-3
                   placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-500/60"
            placeholder="Напр. BMW 3 Series" />
        </div>
      </div>
      <!-- Choose service -->
      <div class="mt-8">
        <h3 class="text-lg font-semibold text-white">Тип на запитване</h3>
        <p class="mt-1 text-sm text-white/60">
          Изберете услугата която желаете. За специфични нужди или въпроси - моля опишете ги в "Съобщение".
        </p>
        <div class="mt-6 flex items-center justify-around gap-4 w-full">
          <div class="flex flex-col-reverse items-center">
            <input id="film" v-model="form.selectedService" value="film" type="radio" class="mt-4 stop-light" />
            <label for="film" class="text-sm text-white/80 font-medium">Фолиране</label>
          </div>

          <div class="flex flex-col-reverse items-center">
            <input id="tint" v-model="form.selectedService" value="darkening" type="radio" class="mt-4 stop-light" />
            <label for="tint" class="text-sm text-white/80 font-medium">Затъмняване</label>
          </div>

          <div class="flex flex-col-reverse items-center">
            <input id="detail" v-model="form.selectedService" value="detailing" type="radio" class="mt-4 stop-light" />
            <label for="detail" class="text-sm text-white/80 font-medium">Детайлинг</label>
          </div>

          <div class="flex flex-col-reverse items-center">
            <input id="insurance" v-model="form.selectedService" value="insurance" type="radio"
              class="mt-4 stop-light" />
            <label for="insurance" class="text-sm text-white/80 font-medium">Застраховки</label>
          </div>

          <div class="flex flex-col-reverse items-center">
            <input id="other" v-model="form.selectedService" value="other" type="radio" class="mt-4 stop-light" />
            <label for="other" class="text-sm text-white/80 font-medium">Друго</label>
          </div>
        </div>

      </div>

      <!-- CarFilm block -->
      <div class="mt-8" v-if="form.selectedService === 'film'">
        <h3 class="text-lg font-semibold text-white">Фолиране</h3>
        <p class="mt-1 text-sm text-white/60">
          Изберете тип и покритие. Ако имате специфично желание — опишете го в “Собщение”.
        </p>

        <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <!-- folio type -->
          <div>
            <label class="block text-sm font-semibold text-white/80">Тип фолио</label>
            <select v-model="form.folioType" required class="mt-2 w-full rounded-lg bg-zinc-900/70 text-white ring-1 ring-white/10 px-4 py-3 text-sm
                     focus:outline-none focus:ring-2 focus:ring-red-500/60">
              <option value="" disabled>Изберете...</option>
              <option value="cveten">Цветен</option>
              <option value="bezcveten">Безцветен</option>
            </select>
          </div>

          <!-- coverage -->
          <div>
            <label class="block text-sm font-semibold text-white/80">Покритие</label>
            <select v-model="form.coverage" required class="mt-2 w-full rounded-lg bg-zinc-900/70 text-white ring-1 ring-white/10 px-4 py-3 text-sm
                     focus:outline-none focus:ring-2 focus:ring-red-500/60">
              <option value="" disabled>Изберете...</option>
              <option value="cqlo">Цялостно</option>
              <option value="prednica">Предница</option>
            </select>
          </div>

          <!-- packages -->
          <div class="sm:col-span-2">
            <label class="block text-sm font-semibold text-white/80">Пакет</label>
            <select v-model="form.package" required class="mt-2 w-full rounded-lg bg-zinc-900/70 text-white ring-1 ring-white/10 px-4 py-3 text-sm
                     focus:outline-none focus:ring-2 focus:ring-red-500/60">
              <option value="" disabled>Изберете...</option>
              <option value="fenders">Калници (fenders)</option>
              <option value="hood">Капак (hood)</option>
              <option value="hood_fenders">Капак + калници (hood & fenders)</option>
              <option value="custom">Персонално (custom)</option>
            </select>
          </div>

          <!-- custom text -->
          <div v-if="needsCustomDetails" class="sm:col-span-2">
            <label class="block text-sm font-semibold text-white/80">
              Персонално – опишете зоните/детайлите
            </label>
            <input v-model.trim="form.customDetails" type="text" required class="mt-2 w-full rounded-lg bg-zinc-900/70 text-white ring-1 ring-white/10 px-4 py-3
                     placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-500/60"
              placeholder="Напр. броня + огледала + прагове" />
          </div>
        </div>
      </div>

      <!-- WindowDarkening block -->
      <div class="mt-8" v-if="form.selectedService === 'darkening'">
        <div>
          <label class="block text-sm font-semibold text-white/80">Тип Затъмняване</label>
          <select v-model="form.windowDarkenType" required class="mt-2 w-full rounded-lg bg-zinc-900/70 text-white ring-1 ring-white/10 px-4 py-3 text-sm
                     focus:outline-none focus:ring-2 focus:ring-red-500/60">
            <option value="" disabled>Изберете...</option>
            <option value="Затъмняване-5%">5% - Най-тъмно</option>
            <option value="Затъмняване-35%">35% - Балансирано затъмняване</option>
            <option value="Затъмняване-50%">50% - Леко затъмняване</option>
            <option value="Затъмняване-70%">70% - UV защита</option>
          </select>
        </div>
      </div>

      <!-- Detailing -->
      <div class="mt-8" v-if="form.selectedService === 'detailing'">
        <div>
          <label class="block text-sm font-semibold text-white/80">Тип Детайлинг</label>
          <select v-model="form.detailingType" required class="mt-2 w-full rounded-lg bg-zinc-900/70 text-white ring-1 ring-white/10 px-4 py-3 text-sm
                     focus:outline-none focus:ring-2 focus:ring-red-500/60">
            <option value="" disabled>Изберете...</option>
            <option value="Екстериорен детайлинг">Екстериорен детайлинг – измиване, гланц, полиране, защита на боята
            </option>
            <option value="Интериорен детайлинг">Интериорен детайлинг – почистване на тапицерия, кожа, килими, пластмаси
              и стъкла</option>
            <option value="Керамично покритие">Керамично покритие – дълготрайна защита, отблъскваща вода, мръсотия и
              химикали</option>
          </select>
        </div>
      </div>
      <!-- Message -->
      <div class="mt-8">
        <label class="block text-sm font-semibold text-white/80">Съобщение</label>
        <textarea v-model.trim="form.message" rows="5" class="mt-2 w-full rounded-lg bg-zinc-900/70 text-white ring-1 ring-white/10 px-4 py-3
                 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-500/60"
          placeholder="Опишете кратко какво искате, срок, локация и др." />
      </div>

      <!-- Promo code -->
      <div class="mt-6">
        <label class="block text-sm font-semibold text-white/80">
          Промо код <span class="text-white/40">(по желание)</span>
        </label>
        <input v-model.trim="form.promoCode" type="text" class="mt-2 w-full rounded-lg bg-zinc-900/70 text-white ring-1 ring-white/10 px-4 py-3
                 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-500/60"
          placeholder="Напр. IDO10" />
      </div>

      <!-- Consent -->
      <div class="mt-6 flex gap-3 items-center">
        <input id="consent" v-model="form.consent" type="checkbox"
          class="stop-light" />
        <label for="consent" class="text-sm text-white/60">
          Съгласен/на съм да бъда потърсен/а по телефон или имейл относно запитването.
        </label>
      </div>

      <!-- Actions -->
      <div class="mt-8 flex flex-col sm:flex-row gap-3">
        <TheButton variant="primary" type="submit">Изпрати запитване</TheButton>

     
        <TheButton variant="secondary" type="reset" @click.prevent="
                  Object.assign(form, {
                    name: '', phone: '', email: '', carMakeModel: '', message: '',
                    folioType: '', coverage: '', package: '', customDetails: '',
                    promoCode: '', consent: true
                  })
                  ">
          Изчисти
        </TheButton>
      </div>
    </form>
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
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;

  /* center dot + glow */
  background: radial-gradient(circle at center,
      rgba(239, 68, 68, 1) 0%,
      rgba(239, 68, 68, 1) 30%,
      rgba(239, 68, 68, 0.6) 40%,
      rgba(239, 68, 68, 0.25) 50%,
      rgba(239, 68, 68, 0) 65%);

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
