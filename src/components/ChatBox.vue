<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { sendPrompt } from '@/api/ai'
import Message from './Message.vue'
import Input from './Input.vue'
import WelcomeMessage from './WelcomeMessage.vue'
import { auth, db } from '@/lib/firebase';
import { type User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import ChatHistory from './ChatHistory.vue'

export interface Message {
  text: string
  sender: 'user' | 'ai'
}

const messages = ref<Message[]>([])
const user = ref<User | null>(null);
const chatId = ref<string | null>(null);
const aiThinking = ref(false);

onMounted(() => {
  const unsubscribe = onAuthStateChanged(auth, (userState) => {
    user.value = userState;

    if (!user.value) {
      messages.value = [];
      chatId.value = null;
    }
  });

  document.addEventListener('click', event => {
    if ((event.target as HTMLElement).classList.contains('copy-button')) {
      const button = event.target as HTMLElement;
      const preElement = button.previousElementSibling as HTMLElement;
      if (preElement) {
        navigator.clipboard.writeText(preElement.innerText);
        button.textContent = 'Copied!';
        setTimeout(() => {
          button.textContent = 'Copy';
        }, 2000); 
      }
    }
  });

  return unsubscribe;
});

async function handleSend(text: string) {
  messages.value.push({ text, sender: 'user' })

  aiThinking.value = true;
  const aiMessage = await sendPrompt(text) 
  aiThinking.value = false;
  
  messages.value.push({ text: aiMessage, sender: 'ai' })

  if (user.value) {
    if (!chatId.value) {
      chatId.value = `${user.value.uid}_${Date.now()}`;
    }
    const chatRef = doc(db, 'chats', chatId.value);

    try {
      const existingChat = await getDoc(chatRef);
      const title = messages.value[0]?.text || '';

      if (!existingChat.exists()) {
        await setDoc(chatRef, {
          userId: user.value.uid,
          chatId: chatId.value,
          messages: messages.value,
          title,
        });
      } else {
        await updateDoc(chatRef, {
          messages: messages.value,
          title,
        });
      }
    } catch (error) {
      console.error('Error saving chat:', error);
    }
  }
}

const onChatSelected = (selectedChat: { messages: Message[], id: string }) => {
  messages.value = selectedChat.messages;
  chatId.value = selectedChat.id;
};

function handleClearChat() {
  messages.value = [];
};

function formatMessage(message: string) {
  let formattedMessage = message
    .replace(/```(.*?)```/gs, '<div class="relative bg-primary text-white dark:text-black rounded-md"><pre style="font-size: 0.875rem;"><code>$1</code></pre><button class="absolute top-0 right-0 m-1 copy-button">Copy</button></div>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br />'); 

  return formattedMessage;
}
</script>

<template>
  <div class="flex flex-col gap-4 mx-4 mb-36">
    <ChatHistory @chat-selected="onChatSelected" />
    <WelcomeMessage @send-prompt="handleSend" v-if="messages.length === 0" />
    <div
      v-for="(message, index) in messages"
      :key="index"
      :class="[
        'p-2 rounded-md',
        message.sender === 'user' ? 'bg-primary text-white dark:text-black' : 'bg-secondary',
        message.sender === 'user' ? 'self-end' : 'self-start'
      ]"
    >
      <div v-html="formatMessage(message.text)"></div>
    </div>
    <div v-if="aiThinking" class="self-start p-2 rounded-md bg-secondary">
      <span class="animate-ping">.</span>
      <span class="animate-ping delay-150">.</span>
      <span class="animate-ping delay-300">.</span>
    </div>
    <Input @send="handleSend" @clear-chat="handleClearChat" />
  </div>
</template>