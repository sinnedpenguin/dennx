<template>
  <v-form>
    <v-container>
      <v-row>
        <v-textarea 
          variant="filled"
          v-model="message"
          append-icon="mdi-send"
          prepend-icon="mdi-broom"
          label="Message"
          type="text"
          rows="1"
          auto-grow
          max-rows="10"
          maxlength="3000"
          counter
          @keydown.enter.exact.prevent="sendMessage"
          @keydown.shift.enter.exact.prevent="addNewLine"
          @click:append="sendMessage"
          @click:prepend="startNewConversation"
        >
        </v-textarea>
      </v-row>
      <AuthDialog 
      :show="showAuthDialog" 
      @auth-changed="onAuthChanged" 
      @dialog-closed="showAuthDialog = false" />
    </v-container>
  </v-form>
</template>

<script>
import AuthDialog from './AuthDialog.vue';
import { auth } from "@/plugins/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { sendPrompt } from '@/api/ai'; 

export default {
  emits: ["messageSent", "clear-conversation", "message-sent", "message-received"],
  components: {
    AuthDialog,
  },

  data() {
    return {
      user: null,
      showAuthDialog: false,
      message: "",
      messageSent: false
    };
  },

  created() {
    onAuthStateChanged(auth, (user) => {
      this.user = user;
      this.onAuthChanged(user);
    });
  },

  methods: {
    async sendMessage() {
      const messageText = this.message.trim(); 

      if (messageText === '') {
        return;
      }

      if (!this.user) {
        this.showAuthDialog = true;
        return;
      }

      this.messageSent = true;
      const prompt = messageText;
      this.message = '';
      
      try {
        this.$emit("message-sent", prompt, 'user');
        
        const aiResponse = await sendPrompt(prompt);

        this.$emit("message-received", aiResponse, 'ai');
      } catch (error) {
        console.error("Error sending message.");
      }
    },

    addNewLine() {
      this.message += "\n";
    },

    startNewConversation() {
      this.$emit('clear-conversation');
      this.messageSent = false;
    },

    onAuthChanged(user) {
      this.user = user;
    },
  },
};
</script>