<template>
  <footer class="bg-dark text-white py-4 mt-5">
    <div class="container">
      <div class="row">
        <div class="col-md-4 mb-4 mb-md-0 fade-in" style="animation-delay: 0.1s">
          <h5 class="mb-3">Grace Church</h5>
          <p>A place of worship, community, and spiritual growth where everyone is welcome.</p>
          <div class="social-links mt-3">
            <a href="#" class="me-2 social-icon" title="Facebook">
              <i class="bi bi-facebook"></i>
            </a>
            <a href="#" class="me-2 social-icon" title="Instagram">
              <i class="bi bi-instagram"></i>
            </a>
            <a href="#" class="me-2 social-icon" title="YouTube">
              <i class="bi bi-youtube"></i>
            </a>
            <a href="#" class="social-icon" title="Twitter">
              <i class="bi bi-twitter"></i>
            </a>
          </div>
        </div>
        
        <div class="col-md-4 mb-4 mb-md-0 fade-in" style="animation-delay: 0.2s">
          <h5 class="mb-3">Quick Links</h5>
          <ul class="list-unstyled footer-links">
            <li><router-link to="/" class="footer-link">Home</router-link></li>
            <li><router-link to="/about" class="footer-link">About Us</router-link></li>
            <li><router-link to="/events" class="footer-link">Events</router-link></li>
            <li><router-link to="/sermons" class="footer-link">Sermons</router-link></li>
            <li><router-link to="/contact" class="footer-link">Contact</router-link></li>
          </ul>
        </div>
        
        <div class="col-md-4 fade-in" style="animation-delay: 0.3s">
          <h5 class="mb-3">Contact Info</h5>
          <ul class="list-unstyled">
            <li class="mb-2 contact-item">
              <i class="bi bi-geo-alt-fill me-2"></i> 123 Faith Street, Anytown, ST 12345
            </li>
            <li class="mb-2 contact-item">
              <i class="bi bi-telephone-fill me-2"></i> (555) 123-4567
            </li>
            <li class="mb-2 contact-item">
              <i class="bi bi-envelope-fill me-2"></i> info@gracechurch.org
            </li>
            <li class="contact-item">
              <i class="bi bi-clock-fill me-2"></i> Sunday Service: 10:00 AM
            </li>
          </ul>
        </div>
      </div>
      
      <hr class="my-4">
      
      <div class="text-center fade-in" style="animation-delay: 0.4s">
        <p class="mb-0">&copy; {{ new Date().getFullYear() }} Grace Church. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Footer component
</script>

<style scoped>
.social-icon {
  color: white;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  opacity: 0.8;
  display: inline-block;
}

.social-icon:hover {
  opacity: 1;
  transform: translateY(-3px) rotate(5deg);
  color: var(--primary-light);
}

.footer-link {
  color: #adb5bd;
  text-decoration: none;
  transition: all 0.2s ease;
  display: inline-block;
  padding: 3px 0;
}

.footer-link:hover {
  color: white;
  transform: translateX(5px);
}

.contact-item {
  transition: transform 0.2s ease;
}

.contact-item:hover {
  transform: translateX(5px);
}

footer {
  position: relative;
  overflow: hidden;
}

footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(to right, var(--primary), var(--secondary));
}
</style> 