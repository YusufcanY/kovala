<script setup lang="ts">
  import { PlusIcon } from '@heroicons/vue/24/outline'
</script>
<template>
  <div>
    <button
      class="flex w-full items-center space-x-2 rounded-lg border-2 border-primary-accent border-opacity-0 bg-primary-accent bg-opacity-10 py-2 px-4 text-primary-accent transition-all duration-300 hover:border-opacity-100"
    >
      <PlusIcon class="h-6 w-6" />
      <span class="font-semibold">{{ $t('add_new') }}</span>
    </button>
  </div>
</template>
