<script setup lang="ts">
  import { PlusIcon } from '@heroicons/vue/24/outline'
  import { useGroupStore } from '@/store/group'
  const groupStore = useGroupStore()
  const newGroup = () => {
    groupStore.addGroup()
  }
</script>
<template>
  <div>
    <button
      class="flex w-full items-center space-x-2 rounded-lg border-2 border-primary-accent border-opacity-0 bg-primary-accent bg-opacity-10 py-2 px-4 text-primary-accent transition-all duration-300 hover:border-opacity-100"
      @click="newGroup"
    >
      <PlusIcon class="h-6 w-6" />
      <span class="font-semibold">{{ $t('add_new') }}</span>
    </button>
  </div>
</template>
