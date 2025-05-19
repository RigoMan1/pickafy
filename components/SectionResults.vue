<script setup lang="ts">
import { useMainStore } from '@/stores/mainStore';

const { $state, computeScores } = useMainStore();
const { criteria, choices } = toRefs($state);

watch([criteria, choices], () => computeScores(), { deep: true, immediate: true });
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
        <TransitionGroup
          name="rank"
          tag="div"
          class="space-y-4"
        >
          <div
            v-for="(r, i) in $state.results"
            :key="r.id"
            class="flex cursor-pointer items-center justify-between gap-6 rounded-lg px-4 py-4
              transition-colors
              hover:bg-surface-200
              "
            :class="[
              i === 0
                ? 'border border-primary-200 bg-primary-50 font-semibold text-primary-800'
                : 'bg-surface-100 text-gray-800',
            ]"
          >
            <pickafy-spec-sheet-read-only
              :active-choice="r"
              :criteria="criteria"
            />
            <v-button
              size="none"
              variant="none"
              color="none"
              class="p-0 transition-all duration-100 ease-in-out"
              :class="{ 'cursor-auto': !r.url, 'hover:opacity-80': r.url }"
              :ripple="!!r.url"
              :href="r.url"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`View ${r.label}`"
            >
              <nuxt-img
                v-if="r.image"
                :src="r.image"
                :alt="r.label"
                class="size-12 rounded-lg object-cover"
              />
            </v-button>

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
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<style>
.rank-move {
  transition: transform 0.25s ease;
}

.rank-enter-active,
.rank-leave-active {
  transition: all 0.2s ease;
}

.rank-enter-from,
.rank-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
