<script setup lang="ts">
  import Datepicker from '@vuepic/vue-datepicker'
  import '@vuepic/vue-datepicker/dist/main.css'
  import { ErrorMessage, Field, Form } from 'vee-validate'

  import { PlusIcon } from '@heroicons/vue/24/outline'
  import { Calendar } from '#components'
  const days = [
    { value: 0, label: 'Sun' },
    { value: 1, label: 'Mon' },
    { value: 2, label: 'Tue' },
    { value: 3, label: 'Wed' },
    { value: 4, label: 'Thu' },
    { value: 5, label: 'Fri' },
    { value: 6, label: 'Sat' },
  ]
  const selectedStartOfWeek = ref(days[0])
  const items = ref([
    {
      id: 1,
      title: 'Landing Hero Section',
      startDate: new Date(new Date().setDate(new Date().getDate() - 2)),
      endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    },
    {
      id: 2,
      title: 'Just trying to get a long title for testing. ykwim',
      startDate: new Date(new Date().setDate(new Date().getDate() - 2)),
      endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    },
    {
      id: 3,
      title:
        'That is looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo ooooooooooooooooooooooooooooooooooooooooong text.',
      startDate: new Date(new Date().setDate(new Date().getDate() - 6)),
      endDate: new Date(new Date().setDate(new Date().getDate() - 5)),
    },
  ])
  const showDate = ref(new Date())
  const selectedPeriod = ref('month')

  const isModal = ref(false)
  const date = ref<[] | Date[]>([new Date(), new Date()])
  const format = (date: Date[]) => {
    const day1 = date[0].getDate()
    const month1 = date[0].getMonth() + 1
    const year1 = date[0].getFullYear()
    if (date[1]) {
      const day2 = date[1].getDate()
      const month2 = date[1].getMonth() + 1
      const year2 = date[1].getFullYear()
      return `${day1}/${month1}/${year1} - ${day2}/${month2}/${year2}`
    } else {
      return `${day1}/${month1}/${year1}`
    }
  }
  const onSubmit = (values: any) => {
    console.log('date.value :>> ', date.value)
    items.value.push({
      id: items.value[items.value.length - 1].id + 1,
      title: values.title,
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    })
    console.log('items.value :>> ', items.value)
    date.value = [new Date(), new Date()]
    isModal.value = false
  }
</script>
<template>
  <div class="relative flex h-full p-6">
    <Calendar
      :days="days"
      :items="[
        {
          id: 1,
          title: 'Landing Hero Section',
          startDate: new Date(),
          endDate: new Date(),
        },
      ]"
      :selected-period="selectedPeriod"
      :selected-start-of-week="selectedStartOfWeek"
      :show-date="showDate"
      @update:selected-period="(val) => (selectedPeriod = val)"
      @update:selected-start-of-week="(val) => (selectedStartOfWeek = val)"
      @update:show-date="(val) => (showDate = val)"
    />
    <button
      class="absolute bottom-14 right-14 flex aspect-square items-center justify-center rounded-md bg-primary-accent p-2 text-white shadow-primary-blurred transition-all duration-200"
      @click="isModal = true"
    >
      <PlusIcon class="h-10 w-10" />
    </button>
    <Modal v-model="isModal">
      <template #title>
        {{ $t('new_event') }}
      </template>
      <Form v-slot="{ errors, meta }" class="mt-8 space-y-4" @submit="onSubmit">
        <div class="flex flex-col">
          <label for="name">{{ $t('name') }}</label>
          <Field
            id="title"
            class="mt-1 rounded-md bg-page-foreground p-2 ring-primary-accent transition-all duration-200 focus:ring-1 dark:bg-dark-foreground"
            :class="!errors.title ? 'ring-primary-accent' : 'ring-red-500'"
            :label="$t('labels.title')"
            name="title"
            rules="required|max:128|alpha_spaces"
            type="text"
            validate-on-input
          />
          <div class="relative h-4">
            <ErrorMessage
              class="absolute left-0 top-0 text-xs font-semibold text-red-500"
              name="title"
            />
          </div>
        </div>
        <div class="flex flex-col">
          <label for="name">{{ $t('date') }}</label>

          <Datepicker
            v-model="date"
            :clearable="false"
            dark
            :enable-time-picker="false"
            :format="format"
            range
          >
            <template #dp-input="{ value }">
              <Field
                id="date"
                class="mt-1 w-full rounded-md bg-page-foreground p-2 ring-primary-accent transition-all duration-200 focus:ring-1 dark:bg-dark-foreground"
                :class="!errors.date ? 'ring-primary-accent' : 'ring-red-500'"
                :label="$t('labels.date')"
                :model-value="value"
                name="date"
                :rules="{
                  required: true,
                  regex:
                    /^([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4}) - ([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4})$/,
                }"
                type="text"
                validate-on-input
              />
            </template>
          </Datepicker>
          <div class="relative h-4">
            <ErrorMessage
              class="absolute left-0 top-0 text-xs font-semibold text-red-500"
              name="date"
            />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <button
            class="rounded-md bg-red-600 bg-opacity-0 py-2 font-semibold transition-all duration-200 hover:bg-opacity-100 hover:text-white"
            type="button"
            @click="isModal = false"
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
<style scoped>
  .c-item:not(:first-child) {
    margin-bottom: 12px;
  }
  .c-item.offset0 {
    left: 0;
  }
  .c-item.offset1 {
    left: calc((100% / 7) + 4px);
  }
  .c-item.offset2 {
    left: calc((200% / 7) + 4px);
  }
  .c-item.offset3 {
    left: calc((300% / 7) + 4px);
  }
  .c-item.offset4 {
    left: calc((400% / 7) + 4px);
  }
  .c-item.offset5 {
    left: calc((500% / 7) + 4px);
  }
  .c-item.offset6 {
    left: calc((600% / 7) + 4px);
  }
  /* Metrics for items spanning dates */
  .c-item.span1 {
    width: calc((100% / 7) - 0.05em - 8px);
  }
  .c-item.span2 {
    width: calc((200% / 7) - 0.05em - 8px);
  }
  .c-item.span3 {
    width: calc((300% / 7) - 0.05em - 8px);
  }
  .c-item.span4 {
    width: calc((400% / 7) - 0.05em - 8px);
  }
  .c-item.span5 {
    width: calc((500% / 7) - 0.05em - 8px);
  }
  .c-item.span6 {
    width: calc((600% / 7) - 0.05em - 8px);
  }
  .c-item.span7 {
    width: calc((700% / 7) - 0.05em - 8px);
  }
</style>
