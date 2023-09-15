<template>
  <v-container class="chat-history">
    <h1 class="text-h6 text-center">Chat History</h1>
    <v-divider></v-divider>
    <v-list class="chat-history">
      <v-list-item v-for="(conversation, index) in conversations" :key="index">
        <v-row align="center">
          <v-col cols="9" @click="selectConversation(conversation)">
            <v-list-item-title>{{ conversation.title }}</v-list-item-title>
          </v-col>
          <v-col cols="3">
            <v-icon @click.stop="deleteConversation(conversation.id)">mdi-delete</v-icon>
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import { auth, db } from "@/plugins/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";

export default {
  data() {
    return {
      conversations: [],
    };
  },

  created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.fetchConversations(user.uid);
      }
    });
  },

  methods: {
    async fetchConversations(userId) {
      const q = query(collection(db, 'conversations'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      this.conversations = querySnapshot.docs.map((doc) => ({
        id: doc.id, 
        title: doc.data().title,
        messages: doc.data().messages,
      }));
    },

    async deleteConversation(conversationId) {
      try {
        const conversationRef = doc(db, 'conversations', conversationId);
        await deleteDoc(conversationRef);

        this.conversations = this.conversations.filter((conversation) => conversation.id !== conversationId);
        window.location.reload();
      } catch (error) {
        console.error("Error deleting conversation.");
      }
    },

    selectConversation(conversation) {
      this.$emit('conversation-selected', conversation);
    },
  }
};
</script>

<style scoped>
.chat-history {
  max-height: 100%;
  overflow-y: auto;
}

.chat-history::-webkit-scrollbar {
  width: 8px; 
}

.chat-history::-webkit-scrollbar-thumb {
  background-color: lightgray; 
  border-radius: 6px; 
}

.chat-history::-webkit-scrollbar-thumb:hover {
  background-color: darkgray;
}

.v-list-item:hover {
  background-color: lightgray;
  cursor: pointer;
}
</style>