<script setup lang="ts">
  import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/24/outline'
  defineProps({
    itemWithChild: {
      type: Object,
      required: true,
    },
  })
  const isDropdownOpen = ref(false)
  const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value
  }
</script>
<template>
  <div>
    <button
      class="flex w-full items-center justify-between rounded-2xl bg-primary-accent bg-opacity-0 py-2 px-4 transition-all duration-300 hover:bg-opacity-10"
      @click="toggleDropdown()"
    >
      <div class="flex items-center space-x-2">
        <component :is="itemWithChild.icon" class="h-8 w-8" />
        <span>{{ itemWithChild.name }}</span>
      </div>
      <ChevronUpIcon v-if="isDropdownOpen" class="h-6 w-6" />
      <ChevronDownIcon v-else class="h-6 w-6" />
    </button>
    <div v-if="isDropdownOpen" class="mt-2 space-y-2 rounded-lg p-2">
      <div
        v-for="(child, index) in itemWithChild.children"
        :key="index"
        class="w-full"
      >
        <NuxtLink
          class="group relative flex items-center space-x-2 rounded-lg bg-primary-accent bg-opacity-0 py-2 px-4 transition-all duration-300 hover:bg-opacity-10"
          :to="child.route"
        >
          <div
            class="absolute left-0 top-1/2 h-3 w-1 -translate-y-1/2 rounded-r-lg bg-primary-accent transition-all duration-200 group-hover:w-2"
          ></div>
          <img class="h-6 w-6 p-1" :src="child.icon" />
          <span>{{ child.name }}</span>
        </NuxtLink>
      </div>
      <slot />
    </div>
  </div>
</template>
