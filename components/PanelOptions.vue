<script setup lang="ts">
const { $state } = useMainStore();
const store = useMainStore();
</script>

<template>
  <div class="flex w-64 flex-col gap-4 p-4">
    <v-heading variant="subtitle-2">Choices</v-heading>

    <!-- choices list -->
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
        <v-button
          :variant="isSelected ? 'primary' : 'text'"
          :label="c.label"
          :value="c.id"
          class="w-full"
          @click="toggle"
        />
      </v-group-item>
    </v-group>

    <!-- add button -->
    <v-button
      variant="outlined"
      label="+ Add choice"
      @click="store.addChoice()"
    />
  </div>
</template>
