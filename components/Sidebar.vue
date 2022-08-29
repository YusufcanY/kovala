<script setup lang="ts">
  import { ChevronDownIcon } from '@heroicons/vue/24/outline'
  const workspaces = ref([
    {
      id: 1,
      name: 'Workspace 1',
      icon: 'workspace-1.svg',
    },
    {
      id: 2,
      name: 'Workspace 2',
      icon: 'workspace-2.svg',
    },
    {
      id: 3,
      name: 'Workspace 3',
      icon: 'workspace-3.svg',
    },
    {
      id: 4,
      name: 'Workspace 4',
      icon: 'workspace-4.svg',
    },
  ])
  const activeWorkspaceIndex = ref(0)
</script>
<template>
  <div class="flex flex-col px-4">
    <h2 class="py-4 text-center text-3xl font-black text-gray-800">KOVALA</h2>
    <div
      class="flex items-center justify-between rounded-2xl border-2 border-[#F3F4F6] px-4 py-2"
    >
      <div class="flex">
        <!-- icon will be here -->
        <div class="flex flex-col">
          <label class="-mb-1 text-xs font-medium text-[#AEAFC1]">{{
            $t('workspace')
          }}</label>
          <span class="truncate">{{
            workspaces[activeWorkspaceIndex].name
          }}</span>
        </div>
      </div>
      <ChevronDownIcon class="h-6 w-6" />
    </div>
  </div>
</template>
