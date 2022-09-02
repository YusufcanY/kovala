<script setup lang="ts">
  import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/vue/24/outline'
</script>
<template>
  <div>
    <div class="grid grid-cols-16 gap-x-2 p-4">
      <div class="col-span-5">
        <div class="group relative inline-block">
          <input
            class="rounded-xl py-2 pl-10 pr-2 ring-primary-accent transition-all duration-200 focus:ring"
            placeholder="Search for anything"
            type="text"
          />
          <MagnifyingGlassIcon
            class="absolute top-1/2 left-1 h-7 w-7 -translate-y-1/2 text-gray-400 transition-all duration-200 group-focus-within:text-primary-accent group-hover:text-primary-accent"
          />
        </div>
      </div>
      <div class="col-span-2 col-start-13 flex justify-end">
        <button
          class="flex h-10 items-center space-x-2 rounded-lg bg-primary-accent px-2 font-bold text-white"
        >
          <div class="rounded-lg bg-white bg-opacity-20 p-1">
            <PlusIcon class="h-5 w-5" />
          </div>
          <span>New Board</span>
        </button>
      </div>
      <div class="col-span-1 bg-red-200">notifs</div>
      <div class="col-span-1 bg-red-200">more</div>
    </div>
  </div>
</template>
