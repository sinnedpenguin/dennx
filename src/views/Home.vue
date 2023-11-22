<script setup lang="ts">
import ChatBox from '@/components/ChatBox.vue';
import DiscordAlert from '@/components/DiscordAlert.vue';
</script>

<template>
  <section class="flex justify-center mt-6">
    <div class="md:w-[35vw] mb-2">
      <DiscordAlert />
      <ChatBox />
    </div>
  </section>
</template>