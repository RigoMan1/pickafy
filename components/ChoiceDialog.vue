<script setup lang="ts">
import { useMainStore } from '~/stores/mainStore';

interface Choice {
  id: string;
  label: string;
}

const open = defineModel<boolean>();
const props = defineProps<{
  choice?: Choice | null;
  mode: 'add' | 'edit';
}>();
const emit = defineEmits<{ (e: 'close'): void }>();

const store = useMainStore();
const label = ref('');

/* keep local label in-sync when the incoming choice changes */
watch(
  () => props.choice,
  (c) => (label.value = c?.label ?? ''),
  { immediate: true }
);

function reset() {
  label.value = '';
  open.value = false;
}

function confirm() {
  const trimmed = label.value.trim();
  if (!trimmed) return;

  if (props.choice && props.mode === 'edit') {
    store.updateChoice(props.choice.id, { label: trimmed });
  } else {
    store.addChoice(trimmed);
  }

  emit('close');
  reset();
}
</script>

<template>
  <v-dialog
    v-model="open"
    max-width="480px"
  >
    <template
      v-if="props.mode === 'add'"
      #activator="{ props: activatorProps }"
    >
      <v-button
        v-bind="activatorProps"
        variant="outlined"
        color="dark"
        label="Add Item"
        prepend-icon="i-mdi-plus"
      />
    </template>

    <div class="w-[400px] rounded-lg bg-surface-50 p-6 shadow-lg">
      <v-heading variant="heading-4">
        {{ props.choice ? 'Rename option' : 'New Option' }}
      </v-heading>

      <v-text-field
        v-model="label"
        class="mt-4"
        :placeholder="props.choice ? 'label' : 'eg. Product, Decision, etc.'"
        @keyup.enter="confirm"
      />

      <div class="mt-6 flex justify-end gap-2">
        <v-button
          variant="text"
          @click="reset"
        >
          Cancel
        </v-button>
        <v-button
          color="primary"
          :prepend-icon="props.choice ? undefined : 'i-mdi-plus'"
          :disabled="!label.trim()"
          @click="confirm"
        >
          {{ props.choice ? 'Save' : 'Add Item' }}
        </v-button>
      </div>
    </div>
  </v-dialog>
</template>
