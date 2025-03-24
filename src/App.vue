<script setup>
// Main App component - serves as the entry point for the application
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()

onMounted(() => {
  // Initialize auth state on app start
  authStore.init()
})
</script>

<template>
  <v-app>
    <!-- Main application container -->
    <router-view />
  </v-app>
</template>

<style>
/* Import global styles */
@import './assets/scss/main.scss';
</style>
