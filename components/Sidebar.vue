<script setup lang="ts">
  /*   const navItems = ref([
    {
      name: 'Dashboard',
      icon: 'dashboard.svg',
      route: '/',
    },
    {
      name: 'Workspaces',
      icon: 'workspaces.svg',
      route: '/workspaces',
    },
    {
      name: 'Settings',
      icon: 'settings.svg',
      route: '/settings',
    },
  ]) */
</script>
<template>
  <div class="flex flex-col px-4">
    <h2 class="py-4 text-center text-3xl font-black text-gray-800">KOVALA</h2>
    <WorkspaceSelect />
  </div>
</template>
