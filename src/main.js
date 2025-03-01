import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/authStore'

// Import Bootstrap CSS and JS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// Import Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css'
// Import custom Material-inspired CSS
import './assets/css/material-theme.css'
// Import transitions and animations
import './assets/css/transitions.css'

// Create the Vue application
const app = createApp(App)
const pinia = createPinia()

// Use Pinia for state management
app.use(pinia)

// Use Vue Router for navigation
app.use(router)

// Initialize auth store
const authStore = useAuthStore()
authStore.initAuth().then(() => {
  app.mount('#app')
}) 