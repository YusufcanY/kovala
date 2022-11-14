<script setup lang="ts">
  import { EllipsisHorizontalIcon, PlusIcon } from '@heroicons/vue/24/outline'
  import Draggable from 'vuedraggable'
  import type { Issue, List } from '@/types/Board'
  import useItemActions from '@/composables/useItemActions'
  import type { ChangeEventCallback } from '@/types/IssueActions'
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  interface DraggableElement {
    element: Issue
  }

  const itemActions = useItemActions()
  const props = defineProps<{
    list: List
  }>()
  const sortedList = computed(() => {
    const ghost = [] as Issue[]
    Object.assign(ghost, props.list.issues)
    ghost.sort((a, b) => a.index_in_board - b.index_in_board)
    return ghost
  })
  const updateIssue = (event: ChangeEventCallback) => {
    if (event.added) {
      itemActions.added(event.added, props.list.id)
    } else if (event.removed) {
      itemActions.removed(event.removed, props.list.id)
    } else if (event.moved) {
      itemActions.moved(event.moved, props.list.id)
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
        <!-- @click="addNewIssue" -->
        <button class="rounded-lg bg-primary-accent bg-opacity-10 p-1">
          <PlusIcon class="h-5 w-5 text-primary-accent" />
        </button>
      </div>
    </div>
    <Draggable
      class="h-full space-y-4"
      group="issues"
      item-key="index"
      :list="sortedList"
      @change="updateIssue"
    >
      <template #item="{ element }: DraggableElement">
        <BoardIssueItem :issue="element" />
      </template>
    </Draggable>
  </div>
</template>
