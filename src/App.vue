<template>
  <div id="app">
    <template v-if="showSplash">
      <SplashScreen @enter="handleEnterSite" />
    </template>
    <template v-else>
      <NavBar v-if="!isFullScreenRoute" />
      <main>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
      <FooterSection v-if="!isFullScreenRoute" />
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavBar from './components/NavBar.vue'
import FooterSection from './components/FooterSection.vue'
import SplashScreen from './views/SplashScreen.vue'

const route = useRoute()
const router = useRouter()
const showSplash = ref(true)

// Check if current route should be displayed in full screen (no header/footer)
const isFullScreenRoute = computed(() => {
  const fullScreenRoutes = ['/splash', '/login', '/register', '/forgot-password']
  return fullScreenRoutes.includes(route.path)
})

// Check if user has seen the splash screen before
onMounted(() => {
  const hasSeenSplash = localStorage.getItem('hasSeenSplash')
  
  if (hasSeenSplash) {
    showSplash.value = false
  } else {
    // Set flag in localStorage to remember that user has seen splash
    localStorage.setItem('hasSeenSplash', 'true')
    
    // Optionally, you can clear this flag after some time (e.g., 24 hours)
    // to show the splash again in the future
    setTimeout(() => {
      localStorage.removeItem('hasSeenSplash')
    }, 24 * 60 * 60 * 1000) // 24 hours
  }
})

// Handle enter site button click
const handleEnterSite = () => {
  showSplash.value = false
}
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  min-height: calc(100vh - 200px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Global animations */
.slide-up {
  animation: slideUp 0.5s ease forwards;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 