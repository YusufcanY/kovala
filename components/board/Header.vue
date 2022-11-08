<script setup lang="ts">
  import {
    BellIcon,
    ChatBubbleLeftIcon,
    EllipsisHorizontalIcon,
    MagnifyingGlassIcon,
    PlusIcon,
  } from '@heroicons/vue/24/outline'
</script>
<template>
  <div class="grid grid-cols-16 gap-x-4">
    <div class="col-span-4">
      <div class="group relative inline-block">
        <input
          class="rounded-xl py-2 pl-10 pr-2 ring-primary-accent transition-all duration-200 focus:ring dark:bg-dark-page-body"
          placeholder="Search for anything"
          type="text"
        />
        <MagnifyingGlassIcon
          class="absolute top-1/2 left-1 h-7 w-7 -translate-y-1/2 text-gray-400 transition-all duration-200 group-focus-within:text-primary-accent group-hover:text-primary-accent"
        />
      </div>
    </div>
    <div
      class="col-span-6 col-start-11 flex max-h-10 items-center justify-end space-x-2"
    >
      <button
        class="flex h-10 items-center space-x-2 rounded-lg bg-primary-accent px-2 font-bold text-white"
      >
        <div class="rounded-lg bg-white bg-opacity-20 p-1">
          <PlusIcon class="h-5 w-5" />
        </div>
        <span>New Board</span>
      </button>
      <button
        class="relative rounded-lg bg-white p-1 ring-primary-accent transition-all duration-200 hover:ring dark:bg-dark-page-body"
      >
        <BellIcon class="h-8 w-8 text-primary-accent" />
        <span
          class="absolute top-1 right-2 h-3 w-3 rounded-full border-2 border-white bg-primary-accent dark:border-dark-page-body"
        />
      </button>
      <button
        class="relative rounded-lg bg-white p-1 ring-primary-accent transition-all duration-200 hover:ring dark:bg-dark-page-body"
      >
        <ChatBubbleLeftIcon class="h-8 w-8 -scale-x-[1] text-primary-accent" />
        <span
          class="absolute top-1 right-1 h-3 w-3 rounded-full border-2 border-white bg-primary-accent dark:border-dark-page-body"
        />
      </button>
      <button
        class="relative rounded-lg bg-white p-1 ring-primary-accent transition-all duration-200 hover:ring dark:bg-dark-page-body"
      >
        <EllipsisHorizontalIcon class="h-8 w-8 text-primary-accent" />
      </button>
    </div>
  </div>
</template>
