<script setup lang="ts">
  import { useBoardStore } from '@/store/boards'
  import type { Person } from '@/types/Person'
  const board = useBoardStore()
  useState<Person[]>('people', () => [
    {
      id: 1,
      name: 'Ymir Vision',
      image: '/memoji-1_dbislj.jpg',
    },
    {
      id: 2,
      name: 'John Doe',
      image: '/memoji-3_bnaogy.jpg',
    },
    {
      id: 3,
      name: 'Alcoholic German',
      image: '/memoji-5_m4tz9e.jpg',
    },
    {
      id: 4,
      name: 'Fart Beeday',
      image: '/memoji-4_joosgu.jpg',
    },
    {
      id: 5,
      name: 'Smith Backbone',
      image: '/memoji-2_hphha4.jpg',
    },
  ])
  const boards = computed(() => {
    return board.getBoardsWithIssues
  })
</script>
<template>
  <div class="h-full">
    <div class="space-y-10 p-6">
      <BoardHeader />
      <BoardInfoSubheader />
    </div>
    <div
      class="grid grid-flow-col grid-cols-[repeat(5,1fr)] grid-rows-[unset] gap-x-6 overflow-scroll px-6 pb-6 hide-scrollbar"
    >
      <BoardList v-for="(item, index) in boards" :key="index" :list="item" />
    </div>
  </div>
</template>
