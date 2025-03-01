<template>
  <div class="home-page">
    <!-- Hero Section -->
    <div class="hero-section text-center py-5 mb-5 rounded fade-in">
      <h1 class="display-4 fw-bold">Welcome to Heaven Touching Earth International Ministries</h1>
      <p class="lead mb-4">A place of worship, community, and spiritual growth</p>
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <router-link to="/about" class="btn btn-primary btn-lg px-4 gap-3 bounce">
          Learn More
        </router-link>
        <router-link to="/contact" class="btn btn-outline-primary btn-lg px-4">
          Contact Us
        </router-link>
      </div>
    </div>
    
    <!-- Welcome Message -->
    <div class="row mb-5">
      <div class="col-lg-6 mb-4 mb-lg-0 slide-up" style="animation-delay: 0.1s">
        <h2>Our Community</h2>
        <p>
          Heaven Touching Earth International Ministries is a vibrant, welcoming community of believers dedicated to 
          sharing God's love and message of hope. We believe in creating a space 
          where everyone can experience God's presence, grow in their faith, and 
          build meaningful relationships.
        </p>
        <p>
          Whether you're exploring faith for the first time or looking for a church 
          to call home, we invite you to join us this Sunday. Our doors are open to all!
        </p>
      </div>
      <div class="col-lg-6 slide-up" style="animation-delay: 0.2s">
        <div class="card shadow-sm">
          <div class="card-body">
            <h3 class="card-title">This Sunday</h3>
            <p class="card-text">
              <strong>Service Time:</strong> 9:00 AM<br>
              <strong>Message:</strong> "Finding Peace in Troubled Times"<br>
              <strong>Speaker:</strong> Pastor John Smith
            </p>
            <p class="card-text">
              Join us for worship, prayer, and fellowship. Children's programs 
              available for all ages.
            </p>
            <div class="d-grid">
              <router-link to="/contact" class="btn btn-primary pulse">
                Get Directions
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Featured Sections -->
    <div class="row g-4">
      <div class="col-md-4 slide-up" style="animation-delay: 0.3s">
        <div class="card h-100 hover-lift">
          <div class="feature-image events-image"></div>
          <div class="card-body text-center">
            <i class="bi bi-calendar-event text-primary fs-1 mb-3"></i>
            <h3 class="card-title">Upcoming Events</h3>
            <p class="card-text">
              Stay connected with our church community through various events and activities.
            </p>
            <router-link to="/events" class="btn btn-outline-primary">
              View Events
            </router-link>
          </div>
        </div>
      </div>
      
      <div class="col-md-4 slide-up" style="animation-delay: 0.4s">
        <div class="card h-100 hover-lift">
          <div class="feature-image sermons-image"></div>
          <div class="card-body text-center">
            <i class="bi bi-mic text-primary fs-1 mb-3"></i>
            <h3 class="card-title">Recent Sermons</h3>
            <p class="card-text">
              Listen to our latest sermons and grow in your understanding of God's Word.
            </p>
            <router-link to="/sermons" class="btn btn-outline-primary">
              Listen Now
            </router-link>
          </div>
        </div>
      </div>
      
      <div class="col-md-4 slide-up" style="animation-delay: 0.5s">
        <div class="card h-100 hover-lift">
          <div class="feature-image community-image"></div>
          <div class="card-body text-center">
            <i class="bi bi-people text-primary fs-1 mb-3"></i>
            <h3 class="card-title">Get Involved</h3>
            <p class="card-text">
              Discover ways to serve, connect, and grow within our church community.
            </p>
            <router-link to="/about" class="btn btn-outline-primary">
              Learn More
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Home page component
</script>

<style scoped>
.hero-section {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), 
                    url('https://source.unsplash.com/random/1200x600/?church,worship');
  background-size: cover;
  background-position: center;
  padding: 5rem 1rem;
  border-radius: 0.5rem;
  color: white;
  margin-top: -16px;
  margin-left: -16px;
  margin-right: -16px;
}

.feature-image {
  height: 160px;
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
}

.events-image {
  background-image: url('https://source.unsplash.com/random/400x200/?church,event');
}

.sermons-image {
  background-image: url('https://source.unsplash.com/random/400x200/?bible,sermon');
}

.community-image {
  background-image: url('https://source.unsplash.com/random/400x200/?community,people');
}

.card-title {
  font-weight: 500;
  margin-top: 8px;
}

.home-page > * {
  animation-fill-mode: both;
}

.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-10px);
  box-shadow: var(--elevation-8);
}

.hover-lift:hover .feature-image {
  transform: scale(1.05);
}
</style> 