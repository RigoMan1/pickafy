<script setup lang="ts">
const open = defineModel<boolean>();
</script>

<template>
  <v-menu
    v-model="open"
    max-width="480px"
    class="flex items-center justify-center"
    :_disable-global-stack="true"
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

    <div class="flex w-[200px] flex-col rounded-lg bg-surface-50 p-2 shadow-lg">
      <slot />
    </div>
  </v-menu>
</template>
