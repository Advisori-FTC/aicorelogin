import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    mode: localStorage.getItem('themeMode') || 'light',
  }),
  
  actions: {
    toggleTheme() {
      this.mode = this.mode === 'light' ? 'dark' : 'light'
      localStorage.setItem('themeMode', this.mode)
      this.applyTheme()
    },
    
    setTheme(mode) {
      if (mode !== 'light' && mode !== 'dark') return
      this.mode = mode
      localStorage.setItem('themeMode', this.mode)
      this.applyTheme()
    },
    
    applyTheme() {
      // Update document attribute for CSS selectors
      document.documentElement.setAttribute('data-theme', this.mode)
      
      // Update Vuetify theme
      document.querySelector('html').setAttribute('class', this.mode === 'dark' ? 'v-theme--dark' : 'v-theme--light')
    },
    
    initTheme() {
      this.applyTheme()
    }
  },
  
  getters: {
    isDark: (state) => state.mode === 'dark',
    currentTheme: (state) => state.mode
  }
})
