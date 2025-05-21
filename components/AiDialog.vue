<script setup lang="ts">
import { useChatgptStore } from '~/composables/useChatgptStore';
const dialog = ref(false);

const SYSTEM_PROMPT = `
- icons should look like this: icon: 'i-mdi-cog'
- choose the best icon that matches the criteria type
- initialize criteria with a value of 1
- Evaluate each product based solely on its objective, intrinsic qualities. Assign accurate and objective scores where applicable. If a criterion is subjective or lacks sufficient data, leave it blank.
- criteria: aim for 4-8 of the top 10 most important criteria
- leave image and url blank
type FactorType =
  | 'scale-rating' // a rating from 1-10
  | 'boolean' // a yes/no question
  | 'percentage' // a percentage from 0-100
  | 'cost'; // a cost value
`;
const message = ref('');

const chatgpt = useChatgptStore();

async function sendMessage() {
  if (message.value) {
    try {
      return await chatgpt.sendMessage({
        system: SYSTEM_PROMPT || '',
        user: message.value,
      });
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      message.value = '';
      dialog.value = false;
    }
  }
}

const { loadTemplate } = useMainStore();
async function handleEnterKey(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault(); // Prevent the default action to avoid inserting a new line

    const res = await sendMessage();

    if (res) {
      const pickafyTemplate = JSON.parse(res.content);

      loadTemplate(pickafyTemplate);
    }
  }
}
</script>

<template>
  <v-dialog v-model="dialog">
    <template #activator="{ props: activatorProps }">
      <v-button
        v-bind="activatorProps"
        id="dialog-ai-criterion"
        label="Ask AI"
        variant="outlined"
        color="primary"
        prepend-icon="i-mdi-creation-outline"
      />
    </template>

    <div class="relative w-[350px] rounded-lg bg-surface-50 p-6 shadow-lg sm:w-[400px]">
      <v-button
        icon="i-mdi-close"
        variant="text"
        class="absolute right-4 top-2"
        @click="dialog = false"
      />
      <v-heading variant="heading-4">Ask AI</v-heading>
      <v-text
        class="mt-1 text-gray-500"
        variant="body-2"
      >
        Describe what you want to compare, The options and criteria will be generated for
        you.
      </v-text>

      <div
        class="mt-2 flex items-center rounded-lg border border-surface-300 bg-surface-100 px-2 py-1"
      >
        <textarea
          id="chat"
          ref="inputEl"
          v-model="message"
          rows="6"
          class="block max-h-40 w-full resize-none overflow-y-auto rounded-lg border-surface-300
            bg-surface-100 p-2.5 text-sm text-surface-900 outline-none focus:border-primary-500
            focus:ring-primary-500"
          placeholder="Your message..."
          @keydown.enter="handleEnterKey"
        />

        <v-button
          class="inline-flex cursor-pointer justify-center rounded-full p-2 !text-primary-600
            hover:bg-primary-100 dark:text-primary-500 dark:hover:bg-surface-600"
          icon="i-mdi-send"
          variant="text"
          :disabled="!message || chatgpt.$state.isTyping"
          @click="sendMessage"
        />
      </div>

      <div class="mt-6 flex justify-end space-x-3">
        <v-button
          variant="text"
          @click="dialog = false"
        >
          Cancel
        </v-button>
        <v-button
          color="primary"
          :disabled="!message || chatgpt.$state.isTyping"
          @click="sendMessage"
        >
          {{ chatgpt.$state.isTyping ? 'Sending...' : 'Send' }}
        </v-button>
      </div>
    </div>
  </v-dialog>
</template>
