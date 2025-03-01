<template>
  <div class="login-page">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6 col-xl-5">
        <div class="card shadow-sm border-0 slide-up">
          <div class="card-header bg-primary text-white text-center py-4">
            <h2 class="mb-0">Member Login</h2>
          </div>
          <div class="card-body p-4 p-md-5">
            <div class="text-center mb-4">
              <i class="bi bi-person-circle display-4 text-primary"></i>
              <p class="mt-3 mb-0">Sign in to access your member account</p>
            </div>
            
            <div v-if="errorMessage" class="alert alert-danger" role="alert">
              {{ errorMessage }}
            </div>
            
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
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
              
              <div class="mb-4">
                <div class="d-flex justify-content-between align-items-center">
                  <label for="password" class="form-label">Password</label>
                  <router-link to="/forgot-password" class="small text-decoration-none">Forgot Password?</router-link>
                </div>
                <div class="input-group">
                  <span class="input-group-text"><i class="bi bi-lock"></i></span>
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
                    @click="showPassword = !showPassword"
                  >
                    <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                  </button>
                </div>
              </div>
              
              <div class="mb-4 form-check">
                <input type="checkbox" class="form-check-input" id="rememberMe" v-model="rememberMe">
                <label class="form-check-label" for="rememberMe">Remember me</label>
              </div>
              
              <button 
                type="submit" 
                class="btn btn-primary w-100 py-2 mb-4"
                :disabled="isLoading"
              >
                <span v-if="isLoading">
                  <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Signing in...
                </span>
                <span v-else>
                  <i class="bi bi-box-arrow-in-right me-2"></i>
                  Sign In
                </span>
              </button>
              
              <div class="text-center">
                <p>Don't have an account? <router-link to="/register" class="text-decoration-none">Sign up</router-link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

// Form data
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)

// UI state
const isLoading = ref(false)
const errorMessage = ref('')

// Handle login form submission
const handleLogin = async () => {
  isLoading.value = true
  errorMessage.value = ''
  
  try {
    await authStore.login(email.value, password.value, rememberMe.value)
    router.push('/dashboard')
  } catch (error) {
    errorMessage.value = error.message || 'Failed to sign in. Please check your credentials.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-page {
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