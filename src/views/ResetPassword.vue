<template>
  <div class="flex justify-center items-center min-h-[calc(100vh-180px)]">
    <div class="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
      <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">
        Passwort zurücksetzen
      </h1>
      
      <!-- Anfrage zur Passwort-Zurücksetzung -->
      <form v-if="!recovery && !successMessage" @submit.prevent="handleResetRequest" class="space-y-6">
        <div v-if="error" class="p-3 text-sm bg-red-100 text-red-700 rounded-md">
          {{ error }}
        </div>
        
        <p class="text-sm text-gray-600 mb-4">
          Geben Sie Ihre E-Mail-Adresse ein, um einen Link zum Zurücksetzen Ihres Passworts zu erhalten.
        </p>
        
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
        
        <div>
          <button
            type="submit"
            class="btn-primary w-full flex justify-center"
            :disabled="loading"
          >
            <span v-if="loading">Senden...</span>
            <span v-else>Link senden</span>
          </button>
        </div>
      </form>
      
      <!-- Neues Passwort setzen (nach Bestätigung des Links) -->
      <form v-if="recovery && !successMessage" @submit.prevent="handlePasswordUpdate" class="space-y-6">
        <div v-if="error" class="p-3 text-sm bg-red-100 text-red-700 rounded-md">
          {{ error }}
        </div>
        
        <p class="text-sm text-gray-600 mb-4">
          Bitte geben Sie Ihr neues Passwort ein.
        </p>
        
        <div class="space-y-2">
          <label for="password" class="block text-sm font-medium text-gray-700">Neues Passwort</label>
          <input
            v-model="password"
            id="password"
            type="password"
            required
            autocomplete="new-password"
            class="form-input"
            placeholder="••••••••"
          />
          <p class="text-xs text-gray-500">
            Mindestens 8 Zeichen mit Groß- und Kleinbuchstaben, Zahlen und Sonderzeichen.
          </p>
        </div>
        
        <div class="space-y-2">
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Passwort bestätigen</label>
          <input
            v-model="confirmPassword"
            id="confirmPassword"
            type="password"
            required
            autocomplete="new-password"
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
            <span v-if="loading">Verarbeitung...</span>
            <span v-else>Passwort aktualisieren</span>
          </button>
        </div>
      </form>
      
      <!-- Erfolgsmeldung -->
      <div v-if="successMessage" class="space-y-6">
        <div class="p-4 bg-green-100 text-green-700 rounded-md">
          {{ successMessage }}
        </div>
        
        <div>
          <button
            @click="goToLogin"
            class="btn-primary w-full flex justify-center"
          >
            Zurück zur Anmeldung
          </button>
        </div>
      </div>
      
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600">
          <router-link :to="{ name: 'login' }" class="text-primary-600 hover:underline">
            Zurück zur Anmeldung
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { supabase } from '@/main'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

// Formulardaten
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const successMessage = ref('')
const loading = ref(false)
const recovery = ref(false)

// Prüfen ob wir in einem Passwort-Reset-Flow sind
onMounted(() => {
  // Prüfe URL-Parameter für Passwort-Reset
  const hash = window.location.hash
  if (hash && hash.includes('type=recovery')) {
    recovery.value = true
  }
})

// Validierung
function validatePassword(password) {
  const minLength = 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  
  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChar
  )
}

// Anfrage für Passwort-Zurücksetzung
async function handleResetRequest() {
  error.value = ''
  
  if (!email.value) {
    error.value = 'Bitte geben Sie Ihre E-Mail-Adresse ein.'
    return
  }
  
  loading.value = true
  const { data, error: resetError } = await authStore.resetPassword(email.value)
  loading.value = false
  
  if (resetError) {
    error.value = 'Fehler beim Senden des Zurücksetzungslinks: ' + resetError.message
    return
  }
  
  successMessage.value = 'Ein Link zum Zurücksetzen des Passworts wurde an Ihre E-Mail-Adresse gesendet.'
  email.value = ''
}

// Aktualisierung des Passworts
async function handlePasswordUpdate() {
  error.value = ''
  
  // Formularvalidierung
  if (!password.value || !confirmPassword.value) {
    error.value = 'Bitte füllen Sie alle Felder aus.'
    return
  }
  
  if (password.value !== confirmPassword.value) {
    error.value = 'Die Passwörter stimmen nicht überein.'
    return
  }
  
  if (!validatePassword(password.value)) {
    error.value = 'Das Passwort erfüllt nicht die Sicherheitsanforderungen.'
    return
  }
  
  loading.value = true
  const { data, error: updateError } = await authStore.updatePassword(password.value)
  loading.value = false
  
  if (updateError) {
    error.value = 'Fehler beim Aktualisieren des Passworts: ' + updateError.message
    return
  }
  
  successMessage.value = 'Ihr Passwort wurde erfolgreich aktualisiert.'
  password.value = ''
  confirmPassword.value = ''
}

// Navigation zur Login-Seite
function goToLogin() {
  router.push({ name: 'login' })
}
</script>
