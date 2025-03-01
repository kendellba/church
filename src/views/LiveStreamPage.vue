<template>
  <div class="live-stream-page">
    <h1 class="page-title slide-up">Live Worship</h1>
    
    <div class="row mb-4">
      <div class="col-lg-8 mx-auto text-center slide-up" style="animation-delay: 0.1s">
        <p class="lead">
          Join us for live worship services and events from anywhere in the world.
        </p>
      </div>
    </div>
    
    <div class="row mb-5">
      <div class="col-lg-9 mx-auto slide-up" style="animation-delay: 0.2s">
        <div class="card shadow-sm">
          <div class="ratio ratio-16x9">
            <!-- Replace with your actual YouTube or other streaming embed code -->
            <iframe 
              src="https://www.youtube.com/embed/live_stream?channel=CHANNEL_ID" 
              title="Grace Church Live Stream" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen
            ></iframe>
          </div>
          <div class="card-body">
            <h3>Sunday Worship Service</h3>
            <p class="text-muted">Live every Sunday at 10:00 AM</p>
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <span class="badge bg-danger me-2">LIVE NOW</span>
                <span class="text-muted">253 watching</span>
              </div>
              <div>
                <button class="btn btn-outline-primary me-2">
                  <i class="bi bi-chat-fill me-1"></i> Chat
                </button>
                <button class="btn btn-primary">
                  <i class="bi bi-share-fill me-1"></i> Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Upcoming Streams -->
    <h2 class="mb-4 slide-up" style="animation-delay: 0.3s">Upcoming Live Events</h2>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
      <div class="col slide-up" style="animation-delay: 0.4s">
        <div class="card h-100 hover-lift">
          <div class="card-body">
            <h5 class="card-title">Wednesday Bible Study</h5>
            <h6 class="card-subtitle mb-2 text-muted">Every Wednesday at 7:00 PM</h6>
            <p class="card-text">Join Pastor John for an in-depth study of the Book of Romans.</p>
            <button class="btn btn-sm btn-outline-primary">
              <i class="bi bi-bell me-1"></i> Set Reminder
            </button>
          </div>
        </div>
      </div>
      
      <div class="col slide-up" style="animation-delay: 0.5s">
        <div class="card h-100 hover-lift">
          <div class="card-body">
            <h5 class="card-title">Youth Worship Night</h5>
            <h6 class="card-subtitle mb-2 text-muted">Friday at 6:30 PM</h6>
            <p class="card-text">A special evening of worship and fellowship for our youth ministry.</p>
            <button class="btn btn-sm btn-outline-primary">
              <i class="bi bi-bell me-1"></i> Set Reminder
            </button>
          </div>
        </div>
      </div>
      
      <div class="col slide-up" style="animation-delay: 0.6s">
        <div class="card h-100 hover-lift">
          <div class="card-body">
            <h5 class="card-title">Prayer Service</h5>
            <h6 class="card-subtitle mb-2 text-muted">Monday at 6:00 AM</h6>
            <p class="card-text">Start your week with our community prayer service.</p>
            <button class="btn btn-sm btn-outline-primary">
              <i class="bi bi-bell me-1"></i> Set Reminder
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Past Streams -->
    <h2 class="mb-4 slide-up" style="animation-delay: 0.7s">Recent Broadcasts</h2>
    <div class="row row-cols-1 row-cols-md-2 g-4">
      <div class="col slide-up" style="animation-delay: 0.8s">
        <div class="card hover-lift">
          <div class="ratio ratio-16x9">
            <img src="https://source.unsplash.com/random/800x450/?worship" class="card-img-top" alt="Worship Service">
          </div>
          <div class="card-body">
            <h5 class="card-title">Sunday Worship Service</h5>
            <h6 class="card-subtitle mb-2 text-muted">August 27, 2023</h6>
            <p class="card-text">Pastor John's message on "Faith That Moves Mountains"</p>
            <button class="btn btn-sm btn-primary">
              <i class="bi bi-play-fill me-1"></i> Watch
            </button>
          </div>
        </div>
      </div>
      
      <div class="col slide-up" style="animation-delay: 0.9s">
        <div class="card hover-lift">
          <div class="ratio ratio-16x9">
            <img src="https://source.unsplash.com/random/800x450/?bible,study" class="card-img-top" alt="Bible Study">
          </div>
          <div class="card-body">
            <h5 class="card-title">Wednesday Bible Study</h5>
            <h6 class="card-subtitle mb-2 text-muted">August 23, 2023</h6>
            <p class="card-text">Romans Chapter 8: Life in the Spirit</p>
            <button class="btn btn-sm btn-primary">
              <i class="bi bi-play-fill me-1"></i> Watch
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Component logic would go here
</script>

<style scoped>
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-5px);
  box-shadow: var(--elevation-4);
}

.live-stream-page > * {
  animation-fill-mode: both;
}
</style> 