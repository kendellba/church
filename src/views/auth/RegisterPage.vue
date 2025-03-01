<template>
  <div class="register-page">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="card shadow-sm border-0 slide-up">
          <div class="card-header bg-primary text-white text-center py-4">
            <h2 class="mb-0">Create an Account</h2>
          </div>
          <div class="card-body p-4">
            <div class="text-center mb-4">
              <i class="bi bi-person-plus-fill display-4 text-primary"></i>
              <p class="mt-3 mb-0">Join our church community</p>
            </div>
            
            <div v-if="errorMessage" class="alert alert-danger" role="alert">
              {{ errorMessage }}
            </div>
            
            <form @submit.prevent="handleRegister">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="firstName" class="form-label">First Name</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="firstName" 
                    v-model="formData.firstName" 
                    required
                  >
                </div>
                <div class="col-md-6 mb-3">
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
                <div class="form-text">We'll never share your email with anyone else.</div>
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
              
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <div class="input-group">
                  <input 
                    :type="showPassword ? 'text' : 'password'" 
                    class="form-control" 
                    id="password" 
                    v-model="formData.password" 
                    required
                    minlength="8"
                  >
                  <button 
                    class="btn btn-outline-secondary" 
                    type="button"
                    @click="showPassword = !showPassword"
                  >
                    <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                  </button>
                </div>
                <div class="form-text">Password must be at least 8 characters long.</div>
              </div>
              
              <div class="mb-3">
                <label for="confirmPassword" class="form-label">Confirm Password</label>
                <input 
                  type="password" 
                  class="form-control" 
                  id="confirmPassword" 
                  v-model="formData.confirmPassword" 
                  required
                >
              </div>
              
              <div class="mb-4 form-check">
                <input 
                  type="checkbox" 
                  class="form-check-input" 
                  id="termsAgreement" 
                  v-model="formData.termsAgreed"
                  required
                >
                <label class="form-check-label" for="termsAgreement">
                  I agree to the <a href="#" data-bs-toggle="modal" data-bs-target="#termsModal">Terms of Service</a> and <a href="#" data-bs-toggle="modal" data-bs-target="#privacyModal">Privacy Policy</a>
                </label>
              </div>
              
              <button 
                type="submit" 
                class="btn btn-primary w-100 py-2 mb-4"
                :disabled="isLoading || !formData.termsAgreed || formData.password !== formData.confirmPassword"
              >
                <span v-if="isLoading">
                  <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Creating Account...
                </span>
                <span v-else>
                  <i class="bi bi-person-plus me-2"></i>
                  Create Account
                </span>
              </button>
              
              <div class="text-center">
                <p>Already have an account? <router-link to="/login" class="text-decoration-none">Sign in</router-link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Terms of Service Modal -->
    <div class="modal fade" id="termsModal" tabindex="-1" aria-labelledby="termsModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="termsModalLabel">Terms of Service</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <h6>1. Acceptance of Terms</h6>
            <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
            
            <h6>2. User Account</h6>
            <p>If you create an account on the website, you are responsible for maintaining the security of your account and the information you provide.</p>
            
            <h6>3. Conduct</h6>
            <p>You agree to use the website in a manner consistent with all applicable laws and regulations.</p>
            
            <h6>4. Content</h6>
            <p>Our website allows you to post, link, store, share and otherwise make available certain information, text, graphics, or other material.</p>
            
            <h6>5. Changes to Terms</h6>
            <p>We reserve the right to modify these terms from time to time at our sole discretion.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">I Understand</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Privacy Policy Modal -->
    <div class="modal fade" id="privacyModal" tabindex="-1" aria-labelledby="privacyModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="privacyModalLabel">Privacy Policy</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <h6>1. Information We Collect</h6>
            <p>We collect information you provide directly to us when you create an account, update your profile, or communicate with us.</p>
            
            <h6>2. How We Use Information</h6>
            <p>We use the information we collect to provide, maintain, and improve our services, and to communicate with you.</p>
            
            <h6>3. Information Sharing</h6>
            <p>We do not share your personal information with third parties except as described in this privacy policy.</p>
            
            <h6>4. Security</h6>
            <p>We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.</p>
            
            <h6>5. Changes to Privacy Policy</h6>
            <p>We may change this privacy policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">I Understand</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

// Form data
const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  termsAgreed: false
})

// UI state
const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

// Handle registration form submission
const handleRegister = async () => {
  // Validate passwords match
  if (formData.password !== formData.confirmPassword) {
    errorMessage.value = 'Passwords do not match'
    return
  }
  
  isLoading.value = true
  errorMessage.value = ''
  
  try {
    await authStore.register({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password
    })
    
    // Redirect to dashboard after successful registration
    router.push('/dashboard')
  } catch (error) {
    errorMessage.value = error.message || 'Failed to create account. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.register-page {
  padding: 2rem 0;
}

.card {
  border-radius: 10px;
  overflow: hidden;
}

.card-header {
  border-bottom: none;
}
</style> 