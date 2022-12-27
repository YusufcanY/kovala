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
  app: {
    head: {
      title: 'Kovala | Task Management App',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content:
            'Kovala is a task management app that helps you manage your tasks and projects.',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Kovala | Task Management App',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'Kovala is a task management app that helps you manage your tasks and projects.',
        },
      ],
    },
  },
})
