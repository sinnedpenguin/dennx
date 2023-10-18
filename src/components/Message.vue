<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  message: String,
})
</script>

<template>
  <div class="flex flex-col gap-2 mt-4 md:w-[35vw]">
    <p class="leading-7">
      {{ message }}
    </p>
  </div>
</template>