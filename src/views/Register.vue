<template>
  <div class="flex justify-center items-center min-h-[calc(100vh-180px)]">
    <div class="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
      <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">
        Registrierung bei AI Core Studio
      </h1>
      
      <form @submit.prevent="handleRegister" class="space-y-6">
        <div v-if="error" class="p-3 text-sm bg-red-100 text-red-700 rounded-md">
          {{ error }}
        </div>
        
        <div v-if="successMessage" class="p-3 text-sm bg-green-100 text-green-700 rounded-md">
          {{ successMessage }}
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
          <label for="password" class="block text-sm font-medium text-gray-700">Passwort</label>
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
            <span v-if="loading">Registrierung läuft...</span>
            <span v-else>Registrieren</span>
          </button>
        </div>
      </form>
      
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600">
          Bereits ein Konto?
          <router-link :to="{ name: 'login' }" class="text-primary-600 hover:underline">
            Anmelden
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

// Formulardaten
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const successMessage = ref('')
const loading = ref(false)

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

// Register-Handler
async function handleRegister() {
  // Zurücksetzen von Fehlern
  error.value = ''
  successMessage.value = ''
  
  // Formularvalidierung
  if (!email.value || !password.value || !confirmPassword.value) {
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
  
  // Registrierung durchführen
  loading.value = true
  const { data, error: signUpError } = await authStore.signUp(email.value, password.value)
  loading.value = false
  
  if (signUpError) {
    error.value = 'Registrierung fehlgeschlagen: ' + signUpError.message
    return
  }
  
  // Erfolgreiche Registrierung
  successMessage.value = 'Registrierung erfolgreich! Bitte überprüfen Sie Ihre E-Mails für einen Bestätigungslink.'
  
  // Felder zurücksetzen
  email.value = ''
  password.value = ''
  confirmPassword.value = ''
  
  // Optional: Weiterleitung nach kurzer Verzögerung
  setTimeout(() => {
    router.push({ name: 'login' })
  }, 3000)
}
</script>
