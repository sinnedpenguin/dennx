<script setup lang="ts">
import ThemeToggler from './ThemeToggler.vue'
import UserAvatar from './UserAvatar.vue';
import { Bot } from 'lucide-vue-next';
</script>

<template>
  <header class="bg-background sticky top-0 z-40 w-full border-b">
    <div class="container flex h-16 items-center justify-between">
      <nav class="flex items-center space-x-2 ml-3">
        <Bot class="w-6 h-6 mr-2" />
        <span class="font-bold">DennX</span>
      </nav>
      <div class="flex flex-1 items-center justify-end space-x-2">
        <nav class="md:flex items-center space-x-2">
          <ThemeToggler />
        </nav>
        <nav class="md:flex items-center space-x-2">
          <UserAvatar />
        </nav>
      </div>
    </div>
  </header>
</template>
