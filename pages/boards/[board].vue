<script setup lang="ts">
  import {
    BellIcon,
    ChatBubbleLeftIcon,
    EllipsisHorizontalIcon,
    LockClosedIcon,
    MagnifyingGlassIcon,
    PlusIcon,
  } from '@heroicons/vue/24/outline'
</script>
<template>
  <div>
    <div class="grid grid-cols-16 gap-x-4 p-6">
      <div class="col-span-4">
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
          class="relative rounded-lg bg-white p-1 ring-primary-accent transition-all duration-200 hover:ring"
        >
          <BellIcon class="h-8 w-8 text-primary-accent" />
          <span
            class="absolute top-1 right-2 h-3 w-3 rounded-full border-2 border-white bg-primary-accent"
          />
        </button>
        <button
          class="relative rounded-lg bg-white p-1 ring-primary-accent transition-all duration-200 hover:ring"
        >
          <ChatBubbleLeftIcon
            class="h-8 w-8 -scale-x-[1] text-primary-accent"
          />
          <span
            class="absolute top-1 right-1 h-3 w-3 rounded-full border-2 border-white bg-primary-accent"
          />
        </button>
        <button
          class="relative rounded-lg bg-white p-1 ring-primary-accent transition-all duration-200 hover:ring"
        >
          <EllipsisHorizontalIcon class="h-8 w-8 text-primary-accent" />
        </button>
      </div>
    </div>
    <div class="grid grid-cols-16 p-6">
      <div class="col-span-8 flex flex-col space-y-1">
        <span class="text-sm font-medium text-[#86889F]">BOARDS</span>
        <div class="flex items-center space-x-2">
          <div class="rounded-full bg-white">
            <img class="h-9 w-9 p-1" src="/backend.png" />
          </div>
          <span class="text-xl font-bold">Frontend</span>
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
              <img
                alt=""
                class="h-9 w-9 rounded-full border-2 border-white"
                src="/memojis/memoji-1.jpg"
              />
              <img
                alt=""
                class="h-9 w-9 rounded-full border-2 border-white"
                src="/memojis/memoji-3.jpg"
              />
              <img
                alt=""
                class="h-9 w-9 rounded-full border-2 border-white"
                src="/memojis/memoji-2.jpg"
              />
              <img
                alt=""
                class="h-9 w-9 rounded-full border-2 border-white"
                src="/memojis/memoji-4.jpg"
              />
              <img
                alt=""
                class="h-9 w-9 rounded-full border-2 border-white"
                src="/memojis/memoji-5.jpg"
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
  </div>
</template>
