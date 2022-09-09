<script setup lang="ts">
  import { MoonIcon, SunIcon } from '@heroicons/vue/24/outline'
  const isDark = useCookie<boolean>('isDark')
  if (isDark.value === null || isDark.value === undefined) {
    isDark.value = false
  }
  useHead({
    htmlAttrs: {
      class: isDark.value ? 'dark' : 'light',
    },
  })
  const changeTheme = () => {
    isDark.value = !isDark.value
    useHead({
      htmlAttrs: {
        class: isDark.value ? 'dark' : 'light',
      },
    })
  }
</script>
<template>
  <button
    class="flex items-center space-x-2 rounded-lg p-2 hover:bg-gray-100"
    @click="changeTheme"
  >
    <MoonIcon v-if="isDark" class="h-6 w-6" />
    <SunIcon v-else class="h-6 w-6" />
    <span class="font-semibold">{{ $t('theme') }}</span>
  </button>
</template>
