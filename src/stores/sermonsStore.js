import { defineStore } from 'pinia'

export const useSermonsStore = defineStore('sermons', {
  state: () => ({
    sermons: [
      {
        id: 1,
        title: 'Walking in Faith',
        date: '2023-10-08T10:00:00',
        preacher: 'Pastor John Smith',
        scripture: 'Hebrews 11:1-6',
        description: 'Exploring what it means to live by faith in our daily lives.',
        audioUrl: '/sermons/walking-in-faith.mp3'
      },
      {
        id: 2,
        title: 'The Power of Prayer',
        date: '2023-10-01T10:00:00',
        preacher: 'Pastor Sarah Johnson',
        scripture: 'James 5:13-18',
        description: 'Understanding the importance and effectiveness of prayer.',
        audioUrl: '/sermons/power-of-prayer.mp3'
      },
      {
        id: 3,
        title: 'Living in Community',
        date: '2023-09-24T10:00:00',
        preacher: 'Pastor John Smith',
        scripture: 'Acts 2:42-47',
        description: 'How the early church model of community applies to us today.',
        audioUrl: '/sermons/living-in-community.mp3'
      },
      {
        id: 4,
        title: 'Grace for All',
        date: '2023-09-17T10:00:00',
        preacher: 'Pastor Michael Williams',
        scripture: 'Ephesians 2:1-10',
        description: 'Understanding God\'s grace and how it transforms our lives.',
        audioUrl: '/sermons/grace-for-all.mp3'
      }
    ],
    isLoading: false,
    error: null
  }),
  
  getters: {
    // Get sermons sorted by date (newest first)
    recentSermons: (state) => {
      return [...state.sermons].sort((a, b) => 
        new Date(b.date) - new Date(a.date)
      )
    },
    
    // Get sermon by ID
    getSermonById: (state) => (id) => {
      return state.sermons.find(sermon => sermon.id === id)
    },
    
    // Get sermons by preacher
    getSermonsByPreacher: (state) => (preacher) => {
      return state.sermons.filter(sermon => 
        sermon.preacher.toLowerCase().includes(preacher.toLowerCase())
      )
    }
  },
  
  actions: {
    // Add a new sermon
    addSermon(sermon) {
      const newId = Math.max(0, ...this.sermons.map(s => s.id)) + 1
      this.sermons.push({ ...sermon, id: newId })
    },
    
    // Update an existing sermon
    updateSermon(updatedSermon) {
      const index = this.sermons.findIndex(s => s.id === updatedSermon.id)
      if (index !== -1) {
        this.sermons[index] = updatedSermon
      }
    },
    
    // Delete a sermon
    deleteSermon(id) {
      this.sermons = this.sermons.filter(sermon => sermon.id !== id)
    },
    
    // Simulate fetching sermons from an API
    async fetchSermons() {
      this.isLoading = true
      this.error = null
      
      try {
        // This would be replaced with an actual API call
        // const response = await fetch('/api/sermons')
        // this.sermons = await response.json()
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))
        // Data is already in state for this example
      } catch (error) {
        this.error = 'Failed to load sermons. Please try again later.'
        console.error('Error fetching sermons:', error)
      } finally {
        this.isLoading = false
      }
    }
  }
}) 