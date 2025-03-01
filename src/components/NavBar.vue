<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <router-link class="navbar-brand d-flex align-items-center" to="/">
        <i class="bi bi-church me-2"></i>
        <span>Grace Church</span>
      </router-link>
      
      <button 
        class="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav" 
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item" v-for="route in routes" :key="route.path">
            <router-link 
              class="nav-link px-3" 
              :to="route.path" 
              active-class="active"
            >
              {{ route.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
// Define navigation routes
const routes = [
  { path: '/', name: 'Home' },
  { path: '/about', name: 'About' },
  { path: '/events', name: 'Events' },
  { path: '/sermons', name: 'Sermons' },
  { path: '/contact', name: 'Contact' }
]
</script>

<style scoped>
.navbar-brand {
  font-size: 1.5rem;
  font-weight: 300;
}

.nav-link {
  font-weight: 500;
  padding: 0.5rem 1rem;
  transition: background-color 0.2s ease;
  border-radius: 4px;
  margin: 0 2px;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link.active {
  background-color: rgba(255, 255, 255, 0.2);
  font-weight: 500;
}
</style> 