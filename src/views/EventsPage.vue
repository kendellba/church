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
import { onMounted, computed } from 'vue'
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
</script>

<style scoped>
.events-page > * {
  animation-fill-mode: both;
}
</style> 