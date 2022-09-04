<script setup lang="ts">
  import {
    CheckCircleIcon,
    EllipsisHorizontalIcon,
    PaperClipIcon,
    PlusIcon,
  } from '@heroicons/vue/24/outline'
  import Draggable from 'vuedraggable'
  import type { Issue } from '@/types/Issues'

  const lists = ref([
    // 10: To Do, 20: In Progress, 30: Resolved, 40: Closed, 50: Reopened
    {
      id: 10,
      name: 'To Do',
    },
    {
      id: 20,
      name: 'In Progress',
    },
    {
      id: 30,
      name: 'Resolved',
    },
    {
      id: 40,
      name: 'Closed',
    },
    {
      id: 50,
      name: 'Reopened',
    },
  ])
  const issueList = ref<Issue[]>([
    {
      id: 1,
      title: 'Create a new design for the landing page',
      description:
        'The current design is not responsive and needs to be updated',
      status: 10,
      priority: 'HIGH',
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
        completed: 2,
      },
      attachments: 2,
      due_date: 'Sep 20, 2022',
      created_at: '2021-07-01',
      updated_at: '2021-07-01',
    },
    {
      id: 2,
      title: 'ASD',
      description:
        'The current design is not responsive and needs to be updated',
      status: 30,
      priority: 'HIGH',
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
        completed: 2,
      },
      attachments: 2,
      due_date: 'Sep 20, 2022',
      created_at: '2021-07-01',
      updated_at: '2021-07-01',
    },
  ])
  const getListFilteredByStatus = (status: number) => {
    return issueList.value.filter((issue) => issue.status === status)
  }
</script>
<template>
  <div>
    <div class="space-y-10 p-6">
      <BoardHeader />
      <BoardInfoSubheader />
    </div>
    <div class="flex overflow-scroll hide-scrollbar">
      <div
        v-for="(item, index) in lists"
        :key="index"
        class="ml-6 w-64 space-y-4"
      >
        <div class="flex items-center justify-between rounded-xl bg-white p-4">
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
          group="issues"
          item-key="id"
          :list="getListFilteredByStatus(item.id)"
        >
          <template #item="{ element }: { element: Issue }">
            <button class="space-y-2 rounded-xl bg-white p-4 text-left">
              <div>
                <span
                  class="rounded-md bg-red-100 px-2 py-1 text-xs font-bold text-red-500"
                >
                  {{ element.priority }}
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
                  class="rounded-md border border-[#e6e6f0] bg-[#f9f9fb] px-2 py-1 text-xs font-bold text-[#1b1e49]"
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
                  <div class="flex items-center space-x-1">
                    <PaperClipIcon class="h-6 w-6" />
                    <span class="font-medium">{{ element.attachments }}</span>
                  </div>
                  <div class="flex items-center space-x-1">
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
