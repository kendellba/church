<template>
  <div class="sermons-page">
    <h1 class="page-title slide-up">Sermons</h1>
    
    <!-- Loading and error states -->
    <div v-if="sermonsStore.isLoading" class="text-center my-5">
      <div class="spinner-border text-primary shimmer" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2 fade-in">Loading sermons...</p>
    </div>
    
    <div v-else-if="sermonsStore.error" class="alert alert-danger slide-up" role="alert">
      {{ sermonsStore.error }}
    </div>
    
    <!-- Search and filter -->
    <div class="card shadow-sm mb-4 slide-up" style="animation-delay: 0.1s">
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-6">
            <label for="searchSermons" class="form-label">Search Sermons</label>
            <input 
              type="text" 
              class="form-control" 
              id="searchSermons" 
              v-model="searchQuery"
              placeholder="Search by title, preacher, or scripture"
            >
          </div>
          <div class="col-md-6">
            <label for="filterPreacher" class="form-label">Filter by Preacher</label>
            <select class="form-select" id="filterPreacher" v-model="selectedPreacher">
              <option value="">All Preachers</option>
              <option v-for="preacher in preachers" :key="preacher" :value="preacher">
                {{ preacher }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Sermons list -->
    <div v-if="filteredSermons.length === 0" class="text-center my-5 fade-in">
      <p class="lead">No sermons found matching your criteria.</p>
    </div>
    
    <transition-group 
      name="staggered-fade" 
      tag="div" 
      class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"
    >
      <div 
        class="col" 
        v-for="(sermon, index) in filteredSermons" 
        :key="sermon.id"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <SermonCard :sermon="sermon" />
      </div>
    </transition-group>
    
    <!-- Series section -->
    <div class="mt-5 slide-up" style="animation-delay: 0.3s">
      <h2 class="mb-4">Sermon Series</h2>
      <div class="row row-cols-1 row-cols-md-3 g-4">
        <div 
          class="col slide-up" 
          v-for="(series, index) in sermonSeries" 
          :key="series.id || index"
          :style="{ animationDelay: `${0.4 + index * 0.1}s` }"
        >
          <div class="card h-100">
            <div class="card-body">
              <h3 class="card-title">{{ series.title }}</h3>
              <p class="card-text">{{ series.description }}</p>
              <button class="btn btn-outline-primary">View Series</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useSermonsStore } from '../stores/sermonsStore'
import SermonCard from '../components/SermonCard.vue'

// Initialize the sermons store
const sermonsStore = useSermonsStore()

// Search and filter state
const searchQuery = ref('')
const selectedPreacher = ref('')

// Get all sermons from the store
const sermons = computed(() => sermonsStore.recentSermons)

// Get unique preachers for the filter dropdown
const preachers = computed(() => {
  const preacherSet = new Set(sermons.value.map(sermon => sermon.preacher))
  return [...preacherSet]
})

// Filter sermons based on search query and selected preacher
const filteredSermons = computed(() => {
  return sermons.value.filter(sermon => {
    // Filter by preacher if one is selected
    if (selectedPreacher.value && sermon.preacher !== selectedPreacher.value) {
      return false
    }
    
    // Filter by search query if one is entered
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      return (
        sermon.title.toLowerCase().includes(query) ||
        sermon.preacher.toLowerCase().includes(query) ||
        sermon.scripture.toLowerCase().includes(query) ||
        sermon.description.toLowerCase().includes(query)
      )
    }
    
    return true
  })
})

// Sample sermon series data
const sermonSeries = [
  {
    title: 'Faith That Works',
    description: 'A study of the Book of James and how faith is demonstrated through action.'
  },
  {
    title: 'Transformed',
    description: 'Exploring how God transforms our minds, relationships, and purpose.'
  },
  {
    title: 'Hope in Uncertain Times',
    description: 'Finding hope and peace in God during challenging seasons of life.'
  }
]

// Fetch sermons when the component is mounted
onMounted(() => {
  sermonsStore.fetchSermons()
})
</script>

<style scoped>
.sermons-page > * {
  animation-fill-mode: both;
}
</style> 