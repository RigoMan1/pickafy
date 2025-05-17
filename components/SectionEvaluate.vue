<script setup lang="ts">
const store = useMainStore();

const emit = defineEmits(['next', 'prev']);

const activeChoiceId = computed(() => store.activeChoiceId);

const activeChoice = computed(() =>
  store.choices.find((c) => c.id === activeChoiceId.value)
);

onMounted(() => {
  if (!activeChoice.value) {
    store.setActiveChoiceId(store.choices[0]?.id);
  }
});
</script>

<template>
  <div class="flex-1 overflow-auto p-6">
    <div class="flex items-center justify-between">
      <header-section title="These are your options">
        Select an option to evaluate.
      </header-section>

      <!-- <choice-dialog mode="add" /> -->
    </div>

    <options-header
      class="mt-6"
      selectable
    />

    <v-divider class="my-8" />

    <header-section class="mb-6">
      <template #title>
        Evaluate
        <span class="text-primary-600">{{ activeChoice?.label }}</span>
        for each category
      </template>

      Rate each option based on your chosen criteria.
    </header-section>

    <div
      v-if="!activeChoice"
      class="py-12 text-center text-gray-500"
    >
      No options available. Please add options to evaluate.
    </div>

    <div
      v-if="activeChoice && !store.selectedCriteria.length"
      class="py-12 text-center text-gray-500"
    >
      No criteria available. Please select criteria to evaluate.
    </div>

    <template v-if="activeChoice && store.selectedCriteria.length">
      <div class="grid grid-cols-2 gap-4">
        <div
          v-for="cri in store.selectedCriteria"
          :key="cri.id"
          class="flex items-start gap-4 rounded-lg border border-surface-300 p-4"
        >
          <div
            class="flex size-12 items-center justify-center rounded-full border border-primary-100/70
              bg-primary-50 text-primary-500"
          >
            <v-icon
              :name="cri.icon"
              class="text-primary mt-1 shrink-0 text-xl"
            />
          </div>

          <div class="flex-1">
            <v-heading variant="subtitle-2">
              {{ cri.title }}
            </v-heading>
            <v-text class="mb-2 text-xs text-gray-500">
              {{ cri.description }}
            </v-text>

            <factor-input
              :type="cri.type"
              :model-value="activeChoice?.values?.[cri.id]"
              @update:model-value="
                (val) => store.setValue(cri.id, store.activeChoiceId, val)
              "
            />
          </div>
        </div>
      </div>

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
