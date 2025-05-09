<script setup lang="ts">
defineProps<{
  criterion: Criterion;
}>();


</script>

<template>
  <div
    class="hover:ring-primary flex items-start space-x-4 rounded-lg p-4 text-left shadow-sm ring-1
      ring-surface-400/40 transition focus:outline-none"
  >
    <!-- :class="{ 'bg-primary-500/20': isSelected }"
    @click="toggle" -->
    <div class="flex-1">
      <v-icon
        :name="criterion.icon"
        class="text-primary pt-1 text-xl"
      />

      <div class="flex-1">
        <h3 class="font-semibold">
          {{ criterion.title }}

          <span class="ml-2 rounded bg-gray-200/10 px-2 py-0.5 text-xs text-gray-400">
            weight&nbsp;{{ criterion.weight }}
          </span>
        </h3>
        <p class="mt-1 text-sm text-gray-600">{{ criterion.description }}</p>
        <p class="mt-1 text-xs italic text-gray-400">Type: {{ criterion.type }}</p>
      </div>

      <div class="mt-4">
        <span class="inline-block text-sm">How important is this?</span>

        <range-slider
          v-model="weight"
          min="0"
          max="10"
          label="Weight"
        />
      </div>
    </div>

    <v-divider
      vertical
      class="!my-0"
    />

    <v-button
      icon="i-mdi-delete"
      variant="text"
      color="danger"
      class="!m-0"
      @click.stop="removeCriteria(criterion)"
    />
  </div>
</template>

<style></style>
