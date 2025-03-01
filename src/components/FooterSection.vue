<template>
  <footer class="footer bg-dark text-white py-5">
    <div class="container">
      <div class="row">
        <!-- Ministry Info -->
        <div class="col-lg-4 mb-4 mb-lg-0">
          <div class="d-flex align-items-center mb-3">
            <i class="bi bi-cloud-sun fs-3 me-2"></i>
            <h5 class="mb-0">Heaven Touching Earth</h5>
          </div>
          <p class="mb-3">
            Bringing heaven's presence to earth through worship, prayer, and community outreach.
          </p>
          <div class="social-icons">
            <a href="#" class="me-3" aria-label="Facebook">
              <i class="bi bi-facebook"></i>
            </a>
            <a href="#" class="me-3" aria-label="Instagram">
              <i class="bi bi-instagram"></i>
            </a>
            <a href="#" class="me-3" aria-label="YouTube">
              <i class="bi bi-youtube"></i>
            </a>
            <a href="#" aria-label="Twitter">
              <i class="bi bi-twitter-x"></i>
            </a>
          </div>
        </div>
        
        <!-- Quick Links -->
        <div class="col-lg-2 col-md-4 mb-4 mb-md-0">
          <h6 class="text-uppercase mb-3">Quick Links</h6>
          <ul class="list-unstyled footer-links">
            <li><router-link to="/about">About Us</router-link></li>
            <li><router-link to="/events">Events</router-link></li>
            <li><router-link to="/sermons">Sermons</router-link></li>
            <li><router-link to="/prayer">Prayer</router-link></li>
            <li><router-link to="/contact">Contact</router-link></li>
          </ul>
        </div>
        
        <!-- Resources -->
        <div class="col-lg-2 col-md-4 mb-4 mb-md-0">
          <h6 class="text-uppercase mb-3">Resources</h6>
          <ul class="list-unstyled footer-links">
            <li><router-link to="/groups">Small Groups</router-link></li>
            <li><router-link to="/gallery">Gallery</router-link></li>
            <li><router-link to="/live">Live Stream</router-link></li>
            <li><a href="#">Donate</a></li>
            <li><a href="#">Volunteer</a></li>
          </ul>
        </div>
        
        <!-- Contact Info -->
        <div class="col-lg-4 col-md-4">
          <h6 class="text-uppercase mb-3">Contact Us</h6>
          <ul class="list-unstyled contact-info">
            <li class="mb-2">
              <i class="bi bi-geo-alt me-2"></i>
              123 Faith Avenue, Cityville, ST 12345
            </li>
            <li class="mb-2">
              <i class="bi bi-telephone me-2"></i>
              (555) 123-4567
            </li>
            <li class="mb-2">
              <i class="bi bi-envelope me-2"></i>
              info@heaventouchingearth.org
            </li>
            <li>
              <i class="bi bi-clock me-2"></i>
              Sunday Services: 9:00 AM & 11:00 AM
            </li>
          </ul>
        </div>
      </div>
      
      <hr class="my-4 bg-secondary">
      
      <!-- Copyright -->
      <div class="row align-items-center">
        <div class="col-md-6 text-center text-md-start">
          <p class="mb-0">
            &copy; {{ new Date().getFullYear() }} Heaven Touching Earth International Ministries. All rights reserved.
          </p>
        </div>
        <div class="col-md-6 text-center text-md-end mt-3 mt-md-0">
          <ul class="list-inline mb-0">
            <li class="list-inline-item">
              <a href="#">Privacy Policy</a>
            </li>
            <li class="list-inline-item">
              <span class="text-muted mx-2">|</span>
            </li>
            <li class="list-inline-item">
              <a href="#">Terms of Use</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// No additional script needed
</script>

<style scoped>
.footer {
  border-top: 5px solid var(--bs-primary);
}

.footer-links li {
  margin-bottom: 0.5rem;
}

.footer-links a {
  color: #adb5bd;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: white;
  text-decoration: none;
}

.social-icons a {
  color: white;
  font-size: 1.25rem;
  transition: color 0.3s ease;
}

.social-icons a:hover {
  color: var(--bs-primary);
}

.contact-info i {
  color: var(--bs-primary);
}

hr {
  opacity: 0.1;
}
</style> 