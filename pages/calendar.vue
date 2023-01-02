<script setup lang="ts">
  import { CalendarView } from 'vue-simple-calendar'
  import {
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronUpDownIcon,
  } from '@heroicons/vue/20/solid'
  import { ErrorMessage, Field, Form } from 'vee-validate'
  import {
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions,
  } from '@headlessui/vue'
  import 'vue-simple-calendar/dist/style.css'
  import { MapPinIcon, PlusIcon } from '@heroicons/vue/24/outline'
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
  const changeTopCalcFuntionForItem = (calc: string) =>
    calc.replace('2px', '12px')

  const isModal = ref(false)
  const onSubmit = (values: any) => {
    items.value.push({
      id: items.value.length + 1,
      title: values.title,
      startDate: new Date(),
      endDate: new Date(),
    })
    isModal.value = false
  }
</script>
<template>
  <div class="relative flex h-full p-6">
    <CalendarView
      class="h-full rounded-xl bg-white p-4 dark:bg-dark-page-body [&_*]:!hide-scrollbar [&>div]:!border-none [&>div_*]:!border-page-foreground [&>div_*]:dark:!border-dark-foreground"
      :display-period-uom="selectedPeriod"
      :items="items"
      :show-date="showDate"
      :starting-day-of-week="selectedStartOfWeek.value"
    >
      <template #header="{ headerProps }">
        <!-- <CalendarViewHeader :header-props="headerProps" @input="setShowDate" /> -->
        <div class="flex items-center justify-between">
          <div class="flex h-full items-center space-x-4">
            <span class="whitespace-nowrap text-2xl font-bold">
              {{ headerProps.periodLabel }}
            </span>
            <div class="flex h-full space-x-2">
              <button
                class="flex aspect-square h-full items-center justify-center rounded-md bg-page-foreground transition-all duration-200 hover:bg-primary-accent hover:text-white hover:shadow-primary-blurred dark:bg-dark-foreground dark:hover:bg-primary-accent"
                @click="showDate = headerProps.previousPeriod"
              >
                <ChevronLeftIcon class="h-10 w-10" />
              </button>
              <button
                v-show="
                  headerProps.periodStart.getTime() !==
                  headerProps.currentPeriod.getTime()
                "
                class="flex aspect-square h-full items-center justify-center rounded-md bg-page-foreground transition-all duration-200 hover:bg-primary-accent hover:text-white hover:shadow-primary-blurred dark:bg-dark-foreground dark:hover:bg-primary-accent"
                @click="showDate = headerProps.currentPeriod"
              >
                <MapPinIcon class="h-10 w-10" />
              </button>
              <button
                class="flex aspect-square h-full items-center justify-center rounded-md bg-page-foreground transition-all duration-200 hover:bg-primary-accent hover:text-white hover:shadow-primary-blurred dark:bg-dark-foreground dark:hover:bg-primary-accent"
                @click="showDate = headerProps.nextPeriod"
              >
                <ChevronRightIcon class="h-10 w-10" />
              </button>
            </div>
          </div>
          <div class="flex space-x-2">
            <Listbox v-model="selectedStartOfWeek">
              <div class="relative space-x-4">
                <ListboxLabel>Starting day of the week</ListboxLabel>
                <ListboxButton
                  class="relative h-full w-32 cursor-pointer rounded-md bg-page-foreground py-2 pl-3 pr-10 text-left dark:bg-dark-foreground"
                >
                  <span class="block truncate">{{
                    selectedStartOfWeek.label
                  }}</span>
                  <span
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                  >
                    <ChevronUpDownIcon
                      aria-hidden="true"
                      class="h-5 w-5 text-gray-400"
                    />
                  </span>
                </ListboxButton>

                <transition
                  enter-active-class="transition duration-100"
                  enter-from-class="translate-y-2 opacity-0"
                  enter-to-class="translate-y-0 opacity-100"
                  leave-active-class="transition duration-100"
                  leave-from-class="translate-y-0 opacity-100"
                  leave-to-class="translate-y-2 opacity-0"
                >
                  <ListboxOptions
                    class="absolute right-0 z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-page-foreground text-base shadow-md hide-scrollbar dark:bg-dark-foreground"
                  >
                    <ListboxOption
                      v-for="day in days"
                      :key="day.value"
                      v-slot="{ active, selected }"
                      as="template"
                      :value="day"
                    >
                      <li
                        :class="[
                          active
                            ? 'bg-primary-accent bg-opacity-10 text-primary-accent'
                            : '',
                          'relative cursor-pointer select-none py-2 pr-4 pl-3 transition-all duration-200',
                        ]"
                      >
                        <span
                          class="block truncate"
                          :class="{ 'font-bold text-primary-accent': selected }"
                          >{{ day.label }}</span
                        >
                      </li>
                    </ListboxOption>
                  </ListboxOptions>
                </transition>
              </div>
            </Listbox>
            <div
              class="relative flex rounded-md bg-page-foreground p-2 font-bold dark:bg-dark-foreground"
            >
              <label
                class="z-20 flex w-24 cursor-pointer justify-center rounded-md py-2 text-sm"
                for="week"
              >
                <span>Week</span>
                <input
                  id="week"
                  v-model="selectedPeriod"
                  class="hidden"
                  name="period"
                  type="radio"
                  value="week"
                />
              </label>
              <label
                class="z-20 flex w-24 cursor-pointer justify-center rounded-md py-2 text-sm"
                for="month"
              >
                <span>Month</span>
                <input
                  id="month"
                  v-model="selectedPeriod"
                  class="hidden"
                  name="period"
                  type="radio"
                  value="month"
                />
              </label>
              <label
                class="z-20 flex w-24 cursor-pointer justify-center rounded-md py-2 text-sm"
                for="year"
              >
                <span>Year</span>
                <input
                  id="year"
                  v-model="selectedPeriod"
                  class="hidden"
                  name="period"
                  type="radio"
                  value="year"
                />
              </label>
              <span
                class="absolute z-10 flex h-9 w-24 rounded-md bg-primary-accent shadow-primary-blurred transition-transform duration-200"
                :class="
                  selectedPeriod === 'week'
                    ? 'translate-x-0'
                    : selectedPeriod === 'month'
                    ? 'translate-x-full'
                    : 'translate-x-[200%]'
                "
              ></span>
            </div>
          </div>
        </div>

        <div
          class="my-2 h-1 w-full bg-page-foreground dark:bg-dark-foreground"
        ></div>
      </template>
      <template #dayHeader="{ label, index }">
        <div
          class="flex w-full items-center justify-center py-2 font-semibold"
          :class="{
            'border-r-2 !border-solid border-page-foreground dark:border-dark-foreground':
              index !== 'dow6',
            'opacity-50': index === 'dow6' || index === 'dow0',
          }"
        >
          {{ label }}
        </div>
      </template>
      <template #item="{ value, top }">
        <div
          class="c-item absolute truncate rounded-md bg-primary-accent p-2 text-white"
          :class="value.classes"
          :style="`top:${changeTopCalcFuntionForItem(top)};`"
          :title="value.title"
        >
          {{ value.title }}
        </div>
      </template>
    </CalendarView>
    <button
      class="absolute bottom-14 right-14 flex aspect-square items-center justify-center rounded-md bg-primary-accent p-2 text-white shadow-primary-blurred transition-all duration-200"
      @click="isModal = true"
    >
      <PlusIcon class="h-10 w-10" />
    </button>
    <Modal v-model="isModal">
      <template #title>
        {{ $t('new-board-group') }}
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
            rules="required|max:128|alpha"
            type="text"
            validate-on-input
          />
          <div class="relative h-4">
            <ErrorMessage
              class="absolute top-0 left-0 text-xs font-semibold text-red-500"
              name="title"
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
  /* slide 4px bottom all .c-item except first child  */
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
