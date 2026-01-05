<script setup>
import { computed, reactive } from 'vue'

const form = reactive({
  name: '',
  phone: '',
  email: '',
  carMakeModel: '',
  message: '',

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
          <label class="block text-sm font-semibold text-white/80">Марка / модел</label>
          <input v-model.trim="form.carMakeModel" type="text" class="mt-2 w-full rounded-lg bg-zinc-900/70 text-white ring-1 ring-white/10 px-4 py-3
                   placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-500/60"
            placeholder="Напр. BMW 3 Series" />
        </div>
      </div>

      <!-- Folirane block -->
      <div class="mt-8">
        <h3 class="text-lg font-semibold text-white">Фолиране</h3>
        <p class="mt-1 text-sm text-white/60">
          Изберете тип и покритие. Ако имате специфично желание — опишете го в “Персонално”.
        </p>

        <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <!-- folio type -->
          <div>
            <label class="block text-sm font-semibold text-white/80">Тип фолио</label>
            <select v-model="form.folioType" required class="mt-2 w-full rounded-lg bg-zinc-900/70 text-white ring-1 ring-white/10 px-4 py-3
                     focus:outline-none focus:ring-2 focus:ring-red-500/60">
              <option value="" disabled>Изберете...</option>
              <option value="cveten">Цветен</option>
              <option value="bezcveten">Безцветен</option>
            </select>
          </div>

          <!-- coverage -->
          <div>
            <label class="block text-sm font-semibold text-white/80">Покритие</label>
            <select v-model="form.coverage" required class="mt-2 w-full rounded-lg bg-zinc-900/70 text-white ring-1 ring-white/10 px-4 py-3
                     focus:outline-none focus:ring-2 focus:ring-red-500/60">
              <option value="" disabled>Изберете...</option>
              <option value="cqlo">Цялостно</option>
              <option value="prednica">Предница</option>
            </select>
          </div>

          <!-- packages -->
          <div class="sm:col-span-2">
            <label class="block text-sm font-semibold text-white/80">Пакет</label>
            <select v-model="form.package" required class="mt-2 w-full rounded-lg bg-zinc-900/70 text-white ring-1 ring-white/10 px-4 py-3
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
      <div class="mt-6 flex items-start gap-3">
        <input id="consent" v-model="form.consent" type="checkbox"
          class="mt-1 size-4 rounded border-white/20 bg-zinc-900 text-red-500 focus:ring-red-500/60" />
        <label for="consent" class="text-sm text-white/60">
          Съгласен/на съм да бъда потърсен/а по телефон или имейл относно запитването.
        </label>
      </div>

      <!-- Actions -->
      <div class="mt-8 flex flex-col sm:flex-row gap-3">
        <button type="submit" class="inline-flex items-center justify-center rounded-lg bg-red-600 px-6 py-3 font-semibold text-white
                 hover:bg-red-500 active:scale-[0.99] transition">
          Изпрати запитване
        </button>
        <button type="reset" class="inline-flex items-center justify-center rounded-lg bg-white/5 px-6 py-3 font-semibold text-white/80
                 ring-1 ring-white/10 hover:bg-white/10 active:scale-[0.99] transition" @click.prevent="
                  Object.assign(form, {
                    name: '', phone: '', email: '', carMakeModel: '', message: '',
                    folioType: '', coverage: '', package: '', customDetails: '',
                    promoCode: '', consent: true
                  })
                  ">
          Изчисти
        </button>
      </div>
    </form>
  </div>
</template>
