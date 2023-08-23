<template>
  <v-app>
    <NotificationSnackbar />
    <RouterView />
  </v-app>
</template>

<script setup lang="ts">
import NotificationSnackbar from '@/components/NotificationSnackbar.vue'
</script>
