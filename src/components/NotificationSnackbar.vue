<template>
  <v-snackbar
    :model-value="show"
    :color="color"
    location="top"
  >
    <v-icon
      class="mr-2"
      :icon="icon"
    ></v-icon>
    {{ notificationStore.notification?.message }}
  </v-snackbar>
</template>

<script setup lang="ts">
import { useNotificationStore } from '@/stores/notification'
import { useNow } from '@vueuse/core'
import { computed } from 'vue'

const notificationStore = useNotificationStore()
const now = useNow()

const color = computed(() => {
  switch (notificationStore.notification?.type) {
    case 'success':
      return 'success'
    case 'error':
      return 'error'
    case 'info':
      return 'info'
    case 'warning':
      return 'warning'
    default:
      return 'success'
  }
})

const icon = computed(() => {
  switch (notificationStore.notification?.type) {
    case 'success':
      return 'mdi-check-circle'
    case 'error':
      return 'mdi-alert-circle'
    case 'info':
      return 'mdi-information'
    case 'warning':
      return 'mdi-alert'
    default:
      return 'mdi-check-circle'
  }
})

const show = computed(() => {
  if (!notificationStore.notification) return false
  return now.value < notificationStore.notification.expireAt
})
</script>
