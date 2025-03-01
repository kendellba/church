<template>
  <div class="groups-page">
    <h1 class="page-title slide-up">Community Groups</h1>
    
    <div class="row mb-5">
      <div class="col-lg-8 mx-auto text-center slide-up" style="animation-delay: 0.1s">
        <p class="lead">
          Connect with others in our church family through small groups where you can grow in faith, build relationships, and serve together.
        </p>
      </div>
    </div>
    
    <!-- Group Finder -->
    <div class="row mb-5">
      <div class="col-lg-10 mx-auto slide-up" style="animation-delay: 0.2s">
        <div class="card shadow-sm">
          <div class="card-header bg-primary text-white">
            <h3 class="mb-0">Find Your Group</h3>
          </div>
          <div class="card-body">
            <div class="row g-3">
              <div class="col-md-4">
                <label for="groupType" class="form-label">Group Type</label>
                <select class="form-select" id="groupType" v-model="filters.type">
                  <option value="">All Types</option>
                  <option value="bible-study">Bible Study</option>
                  <option value="prayer">Prayer Group</option>
                  <option value="fellowship">Fellowship</option>
                  <option value="service">Service/Outreach</option>
                  <option value="interest">Interest-Based</option>
                </select>
              </div>
              
              <div class="col-md-4">
                <label for="groupDay" class="form-label">Meeting Day</label>
                <select class="form-select" id="groupDay" v-model="filters.day">
                  <option value="">Any Day</option>
                  <option value="sunday">Sunday</option>
                  <option value="monday">Monday</option>
                  <option value="tuesday">Tuesday</option>
                  <option value="wednesday">Wednesday</option>
                  <option value="thursday">Thursday</option>
                  <option value="friday">Friday</option>
                  <option value="saturday">Saturday</option>
                </select>
              </div>
              
              <div class="col-md-4">
                <label for="groupLocation" class="form-label">Location</label>
                <select class="form-select" id="groupLocation" v-model="filters.location">
                  <option value="">Any Location</option>
                  <option value="church">Church Campus</option>
                  <option value="home">Home Groups</option>
                  <option value="online">Online</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Groups List -->
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
      <div 
        v-for="(group, index) in filteredGroups" 
        :key="group.id" 
        class="col slide-up"
        :style="{'animation-delay': `${0.3 + (index * 0.1)}s`}"
      >
        <div class="card h-100 hover-lift">
          <div class="card-img-top group-image" :style="{ backgroundImage: `url(${group.image})` }"></div>
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <h5 class="card-title mb-0">{{ group.name }}</h5>
              <span class="badge bg-primary">{{ formatGroupType(group.type) }}</span>
            </div>
            <p class="card-text">{{ group.description }}</p>
            
            <div class="d-flex align-items-center mb-2 group-info">
              <i class="bi bi-calendar-event text-primary me-2"></i>
              <span>{{ formatMeetingTime(group.day, group.time) }}</span>
            </div>
            
            <div class="d-flex align-items-center mb-2 group-info">
              <i class="bi bi-geo-alt text-primary me-2"></i>
              <span>{{ formatLocation(group.location, group.address) }}</span>
            </div>
            
            <div class="d-flex align-items-center mb-3 group-info">
              <i class="bi bi-people text-primary me-2"></i>
              <span>{{ group.members }} members</span>
            </div>
          </div>
          <div class="card-footer bg-transparent border-top-0">
            <button class="btn btn-primary w-100" @click="showGroupDetails(group.id)">
              View Group
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Start a Group -->
    <div class="row mb-5">
      <div class="col-lg-8 mx-auto text-center slide-up" :style="{'animation-delay': '0.8s'}">
        <div class="card shadow-sm hover-lift">
          <div class="card-body py-5">
            <h3 class="card-title mb-3">Want to Start a Group?</h3>
            <p class="card-text mb-4">
              If you're passionate about bringing people together and have an idea for a new community group, we'd love to hear from you!
            </p>
            <button class="btn btn-lg btn-primary" @click="showStartGroupForm">
              Start a Group
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Group Details Modal -->
    <div class="modal fade" id="groupDetailsModal" tabindex="-1" aria-labelledby="groupDetailsModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content" v-if="selectedGroup">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="groupDetailsModalLabel">{{ selectedGroup.name }}</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6 mb-4 mb-md-0">
                <img :src="selectedGroup.image" class="img-fluid rounded mb-3" :alt="selectedGroup.name">
                <div class="d-flex align-items-center mb-2">
                  <i class="bi bi-calendar-event text-primary me-2"></i>
                  <span>{{ formatMeetingTime(selectedGroup.day, selectedGroup.time) }}</span>
                </div>
                <div class="d-flex align-items-center mb-2">
                  <i class="bi bi-geo-alt text-primary me-2"></i>
                  <span>{{ formatLocation(selectedGroup.location, selectedGroup.address) }}</span>
                </div>
                <div class="d-flex align-items-center mb-3">
                  <i class="bi bi-people text-primary me-2"></i>
                  <span>{{ selectedGroup.members }} members</span>
                </div>
              </div>
              <div class="col-md-6">
                <h5>About This Group</h5>
                <p>{{ selectedGroup.description }}</p>
                
                <h5 class="mt-4">Group Leader</h5>
                <div class="d-flex align-items-center mb-3">
                  <img :src="selectedGroup.leaderImage" class="rounded-circle me-3" width="50" height="50" :alt="selectedGroup.leader">
                  <div>
                    <h6 class="mb-0">{{ selectedGroup.leader }}</h6>
                    <small class="text-muted">Group Leader</small>
                  </div>
                </div>
                
                <h5 class="mt-4">Upcoming Meetings</h5>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item px-0">
                    <div class="d-flex justify-content-between">
                      <div>
                        <h6 class="mb-0">Regular Meeting</h6>
                        <small class="text-muted">{{ formatNextMeeting(selectedGroup.day) }}</small>
                      </div>
                      <span class="badge bg-success">Upcoming</span>
                    </div>
                  </li>
                  <li class="list-group-item px-0">
                    <div class="d-flex justify-content-between">
                      <div>
                        <h6 class="mb-0">Group Social</h6>
                        <small class="text-muted">September 15, 2023 at 6:00 PM</small>
                      </div>
                      <span class="badge bg-secondary">Special Event</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="joinGroup(selectedGroup.id)">
              Join This Group
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Start Group Modal -->
    <div class="modal fade" id="startGroupModal" tabindex="-1" aria-labelledby="startGroupModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="startGroupModalLabel">Start a New Group</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitNewGroup">
              <div class="mb-3">
                <label for="newGroupName" class="form-label">Group Name</label>
                <input type="text" class="form-control" id="newGroupName" v-model="newGroup.name" required>
              </div>
              
              <div class="mb-3">
                <label for="newGroupType" class="form-label">Group Type</label>
                <select class="form-select" id="newGroupType" v-model="newGroup.type" required>
                  <option value="bible-study">Bible Study</option>
                  <option value="prayer">Prayer Group</option>
                  <option value="fellowship">Fellowship</option>
                  <option value="service">Service/Outreach</option>
                  <option value="interest">Interest-Based</option>
                </select>
              </div>
              
              <div class="mb-3">
                <label for="newGroupDescription" class="form-label">Description</label>
                <textarea class="form-control" id="newGroupDescription" rows="3" v-model="newGroup.description" required></textarea>
              </div>
              
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="newGroupDay" class="form-label">Meeting Day</label>
                  <select class="form-select" id="newGroupDay" v-model="newGroup.day" required>
                    <option value="sunday">Sunday</option>
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                    <option value="saturday">Saturday</option>
                  </select>
                </div>
                
                <div class="col-md-6">
                  <label for="newGroupTime" class="form-label">Meeting Time</label>
                  <input type="time" class="form-control" id="newGroupTime" v-model="newGroup.time" required>
                </div>
              </div>
              
              <div class="mb-3">
                <label for="newGroupLocation" class="form-label">Location Type</label>
                <select class="form-select" id="newGroupLocation" v-model="newGroup.location" required>
                  <option value="church">Church Campus</option>
                  <option value="home">Home</option>
                  <option value="online">Online</option>
                </select>
              </div>
              
              <div class="mb-3">
                <label for="newGroupAddress" class="form-label">Address/Location Details</label>
                <input type="text" class="form-control" id="newGroupAddress" v-model="newGroup.address" required>
              </div>
              
              <div class="mb-3">
                <label for="newGroupLeader" class="form-label">Your Name (Group Leader)</label>
                <input type="text" class="form-control" id="newGroupLeader" v-model="newGroup.leader" required>
              </div>
              
              <div class="mb-3">
                <label for="newGroupEmail" class="form-label">Email Address</label>
                <input type="email" class="form-control" id="newGroupEmail" v-model="newGroup.email" required>
              </div>
              
              <div class="mb-3">
                <label for="newGroupPhone" class="form-label">Phone Number</label>
                <input type="tel" class="form-control" id="newGroupPhone" v-model="newGroup.phone" required>
              </div>
              
              <div class="mb-3">
                <label for="newGroupNotes" class="form-label">Additional Notes</label>
                <textarea class="form-control" id="newGroupNotes" rows="3" v-model="newGroup.notes"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" @click="submitNewGroup" :disabled="isSubmitting">
              <span v-if="isSubmitting">
                <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Submitting...
              </span>
              <span v-else>Submit Group Proposal</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Thank You Modal -->
    <div class="modal fade" id="thankYouModal" tabindex="-1" aria-labelledby="thankYouModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="thankYouModalLabel">Thank You!</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-center">
            <i class="bi bi-check-circle-fill text-success fs-1 mb-3"></i>
            <h4>Group Proposal Submitted</h4>
            <p>Thank you for your interest in starting a new group! Our team will review your proposal and contact you soon.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Modal } from 'bootstrap'

// Filters for group search
const filters = ref({
  type: '',
  day: '',
  location: ''
})

// Sample groups data
const groups = ref([
  {
    id: 1,
    name: 'Faith & Fellowship',
    type: 'bible-study',
    description: 'A welcoming group focused on studying the Bible and building meaningful relationships.',
    day: 'tuesday',
    time: '19:00',
    location: 'home',
    address: '123 Main St, Anytown',
    members: 12,
    leader: 'John Smith',
    leaderImage: 'https://source.unsplash.com/random/100x100/?man,portrait',
    image: 'https://source.unsplash.com/random/800x600/?bible,study'
  },
  {
    id: 2,
    name: 'Young Adults',
    type: 'fellowship',
    description: 'A community for young adults (18-30) to connect, grow spiritually, and navigate life together.',
    day: 'thursday',
    time: '19:30',
    location: 'church',
    address: 'Grace Church, Room 201',
    members: 18,
    leader: 'Sarah Johnson',
    leaderImage: 'https://source.unsplash.com/random/100x100/?woman,portrait',
    image: 'https://source.unsplash.com/random/800x600/?young,adults'
  },
  {
    id: 3,
    name: 'Prayer Warriors',
    type: 'prayer',
    description: 'Dedicated to praying for our church, community, and world. All prayer levels welcome!',
    day: 'wednesday',
    time: '06:00',
    location: 'church',
    address: 'Grace Church, Chapel',
    members: 8,
    leader: 'Michael Williams',
    leaderImage: 'https://source.unsplash.com/random/100x100/?man,portrait,2',
    image: 'https://source.unsplash.com/random/800x600/?prayer'
  },
  {
    id: 4,
    name: 'Community Outreach',
    type: 'service',
    description: 'Serving our local community through various outreach projects and volunteer opportunities.',
    day: 'saturday',
    time: '09:00',
    location: 'church',
    address: 'Grace Church, Fellowship Hall',
    members: 15,
    leader: 'Emily Davis',
    leaderImage: 'https://source.unsplash.com/random/100x100/?woman,portrait,2',
    image: 'https://source.unsplash.com/random/800x600/?community,service'
  },
  {
    id: 5,
    name: 'Online Bible Study',
    type: 'bible-study',
    description: "A virtual group studying the Bible together. Perfect for those who cannot attend in person.",
    day: 'monday',
    time: '20:00',
    location: 'online',
    address: 'Zoom Meeting',
    members: 20,
    leader: 'David Thompson',
    leaderImage: 'https://source.unsplash.com/random/100x100/?man,portrait,3',
    image: 'https://source.unsplash.com/random/800x600/?online,meeting'
  },
  {
    id: 6,
    name: 'Hiking & Faith',
    type: 'interest',
    description: 'Combining our love for the outdoors with spiritual growth and fellowship.',
    day: 'saturday',
    time: '08:00',
    location: 'home',
    address: 'Various Locations',
    members: 10,
    leader: 'Jessica Martinez',
    leaderImage: 'https://source.unsplash.com/random/100x100/?woman,portrait,3',
    image: 'https://source.unsplash.com/random/800x600/?hiking'
  }
])

// Selected group for details modal
const selectedGroup = ref(null)

// New group form data
const newGroup = ref({
  name: '',
  type: 'bible-study',
  description: '',
  day: 'sunday',
  time: '19:00',
  location: 'church',
  address: '',
  leader: '',
  email: '',
  phone: '',
  notes: ''
})

// Form submission state
const isSubmitting = ref(false)

// Filter groups based on selected filters
const filteredGroups = computed(() => {
  return groups.value.filter(group => {
    // Filter by type
    if (filters.value.type && group.type !== filters.value.type) {
      return false
    }
    
    // Filter by day
    if (filters.value.day && group.day !== filters.value.day) {
      return false
    }
    
    // Filter by location
    if (filters.value.location && group.location !== filters.value.location) {
      return false
    }
    
    return true
  })
})

// Format group type for display
const formatGroupType = (type) => {
  const types = {
    'bible-study': 'Bible Study',
    'prayer': 'Prayer',
    'fellowship': 'Fellowship',
    'service': 'Service',
    'interest': 'Interest'
  }
  return types[type] || type
}

// Format meeting time for display
const formatMeetingTime = (day, time) => {
  const days = {
    'sunday': 'Sundays',
    'monday': 'Mondays',
    'tuesday': 'Tuesdays',
    'wednesday': 'Wednesdays',
    'thursday': 'Thursdays',
    'friday': 'Fridays',
    'saturday': 'Saturdays'
  }
  
  // Format time from 24h to 12h
  const [hours, minutes] = time.split(':')
  const period = hours >= 12 ? 'PM' : 'AM'
  const hours12 = hours % 12 || 12
  const formattedTime = `${hours12}:${minutes} ${period}`
  
  return `${days[day]} at ${formattedTime}`
}

// Format location for display
const formatLocation = (locationType, address) => {
  if (locationType === 'online') {
    return 'Online Meeting'
  }
  return address
}

// Calculate next meeting date based on day of week
const formatNextMeeting = (day) => {
  const today = new Date()
  const dayIndex = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].indexOf(day)
  
  // Calculate days until next meeting
  let daysUntil = dayIndex - today.getDay()
  if (daysUntil <= 0) {
    daysUntil += 7 // Next week
  }
  
  // Calculate next meeting date
  const nextMeeting = new Date()
  nextMeeting.setDate(today.getDate() + daysUntil)
  
  // Format date
  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }
  return nextMeeting.toLocaleDateString(undefined, options)
}

// Show group details in modal
const showGroupDetails = (groupId) => {
  selectedGroup.value = groups.value.find(group => group.id === groupId)
  const modal = new Modal(document.getElementById('groupDetailsModal'))
  modal.show()
}

// Show start group form
const showStartGroupForm = () => {
  const modal = new Modal(document.getElementById('startGroupModal'))
  modal.show()
}

// Join a group
const joinGroup = (groupId) => {
  // In a real app, this would send a request to join the group
  console.log(`Requesting to join group ${groupId}`)
  alert('Your request to join this group has been sent to the group leader.')
  
  // Close the modal
  const modal = Modal.getInstance(document.getElementById('groupDetailsModal'))
  modal.hide()
}

// Submit new group
const submitNewGroup = async () => {
  isSubmitting.value = true
  
  try {
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // In a real application, you would send the new group data to your backend
    console.log('New group submitted:', newGroup.value)
    
    // Close the form modal
    const formModal = Modal.getInstance(document.getElementById('startGroupModal'))
    formModal.hide()
    
    // Reset form
    newGroup.value = {
      name: '',
      type: 'bible-study',
      description: '',
      day: 'sunday',
      time: '19:00',
      location: 'church',
      address: '',
      leader: '',
      email: '',
      phone: '',
      notes: ''
    }
    
    // Show thank you modal
    setTimeout(() => {
      const thankYouModal = new Modal(document.getElementById('thankYouModal'))
      thankYouModal.show()
    }, 500)
    
  } catch (error) {
    console.error('Error submitting new group:', error)
    alert('There was an error submitting your group proposal. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.groups-page > * {
  animation-fill-mode: both;
}

.group-image {
  height: 200px;
  background-size: cover;
  background-position: center;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.group-info {
  transition: transform 0.3s ease;
}

.card:hover .group-info {
  transform: translateX(5px);
}

.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-5px);
  box-shadow: var(--elevation-4);
}
</style> 