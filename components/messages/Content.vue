<script setup lang="ts">
  import {
    EllipsisHorizontalCircleIcon,
    MagnifyingGlassCircleIcon,
  } from '@heroicons/vue/24/outline'
  import type { Message } from '@/types/Messages'
  const messages = useState<Message[]>('messages')
  const activeMessageID = useState<number | null>('activeMessageID', () => null)
  const getMessagerById = computed(() =>
    messages.value.find(({ id }) => {
      return id === activeMessageID.value
    })
  )
</script>
<template>
  <div v-if="activeMessageID" class="flex flex-col">
    <button
      class="relative grid w-full grid-cols-12 items-center justify-between border-b border-gray-100 p-2 transition-all duration-200"
    >
      <div class="col-span-4 grid w-full grid-cols-16 space-x-2">
        <div class="col-span-3 flex items-center justify-center">
          <NuxtImg
            class="rounded-full"
            :src="getMessagerById?.from_image"
            width="56px"
          />
        </div>
        <div class="col-span-13 flex justify-center">
          <div class="flex w-full flex-col items-start justify-center">
            <span class="truncate text-lg font-bold">{{
              getMessagerById?.from
            }}</span>
            <span
              v-if="getMessagerById?.is_online"
              class="text-sm font-bold text-primary-accent"
            >
              {{ $t('online') }}
            </span>
            <span v-else class="text-sm text-[#AEAFC1]">
              Last seen {{ getMessagerById?.time }}</span
            >
          </div>
        </div>
      </div>
      <div class="col-span-8 flex justify-end space-x-2">
        <button
          class="rounded-full transition-all duration-200 hover:bg-primary-accent hover:text-white"
        >
          <MagnifyingGlassCircleIcon class="w-12" />
        </button>
        <button
          class="rounded-full transition-all duration-200 hover:bg-primary-accent hover:text-white"
        >
          <EllipsisHorizontalCircleIcon class="w-12" />
        </button>
      </div>
    </button>
  </div>
</template>
