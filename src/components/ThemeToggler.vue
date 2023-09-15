<template>
  <v-btn icon @click="toggleTheme">
    <v-icon>{{ theme.global.current.value.dark ? 'mdi-weather-night' : 'mdi-weather-sunny'  }}</v-icon>
    <v-tooltip
      activator="parent"
      location="bottom"
      >Toggle theme
    </v-tooltip>
  </v-btn>
</template>

<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
  localStorage.setItem('theme', theme.global.name.value);
}
</script>