<script setup lang="ts">
import { ref, onMounted } from 'vue'; 
import { onAuthStateChanged, type User } from 'firebase/auth'; 
import { Button } from './ui/button';
import { User2 } from 'lucide-vue-next';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { signInWithGoogle } from '@/api/user';

import { auth } from '@/lib/firebase'; 
import { signOut } from 'firebase/auth';

const user = ref<User | null>(null);

onMounted(() => {
  const unsubscribe = onAuthStateChanged(auth, (userState) => {
    user.value = userState;
  });
  return unsubscribe;
});

async function handleSignInWithGoogle() {
  try {
    await signInWithGoogle();
    user.value = auth.currentUser;
  } catch (error) {
    console.error(error);
  }
}

async function handleSignOut() {
  try {
    await signOut(auth);
    user.value = null;
  } catch (error) {
    console.error(error);
  }
}

function handleClick() {
  if (user.value) {
    handleSignOut();
  } else {
    handleSignInWithGoogle();
  }
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button variant="ghost">
        <User2 class="h-5 w-5" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem @click="handleClick">
        {{ user ? 'Sign out' : 'Sign in with Google' }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>