<template>
  <div class="contact-page">
    <h1 class="page-title slide-up">Contact Us</h1>
    
    <div class="row">
      <!-- Contact Information -->
      <div class="col-lg-5 mb-4 mb-lg-0 slide-up" style="animation-delay: 0.1s">
        <div class="card shadow-sm h-100 hover-lift">
          <div class="card-body">
            <h2 class="card-title mb-4">Church Information</h2>
            
            <div class="d-flex mb-3 info-item">
              <i class="bi bi-geo-alt-fill text-primary fs-4 me-3"></i>
              <div>
                <h5 class="mb-1">Address</h5>
                <p class="mb-0">123 Faith Street<br>Anytown, ST 12345</p>
              </div>
            </div>
            
            <div class="d-flex mb-3 info-item">
              <i class="bi bi-telephone-fill text-primary fs-4 me-3"></i>
              <div>
                <h5 class="mb-1">Phone</h5>
                <p class="mb-0">(555) 123-4567</p>
              </div>
            </div>
            
            <div class="d-flex mb-3 info-item">
              <i class="bi bi-envelope-fill text-primary fs-4 me-3"></i>
              <div>
                <h5 class="mb-1">Email</h5>
                <p class="mb-0">info@gracechurch.org</p>
              </div>
            </div>
            
            <div class="d-flex mb-4 info-item">
              <i class="bi bi-clock-fill text-primary fs-4 me-3"></i>
              <div>
                <h5 class="mb-1">Service Times</h5>
                <p class="mb-0">
                  Sunday Worship: 10:00 AM<br>
                  Sunday School: 9:00 AM<br>
                  Wednesday Bible Study: 7:00 PM
                </p>
              </div>
            </div>
            
            <h5 class="mb-2">Connect With Us</h5>
            <div class="social-links">
              <a href="#" class="btn btn-outline-primary me-2 social-btn" title="Facebook">
                <i class="bi bi-facebook"></i>
              </a>
              <a href="#" class="btn btn-outline-primary me-2 social-btn" title="Instagram">
                <i class="bi bi-instagram"></i>
              </a>
              <a href="#" class="btn btn-outline-primary me-2 social-btn" title="YouTube">
                <i class="bi bi-youtube"></i>
              </a>
              <a href="#" class="btn btn-outline-primary social-btn" title="Twitter">
                <i class="bi bi-twitter"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Contact Form -->
      <div class="col-lg-7 slide-up" style="animation-delay: 0.2s">
        <div class="card shadow-sm">
          <div class="card-body">
            <h2 class="card-title mb-4">Send Us a Message</h2>
            
            <div v-if="formSubmitted" class="alert alert-success fade-in" role="alert">
              <i class="bi bi-check-circle-fill me-2"></i>
              Thank you for your message! We'll get back to you soon.
            </div>
            
            <form @submit.prevent="submitForm">
              <div class="row g-3">
                <div class="col-md-6 form-field">
                  <label for="name" class="form-label">Your Name</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="name" 
                    v-model="formData.name" 
                    required
                  >
                </div>
                
                <div class="col-md-6 form-field">
                  <label for="email" class="form-label">Email Address</label>
                  <input 
                    type="email" 
                    class="form-control" 
                    id="email" 
                    v-model="formData.email" 
                    required
                  >
                </div>
                
                <div class="col-md-6 form-field">
                  <label for="phone" class="form-label">Phone Number</label>
                  <input 
                    type="tel" 
                    class="form-control" 
                    id="phone" 
                    v-model="formData.phone"
                  >
                </div>
                
                <div class="col-md-6 form-field">
                  <label for="subject" class="form-label">Subject</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="subject" 
                    v-model="formData.subject" 
                    required
                  >
                </div>
                
                <div class="col-12 form-field">
                  <label for="message" class="form-label">Message</label>
                  <textarea 
                    class="form-control" 
                    id="message" 
                    rows="5" 
                    v-model="formData.message" 
                    required
                  ></textarea>
                </div>
                
                <div class="col-12 form-field">
                  <div class="form-check">
                    <input 
                      class="form-check-input" 
                      type="checkbox" 
                      id="subscribe" 
                      v-model="formData.subscribe"
                    >
                    <label class="form-check-label" for="subscribe">
                      Subscribe to our newsletter for updates and announcements
                    </label>
                  </div>
                </div>
                
                <div class="col-12">
                  <button 
                    type="submit" 
                    class="btn btn-primary"
                    :disabled="isSubmitting"
                  >
                    <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Map Section -->
    <div class="mt-5">
      <h2 class="mb-4">Find Us</h2>
      <div class="card shadow-sm">
        <div class="card-body p-0">
          <div class="ratio ratio-16x9">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573036935!2d-73.98784492346204!3d40.75798597138789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1697474546012!5m2!1sen!2sus" 
              width="600" 
              height="450" 
              style="border:0;" 
              allowfullscreen="" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Form data
const formData = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  subscribe: false
})

// Form submission state
const isSubmitting = ref(false)
const formSubmitted = ref(false)

// Form submission handler
const submitForm = async () => {
  isSubmitting.value = true
  
  try {
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // In a real application, you would send the form data to your backend
    console.log('Form submitted:', formData)
    
    // Reset form after successful submission
    Object.keys(formData).forEach(key => {
      if (key !== 'subscribe') {
        formData[key] = ''
      }
    })
    
    formSubmitted.value = true
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      formSubmitted.value = false
    }, 5000)
  } catch (error) {
    console.error('Error submitting form:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.social-links a {
  transition: all 0.3s ease;
}

.social-links a:hover {
  transform: translateY(-5px);
}

.contact-page > * {
  animation-fill-mode: both;
}

.info-item {
  transition: transform 0.3s ease;
}

.info-item:hover {
  transform: translateX(5px);
}

.social-btn {
  transition: all 0.3s ease;
}

.social-btn:hover {
  transform: translateY(-5px) rotate(5deg);
}

.form-field {
  transition: transform 0.3s ease, opacity 0.3s ease;
  opacity: 0.9;
}

.form-field:focus-within {
  transform: translateY(-3px);
  opacity: 1;
}

.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-5px);
  box-shadow: var(--elevation-8);
}
</style> 