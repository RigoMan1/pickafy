<script setup lang="ts">
/* ---------- sample data ---------- */
const criteria = ref<Criterion[]>([
  {
    title: 'Pricing',
    description: 'Affordability and value for features offered.',
    icon: 'i-mdi-currency-usd',
    type: 'cost',
    weight: 4,
  },
  {
    title: 'Ease of Use',
    description: 'How intuitive and beginner-friendly the builder is.',
    icon: 'i-mdi-hand-pointing-up',
    type: 'scale-rating',
    weight: 5,
  },
  {
    title: 'Design & Templates',
    description: 'Quality and variety of available themes and customization.',
    icon: 'i-mdi-palette',
    type: 'scale-rating',
    weight: 4,
  },
  {
    title: 'Features & Flexibility',
    description: 'Breadth of tools, plugins, and customization options.',
    icon: 'i-mdi-cog',
    type: 'scale-rating',
    weight: 5,
  },
  {
    title: 'E-Commerce Support',
    description: 'Support for online selling and commerce features.',
    icon: 'i-mdi-cart',
    type: 'boolean',
    weight: 4,
  },
  {
    title: 'Support & Resources',
    description: 'Availability of help docs, tutorials, and customer support.',
    icon: 'i-mdi-lifebuoy',
    type: 'scale-rating',
    weight: 3,
  },
]);

function addCustomCriterion() {
  criteria.value.push({
    title: 'New criterion',
    description: '',
    icon: 'i-mdi-pencil',
    type: 'scale-rating',
    weight: 5,
  });
}

const { $state } = useMainStore();
// todo: on add new criterion, bring up dialog with text-field

const emit = defineEmits(['next']);
</script>

<template>
  <div class="space-y-6">
    <v-heading variant="heading-3">Choose Your Criteria</v-heading>

    <!-- grid of cards -->

    <v-group
      v-model="$state.selectedCriteria"
      multiple
      class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      <v-group-item
        v-for="criterion in criteria"
        :key="criterion.title"
        v-slot="{ toggle, isSelected }"
        :value="criterion"
      >
        <button
          class="hover:ring-primary flex items-start space-x-4 rounded-lg p-4 text-left shadow-sm ring-1
            ring-surface-400/40 transition focus:outline-none"
          :class="{ 'bg-primary-500/20': isSelected }"
          @click="toggle"
        >
          <v-icon
            :name="criterion.icon"
            class="text-primary pt-1 text-xl"
          />

          <div class="flex-1">
            <h3 class="font-semibold">
              {{ criterion.title }}
            </h3>
            <p class="mt-1 text-sm text-gray-600">{{ criterion.description }}</p>
            <p class="mt-1 text-xs italic text-gray-400">Type: {{ criterion.type }}</p>
          </div>
        </button>
      </v-group-item>
    </v-group>

    <!-- actions -->
    <div class="flex flex-wrap justify-between gap-3">
      <v-button
        color="primary"
        variant="outlined"
        label="Add custom criterion"
        prepend-icon="i-mdi-plus"
        @click="addCustomCriterion"
      />

      <v-button
        color="primary"
        :disabled="$state.selectedCriteria.length === 0"
        @click="emit('next')"
      >
        Continue
      </v-button>
    </div>
  </div>
</template>
