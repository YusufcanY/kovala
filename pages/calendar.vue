<script setup lang="ts">
  import { CalendarView } from 'vue-simple-calendar'
  import { ChevronUpDownIcon } from '@heroicons/vue/20/solid'
  import {
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions,
  } from '@headlessui/vue'
  import 'vue-simple-calendar/dist/style.css'
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
      id: 'e1',
      title: 'Landing Hero Section',
      startDate: new Date(new Date().setDate(new Date().getDate() - 2)),
      endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    },
    {
      id: 'e2',
      title: 'Just trying to get a long title for testing. ykwim',
      startDate: new Date(new Date().setDate(new Date().getDate() - 2)),
      endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    },
  ])
  const showDate = ref(new Date())
  /*   const setShowDate = (date: Date) => {
    showDate.value = date
  } */
  const selectedPeriod = ref('month')
  const changeTopCalcFuntionForItem = (calc: string) =>
    calc.replace('2px', '12px')
</script>
<template>
  <div class="h-full p-6">
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
          <span class="text-2xl font-bold">
            {{ headerProps.currentPeriodLabel }}
          </span>
          <div class="flex space-x-2">
            <Listbox v-model="selectedStartOfWeek">
              <div class="relative space-x-4">
                <ListboxLabel>Starting day of the week</ListboxLabel>
                <ListboxButton
                  class="relative h-full w-32 cursor-default rounded-md bg-page-foreground py-2 pl-3 pr-10 text-left dark:bg-dark-foreground"
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
                  leave-active-class="transition duration-100 ease-in"
                  leave-from-class="opacity-100"
                  leave-to-class="opacity-0"
                >
                  <ListboxOptions
                    class="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-page-foreground text-base shadow-md hide-scrollbar dark:bg-dark-foreground sm:text-sm"
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
          class="c-item absolute rounded-md bg-primary-accent p-2 text-white"
          :class="value.classes"
          :style="`top:${changeTopCalcFuntionForItem(top)};`"
        >
          {{ value.title }}
        </div>
      </template>
    </CalendarView>
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
