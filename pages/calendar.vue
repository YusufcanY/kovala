<script setup lang="ts">
  import { CalendarView, CalendarViewHeader } from 'vue-simple-calendar'
  import 'vue-simple-calendar/dist/style.css'

  const items = ref([
    {
      id: 'e1',
      title: 'Single-day item with a long title',
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    },
  ])
  const showDate = ref(new Date())
  const setShowDate = (date: Date) => {
    showDate.value = date
  }
</script>
<template>
  <div>
    <CalendarView
      class="theme-default holiday-us-traditional holiday-us-official h-full"
      :items="items"
      :show-date="showDate"
    >
      <template #header="{ headerProps }">
        <CalendarViewHeader :header-props="headerProps" @input="setShowDate" />
      </template>
    </CalendarView>
  </div>
</template>
