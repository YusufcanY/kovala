<script setup lang="ts">
  import { MoonIcon, SunIcon } from '@heroicons/vue/24/outline'
  const isDark = useCookie<boolean>('isDark')
  if (isDark.value === null || isDark.value === undefined) {
    isDark.value = false
  }
  const getThemeClass = computed(() => {
    return isDark.value ? 'dark' : 'light'
  })
  useHead({
    bodyAttrs: {
      class: getThemeClass,
    },
  })
  const changeTheme = () => {
    isDark.value = !isDark.value
    useHead({
      bodyAttrs: {
        class: getThemeClass,
      },
    })
  }
</script>
<template>
  <button
    class="flex items-center space-x-2 rounded-lg p-2 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-secondary-accent"
    @click="changeTheme"
  >
    <MoonIcon v-if="isDark" class="h-6 w-6" />
    <SunIcon v-else class="h-6 w-6" />
    <span class="font-semibold">{{ $t('theme') }}</span>
  </button>
</template>
