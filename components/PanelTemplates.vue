<script setup lang="ts">
import { sampleTemplates } from '~/utils/';
const { loadTemplate } = useMainStore();

const customTemplate = {
  id: 'custom',
  name: 'Custom Template',
  criteria: [],
  choices: [],
};
</script>

<template>
  <div>
    <v-heading variant="subtitle-2">Templates</v-heading>

    <div class="mt-6 grid grid-cols-2 gap-4">
      <div
        class="flex h-24 cursor-pointer items-center justify-center rounded-xl border border-dashed
          border-gray-500 hover:bg-white/20 text-gray-200"
        @click="loadTemplate(customTemplate)"
      >
        <v-text class="text-center">Custom Template</v-text>
      </div>

      <div
        v-for="t in sampleTemplates"
        :key="t.id"
        class="flex h-24 cursor-pointer items-center justify-center rounded-xl bg-white/10
          hover:bg-white/20"
        @click="loadTemplate(t)"
      >
        <v-text class="text-center">
          {{ t.name }}
        </v-text>
      </div>
    </div>
  </div>
</template>
