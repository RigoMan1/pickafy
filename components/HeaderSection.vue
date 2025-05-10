<script setup lang="ts">
defineProps<{
  title?: string;
  description?: string;
}>();
</script>

<template>
  <div class="max-w-2xl">
    <v-heading
      class="text-surface-800"
      variant="subtitle-1"
    >
      <slot name="title">
        {{ title }}
      </slot>
    </v-heading>
    <v-text class="mt-1 text-gray-500">
      <slot>
        {{ description }}
      </slot>
    </v-text>
  </div>
</template>

<style></style>
