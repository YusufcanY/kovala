<script setup lang="ts">
  import {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
  } from '@headlessui/vue'
  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true,
    },
  })
  const emit = defineEmits(['update:modelValue'])
  const toggleModal = () => {
    emit('update:modelValue', props.modelValue)
  }
</script>
<template>
  <TransitionRoot appear as="template" :show="props.modelValue">
    <Dialog as="div" class="relative z-30" @close="toggleModal">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-secondary-accent bg-opacity-50" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-dark-page-body"
            >
              <DialogTitle as="h3" class="text-lg font-medium leading-6">
                <slot name="title" />
              </DialogTitle>
              <div>
                <slot />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
