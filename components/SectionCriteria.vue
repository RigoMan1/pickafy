<script setup lang="ts">
const { $state } = useMainStore();
const store = useMainStore();

const emit = defineEmits(['next']);

const isCriterionDialogOpen = ref(false);

const missingRequirements = computed(() => {
  const messages: string[] = [];

  if ($state.choices.length === 0) {
    messages.push('Add at least one option');
  }
  if ($state.criteria.length === 0) {
    messages.push('Add at least one criterion');
  }
  if (store.selectedCriteria.length === 0) {
    messages.push('Assign weight to at least one criterion');
  }

  return messages;
});
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <header-section title="What are you comparing?">
        Start by listing the items you're deciding between. These could be products,
        services, ideas, or anything you're comparing.
      </header-section>

      <choice-dialog mode="add" />
    </div>

    <options-header class="mt-6" />

    <v-divider class="my-8" />

    <div class="flex items-center justify-between">
      <header-section title="What are your criteria?">
        What matters most when comparing your options?
      </header-section>

      <v-button
        id="dialog-add-criterion"
        label="Add criterion"
        variant="outlined"
        color="dark"
        prepend-icon="i-mdi-plus"
      />
      <criterion-dialog
        v-model="isCriterionDialogOpen"
        activator="#dialog-add-criterion"
      />
    </div>

    <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <criteria-card
        v-for="(criterion, criterionIndex) in $state.criteria"
        :key="criterion.id"
        :criterion="criterion"
        :criterion-index="criterionIndex"
      />
    </div>

    <!-- <div class="mt-8 flex justify-end gap-4">
      <v-button
        color="primary"
        label="Continue"
        :disabled="store.selectedCriteria.length === 0"
        @click="emit('next')"
      />
    </div>

    <client-only>
      <v-alert
        v-if="missingRequirements.length"
        class="!-mb-4 mt-4"
      >
        <ul class="list-disc pl-5">
          <li
            v-for="(msg, idx) in missingRequirements"
            :key="idx"
          >
            {{ msg }}
          </li>
        </ul>
      </v-alert>
    </client-only> -->

    <div class="mt-8 flex items-end justify-end gap-4">
      <client-only>
        <v-alert
          v-if="missingRequirements.length"
          class="w-full"
        >
          <ul class="list-disc pl-5">
            <li
              v-for="(msg, idx) in missingRequirements"
              :key="idx"
            >
              {{ msg }}
            </li>
          </ul>
        </v-alert>
      </client-only>

      <v-button
        color="primary"
        label="Continue"
        :disabled="store.selectedCriteria.length"
        @click="emit('next')"
      />
    </div>
  </div>
</template>
