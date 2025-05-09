<script setup lang="ts">
import { useMainStore } from '@/stores/mainStore';

const { $state, computeScores } = useMainStore();
</script>

<template>
  <div>
    <header-section
      title="See Your Top Picks"
      class="mx-auto text-center"
    >
      Here’s how your options rank based on your ratings and priorities.
    </header-section>

    <v-divider class="my-8" />

    <div class="flex gap-12">
      <div class="w-5/12">
        <v-heading variant="subtitle-2">Fine-Tune Your Picks</v-heading>

        <div
          v-for="(criterion, criterionIndex) in $state.criteria"
          :key="criterion.title"
          class="mt-4"
        >
          <range-slider
            v-model="$state.criteria[criterionIndex].weight"
            min="0"
            max="10"
            :label="$state.criteria[criterionIndex].title"
            class="mt-1 !bg-surface-800"
          />
        </div>

        <v-text
          variant="caption"
          class="mt-2 inline-block text-gray-400"
        >
          Slide to adjust what matters most. Your results will update based on your
          preferences.
        </v-text>
      </div>

      <div class="w-7/12 space-y-4 p-6">
        <v-button
          class="w-full"
          :disabled="!$state.choices.length"
          @click="computeScores"
        >
          Get Scores
        </v-button>

        <div
          v-for="(r, i) in $state.results"
          :key="r.id"
          class="flex items-center justify-between gap-24 rounded-xl px-4 py-3 shadow-sm"
          :class="[
            i === 0
              ? 'bg-surface-100 font-semibold text-green-700'
              : 'bg-surface-200 text-gray-800',
          ]"
        >
          <div class="flex items-center gap-3">
            <template v-if="i === 0">
              <v-icon
                name="i-mdi-medal"
                class="text-lg text-yellow-500"
              />
              <div>
                <div class="text-xs uppercase text-gray-500">Best Overall</div>
                <div class="text-sm">{{ r.label }}</div>
              </div>
            </template>

            <template v-else>
              <div class="text-sm font-medium">
                {{ i + 1 }}
                <sup>{{ ['st', 'nd', 'rd'][i - 1] ?? 'th' }}</sup>
              </div>
              <div class="text-sm">{{ r.label }}</div>
            </template>
          </div>

          <div class="text-sm font-medium">
            {{ r.score }}
            <span class="text-xs text-gray-500">/ 100</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
