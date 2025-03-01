<template>
  <div class="gallery-page">
    <h1 class="page-title slide-up">Photo Gallery</h1>
    
    <div class="row mb-5">
      <div class="col-lg-8 mx-auto text-center slide-up" style="animation-delay: 0.1s">
        <p class="lead">
          Explore moments from our church community, events, and ministries.
        </p>
      </div>
    </div>
    
    <!-- Gallery Categories -->
    <div class="mb-4 slide-up" style="animation-delay: 0.2s">
      <div class="d-flex flex-wrap justify-content-center gap-2">
        <button 
          class="btn btn-outline-primary category-btn" 
          :class="{ active: selectedCategory === 'all' }"
          @click="selectedCategory = 'all'"
        >
          All Photos
        </button>
        <button 
          v-for="category in categories" 
          :key="category.id"
          class="btn btn-outline-primary category-btn" 
          :class="{ active: selectedCategory === category.id }"
          @click="selectedCategory = category.id"
        >
          {{ category.name }}
        </button>
      </div>
    </div>
    
    <!-- Gallery Grid -->
    <div class="row g-4 mb-5">
      <div 
        v-for="(photo, index) in filteredPhotos" 
        :key="photo.id" 
        class="col-6 col-md-4 col-lg-3 gallery-item slide-up"
        :style="{'animation-delay': `${0.3 + (index * 0.05)}s`}"
      >
        <div class="card gallery-card h-100" @click="openLightbox(photo.id)">
          <div class="gallery-img-container">
            <img :src="photo.thumbnail" class="gallery-img" :alt="photo.title">
            <div class="gallery-overlay">
              <i class="bi bi-zoom-in"></i>
            </div>
          </div>
          <div class="card-body">
            <h6 class="card-title">{{ photo.title }}</h6>
            <p class="card-text small text-muted">{{ formatDate(photo.date) }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Load More Button -->
    <div class="text-center mb-5 slide-up" style="animation-delay: 0.8s" v-if="hasMorePhotos">
      <button class="btn btn-primary" @click="loadMorePhotos" :disabled="isLoading">
        <span v-if="isLoading">
          <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Loading...
        </span>
        <span v-else>
          <i class="bi bi-plus-circle me-2"></i>
          Load More Photos
        </span>
      </button>
    </div>
    
    <!-- Lightbox Modal -->
    <div class="modal fade" id="lightboxModal" tabindex="-1" aria-labelledby="lightboxModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content" v-if="currentPhoto">
          <div class="modal-header">
            <h5 class="modal-title" id="lightboxModalLabel">{{ currentPhoto.title }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body p-0">
            <div class="lightbox-container">
              <img :src="currentPhoto.fullsize" class="lightbox-img" :alt="currentPhoto.title">
            </div>
            <div class="p-3">
              <p class="mb-1">{{ currentPhoto.description }}</p>
              <p class="text-muted small mb-0">{{ formatDate(currentPhoto.date) }}</p>
            </div>
          </div>
          <div class="modal-footer">
            <button 
              type="button" 
              class="btn btn-outline-primary" 
              @click="navigatePhoto('prev')"
              :disabled="!hasPrevPhoto"
            >
              <i class="bi bi-arrow-left me-1"></i> Previous
            </button>
            <button 
              type="button" 
              class="btn btn-outline-primary" 
              @click="navigatePhoto('next')"
              :disabled="!hasNextPhoto"
            >
              Next <i class="bi bi-arrow-right ms-1"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Upload Photo Modal -->
    <div class="modal fade" id="uploadPhotoModal" tabindex="-1" aria-labelledby="uploadPhotoModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="uploadPhotoModalLabel">Share Your Photos</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitPhoto">
              <div class="mb-3">
                <label for="photoTitle" class="form-label">Photo Title</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="photoTitle" 
                  v-model="newPhoto.title" 
                  required
                >
              </div>
              
              <div class="mb-3">
                <label for="photoCategory" class="form-label">Category</label>
                <select 
                  class="form-select" 
                  id="photoCategory" 
                  v-model="newPhoto.category"
                  required
                >
                  <option value="" disabled>Select a category</option>
                  <option 
                    v-for="category in categories" 
                    :key="category.id" 
                    :value="category.id"
                  >
                    {{ category.name }}
                  </option>
                </select>
              </div>
              
              <div class="mb-3">
                <label for="photoDescription" class="form-label">Description</label>
                <textarea 
                  class="form-control" 
                  id="photoDescription" 
                  v-model="newPhoto.description" 
                  rows="3"
                ></textarea>
              </div>
              
              <div class="mb-3">
                <label for="photoFile" class="form-label">Upload Photo</label>
                <input 
                  type="file" 
                  class="form-control" 
                  id="photoFile" 
                  accept="image/*"
                  required
                >
                <div class="form-text">Maximum file size: 5MB. Supported formats: JPG, PNG, GIF.</div>
              </div>
              
              <div class="mb-3 form-check">
                <input 
                  type="checkbox" 
                  class="form-check-input" 
                  id="photoConsent" 
                  v-model="newPhoto.consent"
                  required
                >
                <label class="form-check-label" for="photoConsent">
                  I confirm I have permission to share this photo and consent to it being displayed in the church gallery.
                </label>
              </div>
              
              <button 
                type="submit" 
                class="btn btn-primary w-100" 
                :disabled="isSubmitting"
              >
                <span v-if="isSubmitting">
                  <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Uploading...
                </span>
                <span v-else>
                  <i class="bi bi-cloud-upload-fill me-2"></i>
                  Upload Photo
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Floating Action Button -->
    <button class="btn btn-primary btn-lg floating-btn" @click="showUploadModal">
      <i class="bi bi-camera-fill"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Modal } from 'bootstrap'

// Gallery categories
const categories = [
  { id: 'worship', name: 'Worship Services' },
  { id: 'events', name: 'Special Events' },
  { id: 'youth', name: 'Youth Ministry' },
  { id: 'outreach', name: 'Community Outreach' },
  { id: 'building', name: 'Church Campus' }
]

// Selected category filter
const selectedCategory = ref('all')

// Loading state
const isLoading = ref(false)
const isSubmitting = ref(false)

// Pagination
const page = ref(1)
const perPage = 12
const hasMorePhotos = ref(true)

// Current photo for lightbox
const currentPhotoId = ref(null)

// New photo form data
const newPhoto = ref({
  title: '',
  category: '',
  description: '',
  consent: false
})

// Sample gallery photos data
const allPhotos = ref([
  {
    id: 1,
    title: 'Sunday Worship Service',
    description: 'Our congregation during Sunday morning worship.',
    category: 'worship',
    date: new Date(2023, 7, 27),
    thumbnail: 'https://source.unsplash.com/random/400x300/?church,worship',
    fullsize: 'https://source.unsplash.com/random/1200x900/?church,worship'
  },
  {
    id: 2,
    title: 'Youth Summer Camp',
    description: 'Our youth group had an amazing time at Camp Wildwood this summer!',
    category: 'youth',
    date: new Date(2023, 6, 15),
    thumbnail: 'https://source.unsplash.com/random/400x300/?youth,camp',
    fullsize: 'https://source.unsplash.com/random/1200x900/?youth,camp'
  },
  {
    id: 3,
    title: 'Easter Celebration',
    description: 'Easter Sunday service celebrating the resurrection of Jesus Christ.',
    category: 'events',
    date: new Date(2023, 3, 9),
    thumbnail: 'https://source.unsplash.com/random/400x300/?easter,church',
    fullsize: 'https://source.unsplash.com/random/1200x900/?easter,church'
  },
  {
    id: 4,
    title: 'Food Drive',
    description: 'Our community outreach team organized a food drive for the local food bank.',
    category: 'outreach',
    date: new Date(2023, 5, 22),
    thumbnail: 'https://source.unsplash.com/random/400x300/?food,drive,charity',
    fullsize: 'https://source.unsplash.com/random/1200x900/?food,drive,charity'
  },
  {
    id: 5,
    title: 'Church Sanctuary',
    description: 'Our beautiful sanctuary where we gather for worship.',
    category: 'building',
    date: new Date(2023, 2, 14),
    thumbnail: 'https://source.unsplash.com/random/400x300/?church,sanctuary',
    fullsize: 'https://source.unsplash.com/random/1200x900/?church,sanctuary'
  },
  {
    id: 6,
    title: 'Baptism Sunday',
    description: 'Celebrating new believers joining our faith through baptism.',
    category: 'worship',
    date: new Date(2023, 4, 7),
    thumbnail: 'https://source.unsplash.com/random/400x300/?baptism',
    fullsize: 'https://source.unsplash.com/random/1200x900/?baptism'
  },
  {
    id: 7,
    title: 'Christmas Concert',
    description: 'Our annual Christmas concert featuring the church choir and orchestra.',
    category: 'events',
    date: new Date(2022, 11, 18),
    thumbnail: 'https://source.unsplash.com/random/400x300/?christmas,concert',
    fullsize: 'https://source.unsplash.com/random/1200x900/?christmas,concert'
  },
  {
    id: 8,
    title: 'Youth Game Night',
    description: 'Our youth enjoying games and fellowship on Friday night.',
    category: 'youth',
    date: new Date(2023, 7, 11),
    thumbnail: 'https://source.unsplash.com/random/400x300/?youth,games',
    fullsize: 'https://source.unsplash.com/random/1200x900/?youth,games'
  },
  {
    id: 9,
    title: 'Community Garden Project',
    description: 'Church members working together on our community garden project.',
    category: 'outreach',
    date: new Date(2023, 4, 29),
    thumbnail: 'https://source.unsplash.com/random/400x300/?garden,community',
    fullsize: 'https://source.unsplash.com/random/1200x900/?garden,community'
  },
  {
    id: 10,
    title: 'Fellowship Hall',
    description: 'Our newly renovated fellowship hall where we gather for meals and events.',
    category: 'building',
    date: new Date(2023, 1, 5),
    thumbnail: 'https://source.unsplash.com/random/400x300/?hall,church',
    fullsize: 'https://source.unsplash.com/random/1200x900/?hall,church'
  },
  {
    id: 11,
    title: 'Worship Team Practice',
    description: 'Our dedicated worship team preparing for Sunday service.',
    category: 'worship',
    date: new Date(2023, 7, 24),
    thumbnail: 'https://source.unsplash.com/random/400x300/?worship,team,music',
    fullsize: 'https://source.unsplash.com/random/1200x900/?worship,team,music'
  },
  {
    id: 12,
    title: 'Vacation Bible School',
    description: 'Children enjoying activities during our summer Vacation Bible School.',
    category: 'youth',
    date: new Date(2023, 6, 10),
    thumbnail: 'https://source.unsplash.com/random/400x300/?bible,school,children',
    fullsize: 'https://source.unsplash.com/random/1200x900/?bible,school,children'
  }
])

// Filtered photos based on selected category and pagination
const filteredPhotos = computed(() => {
  let filtered = allPhotos.value
  
  // Filter by category
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(photo => photo.category === selectedCategory.value)
  }
  
  // Sort by date (newest first)
  filtered = [...filtered].sort((a, b) => b.date - a.date)
  
  // Apply pagination
  return filtered.slice(0, page.value * perPage)
})

// Current photo for lightbox
const currentPhoto = computed(() => {
  if (!currentPhotoId.value) return null
  return allPhotos.value.find(photo => photo.id === currentPhotoId.value)
})

// Navigation for lightbox
const currentPhotoIndex = computed(() => {
  if (!currentPhotoId.value) return -1
  return filteredPhotos.value.findIndex(photo => photo.id === currentPhotoId.value)
})

const hasNextPhoto = computed(() => {
  return currentPhotoIndex.value < filteredPhotos.value.length - 1
})

const hasPrevPhoto = computed(() => {
  return currentPhotoIndex.value > 0
})

// Format date to display in a readable format
const formatDate = (date) => {
  const options = { month: 'long', day: 'numeric', year: 'numeric' }
  return new Date(date).toLocaleDateString(undefined, options)
}

// Load more photos
const loadMorePhotos = async () => {
  isLoading.value = true
  
  try {
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Increment page
    page.value++
    
    // Check if there are more photos to load
    const totalFilteredPhotos = selectedCategory.value === 'all' 
      ? allPhotos.value.length 
      : allPhotos.value.filter(photo => photo.category === selectedCategory.value).length
    
    hasMorePhotos.value = page.value * perPage < totalFilteredPhotos
    
  } catch (error) {
    console.error('Error loading more photos:', error)
  } finally {
    isLoading.value = false
  }
}

// Open lightbox modal
const openLightbox = (photoId) => {
  currentPhotoId.value = photoId
  const modal = new Modal(document.getElementById('lightboxModal'))
  modal.show()
}

// Navigate to next/previous photo in lightbox
const navigatePhoto = (direction) => {
  const index = currentPhotoIndex.value
  
  if (direction === 'next' && hasNextPhoto.value) {
    currentPhotoId.value = filteredPhotos.value[index + 1].id
  } else if (direction === 'prev' && hasPrevPhoto.value) {
    currentPhotoId.value = filteredPhotos.value[index - 1].id
  }
}

// Show upload photo modal
const showUploadModal = () => {
  const modal = new Modal(document.getElementById('uploadPhotoModal'))
  modal.show()
}

// Submit new photo
const submitPhoto = async () => {
  isSubmitting.value = true
  
  try {
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // In a real application, you would upload the photo and send the form data to your backend
    console.log('Photo submitted:', newPhoto.value)
    
    // Reset form
    newPhoto.value = {
      title: '',
      category: '',
      description: '',
      consent: false
    }
    
    // Close the modal
    const modal = Modal.getInstance(document.getElementById('uploadPhotoModal'))
    modal.hide()
    
    // Show success message
    alert('Thank you for sharing your photo! It will be reviewed and added to the gallery soon.')
    
  } catch (error) {
    console.error('Error submitting photo:', error)
    alert('There was an error uploading your photo. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.gallery-page > * {
  animation-fill-mode: both;
}

.category-btn {
  transition: all 0.3s ease;
  border-radius: 20px;
  padding: 0.375rem 1rem;
}

.category-btn.active {
  background-color: var(--bs-primary);
  color: white;
}

.gallery-card {
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  border-radius: 8px;
}

.gallery-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.gallery-img-container {
  position: relative;
  overflow: hidden;
  height: 200px;
}

.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.gallery-card:hover .gallery-img {
  transform: scale(1.1);
}

.gallery-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-overlay i {
  color: white;
  font-size: 2rem;
}

.gallery-card:hover .gallery-overlay {
  opacity: 1;
}

.lightbox-container {
  display: flex;
  justify-content: center;
  background-color: #000;
}

.lightbox-img {
  max-height: 80vh;
  max-width: 100%;
  object-fit: contain;
}

.floating-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.floating-btn i {
  font-size: 1.5rem;
}

.floating-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

@media (max-width: 767.98px) {
  .gallery-img-container {
    height: 150px;
  }
}
</style> 