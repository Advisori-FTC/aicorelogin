<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <div class="card mb-8">
      <h1 class="text-2xl font-bold mb-4">Willkommen bei AI Core Studio</h1>
      
      <div v-if="authStore.user" class="mb-6">
        <p class="mb-4">Sie sind angemeldet als: <strong>{{ authStore.user.email }}</strong></p>
        <p class="mb-2">
          Rolle: <span class="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
            {{ authStore.userRole }}
          </span>
        </p>
      </div>
      
      <div v-if="loading" class="py-4">
        <p>Lade Informationen...</p>
      </div>
      
      <div v-else class="space-y-4">
        <p>Wählen Sie eine Option, um fortzufahren:</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a @click="navigateToStudio" href="#" class="block p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <h3 class="font-medium text-lg mb-2">Supabase Studio</h3>
            <p class="text-gray-600">Zugriff auf die Supabase Studio Oberfläche für Datenbankadministration und Entwicklung.</p>
          </a>
          
          <a @click="navigateToAdmin" href="#" v-if="isAdmin" class="block p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <h3 class="font-medium text-lg mb-2">Verwaltungsbereich</h3>
            <p class="text-gray-600">Administrator-Funktionen und Benutzerverwaltung (nur für Admins verfügbar).</p>
          </a>
        </div>
      </div>
    </div>
    
    <div class="card">
      <h2 class="text-xl font-semibold mb-4">Ihre Projektinformationen</h2>
      
      <div v-if="projectInfo" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="border rounded-lg p-4">
            <h3 class="font-medium mb-2">Projekt-ID</h3>
            <p class="text-gray-600">{{ projectInfo.id }}</p>
          </div>
          
          <div class="border rounded-lg p-4">
            <h3 class="font-medium mb-2">Organisation</h3>
            <p class="text-gray-600">{{ projectInfo.organization?.name || 'Keine Organisation' }}</p>
          </div>
        </div>
        
        <button @click="refreshProjectInfo" class="btn-secondary">
          <span>Aktualisieren</span>
        </button>
      </div>
      
      <div v-else class="py-4">
        <p class="text-gray-600">Keine Projektinformationen verfügbar.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { supabase } from '@/main'

const authStore = useAuthStore()
const loading = ref(true)
const projectInfo = ref(null)
const error = ref(null)

// Berechnung, ob der Benutzer Admin ist
const isAdmin = computed(() => {
  return ['admin', 'superuser'].includes(authStore.userRole)
})

// Beim Laden der Komponente Projektinformationen abrufen
onMounted(async () => {
  await refreshProjectInfo()
})

// Aktualisieren der Projektinformationen
async function refreshProjectInfo() {
  try {
    loading.value = true
    error.value = null
    
    // Lade Projektinformationen über Supabase API
    // Dies ist nur ein Beispiel - die tatsächliche API kann anders sein
    const { data, error: apiError } = await supabase
      .from('projects')
      .select('id, name, organization:organizations(id, name)')
      .limit(1)
      .single()
    
    if (apiError) throw apiError
    
    projectInfo.value = data
  } catch (err) {
    error.value = err.message
    console.error('Fehler beim Laden der Projektinformationen:', err)
    
    // Fallback-Daten für Demonstration
    projectInfo.value = {
      id: 'demo-project',
      name: 'Demo Projekt',
      organization: {
        name: 'AI Core Organization'
      }
    }
  } finally {
    loading.value = false
  }
}

// Navigation zu Supabase Studio
function navigateToStudio() {
  // Hier würden wir zur Hauptanwendung navigieren
  window.location.href = '/'
}

// Navigation zum Admin-Bereich
function navigateToAdmin() {
  // Hier würden wir zum Admin-Bereich navigieren
  window.location.href = '/org/settings/members/roles'
}
</script>
