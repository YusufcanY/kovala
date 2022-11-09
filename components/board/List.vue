<script setup lang="ts">
  import { EllipsisHorizontalIcon, PlusIcon } from '@heroicons/vue/24/outline'
  import Draggable from 'vuedraggable'
  import type { Ref } from 'vue'
  import type { Issue, List } from '@/types/Board'
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  interface DraggableElement {
    element: Issue
  }
  const props = defineProps<{
    list: List
  }>()
  const lists = inject('lists') as Ref<List[]>
  const addNewIssue = () => {
    const foundList = lists.value.find(
      (list: List) => list.id === props.list.id
    )
    if (foundList) {
      foundList.issues.unshift({
        id: 6,
        title: 'New Issue',
        priority: 10,
        assignee: [],
        is_editing: true,
        due_date: 'Complete',
        created_at: '2021-07-01',
        updated_at: '2021-07-01',
      })
    }
  }
</script>
<template>
  <div class="flex min-w-[16rem] flex-[0_0_auto] flex-col space-y-4">
    <div
      class="flex items-center justify-between whitespace-nowrap rounded-xl bg-white p-4 dark:bg-dark-page-body"
    >
      <span class="text-xl font-bold">{{ props.list.name }}</span>
      <div class="flex items-center space-x-2">
        <button
          class="rounded-lg p-1 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-dark-foreground"
        >
          <EllipsisHorizontalIcon class="h-5 w-5" />
        </button>
        <button
          class="rounded-lg bg-primary-accent bg-opacity-10 p-1"
          @click="addNewIssue"
        >
          <PlusIcon class="h-5 w-5 text-primary-accent" />
        </button>
      </div>
    </div>
    <Draggable
      class="h-full space-y-4"
      group="issues"
      item-key="index"
      :list="props.list.issues"
    >
      <template #item="{ element }: DraggableElement">
        <BoardIssueItem :issue="element" />
      </template>
    </Draggable>
  </div>
</template>
