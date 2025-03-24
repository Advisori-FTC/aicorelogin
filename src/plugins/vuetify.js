// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

// Themes
const lightTheme = {
  dark: false,
  colors: {
    primary: '#1867C0',
    secondary: '#5CBBF6',
    accent: '#4CAF50',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
    background: '#FFFFFF',
    surface: '#F5F5F5',
  }
}

const darkTheme = {
  dark: true,
  colors: {
    primary: '#2196F3',
    secondary: '#424242',
    accent: '#4CAF50',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
    background: '#121212',
    surface: '#212121',
  }
}

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    }
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: lightTheme,
      dark: darkTheme
    }
  }
})
