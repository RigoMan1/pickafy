<script setup lang="ts">
const open = defineModel<boolean>();
const name = ref('');

function reset(): void {
  name.value = '';
  open.value = false;
}

const store = useMainStore();
function confirm(): void {
  if (!name.value.trim()) return;

  store.addChoice(name.value);

  reset();
}
</script>

<template>
  <v-dialog
    v-model="open"
    max-width="480px"
    class="flex items-center justify-center"
  >
    <template #activator="{ props: activatorProps }">
      <v-button
        v-bind="activatorProps"
        variant="outlined"
        label="+ Add Item"
      />
    </template>

    <div class="w-[400px] rounded-lg bg-surface-800 p-6 shadow-lg">
      <v-heading variant="heading-4">New Option</v-heading>

      <v-text-field
        v-model="name"
        label="Name"
        placeholder="eg. Product, Decision, etc."
        class="mt-4"
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
          prepend-icon="i-mdi-plus"
          :disabled="!name.trim()"
          @click="confirm"
        >
          Add Item
        </v-button>
      </div>
    </div>
  </v-dialog>
</template>
