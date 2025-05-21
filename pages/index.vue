<script setup lang="ts">
const slidesRef = ref();
const slide = ref('home');

watch(slide, async () => {
  await nextTick();
  if (slidesRef.value?.$el) {
    slidesRef.value.$el.scrollTop = 0;
  }
});
</script>

<template>
  <div class="container">
    <div class="flex justify-center p-4">
      <v-group
        v-model="slide"
        class="flex items-center rounded-full bg-surface-100 py-2 shadow-sm ring-1 ring-surface-300
          sm:gap-2 sm:px-4"
      >
        <v-group-item
          v-slot="{ isSelected }"
          value="home"
        >
          <v-button
            icon="i-mdi-home"
            variant="text"
            :class="{ '!text-primary-500': isSelected }"
            class="rounded-full"
            @click="slide = 'home'"
          />
          <v-divider vertical />
        </v-group-item>

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
            class="rounded-full"
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

    <div class="mt-2 flex gap-4 lg:mt-6">
      <!-- main -->
      <v-slides
        ref="slidesRef"
        v-model="slide"
        class="max-h-[calc(100vh-10rem)] w-full overflow-y-auto overflow-x-hidden rounded-lg bg-gray-50
          shadow sm:max-h-[calc(100vh-14rem)]"
      >
        <v-slide
          class="flex items-center justify-center"
          value="home"
        >
          <home-panel @next="slide = 'criteria'" />
        </v-slide>

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
