<template>
  <v-app>
    <NotificationSnackbar />
    <Layout>
      <RouterView />
      <template #side>
        <RouterView name="side" />
      </template>
    </Layout>
  </v-app>
</template>

<script setup lang="ts">
import NotificationSnackbar from '@/components/NotificationSnackbar.vue'
import Layout from '@/components/layout/Layout.vue'
</script>
