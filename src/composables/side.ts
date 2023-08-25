import { useSessionStorage } from '@vueuse/core'
import { onMounted, onUnmounted } from 'vue'

export const useSide = () => {
  const side = useSessionStorage('side', false)
  const enableSide = () => {
    onMounted(() => {
      side.value = true
    })
    onUnmounted(() => {
      side.value = false
    })
  }
  return { side, enableSide }
}
