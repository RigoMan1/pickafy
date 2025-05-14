<script setup lang="ts">
defineProps<{
  criterion: Criterion;
  criterionIndex: number;
}>();

const { $state } = useMainStore();

function removeCriteria(criterion: Criterion) {
  $state.criteria = $state.criteria.filter((c) => c.title !== criterion.title);
}
</script>

<template>
  <div
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
        <span class="inline-block text-sm text-surface-600">How important is this?</span>
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
</template>

<style></style>
