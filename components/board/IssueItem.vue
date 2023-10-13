<script setup lang="ts">
  import {
    CheckCircleIcon,
    PaperClipIcon,
    UserPlusIcon,
  } from '@heroicons/vue/24/outline'
  import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
  import { onClickOutside, useFocus } from '@vueuse/core'
  import type { Person } from '@/types/Person'
  import type { Issue } from '@/types/Board'
  import { useIssueStore } from '@/store/issues'
  import useHelpers from '@/composables/useHelpers'
  const props = defineProps<{
    issue: Issue
  }>()
  const people = useState<Person[]>('people')
  const { prettifyDate } = useHelpers()
  const issueStore = useIssueStore()
  const titleValue = ref(props.issue.title)
  const updateIssue = () => {
    const ghost = { ...props.issue }
    ghost.title = titleValue.value.trim()
    ghost.is_editing = false
    issueStore.updateIssue(props.issue.id, ghost)
  }
  const inputRef = ref(null)
  const { focused } = useFocus(inputRef)
  onClickOutside(inputRef, (event) => {
    if (event.pointerType === 'mouse') {
      toggleIssueEditing()
      titleValue.value = props.issue.title
    }
  })
  const toggleIssueEditing = async () => {
    const ghost = { ...props.issue }
    ghost.is_editing = !ghost.is_editing
    await issueStore.updateIssue(props.issue.id, ghost)
  }
  watchEffect(() => {
    if (props.issue.is_editing) {
      focused.value = true
    }
  })
  const checkStatusOfDueDate = computed(() => {
    if (props.issue.due_date) {
      const dueDate = new Date(props.issue.due_date)
      const today = new Date()
      if (dueDate < today) {
        return 'border-red-500 bg-red-50 text-red-500 dark:bg-red-900'
      } else if (
        dueDate.getDate() === today.getDate() &&
        dueDate.getMonth() === today.getMonth() &&
        dueDate.getFullYear() === today.getFullYear()
      ) {
        return 'border-yellow-500 bg-yellow-50 text-yellow-500 dark:bg-yellow-900'
      } else {
        return 'border-[#e6e6f0] bg-[#f9f9fb] text-[#1b1e49] dark:border-opacity-0 dark:bg-dark-foreground dark:text-[#f0f0f0]'
      }
      // 'border-green-500 bg-green-50 text-green-500 dark:bg-green-900'
    }
  })
  const addAssignee = (id: number) => {
    issueStore.addAssignee(props.issue.id, id)
  }
  const getAssigneedPeopleFromId = computed(() => {
    return props.issue.assignee.map((id) => {
      return people.value.find((person) => person.id === id)
    })
  })
  const isThatPersonAssigned = (id: number) => {
    return props.issue.assignee.includes(id)
  }
</script>
<template>
  <button
    class="w-full space-y-2 rounded-xl bg-white p-4 text-left dark:bg-dark-page-body"
  >
    <div v-if="props.issue.priority">
      <span
        class="rounded-md px-2 py-1 text-xs font-bold"
        :class="
          props.issue.priority === 10
            ? 'bg-green-100 text-primary-accent dark:bg-green-900'
            : props.issue.priority === 20
            ? 'bg-yellow-50 text-yellow-500 dark:bg-yellow-900'
            : 'bg-red-100 text-red-500 dark:bg-red-900'
        "
      >
        {{ $t('priority.' + String(props.issue.priority)) }}
      </span>
    </div>
    <div>
      <div class="leading-5">
        <input
          v-if="props.issue.is_editing"
          ref="inputRef"
          v-model="titleValue"
          class="w-full rounded-xl border-2 border-primary-accent border-opacity-0 bg-page-foreground p-2 transition-all duration-200 focus:border-opacity-100 dark:bg-dark-foreground"
          type="text"
          @keyup.enter="updateIssue"
        />

        <div
          v-else
          class="group relative flex items-center space-x-1 rounded-sm hover:bg-dark-foreground"
          @click="toggleIssueEditing()"
        >
          <span class="font-semibold">{{ props.issue.title }}</span>
        </div>
      </div>
      <div class="leading-5">
        <span class="text-xs text-[#86889F]">{{
          props.issue.description
        }}</span>
      </div>
    </div>
    <div v-if="props.issue.due_date">
      <span
        class="rounded-md border px-2 py-1 text-xs font-medium"
        :class="checkStatusOfDueDate"
        >{{ prettifyDate(props.issue.due_date) }}</span
      >
    </div>
    <div class="flex justify-between">
      <div class="flex space-x-0.5">
        <Transition name="slide-from-left">
          <TransitionGroup
            v-if="props.issue.assignee && props.issue.assignee[0]"
            class="flex flex-row-reverse items-center justify-end -space-x-3 space-x-reverse"
            name="slide-from-left"
            tag="div"
          >
            <NuxtImg
              v-for="(assignee, index) in getAssigneedPeopleFromId"
              :key="index"
              :alt="assignee?.name"
              class="h-7 w-7 rounded-full border-2 border-white dark:border-dark-page-body"
              :src="assignee?.image"
              width="100px"
            />
          </TransitionGroup>
        </Transition>
        <Menu as="div" class="relative">
          <MenuButton v-slot="{ open }" as="a">
            <UserPlusIcon
              class="h-8 w-8 border-white p-1 text-primary-accent transition-all duration-100 dark:border-dark-page-body"
              :class="
                open
                  ? 'rounded-md rounded-r-none bg-gray-100 bg-opacity-100 dark:bg-dark-foreground'
                  : 'rounded-full border-[3px]  bg-primary-accent bg-opacity-10'
              "
            />
          </MenuButton>
          <transition
            enter-active-class="transition duration-100"
            enter-from-class="translate-y-2 opacity-0"
            enter-to-class="translate-y-0 opacity-100"
            leave-active-class="transition duration-100"
            leave-from-class="translate-y-0 opacity-100"
            leave-to-class="translate-y-2 opacity-0"
          >
            <MenuItems
              class="absolute left-full top-0 z-40 w-64 origin-top-left rounded-md rounded-tl-none bg-white shadow-lg dark:bg-dark-foreground"
            >
              <div class="space-y-1 p-1">
                <MenuItem
                  v-for="item in people"
                  :key="item.id"
                  v-slot="{ active }"
                >
                  <div
                    :class="[
                      isThatPersonAssigned(item.id)
                        ? 'bg-green-100 dark:bg-green-900'
                        : active
                        ? 'bg-page-foreground dark:bg-dark-page-body'
                        : '',
                      'flex w-full items-center space-x-2 rounded-md px-2 py-2 text-sm transition-all duration-200',
                    ]"
                    @click="addAssignee(item.id)"
                  >
                    <NuxtImg
                      :alt="item.name"
                      class="w-7 rounded-full"
                      :src="item.image"
                      width="100px"
                    />
                    <span> {{ item.name }} </span>
                  </div>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>
      <div class="flex items-center space-x-2">
        <div v-if="props.issue.attachments" class="flex items-center space-x-1">
          <PaperClipIcon class="h-6 w-6" />
          <span class="font-medium">{{ props.issue.attachments }}</span>
        </div>
        <div v-if="props.issue.task" class="flex items-center space-x-1">
          <CheckCircleIcon class="h-6 w-6" />
          <span class="font-medium"
            >{{ props.issue.task.completed }}/{{ props.issue.task.total }}</span
          >
        </div>
        <div v-if="props.issue.is_editing">
          <button
            class="rounded-md border-2 border-primary-accent bg-primary-accent bg-opacity-0 px-2 py-1 font-semibold text-primary-accent transition-all duration-200 hover:bg-opacity-10"
            @click="updateIssue"
          >
            {{ $t('save') }}
          </button>
        </div>
      </div>
    </div>
  </button>
</template>
<style scoped>
  .slide-from-left-enter-active,
  .slide-from-left-leave-active {
    transition: all 0.3s;
  }
  .slide-from-left-enter-from,
  .slide-from-left-leave-to {
    opacity: 0;
    transform: translateX(-2px);
  }
</style>
