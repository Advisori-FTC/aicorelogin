<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')
const showPassword = ref(false)

const login = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = 'Bitte geben Sie E-Mail und Passwort ein'
    return
  }
  
  loading.value = true
  errorMessage.value = ''
  
  try {
    const result = await authStore.login(email.value, password.value)
    
    if (result.success) {
      router.push('/app/dashboard')
    } else {
      errorMessage.value = result.message || 'Anmeldung fehlgeschlagen'
    }
  } catch (error) {
    errorMessage.value = 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.'
    console.error('Login error:', error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-card class="login-card elevation-4">
    <v-card-title class="text-center text-h5 mb-4">
      Anmelden
    </v-card-title>
    
    <v-card-text>
      <v-alert
        v-if="errorMessage"
        type="error"
        variant="tonal"
        class="mb-4"
      >
        {{ errorMessage }}
      </v-alert>
      
      <v-form @submit.prevent="login">
        <v-text-field
          v-model="email"
          label="E-Mail"
          type="email"
          variant="outlined"
          prepend-inner-icon="mdi-email"
          required
          :disabled="loading"
        />
        
        <v-text-field
          v-model="password"
          label="Passwort"
          :type="showPassword ? 'text' : 'password'"
          variant="outlined"
          prepend-inner-icon="mdi-lock"
          :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append-inner="showPassword = !showPassword"
          required
          :disabled="loading"
        />
        
        <v-btn
          block
          color="primary"
          type="submit"
          size="large"
          :loading="loading"
          class="mt-4"
        >
          Anmelden
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>
