<script setup>
import DecorDiagSheen from '@/components/global/DecorDiagSheen.vue'
import TheWelcome from '@/components/global/TheWelcome.vue'

import rollsRoyce from '@/assets/small/rollsRoyceFrontCentral.webp'
import mercEqs from '@/assets/small/mercEqsFrontFace.webp'
import mercSClass from '@/assets/small/mercSClassFrontSide.webp'
import pKayenne from '@/assets/small/pKayenneFrontSide.webp'
import pTaykan from '@/assets/small/pTaykanHoodUp.webp'
import bwmX7 from '@/assets/small/bmwX7.webp'

const projects = [
  {
    name: 'Ролс Ройс РС',
    img: rollsRoyce,
  },
  {
    name: 'Мерцедес EQS',
    img: mercEqs,
  },
  {
    name: 'Мерцедес С Класа SClass',
    img: mercSClass,
  },
  {
    name: 'Порше Кайен',
    img: pKayenne,
  },
  {
    name: 'Порше Тайкан',
    img: pTaykan,
  },
  {
    name: 'БМВ Х7',
    img: bwmX7,
  },
]
const hexagons = [
  // row 1
  [
    {
      name: 'r1-hex1',
      background: 'bg-white/10',
    },
    {
      name: 'r1-hex2',
      background: 'bg-white/20',
    },
    {
      name: 'r1-hex3',
      background: 'bg-white/15',
    },
  ],
  // row 2
  [
    {
      name: 'r2-hex1',
      background: 'bg-white/10',
    },
    {
      name: 'r2-hex2',
      background: 'bg-white/20',
    },
    {
      name: 'r2-hex3',
      background: 'bg-white/20',
    },
    {
      name: 'r2-hex4',
      background: 'bg-white/5',
    },
  ],
  // row 3
  [
    {
      name: 'r3-hex1',
      background: 'bg-white/20',
    },
    {
      name: 'r3-hex2',
      background: 'bg-white/20',
    },
  ],
]
</script>
<template>
  <TheWelcome :show-scroll-down-icon="true">
    <template #title>Галерия</template>
    <template #under-title>
      Виж работата ни. Сертифицирани експерти които ще купят на Виктор сладолед
    </template>
  </TheWelcome>

  <section class="bg-zinc-900 py-24 sm:py-40 relative overflow-hidden">
    <!-- Decorative Element Dividers and Sheen -->
    <DecorDiagSheen />
    <!-- Decorative Element Light -->
    <div class="grid-el-2"></div>

    <div class="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
      <!-- <div class="hexagon rotate-60" v-for="project in projects" :key="project">
        <img :src="project.img" alt="Авто детайлинг" class="object-cover h-64" />
      </div> -->
      <!-- Row 1 Hexes -->
      <div class="flex gap-x-4 rotate-12 items-center justify-center relative left-11 top-14">
        <div v-for="hex in hexagons[0]" :key="hex.name">
          <div class="hexagon h-64 relative" :class="[hex.background]">
            <div class="absolute top-1/2 right-1/2 text-red-500">Row1</div>
          </div>
        </div>
      </div>
      <!-- Row 2 Hexes -->
      <div class="flex gap-x-4 rotate-12 items-center justify-center">
        <div v-for="hex in hexagons[1]" :key="hex.name">
          <div class="hexagon h-64 relative" :class="[hex.background]">
            <div class="absolute top-1/2 right-1/2 mx-auto text-red-500">Row2</div>
          </div>
        </div>
      </div>
      <!-- Row 3 Hexes -->
      <div class="flex gap-x-4 rotate-12 items-center justify-center relative right-40 bottom-20">
        <div v-for="hex in hexagons[2]" :key="hex.name">
          <div
            class="hexagon h-64 relative flex justify-center items-center"
            :class="[hex.background]"
          >
            <div class="absolute text-red-500">Row3</div>
          </div>
        </div>
      </div>
      <!-- REUSED -->
      <!-- Row 4 -->
      <div class="flex gap-x-4 rotate-12 items-center justify-center relative left-7 -top-21">
        <div v-for="hex in hexagons[0]" :key="hex.name">
          <div class="hexagon h-64 relative" :class="[hex.background]">
            <div class="absolute top-1/2 right-1/2 text-red-500">Row4</div>
          </div>
        </div>
      </div>
      <!-- Row 5 -->
      <div class="flex gap-x-4 rotate-12 items-center justify-center relative right-4 -top-34">
        <div v-for="hex in hexagons[1]" :key="hex.name">
          <div class="hexagon h-64 relative" :class="[hex.background]">
            <div class="absolute top-1/2 right-1/2 mx-auto text-red-500">Row5</div>
          </div>
        </div>
      </div>
      <div class="flex gap-x-4 rotate-12 items-center justify-center relative right-44 -top-54">
        <div v-for="hex in hexagons[2]" :key="hex.name">
          <div
            class="hexagon h-64 relative flex justify-center items-center"
            :class="[hex.background]"
          >
            <div class="absolute text-red-500">Row6</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
