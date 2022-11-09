<script setup lang="ts">
  import type { List } from '@/types/Board'

  const lists = ref<List[]>([])
  provide('lists', lists)
</script>
<template>
  <div class="h-full">
    <div class="space-y-10 p-6">
      <BoardHeader />
      <BoardInfoSubheader />
    </div>
    <div
      class="grid grid-flow-col grid-cols-[unset] grid-rows-[unset] gap-x-6 overflow-scroll px-6 pb-6 hide-scrollbar"
    >
      <BoardList v-for="(item, index) in lists" :key="index" :list="item" />
    </div>
  </div>
</template>
