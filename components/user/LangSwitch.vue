<script setup lang="ts">
  import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
  import { LanguageIcon } from '@heroicons/vue/24/outline'
  import { useStorage, usePreferredLanguages } from '@vueuse/core'
  import { useI18n } from 'vue-i18n'

  const { availableLocales, locale } = useI18n()
  const findLangFlag = (lang: string) => {
    switch (lang) {
      case 'en':
        return 'en-flag_wddntp'
      case 'tr':
        return 'tr-flag_alqvoz'
      default:
        return 'en-flag_wddntp'
    }
  }
  const storage = useStorage('locale', 'en')
  const setLocale = (lang: string) => {
    storage.value = lang
    locale.value = lang
    useHead({
      htmlAttrs: {
        lang,
      },
    })
  }
  const preferredLanguages = usePreferredLanguages()
  const getLocale = () => {
    if (storage.value) {
      return storage.value
    } else {
      return preferredLanguages.value[0]
    }
  }
  locale.value = getLocale()
  useHead({
    htmlAttrs: {
      lang: getLocale(),
    },
  })
</script>
<template>
  <Menu as="div" class="relative">
    <MenuButton
      as="button"
      class="flex w-full items-center space-x-2 rounded-lg p-2 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-secondary-accent"
    >
      <LanguageIcon class="h-6 w-6" />
      <span class="font-semibold uppercase">{{ locale }}</span>
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
        class="absolute left-0 bottom-0 mb-12 w-full origin-bottom-left rounded-md bg-white shadow-lg dark:bg-dark-foreground"
      >
        <div class="px-1 py-1">
          <MenuItem
            v-for="(item, index) in availableLocales"
            :key="index"
            v-slot="{ active }"
          >
            <button
              :class="[
                { 'bg-gray-100 dark:bg-dark-page-body': active },
                'flex w-full items-center space-x-1 rounded-md px-2 py-2 text-sm transition-all duration-200',
              ]"
              @click="setLocale(item)"
            >
              <NuxtImg
                :alt="item"
                width="100px"
                class="w-6"
                :src="`/${findLangFlag(item)}.png`"
              />
              <span>
                {{ $t(item) }}
              </span>
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
