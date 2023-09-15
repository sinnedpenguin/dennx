<template>
  <v-card>
    <v-layout>
      <v-app-bar prominent>
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>
          <v-icon icon="mdi-alpha-d-circle" />
          DennX
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <ThemeToggler />
        <AuthButton />
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" app temporary left>
        <ChatHistory @conversation-selected="selectedConversation = $event" />
      </v-navigation-drawer>

      <v-main class="d-flex align-center justify-center" style="min-height: 100vh;">
        <ChatBox :conversation="selectedConversation" />
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
import ThemeToggler from '@/components/ThemeToggler.vue';
import AuthButton from '@/components/AuthButton.vue';
import ChatHistory from '@/components/ChatHistory.vue';
import ChatBox from '@/components/ChatBox.vue'; 

export default {
  components: {
    ThemeToggler,
    AuthButton,
    ChatHistory,
    ChatBox,  
  },
  data() {
    return {
      drawer: false,
      selectedConversation: null, 
    };
  },
};
</script>