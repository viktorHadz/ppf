<template>
  <div class="pointer-events-none absolute inset-0">
    <!-- Soft vignette - depth and focus) -->
    <div class="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/55"></div>

    <!-- top/bottom dividers -->
    <div
      class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent"
    ></div>
    <div
      class="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
    ></div>

    <!-- Diagonal “sheen” streak -->
    <div
      class="absolute left-1/2 top-[-30%] h-[140%] w-[60%] -translate-x-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/6 to-transparent blur-2xl"
    ></div>
  </div>
</template>
