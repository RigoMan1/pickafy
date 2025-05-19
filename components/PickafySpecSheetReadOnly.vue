<script setup lang="ts">
const props = defineProps<{
  activeChoice: Choice;
  criteria: Criterion[];
}>();

// Helper to grab each value
const getValue = (cri: Criterion) => {
  return props.activeChoice.values?.[cri.id];
};

const open = defineModel<boolean>();
</script>

<template>
  <v-dialog
    v-model="open"
    class="flex items-center justify-center"
    activator="parent"
  >
    <div class="flex-1 overflow-auto rounded-xl bg-white p-6 shadow-lg">
      <div class="mb-6 flex items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <img
            :src="activeChoice.image"
            alt="Product image"
            class="size-16 rounded-xl border border-surface-200 object-cover shadow-sm"
          />
          <header-section>
            <template #title>
              <span class="text-primary-600">{{ activeChoice.label }}</span>
              Ratings & Features
            </template>
          </header-section>
        </div>

        <v-button
          icon="i-mdi-close"
          variant="text"
          class="self-start"
          @click="open = false"
        />
      </div>

      <template v-if="activeChoice && criteria.length">
        <div class="grid gap-4 sm:grid-cols-2">
          <div
            v-for="cri in criteria"
            :key="cri.id"
            class="flex items-start gap-4 rounded-lg border border-surface-300 p-4"
          >
            <div
              class="flex size-12 items-center justify-center rounded-full border border-primary-100/70
                bg-primary-50 text-primary-500"
            >
              <v-icon
                :name="cri.icon"
                class="text-primary mt-1 shrink-0 text-xl"
              />
            </div>

            <div class="flex-1">
              <v-heading variant="subtitle-2">
                {{ cri.title }}
              </v-heading>
              <v-text class="mb-2 text-xs text-surface-500">
                {{ cri.description }}
              </v-text>

              <!-- Read-only display -->
              <div class="mt-1 text-lg font-semibold">
                <template v-if="cri.type === 'scale-rating'">
                  <div class="flex select-none items-center">
                    <template
                      v-for="i in 5"
                      :key="i"
                    >
                      <div class="relative flex size-5 items-center justify-center">
                        <v-icon
                          name="i-mdi-star"
                          class="absolute h-full w-full text-surface-300"
                          size="sm"
                        />
                        <v-icon
                          v-if="(getValue(cri) ?? 0) >= i * 2"
                          name="i-mdi-star"
                          class="absolute h-full w-full text-primary-500"
                          size="sm"
                        />
                        <v-icon
                          v-else-if="(getValue(cri) ?? 0) >= i * 2 - 1"
                          name="i-mdi-star-half"
                          class="absolute h-full w-full text-primary-500"
                          size="sm"
                        />
                      </div>
                    </template>
                    <span class="ml-2 text-sm text-surface-600">
                      {{ (getValue(cri) ?? 0) / 2 }}/5
                    </span>
                  </div>
                </template>

                <template v-else-if="cri.type === 'percentage'">
                  {{ getValue(cri) ?? '—' }}%
                </template>

                <template v-else-if="cri.type === 'boolean'">
                  <div
                    class="flex w-32 overflow-hidden rounded-lg border border-surface-200 text-sm"
                  >
                    <div
                      class="flex-1 py-1.5 text-center"
                      :class="
                        getValue(cri) === false
                          ? 'bg-rose-600 text-white'
                          : 'bg-transparent text-surface-600'
                      "
                    >
                      No
                    </div>
                    <div
                      class="flex-1 py-1.5 text-center"
                      :class="
                        getValue(cri) === true
                          ? 'bg-emerald-600 text-white'
                          : 'bg-transparent text-surface-600'
                      "
                    >
                      Yes
                    </div>
                  </div>
                </template>

                <template v-else-if="cri.type === 'cost'">
                  {{ getValue(cri) != null ? `$${getValue(cri)}` : '—' }}
                </template>
                <template v-else>
                  {{ getValue(cri) ?? '—' }}
                </template>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </v-dialog>
</template>
