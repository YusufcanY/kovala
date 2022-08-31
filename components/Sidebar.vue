<script setup lang="ts">
  import {
    CalendarIcon,
    ChatBubbleLeftRightIcon,
    Cog6ToothIcon,
    RectangleGroupIcon,
    RectangleStackIcon,
  } from '@heroicons/vue/24/outline'
  const navItems = ref([
    {
      name: 'Dashboard',
      icon: RectangleGroupIcon,
      route: '/',
    },
    {
      name: 'Boards',
      icon: RectangleStackIcon,
      route: '/boards',
      children: [
        {
          name: 'Frontend',
          icon: '/frontend.png',
          route: '/boards/frontend',
        },
        {
          name: 'Backend',
          icon: '/backend.png',
          route: '/boards/backend',
        },
      ],
    },
    {
      name: 'Calendar',
      icon: CalendarIcon,
      route: '/calendar',
    },
    {
      name: 'Messages',
      icon: ChatBubbleLeftRightIcon,
      route: '/messages',
    },
    {
      name: 'Settings',
      icon: Cog6ToothIcon,
      route: '/settings',
    },
  ])
</script>
<template>
  <div class="flex flex-col px-4">
    <h2 class="py-4 text-center text-3xl font-black text-gray-800">KOVALA</h2>
    <WorkspaceSelect />
    <div class="mt-8 space-y-4">
      <div v-for="(item, index) in navItems" :key="index" class="w-full">
        <NavItemGroup v-if="item.children" :item-with-child="item" />
        <NuxtLink
          v-else
          class="flex items-center space-x-2 rounded-2xl bg-primary-accent py-2 px-4 transition-all duration-300"
          :class="
            $route.path === item.route
              ? 'bg-opacity-100 font-medium text-white'
              : 'bg-opacity-0 hover:bg-opacity-10'
          "
          :to="item.route"
        >
          <component :is="item.icon" class="h-8 w-8" />
          <span>{{ item.name }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
