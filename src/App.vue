<template>
  <div class="app-container d-flex flex-column min-vh-100">
    <NavBar />
    
    <main class="flex-grow-1">
      <div class="container py-4">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>
    
    <AppFooter />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<style>
/* Global styles */
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  margin-bottom: 1rem;
}

.page-title {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f8f9fa;
}
</style> 