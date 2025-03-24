<template>
  <div class="app-container min-h-screen">
    <header class="bg-primary-700 text-white p-4 shadow-md">
      <div class="container mx-auto flex justify-between items-center">
        <div class="flex items-center space-x-2">
          <img src="@/assets/logo.svg" alt="AI Core" class="h-8 w-8" />
          <h1 class="text-xl font-semibold m-0">AI Core Studio</h1>
        </div>
        <div v-if="authStore.user">
          <button @click="authStore.signOut" class="text-sm text-white hover:text-primary-200">
            Abmelden
          </button>
        </div>
      </div>
    </header>

    <main class="container mx-auto py-8 px-4 flex-grow">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer class="bg-gray-100 py-4 text-center text-gray-600 text-sm">
      <div class="container mx-auto">
        <p>&copy; 2025 AI Core. Alle Rechte vorbehalten.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()
const router = useRouter()

onMounted(async () => {
  // Prüfe Session beim Laden der App
  const { data } = await authStore.getSession()
  
  // Wenn kein Benutzer angemeldet ist und wir nicht bereits auf der Login-Seite sind
  if (!data.session && router.currentRoute.value.name !== 'login' && 
      router.currentRoute.value.name !== 'register' && 
      router.currentRoute.value.name !== 'reset-password') {
    router.push({ name: 'login' })
  }
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
