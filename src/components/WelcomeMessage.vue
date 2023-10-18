<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { onAuthStateChanged, type User } from 'firebase/auth';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { auth } from '@/lib/firebase';

const toast = useToast();
const emit = defineEmits(['send-prompt']);

const user = ref<User | null>(null);

onAuthStateChanged(auth, (userState) => {
  user.value = userState;
});

const examplePrompts = [
  'How to print the text "Hello World" in Java?',
  'Write a haiku about the color blue in a language of your choice.',
  'Explain quantum physics in a pirate voice.',
]

function handlePromptClick(prompt: string) {
  if (user.value) {
    emit('send-prompt', prompt);
  } else {
    toast.error('Please sign in to send a message.');
  }
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Hello, I'm DennX!</CardTitle>
      <CardDescription>Start a conversation with me by sending a message or by clicking the example prompts.</CardDescription>
    </CardHeader>
    <CardContent class="flex flex-col gap-2 my-3">
      <Button 
        v-for="(prompt, index) in examplePrompts" 
        :key="index" 
        variant="outline"
        @click="handlePromptClick(prompt)"
      >
        {{ prompt }}
      </Button>
    </CardContent>
  </Card>
</template>