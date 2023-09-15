<template>
  <div>
    <v-btn text :disabled="isLoading" @click="handleClick">
      <v-icon>{{ isLoading ? '' : (user ? 'mdi-logout' : 'mdi-login') }}</v-icon>
      <v-tooltip activator="parent" location="bottom">
        {{ user ? 'Logout' : 'Login' }}
      </v-tooltip>
    </v-btn>

    <AuthDialog :show="showLoginDialog" @auth-changed="onAuthChanged" @dialog-closed="showLoginDialog = false" />

    <v-dialog v-model="showLogoutDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Logout</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="logout">
            Logout
          </v-btn>
          <v-btn text @click="cancelLogout">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/plugins/firebase";
import AuthDialog from './AuthDialog.vue';

export default {
  components: {
    AuthDialog,
  },
  data() {
    return {
      showLoginDialog: false,
      showLogoutDialog: false,
      isLoading: true,
      user: null,
    };
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      this.user = user;
      this.isLoading = false;
    });
  },
  methods: {
    handleClick() {
      if (this.user) {
        this.showLogoutDialog = true;
      } else {
        this.showLoginDialog = true;
      }
    },
    
    logout() {
      signOut(auth)
        .then(() => {
          this.showLogoutDialog = false;
        })
        .catch((error) => {
          console.error('Error logging out', error);
        });
    },
    cancelLogout() {
      this.showLogoutDialog = false; 
    },
    onAuthChanged(user) {
      this.showLoginDialog = false;
      this.user = user;
    },
  },
};
</script>