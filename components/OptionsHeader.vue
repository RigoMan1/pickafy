<script setup lang="ts">
const { $state, removeChoice } = useMainStore();

defineProps<{
  selectable?: boolean;
}>();
</script>

<template>
  <div
    v-if="!selectable"
    class="grid grid-cols-4 gap-4"
  >
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
