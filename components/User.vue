<script setup lang="ts">
  import {
    EllipsisVerticalIcon,
    LanguageIcon,
    MoonIcon,
  } from '@heroicons/vue/24/outline'
</script>
<template>
  <div class="flex flex-col space-y-2">
    <div class="grid grid-cols-2 gap-2">
      <button
        class="flex items-center space-x-2 rounded-lg p-2 hover:bg-gray-100"
      >
        <LanguageIcon class="h-6 w-6" />
        <span class="font-semibold uppercase">{{ $i18n.locale }}</span>
      </button>
      <button
        class="flex items-center space-x-2 rounded-lg p-2 hover:bg-gray-100"
      >
        <MoonIcon class="h-6 w-6" />
        <span class="font-semibold">Theme</span>
      </button>
    </div>
    <button
      class="flex items-center justify-between rounded-lg border border-primary-accent border-opacity-0 p-2 transition-all duration-200 hover:border-opacity-100"
    >
      <div class="flex items-center space-x-2">
        <img alt="" class="h-10 w-10" src="/backend.png" />
        <span class="font-bold">John Doe</span>
      </div>
      <EllipsisVerticalIcon class="h-6 w-6" />
    </button>
  </div>
</template>
