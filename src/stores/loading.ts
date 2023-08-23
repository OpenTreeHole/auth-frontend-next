import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', () => {
  const loadingSemaphore = ref<number>(0)
  return {
    loadingSemaphore
  }
})
