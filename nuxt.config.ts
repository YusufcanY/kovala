export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxt/image-edge',
  ],
  css: ['@/assets/css/main.css'],
  build: {
    transpile: ['@heroicons/vue'],
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
  image: {
    provider: 'cloudinary',
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/dtenkljas/image/upload/v1672066966',
    },
  },
})
