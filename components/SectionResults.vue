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
        <v-heading
          class="text-surface-800"
          variant="subtitle-2"
        >
          Fine-Tune Your Picks
        </v-heading>

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
            class="mt-1"
          />
        </div>

        <v-text
          variant="caption"
          class="mt-2 inline-block text-surface-500"
        >
          Slide to adjust what matters most. Your results will update based on your
          preferences.
        </v-text>
      </div>

      <!-- leaderboard ranking table -->
      <div class="w-7/12 space-y-4 rounded-xl bg-white p-6 shadow">
        <v-button
          class="mb-4 w-full"
          :disabled="!$state.choices.length"
          @click="computeScores"
        >
          Get Scores
        </v-button>

        <div
          v-for="(r, i) in $state.results"
          :key="r.id"
          class="flex items-center justify-between gap-6 rounded-lg px-4 py-4 transition-colors"
          :class="[
            i === 0
              ? 'border border-primary-200 bg-primary-50 font-semibold text-primary-800'
              : 'bg-surface-100 text-gray-800',
          ]"
        >
          <nuxt-img
            v-if="r.image"
            :src="r.image"
            :alt="r.label"
            class="size-12 rounded-lg object-cover"
          />

          <div class="flex flex-1 items-center gap-3">
            <template v-if="i === 0">
              <v-icon
                name="i-mdi-medal"
                class="text-xl text-yellow-500"
              />
              <div>
                <div class="text-xs uppercase tracking-wide text-gray-500">
                  Best Overall
                </div>
                <div class="text-base font-semibold">{{ r.label }}</div>
              </div>
            </template>

            <template v-else>
              <div class="w-6 text-base font-semibold">
                {{ i + 1 }}
                <sup class="align-top text-xs">
                  {{ ['st', 'nd', 'rd'][i - 1] ?? 'th' }}
                </sup>
              </div>
              <div class="text-base">{{ r.label }}</div>
            </template>
          </div>

          <div class="text-right text-sm font-medium">
            {{ r.score }}
            <span class="text-xs text-gray-500">/ 100</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
