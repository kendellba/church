<template>
  <div class="saved-prayers-page">
    <div class="row">
      <div class="col-lg-3 mb-4">
        <MemberSidebar :active-tab="'prayers'" />
      </div>
      
      <div class="col-lg-9">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="mb-0">My Prayer Requests</h2>
          <button class="btn btn-primary" @click="showNewPrayerModal">
            <i class="bi bi-plus-circle me-2"></i>
            New Prayer Request
          </button>
        </div>
        
        <!-- Filters -->
        <div class="card shadow-sm mb-4 slide-up">
          <div class="card-body">
            <div class="row g-3">
              <div class="col-md-4">
                <label for="statusFilter" class="form-label">Status</label>
                <select class="form-select" id="statusFilter" v-model="filters.status">
                  <option value="">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="answered">Answered</option>
                </select>
              </div>
              
              <div class="col-md-4">
                <label for="sortBy" class="form-label">Sort By</label>
                <select class="form-select" id="sortBy" v-model="filters.sortBy">
                  <option value="date-desc">Newest First</option>
                  <option value="date-asc">Oldest First</option>
                  <option value="title">Title (A-Z)</option>
                </select>
              </div>
              
              <div class="col-md-4">
                <label for="searchPrayers" class="form-label">Search</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="searchPrayers" 
                  v-model="filters.search" 
                  placeholder="Search prayers..."
                >
              </div>
            </div>
          </div>
        </div>
        
        <!-- Prayer Requests List -->
        <div class="card shadow-sm mb-4 slide-up" style="animation-delay: 0.1s">
          <div class="list-group list-group-flush">
            <div 
              v-for="(prayer, index) in filteredPrayers" 
              :key="prayer.id" 
              class="list-group-item prayer-item"
              :class="{ 'answered': prayer.status === 'answered' }"
            >
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <div class="d-flex align-items-center mb-1">
                    <span 
                      class="badge me-2" 
                      :class="prayer.status === 'active' ? 'bg-primary' : 'bg-success'"
                    >
                      {{ prayer.status === 'active' ? 'Active' : 'Answered' }}
                    </span>
                    <h5 class="mb-0">{{ prayer.title }}</h5>
                  </div>
                  <p class="mb-1">{{ prayer.description }}</p>
                  <small class="text-muted">
                    <i class="bi bi-calendar me-1"></i> {{ formatDate(prayer.date) }}
                    <span v-if="prayer.prayerCount" class="ms-3">
                      <i class="bi bi-people me-1"></i> {{ prayer.prayerCount }} people praying
                    </span>
                  </small>
                </div>
                <div class="dropdown">
                  <button class="btn btn-sm btn-light" type="button" data-bs-toggle="dropdown">
                    <i class="bi bi-three-dots-vertical"></i>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end">
                    <li>
                      <button class="dropdown-item" @click="editPrayer(prayer.id)">
                        <i class="bi bi-pencil me-2"></i> Edit
                      </button>
                    </li>
                    <li>
                      <button 
                        class="dropdown-item" 
                        @click="togglePrayerStatus(prayer.id)"
                      >
                        <i 
                          class="bi me-2" 
                          :class="prayer.status === 'active' ? 'bi-check-circle' : 'bi-arrow-counterclockwise'"
                        ></i> 
                        {{ prayer.status === 'active' ? 'Mark as Answered' : 'Mark as Active' }}
                      </button>
                    </li>
                    <li><hr class="dropdown-divider"></li>
                    <li>
                      <button class="dropdown-item text-danger" @click="deletePrayer(prayer.id)">
                        <i class="bi bi-trash me-2"></i> Delete
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div v-if="filteredPrayers.length === 0" class="list-group-item text-center py-5">
              <i class="bi bi-journal-x text-muted display-4 mb-3"></i>
              <h5>No prayer requests found</h5>
              <p class="mb-0">
                {{ 
                  filters.search || filters.status 
                    ? 'Try adjusting your filters' 
                    : 'Click the "New Prayer Request" button to add one' 
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- New Prayer Request Modal -->
    <div class="modal fade" id="prayerRequestModal" tabindex="-1" aria-labelledby="prayerRequestModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="prayerRequestModalLabel">
              {{ editingPrayerId ? 'Edit Prayer Request' : 'New Prayer Request' }}
            </h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="savePrayer">
              <div class="mb-3">
                <label for="prayerTitle" class="form-label">Title</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="prayerTitle" 
                  v-model="prayerForm.title" 
                  required
                >
              </div>
              
              <div class="mb-3">
                <label for="prayerDescription" class="form-label">Description</label>
                <textarea 
                  class="form-control" 
                  id="prayerDescription" 
                  v-model="prayerForm.description" 
                  rows="5" 
                  required
                ></textarea>
              </div>
              
              <div class="mb-3">
                <label for="prayerStatus" class="form-label">Status</label>
                <select class="form-select" id="prayerStatus" v-model="prayerForm.status">
                  <option value="active">Active</option>
                  <option value="answered">Answered</option>
                </select>
              </div>
              
              <div class="mb-3 form-check">
                <input 
                  type="checkbox" 
                  class="form-check-input" 
                  id="prayerPrivate" 
                  v-model="prayerForm.isPrivate"
                >
                <label class="form-check-label" for="prayerPrivate">
                  Keep this request private (only visible to church staff)
                </label>
              </div>
              
              <div class="text-end">
                <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">Cancel</button>
                <button 
                  type="submit" 
                  class="btn btn-primary"
                  :disabled="isSubmitting"
                >
                  <span v-if="isSubmitting">
                    <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Saving...
                  </span>
                  <span v-else>
                    <i class="bi bi-save me-2"></i>
                    Save Prayer Request
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Delete Confirmation Modal -->
    <div class="modal fade" id="deleteConfirmModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title">Delete Prayer Request</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete this prayer request? This action cannot be undone.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button 
              type="button" 
              class="btn btn-danger" 
              @click="confirmDelete"
              :disabled="isDeleting"
            >
              <span v-if="isDeleting">
                <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Deleting...
              </span>
              <span v-else>
                <i class="bi bi-trash me-2"></i>
                Delete
              </span>
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

// Sample prayer requests data
const prayers = ref([
  {
    id: 1,
    title: 'Health concerns',
    description: 'Praying for my mother\'s recovery after surgery. She\'s been in the hospital for a week now.',
    date: new Date(2023, 7, 15),
    status: 'active',
    isPrivate: false,
    prayerCount: 12
  },
  {
    id: 2,
    title: 'New job opportunity',
    description: 'Seeking guidance for a potential career change. I have an interview next week.',
    date: new Date(2023, 7, 10),
    status: 'active',
    isPrivate: true
  },
  {
    id: 3,
    title: 'Family reunion',
    description: 'Praying for safe travels for all family members coming to our reunion next month.',
    date: new Date(2023, 7, 5),
    status: 'active',
    isPrivate: false,
    prayerCount: 8
  },
  {
    id: 4,
    title: 'Wisdom for decision',
    description: 'Need wisdom regarding a major life decision about relocating to a new city.',
    date: new Date(2023, 6, 28),
    status: 'answered',
    isPrivate: false,
    prayerCount: 15
  }
])

// Filter and sort options
const filters = reactive({
  status: '',
  sortBy: 'date-desc',
  search: ''
})

// Form for new/edit prayer request
const prayerForm = reactive({
  title: '',
  description: '',
  status: 'active',
  isPrivate: false
})

// UI state
const isSubmitting = ref(false)
const isDeleting = ref(false)
const editingPrayerId = ref(null)
const deletingPrayerId = ref(null)
let prayerModal = null
let deleteModal = null

// Initialize modals
onMounted(() => {
  prayerModal = new Modal(document.getElementById('prayerRequestModal'))
  deleteModal = new Modal(document.getElementById('deleteConfirmModal'))
})

// Filtered and sorted prayers
const filteredPrayers = computed(() => {
  let result = [...prayers.value]
  
  // Apply status filter
  if (filters.status) {
    result = result.filter(prayer => prayer.status === filters.status)
  }
  
  // Apply search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    result = result.filter(prayer => 
      prayer.title.toLowerCase().includes(searchLower) || 
      prayer.description.toLowerCase().includes(searchLower)
    )
  }
  
  // Apply sorting
  result.sort((a, b) => {
    if (filters.sortBy === 'date-desc') {
      return b.date - a.date
    } else if (filters.sortBy === 'date-asc') {
      return a.date - b.date
    } else if (filters.sortBy === 'title') {
      return a.title.localeCompare(b.title)
    }
    return 0
  })
  
  return result
})

// Format date for display
const formatDate = (date) => {
  return new Date(date).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
}

// Show modal for new prayer request
const showNewPrayerModal = () => {
  // Reset form
  prayerForm.title = ''
  prayerForm.description = ''
  prayerForm.status = 'active'
  prayerForm.isPrivate = false
  editingPrayerId.value = null
  
  // Show modal
  prayerModal.show()
}

// Edit existing prayer request
const editPrayer = (id) => {
  const prayer = prayers.value.find(p => p.id === id)
  if (prayer) {
    // Populate form with prayer data
    prayerForm.title = prayer.title
    prayerForm.description = prayer.description
    prayerForm.status = prayer.status
    prayerForm.isPrivate = prayer.isPrivate
    editingPrayerId.value = id
    
    // Show modal
    prayerModal.show()
  }
}

// Toggle prayer status (active/answered)
const togglePrayerStatus = (id) => {
  const index = prayers.value.findIndex(p => p.id === id)
  if (index !== -1) {
    const newStatus = prayers.value[index].status === 'active' ? 'answered' : 'active'
    prayers.value[index].status = newStatus
  }
}

// Delete prayer request
const deletePrayer = (id) => {
  deletingPrayerId.value = id
  deleteModal.show()
}

// Confirm delete
const confirmDelete = async () => {
  if (!deletingPrayerId.value) return
  
  isDeleting.value = true
  
  try {
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Remove prayer from list
    prayers.value = prayers.value.filter(p => p.id !== deletingPrayerId.value)
    
    // Close modal
    deleteModal.hide()
  } catch (error) {
    console.error('Error deleting prayer:', error)
  } finally {
    isDeleting.value = false
    deletingPrayerId.value = null
  }
}

// Save prayer request (create or update)
const savePrayer = async () => {
  isSubmitting.value = true
  
  try {
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    if (editingPrayerId.value) {
      // Update existing prayer
      const index = prayers.value.findIndex(p => p.id === editingPrayerId.value)
      if (index !== -1) {
        prayers.value[index] = {
          ...prayers.value[index],
          title: prayerForm.title,
          description: prayerForm.description,
          status: prayerForm.status,
          isPrivate: prayerForm.isPrivate
        }
      }
    } else {
      // Create new prayer
      const newId = Math.max(0, ...prayers.value.map(p => p.id)) + 1
      prayers.value.push({
        id: newId,
        title: prayerForm.title,
        description: prayerForm.description,
        status: prayerForm.status,
        isPrivate: prayerForm.isPrivate,
        date: new Date(),
        prayerCount: 0
      })
    }
    
    // Close modal
    prayerModal.hide()
  } catch (error) {
    console.error('Error saving prayer:', error)
    alert('There was an error saving your prayer request. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.saved-prayers-page {
  padding: 2rem 0;
}

.prayer-item {
  transition: background-color 0.3s ease;
}

.prayer-item:hover {
  background-color: rgba(0, 0, 0, 0.01);
}

.prayer-item.answered {
  background-color: rgba(25, 135, 84, 0.05);
}

.prayer-item.answered:hover {
  background-color: rgba(25, 135, 84, 0.08);
}
</style> 