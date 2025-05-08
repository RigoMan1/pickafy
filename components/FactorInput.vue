<script setup lang="ts">
defineProps<{
  type: 'scale-rating' | 'boolean' | 'percentage' | 'cost' | 'text';
}>();

const model = defineModel<any>();
</script>

<template>
  <div>
    <!-- Scale rating: 0–10 -->

    <range-slider
      v-if="type === 'scale-rating'"
      v-model="model"
      :min="0"
      :max="10"
      step="1"
    />

    <!-- Percentage: 0–100 -->
    <input
      v-else-if="type === 'percentage'"
      v-model.number="model"
      type="range"
      :min="0"
      :max="100"
      :step="1"
      class="w-full"
    />

    <!-- Boolean -->

    <v-group
      v-if="type === 'boolean'"
      v-model="model"
      class="rounded-lg border border-gray-500"
      mandatory
    >
      <v-group-item
        v-for="opt in [false, true]"
        :key="opt ? 1 : 0"
        v-slot="{ toggle, isSelected }"
        :value="opt"
      >
        <v-button
          :variant="isSelected ? 'primary' : 'text'"
          :label="opt ? 'Yes' : 'No'"
          :value="opt"
          size="xs"
          class="w-1/2"
          @click="toggle"
        />
      </v-group-item>
    </v-group>

    <!-- Cost -->
    <v-text-field
      v-else-if="type === 'cost'"
      v-model.number="model"
      type="number"
    />

    <!-- Text (fallback) -->
    <!-- <v-text-field
    v-else
    v-model="model"
  /> -->
  </div>
</template>
