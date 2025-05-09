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

    <header-section title="What are you comparing?">
      Start by listing the items you're deciding between. These could be products,
      services, ideas, or anything you're comparing.
    </header-section>

    <div class="mt-4 grid grid-cols-5 gap-4">
      <div
        v-for="c in $state.choices"
        :key="c.id"
      >
        <div class="flex items-center gap-2">
          <div
            class="flex w-full items-center justify-between rounded-lg bg-surface-100/10 px-3 py-1.5"
          >
            <span>{{ c.label }}</span>

            <v-button
              icon="i-mdi-delete"
              variant="text"
              color="danger"
              size="sm"
              @click.stop="removeChoice(c.id)"
            />
          </div>
        </div>
      </div>

      <add-option-dialog />
    </div>

    <v-divider class="my-8" />

    <!-- criteria creation -->

    <header-section title="What are your criteria?">
      What matters most when comparing your options? Add 2–5 criteria to help evaluate
      them.
    </header-section>

    <!-- grid of cards -->

    <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="(criterion, criterionIndex) in $state.criteria"
        :key="criterion.title"
        class="hover:ring-primary flex items-start space-x-4 rounded-lg p-4 text-left shadow-sm ring-1
          ring-surface-400/40 transition focus:outline-none"
      >
        <div class="flex-1">
          <div>
            <div class="flex items-center space-x-2">
              <v-icon
                :name="criterion.icon"
                class="text-primary pt-1 text-xl"
              />

              <h3 class="font-semibold">
                {{ criterion.title }}
              </h3>
            </div>
            <p class="mt-1 text-sm text-gray-600">{{ criterion.description }}</p>
            <p class="mt-1 text-xs italic text-gray-400">Type: {{ criterion.type }}</p>
          </div>

          <v-divider class="my-2" />

          <div>
            <span class="inline-block text-sm text-gray-100">How important is this?</span>
            <range-slider
              v-model="$state.criteria[criterionIndex].weight"
              min="0"
              max="10"
              label="Weight"
              class="mt-1 !bg-surface-800"
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
    <div class="mt-8 flex flex-wrap justify-between gap-3">
      <v-button
        id="dialog-add-criterion"
        variant="outlined"
        prepend-icon="i-mdi-plus"
      >
        Add criterion
      </v-button>

      <add-criterion-dialog
        v-model="criterionDialog"
        @add-criterion="addCriteria"
      />

      <v-button
        color="primary"
        :disabled="store.selectedCriteria.length === 0"
        @click="emit('next')"
      >
        Continue
      </v-button>
    </div>
  </div>
</template>
