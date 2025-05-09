<script setup lang="ts">
const { $state, removeChoice } = useMainStore();
</script>

<template>
  <div class="flex w-64 flex-col gap-4 p-4">
    <v-heading variant="subtitle-2">Options</v-heading>

    <v-group
      v-model="$state.activeChoiceId"
      column
      class="flex flex-col gap-4"
      mandatory
    >
      <v-group-item
        v-for="c in $state.choices"
        v-slot="{ toggle, isSelected }"
        :key="c.id"
        :value="c.id"
      >
        <div class="flex items-center gap-2">
          <v-button
            :variant="isSelected ? 'primary' : 'text'"
            :label="c.label"
            :value="c.id"
            class="flex-1"
            @click="toggle"
          />
          <v-button
            icon="i-mdi-delete"
            variant="text"
            color="danger"
            @click.stop="removeChoice(c.id)"
          />
        </div>
      </v-group-item>
    </v-group>

    <add-option-dialog />
  </div>
</template>
