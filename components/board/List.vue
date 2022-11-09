<script setup lang="ts">
  import { EllipsisHorizontalIcon, PlusIcon } from '@heroicons/vue/24/outline'
  import Draggable from 'vuedraggable'
  import type { Issue, List } from '@/types/Board'
  import { useIssueStore } from '@/store/issues'

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  interface DraggableElement {
    element: Issue
  }
  interface ChangeEventCallback {
    added?: {
      newIndex: number
      element: Issue
    }
    removed?: {
      oldIndex: number
      element: Issue
    }
    moved?: {
      oldIndex: number
      newIndex: number
      element: Issue
    }
  }

  const issueStore = useIssueStore()
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
      const ghost = event.added.element
      ghost.board_id = props.list.id
      ghost.index_in_board = event.added.newIndex
      issueStore.updateIssue(event.added.element.id, ghost)
      const issuesAfterAddedIssue = issueStore.issues.filter(
        (issue) =>
          issue.index_in_board >= ghost.index_in_board &&
          issue.board_id === ghost.board_id &&
          ghost.id !== issue.id
      )
      issuesAfterAddedIssue.forEach((issue) => {
        const ghost = issue
        ghost.index_in_board = issue.index_in_board + 1
        issueStore.updateIssue(issue.id, ghost)
      })
    } else if (event.removed) {
      const issuesAfterRemovedIssue = issueStore.issues.filter(
        (issue) =>
          issue.index_in_board > event.removed.element.index_in_board &&
          issue.board_id === props.list.id
      )
      issuesAfterRemovedIssue.forEach((issue) => {
        const ghost = issue
        ghost.index_in_board = issue.index_in_board - 1
        issueStore.updateIssue(issue.id, ghost)
      })
    } else if (event.moved) {
      console.log('event.moved :>> ', event.moved)
      const ghost = event.moved.element
      ghost.index_in_board = event.moved.newIndex
      issueStore.updateIssue(event.moved.element.id, ghost)
      if (event.moved.newIndex > event.moved.oldIndex) {
        const issuesAfterMovedIssue = issueStore.issues.filter(
          (issue) =>
            issue.index_in_board > event.moved.oldIndex &&
            issue.index_in_board <= event.moved.newIndex &&
            issue.board_id === props.list.id &&
            issue.id !== event.moved.element.id
        )
        issuesAfterMovedIssue.forEach((issue) => {
          const ghost = issue
          ghost.index_in_board = issue.index_in_board - 1
          issueStore.updateIssue(issue.id, ghost)
        })
      } else {
        const issuesAfterMovedIssue = issueStore.issues.filter(
          (issue) =>
            issue.index_in_board >= event.moved.newIndex &&
            issue.index_in_board < event.moved.oldIndex &&
            issue.board_id === props.list.id &&
            issue.id !== event.moved.element.id
        )
        issuesAfterMovedIssue.forEach((issue) => {
          const ghost = issue
          ghost.index_in_board = issue.index_in_board + 1
          issueStore.updateIssue(issue.id, ghost)
        })
      }
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
