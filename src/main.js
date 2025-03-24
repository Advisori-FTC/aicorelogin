// Main application entry point
import { createApp } from 'vue'
import App from './App.vue'
import { registerPlugins } from './plugins'

// Create Vue app
const app = createApp(App)

// Register plugins (Vuetify, Pinia, Router)
registerPlugins(app)

// Mount the app
app.mount('#app')
