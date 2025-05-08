<!-- components/StepValues.vue -->
<script setup lang="ts">
import { computed } from 'vue';
import { useMainStore } from '@/stores/mainStore';

const store = useMainStore();

/* ── helpers ──────────────────────────────────────────── */
/* The ID of the highlighted choice (your store keeps it as a string) */
const activeChoiceId = computed(() => store.activeChoice as string | undefined);

/* Full Choice object so we can display its label */
const activeChoice = computed(() =>
  store.choices.find((c) => c.id === activeChoiceId.value)
);

/* write-back helper */
function setVal(criTitle: string, val: any) {
  if (!activeChoiceId.value) return;
  store.setValue(criTitle, activeChoiceId.value, val);
}
const emit = defineEmits(['next', 'prev']);
</script>

<template>
  <div class="flex-1 overflow-auto p-6">
    <!-- empty-state -->
    <div
      v-if="!activeChoice"
      class="py-12 text-center text-gray-500"
    >
      Select a choice to start rating.
    </div>

    <!-- rating list -->
    <template v-else>
      <h2 class="mb-6 text-lg font-medium">
        Evaluate
        <span class="text-blue-600">{{ activeChoice.label }}</span>
        for each category
      </h2>

      <!-- card list -->
      <div class="grid grid-cols-2 gap-4">
        <div
          v-for="cri in store.selectedCriteria"
          :key="cri.title"
          class="flex items-start gap-4 rounded-lg border border-gray-300 p-4 shadow-sm"
        >
          <!-- icon -->
          <v-icon
            :name="cri.icon"
            class="text-primary mt-1 shrink-0 text-xl"
          />

          <!-- criterion info & input -->
          <div class="flex-1">
            <div class="flex items-center font-medium">
              {{ cri.title }}
              <span class="ml-2 rounded bg-gray-200/10 px-2 py-0.5 text-xs text-gray-400">
                weight&nbsp;{{ cri.weight }}
              </span>
            </div>
            <div class="mb-2 text-xs text-gray-500">
              {{ cri.description }}
            </div>

            <!-- FactorInput bound to the active choice -->
            <factor-input
              :type="cri.type"
              :model-value="store.values?.[cri.title]?.[activeChoiceId]"
              @update:model-value="(val) => setVal(cri.title, val)"
            />
          </div>
        </div>
      </div>

      <!-- wizard actions -->
      <div class="mt-12 flex flex-wrap justify-between gap-3">
        <v-button
          color="primary"
          @click="emit('prev')"
        >
          Prev Step
        </v-button>
        <v-button
          color="primary"
          @click="emit('next')"
        >
          Continue
        </v-button>
      </div>
    </template>
  </div>
</template>
