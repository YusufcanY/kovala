<script setup lang="ts">
  import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/vue/24/outline'
  import { useCounterStore } from '~/store/counter'
  const counterStore = useCounterStore()
  const { increment, decrement } = counterStore
  const counter = computed(() => counterStore.counter)
</script>
<template>
  <div
    class="flex h-full w-full flex-col items-center justify-center space-y-4"
  >
    <h1 class="text-4xl font-black">IT'S A TEXT</h1>
    <span class="text-2xl">{{ counter }}</span>
    <div class="flex space-x-2">
      <button
        class="rounded-md bg-gray-600 p-2 font-semibold text-white shadow-md transition-transform duration-200 hover:-translate-y-1 active:translate-y-0"
        @click="increment"
      >
        <PlusCircleIcon class="h-8 w-8" />
      </button>
      <button
        class="rounded-md bg-gray-600 p-2 font-semibold text-white shadow-md transition-transform duration-200 hover:-translate-y-1 active:translate-y-0"
        @click="decrement"
      >
        <MinusCircleIcon class="h-8 w-8" />
      </button>
    </div>
  </div>
</template>
