<script setup lang="ts">
import { computed } from 'vue';
import { makeComponentProps } from '../../composables/component';

type TextVariants =
  | 'heading-1'
  | 'heading-2'
  | 'heading-3'
  | 'heading-4'
  | 'heading-5'
  | 'heading-6'
  | 'subtitle-1'
  | 'subtitle-2';

const props = defineProps({
  ...makeComponentProps({ tag: undefined }),
  variant: {
    type: String as () => TextVariants,
    default: 'heading-1',
  },
});

const variantMap = {
  'heading-1': {
    class: 'v-heading-1',
    tag: 'h1',
  },
  'heading-2': {
    class: 'v-heading-2',
    tag: 'h2',
  },
  'heading-3': {
    class: 'v-heading-3',
    tag: 'h3',
  },
  'heading-4': {
    class: 'v-heading-4',
    tag: 'h4',
  },
  'heading-5': {
    class: 'v-heading-5',
    tag: 'h5',
  },
  'heading-6': {
    class: 'v-heading-6',
    tag: 'h6',
  },
  'subtitle-1': { class: 'v-subtitle-1', tag: 'h6' },
  'subtitle-2': { class: 'v-subtitle-2', tag: 'h6' },
} as { [key in TextVariants]: { class: string; tag: string } };

const activeVariant = computed(() => variantMap[props.variant]);
</script>

<template>
  <component
    :is="props.tag || activeVariant.tag"
    class="v-text"
    :class="activeVariant.class"
  >
    <slot />
  </component>
</template>
