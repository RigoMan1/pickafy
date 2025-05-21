import OpenAI from 'openai';
import { createError, defineEventHandler, readBody } from 'h3';
import { defaultOptions } from '../../constants/options';
import { useRuntimeConfig } from '#imports';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';

export default defineEventHandler(async (event) => {
  const { messages, options } = await readBody(event);

  if (!useRuntimeConfig().chatgpt.apiKey) {
    throw createError({
      statusCode: 403,
      message: 'Missing OpenAI API Key',
    });
  }

  // Define your schema
  const TemplateData = z.object({
    id: z.string(),
    name: z.string(),
    criteria: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        icon: z.string(),
        type: z.enum(['scale-rating', 'boolean', 'percentage', 'cost']),
        weight: z.number(),
      })
    ),
    choices: z.array(
      z.object({
        id: z.string(),
        label: z.string(),
        image: z.string().optional(),
        url: z.string().optional(),
        values: z.object({}).catchall(z.union([z.number(), z.boolean()])),
      })
    ),
  });

  const openai = new OpenAI({
    apiKey: useRuntimeConfig().chatgpt.apiKey,
  });

  try {
    const completion = await openai.beta.chat.completions.parse({
      model: 'gpt-4o-mini-2024-07-18', // cheapest - average intelligence
      // model: 'gpt-4.1-mini-2025-04-14', // cheap - high intelligence
      // model: 'gpt-4o-2024-11-20', // moderate - high intelligence
      messages,
      ...(options || defaultOptions),
      response_format: zodResponseFormat(TemplateData, 'pickafy-template'),
    });

    const message = completion.choices[0].message;

    return {
      role: message.role,
      content: message.content as string,
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Failed to forward request to OpenAI API',
    });
  }
});
