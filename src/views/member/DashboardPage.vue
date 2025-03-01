<template>
  <div class="dashboard-page">
    <div class="row">
      <div class="col-lg-3 mb-4">
        <MemberSidebar :active-tab="'dashboard'" />
      </div>
      
      <div class="col-lg-9">
        <div class="card shadow-sm mb-4 slide-up">
          <div class="card-body">
            <h2 class="card-title">Welcome, {{ user.firstName }}!</h2>
            <p class="card-text">This is your personal dashboard where you can manage your account and access member-only features.</p>
          </div>
        </div>
        
        <!-- Quick Stats -->
        <div class="row row-cols-1 row-cols-md-3 g-4 mb-4">
          <div class="col slide-up" style="animation-delay: 0.1s">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center">
                <div class="stat-icon bg-primary-subtle rounded-circle mb-3">
                  <i class="bi bi-heart-fill text-primary"></i>
                </div>
                <h5 class="card-title">{{ savedPrayers.length }}</h5>
                <p class="card-text text-muted">Prayer Requests</p>
              </div>
              <div class="card-footer bg-transparent border-0">
                <router-link to="/dashboard/prayers" class="btn btn-sm btn-outline-primary w-100">
                  View All
                </router-link>
              </div>
            </div>
          </div>
          
          <div class="col slide-up" style="animation-delay: 0.2s">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center">
                <div class="stat-icon bg-success-subtle rounded-circle mb-3">
                  <i class="bi bi-journal-bookmark-fill text-success"></i>
                </div>
                <h5 class="card-title">{{ savedSermons.length }}</h5>
                <p class="card-text text-muted">Saved Sermons</p>
              </div>
              <div class="card-footer bg-transparent border-0">
                <router-link to="/dashboard/sermons" class="btn btn-sm btn-outline-primary w-100">
                  View All
                </router-link>
              </div>
            </div>
          </div>
          
          <div class="col slide-up" style="animation-delay: 0.3s">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center">
                <div class="stat-icon bg-info-subtle rounded-circle mb-3">
                  <i class="bi bi-calendar-check-fill text-info"></i>
                </div>
                <h5 class="card-title">{{ upcomingEvents.length }}</h5>
                <p class="card-text text-muted">Upcoming Events</p>
              </div>
              <div class="card-footer bg-transparent border-0">
                <router-link to="/events" class="btn btn-sm btn-outline-primary w-100">
                  View All
                </router-link>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Recent Activity -->
        <div class="card shadow-sm mb-4 slide-up" style="animation-delay: 0.4s">
          <div class="card-header bg-white">
            <h5 class="mb-0">Recent Activity</h5>
          </div>
          <div class="card-body p-0">
            <div class="list-group list-group-flush">
              <div v-for="(activity, index) in recentActivity" :key="index" class="list-group-item">
                <div class="d-flex align-items-center">
                  <div class="activity-icon me-3" :class="`bg-${activity.color}-subtle`">
                    <i :class="`bi bi-${activity.icon} text-${activity.color}`"></i>
                  </div>
                  <div>
                    <p class="mb-0">{{ activity.description }}</p>
                    <small class="text-muted">{{ formatDate(activity.date) }}</small>
                  </div>
                </div>
              </div>
              
              <div v-if="recentActivity.length === 0" class="list-group-item text-center py-4">
                <i class="bi bi-calendar-x text-muted fs-3 mb-2"></i>
                <p class="mb-0">No recent activity to display</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Upcoming Events -->
        <div class="card shadow-sm mb-4 slide-up" style="animation-delay: 0.5s">
          <div class="card-header bg-white d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Upcoming Events</h5>
            <router-link to="/events" class="btn btn-sm btn-outline-primary">View All</router-link>
          </div>
          <div class="card-body p-0">
            <div class="list-group list-group-flush">
              <div v-for="(event, index) in upcomingEvents.slice(0, 3)" :key="index" class="list-group-item">
                <div class="row align-items-center">
                  <div class="col-auto">
                    <div class="event-date text-center">
                      <div class="event-month">{{ formatEventMonth(event.date) }}</div>
                      <div class="event-day">{{ formatEventDay(event.date) }}</div>
                    </div>
                  </div>
                  <div class="col">
                    <h6 class="mb-1">{{ event.title }}</h6>
                    <p class="mb-0 small">
                      <i class="bi bi-clock me-1"></i> {{ formatEventTime(event.date) }}
                      <i class="bi bi-geo-alt ms-3 me-1"></i> {{ event.location }}
                    </p>
                  </div>
                  <div class="col-auto">
                    <button class="btn btn-sm btn-outline-primary">
                      <i class="bi bi-calendar-plus me-1"></i> RSVP
                    </button>
                  </div>
                </div>
              </div>
              
              <div v-if="upcomingEvents.length === 0" class="list-group-item text-center py-4">
                <i class="bi bi-calendar-x text-muted fs-3 mb-2"></i>
                <p class="mb-0">No upcoming events</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import MemberSidebar from '@/components/member/MemberSidebar.vue'

const authStore = useAuthStore()

// Get user data from auth store
const user = computed(() => authStore.user)

// Sample data for saved prayers
const savedPrayers = computed(() => [
  {
    id: 1,
    title: 'Health concerns',
    description: 'Praying for my mother\'s recovery after surgery',
    date: new Date(2023, 7, 15),
    status: 'active'
  },
  {
    id: 2,
    title: 'New job opportunity',
    description: 'Seeking guidance for a potential career change',
    date: new Date(2023, 7, 10),
    status: 'active'
  }
])

// Sample data for saved sermons
const savedSermons = computed(() => [
  {
    id: 1,
    title: 'Finding Peace in Troubled Times',
    speaker: 'Pastor John Smith',
    date: new Date(2023, 7, 20),
    duration: '45:12'
  },
  {
    id: 2,
    title: 'The Power of Prayer',
    speaker: 'Pastor Sarah Johnson',
    date: new Date(2023, 7, 13),
    duration: '38:45'
  },
  {
    id: 3,
    title: 'Walking in Faith',
    speaker: 'Pastor John Smith',
    date: new Date(2023, 7, 6),
    duration: '42:30'
  }
])

// Sample data for upcoming events
const upcomingEvents = computed(() => [
  {
    id: 1,
    title: 'Sunday Worship Service',
    date: new Date(2023, 8, 3, 10, 0),
    location: 'Main Sanctuary'
  },
  {
    id: 2,
    title: 'Bible Study Group',
    date: new Date(2023, 8, 6, 19, 0),
    location: 'Fellowship Hall'
  },
  {
    id: 3,
    title: 'Youth Group Meeting',
    date: new Date(2023, 8, 8, 18, 30),
    location: 'Youth Center'
  }
])

// Sample data for recent activity
const recentActivity = computed(() => [
  {
    description: 'You submitted a new prayer request',
    date: new Date(2023, 7, 28, 14, 35),
    icon: 'heart-fill',
    color: 'danger'
  },
  {
    description: 'You saved "Finding Peace in Troubled Times" sermon',
    date: new Date(2023, 7, 27, 9, 15),
    icon: 'journal-bookmark-fill',
    color: 'success'
  },
  {
    description: 'You RSVP\'d to "Bible Study Group"',
    date: new Date(2023, 7, 25, 16, 20),
    icon: 'calendar-check-fill',
    color: 'primary'
  }
])

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

// Format event month
const formatEventMonth = (date) => {
  return date.toLocaleDateString([], { month: 'short' })
}

// Format event day
const formatEventDay = (date) => {
  return date.getDate()
}

// Format event time
const formatEventTime = (date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
</script>

<style scoped>
.dashboard-page {
  padding: 2rem 0;
}

.stat-icon {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.stat-icon i {
  font-size: 1.5rem;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.activity-icon i {
  font-size: 1.2rem;
}

.event-date {
  width: 50px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.event-month {
  background-color: var(--bs-primary);
  color: white;
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: bold;
  padding: 2px 0;
}

.event-day {
  background-color: white;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 5px 0;
}
</style> 