<script setup lang="ts">
defineProps<{
  min?: number | string;
  max?: number | string;
}>();
const model = defineModel<number>();
</script>

<template>
  <div
    class="mx-auto flex max-w-md items-center justify-center gap-4 rounded-md border
      border-gray-300/20 bg-white/20 p-2 shadow-sm"
  >
    <input
      v-model.number="model"
      type="range"
      :min="min"
      :max="max"
      class="h-1.5 w-full appearance-none rounded-full bg-gray-300 transition-opacity
        focus:outline-none"
    />
    <p class="text-swm w-8 font-semibold text-primary-300">{{ model }}</p>
  </div>
</template>

<style scoped>
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background-color: theme('colors.primary.500');
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out;
}
input[type='range']::-webkit-slider-thumb:hover {
  box-shadow: 0 0 0 8px rgba(0, 0, 0, 0.16);
}

input[type='range']::-moz-range-thumb {
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background-color: #000000;
  cursor: pointer;
}
</style>
