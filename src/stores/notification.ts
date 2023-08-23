import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Notification } from '@/types/notification'

export const useNotificationStore = defineStore('notification', () => {
  const notification = ref<Notification | null>(null)
  return { notification }
})
