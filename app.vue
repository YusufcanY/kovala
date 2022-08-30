<script setup lang="ts">
  const isLoading = useState('isLoading', () => false)
</script>
<template>
  <div>
    <div class="grid h-screen grid-cols-16 p-2 pl-0">
      <Sidebar class="col-span-3" />
      <div class="col-span-13 h-full rounded-2xl bg-page-foreground">
        <NuxtPage />
      </div>
    </div>
    <LoadingScreen :is-loading="isLoading" />
  </div>
</template>
