<template>
  <div class="forgot-password-page">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-5">
        <div class="card shadow-sm border-0 slide-up">
          <div class="card-header bg-primary text-white text-center py-4">
            <h2 class="mb-0">Reset Password</h2>
          </div>
          <div class="card-body p-4 p-md-5">
            <div class="text-center mb-4">
              <i class="bi bi-key-fill display-4 text-primary"></i>
              <p class="mt-3 mb-0">Enter your email to reset your password</p>
            </div>
            
            <div v-if="message" class="alert" :class="messageType" role="alert">
              {{ message }}
            </div>
            
            <form @submit.prevent="handleResetRequest" v-if="!resetRequestSent">
              <div class="mb-4">
                <label for="email" class="form-label">Email Address</label>
                <div class="input-group">
                  <span class="input-group-text"><i class="bi bi-envelope"></i></span>
                  <input 
                    type="email" 
                    class="form-control" 
                    id="email" 
                    v-model="email" 
                    placeholder="Enter your email"
                    required
                  >
                </div>
              </div>
              
              <button 
                type="submit" 
                class="btn btn-primary w-100 py-2 mb-4"
                :disabled="isLoading"
              >
                <span v-if="isLoading">
                  <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Sending...
                </span>
                <span v-else>
                  <i class="bi bi-send me-2"></i>
                  Send Reset Link
                </span>
              </button>
              
              <div class="text-center">
                <p>Remember your password? <router-link to="/login" class="text-decoration-none">Back to Login</router-link></p>
              </div>
            </form>
            
            <div v-else class="text-center">
              <p>A password reset link has been sent to your email address. Please check your inbox and follow the instructions to reset your password.</p>
              <router-link to="/login" class="btn btn-outline-primary mt-3">
                <i class="bi bi-arrow-left me-2"></i>
                Back to Login
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

// Form data
const email = ref('')

// UI state
const isLoading = ref(false)
const message = ref('')
const messageType = ref('alert-info')
const resetRequestSent = ref(false)

// Handle password reset request
const handleResetRequest = async () => {
  isLoading.value = true
  message.value = ''
  
  try {
    // In a real app, this would send a password reset email
    await authStore.requestPasswordReset(email.value)
    
    // Show success message
    message.value = 'Password reset instructions have been sent to your email.'
    messageType.value = 'alert-success'
    resetRequestSent.value = true
  } catch (error) {
    message.value = error.message || 'Failed to send reset link. Please try again.'
    messageType.value = 'alert-danger'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.forgot-password-page {
  min-height: 80vh;
  display: flex;
  align-items: center;
  padding: 2rem 0;
}

.card {
  border-radius: 10px;
  overflow: hidden;
}

.card-header {
  border-bottom: none;
}

.input-group-text {
  background-color: transparent;
}
</style> 