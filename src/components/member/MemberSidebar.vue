<template>
  <div class="member-sidebar">
    <div class="card shadow-sm border-0 mb-4">
      <div class="card-body text-center p-4">
        <div class="avatar-container mb-3">
          <img 
            :src="user.profileImage || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.firstName + ' ' + user.lastName) + '&background=0D6EFD&color=fff'" 
            alt="Profile" 
            class="avatar-img"
          >
        </div>
        <h5 class="mb-1">{{ user.firstName }} {{ user.lastName }}</h5>
        <p class="text-muted mb-3">Member since {{ formatMemberSince(user.createdAt) }}</p>
        <router-link to="/dashboard/profile" class="btn btn-sm btn-outline-primary">
          <i class="bi bi-pencil-square me-1"></i> Edit Profile
        </router-link>
      </div>
    </div>
    
    <div class="card shadow-sm border-0">
      <div class="list-group list-group-flush">
        <router-link 
          v-for="item in menuItems" 
          :key="item.path" 
          :to="item.path" 
          class="list-group-item list-group-item-action d-flex align-items-center"
          :class="{ active: activeTab === item.id }"
        >
          <i :class="`bi bi-${item.icon} me-3`"></i>
          {{ item.label }}
        </router-link>
        
        <a 
          href="#" 
          class="list-group-item list-group-item-action d-flex align-items-center text-danger"
          @click.prevent="handleLogout"
        >
          <i class="bi bi-box-arrow-right me-3"></i>
          Sign Out
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const props = defineProps({
  activeTab: {
    type: String,
    default: 'dashboard'
  }
})

const router = useRouter()
const authStore = useAuthStore()

// Get user data from auth store
const user = computed(() => authStore.user)

// Menu items for sidebar
const menuItems = [
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: 'speedometer2' },
  { id: 'prayers', label: 'Prayer Requests', path: '/dashboard/prayers', icon: 'heart' },
  { id: 'sermons', label: 'Saved Sermons', path: '/dashboard/sermons', icon: 'journal-bookmark' },
  { id: 'profile', label: 'Profile Settings', path: '/dashboard/profile', icon: 'person-gear' },
  { id: 'notifications', label: 'Notifications', path: '/dashboard/notifications', icon: 'bell' }
]

// Format member since date
const formatMemberSince = (date) => {
  if (!date) return 'Today'
  return new Date(date).toLocaleDateString([], { month: 'long', year: 'numeric' })
}

// Handle logout
const handleLogout = async () => {
  try {
    await authStore.logout()
    router.push('/login')
  } catch (error) {
    console.error('Error logging out:', error)
  }
}
</script>

<style scoped>
.member-sidebar {
  position: sticky;
  top: 2rem;
}

.avatar-container {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
  border: 3px solid var(--bs-primary);
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.list-group-item {
  border-left: 0;
  border-right: 0;
  padding: 0.75rem 1.25rem;
  transition: all 0.2s ease;
}

.list-group-item:first-child {
  border-top: 0;
}

.list-group-item.active {
  background-color: var(--bs-primary);
  border-color: var(--bs-primary);
}

.list-group-item:not(.active):hover {
  background-color: rgba(13, 110, 253, 0.05);
}
</style> 