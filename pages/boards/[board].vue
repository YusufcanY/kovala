<script setup lang="ts">
  import { useBoardStore } from '@/store/boards'

  const board = useBoardStore()
  /*   const people = useState<Person[]>('people', () => [
    {
      id: 1,
      name: 'Ymir Vision',
      image: '/memojis/memoji-1.jpg',
    },
    {
      id: 2,
      name: 'John Doe',
      image: '/memojis/memoji-3.jpg',
    },
    {
      id: 3,
      name: 'Alcoholic German',
      image: '/memojis/memoji-5.jpg',
    },
    {
      id: 4,
      name: 'Fart Beeday',
      image: '/memojis/memoji-4.jpg',
    },
    {
      id: 5,
      name: 'Smith Backbone',
      image: '/memojis/memoji-2.jpg',
    },
  ]) */
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
