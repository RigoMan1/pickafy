<script setup lang="ts">
import { sampleTemplates } from '~/utils/';
const { $state, loadTemplate } = useMainStore();

const customTemplate = {
  id: 'custom',
  name: 'Custom Comparison',
  description: 'Start from scratch with your own criteria',
  image: '',
  criteria: [],
  choices: [],
};

const emit = defineEmits(['next']);
function handleClick(t: TemplateData) {
  loadTemplate(t);
  emit('next');
}
</script>

<template>
  <div class="w-full px-4 py-8 sm:px-6 lg:px-8">
    <header-section
      title="Your Comparisons"
      class="mb-6"
    >
      No saved comparisons yet. Click “New Comparison” below to get started.
    </header-section>

    <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      <v-button
        variant="outlined"
        color="dark"
        class="h-32 w-full rounded-xl border-dashed border-surface-300 hover:ring-1
          hover:ring-primary-300 sm:h-40"
        @click="handleClick(customTemplate)"
      >
        <template #prepend>
          <v-icon
            name="i-mdi-plus"
            class="mr-2"
          />
        </template>
        New Comparison
      </v-button>
    </div>

    <v-divider class="my-8" />

    <header-section
      title="Starter Comparisons"
      class="mb-6"
    >
      Try one of these templates to get started.
    </header-section>

    <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      <div
        v-for="(t, idx) in sampleTemplates"
        :key="idx"
        class="group w-full cursor-pointer"
        @click="handleClick(t)"
      >
        <div
          class="w-full rounded-2xl bg-surface-100 hover:ring-1 hover:ring-primary-300"
        >
          <div class="relative h-32 w-full overflow-hidden rounded-2xl p-2 sm:h-40">
            <nuxt-img
              class="h-full w-full rounded-xl object-cover"
              :src="t.image"
            />
          </div>

          <div class="p-2">
            <h3
              class="line-clamp-2 text-base font-semibold text-gray-900 transition group-hover:text-primary-600"
            >
              {{ t.name }}
            </h3>

            <v-text
              variant="body-2"
              class="line-clamp-2 text-gray-500"
            >
              {{ t.description || 'Quick-start template' }}
            </v-text>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
