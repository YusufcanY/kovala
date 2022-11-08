<script setup lang="ts">
  import {
    CheckCircleIcon,
    PaperClipIcon,
    UserPlusIcon,
  } from '@heroicons/vue/24/outline'
  import type { Issue } from '@/types/Board'
  defineProps<{
    issue: Issue
  }>()
</script>
<template>
  <button
    class="w-full space-y-2 rounded-xl bg-white p-4 text-left dark:bg-dark-page-body"
  >
    <div>
      <span
        class="rounded-md px-2 py-1 text-xs font-bold"
        :class="
          issue.priority === 10
            ? 'bg-green-100 text-primary-accent'
            : issue.priority === 20
            ? 'bg-yellow-50 text-yellow-500'
            : 'bg-red-100 text-red-500'
        "
      >
        {{ $t('priority.' + String(issue.priority)) }}
      </span>
    </div>
    <div>
      <div class="leading-5">
        <span class="font-semibold">{{ issue.title }}</span>
      </div>
      <div class="leading-5">
        <span class="text-xs text-[#86889F]">{{ issue.description }}</span>
      </div>
    </div>
    <div>
      <span
        class="rounded-md border px-2 py-1 text-xs font-medium"
        :class="
          issue.due_date === 'Due Today'
            ? 'border-yellow-500 bg-yellow-50 text-yellow-500'
            : issue.due_date === 'Overdue'
            ? 'border-red-500 bg-red-100 text-red-500'
            : issue.due_date === 'Complete'
            ? 'border-green-500 bg-green-100 text-green-500'
            : 'border-[#e6e6f0] bg-[#f9f9fb] text-[#1b1e49]'
        "
        >{{ issue.due_date }}</span
      >
    </div>
    <div class="flex justify-between">
      <div class="flex space-x-0.5">
        <div
          v-if="issue.assignee && issue.assignee[0]"
          class="flex flex-row-reverse items-center justify-end -space-x-3 space-x-reverse"
        >
          <img
            v-for="(assignee, index) in issue.assignee"
            :key="index"
            alt=""
            class="h-7 w-7 rounded-full border-2 border-white"
            :src="assignee.image"
          />
        </div>
        <UserPlusIcon
          class="h-8 w-8 rounded-full border-[3px] border-white bg-primary-accent bg-opacity-10 p-1 text-primary-accent"
        />
      </div>
      <div class="flex items-center space-x-2">
        <div v-if="issue.attachments" class="flex items-center space-x-1">
          <PaperClipIcon class="h-6 w-6" />
          <span class="font-medium">{{ issue.attachments }}</span>
        </div>
        <div v-if="issue.task" class="flex items-center space-x-1">
          <CheckCircleIcon class="h-6 w-6" />
          <span class="font-medium"
            >{{ issue.task.completed }}/{{ issue.task.total }}</span
          >
        </div>
      </div>
    </div>
  </button>
</template>
