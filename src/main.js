import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'

// Supabase
import { createClient } from '@supabase/supabase-js'

// Erstelle Supabase Client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-url.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Initialisiere App
const app = createApp(App)
const pinia = createPinia()

// Erlaube Zugriff auf Supabase in allen Komponenten
app.config.globalProperties.$supabase = supabase

// Plugins registrieren
app.use(pinia)
app.use(router)

// App mounten
app.mount('#app')
