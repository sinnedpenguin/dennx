<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Sun, Moon } from 'lucide-vue-next'
import { ref, onMounted, onUnmounted } from 'vue'

const isDarkMode = ref(localStorage.getItem('darkMode') === 'true')

function toggleDarkMode() {
  const root = document.querySelector(':root')
  root?.classList.toggle('dark')
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('darkMode', String(isDarkMode.value))
}

onMounted(() => {
  if (isDarkMode.value) {
    const root = document.querySelector(':root')
    root?.classList.add('dark')
  }
})

onUnmounted(() => {
  const root = document.querySelector(':root')
  root?.classList.remove('dark')
})
</script>

<template>
  <Button @click="toggleDarkMode" variant="ghost">
    <div v-if="isDarkMode" >
      <Moon class="h-5 w-5" />
    </div>
    <div v-else>
      <Sun class="h-5 w-5" />
    </div>
  </Button>
</template>