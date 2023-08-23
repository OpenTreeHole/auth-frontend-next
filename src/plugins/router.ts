import { createRouter, createWebHistory } from 'vue-router/auto'

export const router = createRouter({
  history: createWebHistory()
})

router.beforeEach((to, from, next) => {
  if (from.query.url && !to.query.url) {
    to.query.url = from.query.url
    next(to)
  }
  next()
})
