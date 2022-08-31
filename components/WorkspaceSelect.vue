<script setup lang="ts">
  import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/24/outline'
  const isLoading = useState('isLoading')
  const workspaces = useState('workspaces', () => [
    {
      id: 1,
      name: 'Atari',
      icon: 'workspace-1.png',
      notification: true,
    },
    {
      id: 2,
      name: 'Dunkin Donuts',
      icon: 'workspace-2.png',
    },
    {
      id: 3,
      name: "McDonald's",
      icon: 'workspace-3.png',
      notification: true,
    },
    {
      id: 4,
      name: 'Uber',
      icon: 'workspace-4.png',
    },
  ])
  const activeWorkspaceId = useState('activeWorkspaceId', () => 1)
  const workspaceDropdownOpen = ref(false)
  const toggleWorkspaceDropdown = () => {
    workspaceDropdownOpen.value = !workspaceDropdownOpen.value
  }
  const getWorkspacesWithoutActive = computed(() =>
    workspaces.value.filter(({ id }) => {
      return id !== activeWorkspaceId.value
    })
  )
  const getWorkspaceById = (id: number) => {
    return workspaces.value.find(({ id: workspaceId }) => {
      return workspaceId === id
    })
  }
  const setActiveWorkspace = (id: number) => {
    isLoading.value = true
    workspaceDropdownOpen.value = false
    setTimeout(() => {
      activeWorkspaceId.value = id
      isLoading.value = false
    }, 2000)
  }
</script>
<template>
  <div class="relative w-full">
    <button
      class="flex w-full items-center justify-between rounded-2xl border-2 border-[#F3F4F6] px-4 py-2"
      @click="toggleWorkspaceDropdown()"
    >
      <div class="flex space-x-1">
        <img
          alt=""
          class="h-8"
          :src="getWorkspaceById(activeWorkspaceId)?.icon"
        />
        <div class="flex flex-col items-start">
          <label class="-mb-1 text-xs font-medium text-[#AEAFC1]">{{
            $t('workspace')
          }}</label>
          <span class="truncate">{{
            getWorkspaceById(activeWorkspaceId)?.name
          }}</span>
        </div>
      </div>
      <ChevronUpIcon v-if="workspaceDropdownOpen" class="h-6 w-6" />
      <ChevronDownIcon v-else class="h-6 w-6" />
    </button>
    <Transition name="dropdown">
      <div
        v-show="workspaceDropdownOpen"
        class="absolute top-0 left-0 z-10 mt-16 flex w-full flex-col space-y-2 bg-white"
      >
        <button
          v-for="item in getWorkspacesWithoutActive"
          :key="item.id"
          class="relative flex items-center space-x-2 rounded-2xl border border-primary-accent border-opacity-0 bg-white p-4 shadow-lg transition-all duration-200 hover:border-opacity-100"
          @click="setActiveWorkspace(item.id)"
        >
          <img alt="" class="h-8" :src="item.icon" />
          <div class="flex flex-col items-start">
            <span class="truncate">{{ item.name }}</span>
          </div>
          <div
            v-if="item.notification"
            class="absolute right-4 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-primary-accent transition-all duration-200"
          ></div>
        </button>
      </div>
    </Transition>
  </div>
</template>
<style scoped>
  .dropdown-enter-active,
  .dropdown-leave-active {
    transition: opacity, 0.2s ease-in-out;
  }
  .dropdown-enter-from,
  .dropdown-leave-to {
    opacity: 0;
    transform: scale(0.9);
  }
</style>
