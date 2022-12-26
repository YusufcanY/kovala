import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    './modules/auto-import-eslint',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxt/image-edge',
  ],
  css: ['@/assets/css/main.css'],
  build: {
    transpile: ['@heroicons/vue'],
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
  typescript: {
    shim: false,
    strict: true,
  },
  vite: {
    logLevel: 'info',
    optimizeDeps: {
      include: ['@headlessui/vue', 'vue', 'pinia'],
    },
  },
})
