<script setup lang="ts">
const props = defineProps<{
  min?: number | string;
  max?: number | string;
  label?: string;
}>();

const model = defineModel<number>();

// compute fill percentage
const fillPct = computed(() => {
  const min = Number(props.min ?? 0);
  const max = Number(props.max ?? 100);
  // clamp between 0 and 100
  return Math.round(((model.value - min) / (max - min)) * 100);
});

// build the CSS gradient
const trackStyle = computed(() => {
  const filled = '#FF9772'; // e.g. primary-500
  const unfilled = '#e5e7eb'; // e.g. surface-300
  return `background: linear-gradient(
    to right,
    ${filled} 0%,
    ${filled} ${fillPct.value}%,
    ${unfilled} ${fillPct.value}%,
    ${unfilled} 100%
  )`;
});
</script>

<template>
  <div
    class="mx-auto max-w-md items-center justify-center gap-4 rounded-md border border-surface-300/20
      !bg-surface-100 p-2"
  >
    <div class="text-sm capitalize text-surface-700">
      <slot name="label">{{ label }}</slot>
    </div>

    <div class="flex w-full items-center justify-between gap-4">
      <input
        v-model.number="model"
        type="range"
        :min="min"
        :max="max"
        :style="trackStyle"
        class="h-1.5 w-full appearance-none rounded-full transition-opacity focus:outline-none"
      />

      <p
        class="w-8 rounded bg-surface-200 px-1 text-center text-sm font-medium text-surface-600"
      >
        {{ model }}
      </p>
    </div>
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

/* remove default track styling so our gradient shows */
input[type='range']::-webkit-slider-runnable-track {
  background: transparent;
}
input[type='range']::-moz-range-track {
  background: transparent;
}
</style>
