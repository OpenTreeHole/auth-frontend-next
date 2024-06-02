<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onBeforeRouteUpdate } from 'vue-router/auto'

onBeforeRouteUpdate((to, from, next) => {
  if (!to.query.type) {
    if (from.query.type) to.query.type = from.query.type
    else to.query.type = 'register'
    next(to)
  }
  next()
})
</script>
