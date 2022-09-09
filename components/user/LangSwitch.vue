<script setup lang="ts">
  import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
  import { LanguageIcon } from '@heroicons/vue/24/outline'
</script>
<template>
  <Menu as="div" class="relative">
    <MenuButton
      as="button"
      class="flex w-full items-center space-x-2 rounded-lg p-2 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-secondary-accent"
    >
      <LanguageIcon class="h-6 w-6" />
      <span class="font-semibold uppercase">{{ $i18n.locale }}</span>
    </MenuButton>
    <MenuItems
      class="absolute left-0 bottom-0 mb-12 w-full origin-bottom-left divide-y divide-gray-100 rounded-md bg-white shadow-lg"
    >
      <div class="px-1 py-1">
        <MenuItem
          v-for="(item, index) in $i18n.availableLocales"
          :key="index"
          v-slot="{ active }"
        >
          <button
            :class="[
              { 'bg-gray-100': active },
              'flex w-full items-center space-x-1 rounded-md px-2 py-2 text-sm transition-all duration-200',
            ]"
            @click="$i18n.locale = item"
          >
            <img alt="" class="w-6" :src="`/flags/${item}-flag.png`" />
            <span>
              {{ $t(item) }}
            </span>
          </button>
        </MenuItem>
      </div>
    </MenuItems>
  </Menu>
</template>
