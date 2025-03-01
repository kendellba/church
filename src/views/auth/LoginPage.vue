<template>
  <div class="login-page">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div class="card shadow-lg border-0">
            <div class="card-header bg-primary text-white text-center py-4">
              <div class="d-flex justify-content-center align-items-center mb-2">
                <i class="bi bi-cloud-sun fs-1 me-2"></i>
                <h3 class="mb-0">Heaven Touching Earth</h3>
              </div>
              <p class="mb-0">Sign in to your account</p>
            </div>
            
            <div class="card-body p-4">
              <!-- Alert for errors or success messages -->
              <div v-if="message" class="alert" :class="messageType" role="alert">
                {{ message }}
              </div>
              
              <form @submit.prevent="handleLogin">
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
                      v-model="email" 
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
                      v-model="password" 
                      placeholder="Enter your password"
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
                </div>
                
                <!-- Remember me & Forgot password -->
                <div class="d-flex justify-content-between align-items-center mb-4">
                  <div class="form-check">
                    <input 
                      type="checkbox" 
                      class="form-check-input" 
                      id="rememberMe" 
                      v-model="rememberMe"
                    >
                    <label class="form-check-label" for="rememberMe">Remember me</label>
                  </div>
                  <router-link to="/forgot-password" class="text-primary">Forgot password?</router-link>
                </div>
                
                <!-- Submit button -->
                <button 
                  type="submit" 
                  class="btn btn-primary w-100 py-2"
                  :disabled="isLoading"
                >
                  <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  {{ isLoading ? 'Signing in...' : 'Sign In' }}
                </button>
              </form>
              
              <!-- Social login options -->
              <div class="text-center mt-4">
                <p class="text-muted mb-3">Or sign in with</p>
                <div class="d-flex justify-content-center gap-2">
                  <button class="btn btn-outline-secondary">
                    <i class="bi bi-google"></i>
                  </button>
                  <button class="btn btn-outline-secondary">
                    <i class="bi bi-facebook"></i>
                  </button>
                  <button class="btn btn-outline-secondary">
                    <i class="bi bi-apple"></i>
                  </button>
                </div>
              </div>
            </div>
            
            <div class="card-footer bg-light text-center py-3">
              <p class="mb-0">
                Don't have an account? 
                <router-link to="/register" class="text-primary">Sign up</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

// Form data
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)

// UI state
const isLoading = ref(false)
const message = ref('')
const messageType = ref('alert-danger')

// Toggle password visibility
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

// Handle login form submission
const handleLogin = async () => {
  message.value = ''
  isLoading.value = true
  
  try {
    await authStore.login(email.value, password.value, rememberMe.value)
    
    // Redirect to dashboard or the page user was trying to access
    const redirectPath = route.query.redirect || '/dashboard'
    router.push(redirectPath)
  } catch (error) {
    message.value = error.message || 'Failed to sign in. Please check your credentials.'
    messageType.value = 'alert-danger'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-page {
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