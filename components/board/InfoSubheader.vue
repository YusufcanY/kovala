<script setup lang="ts">
  import { LockClosedIcon, PlusIcon } from '@heroicons/vue/24/outline'
  import { useGroupStore } from '@/store/group'

  const route = useRoute()
  const groupStore = useGroupStore()
  const groupID = route.params.groupID
  const group = computed(() => {
    if (groupID && typeof groupID === 'string') {
      return groupStore.getGroupById(Number(groupID))
    }
  })
</script>
<template>
  <div class="grid grid-cols-16">
    <div class="col-span-8 flex flex-col space-y-1">
      <span class="text-sm font-medium text-[#86889F]">BOARDS</span>
      <div class="flex items-center space-x-2">
        <div class="rounded-full bg-white dark:bg-dark-page-body">
          <NuxtImg
            :alt="group?.name"
            class="w-9 p-1"
            :src="group?.icon + '.png'"
            width="100px"
          />
        </div>
        <span class="text-xl font-bold">{{ group?.name }}</span>
      </div>
    </div>
    <div class="col-span-8 flex justify-end space-x-12">
      <div class="flex flex-col space-y-1">
        <span class="text-sm font-medium text-[#86889F]">VISIBILITY</span>
        <div class="flex items-center space-x-2">
          <LockClosedIcon class="h-9 w-9 p-1" />
          <span class="text-xl font-bold">Private</span>
        </div>
      </div>
      <div class="flex flex-col space-y-1">
        <span class="text-sm font-medium text-[#86889F]">TEAM</span>
        <div class="flex items-center">
          <div
            class="flex flex-row-reverse items-center justify-end -space-x-3 space-x-reverse"
          >
            <NuxtImg
              alt="User"
              class="w-9 rounded-full border-2 border-white dark:border-dark-page-body"
              src="/memoji-1_dbislj.jpg"
              width="100px"
            />
            <NuxtImg
              alt="User"
              class="w-9 rounded-full border-2 border-white dark:border-dark-page-body"
              src="/memoji-3_bnaogy.jpg"
              width="100px"
            />
            <NuxtImg
              alt="User"
              class="w-9 rounded-full border-2 border-white dark:border-dark-page-body"
              src="/memoji-2_hphha4.jpg"
              width="100px"
            />
            <NuxtImg
              alt="User"
              class="w-9 rounded-full border-2 border-white dark:border-dark-page-body"
              src="/memoji-4_joosgu.jpg"
              width="100px"
            />
            <NuxtImg
              alt="User"
              class="w-9 rounded-full border-2 border-white dark:border-dark-page-body"
              src="/memoji-5_m4tz9e.jpg"
              width="100px"
            />
          </div>
          <span class="font-semibold text-[#86889F]"> +4 </span>
          <button class="ml-2">
            <PlusIcon
              class="h-7 w-7 rounded-full bg-primary-accent bg-opacity-10 p-1 text-primary-accent"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
