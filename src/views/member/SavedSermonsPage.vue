<template>
  <div class="saved-sermons-page">
    <div class="row">
      <div class="col-lg-3 mb-4">
        <MemberSidebar :active-tab="'sermons'" />
      </div>
      
      <div class="col-lg-9">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="mb-0">Saved Sermons</h2>
        </div>
        
        <!-- Filters -->
        <div class="card shadow-sm mb-4 slide-up">
          <div class="card-body">
            <div class="row g-3">
              <div class="col-md-4">
                <label for="speakerFilter" class="form-label">Speaker</label>
                <select class="form-select" id="speakerFilter" v-model="filters.speaker">
                  <option value="">All Speakers</option>
                  <option v-for="speaker in speakers" :key="speaker" :value="speaker">
                    {{ speaker }}
                  </option>
                </select>
              </div>
              
              <div class="col-md-4">
                <label for="sortBy" class="form-label">Sort By</label>
                <select class="form-select" id="sortBy" v-model="filters.sortBy">
                  <option value="date-desc">Newest First</option>
                  <option value="date-asc">Oldest First</option>
                  <option value="title">Title (A-Z)</option>
                  <option value="speaker">Speaker</option>
                </select>
              </div>
              
              <div class="col-md-4">
                <label for="searchSermons" class="form-label">Search</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="searchSermons" 
                  v-model="filters.search" 
                  placeholder="Search sermons..."
                >
              </div>
            </div>
          </div>
        </div>
        
        <!-- Sermons List -->
        <div class="row row-cols-1 row-cols-md-2 g-4 mb-4">
          <div 
            v-for="sermon in filteredSermons" 
            :key="sermon.id" 
            class="col slide-up"
          >
            <div class="card h-100 sermon-card">
              <div class="sermon-thumbnail" :style="{ backgroundImage: `url(${sermon.thumbnail})` }">
                <div class="sermon-duration">{{ sermon.duration }}</div>
                <div class="sermon-overlay">
                  <a :href="sermon.videoUrl" target="_blank" class="btn btn-primary btn-sm">
                    <i class="bi bi-play-fill me-1"></i> Watch
                  </a>
                </div>
              </div>
              <div class="card-body">
                <h5 class="card-title">{{ sermon.title }}</h5>
                <p class="card-text text-muted mb-1">
                  <i class="bi bi-person me-1"></i> {{ sermon.speaker }}
                </p>
                <p class="card-text text-muted small">
                  <i class="bi bi-calendar me-1"></i> {{ formatDate(sermon.date) }}
                </p>
                <div class="sermon-tags mb-2">
                  <span 
                    v-for="tag in sermon.tags" 
                    :key="tag" 
                    class="badge bg-light text-dark me-1"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
              <div class="card-footer bg-white border-top-0">
                <div class="d-flex justify-content-between align-items-center">
                  <button 
                    class="btn btn-sm btn-outline-primary"
                    @click="toggleFavorite(sermon.id)"
                  >
                    <i 
                      class="bi me-1" 
                      :class="sermon.isFavorite ? 'bi-heart-fill text-danger' : 'bi-heart'"
                    ></i>
                    {{ sermon.isFavorite ? 'Favorited' : 'Favorite' }}
                  </button>
                  <div class="dropdown">
                    <button class="btn btn-sm btn-light" type="button" data-bs-toggle="dropdown">
                      <i class="bi bi-three-dots-vertical"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                      <li>
                        <a :href="sermon.videoUrl" target="_blank" class="dropdown-item">
                          <i class="bi bi-play-circle me-2"></i> Watch
                        </a>
                      </li>
                      <li>
                        <a :href="sermon.notesUrl" target="_blank" class="dropdown-item">
                          <i class="bi bi-file-earmark-text me-2"></i> View Notes
                        </a>
                      </li>
                      <li>
                        <button class="dropdown-item" @click="shareSermon(sermon.id)">
                          <i class="bi bi-share me-2"></i> Share
                        </button>
                      </li>
                      <li><hr class="dropdown-divider"></li>
                      <li>
                        <button class="dropdown-item text-danger" @click="removeSermon(sermon.id)">
                          <i class="bi bi-x-circle me-2"></i> Remove
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div v-if="filteredSermons.length === 0" class="col-12 text-center py-5">
            <i class="bi bi-collection-play text-muted display-4 mb-3"></i>
            <h5>No saved sermons found</h5>
            <p class="mb-0">
              {{ 
                filters.search || filters.speaker 
                  ? 'Try adjusting your filters' 
                  : 'Browse our sermons page to save your favorite messages' 
              }}
            </p>
            <router-link to="/sermons" class="btn btn-primary mt-3">
              <i class="bi bi-collection-play me-2"></i>
              Browse Sermons
            </router-link>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Share Modal -->
    <div class="modal fade" id="shareModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="shareModalLabel">Share Sermon</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Share this sermon with others:</p>
            
            <div class="input-group mb-3">
              <input type="text" class="form-control" :value="shareUrl" readonly ref="shareUrlInput">
              <button class="btn btn-outline-primary" type="button" @click="copyShareUrl">
                <i class="bi" :class="copied ? 'bi-check' : 'bi-clipboard'"></i>
              </button>
            </div>
            
            <div class="d-flex justify-content-center gap-3 mt-4">
              <a :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`" target="_blank" class="btn btn-outline-primary">
                <i class="bi bi-facebook"></i>
              </a>
              <a :href="`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent('Check out this sermon from Grace Church!')}`" target="_blank" class="btn btn-outline-primary">
                <i class="bi bi-twitter"></i>
              </a>
              <a :href="`mailto:?subject=Check out this sermon&body=${encodeURIComponent('I thought you might enjoy this sermon from Grace Church: ' + shareUrl)}`" class="btn btn-outline-primary">
                <i class="bi bi-envelope"></i>
              </a>
              <a :href="`https://api.whatsapp.com/send?text=${encodeURIComponent('Check out this sermon from Grace Church: ' + shareUrl)}`" target="_blank" class="btn btn-outline-primary">
                <i class="bi bi-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Remove Confirmation Modal -->
    <div class="modal fade" id="removeConfirmModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Remove Sermon</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to remove this sermon from your saved list?</p>
            <p class="text-muted small">This won't delete the sermon, just remove it from your saved collection.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button 
              type="button" 
              class="btn btn-danger" 
              @click="confirmRemove"
            >
              <i class="bi bi-x-circle me-2"></i>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { Modal } from 'bootstrap'
import MemberSidebar from '@/components/member/MemberSidebar.vue'

// Sample saved sermons data
const sermons = ref([
  {
    id: 1,
    title: 'Finding Peace in Troubled Times',
    speaker: 'Pastor John Smith',
    date: new Date(2023, 7, 20),
    duration: '45:12',
    thumbnail: 'https://source.unsplash.com/random/800x450/?church,sermon',
    videoUrl: '#',
    notesUrl: '#',
    tags: ['Peace', 'Faith', 'Trust'],
    isFavorite: true
  },
  {
    id: 2,
    title: 'The Power of Prayer',
    speaker: 'Pastor Sarah Johnson',
    date: new Date(2023, 7, 13),
    duration: '38:45',
    thumbnail: 'https://source.unsplash.com/random/800x450/?prayer',
    videoUrl: '#',
    notesUrl: '#',
    tags: ['Prayer', 'Spiritual Growth'],
    isFavorite: false
  },
  {
    id: 3,
    title: 'Walking in Faith',
    speaker: 'Pastor John Smith',
    date: new Date(2023, 7, 6),
    duration: '42:30',
    thumbnail: 'https://source.unsplash.com/random/800x450/?faith',
    videoUrl: '#',
    notesUrl: '#',
    tags: ['Faith', 'Discipleship'],
    isFavorite: true
  },
  {
    id: 4,
    title: 'Living with Purpose',
    speaker: 'Pastor Michael Williams',
    date: new Date(2023, 6, 30),
    duration: '40:15',
    thumbnail: 'https://source.unsplash.com/random/800x450/?purpose',
    videoUrl: '#',
    notesUrl: '#',
    tags: ['Purpose', 'Calling', 'Vision'],
    isFavorite: false
  }
])

// Filter and sort options
const filters = reactive({
  speaker: '',
  sortBy: 'date-desc',
  search: ''
})

// UI state
const removingSermonId = ref(null)
const sharingSermonId = ref(null)
const shareUrl = ref('')
const copied = ref(false)
const shareUrlInput = ref(null)
let shareModal = null
let removeModal = null

// Initialize modals
onMounted(() => {
  shareModal = new Modal(document.getElementById('shareModal'))
  removeModal = new Modal(document.getElementById('removeConfirmModal'))
})

// Get unique speakers for filter dropdown
const speakers = computed(() => {
  const speakerSet = new Set(sermons.value.map(sermon => sermon.speaker))
  return Array.from(speakerSet)
})

// Filtered and sorted sermons
const filteredSermons = computed(() => {
  let result = [...sermons.value]
  
  // Apply speaker filter
  if (filters.speaker) {
    result = result.filter(sermon => sermon.speaker === filters.speaker)
  }
  
  // Apply search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    result = result.filter(sermon => 
      sermon.title.toLowerCase().includes(searchLower) ||
      sermon.speaker.toLowerCase().includes(searchLower) ||
      sermon.tags.some(tag => tag.toLowerCase().includes(searchLower))
    )
  }
  
  // Apply sorting
  switch (filters.sortBy) {
    case 'date-asc':
      result.sort((a, b) => a.date - b.date)
      break
    case 'date-desc':
      result.sort((a, b) => b.date - a.date)
      break
    case 'title':
      result.sort((a, b) => a.title.localeCompare(b.title))
      break
    case 'speaker':
      result.sort((a, b) => a.speaker.localeCompare(b.speaker))
      break
  }
  
  return result
})

// Format date for display
const formatDate = (date) => {
  return date.toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })
}

// Toggle favorite status
const toggleFavorite = (id) => {
  const index = sermons.value.findIndex(s => s.id === id)
  if (index !== -1) {
    sermons.value[index].isFavorite = !sermons.value[index].isFavorite
  }
}

// Share sermon
const shareSermon = (id) => {
  const sermon = sermons.value.find(s => s.id === id)
  if (sermon) {
    sharingSermonId.value = id
    // In a real app, this would be a proper URL to the sermon
    shareUrl.value = `https://gracechurch.example.com/sermons/${id}`
    copied.value = false
    
    // Show modal
    shareModal.show()
  }
}

// Copy share URL to clipboard
const copyShareUrl = () => {
  if (shareUrlInput.value) {
    shareUrlInput.value.select()
    document.execCommand('copy')
    copied.value = true
    
    // Reset after 2 seconds
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}

// Remove sermon
const removeSermon = (id) => {
  removingSermonId.value = id
  removeModal.show()
}

// Confirm remove
const confirmRemove = () => {
  if (removingSermonId.value) {
    // Remove sermon from list
    sermons.value = sermons.value.filter(s => s.id !== removingSermonId.value)
    
    // Close modal
    removeModal.hide()
    removingSermonId.value = null
  }
}
</script>

<style scoped>
.saved-sermons-page {
  padding: 2rem 0;
}

.sermon-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.sermon-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.sermon-thumbnail {
  height: 180px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.sermon-duration {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
}

.sermon-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.sermon-card:hover .sermon-overlay {
  opacity: 1;
}

.sermon-tags {
  min-height: 24px;
}
</style> 