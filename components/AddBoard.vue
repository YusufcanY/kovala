<script setup lang="ts">
  import { EyeIcon, LockClosedIcon, PlusIcon } from '@heroicons/vue/24/outline'
  import { ErrorMessage, Field, Form } from 'vee-validate'
  import { useGroupStore } from '@/store/group'

  const router = useRouter()
  const group = useGroupStore()
  const isModalOpen = ref(false)

  const onSubmit = (values: any) => {
    const createdGroup = group.addGroup(values)
    isModalOpen.value = false
    router.push(`/boards/${createdGroup.id}`)
  }
</script>
<template>
  <div>
    <button
      class="flex w-full items-center space-x-2 rounded-lg border-2 border-primary-accent border-opacity-0 bg-primary-accent bg-opacity-10 py-2 px-4 text-primary-accent transition-all duration-300 hover:border-opacity-100"
      @click="isModalOpen = true"
    >
      <PlusIcon class="h-6 w-6" />
      <span class="font-semibold">{{ $t('add_new') }}</span>
    </button>
    <Modal v-model="isModalOpen">
      <template #title>
        {{ $t('new-board-group') }}
      </template>
      <Form
        v-slot="{ errors, meta, values }"
        class="mt-8 space-y-4"
        :initial-values="{ visibility: 10 }"
        @submit="onSubmit"
      >
        <div class="flex flex-col">
          <label for="name">{{ $t('name') }}</label>
          <Field
            id="name"
            class="mt-1 rounded-md bg-page-foreground p-2 ring-primary-accent transition-all duration-200 focus:ring-1 dark:bg-dark-foreground"
            :class="!errors.name ? 'ring-primary-accent' : 'ring-red-500'"
            :label="$t('labels.name')"
            name="name"
            rules="required|max:32|alpha"
            type="text"
            validate-on-input
          />
          <div class="relative h-4">
            <ErrorMessage
              class="absolute top-0 left-0 text-xs font-semibold text-red-500"
              name="name"
            />
          </div>
        </div>
        <div class="flex">
          <div class="flex flex-col">
            <label for="name">{{ $t('visibility') }}</label>
            <div
              class="relative flex rounded-md bg-page-foreground p-2 font-bold dark:bg-dark-foreground"
            >
              <label
                class="z-20 flex h-12 w-12 cursor-pointer justify-center rounded-md py-2 text-sm"
                for="public"
              >
                <EyeIcon />
                <Field
                  id="public"
                  class="hidden"
                  name="visibility"
                  type="radio"
                  :value="10"
                />
              </label>
              <label
                class="z-20 flex h-12 w-12 cursor-pointer justify-center rounded-md py-2 text-sm"
                for="private"
              >
                <LockClosedIcon />
                <Field
                  id="private"
                  class="hidden"
                  name="visibility"
                  type="radio"
                  :value="20"
                />
              </label>
              <span
                class="absolute z-10 flex h-12 w-12 rounded-md bg-primary-accent shadow-primary-blurred transition-transform duration-200"
                :class="
                  values.visibility === 10
                    ? 'translate-x-0'
                    : 'translate-x-[100%]'
                "
              ></span>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <button
            class="rounded-md bg-red-600 bg-opacity-0 py-2 font-semibold transition-all duration-200 hover:bg-opacity-100 hover:text-white"
            type="button"
            @click="isModalOpen = false"
          >
            {{ $t('cancel') }}
          </button>
          <button
            class="rounded-md bg-primary-accent py-2 font-bold text-white ring-1 ring-primary-accent transition-all duration-200 hover:shadow-primary-blurred disabled:cursor-not-allowed disabled:opacity-50 dark:bg-opacity-10 dark:hover:bg-opacity-100 dark:hover:shadow-none dark:hover:disabled:bg-opacity-10"
            :disabled="!(meta.valid && meta.dirty)"
            type="submit"
          >
            {{ $t('create') }}
          </button>
        </div>
      </Form>
    </Modal>
  </div>
</template>
