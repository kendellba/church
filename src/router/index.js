import { createRouter, createWebHistory } from 'vue-router'

// Import page components
import HomePage from '../views/HomePage.vue'
import AboutPage from '../views/AboutPage.vue'
import EventsPage from '../views/EventsPage.vue'
import SermonsPage from '../views/SermonsPage.vue'
import ContactPage from '../views/ContactPage.vue'

// Define routes
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: { title: 'Home' }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutPage,
    meta: { title: 'About Us' }
  },
  {
    path: '/events',
    name: 'events',
    component: EventsPage,
    meta: { title: 'Events' }
  },
  {
    path: '/sermons',
    name: 'sermons',
    component: SermonsPage,
    meta: { title: 'Sermons' }
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactPage,
    meta: { title: 'Contact Us' }
  }
  
]

// Create router instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // Add active class to current route
  linkActiveClass: 'active'
})

// Update document title based on route
router.beforeEach((to, from, next) => {
  document.title = `Grace Church - ${to.meta.title || 'Welcome'}`
  next()
})

export default router 