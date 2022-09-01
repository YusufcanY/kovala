<script setup lang="ts">
  import Draggable from 'vuedraggable'
  const messages = ref([
    {
      id: 1,
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
      from: 'Smith Backbone',
      from_image: '/memojis/memoji-2.jpg',
      is_last_message_from_you: true,
      message: 'The backend not done already??!!',
      time: '8 minutes ago',
    },
  ])
</script>
<template>
  <div class="grid h-full grid-cols-12 p-2">
    <div class="col-span-3 h-full overflow-hidden rounded-2xl bg-white">
      <Draggable v-model="messages" group="people" item-key="id">
        <template #item="{ element }">
          <button
            class="relative flex w-full items-center justify-between p-2 transition-all duration-200 hover:bg-gray-100"
          >
            <div class="grid w-full grid-cols-16 items-center space-x-2">
              <img
                alt=""
                class="col-span-2 h-8 w-8 rounded-full"
                :src="element.from_image"
              />
              <div class="col-span-14 items-start">
                <div class="flex w-full justify-between">
                  <span class="truncate text-sm font-bold">{{
                    element.from
                  }}</span>
                  <span class="whitespace-nowrap text-xs text-[#AEAFC1]">
                    {{ element.time }}</span
                  >
                </div>
                <div class="flex items-center justify-between">
                  <span class="truncate text-xs text-[#AEAFC1]">
                    <span
                      v-if="element.is_last_message_from_you"
                      class="font-bold"
                      >You:</span
                    >{{ element.message }}</span
                  >
                  <div
                    v-if="element.notifications"
                    class="rounded-full bg-primary-accent px-1 text-xs text-white"
                  >
                    {{ element.notifications }}
                  </div>
                </div>
              </div>
            </div>
          </button>
        </template>
      </Draggable>
    </div>
    <div class="col-span-9"></div>
  </div>
</template>
<style>
  .flip-list-move {
    transition: transform 0.5s;
  }
</style>
