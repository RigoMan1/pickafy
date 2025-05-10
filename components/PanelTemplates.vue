<script setup lang="ts">
import { sampleTemplates } from '~/utils/';
const { $state, loadTemplate } = useMainStore();

const customTemplate = {
  id: 'custom',
  name: 'Custom Template',
  criteria: [],
  choices: [],
};
</script>

<template>
  <div>
    <v-heading
      class="text-surface-800"
      variant="subtitle-1"
    >
      Templates
    </v-heading>

    <div class="mt-6 grid gap-4">
      <v-button
        :variant="$state.activeTemplateId === customTemplate.id ? 'primary' : 'outlined'"
        color="dark"
        class="h-16 rounded-xl !border-surface-300"
        @click="loadTemplate(customTemplate)"
      >
        <template #prepend>
          <div
            class="rounded-lg p-2"
            :class="
              $state.activeTemplateId === customTemplate.id
                ? ''
                : 'bg-surface-200 text-surface-500'
            "
          >
            <v-icon name="i-mdi-file-document-edit-outline" />
          </div>
        </template>
        Custom Template
      </v-button>

      <v-button
        v-for="t in sampleTemplates"
        :key="t.id"
        :variant="$state.activeTemplateId === t.id ? 'primary' : 'outlined'"
        color="dark"
        class="h-16 rounded-xl !border-surface-300"
        @click="loadTemplate(t)"
      >
        {{ t.name }}
      </v-button>
    </div>
  </div>
</template>
