<script setup lang="ts">
const { $state } = useMainStore();
const store = useMainStore();

function addCriteria(criterion: Criterion) {
  $state.criteria.push(criterion);
}

const emit = defineEmits(['next']);

const criterionDialog = ref(false);
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
      <add-criterion-dialog
        v-model="criterionDialog"
        @add-criterion="addCriteria"
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

    <div class="mt-8 flex justify-end gap-4">
      <v-button
        color="primary"
        label="Continue"
        :disabled="store.selectedCriteria.length === 0"
        @click="emit('next')"
      />
    </div>
  </div>
</template>
