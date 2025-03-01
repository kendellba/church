<template>
  <div class="gallery-page">
    <div class="container py-5">
      <div class="row mb-4">
        <div class="col-md-8">
          <h1 class="display-5 mb-2">Photo Gallery</h1>
          <p class="lead text-muted">Capturing moments of worship, fellowship, and community</p>
        </div>
        <div class="col-md-4 text-md-end d-flex align-items-center justify-content-md-end mt-3 mt-md-0" v-if="isAuthenticated">
          <button class="btn btn-primary" @click="showUploadModal = true">
            <i class="bi bi-cloud-upload me-2"></i> Upload Photos
          </button>
        </div>
      </div>
      
      <!-- Gallery Albums -->
      <div class="row">
        <div v-for="gallery in galleries" :key="gallery.id" class="col-md-6 col-lg-4 mb-4">
          <div class="card gallery-card h-100 shadow-sm" @click="openGallery(gallery)">
            <div class="gallery-img-container">
              <img :src="gallery.coverImage" class="card-img-top gallery-img" :alt="gallery.title">
              <div class="gallery-overlay">
                <span class="badge bg-dark">{{ gallery.images.length }} Photos</span>
              </div>
            </div>
            <div class="card-body">
              <h5 class="card-title">{{ gallery.title }}</h5>
              <p class="card-text text-muted">{{ gallery.description }}</p>
              <small class="text-muted">
                <i class="bi bi-calendar3 me-1"></i> {{ gallery.date }}
              </small>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Gallery Modal -->
      <div class="modal fade" id="galleryModal" tabindex="-1" aria-labelledby="galleryModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="galleryModalLabel">{{ selectedGallery?.title }}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-0">
              <div id="galleryCarousel" class="carousel slide" data-bs-ride="false">
                <div class="carousel-indicators">
                  <button 
                    v-for="(image, index) in selectedGallery?.images" 
                    :key="image.id" 
                    type="button" 
                    data-bs-target="#galleryCarousel" 
                    :data-bs-slide-to="index" 
                    :class="{ active: index === 0 }" 
                    :aria-current="index === 0 ? 'true' : 'false'"
                    :aria-label="`Slide ${index + 1}`"
                  ></button>
                </div>
                <div class="carousel-inner">
                  <div 
                    v-for="(image, index) in selectedGallery?.images" 
                    :key="image.id" 
                    class="carousel-item" 
                    :class="{ active: index === 0 }"
                  >
                    <img :src="image.url" class="d-block w-100 carousel-img" :alt="image.caption">
                    <div class="carousel-caption d-none d-md-block">
                      <p>{{ image.caption }}</p>
                    </div>
                  </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#galleryCarousel" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#galleryCarousel" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Upload Modal - Only for authenticated users -->
      <div class="modal fade" id="uploadModal" tabindex="-1" aria-labelledby="uploadModalLabel" aria-hidden="true" v-if="isAuthenticated">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="uploadModalLabel">Upload Photos</h5>
              <button type="button" class="btn-close" @click="closeUploadModal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="handleUpload">
                <!-- Album Selection -->
                <div class="mb-3">
                  <label for="albumSelect" class="form-label">Select Album</label>
                  <select class="form-select" id="albumSelect" v-model="uploadForm.albumId" required>
                    <option value="" disabled selected>Choose an album</option>
                    <option v-for="gallery in galleries" :key="gallery.id" :value="gallery.id">
                      {{ gallery.title }}
                    </option>
                    <option value="new">Create New Album</option>
                  </select>
                </div>
                
                <!-- New Album Details (shown only when "Create New Album" is selected) -->
                <div v-if="uploadForm.albumId === 'new'">
                  <div class="mb-3">
                    <label for="newAlbumTitle" class="form-label">Album Title</label>
                    <input type="text" class="form-control" id="newAlbumTitle" v-model="uploadForm.newAlbumTitle" required>
                  </div>
                  <div class="mb-3">
                    <label for="newAlbumDescription" class="form-label">Album Description</label>
                    <textarea class="form-control" id="newAlbumDescription" v-model="uploadForm.newAlbumDescription" rows="2"></textarea>
                  </div>
                </div>
                
                <!-- Photo Upload -->
                <div class="mb-3">
                  <label for="photoUpload" class="form-label">Select Photos</label>
                  <input 
                    type="file" 
                    class="form-control" 
                    id="photoUpload" 
                    @change="handleFileSelect" 
                    multiple 
                    accept="image/*"
                    required
                  >
                  <div class="form-text">You can select multiple photos (max 10 at once)</div>
                </div>
                
                <!-- Preview Selected Photos -->
                <div v-if="selectedFiles.length > 0" class="mb-3">
                  <label class="form-label">Selected Photos</label>
                  <div class="row g-2">
                    <div v-for="(file, index) in selectedFiles" :key="index" class="col-4">
                      <div class="position-relative">
                        <img :src="file.preview" class="img-thumbnail" :alt="`Preview ${index + 1}`">
                        <button 
                          type="button" 
                          class="btn btn-sm btn-danger position-absolute top-0 end-0 m-1" 
                          @click="removeFile(index)"
                        >
                          <i class="bi bi-x"></i>
                        </button>
                        <input 
                          type="text" 
                          class="form-control form-control-sm mt-1" 
                          :placeholder="`Caption for photo ${index + 1}`"
                          v-model="file.caption"
                        >
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="alert alert-danger" v-if="uploadError">
                  {{ uploadError }}
                </div>
                
                <div class="d-grid gap-2">
                  <button type="submit" class="btn btn-primary" :disabled="isUploading">
                    <span v-if="isUploading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    {{ isUploading ? 'Uploading...' : 'Upload Photos' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { Modal } from 'bootstrap'

// Auth store for checking authentication status
const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)

// Sample gallery data
const galleries = ref([
  {
    id: 1,
    title: 'Sunday Worship Services',
    description: 'Moments from our weekly worship gatherings',
    coverImage: 'https://picsum.photos/id/1048/800/600',
    date: 'September 2023',
    images: [
      { id: 101, url: 'https://picsum.photos/id/1048/1200/800', caption: 'Worship team leading the congregation' },
      { id: 102, url: 'https://picsum.photos/id/1059/1200/800', caption: 'Pastor delivering the sermon' },
      { id: 103, url: 'https://picsum.photos/id/1071/1200/800', caption: 'Congregation during worship' },
      { id: 104, url: 'https://picsum.photos/id/1067/1200/800', caption: 'Prayer time' },
      { id: 105, url: 'https://picsum.photos/id/1068/1200/800', caption: 'Communion service' },
      { id: 106, url: 'https://picsum.photos/id/1042/1200/800', caption: 'Fellowship after service' }
    ]
  },
  {
    id: 2,
    title: 'Youth Camp 2023',
    description: 'Annual summer camp for our youth ministry',
    coverImage: 'https://picsum.photos/id/1071/800/600',
    date: 'July 2023',
    images: [
      { id: 201, url: 'https://picsum.photos/id/1071/1200/800', caption: 'Camp opening ceremony' },
      { id: 202, url: 'https://picsum.photos/id/1067/1200/800', caption: 'Morning devotional time' },
      { id: 203, url: 'https://picsum.photos/id/1059/1200/800', caption: 'Team building activities' },
      { id: 204, url: 'https://picsum.photos/id/1048/1200/800', caption: 'Campfire worship night' },
      { id: 205, url: 'https://picsum.photos/id/1042/1200/800', caption: 'Water sports day' },
      { id: 206, url: 'https://picsum.photos/id/1068/1200/800', caption: 'Final day group photo' }
    ]
  },
  {
    id: 3,
    title: 'Community Outreach',
    description: 'Serving our local community with love',
    coverImage: 'https://picsum.photos/id/1042/800/600',
    date: 'August 2023',
    images: [
      { id: 301, url: 'https://picsum.photos/id/1042/1200/800', caption: 'Food drive collection' },
      { id: 302, url: 'https://picsum.photos/id/1068/1200/800', caption: 'Volunteers sorting donations' },
      { id: 303, url: 'https://picsum.photos/id/1067/1200/800', caption: 'Distributing meals to families' },
      { id: 304, url: 'https://picsum.photos/id/1059/1200/800', caption: 'Home repair project' },
      { id: 305, url: 'https://picsum.photos/id/1048/1200/800', caption: 'Community garden initiative' },
      { id: 306, url: 'https://picsum.photos/id/1071/1200/800', caption: 'Back-to-school backpack giveaway' }
    ]
  },
  {
    id: 4,
    title: 'Easter Celebration',
    description: 'Celebrating the resurrection of our Lord',
    coverImage: 'https://picsum.photos/id/1068/800/600',
    date: 'April 2023',
    images: [
      { id: 401, url: 'https://picsum.photos/id/1068/1200/800', caption: 'Sunrise service' },
      { id: 402, url: 'https://picsum.photos/id/1048/1200/800', caption: 'Children\'s Easter program' },
      { id: 403, url: 'https://picsum.photos/id/1067/1200/800', caption: 'Baptism service' },
      { id: 404, url: 'https://picsum.photos/id/1059/1200/800', caption: 'Easter choir performance' },
      { id: 405, url: 'https://picsum.photos/id/1042/1200/800', caption: 'Family photo area' },
      { id: 406, url: 'https://picsum.photos/id/1071/1200/800', caption: 'Easter egg hunt for kids' }
    ]
  }
])

// State for gallery modal
const selectedGallery = ref(null)
let galleryModal = null

// State for upload modal (only for authenticated users)
const showUploadModal = ref(false)
let uploadModal = null
const isUploading = ref(false)
const uploadError = ref('')
const selectedFiles = ref([])
const uploadForm = ref({
  albumId: '',
  newAlbumTitle: '',
  newAlbumDescription: '',
})

// Initialize modals
onMounted(() => {
  galleryModal = new Modal(document.getElementById('galleryModal'))
  
  if (isAuthenticated.value) {
    uploadModal = new Modal(document.getElementById('uploadModal'))
    
    // Watch for changes to showUploadModal
    watch(showUploadModal, (newVal) => {
      if (newVal) {
        uploadModal.show()
      } else {
        uploadModal.hide()
      }
    })
    
    // Listen for modal hidden event
    document.getElementById('uploadModal').addEventListener('hidden.bs.modal', () => {
      showUploadModal.value = false
      resetUploadForm()
    })
  }
  
  // Listen for gallery modal hidden event
  document.getElementById('galleryModal').addEventListener('hidden.bs.modal', () => {
    selectedGallery.value = null
  })
})

// Open gallery modal
const openGallery = (gallery) => {
  selectedGallery.value = gallery
  galleryModal.show()
}

// Handle file selection
const handleFileSelect = (event) => {
  const files = event.target.files
  
  if (files.length > 10) {
    uploadError.value = 'You can only upload up to 10 photos at once'
    return
  }
  
  uploadError.value = ''
  
  // Create preview for each file
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    
    // Validate file type
    if (!file.type.match('image.*')) {
      uploadError.value = 'Only image files are allowed'
      continue
    }
    
    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      selectedFiles.value.push({
        file: file,
        preview: e.target.result,
        caption: ''
      })
    }
    reader.readAsDataURL(file)
  }
}

// Remove file from selection
const removeFile = (index) => {
  selectedFiles.value.splice(index, 1)
}

// Handle upload form submission
const handleUpload = async () => {
  if (selectedFiles.value.length === 0) {
    uploadError.value = 'Please select at least one photo'
    return
  }
  
  isUploading.value = true
  uploadError.value = ''
  
  try {
    // In a real app, you would upload the files to a server here
    // For this demo, we'll simulate an upload and add the photos to the gallery
    
    await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate network delay
    
    if (uploadForm.value.albumId === 'new') {
      // Create new album
      const newAlbumId = galleries.value.length + 1
      const newImages = selectedFiles.value.map((file, index) => ({
        id: newAlbumId * 1000 + index + 1,
        url: file.preview,
        caption: file.caption || `Photo ${index + 1}`
      }))
      
      const newAlbum = {
        id: newAlbumId,
        title: uploadForm.value.newAlbumTitle,
        description: uploadForm.value.newAlbumDescription || 'Photo gallery',
        coverImage: newImages[0].url,
        date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        images: newImages
      }
      
      galleries.value.unshift(newAlbum)
    } else {
      // Add to existing album
      const albumId = parseInt(uploadForm.value.albumId)
      const album = galleries.value.find(g => g.id === albumId)
      
      if (album) {
        const newImages = selectedFiles.value.map((file, index) => ({
          id: album.id * 1000 + album.images.length + index + 1,
          url: file.preview,
          caption: file.caption || `Photo ${album.images.length + index + 1}`
        }))
        
        album.images.push(...newImages)
      }
    }
    
    // Close modal and reset form
    closeUploadModal()
  } catch (error) {
    uploadError.value = 'Failed to upload photos. Please try again.'
    console.error('Upload error:', error)
  } finally {
    isUploading.value = false
  }
}

// Close upload modal
const closeUploadModal = () => {
  showUploadModal.value = false
}

// Reset upload form
const resetUploadForm = () => {
  uploadForm.value = {
    albumId: '',
    newAlbumTitle: '',
    newAlbumDescription: '',
  }
  selectedFiles.value = []
  uploadError.value = ''
}
</script>

<style scoped>
.gallery-page {
  background-color: #f8f9fa;
  min-height: 100vh;
}

.gallery-card {
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.gallery-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

.gallery-img-container {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.gallery-card:hover .gallery-img {
  transform: scale(1.05);
}

.gallery-overlay {
  position: absolute;
  bottom: 10px;
  right: 10px;
  transition: opacity 0.3s ease;
}

.carousel-img {
  height: 70vh;
  object-fit: contain;
  background-color: #000;
}

.carousel-caption {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  padding: 10px;
}

@media (max-width: 768px) {
  .gallery-img-container {
    height: 160px;
  }
  
  .carousel-img {
    height: 50vh;
  }
}
</style> 