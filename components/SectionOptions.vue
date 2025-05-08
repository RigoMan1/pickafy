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
    <div
      v-if="!activeChoice"
      class="py-12 text-center text-gray-500"
    >
      Select a choice to start rating.
    </div>

    <template v-else>
      <v-heading
        variant="subtitle-1"
        class="mb-6"
      >
        Evaluate
        <span class="text-blue-600">{{ activeChoice.label }}</span>
        for each category
      </v-heading>

      <div class="grid grid-cols-2 gap-4">
        <div
          v-for="cri in store.selectedCriteria"
          :key="cri.title"
          class="flex items-start gap-4 rounded-lg border border-gray-700/50 p-4 shadow-sm"
        >
          <v-icon
            :name="cri.icon"
            class="text-primary mt-1 shrink-0 text-xl"
          />

          <div class="flex-1">
            <v-heading variant="subtitle-2">
              {{ cri.title }}
            </v-heading>
            <v-text class="mb-2 text-xs text-gray-500">
              {{ cri.description }}
            </v-text>

            <factor-input
              :type="cri.type"
              :model-value="activeChoice?.values?.[cri.title]"
              @update:model-value="
                (val) => store.setValue(cri.title, store.activeChoiceId, val)
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
