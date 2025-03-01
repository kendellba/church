<template>
  <div class="not-found-page">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 text-center">
          <div class="error-container">
            <div class="error-code">404</div>
            <div class="error-divider">
              <i class="bi bi-cloud-slash"></i>
            </div>
            <h1 class="error-title mb-4">Page Not Found</h1>
            
            <p class="error-message mb-5">
              The page you are looking for might have been removed, had its name changed,
              or is temporarily unavailable.
            </p>
            
            <div class="error-actions">
              <router-link to="/" class="btn btn-primary btn-lg me-3">
                <i class="bi bi-house-door me-2"></i>
                Return Home
              </router-link>
              
              <button @click="goBack" class="btn btn-outline-primary btn-lg">
                <i class="bi bi-arrow-left me-2"></i>
                Go Back
              </button>
            </div>
          </div>
          
          <div class="scripture-quote mt-5">
            <p class="quote-text">
              "For I know the plans I have for you," declares the LORD, "plans to prosper you and not to harm you, plans to give you hope and a future."
            </p>
            <p class="quote-reference">— Jeremiah 29:11</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}
</script>

<style scoped>
.not-found-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 4rem 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
}

.error-container {
  background-color: white;
  border-radius: 1rem;
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.error-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(90deg, #3949ab, #1e88e5, #039be5, #00acc1);
}

.error-code {
  font-size: 8rem;
  font-weight: 900;
  line-height: 1;
  color: #3949ab;
  text-shadow: 3px 3px 0 rgba(57, 73, 171, 0.1);
  margin-bottom: 0.5rem;
  font-family: 'Montserrat', sans-serif;
}

.error-divider {
  font-size: 2rem;
  color: #3949ab;
  margin-bottom: 1.5rem;
  position: relative;
}

.error-divider::before,
.error-divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 80px;
  height: 2px;
  background-color: rgba(57, 73, 171, 0.2);
}

.error-divider::before {
  right: calc(50% + 2rem);
}

.error-divider::after {
  left: calc(50% + 2rem);
}

.error-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
}

.error-message {
  font-size: 1.1rem;
  color: #666;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.error-actions {
  margin-top: 2rem;
}

.scripture-quote {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
}

.quote-text {
  font-size: 1.1rem;
  font-style: italic;
  color: #555;
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

.quote-reference {
  font-weight: 600;
  color: #3949ab;
  text-align: right;
}

/* Animation */
.error-container {
  animation: fadeInUp 0.8s ease forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .error-code {
    font-size: 6rem;
  }
  
  .error-title {
    font-size: 2rem;
  }
  
  .error-container {
    padding: 2rem;
  }
  
  .error-divider::before,
  .error-divider::after {
    width: 50px;
  }
  
  .error-divider::before {
    right: calc(50% + 1.5rem);
  }
  
  .error-divider::after {
    left: calc(50% + 1.5rem);
  }
}

@media (max-width: 576px) {
  .error-code {
    font-size: 5rem;
  }
  
  .error-title {
    font-size: 1.75rem;
  }
  
  .error-actions .btn {
    display: block;
    width: 100%;
    margin-bottom: 1rem;
  }
  
  .error-actions .btn:last-child {
    margin-bottom: 0;
  }
  
  .error-divider::before,
  .error-divider::after {
    width: 30px;
  }
}
</style> 