<script setup lang="ts"></script>
<template>
  <div class="grid h-full grid-cols-12 gap-x-2 p-2">
    <div class="col-span-3 h-full overflow-hidden rounded-2xl bg-white">
      <MessagesSidebar />
    </div>
    <div class="col-span-9 h-full overflow-hidden rounded-2xl bg-white">
      <MessagesContent />
    </div>
  </div>
</template>
