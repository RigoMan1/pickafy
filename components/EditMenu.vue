<script setup lang="ts">
const open = defineModel<boolean>();
</script>

<template>
  <v-menu
    v-model="open"
    max-width="480px"
    class="flex items-center justify-center"
  >
    <template #activator="{ props: activatorProps }">
      <v-button
        v-bind="activatorProps"
        variant="text"
        color="dark"
        icon="i-mdi-dots-vertical"
        class="rounded-full"
      />
    </template>

    <div class="w-[200px] rounded-lg bg-surface-50 p-2 shadow-lg flex flex-col">
      <slot />
    </div>
  </v-menu>
</template>
