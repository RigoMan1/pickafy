// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  app: { baseURL: '/app/' },
  nitro: { preset: 'vercel' },
  modules: [
    './modules/sui',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
  css: ['~/assets/styles/main.css'],
  tailwindcss: {
    exposeConfig: true,
    configPath: './tailwind.config.ts',
    cssPath: ['~/assets/css/tailwind.css', { injectPosition: 'last' }],
  },
  runtimeConfig: {
    chatgpt: {
      apiKey: process.env.OPENAI_API_KEY,
    },
  },
});
