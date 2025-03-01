import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGivingStore = defineStore('giving', () => {
  // State for donation data
  const donationData = ref({
    amount: 50,
    customAmount: null,
    designation: 'tithe',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    paymentMethod: 'creditCard',
    coverFee: true,
    comments: '',
    anonymous: false,
    project: '',
    frequency: 'monthly'
  })

  // Function to update donation data
  const updateDonationData = (newData) => {
    donationData.value = { ...donationData.value, ...newData }
  }

  return { donationData, updateDonationData }
}) 