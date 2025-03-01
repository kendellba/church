<template>
  <div class="card h-100 sermon-card">
    <div class="card-img-top sermon-image"></div>
    <div class="card-body">
      <h5 class="card-title">{{ sermon.title }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{{ formatDate(sermon.date) }}</h6>
      <div class="d-flex align-items-center mb-2 preacher-info">
        <i class="bi bi-person-fill text-primary me-2"></i>
        <span>{{ sermon.preacher }}</span>
      </div>
      <div class="d-flex align-items-center mb-3 scripture-info">
        <i class="bi bi-book-fill text-primary me-2"></i>
        <span>{{ sermon.scripture }}</span>
      </div>
      <p class="card-text">{{ sermon.description }}</p>
    </div>
    <div class="card-footer bg-transparent border-top-0">
      <button class="btn btn-primary w-100 listen-btn">
        <i class="bi bi-play-circle me-2"></i>
        Listen to Sermon
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  sermon: {
    type: Object,
    required: true
  }
})

// Format date to display in a readable format
const formatDate = (dateString) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}
</script>

<style scoped>
.sermon-image {
  height: 140px;
  background-color: #f0f0f0;
  background-image: url('https://source.unsplash.com/random/400x200/?church,sermon,bible');
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

.sermon-card {
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.sermon-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--elevation-8);
}

.sermon-card:hover .sermon-image {
  transform: scale(1.05);
}

.sermon-card:hover .card-title {
  color: var(--primary);
}

.preacher-info, .scripture-info {
  transition: transform 0.3s ease;
}

.sermon-card:hover .preacher-info {
  transform: translateX(5px);
}

.sermon-card:hover .scripture-info {
  transform: translateX(5px);
  transition-delay: 0.05s;
}

.listen-btn {
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.listen-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transition: all 0.6s;
}

.sermon-card:hover .listen-btn::before {
  left: 100%;
}
</style> 