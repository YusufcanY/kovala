<script setup lang="ts">
  import { PlusIcon } from '@heroicons/vue/24/outline'
  import Draggable from 'vuedraggable'
  const rows = ref([
    {
      order: 1,
      name: 'row1',
      items: [
        {
          id: 1,
          order: 1,
          type: 'NOTE',
        },
        {
          id: 2,
          order: 2,
          type: 'ASSIGNED_ISSUE',
        },
        {
          id: 3,
          order: 3,
          type: 'BOARD',
          data: {
            name: 'board1',
            id: 1,
          },
        },
      ],
      id: 1,
    },
    {
      order: 2,
      name: 'row2',
      items: [
        {
          id: 4,
          order: 1,
          type: 'ASSIGNED_ISSUE',
        },
      ],
      id: 2,
    },
    {
      order: 3,
      name: 'row3',
      items: [
        {
          id: 5,
          order: 1,
          type: 'ASSIGNED_ISSUE',
        },
      ],
      id: 3,
    },
  ])
  const handleDrag = () => {
    rows.value = rows.value.filter((row) => row.items.length > 0)
  }
  /* const handleEnd = (e) => {
    console.log('e :>> ', e)
  } */
</script>
<template>
  <div class="h-full space-y-4 p-4">
    <h1 class="text-2xl font-bold">Your Dashboard</h1>
    <Draggable v-model="rows" class="space-y-4" item-key="id">
      <template #item="{ element }">
        <div class="bg-red-200">
          <Draggable
            v-model="element.items"
            class="flex gap-4"
            group="column"
            item-key="id"
            @change="handleDrag"
          >
            <!-- @end="handleEnd" -->
            <template #item="{ element }">
              <div
                class="flex-1 rounded-lg bg-white p-4 dark:bg-dark-page-body"
              >
                {{ element.type }}
              </div>
            </template>
          </Draggable>
        </div>
      </template>
      <template #footer>
        <button
          class="flex w-full items-center gap-4 rounded-md py-2 transition-colors duration-200 hover:bg-dark-page-body"
        >
          <div class="h-1 flex-1 bg-white dark:bg-dark-page-body"></div>
          <div class="h-8 w-8 rounded-full bg-white p-1 dark:bg-dark-page-body">
            <PlusIcon />
          </div>
          <div class="h-1 flex-1 bg-white dark:bg-dark-page-body"></div>
        </button>
      </template>
    </Draggable>
  </div>
</template>
