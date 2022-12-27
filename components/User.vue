<script setup lang="ts">
  import { EllipsisVerticalIcon } from '@heroicons/vue/24/outline'
</script>
<template>
  <div class="flex flex-col space-y-2">
    <div class="grid grid-cols-2 gap-2">
      <UserLangSwitch />
      <UserThemeSwitch />
    </div>
    <button
      class="flex items-center justify-between rounded-lg border border-primary-accent border-opacity-0 bg-primary-accent bg-opacity-0 p-2 transition-all duration-200 hover:border-opacity-100 hover:bg-opacity-10"
    >
      <div class="flex items-center space-x-2">
        <NuxtImg
          alt="Yusufcan Yılmaz"
          class="w-10 rounded-full"
          src="/memoji-6_ug8s8k.jpg"
          width="100px"
        />
        <span class="font-bold">Yusufcan Yılmaz</span>
      </div>
      <EllipsisVerticalIcon class="h-6 w-6" />
    </button>
  </div>
</template>
