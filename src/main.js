import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

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

// Use Pinia for state management
app.use(createPinia())

// Use Vue Router for navigation
app.use(router)

// Mount the app
app.mount('#app') 