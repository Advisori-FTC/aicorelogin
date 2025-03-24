<script setup>
import LoginForm from '../components/login/LoginForm.vue'
import { useAuthStore } from '../stores/auth'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

onMounted(() => {
  // If user is already authenticated, redirect to dashboard
  if (authStore.isAuthenticated) {
    router.push('/app/dashboard')
  }
})
</script>

<template>
  <div class="login-page">
    <div>
      <v-card-title class="text-center text-h4 mb-6">
        <v-icon icon="mdi-shield-lock" size="large" color="primary" class="mr-2" />
        Login-App
      </v-card-title>
      
      <LoginForm />
    </div>
  </div>
</template>
