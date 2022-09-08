<script setup lang="ts">
  import type { List } from '@/types/Board'
  import type { Person } from '@/types/Person'

  const people = useState<Person[]>('people', () => [
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
  ])
  const lists = ref<List[]>([
    {
      id: 10,
      name: 'To Do',
      issues: [
        {
          id: 2,
          title: 'Feature: Adding dark mode',
          priority: 10,
          due_date: 'Dec 31, 2022',
          created_at: '2021-07-01',
          updated_at: '2021-07-01',
        },
      ],
    },
    {
      id: 20,
      name: 'In Progress',
      issues: [
        {
          id: 1,
          title: 'Landing Page New Desing',
          description: 'The current design is looks bad',
          priority: 20,
          assignee: [people.value[0], people.value[1]],
          task: {
            total: 2,
            completed: 1,
          },
          attachments: 2,
          due_date: 'Sep 20, 2022',
          created_at: '2021-07-01',
          updated_at: '2021-07-01',
        },
      ],
    },
    {
      id: 30,
      name: 'Testing',
      issues: [],
    },
    {
      id: 40,
      name: 'Resolved',
      issues: [
        {
          id: 3,
          title: 'Buying Token is Not Working',
          description:
            'When you swap -> disconnect -> connect -> swap again, it will not work',
          priority: 30,
          assignee: [people.value[3]],
          attachments: 1,
          due_date: 'Due Today',
          created_at: '2021-07-01',
          updated_at: '2021-07-01',
        },
        {
          id: 4,
          title: 'Login is not working',
          priority: 30,
          assignee: [],
          attachments: 2,
          due_date: 'Overdue',
          created_at: '2021-07-01',
          updated_at: '2021-07-01',
        },
      ],
    },
    {
      id: 50,
      name: 'Closed',
      issues: [
        {
          id: 5,
          title: 'Login Page Update',
          priority: 20,
          assignee: [people.value[4], people.value[2], people.value[1]],
          task: {
            total: 5,
            completed: 4,
          },
          due_date: 'Complete',
          created_at: '2021-07-01',
          updated_at: '2021-07-01',
        },
      ],
    },
  ])
</script>
<template>
  <div class="h-full">
    <div class="space-y-10 p-6">
      <BoardHeader />
      <BoardInfoSubheader />
    </div>
    <div
      class="grid grid-flow-col grid-cols-[unset] grid-rows-[unset] gap-x-6 overflow-scroll px-6 hide-scrollbar"
    >
      <BoardList v-for="(item, index) in lists" :key="index" :list="item" />
    </div>
  </div>
</template>
