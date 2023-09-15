<template>
  <v-dialog :model-value="show" @update:model-value="$emit('update:show', $event)" max-width="290">
    <v-card>
      <v-card-title class="headline">Login</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="loginWithGoogle">
          Login with Google
        </v-btn>
        <v-btn text @click="cancelLogin">Cancel</v-btn> 
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/plugins/firebase";

const provider = new GoogleAuthProvider();

export default {
  props: ['show'],
  emits: ['update:show', 'auth-changed', 'dialog-closed'],
  data() {
    return {
      user: null,
    };
  },
  watch: {
    show(newVal) {
      this.$emit('update:show', newVal);
    },
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      this.user = user;
      this.$emit('auth-changed', user);
    });
  },
  methods: {
    loginWithGoogle() {
      signInWithPopup(auth, provider)
        .then((result) => {
          this.user = result.user;
          this.showDialog = false;
          this.$emit('dialog-closed');
        })
        .catch((error) => {
          console.error('Error logging in with Google', error);
        });
    },
    cancelLogin() {
      this.showDialog = false;
      this.$emit('dialog-closed');
    },
  },
};
</script>