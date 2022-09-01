<script setup lang="ts">
  const messages = ref([
    {
      from: 'Ymir Vision',
      from_image: '/memojis/memoji-1.jpg',
      message: "Did you finish your task?! If you didn't you are fired!!!",
      time: '1 hour ago',
      notifications: 301,
    },
    {
      from: 'John Doe',
      from_image: '/memojis/memoji-3.jpg',
      message: "Okay, I'll be back",
      time: '3 hour ago',
    },
    {
      from: 'Alcoholic German',
      from_image: '/memojis/memoji-5.jpg',
      message:
        "Hey, don't forget vodka bottles. We'll drink that bottles like hell",
      time: '1 week ago',
    },
    {
      from: 'Fart Beeday',
      from_image: '/memojis/memoji-4.jpg',
      is_last_message_from_you: true,
      message: 'Where is my best product manager!!',
      time: '23 seconds ago',
    },
    {
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
      <button
        v-for="(item, index) in messages"
        :key="index"
        class="relative flex w-full items-center justify-between p-2 transition-all duration-200 hover:bg-gray-100"
      >
        <div class="grid w-full grid-cols-16 items-center space-x-2">
          <img
            alt=""
            class="col-span-2 h-8 w-8 rounded-full"
            :src="item.from_image"
          />
          <div class="col-span-14 items-start">
            <div class="flex w-full justify-between">
              <span class="truncate text-sm font-bold">{{ item.from }}</span>
              <span class="whitespace-nowrap text-xs text-[#AEAFC1]">
                {{ item.time }}</span
              >
            </div>
            <div class="flex items-center justify-between">
              <span class="truncate text-xs text-[#AEAFC1]">
                <span v-if="item.is_last_message_from_you" class="font-bold"
                  >You:</span
                >{{ item.message }}</span
              >
              <div
                v-if="item.notifications"
                class="rounded-full bg-primary-accent px-1 text-xs text-white"
              >
                {{ item.notifications }}
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
    <div class="col-span-9"></div>
  </div>
</template>
