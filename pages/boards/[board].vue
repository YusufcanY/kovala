<script setup lang="ts">
  import {
    CheckCircleIcon,
    EllipsisHorizontalIcon,
    PaperClipIcon,
    PlusIcon,
  } from '@heroicons/vue/24/outline'
  import Draggable from 'vuedraggable'
  import { Issue, List } from '@/types/Board'

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  type DraggableElement = {
    element: Issue
  }
  const lists = ref<List[]>([
    // 10: To Do, 20: In Progress, 30: Resolved, 40: Closed, 50: Reopened
    {
      id: 10,
      name: 'To Do',
      issues: [
        {
          id: 2,
          title: 'Feature: Adding dark mode',
          priority: 10,
          assignee: 'https://i.pravatar.cc/300?img=1',
          labels: [
            // need to display labels on front
            {
              id: 1,
              name: 'Design',
              color: '#F2C94C',
            },
            {
              id: 2,
              name: 'Frontend',
              color: '#2F80ED',
            },
          ],
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
          assignee: 'https://i.pravatar.cc/300?img=1',
          labels: [
            // need to display labels on front
            {
              id: 1,
              name: 'Design',
              color: '#F2C94C',
            },
            {
              id: 2,
              name: 'Frontend',
              color: '#2F80ED',
            },
          ],
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
          assignee: 'https://i.pravatar.cc/300?img=1',
          labels: [
            // need to display labels on front
            {
              id: 1,
              name: 'Design',
              color: '#F2C94C',
            },
            {
              id: 2,
              name: 'Frontend',
              color: '#2F80ED',
            },
          ],
          attachments: 1,
          due_date: 'Due Today',
          created_at: '2021-07-01',
          updated_at: '2021-07-01',
        },
        {
          id: 4,
          title: 'Login is not working',
          priority: 30,
          assignee: 'https://i.pravatar.cc/300?img=1',
          labels: [
            // need to display labels on front
            {
              id: 1,
              name: 'Design',
              color: '#F2C94C',
            },
            {
              id: 2,
              name: 'Frontend',
              color: '#2F80ED',
            },
          ],
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
          assignee: 'https://i.pravatar.cc/300?img=1',
          labels: [
            // need to display labels on front
            {
              id: 1,
              name: 'Design',
              color: '#F2C94C',
            },
            {
              id: 2,
              name: 'Frontend',
              color: '#2F80ED',
            },
          ],
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
      <div
        v-for="(item, index) in lists"
        :key="index"
        class="flex w-64 flex-[0_0_auto] flex-col space-y-4"
      >
        <div
          class="flex items-center justify-between whitespace-nowrap rounded-xl bg-white p-4"
        >
          <span class="text-xl font-bold">{{ item.name }}</span>
          <div class="flex items-center space-x-2">
            <button
              class="rounded-lg p-1 transition-colors duration-200 hover:bg-gray-100"
            >
              <EllipsisHorizontalIcon class="h-5 w-5" />
            </button>
            <button class="rounded-lg bg-primary-accent bg-opacity-10 p-1">
              <PlusIcon class="h-5 w-5 text-primary-accent" />
            </button>
          </div>
        </div>
        <Draggable
          class="h-full space-y-4"
          group="issues"
          item-key="id"
          :list="item.issues"
        >
          <template #item="{ element }: DraggableElement">
            <button class="w-full space-y-2 rounded-xl bg-white p-4 text-left">
              <div>
                <span
                  class="rounded-md px-2 py-1 text-xs font-bold"
                  :class="
                    element.priority === 10
                      ? 'bg-green-100 text-primary-accent'
                      : element.priority === 20
                      ? 'bg-yellow-50 text-yellow-500'
                      : 'bg-red-100 text-red-500'
                  "
                >
                  {{ $t(String(element.priority)) }}
                </span>
              </div>
              <div>
                <div class="leading-5">
                  <span class="font-semibold">{{ element.title }}</span>
                </div>
                <div class="leading-5">
                  <span class="text-xs text-[#86889F]">{{
                    element.description
                  }}</span>
                </div>
              </div>
              <div>
                <span
                  class="rounded-md border px-2 py-1 text-xs font-medium"
                  :class="
                    element.due_date === 'Due Today'
                      ? 'border-yellow-500 bg-yellow-50 text-yellow-500'
                      : element.due_date === 'Overdue'
                      ? 'border-red-500 bg-red-100 text-red-500'
                      : element.due_date === 'Complete'
                      ? 'border-green-500 bg-green-100 text-green-500'
                      : 'border-[#e6e6f0] bg-[#f9f9fb] text-[#1b1e49]'
                  "
                  >{{ element.due_date }}</span
                >
              </div>
              <div class="flex justify-between">
                <div
                  class="flex flex-row-reverse items-center justify-end -space-x-3 space-x-reverse"
                >
                  <img
                    alt=""
                    class="h-7 w-7 rounded-full border-2 border-white"
                    src="/memojis/memoji-1.jpg"
                  />
                  <img
                    alt=""
                    class="h-7 w-7 rounded-full border-2 border-white"
                    src="/memojis/memoji-3.jpg"
                  />
                </div>
                <div class="flex items-center space-x-2">
                  <div
                    v-if="element.attachments"
                    class="flex items-center space-x-1"
                  >
                    <PaperClipIcon class="h-6 w-6" />
                    <span class="font-medium">{{ element.attachments }}</span>
                  </div>
                  <div v-if="element.task" class="flex items-center space-x-1">
                    <CheckCircleIcon class="h-6 w-6" />
                    <span class="font-medium"
                      >{{ element.task.completed }}/{{
                        element.task.total
                      }}</span
                    >
                  </div>
                </div>
              </div>
            </button>
          </template>
        </Draggable>
      </div>
    </div>
  </div>
</template>
