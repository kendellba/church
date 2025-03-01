<template>
  <div class="card h-100 event-card">
    <div class="card-img-top event-image"></div>
    <div class="card-body">
      <h5 class="card-title">{{ event.title }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">
        {{ formatDate(event.date) }} at {{ formatTime(event.date) }}
      </h6>
      <p class="card-text">{{ event.description }}</p>
      <div class="d-flex align-items-center mt-3 location-info">
        <i class="bi bi-geo-alt-fill text-primary me-2"></i>
        <span>{{ event.location }}</span>
      </div>
    </div>
    <div class="card-footer bg-transparent border-top-0">
      <button class="btn btn-outline-primary w-100 add-calendar-btn">
        <i class="bi bi-calendar-plus me-2"></i>
        Add to Calendar
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

// Format date to display in a readable format
const formatDate = (dateString) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

// Format time to display in a readable format
const formatTime = (dateString) => {
  const options = { hour: 'numeric', minute: 'numeric', hour12: true }
  return new Date(dateString).toLocaleTimeString(undefined, options)
}
</script>

<style scoped>
.event-image {
  height: 140px;
  background-color: #f0f0f0;
  background-image: url('https://source.unsplash.com/random/400x200/?church,event');
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
}

.card-title {
  font-weight: 500;
  margin-bottom: 8px;
  transition: color 0.3s ease;
}

.card-subtitle {
  font-size: 0.9rem;
  font-weight: 400;
}

.card-footer {
  padding-top: 0;
}

.event-card {
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.event-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--elevation-8);
}

.event-card:hover .event-image {
  transform: scale(1.05);
}

.event-card:hover .card-title {
  color: var(--primary);
}

.location-info {
  transition: transform 0.3s ease;
}

.event-card:hover .location-info {
  transform: translateX(5px);
}

.add-calendar-btn {
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
}

.add-calendar-btn::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(98, 0, 238, 0.3);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1, 1) translate(-50%);
  transform-origin: 50% 50%;
}

.add-calendar-btn:hover::after {
  animation: ripple 1s ease-out;
}

@keyframes ripple {
  0% {
    transform: scale(0, 0);
    opacity: 0.5;
  }
  100% {
    transform: scale(20, 20);
    opacity: 0;
  }
}
</style> 