<script setup lang="ts">
  import Draggable from 'vuedraggable'
  import type { Message } from '@/types/Messages'
  const messages = useState<Message[]>('messages', () => [
    {
      id: 1,
      is_online: true,
      from: 'Ymir Vision',
      from_image: '/memojis/memoji-1.jpg',
      message: "Did you finish your task?! If you didn't you are fired!!!",
      time: '1 hour ago',
      notifications: 301,
    },
    {
      id: 2,
      from: 'John Doe',
      from_image: '/memojis/memoji-3.jpg',
      message: "Okay, I'll be back",
      time: '3 hour ago',
    },
    {
      id: 3,
      from: 'Alcoholic German',
      from_image: '/memojis/memoji-5.jpg',
      message:
        "Hey, don't forget vodka bottles. We'll drink that bottles like hell",
      time: '1 week ago',
    },
    {
      id: 4,
      from: 'Fart Beeday',
      from_image: '/memojis/memoji-4.jpg',
      is_last_message_from_you: true,
      message: 'Where is my best product manager!!',
      time: '23 seconds ago',
    },
    {
      id: 5,
      is_online: true,
      from: 'Smith Backbone',
      from_image: '/memojis/memoji-2.jpg',
      is_last_message_from_you: true,
      message: 'The backend not done already??!!',
      time: '8 minutes ago',
    },
  ])
  const activeMessageID = useState<number | null>('activeMessageID', () => null)
</script>
<template>
  <Draggable
    v-if="messages && messages[0]"
    v-model="messages"
    group="messages"
    item-key="id"
  >
    <template #item="{ element }">
      <button
        class="relative flex w-full items-center justify-between p-2 transition-all duration-200"
        :class="
          activeMessageID === element.id
            ? 'bg-primary-accent'
            : 'hover:bg-gray-100 active:bg-white dark:hover:bg-white dark:hover:bg-opacity-5 dark:active:bg-dark-page-body'
        "
        @click="activeMessageID = element.id"
      >
        <div class="grid w-full grid-cols-16 items-center space-x-2">
          <div class="relative col-span-2">
            <img
              alt=""
              class="h-8 w-8 rounded-full"
              :src="element.from_image"
            />
            <div
              v-show="element.is_online"
              class="absolute top-0 left-6 h-[12px] w-[12px] rounded-full border-2"
              :class="
                activeMessageID === element.id
                  ? 'border-primary-accent bg-white'
                  : 'border-white bg-primary-accent dark:border-dark-page-body'
              "
            ></div>
          </div>
          <div class="col-span-14 items-start">
            <div class="flex w-full justify-between">
              <span
                class="truncate text-sm font-bold"
                :class="{ 'text-white': activeMessageID === element.id }"
                >{{ element.from }}</span
              >
              <span
                class="whitespace-nowrap text-xs"
                :class="
                  activeMessageID === element.id
                    ? 'text-white'
                    : 'text-[#AEAFC1]'
                "
              >
                {{ element.time }}</span
              >
            </div>
            <div class="flex items-center justify-between">
              <span
                class="truncate text-xs"
                :class="
                  activeMessageID === element.id
                    ? 'text-white'
                    : 'text-[#AEAFC1]'
                "
              >
                <span v-if="element.is_last_message_from_you" class="font-bold"
                  >You:</span
                >{{ element.message }}</span
              >
              <div
                v-if="element.notifications"
                class="ml-1 rounded-full bg-primary-accent px-1 text-xs text-white"
              >
                {{ element.notifications }}
              </div>
            </div>
          </div>
        </div>
      </button>
    </template>
  </Draggable>
</template>
