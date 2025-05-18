<script setup lang="ts">
import { computed } from 'vue';
import { useColor, makeColorProps } from '~/modules/sui/runtime/composables/bem/color';

const props = defineProps({
  ...makeColorProps(),
});

const { colorClasses } = useColor(props, 'v-alert');

const iconByColor = computed(() => {
  switch (props.color) {
    case 'danger':
      return 'i-mdi-alert-circle-outline';
    case 'warn':
      return 'i-mdi-alert-outline';
    case 'success':
      return 'i-mdi-check-circle-outline';
    case 'info':
      return 'i-mdi-information-outline';
    case 'help':
      return 'i-mdi-help-circle-outline';
    default:
      return 'i-mdi-lightbulb-on-outline';
  }
});

const colorThemeClasses = computed(() => {
  switch (props.color) {
    case 'primary':
      return 'border-primary-200 bg-primary-50 text-primary-800';
    case 'danger':
      return 'border-red-200 bg-red-50 text-red-500';
    case 'warn':
      return 'border-yellow-200 bg-yellow-50 text-yellow-500';
    case 'success':
      return 'border-emerald-200 bg-emerald-50 text-emerald-500';
    case 'info':
      return 'border-blue-200 bg-blue-50 text-blue-500';
    case 'help':
      return 'border-purple-200 bg-purple-50 text-purple-500';
    case 'dark':
      return 'border-gray-800 bg-gray-900 text-white';
    case 'light':
      return 'border-gray-200 bg-gray-50 text-gray-800';
    default:
      return 'border-gray-200 bg-white text-gray-800';
  }
});
</script>

<template>
  <div
    class="v-alert flex items-center rounded-xl border p-4 text-sm"
    :class="[colorThemeClasses, colorClasses]"
    role="alert"
  >
    <div class="v-alert__icon mr-3">
      <v-icon
        :name="iconByColor"
        class="text-inherit"
        size="sm"
      />
    </div>

    <p>
      <slot />
    </p>
  </div>
</template>
