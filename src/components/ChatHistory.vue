<script setup lang="ts">
import { ref } from 'vue';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { History } from 'lucide-vue-next';
import {  
  collection, 
  query, 
  where, 
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";
import { db } from '@/lib/firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { X } from 'lucide-vue-next';

interface Chat {
  title: string;
  [key: string]: any;
}

const chats = ref<Chat[]>([]);
const auth = getAuth();
const emit = defineEmits(['chat-selected']);

onAuthStateChanged(auth, user => {
  if (user) {
    const chatsRef = collection(db, 'chats');
    const q = query(chatsRef, where('userId', '==', user.uid));

    getDocs(q).then(querySnapshot => {
      chats.value = querySnapshot.docs.map(doc => {
        const chatData = doc.data();
        const messages = chatData.messages;
        const userMessage = messages.find((message: { sender: string; }) => message.sender === 'user');
        let title = '';

        if (userMessage) {
          title = userMessage.text.split(' ').slice(0, 5).join(' ');
        }

        return { id: doc.id, ...chatData, title };
      }) as Chat[];
    }).catch(error => {
      console.error('Error fetching chats:', error);
    });
  } else {
    chats.value = [];
  }
});

function handleSelectChat(chat: Chat) {
  emit('chat-selected', { messages: chat.messages, id: chat.id });
}

async function deleteChat(chat: Chat) {
  try {
    await deleteDoc(doc(db, 'chats', chat.id));
    chats.value = chats.value.filter(c => c.id !== chat.id);
  } catch (error) {
    console.error('Error deleting chat:', error);
  }
}

</script>

<template>
  <Sheet>
    <SheetTrigger>
      <Button variant="ghost" class="mr-4">
        <History class="w-5 h-5" />
      </Button>
    </SheetTrigger>
    <SheetContent :side="'left'">
      <SheetHeader>
        <SheetTitle class="my-4">Chat History</SheetTitle>
      </SheetHeader>
      <hr />
      <div class="my-4">
        <div v-for="(chat, index) in chats" :key="index">
          <div class="flex items-center justify-between mb-2">
            <Button variant="ghost" @click="handleSelectChat(chat)" class="w-full">
              {{ chat.title }}
            </Button>
            <Button variant="ghost" @click="deleteChat(chat)">
              <X class="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </SheetContent>
  </Sheet>
</template>