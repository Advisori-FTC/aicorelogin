import { defineStore } from 'pinia'
import { supabase } from '../plugins/supabase'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null,
    loading: false
  }),
  
  actions: {
    async init() {
      // Bestehende Session prüfen
      const { data } = await supabase.auth.getSession()
      this.user = data.session?.user || null
      this.isAuthenticated = !!data.session
      
      // Auth-Status Listener
      supabase.auth.onAuthStateChange((event, session) => {
        this.user = session?.user || null
        this.isAuthenticated = !!session
      })
    },
    
    async login(email, password) {
      this.loading = true
      
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        })
        
        if (error) throw error
        
        this.user = data.user
        this.isAuthenticated = true
        return { success: true }
      } catch (error) {
        console.error('Login error:', error)
        return { 
          success: false, 
          message: error.message || 'Anmeldung fehlgeschlagen' 
        }
      } finally {
        this.loading = false
      }
    },
    
    async logout() {
      await supabase.auth.signOut()
      this.user = null
      this.isAuthenticated = false
    }
  }
})
