<template>
  <v-card class="welcome-container" variant="text">
    <v-card-title>Welcome to DennX!</v-card-title>
    <v-card-text>Start a conversation by sending a message or by clicking the example prompts.</v-card-text>
    <v-card-actions class="button-container">
      <v-btn
        v-for="prompt in examplePrompts"
        :key="prompt"
        variant="tonal"
        @click="sendPrompt(prompt)"
        class="prompt-button"
      >
        {{ prompt }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      examplePrompts: [
        "Tell me a joke",
        "Suggest a good book to read",
        "Play a trivia game with me",
      ],
    };
  },
  methods: {
    sendPrompt(prompt) {
      this.$emit("prompt-selected", prompt);
    },
  },
};
</script>

<style scoped>
.welcome-container {
  text-align: center;
  margin: auto;
}

.button-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.prompt-button {
  margin-bottom: 10px;
}
</style>