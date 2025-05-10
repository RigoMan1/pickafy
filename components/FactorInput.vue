<script setup lang="ts">
defineProps<{
  type: FactorType;
}>();

const model = defineModel<any>();
</script>

<template>
  <div>
    <!-- Scale rating: 0–10 -->

    <input-rating
      v-if="type === 'scale-rating'"
      v-model="model"
      :min="0"
      :max="10"
    />

    <!-- Percentage: 0–100 -->
    <range-slider
      v-else-if="type === 'percentage'"
      v-model.number="model"
      :min="0"
      :max="100"
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
      class="max-w-48"
    />

    <!-- Text (fallback) -->
    <!-- <v-text-field
    v-else
    v-model="model"
  /> -->
  </div>
</template>
