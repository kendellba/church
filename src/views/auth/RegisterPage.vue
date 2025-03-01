<template>
  <div class="register-page">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div class="card shadow-lg border-0">
            <div class="card-header bg-primary text-white text-center py-4">
              <div class="d-flex justify-content-center align-items-center mb-2">
                <i class="bi bi-cloud-sun fs-1 me-2"></i>
                <h3 class="mb-0">Heaven Touching Earth</h3>
              </div>
              <p class="mb-0">Create a new account</p>
            </div>
            
            <div class="card-body p-4">
              <!-- Alert for errors or success messages -->
              <div v-if="message" class="alert" :class="messageType" role="alert">
                {{ message }}
              </div>
              
              <form @submit.prevent="handleRegister">
                <!-- Name fields -->
                <div class="row mb-3">
                  <div class="col-md-6 mb-3 mb-md-0">
                    <label for="firstName" class="form-label">First Name</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      id="firstName" 
                      v-model="formData.firstName" 
                      placeholder="Enter your first name"
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
                      placeholder="Enter your last name"
                      required
                    >
                  </div>
                </div>
                
                <!-- Email -->
                <div class="mb-3">
                  <label for="email" class="form-label">Email Address</label>
                  <div class="input-group">
                    <span class="input-group-text">
                      <i class="bi bi-envelope"></i>
                    </span>
                    <input 
                      type="email" 
                      class="form-control" 
                      id="email" 
                      v-model="formData.email" 
                      placeholder="Enter your email"
                      required
                    >
                  </div>
                </div>
                
                <!-- Password -->
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <div class="input-group">
                    <span class="input-group-text">
                      <i class="bi bi-lock"></i>
                    </span>
                    <input 
                      :type="showPassword ? 'text' : 'password'" 
                      class="form-control" 
                      id="password" 
                      v-model="formData.password" 
                      placeholder="Create a password"
                      required
                    >
                    <button 
                      class="btn btn-outline-secondary" 
                      type="button"
                      @click="togglePasswordVisibility"
                    >
                      <i class="bi" :class="showPassword ? 'bi-eye-slash' : 'bi-eye'"></i>
                    </button>
                  </div>
                  <div class="form-text">
                    Password must be at least 8 characters long and include a mix of letters, numbers, and symbols.
                  </div>
                </div>
                
                <!-- Confirm Password -->
                <div class="mb-3">
                  <label for="confirmPassword" class="form-label">Confirm Password</label>
                  <div class="input-group">
                    <span class="input-group-text">
                      <i class="bi bi-lock-fill"></i>
                    </span>
                    <input 
                      :type="showPassword ? 'text' : 'password'" 
                      class="form-control" 
                      id="confirmPassword" 
                      v-model="formData.confirmPassword" 
                      placeholder="Confirm your password"
                      required
                    >
                  </div>
                </div>
                
                <!-- Terms and conditions -->
                <div class="mb-4">
                  <div class="form-check">
                    <input 
                      type="checkbox" 
                      class="form-check-input" 
                      id="agreeTerms" 
                      v-model="formData.agreeTerms"
                      required
                    >
                    <label class="form-check-label" for="agreeTerms">
                      I agree to the <a href="#" class="text-primary">Terms of Service</a> and <a href="#" class="text-primary">Privacy Policy</a>
                    </label>
                  </div>
                </div>
                
                <!-- Submit button -->
                <button 
                  type="submit" 
                  class="btn btn-primary w-100 py-2"
                  :disabled="isLoading || !formData.agreeTerms"
                >
                  <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  {{ isLoading ? 'Creating Account...' : 'Create Account' }}
                </button>
              </form>
            </div>
            
            <div class="card-footer bg-light text-center py-3">
              <p class="mb-0">
                Already have an account? 
                <router-link to="/login" class="text-primary">Sign in</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

// Form data
const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false
})

// UI state
const showPassword = ref(false)
const isLoading = ref(false)
const message = ref('')
const messageType = ref('alert-danger')

// Toggle password visibility
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

// Handle registration form submission
const handleRegister = async () => {
  message.value = ''
  
  // Validate passwords match
  if (formData.password !== formData.confirmPassword) {
    message.value = 'Passwords do not match'
    messageType.value = 'alert-danger'
    return
  }
  
  isLoading.value = true
  
  try {
    await authStore.register({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password
    })
    
    // Show success message
    message.value = 'Account created successfully! Redirecting to login...'
    messageType.value = 'alert-success'
    
    // Redirect to login page after a short delay
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } catch (error) {
    message.value = error.message || 'Failed to create account. Please try again.'
    messageType.value = 'alert-danger'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.register-page {
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

.card-footer {
  border-top: none;
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