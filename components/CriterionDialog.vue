<script setup lang="ts">
import { useMainStore } from '~/stores/mainStore';
import { tokenizeInput } from '~/utils';

const open = defineModel<boolean>();

const props = defineProps({
  mode: { type: String as PropType<'add' | 'edit'>, default: 'add' },
  criterion: { type: Object as PropType<Criterion | null>, default: null },
});
const emit = defineEmits<{ (e: 'close'): void }>();

const name = ref('');
const type = ref<FactorType>('scale-rating');

watch(
  () => props.criterion,
  (c) => {
    if (props.mode === 'edit' && c) {
      name.value = c.title;
      type.value = c.type;
    } else {
      name.value = '';
      type.value = 'scale-rating';
    }
  },
  { immediate: true }
);

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

const store = useMainStore();

function reset() {
  name.value = '';
  type.value = 'scale-rating';
  open.value = false;
}

function confirm() {
  const titles = tokenizeInput(name.value);
  if (!titles.length) return;

  if (props.mode === 'edit' && props.criterion) {
    store.updateCriterion(props.criterion.id, {
      title: titles[0],
      type: type.value,
      icon: ICON_MAP[type.value],
    });
  } else {
    titles.forEach((title) =>
      store.addCriterion({ title, type: type.value, icon: ICON_MAP[type.value] })
    );
  }

  emit('close');
  reset();
}
</script>

<template>
  <v-dialog
    v-model="open"
    class="flex items-center justify-center"
  >
    <div class="w-[500px] rounded-lg bg-surface-50 p-6 shadow-lg">
      <v-heading variant="subtitle-2">
        {{ props.mode === 'edit' ? 'Edit Criterion' : 'Add a New Criterion' }}
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
          :prepend-icon="props.mode === 'add' ? 'i-mdi-plus' : undefined"
          :disabled="!name.trim()"
          @click="confirm"
        >
          {{ props.mode === 'edit' ? 'Save' : 'Add criterion' }}
        </v-button>
      </div>
    </div>
  </v-dialog>
</template>
