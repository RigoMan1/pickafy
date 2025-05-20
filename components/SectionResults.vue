<script setup lang="ts">
import { useMainStore } from '@/stores/mainStore';

const { $state, computeScores } = useMainStore();
const { criteria, choices } = toRefs($state);

watch([criteria, choices], () => computeScores(), { deep: true, immediate: true });
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <header-section
      title="See Your Top Picks"
      class="mx-auto max-w-2xl text-center"
    >
      Here’s how your options rank based on your ratings and priorities.
    </header-section>

    <v-divider class="my-8" />

    <!-- Main content: filters + leaderboard -->
    <div class="flex flex-col gap-6 lg:flex-row lg:gap-12">
      <!-- Fine-tune panel -->
      <div class="w-full lg:w-5/12">
        <v-heading
          class="text-surface-800"
          variant="subtitle-2"
        >
          Fine-Tune Your Picks
        </v-heading>

        <div
          v-for="(criterion, idx) in $state.criteria"
          :key="criterion.title"
          class="mt-4"
        >
          <range-slider
            v-model="$state.criteria[idx].weight"
            min="0"
            max="10"
            :label="criterion.title"
            class="mt-1 w-full"
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

      <!-- Leaderboard panel -->
      <div class="mt-6 w-full space-y-4 rounded-xl bg-white p-6 shadow lg:mt-0 lg:w-7/12">
        <TransitionGroup
          name="rank"
          tag="div"
          class="space-y-4"
        >
          <div
            v-for="(r, i) in $state.results"
            :key="r.id"
            class="flex items-start justify-between gap-4 rounded-lg px-4 py-4 transition-colors
              hover:bg-surface-200"
            :class="[
              i === 0
                ? 'border border-primary-200 bg-primary-50 font-semibold text-primary-800'
                : 'bg-surface-100 text-gray-800',
            ]"
          >
            <!-- spec sheet -->
            <pickafy-spec-sheet-read-only
              :active-choice="r"
              :criteria="criteria"
              class="w-full flex-1"
            />

            <!-- optional image link -->
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
                class="h-12 w-12 rounded-lg object-cover"
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

            <!-- score -->
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
