<template>
  <div class="profile-page">
    <div class="row">
      <div class="col-lg-3 mb-4">
        <MemberSidebar :active-tab="'profile'" />
      </div>
      
      <div class="col-lg-9">
        <div class="card shadow-sm mb-4 slide-up">
          <div class="card-header bg-white">
            <h2 class="mb-0">Profile Settings</h2>
          </div>
          <div class="card-body">
            <div v-if="message" class="alert" :class="messageType" role="alert">
              {{ message }}
            </div>
            
            <form @submit.prevent="saveProfile">
              <!-- Profile Image -->
              <div class="text-center mb-4">
                <div class="avatar-container mx-auto mb-3">
                  <img 
                    :src="profileImage || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(formData.firstName + ' ' + formData.lastName) + '&background=0D6EFD&color=fff'" 
                    alt="Profile" 
                    class="avatar-img"
                  >
                  <div class="avatar-overlay">
                    <label for="profileImageInput" class="btn btn-sm btn-light">
                      <i class="bi bi-camera"></i>
                    </label>
                  </div>
                </div>
                <input 
                  type="file" 
                  id="profileImageInput" 
                  class="d-none" 
                  accept="image/*"
                  @change="handleImageUpload"
                >
                <button 
                  v-if="profileImage" 
                  type="button" 
                  class="btn btn-sm btn-outline-danger"
                  @click="removeProfileImage"
                >
                  Remove Photo
                </button>
              </div>
              
              <div class="row mb-3">
                <div class="col-md-6 mb-3 mb-md-0">
                  <label for="firstName" class="form-label">First Name</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="firstName" 
                    v-model="formData.firstName" 
                    required
                  >
                </div>
                <div class="col-md-6">
                  <label for="lastName" class="form-label">Last Name</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="lastName" 
                    v-model="formData.lastName" 
                    required
                  >
                </div>
              </div>
              
              <div class="mb-3">
                <label for="email" class="form-label">Email Address</label>
                <input 
                  type="email" 
                  class="form-control" 
                  id="email" 
                  v-model="formData.email" 
                  required
                >
              </div>
              
              <div class="mb-3">
                <label for="phone" class="form-label">Phone Number</label>
                <input 
                  type="tel" 
                  class="form-control" 
                  id="phone" 
                  v-model="formData.phone"
                >
              </div>
              
              <hr class="my-4">
              
              <h5>Change Password</h5>
              <p class="text-muted small mb-3">Leave blank if you don't want to change your password</p>
              
              <div class="mb-3">
                <label for="currentPassword" class="form-label">Current Password</label>
                <input 
                  type="password" 
                  class="form-control" 
                  id="currentPassword" 
                  v-model="passwordData.currentPassword"
                >
              </div>
              
              <div class="row mb-3">
                <div class="col-md-6 mb-3 mb-md-0">
                  <label for="newPassword" class="form-label">New Password</label>
                  <input 
                    type="password" 
                    class="form-control" 
                    id="newPassword" 
                    v-model="passwordData.newPassword"
                  >
                </div>
                <div class="col-md-6">
                  <label for="confirmPassword" class="form-label">Confirm New Password</label>
                  <input 
                    type="password" 
                    class="form-control" 
                    id="confirmPassword" 
                    v-model="passwordData.confirmPassword"
                  >
                </div>
              </div>
              
              <hr class="my-4">
              
              <h5>Notification Preferences</h5>
              
              <div class="mb-3 form-check">
                <input 
                  type="checkbox" 
                  class="form-check-input" 
                  id="emailNotifications" 
                  v-model="formData.preferences.emailNotifications"
                >
                <label class="form-check-label" for="emailNotifications">
                  Receive email notifications
                </label>
              </div>
              
              <div class="mb-3 form-check">
                <input 
                  type="checkbox" 
                  class="form-check-input" 
                  id="prayerUpdates" 
                  v-model="formData.preferences.prayerUpdates"
                >
                <label class="form-check-label" for="prayerUpdates">
                  Receive prayer request updates
                </label>
              </div>
              
              <div class="mb-3 form-check">
                <input 
                  type="checkbox" 
                  class="form-check-input" 
                  id="eventReminders" 
                  v-model="formData.preferences.eventReminders"
                >
                <label class="form-check-label" for="eventReminders">
                  Receive event reminders
                </label>
              </div>
              
              <div class="mb-3 form-check">
                <input 
                  type="checkbox" 
                  class="form-check-input" 
                  id="newsletterSubscription" 
                  v-model="formData.preferences.newsletterSubscription"
                >
                <label class="form-check-label" for="newsletterSubscription">
                  Subscribe to church newsletter
                </label>
              </div>
              
              <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                <button 
                  type="button" 
                  class="btn btn-outline-secondary"
                  @click="resetForm"
                >
                  Cancel
                </button>
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
                    Save Changes
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import MemberSidebar from '@/components/member/MemberSidebar.vue'

const authStore = useAuthStore()

// Form data
const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  preferences: {
    emailNotifications: true,
    prayerUpdates: true,
    eventReminders: true,
    newsletterSubscription: true
  }
})

// Password change data
const passwordData = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// UI state
const profileImage = ref(null)
const isSubmitting = ref(false)
const message = ref('')
const messageType = ref('alert-success')

// Initialize form with user data
onMounted(() => {
  if (authStore.user) {
    formData.firstName = authStore.user.firstName || ''
    formData.lastName = authStore.user.lastName || ''
    formData.email = authStore.user.email || ''
    formData.phone = authStore.user.phone || ''
    
    // In a real app, these would come from the user profile
    formData.preferences = {
      emailNotifications: true,
      prayerUpdates: true,
      eventReminders: true,
      newsletterSubscription: true
    }
  }
})

// Handle profile image upload
const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      profileImage.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

// Remove profile image
const removeProfileImage = () => {
  profileImage.value = null
}

// Reset form to original values
const resetForm = () => {
  if (authStore.user) {
    formData.firstName = authStore.user.firstName || ''
    formData.lastName = authStore.user.lastName || ''
    formData.email = authStore.user.email || ''
    formData.phone = authStore.user.phone || ''
  }
  
  passwordData.currentPassword = ''
  passwordData.newPassword = ''
  passwordData.confirmPassword = ''
  
  message.value = ''
}

// Save profile changes
const saveProfile = async () => {
  // Validate password if trying to change it
  if (passwordData.newPassword || passwordData.confirmPassword || passwordData.currentPassword) {
    if (!passwordData.currentPassword) {
      message.value = 'Please enter your current password to change your password'
      messageType.value = 'alert-danger'
      return
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      message.value = 'New passwords do not match'
      messageType.value = 'alert-danger'
      return
    }
  }
  
  isSubmitting.value = true
  message.value = ''
  
  try {
    // In a real app, this would update the user profile via API
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Update user in auth store
    await authStore.updateProfile({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone
    })
    
    // Clear password fields
    passwordData.currentPassword = ''
    passwordData.newPassword = ''
    passwordData.confirmPassword = ''
    
    // Show success message
    message.value = 'Profile updated successfully'
    messageType.value = 'alert-success'
  } catch (error) {
    message.value = error.message || 'Failed to update profile'
    messageType.value = 'alert-danger'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.profile-page {
  padding: 2rem 0;
}

.avatar-container {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  border: 3px solid var(--bs-primary);
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 8px 0;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.avatar-container:hover .avatar-overlay {
  opacity: 1;
}
</style> 