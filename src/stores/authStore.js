import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const token = ref(localStorage.getItem('auth_token') || null)
  const loading = ref(false)
  const initialized = ref(false)
  
  // Getters
  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  
  // Actions
  
  // Initialize auth state from local storage
  const initAuth = async () => {
    const storedToken = localStorage.getItem('auth_token')
    if (storedToken) {
      token.value = storedToken
      await fetchUserProfile()
    }
    initialized.value = true
  }
  
  // Login user
  const login = async (email, password, remember = false) => {
    loading.value = true
    
    try {
      // In a real app, this would be an API call
      // Simulating API response for demo
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Check credentials (this is just for demo purposes)
      if (email === 'demo@example.com' && password === 'password') {
        // Set token and user data
        const demoToken = 'demo_token_' + Math.random().toString(36).substring(2)
        token.value = demoToken
        
        if (remember) {
          localStorage.setItem('auth_token', demoToken)
        }
        
        // Set user data
        user.value = {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'demo@example.com',
          role: 'member',
          createdAt: new Date(2023, 0, 15)
        }
        
        return user.value
      } else {
        throw new Error('Invalid email or password')
      }
    } finally {
      loading.value = false
    }
  }
  
  // Register new user
  const register = async (userData) => {
    loading.value = true
    
    try {
      // In a real app, this would be an API call
      // Simulating API response for demo
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Generate demo token
      const demoToken = 'demo_token_' + Math.random().toString(36).substring(2)
      token.value = demoToken
      localStorage.setItem('auth_token', demoToken)
      
      // Set user data
      user.value = {
        id: 1,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        role: 'member',
        createdAt: new Date()
      }
      
      return user.value
    } finally {
      loading.value = false
    }
  }
  
  // Fetch user profile
  const fetchUserProfile = async () => {
    if (!token.value) return null
    
    loading.value = true
    
    try {
      // In a real app, this would be an API call using the token
      // Simulating API response for demo
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Set demo user data
      user.value = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'demo@example.com',
        role: 'member',
        createdAt: new Date(2023, 0, 15)
      }
      
      return user.value
    } catch (error) {
      // If there's an error fetching the profile, log out
      console.error('Error fetching user profile:', error)
      logout()
      return null
    } finally {
      loading.value = false
    }
  }
  
  // Update user profile
  const updateProfile = async (userData) => {
    if (!token.value) return null
    
    loading.value = true
    
    try {
      // In a real app, this would be an API call
      // Simulating API response for demo
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update user data
      user.value = {
        ...user.value,
        ...userData
      }
      
      return user.value
    } finally {
      loading.value = false
    }
  }
  
  // Request password reset
  const requestPasswordReset = async (email) => {
    loading.value = true
    
    try {
      // In a real app, this would be an API call
      // Simulating API response for demo
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Just return success for demo
      return true
    } finally {
      loading.value = false
    }
  }
  
  // Logout user
  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('auth_token')
  }
  
  return {
    // State
    user,
    token,
    loading,
    initialized,
    
    // Getters
    isAuthenticated,
    isAdmin,
    
    // Actions
    initAuth,
    login,
    register,
    fetchUserProfile,
    updateProfile,
    requestPasswordReset,
    logout
  }
}) 