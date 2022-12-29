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
      class="flex w-full items-center justify-between rounded-xl bg-primary-accent bg-opacity-0 py-2 px-4 transition-all duration-300 hover:bg-opacity-10"
      @click="toggleDropdown()"
    >
      <div class="flex items-center space-x-2">
        <component :is="itemWithChild.icon" class="h-8 w-8" />
        <span>{{ $t('menu.' + itemWithChild.name) }}</span>
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
          class="group relative flex items-center space-x-2 rounded-lg bg-primary-accent py-2 px-4 transition-all duration-300"
          :class="
            $route.path === child.route
              ? 'font-medium'
              : 'bg-opacity-0 hover:bg-opacity-10'
          "
          :to="child.route"
        >
          <div
            class="absolute left-0 top-1/2 h-3 w-1 -translate-y-1/2 rounded-lg transition-all duration-200"
            :class="
              $route.path === child.route
                ? 'translate-x-1 bg-white opacity-60'
                : 'bg-primary-accent group-hover:translate-x-1'
            "
          ></div>
          <div
            :class="{
              'rounded-full bg-white dark:bg-opacity-60':
                $route.path === child.route,
            }"
          >
            <NuxtImg
              :alt="child.name"
              class="w-6 p-1 transition-all duration-200"
              :src="child.icon"
              width="100px"
            />
          </div>
          <span>{{ child.name }}</span>
        </NuxtLink>
      </div>
      <slot />
    </div>
  </div>
</template>
