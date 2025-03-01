<template>
  <div class="splash-screen">
    <div class="splash-content">
      <div class="logo-container" :class="{ 'animation-complete': animationComplete }">
        <div class="logo">
          <i class="bi bi-cloud-sun"></i>
        </div>
        <div class="ministry-name">
          <div class="line-1">Heaven Touching</div>
          <div class="line-2">Earth</div>
          <div class="line-3">International Ministries</div>
        </div>
      </div>
      
      <div class="enter-button-container" v-if="showEnterButton">
        <button 
          class="btn btn-lg btn-primary enter-button"
          @click="enterSite"
        >
          Enter Site
          <i class="bi bi-arrow-right-circle ms-2"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const animationComplete = ref(false)
const showEnterButton = ref(false)

onMounted(() => {
  // Start the animation sequence
  setTimeout(() => {
    animationComplete.value = true
    
    // Show the enter button after the animation completes
    setTimeout(() => {
      showEnterButton.value = true
    }, 1500)
  }, 1000)
})

const enterSite = () => {
  // Add a fade-out class to the splash screen
  document.querySelector('.splash-screen').classList.add('fade-out')
  
  // Navigate to home page after fade out animation
  setTimeout(() => {
    router.push('/')
  }, 500)
}
</script>

<style scoped>
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a237e, #283593, #3949ab, #3f51b5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: opacity 0.5s ease;
}

.splash-screen.fade-out {
  opacity: 0;
}

.splash-content {
  text-align: center;
  color: white;
  padding: 2rem;
}

.logo-container {
  position: relative;
  height: 200px;
  margin-bottom: 3rem;
  transition: all 0.5s ease;
}

.logo {
  font-size: 8rem;
  opacity: 1;
  transform: translateY(0);
  transition: all 1s ease;
}

.logo i {
  filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.7));
}

.ministry-name {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  opacity: 0;
  transition: opacity 1s ease 0.5s;
}

.line-1, .line-2, .line-3 {
  white-space: nowrap;
  overflow: hidden;
  width: 0;
  margin: 0 auto;
  transition: width 1s ease;
}

.line-1 {
  font-size: 2.5rem;
  font-weight: 700;
  transition-delay: 0.5s;
}

.line-2 {
  font-size: 2.5rem;
  font-weight: 700;
  transition-delay: 0.8s;
}

.line-3 {
  font-size: 1.5rem;
  font-weight: 300;
  transition-delay: 1.1s;
}

/* Animation completed state */
.logo-container.animation-complete .logo {
  opacity: 0;
  transform: translateY(-50px) scale(0.5);
}

.logo-container.animation-complete .ministry-name {
  opacity: 1;
}

.logo-container.animation-complete .line-1 {
  width: 100%;
}

.logo-container.animation-complete .line-2 {
  width: 100%;
}

.logo-container.animation-complete .line-3 {
  width: 100%;
}

.enter-button-container {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.5s ease forwards;
}

.enter-button {
  padding: 0.75rem 2rem;
  font-size: 1.25rem;
  border-radius: 50px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.enter-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .logo {
    font-size: 6rem;
  }
  
  .line-1, .line-2 {
    font-size: 2rem;
  }
  
  .line-3 {
    font-size: 1.2rem;
  }
}

@media (max-width: 576px) {
  .logo {
    font-size: 5rem;
  }
  
  .line-1, .line-2 {
    font-size: 1.5rem;
  }
  
  .line-3 {
    font-size: 1rem;
  }
}
</style> 