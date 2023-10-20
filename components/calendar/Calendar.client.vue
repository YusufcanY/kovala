<script setup lang="ts">
  import { CalendarView } from 'vue-simple-calendar'
  import { MapPinIcon } from '@heroicons/vue/24/outline'
  import {
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronUpDownIcon,
  } from '@heroicons/vue/20/solid'
  import {
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions,
  } from '@headlessui/vue'
  defineProps<{
    selectedPeriod: string
    items: { id: number; title: string; startDate: Date; endDate: Date }[]
    days: { value: number; label: string }[]
    showDate: Date
    selectedStartOfWeek: { label: string; value: string }
  }>()
  const emit = defineEmits<{
    'update:selectedDtartOfWeek': [v: { label: string; value: string }]
    'update:selectedPeriod': [v: string]
    'update:showDate': [v: Date]
  }>()
  const changeTopCalcFuntionForItem = (calc: string) =>
    calc.replace('2px', '12px')
</script>
<template>
  <CalendarView
    class="h-full rounded-xl bg-white p-4 dark:bg-dark-page-body [&>div]:!border-none [&>div_*]:!border-page-foreground [&>div_*]:dark:!border-dark-foreground [&_*]:!hide-scrollbar"
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
              @click="emit('update:showDate', headerProps.previousPeriod)"
            >
              <ChevronLeftIcon class="h-10 w-10" />
            </button>
            <button
              v-show="
                headerProps.periodStart.getTime() !==
                headerProps.currentPeriod.getTime()
              "
              class="flex aspect-square h-full items-center justify-center rounded-md bg-page-foreground transition-all duration-200 hover:bg-primary-accent hover:text-white hover:shadow-primary-blurred dark:bg-dark-foreground dark:hover:bg-primary-accent"
              @click="emit('update:showDate', headerProps.currentPeriod)"
            >
              <MapPinIcon class="h-10 w-10" />
            </button>
            <button
              class="flex aspect-square h-full items-center justify-center rounded-md bg-page-foreground transition-all duration-200 hover:bg-primary-accent hover:text-white hover:shadow-primary-blurred dark:bg-dark-foreground dark:hover:bg-primary-accent"
              @click="emit('update:showDate', headerProps.nextPeriod)"
            >
              <ChevronRightIcon class="h-10 w-10" />
            </button>
          </div>
        </div>
        <div class="flex space-x-2">
          <Listbox
            :model-value="selectedStartOfWeek"
            @update:model-value="
              (newValue) => emit('update:selectedStartOfWeek', newValue)
            "
          >
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
                        'relative cursor-pointer select-none py-2 pl-3 pr-4 transition-all duration-200',
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
                class="hidden"
                name="period"
                type="radio"
                value="week"
                @input="$emit('update:selectedPeriod', $event.target.value)"
              />
            </label>
            <label
              class="z-20 flex w-24 cursor-pointer justify-center rounded-md py-2 text-sm"
              for="month"
            >
              <span>Month</span>
              <input
                id="month"
                class="hidden"
                name="period"
                type="radio"
                value="month"
                @input="$emit('update:selectedPeriod', $event.target.value)"
              />
            </label>
            <label
              class="z-20 flex w-24 cursor-pointer justify-center rounded-md py-2 text-sm"
              for="year"
            >
              <span>Year</span>
              <input
                id="year"
                class="hidden"
                name="period"
                type="radio"
                value="year"
                @input="$emit('update:selectedPeriod', $event.target.value)"
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
</template>
