<script setup lang="ts">
  import {
    CheckIcon,
    EllipsisHorizontalIcon,
    PencilSquareIcon,
    PlusIcon,
    XMarkIcon,
  } from '@heroicons/vue/24/outline'
  import Draggable from 'vuedraggable'
  import { onClickOutside, useFocus } from '@vueuse/core'
  import type { Issue, List } from '@/types/Board'
  import { useBoardStore } from '@/store/boards'
  import { useIssueStore } from '@/store/issues'
  import useItemActions from '@/composables/useItemActions'
  import type { ChangeEventCallback } from '@/types/IssueActions'
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  interface DraggableElement {
    element: Issue
  }

  const itemActions = useItemActions()
  const boardStore = useBoardStore()
  const issueStore = useIssueStore()
  const props = defineProps<{
    list: List
  }>()
  const nameValue = ref(props.list.name)
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
  const updateBoardName = () => {
    boardStore.updateBoard(props.list.id, {
      id: props.list.id,
      name: nameValue.value,
      color: props.list.color,
      is_editing: false,
    })
  }

  const inputRef = ref(null)
  const isAddedMarkActive = ref(false)
  const isMovedMarkActive = ref(false)
  const { focused } = useFocus(inputRef)

  onClickOutside(inputRef, () => toggleIssueEditing())
  const addNewIssue = () => {
    isAddedMarkActive.value = true
    issueStore.createIssue('New Issue', props.list.id)
    setTimeout(() => {
      isAddedMarkActive.value = false
    }, 2000)
  }
  const toggleIssueEditing = async () => {
    const ghost = { ...props.list }
    ghost.is_editing = !ghost.is_editing
    await boardStore.updateBoard(props.list.id, ghost)
  }
  watchEffect(() => {
    if (props.list.is_editing) {
      focused.value = true
    }
    if (props.list.issues && props.list.issues.length > 0) {
      isMovedMarkActive.value = true
      setTimeout(() => {
        isMovedMarkActive.value = false
      }, 2000)
    }
  })
</script>
<template>
  <div class="flex min-w-[18rem] flex-1 flex-col space-y-4">
    <div
      class="flex items-center justify-between space-x-2 whitespace-nowrap rounded-xl bg-white p-4 dark:bg-dark-page-body"
    >
      <input
        v-if="props.list.is_editing"
        ref="inputRef"
        v-model="nameValue"
        class="w-full rounded-md bg-page-foreground px-1 text-xl font-bold transition-all duration-200 dark:bg-dark-foreground"
        type="text"
        @keyup.enter="updateBoardName()"
      />
      <button
        v-else
        class="group relative flex items-center space-x-1"
        @click="toggleIssueEditing()"
      >
        <span class="text-xl font-bold">{{ props.list.name }}</span>
        <PencilSquareIcon
          class="inline h-5 w-5 opacity-0 transition-opacity duration-100 group-hover:opacity-100"
        />
      </button>
      <div v-if="props.list.is_editing" class="flex items-center space-x-2">
        <button
          class="rounded-lg p-1 transition-colors duration-200 hover:bg-red-100 dark:hover:bg-red-900 dark:hover:bg-opacity-40"
        >
          <XMarkIcon class="h-5 w-5 text-red-600" />
        </button>
        <button
          class="rounded-lg bg-primary-accent bg-opacity-10 p-1"
          @click="updateBoardName()"
        >
          <CheckIcon class="h-5 w-5 text-primary-accent" />
        </button>
      </div>
      <div v-else class="flex items-center space-x-2">
        <button
          class="rounded-lg p-1 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-dark-foreground"
        >
          <EllipsisHorizontalIcon class="h-5 w-5" />
        </button>
        <button
          class="overflow-hidden rounded-lg bg-primary-accent p-1 transition-all duration-200"
          :class="
            isAddedMarkActive
              ? 'text-white'
              : 'bg-opacity-10 text-primary-accent'
          "
          @click="addNewIssue"
        >
          <Transition mode="out-in" name="switch-and-scale">
            <CheckIcon v-if="isAddedMarkActive" class="h-5 w-5" />
            <PlusIcon v-else class="h-5 w-5" />
          </Transition>
        </button>
      </div>
    </div>
    <div
      class="relative h-1.5 w-full overflow-hidden rounded-full dark:opacity-80"
      :style="{ backgroundColor: props.list.color }"
    >
      <div
        v-show="props.list.is_editing || isMovedMarkActive"
        class="gradient-lighter absolute top-0 -left-1/2 h-full w-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
      ></div>
    </div>
    <Draggable
      class="h-full space-y-4"
      group="issues"
      item-key="id"
      :list="sortedList"
      @change="updateIssue"
    >
      <template #item="{ element }: DraggableElement">
        <BoardIssueItem :issue="element" />
      </template>
    </Draggable>
  </div>
</template>
<style scoped>
  .switch-and-scale-enter-active,
  .switch-and-scale-leave-active {
    transition: all 0.1s;
  }
  .switch-and-scale-enter-from {
    opacity: 0;
    transform: translateX(100%);
  }
  .switch-and-scale-leave-to {
    opacity: 0;
    transform: translateX(-100%);
  }
  .gradient-lighter {
    animation: slide infinite 2s linear;
  }
  @keyframes slide {
    0% {
      transform: translateX(-200%);
    }
    100% {
      transform: translateX(200%);
    }
  }
</style>
