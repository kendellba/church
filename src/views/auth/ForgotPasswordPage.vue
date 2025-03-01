<template>
  <div class="forgot-password-page">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-5">
          <div class="card shadow-lg border-0">
            <div class="card-header bg-primary text-white text-center py-4">
              <div class="d-flex justify-content-center align-items-center mb-2">
                <i class="bi bi-cloud-sun fs-1 me-2"></i>
                <h3 class="mb-0">Heaven Touching Earth</h3>
              </div>
              <p class="mb-0">Reset Your Password</p>
            </div>
            
            <div class="card-body p-4">
              <!-- Success message -->
              <div v-if="resetEmailSent" class="text-center py-4">
                <div class="mb-4">
                  <i class="bi bi-envelope-check text-success" style="font-size: 4rem;"></i>
                </div>
                <h4 class="mb-3">Check Your Email</h4>
                <p class="mb-4">
                  We've sent password reset instructions to:<br>
                  <strong>{{ email }}</strong>
                </p>
                <p class="text-muted mb-4">
                  If you don't see the email, check your spam folder or
                  <button 
                    class="btn btn-link p-0 text-decoration-none" 
                    @click="handleResetPassword"
                    :disabled="isLoading"
                  >
                    try again
                  </button>
                </p>
                <router-link to="/login" class="btn btn-primary">
                  Return to Login
                </router-link>
              </div>
              
              <!-- Reset password form -->
              <div v-else>
                <!-- Alert for errors -->
                <div v-if="message" class="alert alert-danger" role="alert">
                  {{ message }}
                </div>
                
                <p class="mb-4">
                  Enter your email address and we'll send you instructions to reset your password.
                </p>
                
                <form @submit.prevent="handleResetPassword">
                  <!-- Email -->
                  <div class="mb-4">
                    <label for="email" class="form-label">Email Address</label>
                    <div class="input-group">
                      <span class="input-group-text">
                        <i class="bi bi-envelope"></i>
                      </span>
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
                  
                  <!-- Submit button -->
                  <button 
                    type="submit" 
                    class="btn btn-primary w-100 py-2 mb-3"
                    :disabled="isLoading"
                  >
                    <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    {{ isLoading ? 'Sending...' : 'Reset Password' }}
                  </button>
                  
                  <div class="text-center">
                    <router-link to="/login" class="text-decoration-none">
                      <i class="bi bi-arrow-left me-1"></i> Back to Login
                    </router-link>
                  </div>
                </form>
              </div>
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
const resetEmailSent = ref(false)

// Handle password reset request
const handleResetPassword = async () => {
  if (!email.value) return
  
  message.value = ''
  isLoading.value = true
  
  try {
    await authStore.requestPasswordReset(email.value)
    resetEmailSent.value = true
  } catch (error) {
    message.value = error.message || 'Failed to send reset email. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.forgot-password-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
  padding: 2rem 0;
}

.card {
  border-radius: 1rem;
  overflow: hidden;
}

.card-header {
  border-bottom: none;
}

.btn-primary {
  padding: 0.75rem;
  font-weight: 500;
}

.form-control:focus,
.btn:focus {
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  border-color: #86b7fe;
}

.input-group-text {
  background-color: #f8f9fa;
}
</style> 