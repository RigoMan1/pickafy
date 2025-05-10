<script setup lang="ts">
const { $state, removeChoice } = useMainStore();
const store = useMainStore();

function addCriteria(criterion: Criterion) {
  $state.criteria.push(criterion);
}

function removeCriteria(criterion: Criterion) {
  $state.criteria = $state.criteria.filter((c) => c.title !== criterion.title);
}

const emit = defineEmits(['next']);

const criterionDialog = ref(false);
</script>

<template>
  <div>
    <!-- options creation -->

    <div class="flex items-center justify-between">
      <header-section title="What are you comparing?">
        Start by listing the items you're deciding between. These could be products,
        services, ideas, or anything you're comparing.
      </header-section>

      <add-option-dialog />
    </div>

    <options-header class="mt-6" />

    <v-divider class="my-8" />

    <!-- criteria creation -->

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

    <!-- grid of cards -->

    <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div
        v-for="(criterion, criterionIndex) in $state.criteria"
        :key="criterion.title"
        class="flex items-start space-x-4 rounded-lg border border-surface-300 p-4 text-left transition
          focus:outline-none"
      >
        <div class="flex-1">
          <div>
            <div class="flex items-center space-x-2">
              <div
                class="flex size-12 items-center justify-center rounded-full border border-primary-100/70
                  bg-primary-50 text-primary-500"
              >
                <v-icon :name="criterion.icon" />
              </div>

              <v-heading
                class="text-surface-800"
                variant="subtitle-2"
              >
                {{ criterion.title }}
              </v-heading>
            </div>
            <p class="mt-1 text-sm">{{ criterion.description }}</p>
            <p class="mt-1 text-xs italic text-surface-600">Type: {{ criterion.type }}</p>
          </div>

          <v-divider class="my-3" />

          <div>
            <span class="inline-block text-sm text-surface-600">
              How important is this?
            </span>
            <range-slider
              v-model="$state.criteria[criterionIndex].weight"
              min="0"
              max="10"
              class="mt-1 bg-transparent"
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
    </div>

    <!-- actions -->
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
