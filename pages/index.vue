<script setup lang="ts">
const slidesRef = ref();
const slide = ref('criteria');
</script>

<template>
  <div class="container">
    <div class="flex justify-center p-4">
      <v-group
        v-model="slide"
        class="flex items-center gap-2 rounded-full bg-surface-100 px-4 py-2 shadow-sm ring-1
          ring-surface-300"
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
            color="dark"
            :class="{ '!text-primary-500': isSelected }"
            @click="slide = item"
          />
          <span
            v-if="index < 2"
            class="mx-1 text-gray-300"
          >
            <v-icon
              name="i-mdi-arrow-right-thin"
              size="sm"
            />
          </span>
        </v-group-item>
      </v-group>
    </div>

    <div class="mt-12 flex h-full space-x-4">
      <!-- side panel -->
      <div class="w-1/3 rounded-lg bg-gray-50 p-8 shadow">
        <panel-templates />
      </div>
      <!-- main -->
      <v-slides
        ref="slidesRef"
        v-model="slide"
        class="h-full w-full rounded-lg bg-gray-50 shadow"
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
          <section-evaluate
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
