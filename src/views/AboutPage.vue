<template>
    <div class="about-page">
      <h1 class="page-title slide-up">About Grace Church</h1>
      
      <!-- Mission and Vision Section -->
      <div class="row mb-5">
        <div class="col-lg-6 mb-4 mb-lg-0 slide-up" style="animation-delay: 0.1s">
          <div class="card h-100 shadow-sm hover-lift">
            <div class="card-body">
              <h2 class="card-title">Our Mission</h2>
              <p class="card-text">
                To glorify God by making disciples who love God, love people, and serve the world.
                We are committed to sharing the transformative message of Jesus Christ and 
                equipping believers to live out their faith in everyday life.
              </p>
            </div>
          </div>
        </div>
        
        <div class="col-lg-6 slide-up" style="animation-delay: 0.2s">
          <div class="card h-100 shadow-sm hover-lift">
            <div class="card-body">
              <h2 class="card-title">Our Vision</h2>
              <p class="card-text">
                To be a vibrant community of faith where people from all walks of life 
                can encounter God's love, experience authentic community, and be empowered 
                to make a difference in their homes, workplaces, and communities.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Core Values Section -->
      <h2 class="mb-4 slide-up" style="animation-delay: 0.3s">Our Core Values</h2>
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
        <div class="col slide-up" style="animation-delay: 0.4s">
          <div class="card h-100 shadow-sm hover-lift">
            <div class="card-body text-center">
              <i class="bi bi-book text-primary fs-1 mb-3 value-icon"></i>
              <h3 class="card-title">Biblical Teaching</h3>
              <p class="card-text">
                We are committed to teaching the Bible as God's authoritative, inspired Word that guides our faith and practice.
              </p>
            </div>
          </div>
        </div>
        
        <div class="col slide-up" style="animation-delay: 0.5s">
          <div class="card h-100 shadow-sm hover-lift">
            <div class="card-body text-center">
              <i class="bi bi-heart text-primary fs-1 mb-3 value-icon"></i>
              <h3 class="card-title">Authentic Worship</h3>
              <p class="card-text">
                We believe in heartfelt, Spirit-led worship that honors God and inspires people to live for Him.
              </p>
            </div>
          </div>
        </div>
        
        <div class="col slide-up" style="animation-delay: 0.6s">
          <div class="card h-100 shadow-sm hover-lift">
            <div class="card-body text-center">
              <i class="bi bi-people text-primary fs-1 mb-3 value-icon"></i>
              <h3 class="card-title">Genuine Community</h3>
              <p class="card-text">
                We foster genuine relationships where people can find belonging, support, and spiritual growth.
              </p>
            </div>
          </div>
        </div>
        
        <div class="col slide-up" style="animation-delay: 0.7s">
          <div class="card h-100 shadow-sm hover-lift">
            <div class="card-body text-center">
              <i class="bi bi-globe text-primary fs-1 mb-3 value-icon"></i>
              <h3 class="card-title">Missional Living</h3>
              <p class="card-text">
                We are called to share God's love through word and deed, both locally and globally.
              </p>
            </div>
          </div>
        </div>
        
        <div class="col slide-up" style="animation-delay: 0.8s">
          <div class="card h-100 shadow-sm hover-lift">
            <div class="card-body text-center">
              <i class="bi bi-house-door text-primary fs-1 mb-3 value-icon"></i>
              <h3 class="card-title">Family Ministry</h3>
              <p class="card-text">
                We believe in equipping families to grow together in faith and pass it on to the next generation.
              </p>
            </div>
          </div>
        </div>
        
        <div class="col slide-up" style="animation-delay: 0.9s">
          <div class="card h-100 shadow-sm hover-lift">
            <div class="card-body text-center">
              <i class="bi bi-hand-thumbs-up text-primary fs-1 mb-3 value-icon"></i>
              <h3 class="card-title">Excellence</h3>
              <p class="card-text">
                We strive for excellence in all we do as a reflection of our commitment to honor God.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Leadership Section -->
      <h2 class="mb-4 slide-up" style="animation-delay: 1s">Our Leadership</h2>
      <div class="row row-cols-1 row-cols-md-3 g-4">
        <div 
          v-for="(leader, index) in leadership" 
          :key="leader.name"
          class="col slide-up"
          :style="{ animationDelay: `${1.1 + index * 0.1}s` }"
        >
          <div class="card h-100 shadow-sm hover-lift">
            <div class="leader-image" :style="{ backgroundImage: `url(${leader.image})` }"></div>
            <div class="card-body">
              <h3 class="card-title">{{ leader.name }}</h3>
              <h6 class="card-subtitle mb-2 text-muted">{{ leader.role }}</h6>
              <p class="card-text">{{ leader.bio }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- History Section -->
      <h2 class="mb-4">Our History</h2>
      <div class="card shadow-sm mb-5">
        <div class="card-body">
          <p class="card-text">
            Grace Church was founded in 1985 by a small group of families committed to 
            establishing a Christ-centered community in our city. What began as a home 
            Bible study has grown into a thriving church with multiple ministries serving 
            our local community and supporting missions around the world.
          </p>
          <p class="card-text">
            Throughout our history, we have remained committed to biblical teaching, 
            authentic worship, and compassionate outreach. We believe that the church 
            should be a place of healing, growth, and transformation, where people can 
            discover their purpose and use their gifts to serve others.
          </p>
          <p class="card-text mb-0">
            As we look to the future, we are excited about the ways God continues to 
            work through our church to impact lives and bring hope to our community.
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Leadership data
  const leadership = [
    {
      name: 'Pastor John Smith',
      role: 'Senior Pastor',
      image: 'https://source.unsplash.com/random/300x300/?pastor,man',
      bio: 'Pastor John has served as our Senior Pastor since 2010. He has a passion for teaching God\'s Word and helping people grow in their relationship with Christ.'
    },
    {
      name: 'Sarah Johnson',
      role: 'Worship Pastor',
      image: 'https://source.unsplash.com/random/300x300/?worship,woman',
      bio: 'Sarah leads our worship ministry with creativity and passion. She believes that worship is a powerful way to connect with God and experience His presence.'
    },
    {
      name: 'Michael Williams',
      role: 'Youth Pastor',
      image: 'https://source.unsplash.com/random/300x300/?youth,pastor',
      bio: 'Michael has a heart for helping young people discover their identity in Christ and develop a faith that will last a lifetime.'
    }
  ]
  </script>
  
  <style scoped>
  .card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .hover-lift:hover {
    transform: translateY(-5px);
    box-shadow: var(--elevation-4);
  }
  
  .leader-image {
    height: 200px;
    background-size: cover;
    background-position: center;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  
  .value-icon {
    transition: transform 0.3s ease;
  }
  
  .card:hover .value-icon {
    transform: scale(1.2);
  }
  
  .about-page > * {
    animation-fill-mode: both;
  }
  </style>