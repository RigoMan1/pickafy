<script setup lang="ts">
const { $state, removeChoice } = useMainStore();

defineProps<{
  selectable?: boolean;
}>();

/* editing state */
const editing = ref(false);
const toEdit = ref<Choice | null>(null);

function openEdit(c: Choice) {
  toEdit.value = c;
  editing.value = true;
}
</script>

<template>
  <div
    v-if="!selectable"
    class="grid grid-cols-4 gap-4"
  >
    <choice-dialog
      v-model="editing"
      :choice="toEdit"
      mode="edit"
      @close="editing = false"
    />
    <div
      v-for="c in $state.choices"
      :key="c.id"
    >
      <div class="flex items-center gap-2">
        <div
          class="flex w-full items-center justify-between rounded-lg bg-surface-100 px-3 py-1.5"
        >
          <nuxt-img
            v-if="c.image"
            :src="c.image"
            :alt="c.label"
            class="object-fit mr-3 size-10 rounded-lg"
          />
          <span>{{ c.label }}</span>

          <edit-menu>
            <v-button
              label="Edit"
              variant="text"
              class="block text-left"
              @click.stop="openEdit(c)"
            />
            <v-button
              label="Delete"
              variant="text"
              color="danger"
              class="block text-left"
              @click.stop="removeChoice(c.id)"
            />
          </edit-menu>
        </div>
      </div>
    </div>
  </div>
  <v-group
    v-else
    v-model="$state.activeChoiceId"
    class="mt-4 grid grid-cols-4 gap-4"
    mandatory
  >
    <v-group-item
      v-for="c in $state.choices"
      :key="c.id"
      v-slot="{ isSelected, toggle }"
      :value="c.id"
    >
      <v-button
        class="flex w-full items-center justify-between rounded-lg border px-3 py-1.5"
        color="none"
        variant="none"
        :class="{
          'bg-primary-500 text-white': isSelected,
          'border-surface-300': !isSelected,
        }"
        @click="toggle"
      >
        <nuxt-img
          v-if="c.image"
          :src="c.image"
          :alt="c.label"
          class="object-fit mr-3 size-10 rounded-lg"
        />
        <span>{{ c.label }}</span>
      </v-button>
    </v-group-item>
  </v-group>
</template>

<style></style>
