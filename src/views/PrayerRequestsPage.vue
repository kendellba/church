<template>
  <div class="prayer-requests-page">
    <h1 class="page-title slide-up">Prayer Requests</h1>
    
    <div class="row mb-5">
      <div class="col-lg-8 mx-auto text-center slide-up" style="animation-delay: 0.1s">
        <p class="lead">
          Share your prayer needs with our church family or join in praying for others.
        </p>
        <p>
          "And pray in the Spirit on all occasions with all kinds of prayers and requests. With this in mind, be alert and always keep on praying for all the Lord's people." — Ephesians 6:18
        </p>
      </div>
    </div>
    
    <div class="row mb-5">
      <div class="col-lg-6 mb-4 mb-lg-0 slide-up" style="animation-delay: 0.2s">
        <div class="card shadow-sm h-100">
          <div class="card-header bg-primary text-white">
            <h3 class="mb-0">Submit a Prayer Request</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="submitPrayerRequest">
              <div class="mb-3 form-field">
                <label for="prayerName" class="form-label">Your Name</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="prayerName" 
                  v-model="prayerRequest.name" 
                  placeholder="Enter your name"
                  required
                >
              </div>
              
              <div class="mb-3 form-field">
                <label for="prayerEmail" class="form-label">Email Address</label>
                <input 
                  type="email" 
                  class="form-control" 
                  id="prayerEmail" 
                  v-model="prayerRequest.email" 
                  placeholder="Enter your email"
                  required
                >
                <div class="form-text">We'll never share your email with anyone else.</div>
              </div>
              
              <div class="mb-3 form-field">
                <label for="prayerRequest" class="form-label">Prayer Request</label>
                <textarea 
                  class="form-control" 
                  id="prayerRequest" 
                  v-model="prayerRequest.request" 
                  rows="5" 
                  placeholder="Share your prayer request here..."
                  required
                ></textarea>
              </div>
              
              <div class="mb-3 form-check form-field">
                <input 
                  type="checkbox" 
                  class="form-check-input" 
                  id="privateRequest" 
                  v-model="prayerRequest.isPrivate"
                >
                <label class="form-check-label" for="privateRequest">
                  Keep this request private (only visible to church staff)
                </label>
              </div>
              
              <button 
                type="submit" 
                class="btn btn-primary w-100" 
                :disabled="isSubmitting"
              >
                <span v-if="isSubmitting">
                  <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Submitting...
                </span>
                <span v-else>
                  <i class="bi bi-send-fill me-2"></i>
                  Submit Prayer Request
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <div class="col-lg-6 slide-up" style="animation-delay: 0.3s">
        <div class="card shadow-sm h-100">
          <div class="card-header bg-primary text-white">
            <h3 class="mb-0">Community Prayer Wall</h3>
          </div>
          <div class="card-body p-0">
            <div class="list-group list-group-flush">
              <div 
                v-for="(prayer, index) in prayerRequests" 
                :key="prayer.id" 
                class="list-group-item prayer-item"
                :style="{'animation-delay': `${0.4 + (index * 0.1)}s`}"
              >
                <div class="d-flex justify-content-between align-items-start">
                  <div>
                    <h5 class="mb-1">{{ prayer.name }}</h5>
                    <p class="mb-1">{{ prayer.request }}</p>
                    <small class="text-muted">{{ formatDate(prayer.date) }}</small>
                  </div>
                  <button 
                    class="btn btn-sm btn-outline-primary prayer-btn"
                    @click="prayForRequest(prayer.id)"
                  >
                    <i class="bi bi-heart-fill me-1"></i>
                    Pray ({{ prayer.prayerCount }})
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Thank You Modal -->
    <div class="modal fade" id="thankYouModal" tabindex="-1" aria-labelledby="thankYouModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="thankYouModalLabel">Prayer Request Submitted</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-center">
            <i class="bi bi-check-circle-fill text-success fs-1 mb-3"></i>
            <h4>Thank You!</h4>
            <p>Your prayer request has been submitted. Our prayer team will be praying for you.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Modal } from 'bootstrap'

// Sample prayer requests data
const prayerRequests = ref([
  {
    id: 1,
    name: 'Sarah Johnson',
    request: 'Please pray for my mother who is undergoing surgery next week.',
    date: new Date(2023, 7, 28),
    prayerCount: 12
  },
  {
    id: 2,
    name: 'Michael Williams',
    request: "I'm facing a difficult decision at work. Praying for wisdom and guidance.",
    date: new Date(2023, 7, 27),
    prayerCount: 8
  },
  {
    id: 3,
    name: 'Emily Davis',
    request: 'My son is struggling in school. Please pray for his focus and confidence.',
    date: new Date(2023, 7, 26),
    prayerCount: 15
  },
  {
    id: 4,
    name: 'David Thompson',
    request: "Thankful for answered prayers! My wife's test results came back negative.",
    date: new Date(2023, 7, 25),
    prayerCount: 20
  }
])

// New prayer request form data
const prayerRequest = reactive({
  name: '',
  email: '',
  request: '',
  isPrivate: false
})

// Form submission state
const isSubmitting = ref(false)

// Format date to display in a readable format
const formatDate = (date) => {
  const options = { month: 'long', day: 'numeric', year: 'numeric' }
  return new Date(date).toLocaleDateString(undefined, options)
}

// Submit prayer request
const submitPrayerRequest = async () => {
  isSubmitting.value = true
  
  try {
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // In a real application, you would send the prayer request to your backend
    console.log('Prayer request submitted:', prayerRequest)
    
    // Reset form
    prayerRequest.name = ''
    prayerRequest.email = ''
    prayerRequest.request = ''
    prayerRequest.isPrivate = false
    
    // Show thank you modal
    const modal = new Modal(document.getElementById('thankYouModal'))
    modal.show()
    
  } catch (error) {
    console.error('Error submitting prayer request:', error)
    alert('There was an error submitting your prayer request. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

// Pray for a request
const prayForRequest = (id) => {
  const index = prayerRequests.value.findIndex(prayer => prayer.id === id)
  if (index !== -1) {
    prayerRequests.value[index].prayerCount++
  }
}
</script>

<style scoped>
.prayer-requests-page > * {
  animation-fill-mode: both;
}

.prayer-item {
  animation: fadeInUp 0.5s ease forwards;
  opacity: 0;
}

.form-field {
  transition: transform 0.3s ease, opacity 0.3s ease;
  opacity: 0.9;
}

.form-field:focus-within {
  transform: translateY(-3px);
  opacity: 1;
}

.prayer-btn {
  transition: all 0.3s ease;
}

.prayer-btn:hover {
  background-color: var(--bs-primary);
  color: white;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 