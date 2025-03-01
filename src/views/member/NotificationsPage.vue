<template>
  <div class="notifications-page">
    <div class="row">
      <div class="col-lg-3 mb-4">
        <MemberSidebar :active-tab="'notifications'" />
      </div>
      
      <div class="col-lg-9">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="mb-0">Notifications</h2>
          <div>
            <button 
              class="btn btn-outline-primary me-2" 
              @click="markAllAsRead"
              :disabled="!unreadNotifications.length"
            >
              <i class="bi bi-check-all me-1"></i> Mark All as Read
            </button>
            <div class="dropdown d-inline-block">
              <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                <i class="bi bi-filter me-1"></i> Filter
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <button 
                    class="dropdown-item" 
                    :class="{ active: filter === 'all' }"
                    @click="filter = 'all'"
                  >
                    All Notifications
                  </button>
                </li>
                <li>
                  <button 
                    class="dropdown-item" 
                    :class="{ active: filter === 'unread' }"
                    @click="filter = 'unread'"
                  >
                    Unread Only
                  </button>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                  <button 
                    class="dropdown-item" 
                    :class="{ active: filter === 'prayer' }"
                    @click="filter = 'prayer'"
                  >
                    Prayer Requests
                  </button>
                </li>
                <li>
                  <button 
                    class="dropdown-item" 
                    :class="{ active: filter === 'event' }"
                    @click="filter = 'event'"
                  >
                    Events
                  </button>
                </li>
                <li>
                  <button 
                    class="dropdown-item" 
                    :class="{ active: filter === 'sermon' }"
                    @click="filter = 'sermon'"
                  >
                    Sermons
                  </button>
                </li>
                <li>
                  <button 
                    class="dropdown-item" 
                    :class="{ active: filter === 'system' }"
                    @click="filter = 'system'"
                  >
                    System
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <!-- Notifications List -->
        <div class="card shadow-sm mb-4 slide-up">
          <div class="list-group list-group-flush">
            <div 
              v-for="notification in filteredNotifications" 
              :key="notification.id" 
              class="list-group-item notification-item"
              :class="{ 'unread': !notification.read }"
              @click="markAsRead(notification.id)"
            >
              <div class="d-flex">
                <div class="notification-icon me-3" :class="`bg-${notification.color}-subtle`">
                  <i :class="`bi bi-${notification.icon} text-${notification.color}`"></i>
                </div>
                <div class="flex-grow-1">
                  <div class="d-flex justify-content-between align-items-start">
                    <h6 class="mb-1">{{ notification.title }}</h6>
                    <small class="text-muted">{{ formatDate(notification.date) }}</small>
                  </div>
                  <p class="mb-1">{{ notification.message }}</p>
                  <div v-if="notification.actionUrl" class="mt-2">
                    <router-link :to="notification.actionUrl" class="btn btn-sm btn-outline-primary">
                      {{ notification.actionText }}
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
            
            <div v-if="filteredNotifications.length === 0" class="list-group-item text-center py-5">
              <i class="bi bi-bell-slash text-muted display-4 mb-3"></i>
              <p class="mb-0">No notifications to display</p>
              <p class="text-muted small">
                {{ filter !== 'all' ? 'Try changing your filter settings' : 'You\'re all caught up!' }}
              </p>
            </div>
          </div>
        </div>
        
        <!-- Pagination -->
        <nav v-if="filteredNotifications.length > 0" aria-label="Notifications pagination">
          <ul class="pagination justify-content-center">
            <li class="page-item disabled">
              <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
            </li>
            <li class="page-item active"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import MemberSidebar from '@/components/member/MemberSidebar.vue'

// Filter state
const filter = ref('all')

// Sample notifications data
const notifications = ref([
  {
    id: 1,
    title: 'Prayer Request Update',
    message: 'Your prayer request "Health concerns" has received 5 new prayers.',
    date: new Date(2023, 7, 28, 14, 35),
    read: false,
    type: 'prayer',
    icon: 'heart-fill',
    color: 'danger',
    actionUrl: '/dashboard/prayers',
    actionText: 'View Prayer Request'
  },
  {
    id: 2,
    title: 'New Sermon Available',
    message: 'A new sermon "Finding Peace in Troubled Times" has been uploaded.',
    date: new Date(2023, 7, 27, 9, 15),
    read: false,
    type: 'sermon',
    icon: 'journal-bookmark-fill',
    color: 'success',
    actionUrl: '/sermons',
    actionText: 'Watch Sermon'
  },
  {
    id: 3,
    title: 'Event Reminder',
    message: 'Bible Study Group is starting in 2 hours.',
    date: new Date(2023, 7, 25, 16, 20),
    read: true,
    type: 'event',
    icon: 'calendar-check-fill',
    color: 'primary',
    actionUrl: '/events',
    actionText: 'View Event Details'
  },
  {
    id: 4,
    title: 'Welcome to Grace Church',
    message: 'Thank you for creating an account. Explore all the features available to members.',
    date: new Date(2023, 7, 20, 10, 0),
    read: true,
    type: 'system',
    icon: 'info-circle-fill',
    color: 'info',
    actionUrl: '/dashboard',
    actionText: 'Go to Dashboard'
  },
  {
    id: 5,
    title: 'Prayer Request Answered',
    message: 'John Smith marked their prayer request "Family reunion" as answered.',
    date: new Date(2023, 7, 18, 13, 45),
    read: true,
    type: 'prayer',
    icon: 'check-circle-fill',
    color: 'success',
    actionUrl: '/dashboard/prayers',
    actionText: 'View Prayer Request'
  }
])

// Computed properties
const unreadNotifications = computed(() => {
  return notifications.value.filter(notification => !notification.read)
})

const filteredNotifications = computed(() => {
  if (filter.value === 'all') {
    return notifications.value
  } else if (filter.value === 'unread') {
    return notifications.value.filter(notification => !notification.read)
  } else {
    return notifications.value.filter(notification => notification.type === filter.value)
  }
})

// Format date for display
const formatDate = (date) => {
  const now = new Date()
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) {
    return 'Today at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } else if (diffDays === 1) {
    return 'Yesterday at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } else if (diffDays < 7) {
    return diffDays + ' days ago'
  } else {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
  }
}

// Mark a notification as read
const markAsRead = (id) => {
  const notification = notifications.value.find(n => n.id === id)
  if (notification && !notification.read) {
    notification.read = true
  }
}

// Mark all notifications as read
const markAllAsRead = () => {
  notifications.value.forEach(notification => {
    notification.read = true
  })
}
</script>

<style scoped>
.notifications-page {
  padding: 2rem 0;
}

.notification-item {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.notification-item:hover {
  background-color: rgba(0, 0, 0, 0.01);
}

.notification-item.unread {
  background-color: rgba(13, 110, 253, 0.05);
}

.notification-item.unread:hover {
  background-color: rgba(13, 110, 253, 0.08);
}

.notification-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style> 