<script setup lang="ts">
  const isLoading = useState('isLoading', () => false)
</script>
<template>
  <div>
    <div class="grid h-screen grid-cols-16 p-2 pl-0">
      <Sidebar class="col-span-3" />
      <div
        class="col-span-13 h-full rounded-2xl bg-page-foreground dark:bg-dark-foreground"
      >
        <NuxtPage />
      </div>
    </div>
    <LoadingScreen :is-loading="isLoading" />
    <NoMobileScreen />
  </div>
</template>
<style>
  .page-enter-from {
    opacity: 0;
    transform: translateY(-10px);
  }

  .page-enter-active,
  .page-leave-active {
    transition: all 0.2s;
  }
  .page-enter,
  .page-leave-to {
    opacity: 0;
  }
</style>
