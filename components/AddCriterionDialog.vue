<script setup lang="ts">
const open = defineModel<boolean>();

const name = ref('');

const type = ref<FactorType>('scale-rating');

const TYPES: ReadonlyArray<{ label: string; value: FactorType }> = [
  { label: 'Star rating', value: 'scale-rating' },
  { label: 'Yes/No', value: 'boolean' },
  { label: 'Cost', value: 'cost' },
  { label: 'Percentage', value: 'percentage' },
  // { label: 'Text', value: 'text' },
] as const;

const DESCRIPTION_MAP: Record<FactorType, string> = {
  cost: 'Use this for things like price, rent, or travel time.where lower is better.',
  // 'scale-rating': 'Rate from 0 to 10 based on how well the option meets your preference.',
  'scale-rating':
    'Rate from 1 to 5 stars based on how well the option meets your preference.',
  boolean: 'Yes or No. Useful for simple checks like "Has Wi-Fi?" or "Pet-friendly?"',
  percentage: 'Score from 0% to 100% to show how completely an option meets this factor.',
  text: 'Add notes or context. This won’t affect scoring, just for your reference.',
};

const ICON_MAP: Record<FactorType, string> = {
  cost: 'i-mdi-currency-usd',
  'scale-rating': 'i-mdi-star',
  boolean: 'i-mdi-check-circle',
  percentage: 'i-mdi-percent',
  text: 'i-mdi-comment-text-outline',
};

const typeDescription = computed(() => DESCRIPTION_MAP[type.value]);

function reset(): void {
  open.value = false;
  name.value = '';
  type.value = 'scale-rating';
}

const emit = defineEmits<{
  (e: 'addCriterion', value: Criterion): void;
}>();

function confirm(): void {
  if (!name.value.trim()) return;

  emit('addCriterion', {
    id: crypto.randomUUID(),
    title: name.value.trim(),
    description: '',
    icon: ICON_MAP[type.value],
    type: type.value,
    weight: 0,
  });

  reset();
}
</script>

<template>
  <v-dialog
    v-model="open"
    class="flex items-center justify-center"
    activator="#dialog-add-criterion"
  >
    <div class="w-[500px] rounded-lg bg-surface-50 p-6 shadow-lg">
      <v-heading
        class="text-surface-800"
        variant="subtitle-2"
      >
        Add a New Criterion
      </v-heading>

      <v-text-field
        ref="nameInput"
        v-model="name"
        placeholder="e.g. Cost, Quality, etc."
        class="mt-4"
        autofocus
        @keyup.enter="confirm"
      />

      <div class="mt-2">
        <span class="mt-6 inline-block">Type</span>

        <p class="h-8 text-sm text-gray-600">
          {{ typeDescription }}
        </p>
      </div>

      <v-group
        v-model="type"
        class="mt-4 grid grid-cols-3 gap-3"
        mandatory
      >
        <v-group-item
          v-for="item in TYPES"
          :key="item.value"
          v-slot="{ isSelected, toggle }"
          :value="item.value"
        >
          <v-button
            size="sm"
            :variant="isSelected ? 'primary' : 'outlined'"
            :class="{
              '!opacity-70': !isSelected,
            }"
            @click="toggle"
          >
            <v-icon
              :name="ICON_MAP[item.value]"
              class="text-primary"
              size="sm"
            />
            {{ item.label }}
          </v-button>
        </v-group-item>
      </v-group>

      <!-- mt-12 -->

      <v-divider class="my-6" />

      <div class="flex justify-end gap-2">
        <v-button
          variant="text"
          @click="reset"
        >
          Cancel
        </v-button>

        <v-button
          color="primary"
          prepend-icon="i-mdi-plus"
          :disabled="!name.trim()"
          @click="confirm"
        >
          Add criterion
        </v-button>
      </div>
    </div>
  </v-dialog>
</template>
