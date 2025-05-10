<script setup lang="ts">
import { ref } from 'vue';

/**
 * Two-way bound rating value (0 – 5, steps of 0.5)
 */
const model = defineModel<number>({ default: 0 });

/**
 * Value shown while hovering, resets on mouse-leave
 */
const hover = ref<number | null>(null);

/**
 * Translate cursor position over a star to an integer or half-step value
 */
function getPartial(index: number, e: MouseEvent): number {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
  const isLeftHalf = e.clientX - rect.left < rect.width / 2;
  return isLeftHalf ? (index - 1) * 2 + 1 : index * 2;
}
/**
 * Decide which icon the star at a given index should display
 */
function starState(index: number): 'full' | 'half' | 'empty' {
  const current = hover.value ?? model.value;
  if (current >= index * 2) return 'full';
  if (current >= index * 2 - 1) return 'half';
  return 'empty';
}
</script>

<template>
  <div class="flex select-none items-center gap-0.5">
    <template
      v-for="i in 5"
      :key="i"
    >
      <button
        type="button"
        class="relative flex size-6 items-center justify-center"
        @mousemove="hover = getPartial(i, $event)"
        @mouseleave="hover = null"
        @click="model = getPartial(i, $event)"
      >
        <v-icon
          name="i-mdi-star"
          class="absolute h-full w-full text-gray-300"
        />
        <v-icon
          v-if="starState(i) !== 'empty'"
          :name="starState(i) === 'half' ? 'i-mdi-star-half' : 'i-mdi-star'"
          class="absolute h-full w-full text-primary-500"
        />
      </button>
    </template>
  </div>
</template>
