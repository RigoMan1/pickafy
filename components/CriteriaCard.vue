<script setup lang="ts">
defineProps<{
  criterion: Criterion;
  criterionIndex: number;
}>();

const { $state } = useMainStore();

function removeCriteria(criterion: Criterion) {
  $state.criteria = $state.criteria.filter((c) => c.title !== criterion.title);
}

/* editing state */
const editing = ref(false);
const toEdit = ref<Criterion | null>(null);

function openEdit(c: Criterion) {
  toEdit.value = c;
  editing.value = true;
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

    <edit-menu>
      <v-button
        id="dialog-edit-criterion"
        label="Edit"
        variant="text"
        class="block text-left"
        @click.stop="openEdit(criterion)"
      />
      <v-button
        label="Delete"
        variant="text"
        color="danger"
        class="block text-left"
        @click.stop="removeCriteria(criterion)"
      />
    </edit-menu>

    <criterion-dialog
      v-model="editing"
      :criterion="toEdit"
      mode="edit"
      @close="editing = false"
    />
  </div>
</template>
