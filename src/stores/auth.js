import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/main'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)
  
  // Getters
  const isLoggedIn = computed(() => !!user.value)
  const userRole = computed(() => user.value?.user_metadata?.role || 'user')
  
  // Actions
  async function getSession() {
    try {
      loading.value = true
      const { data, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError) {
        throw sessionError
      }
      
      if (data?.session) {
        user.value = data.session.user
      }
      
      return { data, error: null }
    } catch (err) {
      error.value = err.message
      return { data: null, error: err }
    } finally {
      loading.value = false
    }
  }
  
  async function signIn(email, password) {
    try {
      loading.value = true
      error.value = null
      
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (signInError) {
        throw signInError
      }
      
      if (data?.user) {
        user.value = data.user
      }
      
      return { data, error: null }
    } catch (err) {
      error.value = err.message
      return { data: null, error: err }
    } finally {
      loading.value = false
    }
  }
  
  async function signUp(email, password, metadata = {}) {
    try {
      loading.value = true
      error.value = null
      
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            ...metadata,
            role: 'user' // Standardrolle für neue Benutzer
          }
        }
      })
      
      if (signUpError) {
        throw signUpError
      }
      
      return { data, error: null }
    } catch (err) {
      error.value = err.message
      return { data: null, error: err }
    } finally {
      loading.value = false
    }
  }
  
  async function resetPassword(email) {
    try {
      loading.value = true
      error.value = null
      
      const { data, error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })
      
      if (resetError) {
        throw resetError
      }
      
      return { data, error: null }
    } catch (err) {
      error.value = err.message
      return { data: null, error: err }
    } finally {
      loading.value = false
    }
  }
  
  async function updatePassword(password) {
    try {
      loading.value = true
      error.value = null
      
      const { data, error: updateError } = await supabase.auth.updateUser({
        password
      })
      
      if (updateError) {
        throw updateError
      }
      
      return { data, error: null }
    } catch (err) {
      error.value = err.message
      return { data: null, error: err }
    } finally {
      loading.value = false
    }
  }
  
  async function signOut() {
    try {
      loading.value = true
      error.value = null
      
      const { error: signOutError } = await supabase.auth.signOut()
      
      if (signOutError) {
        throw signOutError
      }
      
      user.value = null
      
      return { error: null }
    } catch (err) {
      error.value = err.message
      return { error: err }
    } finally {
      loading.value = false
    }
  }
  
  // Automatisches Setup für Auth-Änderungen
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' && session) {
      user.value = session.user
    } else if (event === 'SIGNED_OUT') {
      user.value = null
    }
  })
  
  return {
    // State
    user,
    loading,
    error,
    
    // Getters
    isLoggedIn,
    userRole,
    
    // Actions
    getSession,
    signIn,
    signUp,
    resetPassword,
    updatePassword,
    signOut
  }
})
