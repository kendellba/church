import { defineStore } from 'pinia'

// Make sure to export the store function
export const useEventsStore = defineStore('events', {
  state: () => ({
    events: [
      {
        id: 1,
        title: 'Sunday Worship Service',
        date: '2023-10-15T10:00:00',
        description: 'Join us for our weekly worship service with praise, prayer, and teaching.',
        location: 'Main Sanctuary'
      },
      {
        id: 2,
        title: 'Youth Group Meeting',
        date: '2023-10-18T18:30:00',
        description: 'Weekly gathering for teenagers with games, worship, and Bible study.',
        location: 'Youth Center'
      },
      {
        id: 3,
        title: 'Community Outreach',
        date: '2023-10-21T09:00:00',
        description: 'Serving our local community through various service projects.',
        location: 'Community Center'
      },
      {
        id: 4,
        title: 'Bible Study Group',
        date: '2023-10-19T19:00:00',
        description: 'In-depth study of Scripture in small groups.',
        location: 'Fellowship Hall'
      }
    ],
    isLoading: false,
    error: null
  }),
  
  getters: {
    // Get upcoming events sorted by date
    upcomingEvents: (state) => {
      return [...state.events]
        .filter(event => new Date(event.date) >= new Date())
        .sort((a, b) => new Date(a.date) - new Date(b.date))
    },
    
    // Get event by ID
    getEventById: (state) => (id) => {
      return state.events.find(event => event.id === id)
    }
  },
  
  actions: {
    // Add a new event
    addEvent(event) {
      const newId = Math.max(0, ...this.events.map(e => e.id)) + 1
      this.events.push({ ...event, id: newId })
    },
    
    // Update an existing event
    updateEvent(updatedEvent) {
      const index = this.events.findIndex(e => e.id === updatedEvent.id)
      if (index !== -1) {
        this.events[index] = updatedEvent
      }
    },
    
    // Delete an event
    deleteEvent(id) {
      this.events = this.events.filter(event => event.id !== id)
    },
    
    // Simulate fetching events from an API
    async fetchEvents() {
      this.isLoading = true
      this.error = null
      
      try {
        // This would be replaced with an actual API call
        // const response = await fetch('/api/events')
        // this.events = await response.json()
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))
        // Data is already in state for this example
      } catch (error) {
        this.error = 'Failed to load events. Please try again later.'
        console.error('Error fetching events:', error)
      } finally {
        this.isLoading = false
      }
    }
  }
}) 