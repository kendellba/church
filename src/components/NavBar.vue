<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <router-link class="navbar-brand d-flex align-items-center" to="/">
        <i class="bi bi-church me-2"></i>
        <span>Grace Church</span>
      </router-link>
      
      <button 
        class="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav" 
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/" active-class="active" exact>Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about" active-class="active">About</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/events" active-class="active">Events</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/sermons" active-class="active">Sermons</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/groups" active-class="active">Groups</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/gallery" active-class="active">Gallery</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/prayer" active-class="active">Prayer</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/live" active-class="active">Live</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contact" active-class="active">Contact</router-link>
          </li>
          
          <!-- Auth Links -->
          <template v-if="!isAuthenticated">
            <li class="nav-item">
              <router-link class="nav-link" to="/login" active-class="active">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link class="btn btn-outline-light ms-2" to="/register">Register</router-link>
            </li>
          </template>
          
          <!-- User Dropdown when logged in -->
          <li v-else class="nav-item dropdown">
            <a 
              class="nav-link dropdown-toggle d-flex align-items-center" 
              href="#" 
              id="navbarDropdown" 
              role="button" 
              data-bs-toggle="dropdown" 
              aria-expanded="false"
            >
              <span class="me-2">{{ user.firstName }}</span>
              <div class="avatar-xs">
                <img 
                  :src="user.profileImage || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.firstName + ' ' + user.lastName) + '&background=0D6EFD&color=fff'" 
                  alt="Profile" 
                  class="avatar-img"
                >
              </div>
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
              <li>
                <router-link class="dropdown-item" to="/dashboard">
                  <i class="bi bi-speedometer2 me-2"></i> Dashboard
                </router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/dashboard/profile">
                  <i class="bi bi-person-gear me-2"></i> Profile Settings
                </router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/dashboard/prayers">
                  <i class="bi bi-heart me-2"></i> My Prayer Requests
                </router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/dashboard/sermons">
                  <i class="bi bi-journal-bookmark me-2"></i> Saved Sermons
                </router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/dashboard/notifications">
                  <i class="bi bi-bell me-2"></i> Notifications
                  <span v-if="unreadNotificationsCount > 0" class="badge bg-danger ms-2">{{ unreadNotificationsCount }}</span>
                </router-link>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li>
                <a class="dropdown-item text-danger" href="#" @click.prevent="handleLogout">
                  <i class="bi bi-box-arrow-right me-2"></i> Sign Out
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

// Auth state
const isAuthenticated = computed(() => authStore.isAuthenticated)
const user = computed(() => authStore.user || {})

// For demo purposes - in a real app this would come from a notifications store
const unreadNotificationsCount = computed(() => 2)

// Handle logout
const handleLogout = async () => {
  try {
    await authStore.logout()
    router.push('/')
  } catch (error) {
    console.error('Error logging out:', error)
  }
}
</script>

<style scoped>
.navbar-brand {
  font-size: 1.5rem;
  font-weight: 300;
}

.nav-link {
  font-weight: 500;
  padding: 0.5rem 1rem;
  transition: background-color 0.2s ease;
  border-radius: 4px;
  margin: 0 2px;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link.active {
  background-color: rgba(255, 255, 255, 0.2);
  font-weight: 500;
}

.avatar-xs {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style> 