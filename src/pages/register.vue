<template>
  <Layout>
    <RouterView />
  </Layout>
</template>

<script setup lang="ts">
import Layout from '@/components/layout/Layout.vue'
import { onBeforeRouteUpdate } from 'vue-router'

onBeforeRouteUpdate((to, from, next) => {
  if (!to.query.type) {
    if (from.query.type) to.query.type = from.query.type
    else to.query.type = 'register'
    next(to)
  }
  next()
})
</script>
