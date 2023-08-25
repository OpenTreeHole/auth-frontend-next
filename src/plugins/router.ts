import { useSide } from '@/composables/side'
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

router.afterEach((to, from) => {
  console.log('to', to)
  console.log('from', from)
  const { side } = useSide()
  if (to.name !== from.name) {
    side.value = (to.meta.side as any) || false
  }
})
