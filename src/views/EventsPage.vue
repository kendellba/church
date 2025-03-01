<template>
  <div class="events-page">
    <h1 class="page-title slide-up">Upcoming Events</h1>
    
    <!-- Loading and error states -->
    <div v-if="eventsStore.isLoading" class="text-center my-5">
      <div class="spinner-border text-primary shimmer" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2 fade-in">Loading events...</p>
    </div>
    
    <div v-else-if="eventsStore.error" class="alert alert-danger slide-up" role="alert">
      {{ eventsStore.error }}
    </div>
    
    <!-- Events list -->
    <div v-else>
      <div v-if="upcomingEvents.length === 0" class="text-center my-5 fade-in">
        <p class="lead">No upcoming events at this time. Please check back later.</p>
      </div>
      
      <transition-group 
        name="staggered-fade" 
        tag="div" 
        class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"
      >
        <div 
          class="col" 
          v-for="(event, index) in upcomingEvents" 
          :key="event.id"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <EventCard :event="event" />
        </div>
      </transition-group>
    </div>
    
    <!-- Calendar section -->
    <div class="mt-5 slide-up" style="animation-delay: 0.3s">
      <h2 class="mb-4">Monthly Calendar</h2>
      <div class="card shadow-sm">
        <div class="card-body">
          <p class="text-center">
            Calendar view coming soon! Subscribe to our calendar to stay updated with all church events.
          </p>
          <div class="d-grid gap-2 col-md-6 mx-auto">
            <button class="btn btn-outline-primary pulse">
              <i class="bi bi-calendar-plus me-2"></i>
              Subscribe to Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref, reactive } from 'vue'
import { useEventsStore } from '../stores/eventsStore'
import EventCard from '../components/EventCard.vue'

// Initialize the events store
const eventsStore = useEventsStore()

// Get upcoming events from the store
const upcomingEvents = computed(() => eventsStore.upcomingEvents)

// Fetch events when the component is mounted
onMounted(() => {
  eventsStore.fetchEvents()
})

// Sample data for events
const events = ref([
  {
    id: 1,
    title: 'Sunday Worship Service',
    date: new Date(2023, 8, 24, 9, 0),
    endDate: new Date(2023, 8, 24, 11, 0),
    location: 'Main Sanctuary',
    description: 'Join us for a time of worship, prayer, and teaching from God\'s Word. Children\'s ministry available for ages 0-12.',
    image: 'https://picsum.photos/id/1048/800/500', // Updated image URL
    featured: true,
    recurring: 'weekly',
    category: 'worship'
  },
  {
    id: 2,
    title: 'Bible Study Group',
    date: new Date(2023, 8, 26, 18, 30),
    endDate: new Date(2023, 8, 26, 20, 0),
    location: 'Fellowship Hall',
    description: 'Dive deeper into Scripture with our midweek Bible study. Currently studying the book of Romans.',
    image: 'https://picsum.photos/id/1059/800/500', // Updated image URL
    featured: false,
    recurring: 'weekly',
    category: 'study'
  },
  {
    id: 3,
    title: 'Youth Ministry Meeting',
    date: new Date(2023, 8, 28, 19, 0),
    endDate: new Date(2023, 8, 28, 21, 0),
    location: 'Youth Center',
    description: 'For students grades 7-12. Games, worship, teaching, and small groups designed to help teens grow in their faith.',
    image: 'https://picsum.photos/id/1071/800/500', // Updated image URL
    featured: false,
    recurring: 'weekly',
    category: 'youth'
  },
  {
    id: 4,
    title: 'Community Outreach: Food Drive',
    date: new Date(2023, 9, 7, 10, 0),
    endDate: new Date(2023, 9, 7, 14, 0),
    location: 'Church Parking Lot',
    description: 'Help us collect non-perishable food items for local families in need. Volunteers needed for sorting and distribution.',
    image: 'https://picsum.photos/id/1042/800/500', // Updated image URL
    featured: true,
    recurring: null,
    category: 'outreach'
  },
  {
    id: 5,
    title: 'Women\'s Breakfast',
    date: new Date(2023, 9, 14, 9, 0),
    endDate: new Date(2023, 9, 14, 11, 0),
    location: 'Community Room',
    description: 'Ladies, join us for breakfast, fellowship, and an encouraging message from our guest speaker, Lisa Thompson.',
    image: 'https://picsum.photos/id/1068/800/500', // Updated image URL
    featured: false,
    recurring: 'monthly',
    category: 'fellowship'
  },
  {
    id: 6,
    title: 'Men\'s Retreat',
    date: new Date(2023, 9, 20, 17, 0),
    endDate: new Date(2023, 9, 22, 12, 0),
    location: 'Mountain View Retreat Center',
    description: 'A weekend of fellowship, outdoor activities, and spiritual growth for men of all ages. Registration required by October 10.',
    image: 'https://picsum.photos/id/1067/800/500', // Updated image URL
    featured: true,
    recurring: null,
    category: 'retreat'
  }
])
</script>

<style scoped>
.events-page > * {
  animation-fill-mode: both;
}
</style> 