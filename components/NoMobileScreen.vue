<script setup lang="ts"></script>
<template>
  <div
    class="fixed top-0 left-0 z-40 flex h-full w-full flex-col items-center justify-center bg-secondary-accent bg-opacity-90 backdrop-blur-md lg:hidden"
  >
    <img
      alt="switch to desktop mode"
      class="w-48"
      src="@/assets/images/icons/switch-to-desktop.svg"
    />
    <span class="mt-4 font-semibold text-white">{{
      $t('please_switch_to_desktop')
    }}</span>
    <span class="text-xs text-white">{{ $t('explanation_of_mobile') }}</span>
  </div>
</template>
