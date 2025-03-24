<template>
  <div class="flex justify-center items-center min-h-[calc(100vh-180px)]">
    <div class="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
      <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">
        Anmelden bei AI Core Studio
      </h1>
      
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div v-if="error" class="p-3 text-sm bg-red-100 text-red-700 rounded-md">
          {{ error }}
        </div>
        
        <div class="space-y-2">
          <label for="email" class="block text-sm font-medium text-gray-700">E-Mail</label>
          <input
            v-model="email"
            id="email"
            type="email"
            required
            autocomplete="email"
            class="form-input"
            placeholder="ihre@email.de"
          />
        </div>
        
        <div class="space-y-2">
          <div class="flex justify-between">
            <label for="password" class="block text-sm font-medium text-gray-700">Passwort</label>
            <router-link :to="{ name: 'reset-password' }" class="text-sm text-primary-600 hover:underline">
              Passwort vergessen?
            </router-link>
          </div>
          <input
            v-model="password"
            id="password"
            type="password"
            required
            autocomplete="current-password"
            class="form-input"
            placeholder="••••••••"
          />
        </div>
        
        <div>
          <button
            type="submit"
            class="btn-primary w-full flex justify-center"
            :disabled="loading"
          >
            <span v-if="loading">Anmeldung läuft...</span>
            <span v-else>Anmelden</span>
          </button>
        </div>
      </form>
      
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600">
          Noch kein Konto?
          <router-link :to="{ name: 'register' }" class="text-primary-600 hover:underline">
            Registrieren
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

// Formulardaten
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

// Umleitung nach erfolgreicher Anmeldung
const redirectPath = route.query.redirect || '/'

// Login-Handler
async function handleLogin() {
  if (!email.value || !password.value) {
    error.value = 'Bitte füllen Sie alle Felder aus.'
    return
  }
  
  loading.value = true
  const { data, error: loginError } = await authStore.signIn(email.value, password.value)
  loading.value = false
  
  if (loginError) {
    error.value = 'Anmeldung fehlgeschlagen. Bitte überprüfen Sie Ihre Zugangsdaten.'
    return
  }
  
  // Umleitung nach erfolgreicher Anmeldung
  router.push(redirectPath)
}
</script>
