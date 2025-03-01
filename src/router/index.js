import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import SplashScreen from '../views/SplashScreen.vue'

// Import page components
import HomePage from '../views/HomePage.vue'
import AboutPage from '../views/AboutPage.vue'
import EventsPage from '../views/EventsPage.vue'
import SermonsPage from '../views/SermonsPage.vue'
import ContactPage from '../views/ContactPage.vue'
import LiveStreamPage from '../views/LiveStreamPage.vue'
import PrayerRequestsPage from '../views/PrayerRequestsPage.vue'
import GroupsPage from '../views/GroupsPage.vue'
import GalleryPage from '../views/GalleryPage.vue'

// Auth pages
import LoginPage from '../views/auth/LoginPage.vue'
import RegisterPage from '../views/auth/RegisterPage.vue'
import ForgotPasswordPage from '../views/auth/ForgotPasswordPage.vue'

// Member pages
import DashboardPage from '../views/member/DashboardPage.vue'
import SavedPrayersPage from '../views/member/SavedPrayersPage.vue'
import SavedSermonsPage from '../views/member/SavedSermonsPage.vue'
import ProfilePage from '../views/member/ProfilePage.vue'
import NotificationsPage from '../views/member/NotificationsPage.vue'

// Define routes
const routes = [
  // Splash Screen
  {
    path: '/splash',
    name: 'splash',
    component: SplashScreen
  },
  
  // Public routes
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
  },
  {
    path: '/live',
    name: 'live',
    component: LiveStreamPage
  },
  {
    path: '/prayer',
    name: 'prayer',
    component: PrayerRequestsPage
  },
  {
    path: '/groups',
    name: 'groups',
    component: GroupsPage
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: GalleryPage
  },
  
  // Auth routes
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: { guestOnly: true }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
    meta: { guestOnly: true }
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPasswordPage,
    meta: { guestOnly: true }
  },
  
  // Member routes (protected)
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard/prayers',
    name: 'saved-prayers',
    component: SavedPrayersPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard/sermons',
    name: 'saved-sermons',
    component: SavedSermonsPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard/profile',
    name: 'profile',
    component: ProfilePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard/notifications',
    name: 'notifications',
    component: NotificationsPage,
    meta: { requiresAuth: true }
  },
  
  // 404 route
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundPage.vue')
  }
]

// Create router instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // Add active class to current route
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Navigation guards
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Initialize auth state if not already done
  if (!authStore.initialized) {
    await authStore.initAuth()
  }
  
  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ name: 'login', query: { redirect: to.fullPath } })
  }
  
  // Check if route is for guests only (like login page)
  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return next({ name: 'dashboard' })
  }
  
  // Update document title based on route
  document.title = `Grace Church - ${to.meta.title || 'Welcome'}`
  next()
})

export default router 