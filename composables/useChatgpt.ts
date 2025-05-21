import { createError } from 'h3';

export interface IMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  function_call?: any;
}

export interface IOptions {
  temperature: number;
  max_tokens: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
}

export const useChatgpt = () => {
  const chatCompletion = async (
    messages?: IMessage[],
    model?: any,
    options?: IOptions
  ) => {
    try {
      return await $fetch('/api/chat-completion', {
        method: 'POST',
        body: {
          messages,
          model,
          options,
        },
      });
    } catch (error) {
      throw createError({
        statusCode: 500,
        message: 'Failed to forward request to server',
      });
    }
  };

  return { chatCompletion };
};
