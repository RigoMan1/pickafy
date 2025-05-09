<script setup lang="ts">
const slidesRef = ref();
const slide = ref('criteria');
</script>

<template>
  <div class="container pt-12">
    <div class="flex justify-center p-4">
      <v-group
        v-model="slide"
        class="items-center space-x-3"
      >
        <v-group-item
          v-for="(item, index) in ['criteria', 'evaluate', 'results']"
          :key="index"
          v-slot="{ isSelected }"
          :value="item"
        >
          <v-button
            :label="item"
            variant="text"
            :class="{ 'text-primary-500': isSelected }"
            @click="slide = item"
          />

          <span class="last:hidden">/</span>
        </v-group-item>
      </v-group>
    </div>

    <div class="mt-12 flex h-full space-x-4">
      <!-- side panel -->
      <div class="flex w-1/3 items-center justify-center rounded-lg bg-surface-500/20">
        <panel-templates v-if="slide === 'criteria'" />
        <panel-options v-if="slide === 'evaluate'" />
      </div>
      <!-- main -->
      <v-slides
        ref="slidesRef"
        v-model="slide"
        class="h-full w-full rounded-lg bg-surface-500/20"
      >
        <v-slide
          class="flex items-center justify-center"
          value="criteria"
        >
          <section-criteria
            class="w-full p-8"
            @next="slide = 'evaluate'"
          />
        </v-slide>

        <v-slide
          class="flex items-center justify-center"
          value="evaluate"
        >
          <section-options
            class="w-full p-8"
            @prev="slide = 'criteria'"
            @next="slide = 'results'"
          />
        </v-slide>

        <v-slide
          class="flex items-center justify-center"
          value="results"
        >
          <section-results class="w-full p-8" />
        </v-slide>
      </v-slides>
    </div>
  </div>
</template>

<style></style>
