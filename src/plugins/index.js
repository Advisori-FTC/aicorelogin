// Plugin registration file
import vuetify from './vuetify'
import { createPinia } from 'pinia'
import router from '../router'
import { useThemeStore } from '../stores/theme'
import './supabase' // Import Supabase client

export function registerPlugins(app) {
  const pinia = createPinia()
  app.use(pinia)
  app.use(vuetify)
  app.use(router)
  
  // Initialize theme after pinia is set up
  setTimeout(() => {
    const themeStore = useThemeStore()
    themeStore.initTheme()
  }, 0)
}
